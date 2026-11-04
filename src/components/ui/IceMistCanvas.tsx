'use client';

import React, { useEffect, useRef } from 'react';

interface IceMistCanvasProps {
  className?: string;
  intensity?: 'medium' | 'dense';
}

interface SmokePlume {
  x: number;
  y: number;
  baseNormX: number;
  baseNormY: number;
  zDepth: number; // 0.65 to 1.35 for 3D volumetric layering
  size: number; // 220 to 420px balanced billowing clouds
  vx: number;
  vy: number;
  driftSpeedX: number;
  driftSpeedY: number;
  ampX: number;
  ampY: number;
  phaseX: number;
  phaseY: number;
  angle: number;
  rotSpeed: number;
  rotVelocity: number;
  baseAlpha: number;
  currentAlpha: number;
  surgeAlpha: number;
  spriteIndex: number;
}

export const IceMistCanvas: React.FC<IceMistCanvasProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement || containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = false;
    let isTabActive = !document.hidden;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // =========================================================================
    // 1. BALANCED VOLUMETRIC SMOKE BILLOW SPRITES (Medium & Refined)
    // Multi-lobe fractal smoke clusters creating rich, natural, balanced plumes
    // =========================================================================
    const sprites: HTMLCanvasElement[] = [];
    // Sprite sizes: 240px, 340px, 440px for medium, well-balanced smoke coverage
    const spriteSizes = [240, 340, 440];

    const createSmokeSprites = () => {
      sprites.length = 0;

      for (let s = 0; s < spriteSizes.length; s++) {
        const size = spriteSizes[s];
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) continue;

        const center = size / 2;

        // Construct a balanced smoke billow by clustering 9 overlapping radial lobes
        const lobes = [
          // Central smoke cores
          { dx: 0, dy: 0, r: size * 0.44, core: 0.48, mid: 0.28, outer: 0.08 },
          { dx: size * 0.08, dy: -size * 0.06, r: size * 0.38, core: 0.42, mid: 0.24, outer: 0.06 },
          { dx: -size * 0.09, dy: size * 0.07, r: size * 0.39, core: 0.40, mid: 0.22, outer: 0.05 },
          // Billowing edges
          { dx: size * 0.15, dy: size * 0.05, r: size * 0.32, core: 0.34, mid: 0.18, outer: 0.04 },
          { dx: -size * 0.14, dy: -size * 0.08, r: size * 0.34, core: 0.35, mid: 0.19, outer: 0.04 },
          { dx: size * 0.04, dy: size * 0.14, r: size * 0.30, core: 0.30, mid: 0.16, outer: 0.03 },
          { dx: -size * 0.05, dy: -size * 0.15, r: size * 0.31, core: 0.31, mid: 0.17, outer: 0.03 },
          { dx: size * 0.12, dy: -size * 0.12, r: size * 0.28, core: 0.28, mid: 0.14, outer: 0.03 },
          { dx: -size * 0.13, dy: size * 0.11, r: size * 0.29, core: 0.27, mid: 0.13, outer: 0.03 },
        ];

        for (let i = 0; i < lobes.length; i++) {
          const l = lobes[i];
          const lx = center + l.dx;
          const ly = center + l.dy;

          const grad = offCtx.createRadialGradient(lx, ly, 0, lx, ly, l.r);

          if (s === 0) {
            // Crisp foreground plume
            grad.addColorStop(0, `rgba(255, 255, 255, ${l.core})`);
            grad.addColorStop(0.3, `rgba(224, 242, 254, ${l.mid})`);
            grad.addColorStop(0.68, `rgba(125, 211, 252, ${l.outer})`);
            grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          } else if (s === 1) {
            // Balanced midground rolling smoke
            grad.addColorStop(0, `rgba(240, 249, 255, ${l.core * 0.95})`);
            grad.addColorStop(0.35, `rgba(186, 230, 254, ${l.mid})`);
            grad.addColorStop(0.72, `rgba(56, 189, 248, ${l.outer})`);
            grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          } else {
            // Ambient background smoke bank
            grad.addColorStop(0, `rgba(224, 242, 254, ${l.core * 0.85})`);
            grad.addColorStop(0.42, `rgba(147, 197, 253, ${l.mid * 0.9})`);
            grad.addColorStop(0.78, `rgba(56, 189, 248, ${l.outer * 0.9})`);
            grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          }

          offCtx.fillStyle = grad;
          offCtx.beginPath();
          offCtx.arc(lx, ly, l.r, 0, Math.PI * 2);
          offCtx.fill();
        }

        sprites.push(offCanvas);
      }
    };

    createSmokeSprites();

    // =========================================================================
    // 2. SMOKE PLUME FIELD INITIALIZATION (Medium Density - "Pas")
    // =========================================================================
    let plumes: SmokePlume[] = [];

    const initPlumes = (w: number, h: number) => {
      const isMobile = w < 768;
      // 10-12 plumes on mobile, 18-20 on desktop for balanced medium coverage
      const count = isMobile ? 12 : intensity === 'dense' ? 26 : 20;
      const newPlumes: SmokePlume[] = [];

      const cols = Math.ceil(Math.sqrt(count * (w / Math.max(1, h))));
      const rows = Math.ceil(count / cols);

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const baseNormX = (col + 0.15 + Math.random() * 0.7) / cols;
        const baseNormY = (row + 0.15 + Math.random() * 0.7) / rows;

        // 3D Depth Layering
        const tier = i % 3;
        const zDepth = tier === 0 ? 0.75 : tier === 1 ? 1.0 : 1.25;
        const spriteIndex = tier === 0 ? 2 : tier === 1 ? 1 : 0;
        const baseSpriteSize = spriteSizes[spriteIndex];

        // Balanced physical size: 220px to 380px
        const size = (baseSpriteSize * (0.85 + Math.random() * 0.3)) * zDepth;

        // Balanced medium base opacity: visible & atmospheric, not blinding
        const baseAlpha = tier === 0 ? 0.15 : tier === 1 ? 0.19 : 0.13;

        newPlumes.push({
          x: baseNormX * w,
          y: baseNormY * h,
          baseNormX,
          baseNormY,
          zDepth,
          size,
          vx: 0,
          vy: 0,
          driftSpeedX: (0.0003 + Math.random() * 0.0004) * (i % 2 === 0 ? 1 : -1),
          driftSpeedY: 0.0002 + Math.random() * 0.0003,
          ampX: 35 + Math.random() * 50,
          ampY: 20 + Math.random() * 35,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.001,
          rotVelocity: 0,
          baseAlpha,
          currentAlpha: baseAlpha,
          surgeAlpha: 0,
          spriteIndex,
        });
      }

      plumes = newPlumes;
    };

    // =========================================================================
    // 3. DYNAMIC SCROLL GUST & SECTION BLAST ENGINE ("Menyembur & Berhembus")
    // =========================================================================
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let windGustX = 0;
    let windGustY = 0;
    let scrollSurge = 0;

    const triggerSectionGustBlast = (direction = 1) => {
      // Balanced cryo blast on section change
      scrollSurge = 0.85;
      windGustY = -direction * 2.8;
      windGustX = (Math.random() > 0.5 ? 1 : -1) * 2.2;

      for (let i = 0; i < plumes.length; i++) {
        const p = plumes[i];
        p.vy += windGustY * p.zDepth * (0.7 + Math.random() * 0.4);
        p.vx += windGustX * p.zDepth * (0.7 + Math.random() * 0.4);
        p.rotVelocity += (Math.random() - 0.5) * 0.018;
        // Surge opacity to balanced, stylish peak
        p.surgeAlpha = 0.18 + Math.random() * 0.12;
      }
    };

    const handleScroll = () => {
      if (!isVisible) return;

      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      const speed = Math.abs(deltaY);

      if (speed > 1) {
        const impulse = Math.min(speed * 0.035, 0.9);
        scrollSurge = Math.min(scrollSurge + impulse, 1.0);

        const dir = deltaY > 0 ? 1 : -1;
        windGustY += -dir * impulse * 1.2;
        windGustX += Math.sin(currentScrollY * 0.004) * impulse * 0.8;

        for (let i = 0; i < plumes.length; i++) {
          const p = plumes[i];
          p.vy += -dir * impulse * 0.45 * p.zDepth;
          p.vx += Math.sin(p.phaseX + currentScrollY * 0.003) * impulse * 0.35;
          p.rotVelocity += (Math.random() - 0.5) * impulse * 0.005;
          p.surgeAlpha = Math.min(p.surgeAlpha + impulse * 0.10, 0.28);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // =========================================================================
    // 4. RESIZE & CANVAS SCALING
    // =========================================================================
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const newW = Math.max(10, Math.floor(rect.width));
      const newH = Math.max(10, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      if (newW !== width || newH !== height) {
        width = newW;
        height = newH;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        if (plumes.length === 0) {
          initPlumes(width, height);
        } else {
          for (let i = 0; i < plumes.length; i++) {
            const p = plumes[i];
            p.x = p.baseNormX * width;
            p.y = p.baseNormY * height;
          }
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

      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < plumes.length; i++) {
        const p = plumes[i];
        const sprite = sprites[p.spriteIndex];
        if (sprite) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.baseAlpha;
          ctx.drawImage(sprite, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    // =========================================================================
    // 5. ANIMATION LOOP: Balanced Rolling Smoke, Gust Currents & Breathing
    // =========================================================================
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isVisible || !isTabActive) {
        animationFrameId = null;
        return;
      }

      const rawDt = currentTime - lastTime;
      const dt = Math.min(rawDt, 32);
      lastTime = currentTime;

      // Dissipate scroll surge & wind gust smoothly
      scrollSurge *= 0.94;
      windGustX *= 0.92;
      windGustY *= 0.92;

      // Clear transparent canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // 'screen' composite mode builds translucent, luminous cold vapor
      ctx.globalCompositeOperation = 'screen';

      // Global breathing cycle (4.5s biological rhythm) for pulsing ambient thickness
      const breathingPulse = 0.90 + 0.20 * (0.5 + 0.5 * Math.sin(currentTime * 0.0013));

      for (let i = 0; i < plumes.length; i++) {
        const p = plumes[i];

        // 1. Natural rolling wandering
        const wanderX = Math.sin(currentTime * p.driftSpeedX + p.phaseX) * p.ampX;
        const wanderY = Math.cos(currentTime * p.driftSpeedY + p.phaseY) * p.ampY;

        const targetX = p.baseNormX * width + wanderX;
        const targetY = p.baseNormY * height + wanderY;

        // 2. Continuous wind drag & spring restoring
        const springK = 0.015;
        p.vx += (targetX - p.x) * springK;
        p.vy += (targetY - p.y) * springK;

        p.vx *= 0.93;
        p.vy *= 0.93;
        p.rotVelocity *= 0.94;

        p.x += p.vx * (dt / 16.67);
        p.y += p.vy * (dt / 16.67);
        p.angle += (p.rotSpeed + p.rotVelocity) * (dt / 16.67);

        // 3. Surge opacity decay back to medium baseline
        p.surgeAlpha *= 0.94;
        p.currentAlpha = (p.baseAlpha + p.surgeAlpha) * breathingPulse;

        // 4. Render rolling smoke plume
        const sprite = sprites[p.spriteIndex];
        if (sprite && p.currentAlpha > 0.01) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          // Balanced medium opacity (max 0.40)
          ctx.globalAlpha = Math.min(p.currentAlpha, 0.40);
          ctx.drawImage(sprite, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    // =========================================================================
    // 6. SECTION TRANSITION INTERSECTION OBSERVER
    // =========================================================================
    let wasIntersecting = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const nowVisible = entry.isIntersecting;

        if (nowVisible && !wasIntersecting) {
          triggerSectionGustBlast(1);
        }

        wasIntersecting = nowVisible;
        isVisible = nowVisible;

        if (isVisible && isTabActive && !animationFrameId && !prefersReducedMotion) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      {
        threshold: [0.01, 0.15, 0.4],
        rootMargin: '-2% 0px -2% 0px',
      }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible && !animationFrameId && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else if (!isTabActive && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    updateSize();

    if (!prefersReducedMotion) {
      setTimeout(() => {
        if (isVisible) {
          triggerSectionGustBlast(1);
        }
      }, 250);
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default IceMistCanvas;