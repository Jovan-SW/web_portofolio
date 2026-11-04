'use client';

import React, { useEffect, useRef } from 'react';

interface CaveFireflyCanvasProps {
  className?: string;
  count?: number;
}

interface Firefly {
  homeNormX: number;
  homeNormY: number;
  ampX1: number;
  ampX2: number;
  ampY1: number;
  ampY2: number;
  speedX1: number;
  speedX2: number;
  speedY1: number;
  speedY2: number;
  phaseX1: number;
  phaseX2: number;
  phaseY1: number;
  phaseY2: number;
  pulseSpeed: number;
  pulsePhase: number;
  minAlpha: number;
  maxAlpha: number;
  spriteIndex: number;
  spriteSize: number;
}

export const CaveFireflyCanvas: React.FC<CaveFireflyCanvasProps> = ({
  className = '',
  count: propCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement || containerRef.current;
    if (!canvas || !container) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pre-rendered offscreen firefly sprites for zero-cost GPU drawing
    const sprites: HTMLCanvasElement[] = [];
    const spriteSizes = [24, 34, 46]; // small, medium, large glow diameters

    const createSprites = () => {
      sprites.length = 0;
      for (let s = 0; s < spriteSizes.length; s++) {
        const size = spriteSizes[s];
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) continue;

        const center = size / 2;
        const grad = offCtx.createRadialGradient(center, center, 0, center, center, center);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Intense crisp snow core
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)'); // Brilliant snow white
        grad.addColorStop(0.48, 'rgba(240, 249, 255, 0.70)'); // Soft frosty snow luminescence
        grad.addColorStop(0.78, 'rgba(224, 242, 254, 0.22)'); // Ethereal icy white aura
        grad.addColorStop(1, 'rgba(224, 242, 254, 0)'); // Feathered boundary

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(center, center, center, 0, Math.PI * 2);
        offCtx.fill();

        sprites.push(offCanvas);
      }
    };

    createSprites();

    // Determine moderate firefly count: calm and serene, not overcrowded
    const getParticleCount = (w: number) => {
      if (propCount !== undefined) return propCount;
      const isMobile = w < 768;
      // 12-14 on mobile, 20-24 on desktop
      return isMobile ? 14 : 22;
    };

    let fireflies: Firefly[] = [];

    const initFireflies = (currentW: number, currentH: number) => {
      const count = getParticleCount(currentW);
      const cols = Math.ceil(Math.sqrt(count * (currentW / Math.max(1, currentH))));
      const rows = Math.ceil(count / cols);

      const newFireflies: Firefly[] = [];

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cellW = 1 / cols;
        const cellH = 1 / rows;

        // Evenly distributed with organic jitter so they don't clump
        const homeNormX = (col + 0.15 + Math.random() * 0.7) * cellW;
        const homeNormY = (row + 0.15 + Math.random() * 0.7) * cellH;

        // Weighted sizes: mostly small/medium, few large glowing fireflies
        const spriteIndex = i % 4 === 0 ? 2 : i % 2 === 0 ? 1 : 0;
        const spriteSize = spriteSizes[spriteIndex];

        newFireflies.push({
          homeNormX,
          homeNormY,
          // Harmonic wandering amplitudes (in pixels)
          ampX1: 18 + Math.random() * 28,
          ampX2: 10 + Math.random() * 16,
          ampY1: 16 + Math.random() * 26,
          ampY2: 8 + Math.random() * 14,
          // Multi-frequency smooth looping speeds
          speedX1: 0.00045 + Math.random() * 0.0004,
          speedX2: 0.00085 + Math.random() * 0.0005,
          speedY1: 0.0004 + Math.random() * 0.00035,
          speedY2: 0.00075 + Math.random() * 0.00045,
          // Random initial phases for asynchronous wandering
          phaseX1: Math.random() * Math.PI * 2,
          phaseX2: Math.random() * Math.PI * 2,
          phaseY1: Math.random() * Math.PI * 2,
          phaseY2: Math.random() * Math.PI * 2,
          // Biological firefly breathing pulse
          pulseSpeed: 0.0012 + Math.random() * 0.0016,
          pulsePhase: Math.random() * Math.PI * 2,
          minAlpha: 0.22 + Math.random() * 0.2,
          maxAlpha: 0.85 + Math.random() * 0.15,
          spriteIndex,
          spriteSize,
        });
      }

      fireflies = newFireflies;
    };

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const newW = Math.max(10, Math.floor(rect.width));
      const newH = Math.max(10, Math.floor(rect.height));

      // Cap DPR at 1.5 for maximum power efficiency
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      if (newW !== width || newH !== height) {
        width = newW;
        height = newH;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        if (fireflies.length === 0) {
          initFireflies(width, height);
        }

        if (prefersReducedMotion) {
          renderStaticFrame();
        }
      }
    };

    const renderStaticFrame = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        const posX = f.homeNormX * width;
        const posY = f.homeNormY * height;
        const sprite = sprites[f.spriteIndex];
        if (sprite) {
          ctx.globalAlpha = 0.6;
          ctx.drawImage(sprite, posX - f.spriteSize / 2, posY - f.spriteSize / 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    // Smooth wandering animation loop
    const animate = (currentTime: number) => {
      if (!isVisible || !isTabActive) {
        animationFrameId = null;
        return;
      }

      // Clear transparent canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // Harmonic organic wandering: continuous multi-sine floating trajectory
        const driftX =
          Math.sin(currentTime * f.speedX1 + f.phaseX1) * f.ampX1 +
          Math.sin(currentTime * f.speedX2 + f.phaseX2) * f.ampX2;

        const driftY =
          Math.cos(currentTime * f.speedY1 + f.phaseY1) * f.ampY1 +
          Math.cos(currentTime * f.speedY2 + f.phaseY2) * f.ampY2;

        const posX = f.homeNormX * width + driftX;
        const posY = f.homeNormY * height + driftY;

        // Biological firefly pulse: smooth sinusoidal luminous breathing
        const pulseSine = Math.sin(currentTime * f.pulseSpeed + f.pulsePhase);
        const normPulse = 0.5 + 0.5 * pulseSine;
        const currentAlpha = f.minAlpha + (f.maxAlpha - f.minAlpha) * normPulse;

        const sprite = sprites[f.spriteIndex];
        if (sprite) {
          ctx.globalAlpha = currentAlpha;
          ctx.drawImage(sprite, posX - f.spriteSize / 2, posY - f.spriteSize / 2);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible && !animationFrameId && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      } else if (!isTabActive && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Viewport IntersectionObserver: automatically pauses when section is not on screen
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive && !animationFrameId && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    updateSize();
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [propCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default CaveFireflyCanvas;
