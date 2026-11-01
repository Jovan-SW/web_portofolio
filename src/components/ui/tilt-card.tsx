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
  glareIntensity = 0.3,
  glareSize = 65,
  className = '',
  children,
  holographicFoil = true,
  cornerAccents = true,
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
        {/* Thin, Delicate Cursor-Following Border Spotlight (Pure white hairline glow, not thick) */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 z-10"
          style={{
            opacity: isHovered ? 0.75 : 0,
            background: useTransform(
              [mousePixelX, mousePixelY],
              ([x, y]) =>
                `radial-gradient(260px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.22) 30%, transparent 65%)`
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
                LIQUID IRIDESCENCE: Apple-inspired Holographic Glass Color Blooms
                - No stripes, no lines, no zebra patterns, no RGB gaming effects
                - Smooth, diffuse, organic radial color pools that swell (memuai) and flow
                - Continuously morphs through cyan, electric blue, violet, magenta, pink, and subtle gold
                - Never covers face or impairs photo visibility
                ========================================================================= */}
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
                  {/* Fluid Bloom 1: Cyan / Electric Blue (Expands & dilates slowly) */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(ellipse 65% 55% at 46% 44%, rgba(56, 189, 248, 0.38) 0%, rgba(6, 182, 212, 0.16) 45%, transparent 70%)',
                    }}
                    animate={
                      isHovered
                        ? {
                            scale: [1, 1.16, 0.94, 1.08, 1],
                            rotate: [0, 90, 180, 270, 360],
                            x: ['0%', '4%', '-3%', '2%', '0%'],
                            y: ['0%', '-4%', '3%', '-2%', '0%'],
                          }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Fluid Bloom 2: Violet / Deep Indigo */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(ellipse 60% 60% at 54% 48%, rgba(168, 85, 247, 0.34) 0%, rgba(139, 92, 246, 0.16) 42%, transparent 70%)',
                    }}
                    animate={
                      isHovered
                        ? {
                            scale: [1.06, 0.92, 1.18, 0.98, 1.06],
                            rotate: [360, 270, 180, 90, 0],
                            x: ['0%', '-4%', '3%', '-2%', '0%'],
                            y: ['0%', '4%', '-3%', '2%', '0%'],
                          }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Fluid Bloom 3: Magenta / Soft Orchid Pink */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(ellipse 55% 50% at 42% 58%, rgba(244, 114, 182, 0.3) 0%, rgba(236, 72, 153, 0.14) 40%, transparent 68%)',
                    }}
                    animate={
                      isHovered
                        ? {
                            scale: [0.94, 1.14, 1.02, 1.18, 0.94],
                            rotate: [0, 120, 240, 360],
                            x: ['0%', '3%', '-4%', '0%'],
                            y: ['0%', '-3%', '4%', '0%'],
                          }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Fluid Bloom 4: Subtle Golden Champagne Hue */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(ellipse 48% 44% at 58% 36%, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.08) 35%, transparent 60%)',
                    }}
                    animate={
                      isHovered
                        ? {
                            scale: [1.12, 0.94, 1.14, 1],
                            rotate: [180, 270, 360, 180],
                          }
                        : { scale: 1, rotate: 180 }
                    }
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                {/* Subtle Ambient Caustic Wave (Adds continuous organic color shift) */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    mixBlendMode: 'color-dodge',
                    filter: 'blur(38px)',
                    opacity: 0.28,
                  }}
                  animate={
                    isHovered
                      ? {
                          filter: [
                            'blur(38px) hue-rotate(0deg)',
                            'blur(44px) hue-rotate(30deg)',
                            'blur(36px) hue-rotate(-20deg)',
                            'blur(38px) hue-rotate(0deg)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.2) 0%, rgba(192, 132, 252, 0.16) 35%, rgba(244, 114, 182, 0.12) 55%, transparent 75%)',
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
      </motion.div>
    </motion.div>
  );
}

export default InteractiveTiltCard;
