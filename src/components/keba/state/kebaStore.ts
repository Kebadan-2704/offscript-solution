/**
 * KEBA AI — Character State Store (Zustand 5)
 * 
 * Provides reactive character state management decoupled from the 60fps Three.js render loop.
 * Coordinates entrance stages, tour stages, 3D character transforms, visitor interaction, and overlays.
 */

import { create } from 'zustand';
import type {
  CharacterState,
  EntranceStage,
  KebaStoreState,
  OverlayMode,
  TourStage,
} from './kebaTypes';

export const useKebaStore = create<KebaStoreState>((set) => ({
  // Initial Lifecycle (Decoupled from 3D canvas)
  characterState: 'IDLE',
  overlayMode: 'DOCKED',
  entranceStage: 'DOCKED',
  tourStage: 'INACTIVE',
  currentTourStep: 0,
  isLoading: false,
  loadProgress: 100,
  loadError: null,
  isWebGLAvailable: false,

  // Animation Tracking
  activeClipName: null,
  availableClips: [],
  missingClips: [],
  isTransitioning: false,

  // 3D Character Transform Coordinates (Default centered resting position)
  characterPosition: [0, -1.0, 0],
  characterScale: 1.0,
  characterRotationY: 0,

  // Procedural Settings
  cursorTrackingEnabled: true,
  breathingEnabled: true,
  reducedMotionActive: false,

  // Visitor Interaction
  hasVisitedBefore: null,
  entrancePlayedThisSession: false,
  isChatOpen: false,

  // Actions
  openChat: () =>
    set({
      isChatOpen: true,
      overlayMode: 'CHAT',
      characterState: 'GREETING',
    }),
  closeChat: () =>
    set({
      isChatOpen: false,
      overlayMode: 'DOCKED',
      characterState: 'IDLE',
    }),
  toggleChat: () =>
    set((state) => ({
      isChatOpen: !state.isChatOpen,
      overlayMode: !state.isChatOpen ? 'CHAT' : 'DOCKED',
      characterState: !state.isChatOpen ? 'GREETING' : 'IDLE',
    })),
  setCharacterState: (characterState: CharacterState) => set({ characterState }),
  setOverlayMode: (overlayMode: OverlayMode) => set({ overlayMode }),
  setEntranceStage: (entranceStage: EntranceStage) => set({ entranceStage }),
  setTourStage: (tourStage: TourStage) => set({ tourStage }),
  setCurrentTourStep: (currentTourStep: number) => set({ currentTourStep }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setLoadProgress: (loadProgress: number) => set({ loadProgress }),
  setLoadError: (loadError: string | null) => set({ loadError }),
  setWebGLAvailable: (isWebGLAvailable: boolean) => set({ isWebGLAvailable }),
  setActiveClipName: (activeClipName: string | null) => set({ activeClipName }),
  setAvailableClips: (availableClips: string[]) => set({ availableClips }),
  setMissingClips: (missingClips: string[]) => set({ missingClips }),
  setIsTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
  setCharacterPosition: (characterPosition: [number, number, number]) => set({ characterPosition }),
  setCharacterScale: (characterScale: number) => set({ characterScale }),
  setCharacterRotationY: (characterRotationY: number) => set({ characterRotationY }),
  setCursorTrackingEnabled: (cursorTrackingEnabled: boolean) => set({ cursorTrackingEnabled }),
  setBreathingEnabled: (breathingEnabled: boolean) => set({ breathingEnabled }),
  setReducedMotionActive: (reducedMotionActive: boolean) => set({ reducedMotionActive }),
  setHasVisitedBefore: (hasVisitedBefore: boolean | null) => set({ hasVisitedBefore }),
  setEntrancePlayedThisSession: (entrancePlayedThisSession: boolean) => set({ entrancePlayedThisSession }),
  resetEntranceState: () =>
    set({
      characterState: 'IDLE',
      overlayMode: 'ENTRANCE',
      entranceStage: 'IDLE',
      tourStage: 'INACTIVE',
      currentTourStep: 0,
      characterPosition: [0, -1.0, 0],
      characterScale: 1.0,
      characterRotationY: 0,
      hasVisitedBefore: null,
      entrancePlayedThisSession: false,
    }),
}));
