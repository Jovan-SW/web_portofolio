'use client';

import React, { useEffect, useRef } from 'react';

interface CaveDebrisCanvasProps {
  className?: string;
}

interface Vertex {
  x: number;
  y: number;
}

interface Facet {
  vertices: [number, number, number]; // indices into polygon vertices or center
  color: string;
}

interface RockFragment {
  // Anchors & layout
  homeNormX: number;
  homeNormY: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  
  // Physics
  vx: number;
  vy: number;
  mass: number;
  
  // Floating cycle
  floatSpeedX: number;
  floatSpeedY: number;
  floatAmpX: number;
  floatAmpY: number;
  phaseX: number;
  phaseY: number;

  // Rotation
  angle: number;
  baseRotSpeed: number;
  rotVelocity: number;

  // Geometry
  vertices: Vertex[];
  ridgePoint: Vertex;
  facets: Facet[];
  baseColor: string;
  outlineColor: string;
}

export const CaveDebrisCanvas: React.FC<CaveDebrisCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement || containerRef.current;
    if (!canvas || !container) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get 2D context
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer state
    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
      lastActiveTime: 0,
    };

    let fragments: RockFragment[] = [];

    // Glacial ice crystal color palette - crystalline translucent blues, cyans, and frosted whites
    const crystalBaseColors = [
      'rgba(186, 230, 254, 0.78)', // Pale glacial cyan ice (#BAE6FD)
      'rgba(224, 242, 254, 0.85)', // Crisp translucent white ice (#E0F2FE)
      'rgba(147, 197, 253, 0.72)', // Deep refraction ice blue (#93C5FD)
      'rgba(165, 243, 252, 0.80)', // Bright arctic cyan (#A5F3FC)
      'rgba(240, 249, 255, 0.90)', // Frosted diamond ice (#F0F9FF)
      'rgba(125, 211, 252, 0.75)', // Sky blue ice crystal (#7DD3FC)
    ];

    const highlightFacetTones = [
      'rgba(255, 255, 255, 0.88)', // Razor-sharp specular white reflection
      'rgba(224, 242, 254, 0.75)', // Pale cyan internal refraction
      'rgba(186, 230, 254, 0.65)', // Pure ice facet glint
    ];

    const shadowFacetTones = [
      'rgba(14, 116, 144, 0.45)', // Deep cyan crevice refraction
      'rgba(3, 105, 161, 0.40)', // Deep glacial blue facet
      'rgba(15, 23, 42, 0.35)', // Shadowed ice core
    ];

    const outlineTones = [
      'rgba(255, 255, 255, 0.95)', // Crisp frosted white rim
      'rgba(186, 230, 254, 0.85)', // Pale icy cyan outline
      'rgba(56, 189, 248, 0.80)', // Radiant glacial electric rim
    ];

    // Determine particle count based on screen size and hardware
    const getParticleCount = (w: number) => {
      const isMobile = w < 768;
      const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
      if (isMobile) {
        return cores < 4 ? 18 : 24; // 18-24 on mobile
      }
      return cores < 4 ? 42 : 55; // 42-55 on desktop
    };

    // Create an angular ice crystal polygon
    const createCrystalGeometry = (isSmall: boolean) => {
      // Radius: small shards 3.5 - 7px, medium 8 - 14px, rare larger 15 - 20px
      let radius: number;
      if (isSmall) {
        radius = 3.5 + Math.random() * 4.5;
      } else {
        radius = Math.random() < 0.8 ? 8 + Math.random() * 6 : 14 + Math.random() * 5;
      }

      // Crystal styles: 0 = sharp diamond lozenge (4 vertices), 1 = elongated shard prism (5 vertices), 2 = hexagonal faceted ice gem (6 vertices)
      const crystalType = Math.floor(Math.random() * 3);
      const numVertices = crystalType === 0 ? 4 : crystalType === 1 ? 5 : 6;
      const vertices: Vertex[] = [];

      // Aspect ratio elongation along one axis for needle/shard crystal look
      const aspectX = crystalType === 1 ? 0.6 + Math.random() * 0.3 : 0.85 + Math.random() * 0.3;
      const aspectY = crystalType === 1 ? 1.35 + Math.random() * 0.5 : 0.95 + Math.random() * 0.25;

      for (let j = 0; j < numVertices; j++) {
        const baseAngle = (j / numVertices) * Math.PI * 2;
        // Minor angle jitter to give unique crystal fracture angles
        const angleJitter = (Math.random() - 0.5) * (Math.PI / numVertices) * 0.45;
        const angle = baseAngle + angleJitter;
        const rJitter = radius * (0.8 + Math.random() * 0.35);
        vertices.push({
          x: Math.cos(angle) * rJitter * aspectX,
          y: Math.sin(angle) * rJitter * aspectY,
        });
      }

      // Sharp central ridge point for 3D crystal refraction
      const ridgePoint: Vertex = {
        x: (Math.random() - 0.5) * radius * 0.35 * aspectX,
        y: (Math.random() - 0.5) * radius * 0.35 * aspectY,
      };

      // Create facets: split crystal into 2 distinct shaded refraction planes
      const mid = Math.floor(numVertices / 2);
      const facets: Facet[] = [
        {
          vertices: [0, mid, numVertices - 1],
          color: highlightFacetTones[Math.floor(Math.random() * highlightFacetTones.length)],
        },
        {
          vertices: [mid, mid + 1, numVertices - 1],
          color: shadowFacetTones[Math.floor(Math.random() * shadowFacetTones.length)],
        },
      ];

      return {
        radius,
        vertices,
        ridgePoint,
        facets,
        baseColor: crystalBaseColors[Math.floor(Math.random() * crystalBaseColors.length)],
        outlineColor: outlineTones[Math.floor(Math.random() * outlineTones.length)],
      };
    };

    // Initialize or re-distribute fragments
    const initFragments = (currentW: number, currentH: number) => {
      const count = getParticleCount(currentW);
      const cols = Math.ceil(Math.sqrt(count * (currentW / Math.max(1, currentH))));
      const rows = Math.ceil(count / cols);

      const newFragments: RockFragment[] = [];

      for (let i = 0; i < count; i++) {
        // Distribute in a jittered grid to avoid unnatural clumping
        const col = i % cols;
        const row = Math.floor(i / cols);

        const cellW = 1 / cols;
        const cellH = 1 / rows;

        // Normalized 0..1 coordinates
        const homeNormX = (col + 0.15 + Math.random() * 0.7) * cellW;
        const homeNormY = (row + 0.15 + Math.random() * 0.7) * cellH;

        const posX = homeNormX * currentW;
        const posY = homeNormY * currentH;

        const isSmall = i % 3 !== 0; // 2/3 small, 1/3 medium/large
        const geo = createCrystalGeometry(isSmall);

        // Mass proportional to radius squared
        const mass = Math.max(1, (geo.radius * geo.radius) / 25);

        newFragments.push({
          homeNormX,
          homeNormY,
          x: posX,
          y: posY,
          targetX: posX,
          targetY: posY,
          vx: 0,
          vy: 0,
          mass,
          // Subtle drifting cycles
          floatSpeedX: 0.0003 + Math.random() * 0.0005,
          floatSpeedY: 0.00025 + Math.random() * 0.00045,
          floatAmpX: 10 + Math.random() * 18,
          floatAmpY: 8 + Math.random() * 16,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          // Rotation
          angle: Math.random() * Math.PI * 2,
          baseRotSpeed: (Math.random() - 0.5) * 0.0018,
          rotVelocity: 0,
          // Geometry
          vertices: geo.vertices,
          ridgePoint: geo.ridgePoint,
          facets: geo.facets,
          baseColor: geo.baseColor,
          outlineColor: geo.outlineColor,
        });
      }

      fragments = newFragments;
    };

    // Update canvas size and DPR
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const newW = Math.max(10, Math.floor(rect.width));
      const newH = Math.max(10, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR at 1.5 for extreme efficiency

      if (newW !== width || newH !== height) {
        width = newW;
        height = newH;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        if (fragments.length === 0) {
          initFragments(width, height);
        } else {
          // Reposition existing fragments proportionally to new dimensions
          for (let i = 0; i < fragments.length; i++) {
            const f = fragments[i];
            f.targetX = f.homeNormX * width;
            f.targetY = f.homeNormY * height;
            f.x = f.homeNormX * width;
            f.y = f.homeNormY * height;
          }
        }

        if (prefersReducedMotion) {
          renderStaticFrame();
        }
      }
    };

    // Render single static frame for prefers-reduced-motion
    const renderStaticFrame = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (let i = 0; i < fragments.length; i++) {
        drawRock(fragments[i]);
      }
    };

    // Draw individual ice crystal fragment
    const drawRock = (f: RockFragment) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);

      // Cool glacial ice ambient glow & drop shadow
      ctx.shadowColor = 'rgba(56, 189, 248, 0.45)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0.5;
      ctx.shadowOffsetY = 1.5;

      // 1. Draw outer crystal polygon base
      ctx.beginPath();
      const len = f.vertices.length;
      ctx.moveTo(f.vertices[0].x, f.vertices[0].y);
      for (let j = 1; j < len; j++) {
        ctx.lineTo(f.vertices[j].x, f.vertices[j].y);
      }
      ctx.closePath();
      ctx.fillStyle = f.baseColor;
      ctx.fill();

      // Reset shadow for facets and stroke to keep edges crisp
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Crisp ice edge / crystalline rim highlight
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = f.outlineColor;
      ctx.stroke();

      // 2. Draw facet 1 (specular ridge highlight)
      ctx.beginPath();
      ctx.moveTo(f.ridgePoint.x, f.ridgePoint.y);
      ctx.lineTo(f.vertices[0].x, f.vertices[0].y);
      ctx.lineTo(f.vertices[1].x, f.vertices[1].y);
      ctx.closePath();
      ctx.fillStyle = f.facets[0].color;
      ctx.fill();

      // 3. Draw facet 2 (shadow / inner refraction facet)
      ctx.beginPath();
      ctx.moveTo(f.ridgePoint.x, f.ridgePoint.y);
      const mid = Math.floor(len / 2);
      ctx.lineTo(f.vertices[mid].x, f.vertices[mid].y);
      ctx.lineTo(f.vertices[(mid + 1) % len].x, f.vertices[(mid + 1) % len].y);
      ctx.closePath();
      ctx.fillStyle = f.facets[1].color;
      ctx.fill();

      // 4. Subtle specular glint diamond spark at center
      ctx.beginPath();
      ctx.arc(f.ridgePoint.x, f.ridgePoint.y, 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      ctx.restore();
    };

    // Main animation loop
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isVisible || !isTabActive) {
        animationFrameId = null;
        return;
      }

      // Delta time capped at 32ms to avoid jump on frame lag
      const rawDt = currentTime - lastTime;
      const dt = Math.min(rawDt, 32);
      lastTime = currentTime;

      // Pointer velocity decay when inactive
      if (currentTime - pointer.lastActiveTime > 250) {
        pointer.active = false;
        pointer.vx *= 0.85;
        pointer.vy *= 0.85;
      }

      // Clear transparent canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Physics parameters
      const maxDist = width < 768 ? 110 : 155;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < fragments.length; i++) {
        const f = fragments[i];

        // 1. Calculate natural gentle floating target
        const driftX = Math.sin(currentTime * f.floatSpeedX + f.phaseX) * f.floatAmpX;
        const driftY = Math.cos(currentTime * f.floatSpeedY + f.phaseY) * f.floatAmpY;
        const currentTargetX = f.homeNormX * width + driftX;
        const currentTargetY = f.homeNormY * height + driftY;

        // 2. Interactive Pointer scattering physics
        if (pointer.active) {
          const dx = f.x - pointer.x;
          const dy = f.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;

            // Smooth cubic displacement curve
            const proximity = 1 - dist / maxDist;
            const force = proximity * proximity * 4.2;

            // Repulsion impulse inversely proportional to mass
            const impulse = force / f.mass;
            f.vx += nx * impulse * 1.8;
            f.vy += ny * impulse * 1.8;

            // Impart slight directional push from moving cursor
            f.vx += pointer.vx * 0.12 * proximity;
            f.vy += pointer.vy * 0.12 * proximity;

            // Angular torque spin from displacement
            const spin = (nx * pointer.vy - ny * pointer.vx) * 0.004 * proximity;
            f.rotVelocity += spin;
          }
        }

        // 3. Restoring spring force toward natural floating position
        const springK = 0.026;
        f.vx += (currentTargetX - f.x) * springK;
        f.vy += (currentTargetY - f.y) * springK;

        // 4. Damping & velocity integration
        const damping = 0.915;
        f.vx *= damping;
        f.vy *= damping;

        f.x += f.vx * (dt / 16.67);
        f.y += f.vy * (dt / 16.67);

        // 5. Rotation dynamics
        f.rotVelocity *= 0.93;
        f.angle += (f.baseRotSpeed + f.rotVelocity) * (dt / 16.67);

        // 6. Draw rock fragment
        drawRock(f);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pointer event listeners on the container / section
    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;

      if (pointer.active) {
        pointer.vx = currentX - pointer.prevX;
        pointer.vy = currentY - pointer.prevY;
      } else {
        pointer.vx = 0;
        pointer.vy = 0;
      }

      pointer.prevX = currentX;
      pointer.prevY = currentY;
      pointer.x = currentX;
      pointer.y = currentY;
      pointer.active = true;
      pointer.lastActiveTime = performance.now();
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePointerPos(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Attach passive listeners to container
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // Tab visibility handling
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

    // Viewport IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive && !animationFrameId && !prefersReducedMotion) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Initial setup
    updateSize();
    if (!prefersReducedMotion) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default CaveDebrisCanvas;
