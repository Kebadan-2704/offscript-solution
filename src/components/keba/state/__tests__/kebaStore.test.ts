import { describe, it, expect, beforeEach } from 'vitest';
import { useKebaStore } from '../kebaStore';

describe('KEBA AI — Character State Store (Zustand 5)', () => {
  beforeEach(() => {
    // Reset store to defaults before each test
    useKebaStore.setState({
      characterState: 'IDLE',
      overlayMode: 'SANDBOX',
      isLoading: true,
      loadProgress: 0,
      loadError: null,
      isWebGLAvailable: true,
      activeClipName: null,
      availableClips: [],
      missingClips: [],
      isTransitioning: false,
      cursorTrackingEnabled: true,
      breathingEnabled: true,
      reducedMotionActive: false,
    });
  });

  it('initializes with default values', () => {
    const state = useKebaStore.getState();
    expect(state.characterState).toBe('IDLE');
    expect(state.overlayMode).toBe('SANDBOX');
    expect(state.isLoading).toBe(true);
    expect(state.isWebGLAvailable).toBe(true);
    expect(state.cursorTrackingEnabled).toBe(true);
  });

  it('updates character state properly', () => {
    useKebaStore.getState().setCharacterState('GREETING');
    expect(useKebaStore.getState().characterState).toBe('GREETING');

    useKebaStore.getState().setCharacterState('WALKING');
    expect(useKebaStore.getState().characterState).toBe('WALKING');
  });

  it('updates loading progress and error states', () => {
    useKebaStore.getState().setLoadProgress(65);
    expect(useKebaStore.getState().loadProgress).toBe(65);

    useKebaStore.getState().setLoadError('Asset not found');
    expect(useKebaStore.getState().loadError).toBe('Asset not found');

    useKebaStore.getState().setIsLoading(false);
    expect(useKebaStore.getState().isLoading).toBe(false);
  });

  it('tracks available and missing animation clips', () => {
    useKebaStore.getState().setAvailableClips(['idle', 'walk', 'agree']);
    useKebaStore.getState().setMissingClips(['POINTING']);

    const state = useKebaStore.getState();
    expect(state.availableClips).toEqual(['idle', 'walk', 'agree']);
    expect(state.missingClips).toEqual(['POINTING']);
  });

  it('toggles procedural modifiers and reduced motion', () => {
    useKebaStore.getState().setCursorTrackingEnabled(false);
    expect(useKebaStore.getState().cursorTrackingEnabled).toBe(false);

    useKebaStore.getState().setBreathingEnabled(false);
    expect(useKebaStore.getState().breathingEnabled).toBe(false);

    useKebaStore.getState().setReducedMotionActive(true);
    expect(useKebaStore.getState().reducedMotionActive).toBe(true);
  });
});

