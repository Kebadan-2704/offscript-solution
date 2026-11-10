/**
 * KEBA AI — Character Animation Manifest
 * 
 * Maps logical character states to actual embedded GLTF animation clips.
 * Provides explicit identification of available vs. missing clips for the development model.
 * 
 * ASSET INFORMATION:
 * - Asset Path: /models/keba-dev.glb
 * - Source: Three.js Official Humanoid Example Model (Mixamo standard rig)
 * - License: MIT License / CC0 (mrdoob/three.js repository)
 * - Skeletal Structure: Mixamo Humanoid Armature (67 joints)
 * - Facial Morph Targets: Not embedded in base Xbot mesh geometry (evaluated in Phase 2)
 */

import type { CharacterState, AnimationClipMapping } from '@/components/keba/state/kebaTypes';

export const KEBA_MODEL_CONFIG = {
  assetUrl: '/models/keba-dev.glb',
  name: 'Keba (Dev Mannequin)',
  source: 'Three.js Official Examples (mrdoob/three.js)',
  license: 'MIT / CC0',
  armatureJointCount: 67,
  scale: 1.0,
  position: [0, -1.0, 0] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
} as const;

/**
 * Mapping of logical character states to available GLTF clips.
 * If a state does not have an exact matching clip in the current GLB asset,
 * clipName is set to null, and a fallback clip is specified.
 */
export const STATE_ANIMATION_MAPPINGS: Record<
  CharacterState,
  AnimationClipMapping & { fallbackClip: string }
> = {
  IDLE: {
    clipName: 'idle',
    fallbackClip: 'idle',
    loop: true,
    timeScale: 1.0,
    fadeInDuration: 0.4,
    description: 'Natural upright resting pose with subtle weight shifts.',
  },
  GREETING: {
    clipName: 'agree', // Nodding / affirmative acknowledgement
    fallbackClip: 'idle',
    loop: false,
    timeScale: 1.2,
    fadeInDuration: 0.35,
    description: 'Affirmative greeting motion acknowledging the site visitor.',
  },
  WALKING: {
    clipName: 'walk',
    fallbackClip: 'idle',
    loop: true,
    timeScale: 1.0,
    fadeInDuration: 0.4,
    description: 'Forward stride used during guided tour transitions.',
  },
  POINTING: {
    clipName: null, // MISSING in base placeholder asset keba-dev.glb
    fallbackClip: 'agree',
    loop: false,
    timeScale: 1.0,
    fadeInDuration: 0.35,
    description: 'Gesturing toward website sections (Pending custom Keba asset).',
  },
  THINKING: {
    clipName: 'headShake', // Head movement simulating thought / consideration
    fallbackClip: 'idle',
    loop: false,
    timeScale: 0.8,
    fadeInDuration: 0.4,
    description: 'Contemplative head motion while AI query is processing.',
  },
  TALKING: {
    clipName: 'agree', // Conversational head nodding motion
    fallbackClip: 'idle',
    loop: true,
    timeScale: 0.9,
    fadeInDuration: 0.35,
    description: 'Conversational gesturing active during streaming speech output.',
  },
  HAPPY: {
    clipName: 'agree',
    fallbackClip: 'idle',
    loop: false,
    timeScale: 1.1,
    fadeInDuration: 0.5,
    description: 'Energetic positive feedback reaction.',
  },
};

/**
 * Resolves the appropriate animation clip name for a given character state,
 * returning either the primary clip or the fallback.
 */
export function resolveClipForState(
  state: CharacterState,
  availableClips: string[]
): { clipName: string | null; isFallback: boolean } {
  const mapping = STATE_ANIMATION_MAPPINGS[state];
  if (!mapping) {
    return { clipName: null, isFallback: true };
  }

  if (mapping.clipName && availableClips.includes(mapping.clipName)) {
    return { clipName: mapping.clipName, isFallback: false };
  }

  // Use fallback if available in model
  if (availableClips.includes(mapping.fallbackClip)) {
    return { clipName: mapping.fallbackClip, isFallback: true };
  }

  // Default to first available clip or null
  return { clipName: availableClips[0] ?? null, isFallback: true };
}

