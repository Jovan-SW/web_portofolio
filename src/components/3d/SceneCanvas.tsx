'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TOTAL_FRAMES, useFramePreloader, getFrameUrl } from './useFramePreloader';

export interface SceneCanvasProps {
  /** Target frame progress from 0.0 to 1.0 (or absolute frame index 0 to 279) */
  progress: number;
  /** Whether the user is actively interacting/scrolling */
  isInteracting?: boolean;
  /** Custom class for canvas container */
  className?: string;
  /** Enable subtle idle ambient breathing when at top and not interacting */
  enableIdleBreathing?: boolean;
  /** Callback with actual rendered frame index */
  onFrameChange?: (frameIndex: number) => void;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  progress,
  isInteracting = false,
  className = '',
  enableIdleBreathing = true,
  onFrameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hook preloader with progressive prioritization
  const { firstFrameLoaded, loadProgress, getNearestFrame, prioritizeAround } = useFramePreloader({
    keyframeStep: 8,
    maxConcurrency: 5,
  });

  // Target frame index (0 to 279)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Visibility and performance state
  const isVisibleRef = useRef<boolean>(true);
  const isReducedMotionRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);

  // Idle breathing state
  const idleTimeRef = useRef<number>(0);

  // Synchronize target frame with incoming progress
  useEffect(() => {
    // Map progress (0..1) to frame index (0..279)
    const nextTarget = Math.max(0, Math.min(TOTAL_FRAMES - 1, progress * (TOTAL_FRAMES - 1)));
    targetFrameRef.current = nextTarget;
    
    // Immediately reprioritize preloader around the new target
    prioritizeAround(nextTarget, 16);
  }, [progress, prioritizeAround]);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver to suspend rendering when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Resize canvas to display dimensions with DPR clamping
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // Mark for redraw
      lastDrawnFrameRef.current = -1;
    }
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // Render loop using requestAnimationFrame with smooth lerping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      animationFrameIdRef.current = requestAnimationFrame(render);

      // Skip render if off-screen
      if (!isVisibleRef.current) return;

      const delta = Math.min(64, now - lastTimestamp);
      lastTimestamp = now;

      // Handle reduced motion
      if (isReducedMotionRef.current) {
        currentFrameRef.current = 0;
      } else {
        // Idle ambient breathing when user is at the top (progress ~0) and idle
        if (
          enableIdleBreathing &&
          !isInteracting &&
          targetFrameRef.current < 2 &&
          progress < 0.02
        ) {
          idleTimeRef.current += delta * 0.001;
          // Smooth sine oscillation between frame 0 and frame 12
          const breathingOffset = (Math.sin(idleTimeRef.current * 0.7) * 0.5 + 0.5) * 10;
          const targetWithBreathing = breathingOffset;
          currentFrameRef.current += (targetWithBreathing - currentFrameRef.current) * 0.05;
        } else {
          // Reset idle time and track target frame with buttery smooth lerp
          idleTimeRef.current = 0;
          const diff = targetFrameRef.current - currentFrameRef.current;
          
          if (Math.abs(diff) < 0.01) {
            currentFrameRef.current = targetFrameRef.current;
          } else {
            // Adaptive lerp factor: faster during active scrolling (0.16), smooth during coasting (0.12)
            const lerpFactor = isInteracting ? 0.18 : 0.12;
            currentFrameRef.current += diff * lerpFactor;
          }
        }
      }

      const frameToDrawIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));

      // Avoid redundant canvas redraws if frame and canvas size are unchanged
      if (frameToDrawIndex === lastDrawnFrameRef.current) {
        return;
      }

      // Fetch best frame available (fallback to closest loaded if exact frame is still downloading)
      const img = getNearestFrame(frameToDrawIndex);
      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      // Responsive Object-Fit Cover Calculation: 16:9 frame -> Canvas
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 800;
      const ih = img.naturalHeight || 450;

      const scale = Math.max(cw / iw, ch / ih);
      const drawWidth = iw * scale;
      const drawHeight = ih * scale;
      const offsetX = (cw - drawWidth) * 0.5;
      const offsetY = (ch - drawHeight) * 0.5;

      // Render image to canvas
      ctx.drawImage(img, 0, 0, iw, ih, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameRef.current = frameToDrawIndex;

      if (onFrameChange) {
        onFrameChange(frameToDrawIndex);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [enableIdleBreathing, getNearestFrame, isInteracting, onFrameChange, progress]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* HTML5 Canvas for silky-smooth 60fps WebP sequence playback */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover will-change-transform"
      />

      {/* Non-JS / initial static fallback frame for instant rendering and SEO */}
      <noscript>
        <img
          src={getFrameUrl(0)}
          alt="Monolith Server Core Infrastructure 3D Scene"
          className="w-full h-full object-cover"
        />
      </noscript>

      {/* Optional subtle initial preloader indicator line (only while loading first frame) */}
      {!firstFrameLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10 transition-opacity duration-700">
          <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 transition-all duration-300"
              style={{ width: `${Math.max(15, loadProgress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneCanvas;
