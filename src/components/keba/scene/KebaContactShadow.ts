/**
 * KEBA AI — Procedural Contact Shadow Plane
 * 
 * Generates an ultra-soft radial gradient contact shadow under the character's feet.
 * Uses an in-memory HTML5 Canvas texture to avoid external asset dependencies.
 */

import * as THREE from 'three';

export class KebaContactShadow {
  public mesh: THREE.Mesh;
  private texture: THREE.CanvasTexture;
  private material: THREE.MeshBasicMaterial;
  private geometry: THREE.PlaneGeometry;

  constructor(size = 2.4, opacity = 0.38) {
    // 1. Generate in-memory radial gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(25, 27, 30, 1.0)'); // Carbon Ink #191B1E
      gradient.addColorStop(0.35, 'rgba(25, 27, 30, 0.65)');
      gradient.addColorStop(0.7, 'rgba(25, 27, 30, 0.2)');
      gradient.addColorStop(1, 'rgba(25, 27, 30, 0.0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }

    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.needsUpdate = true;

    this.geometry = new THREE.PlaneGeometry(size, size);
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'KebaContactShadow';
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -0.99; // Slightly above base plane to prevent z-fighting
    this.mesh.renderOrder = 0;
  }

  public setOpacity(opacity: number): void {
    this.material.opacity = opacity;
  }

  public setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y + 0.01, z);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}

