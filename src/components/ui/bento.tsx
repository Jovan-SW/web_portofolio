'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

export interface BentoCardProps {
  dark?: boolean;
  className?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ('top' | 'bottom')[];
}

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  description,
  graphic,
  fade = ['bottom'],
}: BentoCardProps) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'group relative flex flex-col justify-between overflow-hidden',
        'bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50',
        'shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]',
        'transition-all duration-300'
      )}
    >
      {/* Top Graphic Area (Only when graphic is provided) */}
      {graphic && (
        <div className="relative h-44 sm:h-48 w-full overflow-hidden shrink-0 bg-zinc-900/40">
          {graphic}
          {fade.includes('top') && (
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent opacity-80 pointer-events-none" />
          )}
          {fade.includes('bottom') && (
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent opacity-95 pointer-events-none" />
          )}
        </div>
      )}

      {/* Content Area */}
      <div
        className={clsx(
          'relative p-6 sm:p-8 z-20 flex-1 flex flex-col',
          graphic ? 'justify-end' : 'justify-start'
        )}
      >
        {eyebrow && (
          <span className="text-[11px] font-mono tracking-widest text-amber-400 font-semibold uppercase">
            {eyebrow}
          </span>
        )}
        <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
          {title}
        </h3>
        <p className="mt-3.5 font-serif-contemporary text-[15px] sm:text-[17px] leading-[1.8] text-zinc-300/95 font-normal tracking-wide">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default BentoCard;
