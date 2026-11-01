'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export const TOTAL_FRAMES = 280;
export const FRAME_ASPECT_RATIO = 800 / 450; // 16:9

export const getFrameUrl = (index: number): string => {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const padded = String(clamped).padStart(3, '0');
  return `/ezgif-split/frame_${padded}_delay-0.05s.webp`;
};

interface PreloaderOptions {
  /** Sparse step for initial keyframe pass (default: 8) */
  keyframeStep?: number;
  /** Max concurrent downloads (default: 4) */
  maxConcurrency?: number;
}

export function useFramePreloader({
  keyframeStep = 8,
  maxConcurrency = 4,
}: PreloaderOptions = {}) {
  // Store all loaded HTMLImageElement references (index 0 to 279)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  // Track loading status
  const loadedCountRef = useRef<number>(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0); // 0 to 1

  // Queue of frame indices waiting to load
  const queueRef = useRef<number[]>([]);
  const activeDownloadsRef = useRef<number>(0);
  const currentTargetRef = useRef<number>(0);

  // Helper to load a single image frame with decode()
  const loadSingleFrame = useCallback((index: number): Promise<HTMLImageElement | null> => {
    if (imagesRef.current[index]) {
      return Promise.resolve(imagesRef.current[index]);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFrameUrl(index);

      const onDone = () => {
        imagesRef.current[index] = img;
        loadedCountRef.current += 1;
        setLoadProgress(loadedCountRef.current / TOTAL_FRAMES);
        if (index === 0) {
          setFirstFrameLoaded(true);
        }
        resolve(img);
      };

      if (img.complete) {
        onDone();
      } else {
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = () => {
          // Graceful fallback: do not crash on network glitch
          resolve(null);
        };
      }
    });
  }, []);

  // Process queue with concurrency limit
  const processQueue = useCallback(() => {
    while (activeDownloadsRef.current < maxConcurrency && queueRef.current.length > 0) {
      // Pick next frame from queue (prioritizing nearest to currentTargetRef)
      const index = queueRef.current.shift();
      if (index === undefined) break;

      if (imagesRef.current[index]) continue;

      activeDownloadsRef.current += 1;
      loadSingleFrame(index).finally(() => {
        activeDownloadsRef.current -= 1;
        processQueue();
      });
    }
  }, [loadSingleFrame, maxConcurrency]);

  // Request high priority load for frames around a target index
  const prioritizeAround = useCallback((targetIndex: number, windowRadius = 15) => {
    currentTargetRef.current = targetIndex;
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(targetIndex)));
    
    // Build priority list centered around current target
    const priorities: number[] = [];
    for (let offset = 0; offset <= windowRadius; offset++) {
      const fwd = clamped + offset;
      if (fwd < TOTAL_FRAMES && !imagesRef.current[fwd] && !priorities.includes(fwd)) {
        priorities.push(fwd);
      }
      const bwd = clamped - offset;
      if (bwd >= 0 && !imagesRef.current[bwd] && !priorities.includes(bwd)) {
        priorities.push(bwd);
      }
    }

    // Prepend priorities to queue
    queueRef.current = [...priorities, ...queueRef.current.filter((idx) => !priorities.includes(idx))];
    processQueue();
  }, [processQueue]);

  // Get nearest available loaded frame for zero-blank rendering
  const getNearestFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(targetIndex)));
    const direct = imagesRef.current[clamped];
    if (direct) return direct;

    // Search outwards for nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const fwd = clamped + offset;
      if (fwd < TOTAL_FRAMES && imagesRef.current[fwd]) return imagesRef.current[fwd];
      const bwd = clamped - offset;
      if (bwd >= 0 && imagesRef.current[bwd]) return imagesRef.current[bwd];
    }

    // Default to frame 0 or null
    return imagesRef.current[0] || null;
  }, []);

  // Initialize progressive loading lifecycle
  useEffect(() => {
    let isCancelled = false;

    // Step 1: Immediately load Frame 0 for instant initial render
    loadSingleFrame(0).then(() => {
      if (isCancelled) return;

      // Step 2: Build sparse keyframes (every keyframeStep frame: 0, 8, 16, 24...)
      const keyframes: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += keyframeStep) {
        if (i !== 0) keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES - 1)) {
        keyframes.push(TOTAL_FRAMES - 1);
      }

      // Step 3: Populate remaining frames
      const remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!keyframes.includes(i) && i !== 0) {
          remaining.push(i);
        }
      }

      // Fill queue: keyframes first, then remaining
      queueRef.current = [...keyframes, ...remaining];
      processQueue();
    });

    return () => {
      isCancelled = true;
      queueRef.current = [];
    };
  }, [keyframeStep, loadSingleFrame, processQueue]);

  return {
    firstFrameLoaded,
    loadProgress,
    getNearestFrame,
    prioritizeAround,
    images: imagesRef.current,
  };
}
