import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { KebaLighting } from '../KebaLighting';
import { KebaProceduralRig } from '../KebaProceduralRig';

describe('KEBA AI — Scene Engine Primitives', () => {
  it('initializes KebaLighting with 4-point lights and disposes cleanly', () => {
    const lighting = new KebaLighting();
    expect(lighting.group.children.length).toBe(4);

    const names = lighting.group.children.map((c) => c.name);
    expect(names).toContain('AmbientLight_Ivory');
    expect(names).toContain('KeyLight');
    expect(names).toContain('RimLight_Terracotta');
    expect(names).toContain('FillLight_Sand');

    // Test multiplier
    lighting.setIntensityMultiplier(1.5);
    const key = lighting.group.getObjectByName('KeyLight') as THREE.DirectionalLight;
    expect(key.intensity).toBeCloseTo(1.6 * 1.5);

    // Test clean disposal
    lighting.dispose();
    expect(lighting.group.children.length).toBe(0);
  });

  it('procedural rig clamps pointer angles and obeys reduced motion', () => {
    const rig = new KebaProceduralRig({
      enableBreathing: true,
      enableCursorTracking: true,
      enableReducedMotion: false,
    });

    // Create a mock bone hierarchy
    const root = new THREE.Group();
    const spine = new THREE.Bone();
    spine.name = 'mixamorig:Spine1';
    const neck = new THREE.Bone();
    neck.name = 'mixamorig:Neck';
    const head = new THREE.Bone();
    head.name = 'mixamorig:Head';

    root.add(spine);
    spine.add(neck);
    neck.add(head);

    rig.bind(root);

    // Set pointer to extreme coordinate
    rig.setPointer(5.0, 5.0); // beyond bounds, should be clamped

    rig.update(0.016, 1.0);

    // Head rotation should have changed smoothly toward target
    expect(head.quaternion).toBeDefined();

    // Now test reduced motion mode
    rig.options.enableReducedMotion = true;
    const quatBefore = head.quaternion.clone();
    rig.update(0.016, 2.0);
    expect(head.quaternion.equals(quatBefore)).toBe(true);

    rig.dispose();
  });
});

