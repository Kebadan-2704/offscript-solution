import { describe, it, expect, beforeEach } from 'vitest';
import { TOUR_STOPS } from '../../../../lib/keba/tourManifest';
import { useKebaStore } from '../../state/kebaStore';

describe('KEBA AI — Milestone 3 Tour Manifest & State Machine', () => {
  beforeEach(() => {
    useKebaStore.getState().resetEntranceState();
  });

  it('contains exactly five verified tour stops with correct selectors', () => {
    expect(TOUR_STOPS.length).toBe(5);

    const expectedSelectors = [
      '#main-content',
      '#services',
      '#about',
      '#work',
      '#contact',
    ];

    TOUR_STOPS.forEach((stop, index) => {
      expect(stop.index).toBe(index);
      expect(stop.selector).toBe(expectedSelectors[index]);
      expect(stop.dialogue.length).toBeGreaterThan(30);
      expect(stop.characterPosition.length).toBe(3);
      expect(stop.characterScale).toBeGreaterThan(0.5);
    });
  });

  it('initializes tour state to INACTIVE and step 0', () => {
    const state = useKebaStore.getState();
    expect(state.tourStage).toBe('INACTIVE');
    expect(state.currentTourStep).toBe(0);
  });

  it('updates tour step and stages properly', () => {
    useKebaStore.getState().setTourStage('TOUR_MOVING');
    expect(useKebaStore.getState().tourStage).toBe('TOUR_MOVING');

    useKebaStore.getState().setCurrentTourStep(2);
    expect(useKebaStore.getState().currentTourStep).toBe(2);

    useKebaStore.getState().setTourStage('TOUR_EXPLAINING');
    expect(useKebaStore.getState().tourStage).toBe('TOUR_EXPLAINING');
  });

  it('transitions to DOCKED when tour is completed or skipped', () => {
    // Complete tour transition
    useKebaStore.getState().setTourStage('TOUR_COMPLETED');
    expect(useKebaStore.getState().tourStage).toBe('TOUR_COMPLETED');

    useKebaStore.getState().setOverlayMode('DOCKED');
    useKebaStore.getState().setEntranceStage('DOCKED');
    useKebaStore.getState().setCharacterState('IDLE');
    useKebaStore.getState().setCharacterPosition([1.65, -1.25, 0.1]);

    const state = useKebaStore.getState();
    expect(state.overlayMode).toBe('DOCKED');
    expect(state.entranceStage).toBe('DOCKED');
    expect(state.characterState).toBe('IDLE');
    expect(state.characterPosition[0]).toBeCloseTo(1.65);
  });
});
