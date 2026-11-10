import { describe, it, expect, beforeEach } from 'vitest';
import { useKebaStore } from '../../state/kebaStore';

describe('KEBA AI — Chat Store & State Synchronizer', () => {
  beforeEach(() => {
    useKebaStore.getState().resetEntranceState();
    useKebaStore.getState().closeChat();
  });

  it('initializes with chat closed', () => {
    expect(useKebaStore.getState().isChatOpen).toBe(false);
  });

  it('transitions properly on openChat()', () => {
    useKebaStore.getState().openChat();
    const state = useKebaStore.getState();
    expect(state.isChatOpen).toBe(true);
    expect(state.overlayMode).toBe('CHAT');
    expect(state.characterState).toBe('GREETING');
  });

  it('transitions properly on closeChat()', () => {
    useKebaStore.getState().openChat();
    useKebaStore.getState().closeChat();
    const state = useKebaStore.getState();
    expect(state.isChatOpen).toBe(false);
    expect(state.overlayMode).toBe('DOCKED');
    expect(state.characterState).toBe('IDLE');
  });

  it('toggles chat state accurately with toggleChat()', () => {
    expect(useKebaStore.getState().isChatOpen).toBe(false);
    useKebaStore.getState().toggleChat();
    expect(useKebaStore.getState().isChatOpen).toBe(true);
    useKebaStore.getState().toggleChat();
    expect(useKebaStore.getState().isChatOpen).toBe(false);
  });
});

