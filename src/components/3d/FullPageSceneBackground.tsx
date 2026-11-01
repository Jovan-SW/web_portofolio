'use client';

import React, { useState, useEffect } from 'react';
import SceneCanvas from './SceneCanvas';

export default function FullPageSceneBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // High-performance passive scroll listener to track global page scroll progress (0.0 to 1.0)
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;
    let ticking = false;

    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      if (!ticking) {
        requestAnimationFrame(() => {
          const doc = document.documentElement;
          const totalScrollable = doc.scrollHeight - window.innerHeight;

          if (totalScrollable <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          const currentScrolled = window.scrollY || window.pageYOffset || 0;
          const rawProgress = currentScrolled / totalScrollable;
          const clamped = Math.max(0, Math.min(1, rawProgress));

          setScrollProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* Persistent Full-Page 3D Canvas Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <SceneCanvas
          progress={scrollProgress}
          isInteracting={isScrolling}
          enableIdleBreathing={true}
          className="w-full h-full"
        />

        {/* Global Cinematic Vignette & Atmospheric Contrast Layer */}
        {/* Deep radial focus to ensure 100% typography legibility across all sections */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,10,15,0.45)_0%,rgba(9,10,15,0.72)_65%,rgba(9,10,15,0.92)_100%)] pointer-events-none" />

        {/* Top subtle vignette for Navbar contrast */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

        {/* Bottom subtle vignette for Footer contrast */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
