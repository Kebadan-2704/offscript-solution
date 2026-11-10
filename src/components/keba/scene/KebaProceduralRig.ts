/**
 * KEBA AI — Procedural Animation Rig
 * 
 * Injects natural secondary procedural micro-motion on top of skeletal animation clips:
 * 1. Cursor / pointer head & neck tracking (spherical damped slerp).
 * 2. Continuous sinusoidal diaphragmatic breathing.
 * 3. Morph target oscillation / blinking where supported.
 * 4. Automatic bypass when prefers-reduced-motion is active.
 */

import * as THREE from 'three';

export interface ProceduralRigOptions {
  enableBreathing?: boolean;
  enableCursorTracking?: boolean;
  enableReducedMotion?: boolean;
}

export class KebaProceduralRig {
  private headBone: THREE.Bone | null = null;
  private neckBone: THREE.Bone | null = null;
  private spineBone: THREE.Bone | null = null;
  private morphMeshes: { mesh: THREE.Mesh; dictionary: Record<string, number> }[] = [];

  // Target and current rotation quaternions for smooth slerp
  private targetHeadQuat = new THREE.Quaternion();
  private currentHeadQuat = new THREE.Quaternion();
  private initialHeadQuat = new THREE.Quaternion();
  private initialNeckQuat = new THREE.Quaternion();

  // Mouse / Pointer normalized coordinates (-1.0 to 1.0)
  public pointer = new THREE.Vector2(0, 0);
  public options: Required<ProceduralRigOptions>;

  constructor(options: ProceduralRigOptions = {}) {
    this.options = {
      enableBreathing: options.enableBreathing ?? true,
      enableCursorTracking: options.enableCursorTracking ?? true,
      enableReducedMotion: options.enableReducedMotion ?? false,
    };
  }

  /**
   * Binds procedural tracking to bones and morph targets discovered in the loaded GLTF hierarchy.
   */
  public bind(root: THREE.Object3D): void {
    this.headBone = null;
    this.neckBone = null;
    this.spineBone = null;
    this.morphMeshes = [];

    root.traverse((node) => {
      // 1. Identify bones by Mixamo or standard humanoid naming
      if ((node as THREE.Bone).isBone) {
        const name = node.name.toLowerCase();
        if (name.includes('head') && !name.includes('top') && !name.includes('end')) {
          this.headBone = node as THREE.Bone;
          this.initialHeadQuat.copy(this.headBone.quaternion);
        } else if (name.includes('neck')) {
          this.neckBone = node as THREE.Bone;
          this.initialNeckQuat.copy(this.neckBone.quaternion);
        } else if (name.includes('spine1') || name.includes('spine2')) {
          this.spineBone = node as THREE.Bone;
        }
      }

      // 2. Identify meshes with morph target dictionaries
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh && mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
        this.morphMeshes.push({
          mesh,
          dictionary: mesh.morphTargetDictionary,
        });
      }
    });
  }

  /**
   * Updates procedural animation each frame.
   * Called immediately AFTER AnimationMixer.update() to layer on top of skeletal clips.
   */
  public update(delta: number, elapsed: number): void {
    if (this.options.enableReducedMotion) {
      return;
    }

    // 1. Natural Sinusoidal Breathing
    if (this.options.enableBreathing && this.spineBone) {
      const breathingAngle = Math.sin(elapsed * 1.8) * 0.015;
      this.spineBone.rotation.x += breathingAngle;
    }

    // 2. Cursor Head Tracking
    if (this.options.enableCursorTracking && this.headBone) {
      // Clamp angles to prevent unnatural neck rotation: Yaw +/- 35 deg, Pitch +/- 18 deg
      const maxYaw = THREE.MathUtils.degToRad(35);
      const maxPitch = THREE.MathUtils.degToRad(18);

      const targetYaw = THREE.MathUtils.clamp(this.pointer.x * maxYaw, -maxYaw, maxYaw);
      const targetPitch = THREE.MathUtils.clamp(-this.pointer.y * maxPitch, -maxPitch, maxPitch);

      const euler = new THREE.Euler(targetPitch, targetYaw, 0, 'YXZ');
      this.targetHeadQuat.setFromEuler(euler);

      // Damp current rotation toward target using spherical linear interpolation
      const dampFactor = Math.min(delta * 4.5, 0.25);
      this.currentHeadQuat.slerp(this.targetHeadQuat, dampFactor);

      // Layer damped rotation onto head bone
      this.headBone.quaternion.multiply(this.currentHeadQuat);

      // Subtle proportional neck rotation (30% of head motion)
      if (this.neckBone) {
        const neckEuler = new THREE.Euler(targetPitch * 0.3, targetYaw * 0.3, 0, 'YXZ');
        const neckQuat = new THREE.Quaternion().setFromEuler(neckEuler);
        this.neckBone.quaternion.multiply(neckQuat);
      }
    }

    // 3. Subtle Procedural Blinking / Morph Targets (if available)
    if (this.morphMeshes.length > 0) {
      // Natural blink cycle every ~4 seconds
      const blinkTime = elapsed % 4.0;
      const isBlinking = blinkTime > 3.85 && blinkTime < 4.0;
      const blinkWeight = isBlinking ? 1.0 : 0.0;

      for (const { mesh, dictionary } of this.morphMeshes) {
        const influences = mesh.morphTargetInfluences;
        if (!influences) continue;

        const leftIdx = dictionary['eyeBlinkLeft'] ?? dictionary['eyeBlink_L'] ?? dictionary['mouthSmile'];
        const rightIdx = dictionary['eyeBlinkRight'] ?? dictionary['eyeBlink_R'];

        if (leftIdx !== undefined && influences[leftIdx] !== undefined) {
          influences[leftIdx] = THREE.MathUtils.lerp(influences[leftIdx]!, blinkWeight, 0.3);
        }
        if (rightIdx !== undefined && influences[rightIdx] !== undefined) {
          influences[rightIdx] = THREE.MathUtils.lerp(influences[rightIdx]!, blinkWeight, 0.3);
        }
      }
    }
  }

  public setPointer(x: number, y: number): void {
    this.pointer.set(x, y);
  }

  public dispose(): void {
    this.headBone = null;
    this.neckBone = null;
    this.spineBone = null;
    this.morphMeshes = [];
  }
}

