/**
 * KEBA AI — Guided Tour Controller Hook
 * 
 * Orchestrates step progression across the 5 verified sections, coordinates Lenis smooth
 * scrolling, guards against rapid double-clicks, and manages tour completion and skipping.
 * Fully decoupled from 3D canvas/Three.js rendering.
 */

'use client';

import { useRef, useCallback } from 'react';
import { useKebaStore } from '../state/kebaStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TOUR_STOPS } from '../../../lib/keba/tourManifest';
import { scrollToSection } from '../../../lib/keba/scrollController';

export function useTourController() {
  const prefersReduced = useReducedMotion();
  const isNavigatingRef = useRef(false);

  const currentTourStep = useKebaStore((s) => s.currentTourStep);
  const setCurrentTourStep = useKebaStore((s) => s.setCurrentTourStep);
  const tourStage = useKebaStore((s) => s.tourStage);
  const setTourStage = useKebaStore((s) => s.setTourStage);
  const setOverlayMode = useKebaStore((s) => s.setOverlayMode);

  const currentStop = TOUR_STOPS[currentTourStep] ?? TOUR_STOPS[0]!;

  // 1. Complete Tour Action
  const completeTour = useCallback(() => {
    isNavigatingRef.current = true;
    setTourStage('TOUR_COMPLETED');

    setTimeout(() => {
      setTourStage('INACTIVE');
      setOverlayMode('DOCKED');
      isNavigatingRef.current = false;
    }, 1800);
  }, [setOverlayMode, setTourStage]);

  // 2. Navigate to a Specific Step
  const goToStep = useCallback(
    async (stepIndex: number) => {
      if (isNavigatingRef.current) return;
      if (stepIndex < 0 || stepIndex >= TOUR_STOPS.length) return;

      const targetStop = TOUR_STOPS[stepIndex];
      if (!targetStop) return;

      isNavigatingRef.current = true;
      setCurrentTourStep(stepIndex);
      setTourStage('TOUR_MOVING');

      // Synchronize scroll navigation with Lenis / native
      await scrollToSection(targetStop.selector, {
        offset: -96,
        duration: 1.0,
        reducedMotion: prefersReduced,
      });

      // Arrival at section: transition to explaining
      setTourStage('TOUR_POINTING');

      setTimeout(() => {
        setTourStage('TOUR_EXPLAINING');
        isNavigatingRef.current = false;
      }, 350);
    },
    [prefersReduced, setCurrentTourStep, setTourStage]
  );

  // 3. Next Step Action
  const nextStep = useCallback(() => {
    if (currentTourStep < TOUR_STOPS.length - 1) {
      goToStep(currentTourStep + 1);
    } else {
      completeTour();
    }
  }, [currentTourStep, goToStep, completeTour]);

  // 4. Previous Step Action
  const prevStep = useCallback(() => {
    if (currentTourStep > 0) {
      goToStep(currentTourStep - 1);
    }
  }, [currentTourStep, goToStep]);

  // 5. Skip Tour Action
  const skipTour = useCallback(() => {
    isNavigatingRef.current = false;
    setTourStage('INACTIVE');
    setOverlayMode('DOCKED');
  }, [setOverlayMode, setTourStage]);

  // 6. Start Tour
  const startTour = useCallback(() => {
    setOverlayMode('TOUR');
    setCurrentTourStep(0);
    goToStep(0);
  }, [goToStep, setCurrentTourStep, setOverlayMode]);

  return {
    currentStop,
    totalStops: TOUR_STOPS.length,
    tourStage,
    isTourActive: tourStage !== 'INACTIVE',
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
  };
}
