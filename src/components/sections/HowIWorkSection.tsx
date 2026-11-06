'use client';

import { motion } from 'framer-motion';
import { caveCardVariants, subPanelPopVariants } from '@/components/ui/bento';
import { useLanguage } from '@/context/LanguageContext';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';
import IceMistCanvas from '@/components/ui/IceMistCanvas';

export default function HowIWorkSection() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="how-i-work"
      aria-label={lang === 'en' ? 'How I Work Section' : 'Bagian Cara Saya Bekerja'}
      className="py-12 sm:py-20 md:py-28 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* 3D Glacial Ice Fog Mist Effect on Scroll */}
      <IceMistCanvas />
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      {/* Anchor aliases */}
      <div id="cara-saya-bekerja" className="absolute -top-24 pointer-events-none" />
      <div id="workflow" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
          variants={caveCardVariants}
          custom={0.1}
          className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-12"
        >
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {lang === 'en' ? 'How I Work' : 'Cara Saya Bekerja'}
          </h2>
        </motion.div>

        {/* 1 Kotak Utuh di Bawah, Compact di Mobile */}
        <div className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
            variants={caveCardVariants}
            custom={0.76}
            whileHover={{ scale: 1.015 }}
            className="group relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-sky-400/80 hover:via-cyan-400/30 hover:to-transparent transition-colors duration-300"
          >
            {/* 3D Clean Transparent Glass Panel Body */}
            <div className="relative rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/15 hover:bg-black/25 transition-colors duration-300 card-3d-glass border border-white/10 hover:border-sky-400/50 border-b-2 border-b-black/50 p-4 sm:p-7 md:p-10">
              {/* Specular Top Rim Glint Hairline */}
              <div className="absolute top-0 inset-x-4 sm:inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-cyan-200 transition-colors duration-300" />

              {/* 3D Cyber Hardware Corner Accents & Rivets */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-r-2 border-sky-400/70 rounded-br-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />

              {/* Header Area */}
              <div className="mb-3.5 sm:mb-6 md:mb-8">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                  {lang === 'en' ? 'Workflow & Collaboration' : 'Alur Kerja & Kolaborasi'}
                </span>
                <h3 className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-cyan-100 transition-colors">
                  {lang === 'en' ? 'How I Work' : 'Cara Kerja'}
                </h3>
              </div>

              {/* 3 Pillars Sub-Panels: Compact di Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 pt-3.5 sm:pt-6 border-t border-white/15">
                {/* Point 1: Komunikasi Tertulis yang Jelas */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.86}
                  className="relative p-3.5 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-sky-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5 sm:space-y-2.5">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {lang === 'en' ? 'Clear Written Communication' : 'Komunikasi Tertulis yang Jelas'}
                    </h4>
                    <p className="font-serif-contemporary text-[12.5px] sm:text-[14px] md:text-[16px] leading-[1.6] sm:leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {t('about.pillar1Desc')}
                    </p>
                  </div>
                </motion.div>

                {/* Point 2: Standar Kode yang Ketat */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.96}
                  className="relative p-3.5 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-sky-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5 sm:space-y-2.5">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {lang === 'en' ? 'Rigorous Code Standards' : 'Standar Kode yang Ketat'}
                    </h4>
                    <p className="font-serif-contemporary text-[12.5px] sm:text-[14px] md:text-[16px] leading-[1.6] sm:leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {t('about.pillar2Desc')}
                    </p>
                  </div>
                </motion.div>

                {/* Point 3: Terbuka terhadap Masukan */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={1.06}
                  className="relative p-3.5 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-sky-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5 sm:space-y-2.5">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {lang === 'en' ? 'Open to Feedback' : 'Terbuka terhadap Masukan'}
                    </h4>
                    <p className="font-serif-contemporary text-[12.5px] sm:text-[14px] md:text-[16px] leading-[1.6] sm:leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {lang === 'en'
                        ? 'I consider code reviews an opportunity to elevate code quality collectively, not find fault. Constructive feedback is consistently leveraged to strengthen system architecture.'
                        : 'Saya memandang code review sebagai sarana menjaga kualitas sistem bersama tim, bukan ajang mencari kesalahan. Masukan teknis yang kritis selalu saya manfaatkan untuk memperkuat arsitektur kode.'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

