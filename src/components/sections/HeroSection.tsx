'use client';

import { ArrowRight, Mail, Terminal, Sparkles, Code2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Background ambient decorative glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for New Projects & Opportunities</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400 font-mono">Full-Stack Engineer</span>
        </div>

        {/* Main Heading (Single H1 for SEO) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Membangun Solusi Digital{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Modern & Skalabel
          </span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10">
          Halo, saya <span className="text-zinc-100 font-semibold">Jovan</span>. Rekayasawan perangkat lunak yang berfokus pada pengembangan web end-to-end dengan arsitektur bersih, performa kencang, dan pengalaman visual yang elegan.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            type="button"
            onClick={() => scrollTo('project')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Lihat Karya & Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm sm:text-base border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer"
          >
            <span>Hubungi Saya</span>
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-2 pl-2">
            <a
              href="https://github.com/Jovan-SW"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@jovan.dev"
              className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Key Highlights / Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">3+</div>
            <div className="text-xs sm:text-sm text-zinc-400">Featured Web Apps (Full-Stack)</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">Next.js 16</div>
            <div className="text-xs sm:text-sm text-zinc-400">App Router & Server Components</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-xs sm:text-sm text-zinc-400">Type-Safe Architecture</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">D2C & SaaS</div>
            <div className="text-xs sm:text-sm text-zinc-400">Domain-Focused Solutions</div>
          </div>
        </div>

        {/* Tech Stack Pills Marquee / Ribbon */}
        <div className="mt-14 pt-8 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-zinc-400">
          <span className="text-zinc-500 font-sans mr-2">Core Stack:</span>
          {['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'PostgreSQL', 'Vercel'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
