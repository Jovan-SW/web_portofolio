'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Check,
  Copy,
  Globe,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [wibTime, setWibTime] = useState<string>('');

  const emailAddress = 'jovanwill139@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/jovansebastian';
  const githubUrl = 'https://github.com/Jovan-SW';

  // Jam lokal real-time WIB (UTC+7) untuk pengunjung internasional dan remote
  useEffect(() => {
    const updateWibTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setWibTime(`${formatted} WIB`);
      } catch {
        setWibTime('UTC+7 WIB');
      }
    };

    updateWibTime();
    const timer = setInterval(updateWibTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = emailAddress;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-20 sm:py-28 relative border-t border-zinc-900 bg-zinc-950 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[260px] bg-emerald-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas Card - Sesuai Layout Referensi */}
        <div className="rounded-3xl bg-zinc-900/50 border border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden">
          
          {/* Top Hero Banner: Massive "Contact Us" Title */}
          <div className="px-6 sm:px-12 pt-10 sm:pt-14 pb-8 sm:pb-12 bg-zinc-900/80 border-b border-zinc-800/80">
            {/* Massive Heading */}
            <h1
              className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
            >
              Contact Me
            </h1>
          </div>

          {/* Content Area: Headline Ajakan & Grid Saluran Kontak */}
          <div className="px-6 sm:px-12 py-10 sm:py-14 bg-zinc-950/60 space-y-8 sm:space-y-10">
            
            {/* Headline Ajakan (Bahasa Indonesia) */}
            <div className="max-w-3xl">
              <h2
                className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-3"
                style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
              >
                Butuh informasi lebih lanjut?
                <br />
                <span className="text-zinc-300">Mari terhubung dan berdiskusi dengan kami</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                Rangkaian layanan rekayasa perangkat lunak full-stack dan pengembangan produk modern yang dirancang untuk mewujudkan strategi serta ide Anda menjadi solusi berskala besar.
              </p>
            </div>

            {/* Grid Kartu Informasi & Aksi Kontak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
              
              {/* Item 1: Email (Salin Email & mailto) - Span 2 kolom pada tablet/desktop agar menonjol */}
              <div className="md:col-span-2 p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 hover:border-zinc-700/80 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Email Resmi
                    </span>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-indigo-400 transition-colors break-all"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                {/* Tombol Aksi: Salin Email & Buka Mailto */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-all cursor-pointer active:scale-95"
                    title="Salin alamat email ke clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Email Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30 active:scale-95"
                    title="Kirim pesan langsung via aplikasi email Anda"
                  >
                    <span>Buka Mailto</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Item 2: Ketersediaan (Availability) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 hover:border-zinc-700/80 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-all flex-shrink-0 shadow-sm">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Ketersediaan (Availability)
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Tersedia untuk Kontrak &amp; Freelance
                    </p>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      Respons cepat &lt; 24 jam kerja
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3: Zona Waktu & Remote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 hover:border-zinc-700/80 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-all flex-shrink-0 shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Zona Waktu &amp; Remote
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        Worldwide Remote
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Indonesia (UTC+7 / WIB)
                    </p>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">
                      {wibTime ? `Waktu lokal: ${wibTime}` : 'Indonesia Standard Time'} • Remote Worldwide Ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4: LinkedIn Profile Link */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700/80 transition-all group block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-[#0077B5]/60 group-hover:text-[#0077B5] transition-all flex-shrink-0 shadow-sm">
                    <LinkedinIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        LinkedIn Profil
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mt-0.5">
                      www.linkedin.com/in/jovansebastian
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Koneksi profesional &amp; riwayat karir
                    </p>
                  </div>
                </div>
              </a>

              {/* Item 5: GitHub Profile Link */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700/80 transition-all group block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-zinc-500 group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                    <GithubIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        GitHub Profil
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mt-0.5">
                      https://github.com/Jovan-SW
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Repositori kode, arsitektur, &amp; proyek open source
                    </p>
                  </div>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

