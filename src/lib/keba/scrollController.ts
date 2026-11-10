/**
 * KEBA AI — Unified Scroll Controller
 * 
 * Reuses the application's existing Lenis smooth-scroll instance (window.__lenis).
 * Features:
 * - Smooth camera navigation with sticky header offset (-84px).
 * - Instant scrolling when reduced motion is preferred.
 * - Promise-based completion resolution so dialogue triggers strictly after arrival.
 * - Fallback to native window.scrollTo / scrollIntoView on mobile and touch devices.
 */

import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export interface ScrollOptions {
  offset?: number;
  duration?: number;
  reducedMotion?: boolean;
}

export function scrollToSection(
  targetSelector: string,
  options: ScrollOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    const { offset = -84, duration = 1.2, reducedMotion = false } = options;

    const targetEl = document.querySelector(targetSelector);
    if (!targetEl) {
      console.warn(`[ScrollController] Target selector not found: ${targetSelector}`);
      resolve();
      return;
    }

    // 1. Reduced Motion: Instant native scroll without animation
    if (reducedMotion) {
      const top = targetEl.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'auto' });
      resolve();
      return;
    }

    // 2. Existing Lenis Instance (Desktop Smooth Scroll)
    const lenis = window.__lenis;
    if (lenis) {
      let isCompleted = false;

      const finish = () => {
        if (!isCompleted) {
          isCompleted = true;
          resolve();
        }
      };

      lenis.scrollTo(targetEl as HTMLElement, {
        offset,
        duration,
        onComplete: finish,
      });

      // Safety timeout in case onComplete callback does not fire (interrupted scroll)
      setTimeout(finish, (duration + 0.35) * 1000);
      return;
    }

    // 3. Native Smooth Scroll (Touch / Mobile devices)
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });

    // Wait approximate scroll duration on native mobile
    setTimeout(() => {
      resolve();
    }, 850);
  });
}

