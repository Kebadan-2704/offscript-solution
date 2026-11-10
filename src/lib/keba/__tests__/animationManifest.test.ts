import { describe, it, expect } from 'vitest';
import {
  KEBA_MODEL_CONFIG,
  STATE_ANIMATION_MAPPINGS,
  resolveClipForState,
} from '../animationManifest';
import type { CharacterState } from '@/components/keba/state/kebaTypes';

describe('KEBA AI — Animation Manifest & Resolver', () => {
  const mockAvailableClips = ['idle', 'walk', 'agree', 'headShake', 'run'];

  it('provides a valid model configuration with expected asset path', () => {
    expect(KEBA_MODEL_CONFIG.assetUrl).toBe('/models/keba-dev.glb');
    expect(KEBA_MODEL_CONFIG.armatureJointCount).toBe(67);
    expect(KEBA_MODEL_CONFIG.license).toContain('MIT');
  });

  it('maps IDLE state to idle clip when available', () => {
    const result = resolveClipForState('IDLE', mockAvailableClips);
    expect(result.clipName).toBe('idle');
    expect(result.isFallback).toBe(false);
  });

  it('maps WALKING state to walk clip when available', () => {
    const result = resolveClipForState('WALKING', mockAvailableClips);
    expect(result.clipName).toBe('walk');
    expect(result.isFallback).toBe(false);
  });

  it('maps GREETING state to agree clip when available', () => {
    const result = resolveClipForState('GREETING', mockAvailableClips);
    expect(result.clipName).toBe('agree');
    expect(result.isFallback).toBe(false);
  });

  it('maps POINTING to fallback clip when pointing is not in available clips', () => {
    const result = resolveClipForState('POINTING', mockAvailableClips);
    expect(result.isFallback).toBe(true);
    expect(result.clipName).toBe('agree'); // Fallback for pointing in manifest
  });

  it('handles empty available clips array gracefully', () => {
    const result = resolveClipForState('IDLE', []);
    expect(result.clipName).toBeNull();
    expect(result.isFallback).toBe(true);
  });

  it('contains mapping configurations for all 7 required character states', () => {
    const requiredStates: CharacterState[] = [
      'IDLE',
      'GREETING',
      'WALKING',
      'POINTING',
      'THINKING',
      'TALKING',
      'HAPPY',
    ];

    for (const state of requiredStates) {
      expect(STATE_ANIMATION_MAPPINGS[state]).toBeDefined();
      expect(STATE_ANIMATION_MAPPINGS[state].fadeInDuration).toBeGreaterThan(0);
      expect(STATE_ANIMATION_MAPPINGS[state].timeScale).toBeGreaterThan(0);
    }
  });
});

