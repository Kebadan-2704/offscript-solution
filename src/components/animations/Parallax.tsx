'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxProps {
  children: ReactNode;
  maxOffset?: number;
  className?: string;
}

/**
 * Subtle interactive mouse parallax effect.
 * Strictly bounded to maxOffset (default 24px per PART 5.2 #7) and disabled on reduced motion.
 */
export function Parallax({
  children,
  maxOffset = 24,
  className = '',
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      const offsetX = xNorm * maxOffset;
      const offsetY = yNorm * maxOffset;

      el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [maxOffset, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

