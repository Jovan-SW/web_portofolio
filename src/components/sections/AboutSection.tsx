'use client';

import { Code2, Database, Layout, ShieldCheck, Zap, Laptop, Award, ArrowUpRight } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Engineering',
    icon: Layout,
    color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400',
    skills: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Server Components', 'Responsive UI'],
  },
  {
    title: 'Backend & Data',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    skills: ['Node.js', 'RESTful API Design', 'Supabase', 'PostgreSQL', 'Data Modeling', 'State Management'],
  },
  {
    title: 'Architecture & Quality',
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400',
    skills: ['Type Safety', 'Clean Code & SOLID', 'SEO & Core Web Vitals', 'Modular Architecture', 'Performance Profiling'],
  },
  {
    title: 'Workflow & Tooling',
    icon: Zap,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    skills: ['Git & GitHub CI/CD', 'Vercel Deployment', 'Turbopack / Vite', 'Figma to Code', 'Postman & Testing'],
  },
];

const PRINCIPLES = [
  {
    title: 'Arsitektur Bersih & Skalabel',
    desc: 'Menulis kode modular dengan pemisahan tanggung jawab yang jelas, memudahkan pemeliharaan dan skalabilitas jangka panjang.',
  },
  {
    title: 'Performa & Pengalaman Pengguna',
    desc: 'Setiap milidetik berharga. Mengoptimalkan waktu muat halaman, transisi halus, dan antarmuka responsif tanpa lag.',
  },
  {
    title: 'Pendekatan Berorientasi Solusi',
    desc: 'Fokus pada penyelesaian masalah bisnis nyata melalui perangkat lunak yang andal, mulai dari D2C hingga platform multimedia.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Section"
      className="py-24 relative border-t border-zinc-900 bg-zinc-950/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Laptop className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Dedikasi Rekayasa Web & Detail Antarmuka
          </h2>
          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Menjembatani logika sistem komputasi yang kokoh dengan estetika visual modern untuk melahirkan produk digital yang bernilai.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Bio narrative */}
          <div className="lg:col-span-7 space-y-5 text-zinc-300 leading-relaxed text-base">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Siapa Saya & Pendekatan Kerja
              </h3>
              <p className="text-zinc-400 mb-4">
                Saya adalah Full-Stack Developer dengan spesialisasi ekosistem modern JavaScript/TypeScript, khususnya Next.js, React, Tailwind CSS, dan database relasional.
              </p>
              <p className="text-zinc-400 mb-4">
                Bagi saya, web development bukan sekadar menyusun baris kode, melainkan menciptakan sistem terpadu yang efisien, mudah dikembangkan, dan memberikan nilai nyata bagi pengguna akhir serta pemangku kepentingan.
              </p>
              <p className="text-zinc-400">
                Mulai dari perancangan alur katalog e-commerce mandiri (D2C) seperti <span className="text-indigo-300 font-medium">Jovique Official Store</span>, platform penjelajahan sinema <span className="text-indigo-300 font-medium">Revlume</span>, hingga sistem on-demand grooming <span className="text-indigo-300 font-medium">Barber-O</span>, saya selalu mengedepankan kualitas kode dan pengalaman interaksi terbaik.
              </p>

              <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-wrap gap-4 items-center justify-between text-xs sm:text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono font-bold">Status:</span>
                  <span>Siap Kolaborasi & Remote Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 font-mono font-bold">Lokasi:</span>
                  <span>Indonesia (WIB / UTC+7)</span>
                </div>
              </div>
            </div>

            {/* Principles cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRINCIPLES.map((principle, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-white mb-1.5">{principle.title}</h4>
                  <p className="text-xs text-zinc-400 leading-normal">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skill Matrix Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${cat.color} border border-white/5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {cat.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-zinc-300 text-xs font-mono border border-zinc-700/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
