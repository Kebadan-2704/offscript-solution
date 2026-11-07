'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function getIsFinePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Subtle Terracotta custom cursor ring that expands over interactive elements.
 * Desktop pointer:fine only; does NOT hide the native OS cursor.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const isFinePointer = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    getIsFinePointer,
    () => false
  );

  useEffect(() => {
    if (!isFinePointer || prefersReduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('[tabindex="0"]'))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const loop = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isFinePointer, prefersReduced]);

  if (!isFinePointer || prefersReduced) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[90] rounded-full border border-[#D36B4D] transition-[width,height,background-color] duration-200 ease-out ${
        hovered
          ? 'w-[54px] h-[54px] bg-[#D36B4D]/15'
          : 'w-[14px] h-[14px] bg-transparent'
      }`}
      style={{ willChange: 'transform' }}
    />
  );
}
