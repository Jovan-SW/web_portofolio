'use server';

import { Resend } from 'resend';

// -----------------------------------------------------------------------------
// 1. TYPE DEFINITIONS & INTERFACES
// -----------------------------------------------------------------------------
export interface ContactFormResponse {
  success: boolean;
  message: string;
}

// -----------------------------------------------------------------------------
// 2. KEAMANAN LAYER 1: SANITASI & PROTEKSI INJECTION
// -----------------------------------------------------------------------------

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}


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

// -----------------------------------------------------------------------------
// 3. CORE SERVER ACTION
// -----------------------------------------------------------------------------
export async function sendContactEmail(formData: FormData): Promise<ContactFormResponse> {
  // A. PROTEKSI ANTI-BOT (Honeypot Trap)
  // Input tersembunyi yang hanya diisi oleh automated bot script.
  // Jika terisi, server memberikan status sukses palsu tanpa membuang kuota API.
  const honeypot = formData.get('hp_website')?.toString() || '';
  if (honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Pesan Anda berhasil dikirim! Saya akan segera merespons.',
    };
  }

  // B. VERIFIKASI ENVIRONMENT VARIABLE
  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!apiKey || !targetEmail) {
    console.error('[SECURITY ALERT] RESEND_API_KEY atau CONTACT_RECEIVER_EMAIL belum diset.');
    return {
      success: false,
      message: 'Layanan email sedang dalam pemeliharaan. Silakan coba kembali nanti.',
    };
  }

  // C. EKSTRAKSI INPUT PENGGUNA
  const rawName = formData.get('name')?.toString() || '';
  const rawEmail = formData.get('email')?.toString() || '';
  const rawWhatsapp = formData.get('whatsapp')?.toString() || '';
  const rawMessage = formData.get('message')?.toString() || '';

  // D. VALIDASI INPUT & BATASAN UKURAN (Prevent Payload Bomb)
  const name = sanitizeHeader(rawName);
  const email = sanitizeHeader(rawEmail);
  const whatsapp = sanitizeHeader(rawWhatsapp);
  const message = rawMessage.trim();

  // Validasi Nama: 2 - 80 karakter
  if (name.length < 2 || name.length > 80) {
    return {
      success: false,
      message: 'Nama wajib diisi dengan panjang antara 2 hingga 80 karakter.',
    };
  }

  // Validasi Format Email (RFC 5322 Standard Regex)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(email) || email.length > 100) {
    return {
      success: false,
      message: 'Format alamat email tidak valid.',
    };
  }

  // Validasi WhatsApp (Opsional: jika diisi, harus 8 - 20 digit angka, tanda +, spasi, atau strip)
  if (whatsapp.length > 0) {
    const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
    if (!phoneRegex.test(whatsapp)) {
      return {
        success: false,
        message: 'Nomor WhatsApp tidak valid (masukkan 8-20 digit angka).',
      };
    }
  }

  // Validasi Isi Pesan: 10 - 3000 karakter
  if (message.length < 10) {
    return {
      success: false,
      message: 'Pesan terlalu singkat (minimal 10 karakter).',
    };
  }
  if (message.length > 3000) {
    return {
      success: false,
      message: 'Pesan terlalu panjang (maksimal 3000 karakter).',
    };
  }

  // E. SANITASI UNTUK OUTPUT RENDERING
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeWhatsapp = whatsapp.length > 0 ? escapeHtml(whatsapp) : 'Tidak disertakan';
  const safeMessage = escapeHtml(message);
  
  // Waktu pengiriman (WIB)
  const timestamp = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Jakarta',
  }).format(new Date());

  // F. INISIALISASI RESEND & EKSEKUSI PENGIRIMAN
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: targetEmail,
      replyTo: email,
      subject: `Pesan Klien Baru: ${name}`,
      // Fallback Plain Text: Meningkatkan reputasi deliverability agar tidak masuk SPAM
      text: [
        `PESAN BARU DARI WEBSITE PORTOFOLIO`,
        `----------------------------------------`,
        `Nama Pengirim : ${name}`,
        `Email         : ${email}`,
        `WhatsApp      : ${whatsapp.length > 0 ? whatsapp : 'Tidak disertakan'}`,
        `Waktu Kirim   : ${timestamp} WIB`,
        `----------------------------------------`,
        `Isi Pesan:`,
        message,
      ].join('\n'),
      // Template HTML Responsif & Clean
      html: `
        <!DOCTYPE html>
        <html lang="id">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Pesan Portfolio</title>
          </head>
          <body style="margin: 0; padding: 24px 12px; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);">
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
              <tr>
                <td style="padding: 32px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td width="120" style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">Pengirim</td>
                      <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #0f172a;">${safeName}</td>
                    </tr>
                    <tr>
                      <td width="120" style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">Email</td>
                      <td style="padding: 8px 0; font-size: 15px; color: #0284c7;">
                        <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                      </td>
                    </tr>
                    <tr>
                      <td width="120" style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">WhatsApp</td>
                      <td style="padding: 8px 0; font-size: 15px; color: #0f172a; font-weight: 500;">${safeWhatsapp}</td>
                    </tr>
                  </table>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                    <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.05em;">
                      Isi Pesan Klien:
                    </div>
                    <div style="font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 32px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    Klik tombol <strong>Reply</strong> langsung di Gmail Anda untuk membalas email ke pengirim ini.
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
        message: 'Gagal mengirimkan pesan ke server email. Silakan coba lagi beberapa saat lagi.',
      };
    }

    return {
      success: true,
      message: 'Pesan Anda berhasil terkirim! Saya akan segera menghubungi Anda kembali.',
    };
  } catch (err) {
    console.error('[SERVER UNHANDLED EXCEPTION]', err);
    return {
      success: false,
      message: 'Terjadi gangguan internal pada server. Silakan coba beberapa saat lagi.',
    };
  }
}