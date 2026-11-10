/**
 * KEBA AI — Character Engine TypeScript Type Definitions
 * Strict typings for character states, animations, entrance stages, tour stages, and WebGL lifecycle.
 */

export type CharacterState =
  | 'IDLE'
  | 'GREETING'
  | 'WALKING'
  | 'POINTING'
  | 'THINKING'
  | 'TALKING'
  | 'HAPPY';

export type OverlayMode =
  | 'DISABLED'
  | 'SANDBOX'
  | 'ENTRANCE'
  | 'DOCKED'
  | 'TOUR'
  | 'CHAT';

export type EntranceStage =
  | 'IDLE'
  | 'WAITING_LOADER'
  | 'TEARING'
  | 'EMERGING'
  | 'GREETING'
  | 'QUESTION'
  | 'RESPONDING_YES'
  | 'RESPONDING_NO'
  | 'DOCKING'
  | 'DOCKED'
  | 'SKIPPED';

export type TourStage =
  | 'INACTIVE'
  | 'TOUR_INTRO'
  | 'TOUR_MOVING'
  | 'TOUR_POINTING'
  | 'TOUR_EXPLAINING'
  | 'TOUR_COMPLETED'
  | 'TOUR_SKIPPED';

export interface AnimationClipMapping {
  clipName: string | null;
  loop: boolean;
  timeScale: number;
  fadeInDuration: number;
  description: string;
}

export interface KebaStoreState {
  // Character Lifecycle
  characterState: CharacterState;
  overlayMode: OverlayMode;
  entranceStage: EntranceStage;
  tourStage: TourStage;
  currentTourStep: number; // 0 to 4
  isLoading: boolean;
  loadProgress: number; // 0 - 100
  loadError: string | null;
  isWebGLAvailable: boolean;

  // Active Animation Metadata
  activeClipName: string | null;
  availableClips: string[];
  missingClips: string[];
  isTransitioning: boolean;

  // 3D Character Transform Coordinates (Animated via GSAP / Render loop)
  characterPosition: [number, number, number];
  characterScale: number;
  characterRotationY: number;

  // Procedural Settings
  cursorTrackingEnabled: boolean;
  breathingEnabled: boolean;
  reducedMotionActive: boolean;

  // Visitor Interaction
  hasVisitedBefore: boolean | null;
  entrancePlayedThisSession: boolean;
  isChatOpen: boolean;

  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  setCharacterState: (state: CharacterState) => void;
  setOverlayMode: (mode: OverlayMode) => void;
  setEntranceStage: (stage: EntranceStage) => void;
  setTourStage: (stage: TourStage) => void;
  setCurrentTourStep: (step: number) => void;
  setIsLoading: (loading: boolean) => void;
  setLoadProgress: (progress: number) => void;
  setLoadError: (error: string | null) => void;
  setWebGLAvailable: (available: boolean) => void;
  setActiveClipName: (clipName: string | null) => void;
  setAvailableClips: (clips: string[]) => void;
  setMissingClips: (clips: string[]) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setCharacterPosition: (pos: [number, number, number]) => void;
  setCharacterScale: (scale: number) => void;
  setCharacterRotationY: (rotY: number) => void;
  setCursorTrackingEnabled: (enabled: boolean) => void;
  setBreathingEnabled: (enabled: boolean) => void;
  setReducedMotionActive: (active: boolean) => void;
  setHasVisitedBefore: (visited: boolean | null) => void;
  setEntrancePlayedThisSession: (played: boolean) => void;
  resetEntranceState: () => void;
}
