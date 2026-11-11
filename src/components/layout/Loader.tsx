'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Pure Cinematic Logo Intro Preloader.
 * - Displays the sculptural 3D monogram emblem from "preloader.webm" / "preloader.mp4"
 * - Extra large, center-stage presentation matching master emblem visual identity
 * - Plays strictly ONCE (no looping, freezes on last frame, and skips in same session via sessionStorage)
 * - Staggered architectural typography: Welcome eyebrow, bold uppercase tagline, studio telemetry
 * - Seamless cinematic fade out directly into the Hero Section
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

    // 1. Session check: The intro video should play strictly ONCE per browsing session
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

    // 5. Staggered text choreography timers
    const t1 = setTimeout(() => setTextStep(1), 350);
    const t2 = setTimeout(() => setTextStep(2), 850);
    const t3 = setTimeout(() => setTextStep(3), 1400);

    // 6. Auto-transition fallback right as logo completes single playback (~3.2s)
    const timer = setTimeout(() => {
      handleComplete();
    }, 3200);

    // 7. Keyboard skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
      className={`fixed inset-0 z-[100] bg-[#F5F3ED] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer motion-reduce:hidden motion-reduce:pointer-events-none transition-opacity duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Center Stage: Sculptural 3D Emblem (Extra Large & Imposing) + Editorial Typography Suite */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-7xl mx-auto z-10 pointer-events-none">
        {/* 3D Monogram Video Container - Massive, Heroic & Cinematic */}
        <div className="relative w-full max-w-[540px] sm:max-w-[760px] md:max-w-[980px] lg:max-w-[1240px] xl:max-w-[1440px] aspect-[16/9] flex items-center justify-center -mb-4 sm:-mb-8 md:-mb-12">
          {/* Ambient Warm Terracotta Halo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-[#D36B4D]/28 via-[#D36B4D]/8 to-transparent blur-3xl pointer-events-none rounded-full scale-175"
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
                // Safety freeze: if video reaches end, freeze frame so it cannot loop
                if (videoRef.current && videoRef.current.currentTime >= 2.95) {
                  videoRef.current.pause();
                }
              }}
              style={{ mixBlendMode: 'multiply' }}
              className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-[0_40px_80px_rgba(25,27,30,0.22)] transform scale-135 sm:scale-150 md:scale-165 lg:scale-[1.82] transition-transform duration-700"
              aria-label="OFFSCRIPT SOLUTION 3D animated monogram emblem"
            >
              <source src="/brand/preloader.webm" type="video/webm" />
              <source src="/brand/preloader.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Animated Architectural Typography Suite */}
        <div className="flex flex-col items-center space-y-2.5 sm:space-y-3.5 relative z-20">
          {/* 1. Welcome Eyebrow with Terracotta Hairlines */}
          <div className="overflow-hidden pb-1">
            <div
              className={`flex items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                textStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <span className="w-6 sm:w-10 h-px bg-[#D36B4D]" aria-hidden="true" />
              <p className="font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.32em] uppercase text-[#6B6C67] font-medium">
                Welcome to <span className="text-[#191B1E] font-bold">OFFSCRIPT SOLUTION</span>
              </p>
              <span className="w-6 sm:w-10 h-px bg-[#D36B4D]" aria-hidden="true" />
            </div>
          </div>

          {/* 2. Headline Tagline: Bold Architectural Space Grotesk All-Caps */}
          <div className="overflow-hidden pb-1">
            <h2
              className={`font-space text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] font-bold tracking-[-0.035em] text-[#191B1E] uppercase leading-[0.96] text-balance transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                textStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              Engineered Differently<span className="text-[#D36B4D]">.</span>
            </h2>
          </div>

          {/* 3. Studio Telemetry & Credentials Line */}
          <div
            className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-0.5 font-mono text-[10px] sm:text-xs text-[#6B6C67] tracking-[0.22em] uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              textStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="flex items-center gap-1.5 text-[#191B1E] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D36B4D] animate-pulse" aria-hidden="true" />
              SYSTEMS ACTIVE
            </span>
            <span className="text-[#D36B4D]" aria-hidden="true">/</span>
            <span>INDEPENDENT TECHNOLOGY STUDIO</span>
            <span className="text-[#D36B4D]" aria-hidden="true">/</span>
            <span>2026</span>
          </div>
        </div>
      </div>

      {/* Subtle Skip Instruction at Bottom */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#92938D]/70 transition-opacity duration-700 pointer-events-none ${
          textStep >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>Click anywhere or press Esc to enter</span>
      </div>
    </div>
  );
}
