'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Branded entry loader displaying the 3D symbol mark with a curtain reveal.
 * Runs only on first visit within a session (sessionStorage check) and lasts <= 1.2s.
 */
export function Loader() {
  const prefersReduced = useReducedMotion();

  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem('offscript_visited');
    } catch {
      return false;
    }
  });

  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible || prefersReduced) return;

    try {
      sessionStorage.setItem('offscript_visited', 'true');
    } catch {
      // Ignore sessionStorage exceptions
    }

    // Begin exit transition at 900ms, remove completely at 1500ms
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 900);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [visible, prefersReduced]);

  if (!visible || prefersReduced) return null;

  return (
    <div
      id="brand-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading OFFSCRIPT SOLUTION"
      className={`fixed inset-0 z-[100] bg-[#191B1E] flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative w-28 h-28 flex items-center justify-center animate-pulse">
        <Image
          src="/brand/logo-symbol-3d.png"
          alt=""
          width={112}
          height={112}
          priority
          className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform -rotate-3"
        />
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-[#92938D] uppercase">
        Engineered Differently
      </p>
    </div>
  );
}
