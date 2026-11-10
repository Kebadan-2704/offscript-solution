/**
 * KEBA AI — Studio Lighting Rig
 * 
 * Provides an art-directed 4-point lighting system adhering to OFFSCRIPT SOLUTION's
 * Warm Ivory (#F5F3ED), Carbon Ink (#191B1E), and Terracotta (#D36B4D) color tokens.
 */

import * as THREE from 'three';

export class KebaLighting {
  public group: THREE.Group;
  private ambientLight: THREE.AmbientLight;
  private keyLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'KebaLightingRig';

    // 1. Ambient Warm Ivory Base (#F5F3ED)
    this.ambientLight = new THREE.AmbientLight(0xf5f3ed, 0.9);
    this.ambientLight.name = 'AmbientLight_Ivory';
    this.group.add(this.ambientLight);

    // 2. Key Directional Light (Warm White from high front-left)
    this.keyLight = new THREE.DirectionalLight(0xfffdfa, 1.6);
    this.keyLight.name = 'KeyLight';
    this.keyLight.position.set(2.5, 4.0, 3.0);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.camera.near = 0.5;
    this.keyLight.shadow.camera.far = 15;
    this.keyLight.shadow.camera.left = -2;
    this.keyLight.shadow.camera.right = 2;
    this.keyLight.shadow.camera.top = 3;
    this.keyLight.shadow.camera.bottom = -1;
    this.keyLight.shadow.bias = -0.0005;
    this.group.add(this.keyLight);

    // 3. Signature Terracotta Rim Light (#D36B4D from back-right)
    // Produces the architectural studio rim glow on the character's silhouette
    this.rimLight = new THREE.DirectionalLight(0xd36b4d, 1.4);
    this.rimLight.name = 'RimLight_Terracotta';
    this.rimLight.position.set(-2.5, 2.5, -2.5);
    this.group.add(this.rimLight);

    // 4. Soft Sand Fill Light (#E6E2D9 from front-right)
    this.fillLight = new THREE.DirectionalLight(0xe6e2d9, 0.7);
    this.fillLight.name = 'FillLight_Sand';
    this.fillLight.position.set(-2.0, 1.2, 2.5);
    this.group.add(this.fillLight);
  }

  public setIntensityMultiplier(multiplier: number): void {
    this.ambientLight.intensity = 0.9 * multiplier;
    this.keyLight.intensity = 1.6 * multiplier;
    this.rimLight.intensity = 1.4 * multiplier;
    this.fillLight.intensity = 0.7 * multiplier;
  }

  public dispose(): void {
    if (this.keyLight.shadow.map) {
      this.keyLight.shadow.map.dispose();
    }
    this.group.clear();
  }
}

