'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected errors gracefully
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center">
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-400 shadow-inner mb-6">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <span className="font-mono text-xs font-bold tracking-widest uppercase text-red-400/90 mb-2">
          System Notice • Error Recovered
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          Terjadi Gangguan Sementara
        </h1>
        <p className="text-sm text-zinc-400 font-serif-contemporary leading-relaxed mb-8">
          Aplikasi mengalami hambatan saat merender halaman ini. Silakan coba muat ulang atau kembali ke beranda.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
          <Link
            href="/"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-sm font-semibold transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

