'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { Parallax } from '@/components/animations/Parallax';
import { ArchitectureCanvas } from '@/components/animations/ArchitectureCanvas';
import { Magnetic } from '@/components/animations/Magnetic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Editorial Hero Section with asymmetric typography, ambient architecture canvas,
 * and bespoke SVG OS symbol composition.
 */
export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setIntroReady(true);
      return;
    }

    const handleReady = () => setIntroReady(true);
    window.addEventListener('offscript:intro-ready', handleReady);

    // Fallback if loader was already completed or skipped
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 3200);

    return () => {
      window.removeEventListener('offscript:intro-ready', handleReady);
      clearTimeout(timer);
    };
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[100dvh] pt-20 sm:pt-22 lg:pt-24 pb-4 sm:pb-6 flex flex-col justify-between overflow-hidden bg-[#F5F3ED] scroll-mt-[84px]"
    >
      {/* Ambient Engineering Coordinate Canvas */}
      <ArchitectureCanvas theme="light" className="pointer-events-none absolute inset-0 opacity-40 z-0" />

      <Container className="w-full relative z-10 my-auto py-1 sm:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="hero-left lg:col-span-7 xl:col-span-7 flex flex-col items-start justify-center">
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                introReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: '80ms' }}
            >
              <Eyebrow>Independent Technology & Digital Solutions Studio</Eyebrow>
            </div>

            <SplitHeading
              lines={[
                'WE THINK',
                'BEYOND THE',
                <>
                  EXPECTED<span className="text-[#D36B4D]">.</span>
                </>,
              ]}
              as="h1"
              trigger={introReady}
              delayMs={180}
              className="hero-title font-syne text-4xl sm:text-6xl md:text-7xl lg:text-[70px] xl:text-[80px] font-bold tracking-[-0.03em] leading-[0.95] text-[#191B1E]"
            />

            <p
              style={{ transitionDelay: '480ms' }}
              className={`hero-desc mt-4 sm:mt-5 text-sm sm:text-base lg:text-base text-[#52534E] max-w-xl leading-relaxed text-balance transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                introReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              We engineer bespoke software, intelligent systems, and scalable digital platforms
              designed to solve complex operational bottlenecks with uncompromising technical craft.
            </p>

            <div
              style={{ transitionDelay: '620ms' }}
              className={`hero-actions mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                introReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Magnetic strength={10}>
                <Button href="#contact" variant="primary">
                  Start a Project
                </Button>
              </Magnetic>
              <Magnetic strength={10}>
                <Button href="#work" variant="secondary">
                  Explore Our Work
                </Button>
              </Magnetic>
            </div>

            {/* Direct SLA Micro-Copy (From verified intake commitment) */}
            <p
              style={{ transitionDelay: '740ms' }}
              className={`hero-sla mt-3 text-xs font-mono text-[#6B6C67] flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                introReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D36B4D]" aria-hidden="true" />
              <span>Direct principal review within 24 business hours. No sales intermediaries.</span>
            </p>
          </div>

          {/* Right Column: Sculptural 3D Master Emblem Video (Extra Large, Centered & Responsive) */}
          <div
            style={{ transitionDelay: '280ms' }}
            className={`hero-emblem lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              introReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Parallax maxOffset={14} className="w-full max-w-[440px] sm:max-w-[540px] lg:max-w-[640px] xl:max-w-[720px] 2xl:max-w-[780px]">
              <div className="relative w-full aspect-[16/11] flex items-center justify-center group">
                {/* Ambient Warm Lighting Halo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-16 sm:-inset-24 bg-radial from-[#D36B4D]/30 via-[#D36B4D]/12 to-transparent blur-3xl pointer-events-none rounded-full"
                />

                {/* 3D Motion Video (Autoplay, Muted, Looped, Native Transparent Alpha, Scale-Boosted) */}
                <div className="relative w-full h-full flex items-center justify-center select-none">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_28px_56px_rgba(25,27,30,0.16)] transform scale-135 sm:scale-140 lg:scale-150 xl:scale-158 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.68]"
                    aria-label="OFFSCRIPT SOLUTION animated 3D brand emblem"
                  >
                    <source src="/brand/offscript-hero.webm" type="video/webm" />
                    <source src="/brand/offscript-hero.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </Container>

      {/* Scroll Cue Hairline indicator aligned inside Container */}
      <Container className="w-full relative z-10">
        <div className="w-full flex items-center pt-3 sm:pt-4 border-t border-[#E6E2D9]">
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-[#52534E] uppercase tracking-widest">
            <div className="relative w-px h-6 bg-[#E6E2D9] overflow-hidden">
              <div className="absolute inset-0 bg-[#D36B4D] animate-[scrollCue_2s_infinite]" />
            </div>
            <span>Scroll to explore</span>
            <span className="text-[#92938D]">·</span>
            <span>Studio 2026</span>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes emblemFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(0, -14px, 0) rotate(-1deg);
          }
        }
        @keyframes scrollCue {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @media (max-height: 500px) {
          :global(#hero) {
            min-height: auto !important;
            padding-top: 4.25rem !important;
            padding-bottom: 0.5rem !important;
          }
          :global(#hero .hero-title) {
            font-size: 1.85rem !important;
            line-height: 1.0 !important;
          }
          :global(#hero .hero-desc) {
            margin-top: 0.35rem !important;
            font-size: 0.8125rem !important;
            line-height: 1.3 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          :global(#hero .hero-actions) {
            margin-top: 0.5rem !important;
            gap: 0.5rem !important;
          }
          :global(#hero .hero-actions a),
          :global(#hero .hero-actions button) {
            min-height: 38px !important;
            padding: 0.35rem 0.85rem !important;
            font-size: 0.75rem !important;
          }
          :global(#hero .hero-sla) {
            margin-top: 0.25rem !important;
            font-size: 0.6875rem !important;
          }
          :global(#hero .hero-emblem) {
            max-width: 200px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\[scrollCue_2s_infinite\],
          .animate-\[emblemFloat_6s_ease-in-out_infinite_alternate\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
