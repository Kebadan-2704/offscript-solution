/**
 * KEBA AI — Entrance Sequence Orchestration Hook
 * 
 * Manages:
 * 1. Fresh document load detection vs. internal client navigation.
 * 2. Synchronization with the brand <Loader /> exit.
 * 3. GSAP entrance timeline execution.
 * 4. YES / NO decision branching and transitions to docked or tour states.
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useKebaStore } from '../state/kebaStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EntranceTimeline } from './EntranceTimeline';

// Module-scoped flag persisting across Next.js client-side route transitions,
// but automatically reset to false on any fresh page load or browser refresh.
let entrancePlayedForCurrentDocument = false;

export function useEntranceSequence() {
  const prefersReduced = useReducedMotion();

  const [paperProgress, setPaperProgress] = useState(0);
  const [paperOpacity, setPaperOpacity] = useState(1);

  const entranceTimelineRef = useRef<EntranceTimeline | null>(null);

  const entranceStage = useKebaStore((s) => s.entranceStage);
  const setEntranceStage = useKebaStore((s) => s.setEntranceStage);
  const setCharacterState = useKebaStore((s) => s.setCharacterState);
  const setCharacterPosition = useKebaStore((s) => s.setCharacterPosition);
  const setCharacterScale = useKebaStore((s) => s.setCharacterScale);
  const setCharacterRotationY = useKebaStore((s) => s.setCharacterRotationY);
  const setHasVisitedBefore = useKebaStore((s) => s.setHasVisitedBefore);
  const setEntrancePlayedThisSession = useKebaStore((s) => s.setEntrancePlayedThisSession);
  const setOverlayMode = useKebaStore((s) => s.setOverlayMode);
  const setTourStage = useKebaStore((s) => s.setTourStage);

  // 1. Skip Introduction Action
  const skipEntrance = useCallback(() => {
    entrancePlayedForCurrentDocument = true;
    setEntrancePlayedThisSession(true);
    try {
      localStorage.setItem('keba_visited', 'true');
    } catch {}

    if (entranceTimelineRef.current) {
      entranceTimelineRef.current.kill();
    }

    setPaperProgress(0);
    setPaperOpacity(0);

    // Fast-dock character in bottom-right corner
    setCharacterPosition([1.65, -1.25, 0]);
    setCharacterScale(0.38);
    setCharacterRotationY(0);
    setCharacterState('IDLE');
    setEntranceStage('DOCKED');
  }, [
    setCharacterPosition,
    setCharacterRotationY,
    setCharacterScale,
    setCharacterState,
    setEntrancePlayedThisSession,
    setEntranceStage,
  ]);

  // 2. Handle User Decision: YES (Returning Visitor)
  const handleSelectYes = useCallback(() => {
    setHasVisitedBefore(true);
    try {
      localStorage.setItem('keba_visited', 'true');
    } catch {}
    setEntranceStage('RESPONDING_YES');

    // Display welcome-back acknowledgement
    setCharacterState('GREETING');

    // Animate Keba walking toward the bottom-right dock
    setTimeout(() => {
      setCharacterState('WALKING');

      const store = useKebaStore.getState();
      const currentPos = store.characterPosition;
      const currentScale = store.characterScale;

      const dockAnim = {
        x: currentPos[0],
        y: currentPos[1],
        z: currentPos[2],
        scale: currentScale,
        rotY: 0,
      };

      gsap.to(dockAnim, {
        x: 1.65,
        y: -1.25,
        z: 0.1,
        scale: 0.38,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCharacterPosition([dockAnim.x, dockAnim.y, dockAnim.z]);
          setCharacterScale(dockAnim.scale);
          setCharacterRotationY(dockAnim.rotY);
        },
        onComplete: () => {
          setCharacterState('IDLE');
          setEntranceStage('DOCKED');
        },
      });
    }, 1400);
  }, [
    setCharacterPosition,
    setCharacterRotationY,
    setCharacterScale,
    setCharacterState,
    setEntranceStage,
    setHasVisitedBefore,
  ]);

  // 3. Handle User Decision: NO (First-Time Visitor)
  const handleSelectNo = useCallback(() => {
    setHasVisitedBefore(false);
    try {
      localStorage.setItem('keba_visited', 'true');
    } catch {}
    setEntranceStage('RESPONDING_NO');

    // Friendly enthusiastic acknowledgment
    setCharacterState('HAPPY');

    // After brief announcement, launch tour sequence
    setTimeout(() => {
      setOverlayMode('TOUR');
      setTourStage('TOUR_INTRO');
    }, 1800);
  }, [
    setCharacterState,
    setEntranceStage,
    setHasVisitedBefore,
    setOverlayMode,
    setTourStage,
  ]);

  // 4. Main Sequence Initialization & Synchronization
  useEffect(() => {
    // If entrance already completed on this document lifecycle (e.g. client route change),
    // stay docked or in current state without replaying the dramatic entrance
    if (entrancePlayedForCurrentDocument) {
      return;
    }

    entrancePlayedForCurrentDocument = true;
    setEntrancePlayedThisSession(true);

    // Only play the entrance sequence on the homepage ('/')
    const isHome = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');
    if (!isHome) {
      requestAnimationFrame(() => {
        setPaperProgress(0);
        setPaperOpacity(0);
        setCharacterPosition([1.65, -1.25, 0]);
        setCharacterScale(0.38);
        setCharacterRotationY(0);
        setCharacterState('IDLE');
        setEntranceStage('DOCKED');
        setOverlayMode('DOCKED');
      });
      return;
    }

    // If reduced motion is requested by user, bypass dramatic paper tear
    // but display the static Keba introduction and preserve YES/NO interaction
    const alreadyVisited = typeof window !== 'undefined' && localStorage.getItem('keba_visited') === 'true';

    if (prefersReduced) {
      setTimeout(() => {
        setPaperProgress(0);
        setPaperOpacity(0);
        if (alreadyVisited) {
          setCharacterPosition([1.65, -1.25, 0]);
          setCharacterScale(0.38);
          setCharacterRotationY(0);
          setCharacterState('IDLE');
          setEntranceStage('DOCKED');
        } else {
          setCharacterPosition([0.45, -0.05, 0.4]);
          setCharacterScale(0.95);
          setCharacterRotationY(0);
          setCharacterState('GREETING');
          setEntranceStage('QUESTION');
        }
      }, 0);
      return;
    }

    setEntranceStage('WAITING_LOADER');

    let promptScrollCleanup: (() => void) | null = null;
    let promptTimerId: ReturnType<typeof setTimeout> | null = null;

    // Function to launch entrance once existing brand <Loader /> has departed
    const launchEntranceWhenReady = () => {
      // Check if existing Loader element is still present in DOM
      const loaderEl = document.getElementById('brand-loader');
      if (loaderEl) {
        // Wait for loader exit animation (Loader runs up to 800ms)
        const checkTimer = setTimeout(launchEntranceWhenReady, 100);
        return () => clearTimeout(checkTimer);
      }

      // Small buffer after loader leaves to ensure smooth 60fps frame rate
      const startTimer = setTimeout(() => {
        const timeline = new EntranceTimeline();
        entranceTimelineRef.current = timeline;

        timeline.play({
          onPaperProgress: (prog) => setPaperProgress(prog),
          onPaperOpacity: (opac) => setPaperOpacity(opac),
          onStageChange: (stage) => {
            if (stage === 'QUESTION') {
              if (alreadyVisited) {
                // Returning visitor who previously answered: skip prompt and dock smoothly
                setCharacterState('GREETING');
                setTimeout(() => {
                  setCharacterState('WALKING');
                  const store = useKebaStore.getState();
                  const dockAnim = {
                    x: store.characterPosition[0],
                    y: store.characterPosition[1],
                    z: store.characterPosition[2],
                    scale: store.characterScale,
                    rotY: 0,
                  };
                  gsap.to(dockAnim, {
                    x: 1.65,
                    y: -1.25,
                    z: 0.1,
                    scale: 0.38,
                    duration: 1.6,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                      setCharacterPosition([dockAnim.x, dockAnim.y, dockAnim.z]);
                      setCharacterScale(dockAnim.scale);
                      setCharacterRotationY(dockAnim.rotY);
                    },
                    onComplete: () => {
                      setCharacterState('IDLE');
                      setEntranceStage('DOCKED');
                    },
                  });
                }, 1200);
                return;
              }

              // First-time visitor: delay prompt until 8s or scroll
              let triggered = false;
              const triggerQuestion = () => {
                if (triggered) return;
                triggered = true;
                if (promptScrollCleanup) promptScrollCleanup();
                if (promptTimerId) clearTimeout(promptTimerId);
                setEntranceStage('QUESTION');
              };

              const handleScroll = () => {
                if (window.scrollY > 40) {
                  triggerQuestion();
                }
              };

              promptTimerId = setTimeout(triggerQuestion, 8000);
              window.addEventListener('scroll', handleScroll, { passive: true });
              promptScrollCleanup = () => window.removeEventListener('scroll', handleScroll);
              return;
            }

            setEntranceStage(stage as never);
          },
        });
      }, 150);

      return () => clearTimeout(startTimer);
    };

    const cleanup = launchEntranceWhenReady();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipEntrance();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (cleanup) cleanup();
      if (promptScrollCleanup) promptScrollCleanup();
      if (promptTimerId) clearTimeout(promptTimerId);
      window.removeEventListener('keydown', handleKeyDown);
      if (entranceTimelineRef.current) {
        entranceTimelineRef.current.kill();
      }
    };
  }, [
    prefersReduced,
    setCharacterPosition,
    setCharacterRotationY,
    setCharacterScale,
    setCharacterState,
    setEntrancePlayedThisSession,
    setEntranceStage,
    setOverlayMode,
    skipEntrance,
  ]);

  return {
    paperProgress,
    paperOpacity,
    entranceStage,
    handleSelectYes,
    handleSelectNo,
    skipEntrance,
  };
}
