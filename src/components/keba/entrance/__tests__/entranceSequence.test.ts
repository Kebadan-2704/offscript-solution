import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useKebaStore } from '../../state/kebaStore';
import { EntranceTimeline } from '../EntranceTimeline';

describe('KEBA AI — Milestone 2 Entrance Timeline & Logic', () => {
  beforeEach(() => {
    useKebaStore.getState().resetEntranceState();
  });

  it('initializes entrance state to IDLE and ENTRANCE overlay mode', () => {
    const state = useKebaStore.getState();
    expect(state.entranceStage).toBe('IDLE');
    expect(state.overlayMode).toBe('ENTRANCE');
    expect(state.hasVisitedBefore).toBeNull();
  });

  it('updates character coordinates and stages when EntranceTimeline plays', () => {
    const timeline = new EntranceTimeline();
    const onStageChange = vi.fn();
    const onPaperProgress = vi.fn();

    timeline.play({
      onStageChange,
      onPaperProgress,
    });

    const state = useKebaStore.getState();
    expect(state.entranceStage).toBe('TEARING');
    expect(state.characterState).toBe('WALKING');
    expect(state.characterPosition[0]).toBeCloseTo(1.1);
    expect(onStageChange).toHaveBeenCalledWith('TEARING');

    timeline.kill();
  });

  it('fast-forwards coordinates to steady state upon skip', () => {
    const timeline = new EntranceTimeline();
    timeline.skip();

    const state = useKebaStore.getState();
    expect(state.entranceStage).toBe('QUESTION');
    expect(state.characterState).toBe('GREETING');
    expect(state.characterPosition[0]).toBeCloseTo(0.45);
    expect(state.characterPosition[1]).toBeCloseTo(-0.05);
    expect(state.characterScale).toBeCloseTo(0.95);
  });

  it('updates visitor choice for YES and transitions to RESPONDING_YES', () => {
    useKebaStore.getState().setHasVisitedBefore(true);
    useKebaStore.getState().setEntranceStage('RESPONDING_YES');

    const state = useKebaStore.getState();
    expect(state.hasVisitedBefore).toBe(true);
    expect(state.entranceStage).toBe('RESPONDING_YES');
  });

  it('updates visitor choice for NO and transitions to RESPONDING_NO', () => {
    useKebaStore.getState().setHasVisitedBefore(false);
    useKebaStore.getState().setEntranceStage('RESPONDING_NO');

    const state = useKebaStore.getState();
    expect(state.hasVisitedBefore).toBe(false);
    expect(state.entranceStage).toBe('RESPONDING_NO');
  });
});
