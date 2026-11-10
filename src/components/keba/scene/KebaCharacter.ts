/**
 * KEBA AI — Character Model & Animation Controller
 * 
 * Manages loading of the rigged humanoid GLTF/GLB asset, creates the AnimationMixer,
 * orchestrates smooth cross-fading between character states, and handles clean WebGL disposal.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  KEBA_MODEL_CONFIG,
  STATE_ANIMATION_MAPPINGS,
  resolveClipForState,
} from '@/lib/keba/animationManifest';
import type { CharacterState } from '../state/kebaTypes';
import { KebaProceduralRig } from './KebaProceduralRig';

export interface CharacterLoadResult {
  root: THREE.Group;
  availableClips: string[];
  missingClips: string[];
}

export class KebaCharacter {
  public group: THREE.Group;
  private mixer: THREE.AnimationMixer | null = null;
  private actions: Map<string, THREE.AnimationAction> = new Map();
  private currentAction: THREE.AnimationAction | null = null;
  private currentClipName: string | null = null;
  public proceduralRig: KebaProceduralRig;

  public availableClips: string[] = [];
  public missingClips: string[] = [];
  public isLoaded = false;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'KebaCharacterGroup';
    this.proceduralRig = new KebaProceduralRig();
  }

  /**
   * Loads the rigged humanoid GLB model, parses animation clips, and sets up materials.
   */
  public async load(
    onProgress?: (progress: number) => void
  ): Promise<CharacterLoadResult> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        KEBA_MODEL_CONFIG.assetUrl,
        (gltf) => {
          const root = gltf.scene;
          root.name = 'KebaHumanoidModel';

          // Apply scale and positional alignment
          root.scale.setScalar(KEBA_MODEL_CONFIG.scale);
          root.position.set(...KEBA_MODEL_CONFIG.position);
          root.rotation.set(...KEBA_MODEL_CONFIG.rotation);

          // Configure meshes, skinning, and shadows
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              if (mesh.material) {
                const materials = Array.isArray(mesh.material)
                  ? mesh.material
                  : [mesh.material];

                for (const mat of materials) {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.roughness = Math.max(mat.roughness, 0.4);
                    mat.envMapIntensity = 0.8;
                    mat.needsUpdate = true;
                  }
                }
              }
            }
          });

          // Bind procedural rig to head, neck, spine, and morph targets
          this.proceduralRig.bind(root);

          // Setup AnimationMixer
          this.mixer = new THREE.AnimationMixer(root);
          this.actions.clear();

          // Index all animations embedded in the GLTF file
          const clips = gltf.animations || [];
          this.availableClips = clips.map((c) => c.name);

          for (const clip of clips) {
            const action = this.mixer.clipAction(clip);
            this.actions.set(clip.name, action);
          }

          // Evaluate missing logical state clips
          this.missingClips = [];
          for (const [stateKey, mapping] of Object.entries(STATE_ANIMATION_MAPPINGS)) {
            if (mapping.clipName && !this.availableClips.includes(mapping.clipName)) {
              this.missingClips.push(`${stateKey} (requires '${mapping.clipName}')`);
            } else if (!mapping.clipName) {
              this.missingClips.push(`${stateKey} (no clip assigned in model manifest)`);
            }
          }

          this.group.add(root);
          this.isLoaded = true;

          // Start in default IDLE state
          this.playState('IDLE');

          resolve({
            root: this.group,
            availableClips: this.availableClips,
            missingClips: this.missingClips,
          });
        },
        (xhr) => {
          if (xhr.total > 0 && onProgress) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            onProgress(percent);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Transitions character to a target state using smooth animation cross-fading.
   */
  public playState(
    state: CharacterState,
    onTransitionComplete?: () => void
  ): { targetClip: string | null; isFallback: boolean } {
    if (!this.mixer || !this.isLoaded) {
      return { targetClip: null, isFallback: true };
    }

    const { clipName, isFallback } = resolveClipForState(state, this.availableClips);
    if (!clipName) {
      return { targetClip: null, isFallback: true };
    }

    // If target animation is already actively running, avoid redundant re-triggers
    if (this.currentClipName === clipName && this.currentAction?.isRunning()) {
      return { targetClip: clipName, isFallback };
    }

    const nextAction = this.actions.get(clipName);
    if (!nextAction) {
      return { targetClip: null, isFallback: true };
    }

    const mapping = STATE_ANIMATION_MAPPINGS[state];
    const duration = mapping.fadeInDuration || 0.4;

    nextAction.reset();
    nextAction.setEffectiveTimeScale(mapping.timeScale || 1.0);
    nextAction.setEffectiveWeight(1.0);

    if (mapping.loop) {
      nextAction.setLoop(THREE.LoopRepeat, Infinity);
      nextAction.clampWhenFinished = false;
    } else {
      nextAction.setLoop(THREE.LoopOnce, 1);
      nextAction.clampWhenFinished = true;
    }

    if (this.currentAction) {
      // Smooth cross-fade from previous action
      this.currentAction.crossFadeTo(nextAction, duration, true);
    }

    nextAction.play();
    this.currentAction = nextAction;
    this.currentClipName = clipName;

    if (onTransitionComplete) {
      setTimeout(onTransitionComplete, duration * 1000);
    }

    return { targetClip: clipName, isFallback };
  }

  /**
   * Animation update tick called per frame.
   */
  public update(delta: number, elapsed: number): void {
    if (this.mixer) {
      this.mixer.update(delta);
    }
    // Layer procedural secondary motion (breathing, mouse look-at) on top
    this.proceduralRig.update(delta, elapsed);
  }

  public setReducedMotion(reduced: boolean): void {
    this.proceduralRig.options.enableReducedMotion = reduced;
  }

  public setPointer(x: number, y: number): void {
    this.proceduralRig.setPointer(x, y);
  }

  /**
   * Complete GPU memory cleanup disposing geometries, textures, materials, and mixer.
   */
  public dispose(): void {
    this.proceduralRig.dispose();

    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.group);
      this.mixer = null;
    }

    this.actions.clear();
    this.currentAction = null;
    this.currentClipName = null;

    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          for (const mat of materials) {
            // Dispose all associated textures
            for (const key of Object.keys(mat)) {
              const prop = (mat as unknown as Record<string, unknown>)[key];
              if (prop && typeof prop === 'object' && 'isTexture' in prop) {
                (prop as THREE.Texture).dispose();
              }
            }
            mat.dispose();
          }
        }
      }
    });

    this.group.clear();
    this.isLoaded = false;
  }
}

