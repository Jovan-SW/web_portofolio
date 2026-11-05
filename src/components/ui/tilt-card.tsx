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

  // Subtle optical specular light across fractured ice surface (pure frosted white, no neon blue)
  const iceSpecularGlint = useTransform(
    [glarePercentX, glarePercentY],
    ([gx, gy]) =>
      `radial-gradient(circle 220px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`
  );

  const holographicLeft = useTransform(glarePercentX, (x) => `${x}%`);
  const holographicTop = useTransform(glarePercentY, (y) => `${y}%`);

  const glareBackground = useTransform(
    [glarePercentX, glarePercentY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 22%, rgba(255, 255, 255, 0.02) 45%, transparent ${glareSize}%)`
  );

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
          <div className="relative w-full h-full min-h-0 sm:min-h-[280px] md:min-h-full flex-1 overflow-hidden">
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
                SUBTLE & MINIMALIST FROSTED ICE GLASS FRACTURE ON HOVER
                - Few, delicate hairline fractures (clean & natural)
                - Translucent frosted white tones (no intense glowing cyan/blue)
                - Subtle specular sheen following cursor movement
                ========================================================================= */}
            {iceGlassEffect && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-22 overflow-hidden select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full object-cover"
                >
                  {/* 1. Subtle Translucent Glass Facet Sheen */}
                  <g className="mix-blend-overlay">
                    {/* Top Facets */}
                    <polygon points="74,20 64,15 68,30" fill="rgba(255, 255, 255, 0.04)" />
                    <polygon points="64,15 50,13 58,40 68,30" fill="rgba(255, 255, 255, 0.025)" />
                    <polygon points="74,20 82,17 78,26" fill="rgba(255, 255, 255, 0.03)" />
                    <polygon points="74,20 82,17 90,38 82,28" fill="rgba(255, 255, 255, 0.03)" />
                    <polygon points="74,20 72,12 64,15" fill="rgba(255, 255, 255, 0.025)" />
                    <polygon points="50,13 44,19 34,22 38,9" fill="rgba(255, 255, 255, 0.02)" />
                    <polygon points="58,40 50,50 42,46" fill="rgba(255, 255, 255, 0.025)" />

                    {/* Bottom Facets */}
                    <polygon points="28,82 38,74 46,68 36,88" fill="rgba(255, 255, 255, 0.035)" />
                    <polygon points="28,82 22,72 14,66 20,88" fill="rgba(255, 255, 255, 0.025)" />
                    <polygon points="28,82 36,88 48,92 28,96" fill="rgba(255, 255, 255, 0.03)" />
                    <polygon points="22,72 14,66 6,70 12,78" fill="rgba(255, 255, 255, 0.02)" />

                    {/* Corner Accent Facets */}
                    <polygon points="12,12 6,6 8,20" fill="rgba(255, 255, 255, 0.025)" />
                    <polygon points="88,86 82,80 92,78" fill="rgba(255, 255, 255, 0.025)" />
                  </g>

                  {/* 2. Fine Connecting Stress Arcs */}
                  <g stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.3" fill="none" strokeDasharray="1 2">
                    {/* Top Arcs */}
                    <path d="M 64 15 Q 68 21 68 30" />
                    <path d="M 50 13 Q 56 25 58 40" />
                    <path d="M 82 17 Q 80 24 82 28" />
                    <path d="M 92 13 Q 92 26 90 38" />

                    {/* Bottom Arcs */}
                    <path d="M 38 74 Q 30 78 22 72" />
                    <path d="M 46 68 Q 32 74 14 66" />
                    <path d="M 20 88 Q 28 92 36 88" />

                    {/* Corner Accent Arcs */}
                    <path d="M 6 6 Q 10 14 8 20" />
                    <path d="M 92 78 Q 86 82 82 80" />
                  </g>

                  {/* 3. Soft Frosted Outer Glow Lines */}
                  <g
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="0.75"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Top Fissures */}
                    <path d="M 74 20 L 64 15 L 50 13 L 38 9 L 24 6 L 10 0" />
                    <path d="M 50 13 L 44 19 L 34 22" />
                    <path d="M 38 9 L 32 16 L 24 18" />

                    <path d="M 74 20 L 68 30 L 58 40 L 50 50 L 40 62 L 32 72" />
                    <path d="M 58 40 L 62 48 L 60 56" />
                    <path d="M 50 50 L 42 46 L 30 48" />

                    <path d="M 74 20 L 82 17 L 92 13 L 100 10" />

                    <path d="M 74 20 L 82 28 L 90 38 L 96 48 L 100 52" />
                    <path d="M 90 38 L 86 46 L 82 54" />

                    <path d="M 74 20 L 72 12 L 70 0" />
                    <path d="M 72 12 L 66 8 L 58 4" />

                    {/* Bottom Fissures */}
                    <path d="M 28 82 L 38 74 L 46 68 L 56 62" />
                    <path d="M 46 68 L 52 74 L 58 78" />
                    <path d="M 38 74 L 44 80" />

                    <path d="M 28 82 L 20 88 L 12 94 L 0 100" />
                    <path d="M 20 88 L 16 96 L 14 100" />

                    <path d="M 28 82 L 22 72 L 14 66 L 4 60" />
                    <path d="M 22 72 L 14 74 L 6 78" />

                    <path d="M 28 82 L 36 88 L 48 92 L 60 96" />
                    <path d="M 48 92 L 54 88 L 62 86" />

                    {/* Corner Accent Fissures (Top-Left & Bottom-Right) */}
                    <path d="M 12 12 L 6 6 L 0 2" />
                    <path d="M 12 12 L 18 16 L 24 18" />
                    <path d="M 12 12 L 8 20 L 6 28" />

                    <path d="M 88 86 L 94 92 L 100 98" />
                    <path d="M 88 86 L 82 80 L 76 76" />
                    <path d="M 88 86 L 92 78 L 96 72" />
                  </g>

                  {/* 4. Crisp Hairline Crack Core (Thin, Semi-Translucent White) */}
                  <g
                    stroke="rgba(255, 255, 255, 0.65)"
                    strokeWidth="0.32"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Top Fissures */}
                    <path d="M 74 20 L 64 15 L 50 13 L 38 9 L 24 6 L 10 0" />
                    <path d="M 50 13 L 44 19 L 34 22" />
                    <path d="M 38 9 L 32 16 L 24 18" />

                    <path d="M 74 20 L 68 30 L 58 40 L 50 50 L 40 62 L 32 72" />
                    <path d="M 58 40 L 62 48 L 60 56" />
                    <path d="M 50 50 L 42 46 L 30 48" />

                    <path d="M 74 20 L 82 17 L 92 13 L 100 10" />

                    <path d="M 74 20 L 82 28 L 90 38 L 96 48 L 100 52" />
                    <path d="M 90 38 L 86 46 L 82 54" />

                    <path d="M 74 20 L 72 12 L 70 0" />
                    <path d="M 72 12 L 66 8 L 58 4" />

                    {/* Bottom Fissures */}
                    <path d="M 28 82 L 38 74 L 46 68 L 56 62" />
                    <path d="M 46 68 L 52 74 L 58 78" />
                    <path d="M 38 74 L 44 80" />

                    <path d="M 28 82 L 20 88 L 12 94 L 0 100" />
                    <path d="M 20 88 L 16 96 L 14 100" />

                    <path d="M 28 82 L 22 72 L 14 66 L 4 60" />
                    <path d="M 22 72 L 14 74 L 6 78" />

                    <path d="M 28 82 L 36 88 L 48 92 L 60 96" />
                    <path d="M 48 92 L 54 88 L 62 86" />

                    {/* Corner Accent Fissures (Top-Left & Bottom-Right) */}
                    <path d="M 12 12 L 6 6 L 0 2" />
                    <path d="M 12 12 L 18 16 L 24 18" />
                    <path d="M 12 12 L 8 20 L 6 28" />

                    <path d="M 88 86 L 94 92 L 100 98" />
                    <path d="M 88 86 L 82 80 L 76 76" />
                    <path d="M 88 86 L 92 78 L 96 72" />
                  </g>

                  {/* 5. Minimal Stress Junction Dots (Subtle Frosted Micro-Nodes) */}
                  <g className="mix-blend-screen">
                    {/* Top Nodes */}
                    <circle cx="74" cy="20" r="0.8" fill="rgba(255, 255, 255, 0.75)" />
                    <circle cx="64" cy="15" r="0.45" fill="rgba(255, 255, 255, 0.55)" />
                    <circle cx="68" cy="30" r="0.45" fill="rgba(255, 255, 255, 0.55)" />
                    <circle cx="82" cy="28" r="0.4" fill="rgba(255, 255, 255, 0.5)" />
                    <circle cx="90" cy="38" r="0.4" fill="rgba(255, 255, 255, 0.45)" />
                    <circle cx="50" cy="13" r="0.35" fill="rgba(255, 255, 255, 0.45)" />
                    <circle cx="58" cy="40" r="0.35" fill="rgba(255, 255, 255, 0.45)" />
                    <circle cx="40" cy="62" r="0.3" fill="rgba(255, 255, 255, 0.4)" />
                    <circle cx="72" cy="12" r="0.35" fill="rgba(255, 255, 255, 0.45)" />

                    {/* Bottom Nodes */}
                    <circle cx="28" cy="82" r="0.75" fill="rgba(255, 255, 255, 0.75)" />
                    <circle cx="38" cy="74" r="0.45" fill="rgba(255, 255, 255, 0.55)" />
                    <circle cx="22" cy="72" r="0.4" fill="rgba(255, 255, 255, 0.5)" />
                    <circle cx="46" cy="68" r="0.35" fill="rgba(255, 255, 255, 0.45)" />
                    <circle cx="20" cy="88" r="0.35" fill="rgba(255, 255, 255, 0.45)" />
                    <circle cx="36" cy="88" r="0.35" fill="rgba(255, 255, 255, 0.45)" />

                    {/* Corner Accent Nodes */}
                    <circle cx="12" cy="12" r="0.55" fill="rgba(255, 255, 255, 0.65)" />
                    <circle cx="88" cy="86" r="0.55" fill="rgba(255, 255, 255, 0.65)" />
                  </g>
                </svg>

                {/* 6. Subtle White Specular Sheen on Hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.6 : 0,
                    background: iceSpecularGlint,
                  }}
                />
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
                    left: holographicLeft,
                    top: holographicTop,
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
                  background: glareBackground,
                }}
              />
            )}

            {/* Inner Glass Inset Ring Hairline (Ultra-thin platinum rim) */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] pointer-events-none z-25 group-hover:ring-white/20 transition-colors duration-300" />
          </div>
        </div>

        {/* 3D Ice Crystal Picture Frame Overlay - Pas berukuran sama persis dengan batas foto */}
        {iceFrame && (
          <div
            className="absolute inset-0 pointer-events-none z-30 select-none flex items-center justify-center overflow-hidden rounded-[inherit]"
            style={{
              transform: 'translateZ(16px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={typeof iceFrame === 'string' ? iceFrame : '/ice-frame.png'}
                alt="3D Ice Crystal Picture Frame"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 420px"
                className="object-fill select-none pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] filter brightness-110 contrast-105"
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
