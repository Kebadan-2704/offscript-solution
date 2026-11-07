'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ArchitectureCanvasProps {
  className?: string;
  theme?: 'light' | 'dark';
}

/**
 * High-performance ambient architectural canvas.
 * Renders an engineering coordinate grid with subtle mouse interaction.
 * Pauses rendering completely when idle, off-screen, or on touch devices to guarantee 0ms CPU overhead.
 */
export function ArchitectureCanvas({
  className = '',
  theme = 'light',
}: ArchitectureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Zero-overhead on touch / mobile devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;
    let isMoving = false;
    let idleCounter = 0;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000 };

    const spacing = 48;
    const points: { x: number; y: number; originX: number; originY: number }[] = [];

    const dotColor = theme === 'dark' ? 'rgba(245, 243, 237, 0.12)' : 'rgba(25, 27, 30, 0.08)';
    const activeDotColor = '#9B3F27';
    const lineColor = theme === 'dark' ? 'rgba(211, 107, 77, 0.08)' : 'rgba(211, 107, 77, 0.06)';

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt) {
          ctx.fillRect(pt.originX - 1, pt.originY - 1, 2, 2);
        }
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Rebuild points
      points.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          points.push({ x, y, originX: x, originY: y });
        }
      }

      drawStatic();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isVisible || !isMoving) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      let anyDisplaced = false;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (!pt) continue;

        const dx = mouse.x - pt.originX;
        const dy = mouse.y - pt.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 120;
        if (dist < maxDist && mouse.x > 0) {
          const factor = (1 - dist / maxDist) * 8;
          pt.x = pt.originX + (dx / dist) * factor;
          pt.y = pt.originY + (dy / dist) * factor;
          anyDisplaced = true;

          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          ctx.fillStyle = activeDotColor;
          ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3, 3);
        } else {
          const diffX = pt.originX - pt.x;
          const diffY = pt.originY - pt.y;

          if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
            pt.x += diffX * 0.12;
            pt.y += diffY * 0.12;
            anyDisplaced = true;
          } else {
            pt.x = pt.originX;
            pt.y = pt.originY;
          }

          ctx.fillStyle = dotColor;
          ctx.fillRect(pt.x - 1, pt.y - 1, 2, 2);
        }
      }

      if (!anyDisplaced && mouse.x < 0) {
        idleCounter++;
        if (idleCounter > 10) {
          isMoving = false;
          drawStatic();
          return;
        }
      } else {
        idleCounter = 0;
      }

      animFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (!isMoving) {
        isMoving = true;
        idleCounter = 0;
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible && isMoving) {
          animFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReduced, theme]);

  if (prefersReduced) {
    return (
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#191B1E_1px,transparent_1px)] [background-size:32px_32px] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
