'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Global smooth scroll provider using Lenis.
 * Strictly disabled on touch devices and when reduced motion is preferred.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Disable if user requested reduced motion
    if (prefersReduced) return;

    // Detect touch device (smartphones and tablets should use native momentum scroll)
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}

