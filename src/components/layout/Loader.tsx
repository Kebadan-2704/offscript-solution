'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Editorial Studio Intro Preloader.
 * - Displays the sculptural 3D monogram emblem from "preloader.webm" / "preloader.mp4"
 * - High-end studio layout: top telemetry bar, breathing center 3D hero stage, and clean single-line typography suite
 * - Plays strictly ONCE (no looping, freezes on last frame, and skips in same session via sessionStorage)
 * - Staggered architectural typography: Welcome eyebrow, bold uppercase tagline, studio telemetry
 * - Seamless cinematic fade out directly into the Hero Section
 * - Zero collision: pure flexbox flow prevents any text overlap across all screen heights and widths
 * - Click anywhere or press Escape to skip immediately
 * - Full prefers-reduced-motion: reduce bypass for accessibility
 */
export function Loader() {
  const router = useRouter();
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [textStep, setTextStep] = useState(0);

  const handleComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('offscript_intro_seen', 'true');
      } catch {
        // Fallback if sessionStorage is disabled or blocked
      }

      // Freeze video immediately on final frame so it never loops or restarts
      if (videoRef.current) {
        videoRef.current.pause();
      }

      // Ensure viewport is pinned strictly at top of Hero section
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

      window.dispatchEvent(new CustomEvent('offscript:intro-ready'));
    }

    setExiting(true);

    setTimeout(() => {
      setVisible(false);
      // Refresh GSAP ScrollTrigger so all hero parallax / animations calculate from (0, 0)
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 800);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Support force re-play for testing via query parameter ?intro=1 or ?replay=1
    const forceReplay = window.location.search.includes('intro=1') || window.location.search.includes('replay=1');

    // 1. Session check: The intro video plays strictly ONCE per browsing session
    if (!forceReplay) {
      try {
        const hasSeenIntro = sessionStorage.getItem('offscript_intro_seen');
        if (hasSeenIntro === 'true') {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          document.documentElement.style.height = '';
          document.body.style.height = '';

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

          window.dispatchEvent(new CustomEvent('offscript:intro-ready'));
          setVisible(false);
          ScrollTrigger.refresh();
          return;
        }
      } catch {
        // Ignore sessionStorage errors
      }
    }

    // 2. Strict prefers-reduced-motion bypass: skip animation, unlock viewport, and enable interactivity immediately
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';

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

      window.dispatchEvent(new CustomEvent('offscript:intro-ready'));
      setVisible(false);
      ScrollTrigger.refresh();
      return;
    }

    // 3. Strict Scroll & Route Lock to Hero Page
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

    // 4. Attempt video playback immediately (strictly once, muted, never looped)
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = false;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if autoplay policy intervenes
        });
      }
    }

    // 5. Harmonized text choreography timers
    const t0 = setTimeout(() => setTextStep(1), 250);
    const t1 = setTimeout(() => setTextStep(2), 700);
    const t2 = setTimeout(() => setTextStep(3), 1550);

    // 6. Auto-transition fallback right as logo completes single playback (~3.3s)
    const timer = setTimeout(() => {
      handleComplete();
    }, 3300);

    // 7. Keyboard skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
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
      aria-label="Welcome to OFFSCRIPT SOLUTION — Engineered Differently."
      onClick={handleComplete}
      className={`fixed inset-0 z-[100] bg-[#F5F3ED] flex flex-col justify-between items-center select-none overflow-hidden cursor-pointer motion-reduce:hidden motion-reduce:pointer-events-none transition-opacity duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Top Studio Telemetry Bar (Hidden on mobile & short screens) */}
      <header
        className={`w-full max-w-6xl px-6 pt-5 sm:pt-6 hidden md:flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B6C67] z-20 pointer-events-none transition-opacity duration-700 ${
          textStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 text-[#191B1E] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#D36B4D] animate-pulse" aria-hidden="true" />
          <span>OFFSCRIPT CORE</span>
        </div>
        <div className="tracking-[0.25em]">INDEPENDENT TECHNOLOGY STUDIO</div>
        <div className="text-[#52534E]">STU // 2026</div>
      </header>

      {/* 2. Center Stage: Sculptural 3D Emblem Hero (Naturally Constrained & Vertically Centered) */}
      <main className="flex-1 w-full max-w-5xl flex items-center justify-center relative min-h-0 px-4 py-2 z-10 pointer-events-none">
        <div className="relative w-full max-w-[800px] h-[min(42vh,380px)] flex items-center justify-center">
          {/* Ambient Warm Terracotta Halo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-[#D36B4D]/24 via-[#D36B4D]/6 to-transparent blur-3xl pointer-events-none rounded-full scale-130"
          />

          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              loop={false}
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                handleComplete();
              }}
              onTimeUpdate={() => {
                // Safety freeze: if video reaches near duration, freeze on final frame so it cannot loop
                if (videoRef.current && videoRef.current.currentTime >= 2.95) {
                  videoRef.current.pause();
                }
              }}
              style={{ mixBlendMode: 'multiply' }}
              className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_28px_56px_rgba(25,27,30,0.16)] transform scale-125 sm:scale-130 md:scale-135 transition-transform duration-700"
              aria-label="OFFSCRIPT SOLUTION 3D animated monogram emblem"
            >
              <source src="/brand/preloader.webm" type="video/webm" />
              <source src="/brand/preloader.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </main>

      {/* 3. Bottom Typography Suite: Guaranteed Zero Collision Across All Viewports */}
      <footer className="w-full max-w-4xl flex flex-col items-center text-center gap-2 sm:gap-2.5 pb-5 sm:pb-6 px-4 z-20 pointer-events-none">
        {/* Eyebrow with Terracotta Hairlines */}
        <div className="overflow-hidden pb-0.5">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              textStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <span className="w-5 sm:w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <p className="font-mono text-[10px] sm:text-xs md:text-xs tracking-[0.28em] uppercase text-[#6B6C67] font-medium">
              Welcome to <span className="text-[#191B1E] font-bold">OFFSCRIPT SOLUTION</span>
            </p>
            <span className="w-5 sm:w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
          </div>
        </div>

        {/* Tagline: Single Horizontal Line on Desktop & Clean Fluid Sizing */}
        <div className="overflow-hidden pb-0.5">
          <h2
            className={`font-space text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold tracking-[-0.035em] text-[#191B1E] uppercase leading-tight sm:whitespace-nowrap transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              textStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            Engineered Differently<span className="text-[#D36B4D]">.</span>
          </h2>
        </div>

        {/* Studio Capabilities / Credentials Bar */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 pt-0.5 font-mono text-[10px] sm:text-[11px] text-[#6B6C67] tracking-[0.2em] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            textStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span>BESPOKE SOFTWARE</span>
          <span className="text-[#D36B4D]" aria-hidden="true">/</span>
          <span>INTELLIGENT SYSTEMS</span>
          <span className="text-[#D36B4D]" aria-hidden="true">/</span>
          <span>DIGITAL CRAFT</span>
        </div>

        {/* Integrated Skip Cue (Natural Flow guarantees zero overlap with headline) */}
        <div
          className={`pt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#92938D]/70 transition-opacity duration-700 ${
            textStep >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>Click anywhere or press Esc to enter</span>
        </div>
      </footer>
    </div>
  );
}
