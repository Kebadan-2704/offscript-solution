'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Global smooth scroll provider using Lenis synchronized with GSAP ScrollTrigger.
 * Strictly disabled on touch devices and when reduced motion is preferred.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Disable on reduced motion preference
    if (prefersReduced) return;

    // Detect touch device (smartphones and tablets should use native momentum scroll)
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
    });

    if (typeof window !== 'undefined') {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Synchronize Lenis with GSAP ScrollTrigger for 60fps lockstep scroll-driven animations
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (typeof window !== 'undefined') {
        (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      }
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
