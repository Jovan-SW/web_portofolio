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
      {/* Persistent Full-Page 3D Canvas Backdrop - Completely bright and raw without shadow layers */}
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
      </div>
    </>
  );
}
