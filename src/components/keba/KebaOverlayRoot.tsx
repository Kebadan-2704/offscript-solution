/**
 * KEBA AI — Master Client Overlay Root
 * 
 * Mounted in RootLayout (src/app/layout.tsx).
 * Coordinates:
 * 1. Guided tour spotlight on active section (z-[44]).
 * 2. Dedicated tour HUD with step navigation (z-[48]).
 * 3. Docked bottom-right companion avatar (z-[48]).
 * 4. Interactive AI Chat Drawer (z-[49]).
 * 
 * Strict non-blocking pointer events (100% website link click-through).
 * Zero 3D canvas or WebGL overhead.
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useKebaStore } from './state/kebaStore';
import { KebaDockedAvatar } from './dock/KebaDockedAvatar';
import { useTourController } from './tour/useTourController';
import { TourSpotlight } from './tour/TourSpotlight';
import { TourHud } from './tour/TourHud';
import { KebaChatDrawer } from './chat/KebaChatDrawer';

export function KebaOverlayRoot() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const overlayMode = useKebaStore((s) => s.overlayMode);

  // Tour controller hook
  const {
    currentStop,
    totalStops,
    tourStage,
    isTourActive,
    nextStep,
    prevStep,
    skipTour,
  } = useTourController();

  // Automatically dismiss tour when user navigates to inner pages
  useEffect(() => {
    if (!isHomePage && isTourActive) {
      skipTour();
    }
  }, [isHomePage, isTourActive, skipTour]);

  // If overlay is explicitly disabled
  if (overlayMode === 'DISABLED') {
    return null;
  }

  return (
    <aside
      aria-label="KEBA AI Interactive Virtual Representative"
      className="fixed inset-0 pointer-events-none z-[45]"
    >
      {/* 1. Active Section Spotlight Highlight - Home page only */}
      {isHomePage && (
        <TourSpotlight
          targetSelector={currentStop.selector}
          active={isTourActive && tourStage !== 'TOUR_MOVING'}
          stepLabel={currentStop.stepLabel}
          sectionTitle={currentStop.sectionTitle}
        />
      )}

      {/* 2. Guided Tour Navigation HUD - Home page only */}
      {isHomePage && isTourActive && (
        <TourHud
          currentStop={currentStop}
          totalStops={totalStops}
          tourStage={tourStage}
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipTour}
        />
      )}

      {/* 3. Docked Companion Avatar (Bottom-Right) - Globally accessible across all pages */}
      <KebaDockedAvatar />

      {/* 4. Interactive AI Chat Drawer - Globally accessible */}
      <KebaChatDrawer />
    </aside>
  );
}
