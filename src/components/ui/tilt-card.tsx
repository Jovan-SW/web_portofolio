'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface InteractiveTiltCardProps {
  image?: {
    src: string;
    alt: string;
  };
  tiltFactor?: number;
  perspective?: number;
  borderRadius?: number | string;
  backgroundColor?: string;
  shadowColor?: string;
  shadowIntensity?: number;
  hoverScale?: number;
  glareEffect?: boolean;
  glareIntensity?: number;
  glareSize?: number;
  className?: string;
  children?: React.ReactNode;
  holographicFoil?: boolean;
  iceGlassEffect?: boolean;
  iceFrame?: boolean | string;
  cornerAccents?: boolean;
}

export function InteractiveTiltCard({
  image = {
    src: '/inimahgw.png',
    alt: 'Jovan - Technical Journey',
  },
  tiltFactor = 12,
  perspective = 1100,
  borderRadius = '1.5rem',
  backgroundColor = 'transparent',
  shadowColor = 'rgba(0, 0, 0, 0.5)',
  shadowIntensity = 0.65,
  hoverScale = 1.025,
  glareEffect = true,
  glareIntensity = 0.06,
  glareSize = 50,
  className = '',
  children,
  holographicFoil = false,
  iceGlassEffect = true,
  iceFrame = '/ice-frame.png',
  cornerAccents = false,
}: InteractiveTiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel coordinates inside the card for the thin reactive white border spotlight
  const mousePixelX = useMotionValue(150);
  const mousePixelY = useMotionValue(150);

  // Physics spring config with butter-smooth damping (120 FPS, organic response)
  const springConfig = { damping: 26, stiffness: 240, mass: 0.6 };

  // 3D rotation angles
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltFactor, -tiltFactor]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltFactor, tiltFactor]), springConfig);

  // 3D Parallax offset for photo layer
  const parallaxPhotoX = useSpring(useTransform(mouseX, [-0.5, 0.5], [6, -6]), springConfig);
  const parallaxPhotoY = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);

  // Dynamic coordinates for liquid bloom center (percentage)
  const glarePercentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springConfig);
  const glarePercentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springConfig);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mousePixelX.set(clientX);
      mousePixelY.set(clientY);

      const normX = clientX / rect.width - 0.5;
      const normY = clientY / rect.height - 0.5;

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [mouseX, mouseY, mousePixelX, mousePixelY]
  );

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const radiusStyle = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <motion.div
      ref={cardRef}
      className={`group relative select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
      animate={{ scale: isHovered ? hoverScale : 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Main Outer Bevel Shell with Thin, Refined Platinum White Border */}
      <motion.div
        className="relative w-full h-full p-[1px] rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-b from-white/30 via-white/10 to-transparent hover:from-white/70 hover:via-white/30 hover:to-transparent transition-colors duration-500"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: radiusStyle,
          boxShadow: isHovered
            ? `0 24px 50px -12px rgba(0, 0, 0, ${shadowIntensity}), 0 0 25px -3px rgba(255, 255, 255, 0.12)`
            : `0 10px 30px -6px ${shadowColor}`,
        }}
      >
        {/* Thin, Delicate Cursor-Following Border Spotlight (Super thin, subtle hairline) */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 z-10"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: useTransform(
              [mousePixelX, mousePixelY],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 65%)`
            ),
          }}
        />

        {/* Inner 3D Clean Transparent Glass Card Body */}
        <div
          className="relative w-full h-full rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/25 card-3d-glass border border-white/10 hover:border-white/40 border-b-2 border-b-black/50 flex flex-col"
          style={{
            backgroundColor,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Ultra-thin Specular Top Rim Glint Hairline */}
          <div className="absolute top-0 inset-x-4 sm:inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30 group-hover:via-white/80 transition-colors duration-300" />

          {/* Minimal Thin Chrome Corner Brackets (Clean hairline, no bubbles) */}
          {cornerAccents && (
            <>
              {/* Top-Left Bracket */}
              <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-[1px] border-l-[1px] border-white/30 rounded-tl-sm pointer-events-none group-hover:border-white/70 transition-colors duration-300 z-30 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              {/* Bottom-Right Bracket */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 right-2.5 sm:right-3.5 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-[1px] border-r-[1px] border-white/30 rounded-br-sm pointer-events-none group-hover:border-white/70 transition-colors duration-300 z-30 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              {/* Top-Right Bracket */}
              <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-[1px] border-r-[1px] border-white/30 rounded-tr-sm pointer-events-none group-hover:border-white/70 transition-colors duration-300 z-30 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              {/* Bottom-Left Bracket */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-[1px] border-l-[1px] border-white/30 rounded-bl-sm pointer-events-none group-hover:border-white/70 transition-colors duration-300 z-30 group-hover:shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            </>
          )}

          {/* 3D Photo Canvas with Parallax & Pure Studio Contrast */}
          <div className="relative w-full h-full min-h-[190px] sm:min-h-[280px] md:min-h-full flex-1 overflow-hidden">
            {children ? (
              children
            ) : (
              <motion.div
                className="relative w-full h-full"
                style={{
                  x: parallaxPhotoX,
                  y: parallaxPhotoY,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Photo Element: 100% visible, crisp, clean, with subtle studio contrast on hover */}
                <div
                  className="relative w-full h-full transition-all duration-500 ease-out"
                  style={{
                    filter: isHovered
                      ? 'contrast(104%) saturate(104%) brightness(102%) drop-shadow(0 0 16px rgba(255,255,255,0.12))'
                      : 'contrast(100%) saturate(100%) brightness(98%)',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    transformOrigin: 'center 40%',
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 420px"
                    className="object-cover object-top select-none pointer-events-none"
                    priority
                  />
                </div>

                {/* Subtle Cinematic Vignette at bottom & edges to blend into glass monolith */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              </motion.div>
            )}

            {/* =========================================================================
                LIGHT SHATTERED / FRACTURED ICE GLASS EFFECT ON HOVER
                - Subtle, delicate crystalline fracture veins with razor-sharp specular glint
                - Heavy diffuse glow blobs removed; light is kept super-thin so the photo stays crisp
                - Pure ice glass aesthetics: crisp white core and pale cyan hairline accents
                ========================================================================= */}
            {iceGlassEffect && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-22 overflow-hidden select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full object-cover filter drop-shadow-[0_0_2px_rgba(56,189,248,0.4)]"
                >
                  <defs>
                    <filter id="ice-fracture-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="0.4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Faceted Glass Shards (Super-thin glass facet opacity variations) */}
                  <g className="mix-blend-overlay">
                    <polygon points="68,26 88,10 76,8 58,14" fill="rgba(255,255,255,0.06)" />
                    <polygon points="68,26 95,38 88,10" fill="rgba(186,230,254,0.08)" />
                    <polygon points="68,26 50,44 42,18" fill="rgba(255,255,255,0.04)" />
                    <polygon points="50,44 76,58 68,26" fill="rgba(125,211,252,0.06)" />
                    <polygon points="50,44 34,64 52,74 76,58" fill="rgba(255,255,255,0.05)" />
                    <polygon points="42,18 20,14 12,28 28,34" fill="rgba(186,230,254,0.05)" />
                    <polygon points="76,58 86,84 66,80 52,74" fill="rgba(56,189,248,0.05)" />
                    <polygon points="34,64 18,78 30,94 52,74" fill="rgba(255,255,255,0.04)" />
                  </g>

                  {/* Primary Crystalline Fracture Veins (Delicate Pale Cyan Halo) */}
                  <g filter="url(#ice-fracture-glow)" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="0.65" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 68 26 L 88 10 L 98 4" />
                    <path d="M 68 26 L 95 38 L 100 44" />
                    <path d="M 68 26 L 76 58 L 86 84 L 92 100" />
                    <path d="M 68 26 L 50 44 L 34 64 L 20 78 L 12 100" />
                    <path d="M 68 26 L 42 18 L 20 14 L 0 8" />
                    <path d="M 68 26 L 58 14 L 54 0" />
                    <path d="M 42 18 L 50 44" />
                    <path d="M 50 44 L 76 58" />
                    <path d="M 34 64 L 52 74 L 76 58" />
                    <path d="M 34 64 L 0 68" />
                    <path d="M 42 18 L 28 34 L 12 28" />
                    <path d="M 76 58 L 100 66" />
                    <path d="M 52 74 L 66 80 L 86 84" />
                    <path d="M 52 74 L 44 100" />
                    <path d="M 20 78 L 0 84" />
                    <path d="M 88 10 L 100 16" />
                  </g>

                  {/* Razor-Sharp Specular Glass Edges (Super Thin Crisp White Core) */}
                  <g stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 68 26 L 88 10 L 98 4" />
                    <path d="M 68 26 L 95 38 L 100 44" />
                    <path d="M 68 26 L 76 58 L 86 84 L 92 100" />
                    <path d="M 68 26 L 50 44 L 34 64 L 20 78 L 12 100" />
                    <path d="M 68 26 L 42 18 L 20 14 L 0 8" />
                    <path d="M 68 26 L 58 14 L 54 0" />
                    <path d="M 42 18 L 50 44" />
                    <path d="M 50 44 L 76 58" />
                    <path d="M 34 64 L 52 74 L 76 58" />
                    <path d="M 34 64 L 0 68" />
                    <path d="M 42 18 L 28 34 L 12 28" />
                    <path d="M 76 58 L 100 66" />
                    <path d="M 52 74 L 66 80 L 86 84" />
                    <path d="M 52 74 L 44 100" />
                    <path d="M 20 78 L 0 84" />
                    <path d="M 88 10 L 100 16" />
                  </g>

                  {/* Micro-Crack Stress Glints at Key Junctions */}
                  <circle cx="68" cy="26" r="0.9" fill="rgba(255,255,255,0.9)" />
                  <circle cx="50" cy="44" r="0.6" fill="rgba(186,230,254,0.85)" />
                  <circle cx="76" cy="58" r="0.6" fill="rgba(186,230,254,0.85)" />
                  <circle cx="34" cy="64" r="0.5" fill="rgba(255,255,255,0.8)" />
                  <circle cx="42" cy="18" r="0.5" fill="rgba(255,255,255,0.8)" />
                </svg>
              </motion.div>
            )}

            {/* Optional Legacy Holographic Foil */}
            {holographicFoil && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Fluid Blooming Caustic Pool centered around cursor */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: useTransform(glarePercentX, (x) => `${x}%`),
                    top: useTransform(glarePercentY, (y) => `${y}%`),
                    x: '-50%',
                    y: '-50%',
                    width: '160%',
                    height: '160%',
                    mixBlendMode: 'screen',
                    filter: 'blur(48px)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(ellipse 65% 55% at 46% 44%, rgba(56, 189, 248, 0.38) 0%, rgba(6, 182, 212, 0.16) 45%, transparent 70%)',
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Thin, Ethereal Pure White Specular Flare (Subtle optical glass reflection, very thin) */}
            {glareEffect && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-22 transition-opacity duration-400"
                style={{
                  opacity: isHovered ? glareIntensity : 0,
                  mixBlendMode: 'screen',
                  background: useTransform(
                    [glarePercentX, glarePercentY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 22%, rgba(255, 255, 255, 0.02) 45%, transparent ${glareSize}%)`
                  ),
                }}
              />
            )}

            {/* Inner Glass Inset Ring Hairline (Ultra-thin platinum rim) */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] pointer-events-none z-25 group-hover:ring-white/20 transition-colors duration-300" />
          </div>
        </div>

        {/* 3D Ice Crystal Picture Frame Overlay - Diperbesar membungkus di luar ukuran foto */}
        {iceFrame && (
          <div
            className="absolute -inset-7 sm:-inset-9 md:-inset-12 pointer-events-none z-30 select-none flex items-center justify-center"
            style={{
              transform: 'translateZ(28px) scale(1.12)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={typeof iceFrame === 'string' ? iceFrame : '/ice-frame.png'}
                alt="3D Ice Crystal Picture Frame"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 420px"
                className="object-fill select-none pointer-events-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] filter brightness-110 contrast-105"
                priority
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default InteractiveTiltCard;
