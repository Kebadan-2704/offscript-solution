/**
 * KEBA AI — Tour Section Spotlight
 * 
 * Renders a subtle architectural focus frame around the active tour section.
 * Features:
 * - Non-blocking (pointer-events: none) preserving 100% of links and buttons.
 * - Terracotta hairline border (#D36B4D) with soft ambient drop-glow.
 * - Responsive dynamic bounds tracking via ResizeObserver and scroll listeners.
 * - Zero obscuring of underlying text or content.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

interface TourSpotlightProps {
  targetSelector: string;
  active: boolean;
  stepLabel: string;
  sectionTitle: string;
}

interface RectBounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function TourSpotlight({
  targetSelector,
  active,
  stepLabel,
  sectionTitle,
}: TourSpotlightProps) {
  const [bounds, setBounds] = useState<RectBounds | null>(null);

  const updateBounds = useCallback(() => {
    if (!active || typeof window === 'undefined') return;

    const el = document.querySelector(targetSelector);
    if (!el) {
      setBounds(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    setBounds({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [active, targetSelector]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setTimeout(updateBounds, 0);

    const handleScroll = () => updateBounds();
    const handleResize = () => updateBounds();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const el = document.querySelector(targetSelector);
    let ro: ResizeObserver | null = null;
    if (el) {
      ro = new ResizeObserver(() => updateBounds());
      ro.observe(el);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [active, targetSelector, updateBounds]);

  if (!active || !bounds) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-[44] transition-all duration-400 ease-[cubic-bezier(0.2,0.7,0.1,1)]"
      style={{
        top: Math.max(bounds.top, 0),
        left: bounds.left,
        width: bounds.width,
        height: Math.min(bounds.height, window.innerHeight),
      }}
      aria-hidden="true"
    >
      {/* 1. Subtle Terracotta Corner Accent Brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D36B4D]" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D36B4D]" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D36B4D]" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D36B4D]" />

      {/* 2. Soft Ambient Perimeter Glow */}
      <div className="absolute inset-0 border border-[#D36B4D]/30 shadow-[0_0_36px_rgba(211,107,77,0.14)]" />

      {/* 3. Floating Architectural Tag */}
      <div className="absolute top-4 left-6 hidden md:flex items-center gap-2 px-3 py-1 bg-[#191B1E] text-[#F5F3ED] border border-[#E6E2D9]/20 font-mono text-[11px] uppercase tracking-wider shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D36B4D] animate-pulse" />
        <span>TOUR FOCUS · {stepLabel}</span>
        <span className="text-[#92938D]">|</span>
        <span className="text-[#D36B4D] font-semibold">{sectionTitle}</span>
      </div>
    </div>
  );
}
