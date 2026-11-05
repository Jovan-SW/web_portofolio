'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';

// =============================================================================
// 1. TYPE DEFINITIONS & CONTRACTS
// =============================================================================
export interface ContactFormResponse {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

// =============================================================================
// 2. RATE LIMITER (In-Memory Sliding Window with Auto-Purge)
// =============================================================================
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 menit
const MAX_REQUESTS_PER_WINDOW = 4; // Maksimal 4 pengiriman pesan per 10 menit per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Bersihkan cache jika sudah menampung lebih dari 500 IP untuk mencegah memory leak
  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const existing = rateLimitStore.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  existing.count += 1;
  return false;
}

async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
      const firstIp = forwardedFor.split(',')[0].trim();
      if (firstIp) return firstIp;
    }
    const realIp = headersList.get('x-real-ip');
    if (realIp) return realIp.trim();
    const cfIp = headersList.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();
  } catch {
    // Abaikan jika dieksekusi di luar request context
  }
  return 'unknown-client';
}

function anonymizeIp(ip: string): string {
  if (ip === 'unknown-client') return 'Unknown';
  if (ip.includes('.')) {
    // IPv4: sembunyikan 2 oktet terakhir demi privasi & GDPR
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.xxx.xxx`;
  }
  if (ip.includes(':')) {
    // IPv6
    const parts = ip.split(':');
    return `${parts.slice(0, 3).join(':')}:xxxx:xxxx`;
  }
  return ip;
}

// =============================================================================
// 3. KEAMANAN LAYER 1: SANITASI, PROTEKSI INJECTION & THREAT SCANNER
// =============================================================================

/**
 * Membersihkan string header dari CRLF, null bytes, dan unicode bidirectional overrides
 * yang umum dipakai penyerang untuk memanipulasi nama berkas atau header email.
 */
function sanitizeHeader(value: string): string {
  return value
    .replace(/[\r\n\t\0]+/g, ' ')
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
}

/**
 * Membersihkan badan pesan teks dari karakter kontrol berbahaya sambil
 * tetap mempertahankan baris baru dan spasi yang sah.
 */
function sanitizeMessageBody(value: string): string {
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .trim();
}

/**
 * HTML entity encoder menyeluruh untuk mencegah Cross-Site Scripting (XSS)
 * dan HTML Injection saat pesan dirender di webmail/klien email.
 */
function escapeHtml(text: string): string {
  const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  return text.replace(/[&<>"'`=\/]/g, (char) => entityMap[char] || char);
}

// Pola berkas berbahaya (executable, script, installer, macro)
const DANGEROUS_EXTENSIONS = /\.(exe|bat|cmd|sh|ps1|vbs|scr|pif|msi|dll|apk|iso|vhd|jar|hta|wsf|cpl|com|gadget|reg|bin|dmg|pkg)\b/i;
// Protokol berbahaya
const DANGEROUS_PROTOCOLS = /(javascript:|data:|vbscript:|file:)/i;
// Tag script atau HTML eksekutabel
const DANGEROUS_TAGS = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

function inspectContentForThreats(content: string): {
  isBlocked: boolean;
  blockedReason?: string;
  urlCount: number;
  detectedUrls: string[];
} {
  // 1. Blokir script tag atau protokol jahat
  if (DANGEROUS_PROTOCOLS.test(content) || DANGEROUS_TAGS.test(content)) {
    return {
      isBlocked: true,
      blockedReason: 'Pesan mengandung format script atau protokol yang dilarang.',
      urlCount: 0,
      detectedUrls: [],
    };
  }

  // 2. Blokir referensi berkas virus/malware/eksekusi
  if (DANGEROUS_EXTENSIONS.test(content)) {
    return {
      isBlocked: true,
      blockedReason: 'Pesan mengandung referensi ekstensi berkas yang dilarang demi keamanan.',
      urlCount: 0,
      detectedUrls: [],
    };
  }

  // 3. Ekstraksi URL luar untuk analisis keamanan & spam
  const matchedUrls = content.match(/https?:\/\/[^\s<]+|www\.[^\s<]+/gi) || [];
  return {
    isBlocked: false,
    urlCount: matchedUrls.length,
    detectedUrls: matchedUrls.slice(0, 5),
  };
}

// =============================================================================
// 4. KEAMANAN LAYER 2: SPAM & PHISHING HEURISTICS
// =============================================================================
const SPAM_PATTERNS = [
  /\b(casino|slot\s*gacor|judi\s*online|togel|sbobet|poker\s*online|maxwin)\b/i,
  /\b(viagra|cialis|kamagra|levitra|pharmacy\s*online)\b/i,
  /\b(crypto\s*giveaway|claim\s*airdrop|free\s*bitcoin|wallet\s*connect|seed\s*phrase)\b/i,
  /\b(buy\s*backlinks|seo\s*ranking\s*service|guest\s*post\s*outreach)\b/i,
  /\b(t\.me\/[a-zA-Z0-9_]+|telegram\s*@[a-zA-Z0-9_]+)\b/i,
];

function isSpamContent(text: string, urlCount: number): boolean {
  // Kepadatan tautan tinggi (3+ tautan dalam 1 pesan, atau 2 tautan pada pesan pendek < 200 karakter)
  if (urlCount >= 3 || (urlCount >= 2 && text.length < 200)) {
    return true;
  }

  // Pencocokan kata kunci spam massal
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }

  // Deteksi spam massal Rusia/Cyrillic pada web portofolio
  const cyrillicMatch = text.match(/[\u0400-\u04FF]/g);
  if (cyrillicMatch && cyrillicMatch.length > text.length * 0.4) {
    return true;
  }

  return false;
}

// RFC 5322 Email Validation
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function isValidEmail(email: string): boolean {
  if (!email || email.length > 100 || email.length < 5) return false;
  if (!RFC_EMAIL_REGEX.test(email)) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const domainParts = parts[1].split('.');
  if (domainParts.length < 2) return false;

  // TLD harus berupa huruf 2-24 karakter (contoh: .com, .id, .io, .tech)
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,24}$/.test(tld)) return false;

  return true;
}

// =============================================================================
// 5. CORE SERVER ACTION
// =============================================================================
export async function sendContactEmail(formData: FormData): Promise<ContactFormResponse> {
  const lang = (formData.get('lang')?.toString() || 'id').toLowerCase() === 'en' ? 'en' : 'id';

  // Helper pesan lokal
  const msg = {
    botSuccess: lang === 'en' 
      ? 'Your message has been sent successfully! I will respond shortly.'
      : 'Pesan Anda berhasil dikirim! Saya akan segera merespons.',
    serviceDown: lang === 'en'
      ? 'Email service is temporarily unavailable. Please email directly or try again later.'
      : 'Layanan email sedang dalam pemeliharaan. Silakan hubungi langsung via email atau coba kembali nanti.',
    rateLimit: lang === 'en'
      ? 'Too many message requests from your device. Please wait a few minutes before trying again.'
      : 'Terlalu banyak permintaan pengiriman pesan dari perangkat Anda. Mohon tunggu beberapa menit sebelum mencoba lagi.',
    invalidName: lang === 'en'
      ? 'Name must be between 2 and 80 characters.'
      : 'Nama wajib diisi dengan panjang antara 2 hingga 80 karakter.',
    invalidEmail: lang === 'en'
      ? 'Please provide a valid email address.'
      : 'Format alamat email tidak valid.',
    invalidPhone: lang === 'en'
      ? 'Invalid WhatsApp number (please enter 8-16 digits).'
      : 'Nomor WhatsApp tidak valid (masukkan 8-16 digit angka).',
    shortMessage: lang === 'en'
      ? 'Message is too short (minimum 10 characters).'
      : 'Isi pesan terlalu singkat (minimal 10 karakter).',
    longMessage: lang === 'en'
      ? 'Message is too long (maximum 3000 characters).'
      : 'Isi pesan terlalu panjang (maksimal 3000 karakter).',
    blockedThreat: lang === 'en'
      ? 'Your message contains prohibited file formats or unsafe links for security reasons.'
      : 'Pesan Anda mengandung format berkas atau tautan yang dilarang demi keamanan sistem.',
    sendError: lang === 'en'
      ? 'Failed to deliver message. Please reach out directly to the email address provided.'
      : 'Gagal mengirimkan pesan ke server email. Silakan kirimkan email langsung ke alamat yang tertera.',
    success: lang === 'en'
      ? 'Your message has been sent successfully! I will get back to you within 24 hours.'
      : 'Pesan Anda berhasil terkirim! Saya akan segera menghubungi Anda kembali.',
  };

  // ---------------------------------------------------------------------------
  // A. PROTEKSI ANTI-BOT: HONEYPOT & TIME-TRAP
  // ---------------------------------------------------------------------------
  // 1. Dual Honeypot Trap
  const hp1 = formData.get('hp_website')?.toString() || '';
  const hp2 = formData.get('company_fax')?.toString() || '';
  if (hp1.trim().length > 0 || hp2.trim().length > 0) {
    // Diam-diam sukses palsu tanpa membuang kuota API Resend
    return { success: true, message: msg.botSuccess };
  }

  // 2. Time-Trap (Speed check bot): Manusia normal butuh > 1.8 detik untuk mengisi form
  const rawTimestamp = formData.get('client_timestamp')?.toString() || '';
  const clientTime = parseInt(rawTimestamp, 10);
  if (!isNaN(clientTime) && clientTime > 0) {
    const elapsed = Date.now() - clientTime;
    if (elapsed < 1800) {
      // Bot otomatis yang mengisi dalam sekejap mata
      return { success: true, message: msg.botSuccess };
    }
  }

  // ---------------------------------------------------------------------------
  // B. PROTEKSI RATE LIMITING (Per-IP Flood Defense)
  // ---------------------------------------------------------------------------
  const clientIp = await getClientIp();
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      message: msg.rateLimit,
    };
  }

  // ---------------------------------------------------------------------------
  // C. VERIFIKASI ENVIRONMENT VARIABLES
  // ---------------------------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || 'jovsebwil723@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('[SECURITY ALERT] RESEND_API_KEY belum diset.');
    return {
      success: false,
      message: msg.serviceDown,
    };
  }

  // ---------------------------------------------------------------------------
  // D. EKSTRAKSI & SANITASI INPUT PENGGUNA
  // ---------------------------------------------------------------------------
  const rawName = formData.get('name')?.toString() || '';
  const rawEmail = formData.get('email')?.toString() || '';
  const rawWhatsapp = formData.get('whatsapp')?.toString() || '';
  const rawMessage = formData.get('message')?.toString() || '';

  const name = sanitizeHeader(rawName);
  const email = sanitizeHeader(rawEmail);
  const whatsapp = sanitizeHeader(rawWhatsapp);
  const message = sanitizeMessageBody(rawMessage);

  // ---------------------------------------------------------------------------
  // E. VALIDASI FORM & UKURAN PAYLOAD
  // ---------------------------------------------------------------------------
  const fieldErrors: Record<string, string> = {};

  // Validasi Nama
  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = msg.invalidName;
  }

  // Validasi Email
  if (!isValidEmail(email)) {
    fieldErrors.email = msg.invalidEmail;
  }

  // Validasi WhatsApp (Opsional, tapi jika diisi harus valid 8-16 digit angka)
  let cleanWaDigits = '';
  let waChatUrl = '';
  if (whatsapp.length > 0) {
    if (!/^[0-9+\-\s()]{8,25}$/.test(whatsapp)) {
      fieldErrors.whatsapp = msg.invalidPhone;
    } else {
      cleanWaDigits = whatsapp.replace(/\D/g, '');
      if (cleanWaDigits.length < 8 || cleanWaDigits.length > 16) {
        fieldErrors.whatsapp = msg.invalidPhone;
      } else {
        // Konversi format lokal (08...) ke internasional (+62...)
        let intlDigits = cleanWaDigits;
        if (intlDigits.startsWith('0')) {
          intlDigits = '62' + intlDigits.slice(1);
        }
        waChatUrl = `https://wa.me/${intlDigits}`;
      }
    }
  }

  // Validasi Pesan
  if (message.length < 10) {
    fieldErrors.message = msg.shortMessage;
  } else if (message.length > 3000) {
    fieldErrors.message = msg.longMessage;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: Object.values(fieldErrors)[0],
      fieldErrors,
    };
  }

  // ---------------------------------------------------------------------------
  // F. INSPEKSI KEAMANAN KONTEN (Anti-Malware, Script, Virus, & Spam)
  // ---------------------------------------------------------------------------
  const fullContentForScan = `${name} ${message} ${whatsapp}`;
  const threatScan = inspectContentForThreats(fullContentForScan);

  if (threatScan.isBlocked) {
    return {
      success: false,
      message: msg.blockedThreat,
    };
  }

  // Deteksi Spam Heuristik (Tarpit: beri status sukses agar bot tidak mencoba lagi)
  if (isSpamContent(message, threatScan.urlCount)) {
    return {
      success: true,
      message: msg.botSuccess,
    };
  }

  // ---------------------------------------------------------------------------
  // G. PREPARASI KONTEN EMAIL AMAN & TER-ENCODE
  // ---------------------------------------------------------------------------
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeWhatsapp = whatsapp.length > 0 ? escapeHtml(whatsapp) : 'Tidak disertakan';
  const safeMessage = escapeHtml(message);
  const maskedIp = anonymizeIp(clientIp);

  const timestamp = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Jakarta',
  }).format(new Date());

  // ---------------------------------------------------------------------------
  // H. EKSEKUSI PENGIRIMAN DENGAN RESEND
  // ---------------------------------------------------------------------------
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: targetEmail,
      replyTo: email,
      subject: `Pesan Klien Baru: ${name}`,
      // Fallback Plain Text untuk deliverability maksimal & anti-spam score tinggi
      text: [
        `PESAN MASUK DARI WEBSITE PORTOFOLIO`,
        `==================================================`,
        `Nama Pengirim : ${name}`,
        `Alamat Email  : ${email}`,
        `Nomor WhatsApp: ${whatsapp.length > 0 ? whatsapp : 'Tidak disertakan'}`,
        `Waktu Kirim   : ${timestamp} WIB`,
        `Audit IP Asal : ${maskedIp}`,
        `Status Scan   : ${threatScan.urlCount > 0 ? `Terdapat ${threatScan.urlCount} tautan luar` : 'Lulus verifikasi aman'}`,
        `--------------------------------------------------`,
        `ISI PESAN:`,
        message,
        `==================================================`,
        `Balas langsung ke email ini untuk menghubungi pengirim.`,
      ].join('\n'),
      // Template HTML Responsif & Terproteksi
      html: `
        <!DOCTYPE html>
        <html lang="id">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Pesan Portfolio</title>
          </head>
          <body style="margin: 0; padding: 24px 12px; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 28px 32px; background-color: #090d16; border-bottom: 2px solid #38bdf8;">
                  <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                    Pesan Masuk dari Web Portfolio
                  </h1>
                  <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">
                    Diterima pada ${timestamp} WIB
                  </p>
                </td>
              </tr>

              <!-- Security Status Badge -->
              <tr>
                <td style="padding: 20px 32px 0 32px;">
                  ${
                    threatScan.urlCount > 0
                      ? `
                      <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #92400e; line-height: 1.5;">
                        <strong>⚠️ Catatan Keamanan:</strong> Pesan ini memuat ${threatScan.urlCount} tautan eksternal. Harap berhati-hati dan jangan mengunduh file asing atau memasukkan kredensial login.
                      </div>
                      `
                      : `
                      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #166534; line-height: 1.5;">
                        <strong>🛡️ Status Keamanan:</strong> Lulus uji sanitasi menyeluruh (bebas skrip, virus & ekstensi terlarang).
                      </div>
                      `
                  }
                </td>
              </tr>

              <!-- Detail Pengirim -->
              <tr>
                <td style="padding: 24px 32px 32px 32px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; border-collapse: collapse;">
                    <tr>
                      <td width="130" style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9;">Pengirim</td>
                      <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${safeName}</td>
                    </tr>
                    <tr>
                      <td width="130" style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9;">Email</td>
                      <td style="padding: 10px 0; font-size: 15px; color: #0284c7; border-bottom: 1px solid #f1f5f9;">
                        <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                      </td>
                    </tr>
                    <tr>
                      <td width="130" style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9;">WhatsApp</td>
                      <td style="padding: 10px 0; font-size: 15px; color: #0f172a; font-weight: 500; border-bottom: 1px solid #f1f5f9;">
                        ${safeWhatsapp}
                        ${
                          waChatUrl
                            ? `&nbsp;&nbsp;<a href="${waChatUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 2px 8px; font-size: 12px; font-weight: 600; color: #ffffff; background-color: #25D366; border-radius: 4px; text-decoration: none;">Chat WhatsApp</a>`
                            : ''
                        }
                      </td>
                    </tr>
                    <tr>
                      <td width="130" style="padding: 10px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Audit Klien</td>
                      <td style="padding: 10px 0; font-size: 13px; color: #64748b; font-family: monospace;">IP: ${maskedIp}</td>
                    </tr>
                  </table>

                  <!-- Kotak Isi Pesan -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.05em;">
                      Isi Pesan Klien:
                    </div>
                    <div style="font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
                  </div>

                  <!-- Quick Reply Button -->
                  <div style="margin-top: 24px; text-align: center;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Pesan%20dari%20Portfolio%20-%20Jovan" style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Balas Email ke ${safeName}
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 16px 32px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    Email ini dikirim otomatis dari form kontak web portofolio.
                  </p>
                </td>
              </tr>

            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[RESEND API ERROR]', error);
      return {
        success: false,
        message: msg.sendError,
      };
    }

    return {
      success: true,
      message: msg.success,
    };
  } catch (err) {
    console.error('[SERVER UNHANDLED EXCEPTION]', err);
    return {
      success: false,
      message: msg.serviceDown,
    };
  }
}
