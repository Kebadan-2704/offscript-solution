/**
 * KEBA AI — Torn Paper Overlay View
 * 
 * Top-level container managing the procedural torn-paper canvas,
 * responsive positioning in the top-right corner, and graceful fade-out.
 */

'use client';

import { TornPaperCanvas } from './TornPaperCanvas';

interface TornPaperOverlayProps {
  progress: number; // 0.0 to 1.0
  opacity: number;  // 0.0 to 1.0
  className?: string;
}

export function TornPaperOverlay({
  progress,
  opacity,
  className = '',
}: TornPaperOverlayProps) {
  if (opacity <= 0.01) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[46] transition-opacity duration-300 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Full-screen torn paper canvas overlay */}
      <TornPaperCanvas progress={progress} className="w-full h-full" />
    </div>
  );
}

