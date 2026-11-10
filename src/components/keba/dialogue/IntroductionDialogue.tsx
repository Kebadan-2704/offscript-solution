/**
 * KEBA AI — Introduction Dialogue HUD
 * 
 * Editorial-styled speech card matching OFFSCRIPT SOLUTION's Warm Ivory,
 * Carbon Ink, and Terracotta design tokens.
 * Features:
 * - Dynamic copy based on YES / NO visitor selection.
 * - Accessible focusable action buttons.
 * - Keyboard shortcuts (Esc = Skip, Y/1 = Yes, N/2 = No).
 * - Screen-reader live announcement region.
 */

'use client';

import { useEffect, useRef } from 'react';
import type { EntranceStage } from '../state/kebaTypes';
import { ArrowRight, Check, Sparkles, X } from 'lucide-react';

interface IntroductionDialogueProps {
  stage: EntranceStage;
  onSelectYes: () => void;
  onSelectNo: () => void;
  onSkip: () => void;
}

export function IntroductionDialogue({
  stage,
  onSelectYes,
  onSelectNo,
  onSkip,
}: IntroductionDialogueProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);

  // Auto-focus first button when dialogue opens
  useEffect(() => {
    if (stage === 'QUESTION') {
      const timer = setTimeout(() => {
        yesButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Keyboard accessibility listeners (Esc to skip, 1/Y for Yes, 2/N for No)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== 'QUESTION') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onSkip();
      } else if (e.key === '1' || e.key.toLowerCase() === 'y') {
        e.preventDefault();
        onSelectYes();
      } else if (e.key === '2' || e.key.toLowerCase() === 'n') {
        e.preventDefault();
        onSelectNo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, onSkip, onSelectYes, onSelectNo]);

  // Only render during active dialogue stages
  if (
    stage !== 'QUESTION' &&
    stage !== 'RESPONDING_YES' &&
    stage !== 'RESPONDING_NO'
  ) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      role="dialog"
      aria-label="KEBA AI Introduction"
      aria-live="polite"
      className="pointer-events-auto fixed top-24 sm:top-28 left-4 right-4 sm:left-auto sm:right-8 md:right-16 max-w-lg z-[48] bg-[#F5F3ED] border border-[#191B1E] shadow-[8px_8px_0px_#191B1E] p-6 sm:p-7 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      {/* Top Bar with metadata & skip trigger */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E2D9]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D36B4D] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#191B1E] font-semibold">
            KEBA AI · STUDIO REPRESENTATIVE
          </span>
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="font-mono text-[11px] text-[#6B6C67] hover:text-[#191B1E] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
          title="Skip Introduction (Esc)"
          aria-label="Skip Introduction"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Dialogue Content */}
      <div className="space-y-4">
        {/* STAGE: QUESTION */}
        {stage === 'QUESTION' && (
          <>
            <p className="font-space text-lg sm:text-xl font-bold tracking-tight text-[#191B1E] leading-snug">
              &ldquo;Hey there! I&apos;m Keba, the AI virtual representative of OFFSCRIPT SOLUTION.
              Welcome to our website!&rdquo;
            </p>

            <p className="font-inter text-sm sm:text-base text-[#6B6C67] leading-relaxed">
              Have you visited our website before?
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                ref={yesButtonRef}
                type="button"
                onClick={onSelectYes}
                className="btn-studio flex-1 text-xs py-3 px-4 flex items-center justify-between bg-transparent border-[#191B1E] hover:bg-[#191B1E] hover:text-[#F5F3ED] transition-all group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
              >
                <span className="font-mono font-medium">YES — I&apos;ve visited</span>
                <Check className="w-3.5 h-3.5 text-[#D36B4D] group-hover:text-[#F5F3ED]" />
              </button>

              <button
                type="button"
                onClick={onSelectNo}
                className="btn-studio btn-studio-primary flex-1 text-xs py-3 px-4 flex items-center justify-between transition-all group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
              >
                <span className="font-mono font-medium">NO — First time here</span>
                <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#92938D]">
              <span>Tip: Press [1] for Yes, [2] for No</span>
              <span>[Esc] to Skip</span>
            </div>
          </>
        )}

        {/* STAGE: RESPONDING_YES (Returning Visitor) */}
        {stage === 'RESPONDING_YES' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#DCE3DD] border border-[#191B1E]/20 text-[11px] font-mono text-[#191B1E]">
              <Sparkles className="w-3 h-3 text-[#D36B4D]" />
              <span>RETURNING VISITOR WELCOME</span>
            </div>
            <p className="font-space text-lg sm:text-xl font-bold tracking-tight text-[#191B1E] leading-snug">
              &ldquo;Welcome back! I&apos;ll be right here in the corner. If you need anything about our
              services, projects or company, just click on me.&rdquo;
            </p>
            <p className="font-mono text-xs text-[#6B6C67]">
              Transitioning Keba to bottom-right companion dock...
            </p>
          </div>
        )}

        {/* STAGE: RESPONDING_NO (First-Time Visitor) */}
        {stage === 'RESPONDING_NO' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D36B4D]/15 border border-[#D36B4D]/30 text-[11px] font-mono text-[#D36B4D]">
              <Sparkles className="w-3 h-3 text-[#D36B4D]" />
              <span>FIRST-TIME VISITOR ORIENTATION</span>
            </div>
            <p className="font-space text-lg sm:text-xl font-bold tracking-tight text-[#191B1E] leading-snug">
              &ldquo;Oh, welcome! Let me show you around. Come on!&rdquo;
            </p>
            <p className="font-mono text-xs text-[#6B6C67]">
              Starting guided website tour...
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
