/**
 * KEBA AI — Scene View Component
 * 
 * Embeds the WebGL canvas, handles loading UI states, manages mouse/touch events,
 * and renders a graceful 2D fallback when WebGL is unavailable.
 */

'use client';

import { useRef } from 'react';
import { useKebaStore } from '../state/kebaStore';
import { useKebaScene } from './useKebaScene';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface KebaSceneViewProps {
  className?: string;
  interactive?: boolean;
}

export function KebaSceneView({
  className = '',
  interactive = true,
}: KebaSceneViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Zustand state subscriptions
  const isLoading = useKebaStore((s) => s.isLoading);
  const loadProgress = useKebaStore((s) => s.loadProgress);
  const loadError = useKebaStore((s) => s.loadError);
  const isWebGLAvailable = useKebaStore((s) => s.isWebGLAvailable);
  const activeClipName = useKebaStore((s) => s.activeClipName);
  const characterState = useKebaStore((s) => s.characterState);

  // Initialize Three.js scene hook
  useKebaScene(canvasRef, { interactive });

  // 1. Graceful Fallback if WebGL is completely unsupported on client
  // Return null so the website remains 100% visible and uncluttered; KebaDockedAvatar handles 2D representation
  if (!isWebGLAvailable) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ touchAction: interactive ? 'none' : 'auto' }}
    >
      {/* 2. WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block outline-hidden"
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        aria-label="Interactive 3D Virtual Representative Keba"
        role="img"
      />

      {/* 3. Loading Overlay */}
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F3ED]/80 backdrop-blur-xs transition-opacity duration-300 z-10"
          role="status"
          aria-live="polite"
        >
          <div className="relative w-12 h-12 mb-4 animate-spin text-[#D36B4D]">
            <RefreshCw className="w-full h-full stroke-[1.5]" />
          </div>
          <div className="font-mono text-xs text-[#191B1E] uppercase tracking-widest font-medium">
            INITIALIZING 3D · {loadProgress}%
          </div>
          <div className="w-36 h-1 bg-[#E6E2D9] mt-3 overflow-hidden">
            <div
              className="h-full bg-[#D36B4D] transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 4. Error Display (if asset failed to load) */}
      {loadError && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-red-900/90 text-white border border-red-500 font-mono text-xs z-20">
          <div className="font-bold flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-300" />
            <span>3D Engine Notice:</span>
          </div>
          <p>{loadError}</p>
        </div>
      )}

      {/* 5. Subtle Technical Metadata Pill (Dev/Testing only when NEXT_PUBLIC_DEBUG_MASCOT is enabled) */}
      {process.env.NEXT_PUBLIC_DEBUG_MASCOT === 'true' && !isLoading && (
        <div className="absolute bottom-3 left-3 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#191B1E]/80 backdrop-blur-md border border-[#F5F3ED]/15 text-[11px] font-mono text-[#F5F3ED]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATE: {characterState}</span>
          <span className="text-[#92938D]">|</span>
          <span>CLIP: {activeClipName || 'NONE'}</span>
        </div>
      )}
    </div>
  );
}

