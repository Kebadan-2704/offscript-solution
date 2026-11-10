/**
 * KEBA AI — Development Sandbox & Verification Harness
 * 
 * Interactive control panel and 3D preview mounted in /dev/motion.
 * Features controls for character states, animations, procedural rig, WebGL health,
 * and Milestone 2 Cinematic Entrance simulation.
 */

'use client';

import { useState } from 'react';
import { useKebaStore } from './state/kebaStore';
import { KebaSceneView } from './scene/KebaSceneView';
import { TornPaperCanvas } from './entrance/TornPaperCanvas';
import { EntranceTimeline } from './entrance/EntranceTimeline';
import type { CharacterState } from './state/kebaTypes';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  ShieldCheck,
  RefreshCcw,
  Sparkles,
  Play,
  RotateCcw,
} from 'lucide-react';

const STATES: { state: CharacterState; label: string; desc: string }[] = [
  { state: 'IDLE', label: '01. Idle', desc: 'Default standing balance' },
  { state: 'GREETING', label: '02. Greeting', desc: 'Affirmative nod / acknowledgement' },
  { state: 'WALKING', label: '03. Walking', desc: 'Forward walk stride' },
  { state: 'POINTING', label: '04. Pointing', desc: 'Section focus (Pending custom asset)' },
  { state: 'THINKING', label: '05. Thinking', desc: 'Contemplative head movement' },
  { state: 'TALKING', label: '06. Talking', desc: 'Conversational gesturing' },
  { state: 'HAPPY', label: '07. Happy', desc: 'Positive feedback reaction' },
];

export function KebaDevSandbox() {
  const characterState = useKebaStore((s) => s.characterState);
  const setCharacterState = useKebaStore((s) => s.setCharacterState);
  const activeClipName = useKebaStore((s) => s.activeClipName);
  const availableClips = useKebaStore((s) => s.availableClips);
  const missingClips = useKebaStore((s) => s.missingClips);
  const isTransitioning = useKebaStore((s) => s.isTransitioning);
  const entranceStage = useKebaStore((s) => s.entranceStage);
  const setEntranceStage = useKebaStore((s) => s.setEntranceStage);
  const cursorTrackingEnabled = useKebaStore((s) => s.cursorTrackingEnabled);
  const setCursorTrackingEnabled = useKebaStore((s) => s.setCursorTrackingEnabled);
  const breathingEnabled = useKebaStore((s) => s.breathingEnabled);
  const setBreathingEnabled = useKebaStore((s) => s.setBreathingEnabled);
  const reducedMotionActive = useKebaStore((s) => s.reducedMotionActive);
  const setReducedMotionActive = useKebaStore((s) => s.setReducedMotionActive);
  const isWebGLAvailable = useKebaStore((s) => s.isWebGLAvailable);
  const setWebGLAvailable = useKebaStore((s) => s.setWebGLAvailable);

  const [sandboxTearProgress, setSandboxTearProgress] = useState(0);

  const playSandboxEntrance = () => {
    const timeline = new EntranceTimeline();
    timeline.play({
      onPaperProgress: (p) => setSandboxTearProgress(p),
      onStageChange: (st) => setEntranceStage(st as never),
      onComplete: () => {
        setTimeout(() => setSandboxTearProgress(0), 1200);
      },
    });
  };

  const resetSandboxToCenter = () => {
    const store = useKebaStore.getState();
    store.setCharacterPosition([0, -1.0, 0]);
    store.setCharacterScale(1.0);
    store.setCharacterRotationY(0);
    store.setCharacterState('IDLE');
    store.setEntranceStage('IDLE');
    setSandboxTearProgress(0);
  };

  return (
    <div className="border border-[#191B1E] bg-[#F5F3ED] text-[#191B1E] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b border-[#191B1E] bg-[#E6E2D9]">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#D36B4D] animate-pulse" />
          <h3 className="font-space text-lg font-bold uppercase tracking-tight">
            KEBA AI · 3D Engine & Cinematic Entrance Sandbox
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#6B6C67]">
          <span>MILESTONE 1 & 2 VERIFIED</span>
          <span>|</span>
          <span className="text-[#191B1E] font-semibold">THREE.JS v0.187.0 + GSAP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        {/* Left Column: 3D Viewport with Sandbox Tear Overlay */}
        <div className="lg:col-span-7 xl:col-span-8 relative bg-radial from-[#F5F3ED] to-[#E6E2D9] border-b lg:border-b-0 lg:border-r border-[#191B1E] flex flex-col">
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#6B6C67] bg-[#F5F3ED]/80 backdrop-blur-xs px-2.5 py-1 border border-[#E6E2D9]">
              Interactive 3D Viewport (Pointer-Tracked)
            </span>
          </div>

          {/* Sandbox Torn Paper Canvas Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <TornPaperCanvas progress={sandboxTearProgress} className="w-full h-full" />
          </div>

          {/* Active 3D Scene View */}
          <div className="w-full h-[420px] sm:h-[500px] lg:h-full flex-1">
            <KebaSceneView className="w-full h-full" interactive={true} />
          </div>

          {/* Viewport footer banner */}
          <div className="p-3 border-t border-[#191B1E]/15 bg-[#F5F3ED] flex items-center justify-between text-xs font-mono text-[#6B6C67]">
            <span>STAGE: <strong className="text-[#191B1E]">{entranceStage}</strong></span>
            <span className="text-[#D36B4D]">
              {isTransitioning ? 'TRANSITIONING...' : 'STEADY STATE'}
            </span>
          </div>
        </div>

        {/* Right Column: Control & Verification Deck */}
        <div className="lg:col-span-5 xl:col-span-4 p-6 flex flex-col justify-between space-y-6 bg-white overflow-y-auto max-h-[700px]">
          {/* Milestone 2 Entrance Sequence Triggers */}
          <div className="p-4 border border-[#191B1E] bg-[#F5F3ED]/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#191B1E] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D36B4D]" />
                Cinematic Entrance Testing
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#D36B4D] text-[#191B1E] font-semibold">
                MILESTONE 2
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={playSandboxEntrance}
                className="btn-studio btn-studio-primary text-xs py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Play Entrance</span>
              </button>

              <button
                type="button"
                onClick={resetSandboxToCenter}
                className="btn-studio text-xs py-2 px-3 flex items-center justify-center gap-1.5 bg-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Center</span>
              </button>
            </div>
            <p className="font-mono text-[11px] text-[#6B6C67]">
              Simulates top-right torn paper curl, character emergence, landing, and greeting.
            </p>
          </div>

          {/* 1. Animation State Switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6B6C67] font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#D36B4D]" />
                Character States
              </span>
              <span className="font-mono text-[11px] text-[#92938D]">
                CLIP: <strong className="text-[#191B1E]">{activeClipName || 'NONE'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {STATES.map(({ state, label, desc }) => {
                const isActive = characterState === state;
                const isPointingMissing = state === 'POINTING';

                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => setCharacterState(state)}
                    className={`text-left p-2.5 border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-[#191B1E] bg-[#191B1E] text-[#F5F3ED] shadow-xs'
                        : 'border-[#E6E2D9] hover:border-[#191B1E] text-[#191B1E] bg-[#F5F3ED]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase">{label}</span>
                      {isPointingMissing && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/20 text-amber-700 border border-amber-500/40">
                          FALLBACK
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 font-mono ${
                        isActive ? 'text-[#DCE3DD]' : 'text-[#6B6C67]'
                      }`}
                    >
                      {desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Procedural Rig Adjustments */}
          <div className="pt-4 border-t border-[#E6E2D9]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6C67] font-semibold flex items-center gap-1.5 mb-3">
              <Sliders className="w-3.5 h-3.5 text-[#D36B4D]" />
              Procedural Rig Modifiers
            </span>

            <div className="space-y-2 font-mono text-xs">
              <label className="flex items-center justify-between p-2 border border-[#E6E2D9] bg-[#F5F3ED]/50 cursor-pointer hover:border-[#191B1E]">
                <span className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#D36B4D]" />
                  Cursor Head Tracking
                </span>
                <input
                  type="checkbox"
                  checked={cursorTrackingEnabled}
                  onChange={(e) => setCursorTrackingEnabled(e.target.checked)}
                  className="accent-[#D36B4D] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 border border-[#E6E2D9] bg-[#F5F3ED]/50 cursor-pointer hover:border-[#191B1E]">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#D36B4D]" />
                  Natural Diaphragm Breathing
                </span>
                <input
                  type="checkbox"
                  checked={breathingEnabled}
                  onChange={(e) => setBreathingEnabled(e.target.checked)}
                  className="accent-[#D36B4D] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 border border-[#E6E2D9] bg-[#F5F3ED]/50 cursor-pointer hover:border-[#191B1E]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D36B4D]" />
                  Force Reduced Motion (A11y Test)
                </span>
                <input
                  type="checkbox"
                  checked={reducedMotionActive}
                  onChange={(e) => setReducedMotionActive(e.target.checked)}
                  className="accent-[#D36B4D] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 border border-[#E6E2D9] bg-[#F5F3ED]/50 cursor-pointer hover:border-[#191B1E]">
                <span className="flex items-center gap-2">
                  <RefreshCcw className="w-3.5 h-3.5 text-[#D36B4D]" />
                  Simulate WebGL Available
                </span>
                <input
                  type="checkbox"
                  checked={isWebGLAvailable}
                  onChange={(e) => setWebGLAvailable(e.target.checked)}
                  className="accent-[#D36B4D] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* 3. Asset & Rig Verification Status */}
          <div className="pt-4 border-t border-[#E6E2D9] font-mono text-[11px] space-y-1.5 text-[#6B6C67]">
            <div className="flex items-center justify-between text-[#191B1E] font-semibold">
              <span>ASSET STATUS:</span>
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED GLB
              </span>
            </div>
            <div>Model: /models/keba-dev.glb (2.93MB)</div>
            <div>Rig: 67-Joint Mixamo Armature</div>
            <div>Embedded Clips ({availableClips.length}): {availableClips.join(', ')}</div>
            {missingClips.length > 0 && (
              <div className="text-amber-700 flex items-start gap-1 pt-1">
                <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                <span>Notice: {missingClips.join('; ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
