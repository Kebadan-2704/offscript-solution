'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Pure Cinematic Logo Intro Preloader.
 * - Displays ONLY the 3D monogram emblem from "Off Script .mp4"
 * - On full refresh or reload: plays the intro emblem and lands directly at the Hero page (#hero / top 0)
 * - Locks background scrolling while active to prevent scroll drift
 * - Disables browser native scroll restoration and resets viewport to (0, 0)
 * - Seamlessly curtains up directly into the Hero Section
 * - Click anywhere or press Escape to skip immediately
 */
export function Loader() {
  const router = useRouter();
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => {
    // Ensure viewport is pinned strictly at top of Hero section
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (t: number, o?: { immediate: boolean }) => void;
            start: () => void;
          };
        }
      ).__lenis;
      lenis?.scrollTo(0, { immediate: true });
      lenis?.start();

      // Unlock body & HTML scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    }

    setExiting(true);

    setTimeout(() => {
      setVisible(false);
      // Refresh GSAP ScrollTrigger so all hero parallax / animations calculate from (0, 0)
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 700);
  }, []);

  useEffect(() => {
    // 1. Strict Scroll & Route Lock to Hero Page
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      // Lock document scroll so background cannot move during intro
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      // Pause smooth scroll during preloader
      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (t: number, o?: { immediate: boolean }) => void;
            stop: () => void;
          };
        }
      ).__lenis;
      lenis?.scrollTo(0, { immediate: true });
      lenis?.stop();

      // If user refreshed while on an inner page, navigate directly to hero page
      if (typeof performance !== 'undefined') {
        const navEntries = performance.getEntriesByType?.('navigation') as PerformanceNavigationTiming[] | undefined;
        const isReload = navEntries && navEntries[0]?.type === 'reload';
        if (isReload && pathname !== '/') {
          router.replace('/');
        }
      }
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    }

    // 2. Attempt video playback immediately
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if autoplay policy intervenes
        });
      }
    }

    // 3. Auto-transition right as logo completes its 3D assembly (~2.8s)
    const timer = setTimeout(() => {
      handleComplete();
    }, 2800);

    // 4. Keyboard skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      // Cleanup styles if unmounted unexpectedly
      if (typeof window !== 'undefined') {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
  }, [handleComplete, pathname, router]);

  if (!visible) return null;

  return (
    <div
      id="brand-loader"
      role="status"
      aria-live="polite"
      aria-label="OFFSCRIPT SOLUTION"
      onClick={handleComplete}
      className={`fixed inset-0 z-[100] bg-[#F5F3ED] flex items-center justify-center select-none overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.1,1)] ${
        exiting ? '-translate-y-full opacity-90 scale-[1.01]' : 'translate-y-0 opacity-100 scale-100'
      }`}
    >
      {/* Center Stage: Pure 3D Monogram Emblem Alone - Completely Uncropped & Seamless */}
      <div className="relative w-full max-w-[800px] sm:max-w-[960px] lg:max-w-[1120px] aspect-video flex items-center justify-center pointer-events-none px-4">
        {/* Ambient Subtle Warm Terracotta Depth Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-[#D36B4D]/15 via-transparent to-transparent blur-3xl pointer-events-none rounded-full scale-125"
        />

        {/* 3D Monogram Video (Muted, Autoplay, True Transparent Alpha WebM with MP4 Fallback) */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ mixBlendMode: 'multiply' }}
            className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_24px_48px_rgba(25,27,30,0.12)]"
            aria-label="OFFSCRIPT SOLUTION 3D animated monogram emblem"
          >
            <source src="/brand/preloader.webm" type="video/webm" />
            <source src="/brand/preloader.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
