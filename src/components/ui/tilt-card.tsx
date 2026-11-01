'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
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
  transitionDuration?: number;
  hoverScale?: number;
  glareEffect?: boolean;
  glareIntensity?: number;
  glareSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export function InteractiveTiltCard({
  image = {
    src: '/inimahgw.png',
    alt: 'Jovan - Technical Journey',
  },
  tiltFactor = 15,
  perspective = 1000,
  borderRadius = 16,
  backgroundColor = 'transparent',
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  shadowIntensity = 0.5,
  transitionDuration = 0.2,
  hoverScale = 1.04,
  glareEffect = true,
  glareIntensity = 0.4,
  glareSize = 80,
  className = '',
  children,
}: InteractiveTiltCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [tiltValues, setTiltValues] = React.useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  // Lightweight requestAnimationFrame mouse move handler
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isHovered) return;
      
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width - 0.5) * 100;
        const y = ((clientY - rect.top) / rect.height - 0.5) * 100;

        setMousePosition({ x, y });
        const tiltX = -(y / 50) * tiltFactor;
        const tiltY = (x / 50) * tiltFactor;
        setTiltValues({ x: tiltX, y: tiltY });
      });
    },
    [isHovered, tiltFactor]
  );

  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    setTiltValues({ x: 0, y: 0 });
  }, []);

  const glareX = mousePosition.x / 2 + 50;
  const glareY = mousePosition.y / 2 + 50;

  const radiusStyle = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
      animate={{ scale: isHovered ? hoverScale : 1 }}
      transition={{ duration: transitionDuration, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: radiusStyle,
          overflow: 'hidden',
          backgroundColor,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, ${shadowIntensity})`
            : `0 10px 30px -10px ${shadowColor}`,
        }}
        transition={{ duration: transitionDuration, ease: 'easeOut' }}
      >
        {children ? (
          children
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 380px"
            className="object-cover object-top"
            priority
          />
        )}

        {/* Dynamic Specular Glare Tracking Cursor */}
        {glareEffect && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareIntensity}) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
              pointerEvents: 'none',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: transitionDuration }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default InteractiveTiltCard;
