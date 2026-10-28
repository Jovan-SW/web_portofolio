'use client';

import { ArrowRight, Globe, Briefcase } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    let el = document.getElementById(id);
    if (!el && id === 'projects') {
      el = document.getElementById('project');
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-36 pb-20 overflow-hidden"
    >
      {/* Subterranean Sunbeam & Nature Cavern Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Warm golden nature sunlight filtering down into the cave */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-yellow-400/15 via-amber-400/10 to-transparent rounded-full blur-[140px]" />
        {/* Subtle deep mineral blue ambient reflection */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]" />
        {/* Subtle subterranean stone texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'url("/mossy-cave-rock.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
        {/* Top Badges: Zona Waktu & Ketersediaan */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          {/* Zona Waktu */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] text-stone-300 text-xs sm:text-sm font-mono backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Based in Indonesia (UTC+7) • Available for Contract / Remote Worldwide</span>
          </div>

          {/* Ketersediaan */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-emerald-900/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] text-emerald-300 text-xs sm:text-sm font-mono backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Ketersediaan:</span>
            <span className="text-stone-200">Proyek freelance, kontrak</span>
          </div>
        </div>

        {/* Heading: Kuning Cerah Seperti Alam */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-yellow-300 drop-shadow-[0_2px_12px_rgba(253,224,71,0.25)] leading-[1.2] mb-3">
            Jovan Sebastian William
          </h1>
          <p className="text-lg sm:text-2xl font-bold font-mono tracking-wide text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]">
            Software Engineer <span className="text-yellow-400 font-semibold">(Full-Stack Web Developer)</span>
          </p>
        </div>

        {/* Elevator Pitch: Rata Tengah, Bersih Tanpa Border / AI Slop Lines, Font Body Biru Tua */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <p className="text-base sm:text-lg text-blue-300 font-medium leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            Saya adalah seorang <strong className="text-blue-200 font-semibold">Full-Stack Engineer</strong> yang berfokus pada pembangunan aplikasi web tangguh dan berkinerja tinggi dari lapisan antarmuka hingga basis data. Menggunakan <strong className="text-blue-200 font-semibold">Next.js</strong>, <strong className="text-blue-200 font-semibold">TypeScript</strong>, dan <strong className="text-blue-200 font-semibold">PostgreSQL</strong>, saya menyelesaikan tantangan fragmentasi sistem, latensi transmisi data, serta kerentanan akses. Pendekatan rekayasa saya memastikan setiap komponen aplikasi—mulai dari responsivitas interaksi pengguna, sinkronisasi logika bisnis di server, hingga integritas penyimpanan data—beroperasi secara selaras, aman, dan siap diskalakan.
          </p>
        </div>

        {/* Action CTAs: "Lihat Projek" & "Hubungi Saya" */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-yellow-300 hover:text-white hover:bg-stone-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.6)] font-mono font-bold text-sm sm:text-base tracking-wider uppercase active:translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Lihat Projek</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-950 border border-stone-700/80 text-stone-200 hover:text-white hover:bg-stone-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] font-mono font-semibold text-sm sm:text-base tracking-wider uppercase active:translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Hubungi Saya</span>
          </button>
        </div>
      </div>
    </section>
  );
}
