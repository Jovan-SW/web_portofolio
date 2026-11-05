'use client';

import { clsx } from 'clsx';
import { motion, type Variants } from 'framer-motion';
import React from 'react';

export interface BentoCardProps {
  dark?: boolean;
  className?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  graphic?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  delay?: number;
  fade?: ('top' | 'bottom')[];
  children?: React.ReactNode;
}

// 3D Cave Pop-In: Muncul murni dari dalam goa ke luar (Center Zoom / Scale-out, tanpa translasi Y dari bawah)
export const caveCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.1, // Berada di titik pusat dalam goa
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1, // Melompat keluar langsung ke arah viewer dari dalam goa
    transition: {
      duration: 0.55,
      delay,
      ease: [0.34, 1.3, 0.64, 1] as const, // Pop elastis yang cepat dan ringan
    },
  }),
};

// Mini Pop-In untuk sub-panel di dalam Cara Kerja (juga murni dari dalam keluar tanpa translasi Y)
export const subPanelPopVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: 0.2,
    },
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      delay,
      ease: [0.34, 1.25, 0.64, 1] as const,
    },
  }),
};

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  description,
  graphic,
  icon,
  badge,
  delay = 0,
  fade = ['bottom'],
  children,
}: BentoCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
      variants={caveCardVariants}
      custom={delay}
      whileHover={{ scale: 1.015 }}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        'group relative flex flex-col justify-between',
        'rounded-xl sm:rounded-2xl md:rounded-3xl p-[1px]',
        // 3D Transparan Glass Outer Bevel
        'bg-gradient-to-b from-white/35 via-white/10 to-transparent',
        'hover:from-sky-400/80 hover:via-cyan-400/30 hover:to-transparent',
        'transition-colors duration-300',
        className
      )}
    >
      {/* 3D Clean Transparent Glass Card Body */}
      <div
        className={clsx(
          'relative flex-1 flex flex-col justify-between overflow-hidden',
          'rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)]',
          'bg-black/15 hover:bg-black/25 transition-colors duration-300 card-3d-glass',
          'border border-white/10 hover:border-sky-400/50 border-b-2 border-b-black/50 h-full'
        )}
      >
        {/* Specular Top Rim Glint Hairline */}
        <div className="absolute top-0 inset-x-4 sm:inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-cyan-200 transition-colors duration-300" />

        {/* 3D Cyber Hardware Corner Accents & Rivets */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-r-2 border-sky-400/70 rounded-br-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />

        {/* Top Graphic Area (if provided) */}
        {graphic && (
          <div className="relative h-44 sm:h-48 w-full overflow-hidden shrink-0 bg-white/[0.03] z-20">
            {graphic}
            {fade.includes('top') && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
            )}
            {fade.includes('bottom') && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            )}
          </div>
        )}

        {/* Content Area */}
        <div
          className={clsx(
            'relative p-2.5 sm:p-6 md:p-8 z-20 flex-1 flex flex-col',
            graphic ? 'justify-end' : 'justify-start'
          )}
        >
          {/* Eyebrow Header, Icon & Badge */}
          {(eyebrow || icon || badge) && (
            <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
              <div className="flex items-center gap-1.5">
                {icon && <span className="text-sky-400">{icon}</span>}
                {eyebrow && (
                  <span className="text-[8.5px] sm:text-[10px] md:text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {eyebrow}
                  </span>
                )}
              </div>
              {badge && <div>{badge}</div>}
            </div>
          )}

          {title && (
            <h3 className="mt-0.5 sm:mt-1 text-[12px] sm:text-lg md:text-xl font-bold tracking-tight text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-cyan-100 transition-colors">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-1.5 sm:mt-3 md:mt-3.5 font-serif-contemporary text-[10.5px] sm:text-[14px] md:text-[16px] leading-[1.45] sm:leading-[1.75] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default BentoCard;
