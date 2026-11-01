'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Typewriter from '@/components/ui/Typewriter';

export default function HeroSection() {
  // 3D Mouse Parallax values for organic interactive tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth mouse parallax without abrupt jumps
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 25 });

  // Subtle 3D tilt angles: -6deg to +6deg
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id: string) => {
    let el = document.getElementById(id);
    if (!el && id === 'projects') el = document.getElementById('project');
    if (!el && id === 'home') el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between items-center pt-32 sm:pt-36 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Subtle Ambient Lighting over the Monolith Server */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft golden spotlight behind 3D header to make it pop and feel luminous */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[320px] bg-gradient-to-b from-amber-500/15 via-yellow-600/8 to-transparent rounded-full blur-[130px]" />
        {/* Subtle warm amber/copper horizon ambient glow on the side */}
        <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] bg-gradient-to-bl from-amber-600/10 via-orange-900/5 to-transparent rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10 flex-1 flex flex-col justify-center">
        {/* Top Metadata: Location & Availability (Editorial, High-Tech HUD Styling) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-mono tracking-wider uppercase mb-7 sm:mb-9 text-zinc-400 select-none">
          <span className="text-zinc-300">Based in Indonesia (UTC+7)</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">Remote Worldwide</span>
          <span className="text-zinc-600">/</span>
          <span className="text-amber-400 font-semibold">Available for Contract &amp; Freelance</span>
        </div>

        {/* Headline: Sculpted 3D Golden Monolith with Interactive Tilt */}
        <motion.div
          style={{
            perspective: 1000,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-6 sm:mb-8 cursor-default select-none will-change-transform"
        >
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-3d-gold leading-[1.12] mb-3 sm:mb-4"
            style={{
              fontFamily: 'var(--font-satoshi), Satoshi, sans-serif',
              transform: 'translateZ(32px)',
            }}
          >
            Jovan Sebastian William
          </h1>
          <div
            className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug flex items-center justify-center min-h-[2.4rem] sm:min-h-[2.8rem]"
            style={{
              fontFamily: 'var(--font-satoshi), Satoshi, sans-serif',
              transform: 'translateZ(20px)',
            }}
          >
            <Typewriter
              words={[
                'Full-Stack Web Developer',
                'Software Engineer',
                'Next.js & TypeScript Specialist',
                'Full-Stack System Architect',
              ]}
              typingSpeed={65}
              deletingSpeed={28}
              pauseDuration={2400}
            />
          </div>
        </motion.div>

        {/* Elevator Pitch: Crisp Legibility over 3D Monolith */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto mb-9 sm:mb-11 text-center">
          <p className="text-base sm:text-lg text-zinc-200/95 font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Saya adalah seorang <strong className="text-yellow-400 font-semibold">Full-Stack Engineer</strong> yang berfokus membangun aplikasi web tangguh dan berkinerja tinggi dari antarmuka hingga basis data. Menggunakan <strong className="text-zinc-100 font-semibold">Next.js</strong>, <strong className="text-zinc-100 font-semibold">TypeScript</strong>, dan <strong className="text-zinc-100 font-semibold">PostgreSQL</strong>, saya mengatasi tantangan fragmentasi sistem, latensi transmisi data, serta kerentanan akses—memastikan setiap komponen aplikasi beroperasi selaras, aman, dan siap diskalakan.
          </p>
        </div>

        {/* Action CTAs: Refined, High-Contrast Modernist Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm tracking-wide active:scale-[0.98] transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            <span>Lihat Projek</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 hover:text-white font-medium text-sm tracking-wide active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <span>Hubungi Saya</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt at Base of Hero */}
      <div className="relative z-10 pt-4 pb-2 select-none">
        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer group"
          aria-label="Scroll to About Section"
        >
          <span className="font-mono text-[11px] tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-amber-400/80 group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
}
