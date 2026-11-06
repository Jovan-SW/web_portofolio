'use client';

import { motion } from 'framer-motion';
import { BentoCard, caveCardVariants } from '@/components/ui/bento';
import { InteractiveTiltCard } from '@/components/ui/tilt-card';
import { useLanguage } from '@/context/LanguageContext';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';
import IceMistCanvas from '@/components/ui/IceMistCanvas';
import LogoMarquee, { Logo } from '@/components/ui/logo-marquee';

const TECH_LOGOS_ROW_1: Logo[] = [
  { src: '/tech/react.svg', alt: 'React' },
  { src: '/tech/nextjs.svg', alt: 'Next.js' },
  { src: '/tech/typescript.svg', alt: 'TypeScript' },
  { src: '/tech/tailwind.svg', alt: 'Tailwind CSS' },
  { src: '/tech/docker.svg', alt: 'Docker' },
  { src: '/tech/postgresql.svg', alt: 'PostgreSQL' },
  { src: '/tech/github.svg', alt: 'GitHub' },
  { src: '/tech/vercel.svg', alt: 'Vercel' },
  { src: '/tech/supabase.svg', alt: 'Supabase' },
];

const TECH_LOGOS_ROW_2: Logo[] = [
  { src: '/tech/python.svg', alt: 'Python' },
  { src: '/tech/nodejs.svg', alt: 'Node.js' },
  { src: '/tech/javascript.svg', alt: 'JavaScript' },
  { src: '/tech/html5.svg', alt: 'HTML5' },
  { src: '/tech/css3.svg', alt: 'CSS3' },
  { src: '/tech/vue.svg', alt: 'Vue.js' },
  { src: '/tech/git.svg', alt: 'Git' },
  { src: '/tech/prisma.svg', alt: 'Prisma' },
  { src: '/tech/vite.svg', alt: 'Vite' },
];

export default function AboutSection() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="about"
      aria-label="About Section"
      className="py-12 sm:py-20 md:py-28 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* 3D Glacial Ice Fog Mist Effect on Scroll */}
      <IceMistCanvas />
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-7 md:gap-10">
          {/* =========================================================================
              BAGIAN 1: Technical Journey & Portrait
              Mobile: Berdampingan Card 1 (6/12) & Card 2 (6/12) - Ukuran Seimbang & Senada
              Desktop: Berdampingan Card 1 (7/12) & Card 2 (5/12)
              Clean & Transparan 3D Glass Cards (Interactive Tilt & Glare Photo)
              ========================================================================= */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-6 md:gap-8 items-stretch">
            {/* Card 1: Technical Journey Text (Dibuat sedikit lebih ramping & kompak di mobile) */}
            <BentoCard
              eyebrow={lang === 'en' ? 'Evolution & Journey' : 'Evolusi & Perjalanan'}
              title="Technical Journey"
              description={t('about.description')}
              delay={0.04}
              className="col-span-6 sm:col-span-7 md:col-span-7 lg:col-span-7 h-full flex flex-col justify-between sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]"
            />

            {/* Card 2: Foto Jovan - Berdampingan di mobile (col-span-6), sedikit dikecilkan agar proporsional */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
              variants={caveCardVariants}
              custom={0.16}
              className="col-span-6 sm:col-span-5 md:col-span-5 lg:col-span-5 h-full w-full flex flex-col justify-center sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]"
            >
              <InteractiveTiltCard
                image={{
                  src: '/inimahgw.png',
                  alt: t('about.photoAlt'),
                }}
                tiltFactor={12}
                perspective={1100}
                hoverScale={1.025}
                glareEffect={true}
                glareIntensity={0.05}
                holographicFoil={false}
                iceGlassEffect={true}
                iceFrame="/ice-frame.png"
                cornerAccents={false}
                className="w-full h-full flex-1 flex flex-col"
              />
            </motion.div>
          </div>

          {/* =========================================================================
              BAGIAN 2: Tech Stack Logo Marquee (2 Baris Berlawanan Arah)
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
            variants={caveCardVariants}
            custom={0.28}
            className="w-full pt-1 sm:pt-2"
          >
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] text-center sm:text-left">
                {lang === 'en' ? 'Core Tech Stack & Ecosystem' : 'Ekosistem & Tumpukan Teknologi'}
              </span>
              <LogoMarquee logos={TECH_LOGOS_ROW_1} reverse={false} duration={24} durationOnHover={45} gap={20} />
              <LogoMarquee logos={TECH_LOGOS_ROW_2} reverse={true} duration={24} durationOnHover={45} gap={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
