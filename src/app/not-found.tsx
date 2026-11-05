import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { SEO_CONFIG } from '@/data/seo-keywords';

export const metadata = {
  title: `404 — Halaman Tidak Ditemukan | ${SEO_CONFIG.name}`,
  description: 'Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 404 Glass Card Container */}
      <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center">
        {/* Subtle Glint Accent */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent pointer-events-none" />

        {/* Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 flex items-center justify-center text-sky-400 shadow-inner mb-6">
          <Compass className="w-7 h-7 animate-pulse" />
        </div>

        {/* Big Stylized 404 */}
        <span className="font-mono text-xs font-bold tracking-widest uppercase text-sky-400/90 mb-2">
          Error 404 • Resource Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-serif-contemporary leading-relaxed mb-8">
          Tautan yang Anda tuju mungkin salah ketik, sudah dihapus, atau sedang dalam pembaruan arsitektur.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/#projects"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-sm font-semibold transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Proyek</span>
          </Link>
        </div>
      </div>

      {/* Footer minimal info */}
      <div className="relative z-10 mt-8 text-xs font-mono text-zinc-600">
        {SEO_CONFIG.siteUrl} • {SEO_CONFIG.name}
      </div>
    </div>
  );
}

