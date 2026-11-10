/**
 * KEBA AI — Torn Paper Procedural Canvas
 * 
 * Renders a physical irregular paper tear opening at the top-right corner of the viewport.
 * Features:
 * - Jagged fibrous torn-paper contour with micro-fibrils.
 * - Physically convincing curled paper flap with radial illumination.
 * - Ambient occlusion drop shadow cast inside the torn cavity.
 * - Deterministic procedural jitter (stable across renders, 0 random fluttering).
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

interface TornPaperCanvasProps {
  progress: number; // 0.0 (closed) to 1.0 (fully torn open)
  className?: string;
  onTearComplete?: () => void;
}

export function TornPaperCanvas({
  progress,
  className = '',
}: TornPaperCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Deterministic noise generator based on angle/step
  const pseudoNoise = useCallback((seed: number) => {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }, []);

  const drawTear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (progress <= 0.001) return;

    // Corner dimensions (top-right corner origin)
    // Scale opening size based on progress
    const maxTearWidth = Math.min(width * 0.55, 520);
    const maxTearHeight = Math.min(height * 0.58, 480);

    const tearW = maxTearWidth * Math.min(progress * 1.15, 1.0);
    const tearH = maxTearHeight * Math.min(progress * 1.15, 1.0);

    const originX = width;
    const originY = 0;

    const targetX = width - tearW;
    const targetY = tearH;

    // 1. Generate Jagged Torn Contour Points
    const numPoints = 28;
    const points: { x: number; y: number }[] = [];

    // Arc from (width, tearH) through diagonal midpoint to (width - tearW, 0)
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      // Base elliptical curve
      const angle = t * (Math.PI / 2);
      const baseX = width - tearW * Math.sin(angle);
      const baseY = tearH * Math.cos(angle);

      // Add high-frequency jagged fiber jitter
      const jitterAmount = 14 * Math.sin(t * Math.PI); // Strongest in the middle
      const jitter1 = (pseudoNoise(i * 1.7) - 0.5) * jitterAmount;
      const jitter2 = (pseudoNoise(i * 3.1) - 0.5) * (jitterAmount * 0.6);

      points.push({
        x: baseX + jitter1 + jitter2,
        y: baseY + jitter1 * 0.7 - jitter2,
      });
    }

    // 2. Draw Deep Cavity Drop Shadow (cast into the torn opening)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (pt) ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();

    ctx.shadowColor = 'rgba(25, 27, 30, 0.45)'; // Carbon Ink #191B1E
    ctx.shadowBlur = 32 * progress;
    ctx.shadowOffsetX = -12 * progress;
    ctx.shadowOffsetY = 16 * progress;

    // Semi-transparent deep backing to simulate depth behind torn layer
    ctx.fillStyle = `rgba(25, 27, 30, ${0.15 * progress})`;
    ctx.fill();
    ctx.restore();

    // 3. Draw Curled Torn Paper Flap
    // The peeled paper folds diagonally outward and downward
    const curlOffset = 24 * progress;
    ctx.save();

    // Create curled flap path
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (!pt) continue;
      // Slight curl distortion
      const curlX = pt.x - curlOffset * Math.sin((i / numPoints) * Math.PI);
      const curlY = pt.y + curlOffset * Math.sin((i / numPoints) * Math.PI);
      ctx.lineTo(curlX, curlY);
    }
    ctx.closePath();

    // Curled paper gradient (Warm Ivory #F5F3ED to Soft Sand #E6E2D9)
    const flapGradient = ctx.createLinearGradient(
      originX,
      originY,
      targetX,
      targetY
    );
    flapGradient.addColorStop(0, 'rgba(230, 226, 217, 0.95)'); // Underside Soft Sand
    flapGradient.addColorStop(0.5, 'rgba(245, 243, 237, 0.98)'); // Warm Ivory body
    flapGradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)'); // Bleached fiber highlight

    ctx.fillStyle = flapGradient;
    ctx.shadowColor = 'rgba(25, 27, 30, 0.25)';
    ctx.shadowBlur = 18 * progress;
    ctx.shadowOffsetX = -8 * progress;
    ctx.shadowOffsetY = 12 * progress;
    ctx.fill();

    // 4. White Fibrous Torn Edge Highlight
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (!pt) continue;
      const curlX = pt.x - curlOffset * Math.sin((i / numPoints) * Math.PI);
      const curlY = pt.y + curlOffset * Math.sin((i / numPoints) * Math.PI);
      if (i === 0) ctx.moveTo(curlX, curlY);
      else ctx.lineTo(curlX, curlY);
    }

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 5. Subtle Terracotta Accent Filament (Brand signature)
    ctx.beginPath();
    const midIdx = Math.floor(points.length / 2);
    const midPt = points[midIdx];
    if (midPt) {
      ctx.arc(midPt.x - curlOffset * 0.5, midPt.y + curlOffset * 0.5, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(211, 107, 77, 0.6)'; // Terracotta #D36B4D
      ctx.fill();
    }

    ctx.restore();
  }, [progress, pseudoNoise]);

  // Handle high-DPI canvas resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      drawTear();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawTear]);

  // Redraw when progress changes
  useEffect(() => {
    drawTear();
  }, [progress, drawTear]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
      aria-hidden="true"
    />
  );
}

