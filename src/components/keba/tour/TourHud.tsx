/**
 * KEBA AI — Dedicated Tour HUD
 * 
 * Editorial card displaying Keba's explanation, step index, progress bar,
 * Previous / Next navigation controls, and Skip trigger.
 * Built using OFFSCRIPT design tokens with full WCAG keyboard accessibility.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { TourStop } from '@/lib/keba/tourManifest';
import type { TourStage } from '../state/kebaTypes';
import { ChevronLeft, ChevronRight, Check, X, Compass, Loader2, Minimize2, Maximize2 } from 'lucide-react';

interface TourHudProps {
  currentStop: TourStop;
  totalStops: number;
  tourStage: TourStage;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export function TourHud({
  currentStop,
  totalStops,
  tourStage,
  onNext,
  onPrev,
  onSkip,
}: TourHudProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const isFirstStep = currentStop.index === 0;
  const isLastStep = currentStop.index === totalStops - 1;
  const isMoving = tourStage === 'TOUR_MOVING';
  const isCompleted = tourStage === 'TOUR_COMPLETED';

  // Keyboard navigation: ArrowRight / Enter = Next, ArrowLeft = Prev, Esc = Skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMoving) return;

      if (e.key === 'ArrowRight' || (e.key === 'Enter' && e.target === document.body)) {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMoving, isFirstStep, onNext, onPrev, onSkip]);

  // Auto-focus next button on step advance
  useEffect(() => {
    if (!isMoving && !isCollapsed) {
      nextButtonRef.current?.focus();
    }
  }, [currentStop.index, isMoving, isCollapsed]);

  return (
    <aside
      role="region"
      aria-label="Website Tour Guide"
      aria-live="polite"
      className="pointer-events-auto fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 md:right-8 sm:w-[460px] md:max-w-lg z-[48] bg-[#F5F3ED] border border-[#191B1E] shadow-[5px_5px_0px_#191B1E] sm:shadow-[8px_8px_0px_#191B1E] p-4 sm:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      {isCollapsed ? (
        /* Minimized Sleek Pill Mode */
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#D36B4D]" />
            <span className="font-mono text-xs font-bold text-[#191B1E]">
              {currentStop.stepLabel} — {currentStop.sectionTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 text-[#6B6C67] hover:text-[#191B1E] transition-colors cursor-pointer"
              aria-label="Expand tour HUD"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={isMoving}
              className="btn-studio btn-studio-primary text-[11px] py-1 px-3"
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="p-1.5 text-[#6B6C67] hover:text-[#191B1E] transition-colors cursor-pointer"
              aria-label="Skip tour"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Expanded HUD Mode */
        <>
          {/* Top Bar with Step Index & Controls */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E2D9]">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D36B4D]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#191B1E] font-bold">
                TOUR · {currentStop.stepLabel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress bar */}
              <div className="hidden sm:flex items-center gap-1 w-20 h-1.5 bg-[#E6E2D9] overflow-hidden">
                <div
                  className="h-full bg-[#D36B4D] transition-all duration-300"
                  style={{
                    width: `${((currentStop.index + 1) / totalStops) * 100}%`,
                  }}
                />
              </div>

              {/* Minimize button */}
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="font-mono text-[11px] text-[#6B6C67] hover:text-[#191B1E] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                title="Minimize HUD"
                aria-label="Minimize Tour HUD"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              {/* Skip button */}
              <button
                type="button"
                onClick={onSkip}
                className="font-mono text-[11px] text-[#6B6C67] hover:text-[#191B1E] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                aria-label="Skip Guided Tour (Esc)"
              >
                <span>Skip</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Narrative Area */}
          <div className="space-y-3">
            {/* Section Headline */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D36B4D]" />
              <h4 className="font-space text-base sm:text-lg font-bold tracking-tight text-[#191B1E]">
                {isCompleted ? 'Tour Complete' : currentStop.sectionTitle}
              </h4>
            </div>

            {/* Keba Dialogue */}
            <p className="font-inter text-sm sm:text-[14px] text-[#191B1E] leading-relaxed">
              {isCompleted
                ? "That's our studio overview! I'm docked in the corner whenever you need assistance."
                : `“${currentStop.dialogue}”`}
            </p>

            {/* Navigation Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep || isMoving}
                className={`btn-studio text-xs py-2 px-3.5 flex items-center gap-1.5 transition-all ${
                  isFirstStep || isMoving
                    ? 'opacity-40 cursor-not-allowed border-[#92938D]'
                    : 'hover:bg-[#191B1E] hover:text-[#F5F3ED] cursor-pointer'
                }`}
                aria-label="Previous tour section"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-mono">Back</span>
              </button>

              {/* Step Indicator dots */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalStops }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentStop.index
                        ? 'w-4 bg-[#D36B4D]'
                        : i < currentStop.index
                        ? 'bg-[#191B1E]'
                        : 'bg-[#E6E2D9]'
                    }`}
                  />
                ))}
              </div>

              {/* Next / Complete Button */}
              <button
                ref={nextButtonRef}
                type="button"
                onClick={onNext}
                disabled={isMoving}
                className="shrink-0 btn-studio btn-studio-primary text-xs py-2 px-3 sm:px-4 flex items-center gap-1.5 sm:gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                aria-label={isLastStep ? 'Complete guided tour' : 'Next tour section'}
              >
                {isMoving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="font-mono">Moving...</span>
                  </>
                ) : isLastStep ? (
                  <>
                    <span className="font-mono">Finish Tour</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span className="font-mono">Next Stop</span>
                    <ChevronRight className="w-3.5 h-3.5 arrow-icon" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#52534E]">
              <span>Tip: [←] [→] arrow keys</span>
              <span>[Esc] to Skip</span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

