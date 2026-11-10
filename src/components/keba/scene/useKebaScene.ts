/**
 * KEBA AI — Custom Three.js Scene Lifecycle Hook
 * 
 * Orchestrates WebGLRenderer, PerspectiveCamera, Studio Lighting, Contact Shadow,
 * Character loading, responsive canvas resizing, WebGL context loss recovery,
 * dynamic transform synchronization (position, scale, rotation), and the RAF loop.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useKebaStore } from '../state/kebaStore';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { KebaCharacter } from './KebaCharacter';
import { KebaLighting } from './KebaLighting';
import { KebaContactShadow } from './KebaContactShadow';

interface UseKebaSceneOptions {
  interactive?: boolean;
}

export function useKebaScene(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseKebaSceneOptions = {}
) {
  const prefersReduced = useReducedMotion();

  // Internal Three.js instance references
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const characterRef = useRef<KebaCharacter | null>(null);
  const lightingRef = useRef<KebaLighting | null>(null);
  const shadowRef = useRef<KebaContactShadow | null>(null);
  // Animation timing reference
  const timerRef = useRef<{ lastTime: number; totalElapsed: number } | null>(null);

  // Animation frame and visibility tracking
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isRunningRef = useRef<boolean>(false);
  const renderLoopRef = useRef<(() => void) | null>(null);

  // Store actions
  const setCharacterState = useKebaStore((s) => s.setCharacterState);
  const setIsLoading = useKebaStore((s) => s.setIsLoading);
  const setLoadProgress = useKebaStore((s) => s.setLoadProgress);
  const setLoadError = useKebaStore((s) => s.setLoadError);
  const setWebGLAvailable = useKebaStore((s) => s.setWebGLAvailable);
  const setActiveClipName = useKebaStore((s) => s.setActiveClipName);
  const setAvailableClips = useKebaStore((s) => s.setAvailableClips);
  const setMissingClips = useKebaStore((s) => s.setMissingClips);
  const setIsTransitioning = useKebaStore((s) => s.setIsTransitioning);
  const currentCharacterState = useKebaStore((s) => s.characterState);

  // Check WebGL availability and shader precision support safely
  const checkWebGLSupport = useCallback((targetCanvas?: HTMLCanvasElement | null) => {
    try {
      if (typeof window === 'undefined' || !window.WebGLRenderingContext) return false;
      const el = targetCanvas || document.createElement('canvas');
      const gl = (el.getContext('webgl2') || el.getContext('webgl')) as WebGL2RenderingContext | WebGLRenderingContext | null;
      if (!gl) return false;

      // Three.js requires valid shader precision format for HIGH_FLOAT; in software/headless environments this returns null
      const vPrec = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
      const fPrec = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
      if (!vPrec || !fPrec) return false;

      return true;
    } catch {
      return false;
    }
  }, []);

  // Responsive canvas resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    if (!canvas || !renderer || !camera) return;

    const parent = canvas.parentElement;
    const width = parent ? parent.clientWidth : window.innerWidth;
    const height = parent ? parent.clientHeight : window.innerHeight;

    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
  }, [canvasRef]);

  // Pointer / Mouse move tracking
  const handlePointerMove = useCallback(
    (e: PointerEvent | MouseEvent) => {
      if (!options.interactive || !characterRef.current || prefersReduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      characterRef.current.setPointer(x, y);
    },
    [canvasRef, options.interactive, prefersReduced]
  );

  // Sync state machine changes to character animation
  useEffect(() => {
    if (characterRef.current && characterRef.current.isLoaded) {
      setIsTransitioning(true);
      const { targetClip } = characterRef.current.playState(
        currentCharacterState,
        () => setIsTransitioning(false)
      );
      setActiveClipName(targetClip);
    }
  }, [currentCharacterState, setActiveClipName, setIsTransitioning]);

  // Sync reduced motion preference
  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.setReducedMotion(prefersReduced);
    }
  }, [prefersReduced]);

  // Initialize Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Verify WebGL support directly on the canvas element
    if (!checkWebGLSupport(canvas)) {
      setWebGLAvailable(false);
      setIsLoading(false);
      setLoadError('WebGL is unsupported on this hardware or disabled in browser settings.');
      return;
    }

    setWebGLAvailable(true);
    setIsLoading(true);
    setLoadError(null);

    // 2. Initialize WebGLRenderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true, // Transparent canvas background
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
    } catch (err) {
      setWebGLAvailable(false);
      setIsLoading(false);
      setLoadError(`Failed to initialize WebGL context: ${err instanceof Error ? err.message : String(err)}`);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0); // Pure transparent clear
    rendererRef.current = renderer;

    // 3. Initialize Perspective Camera
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0.35, 3.4);
    camera.lookAt(0, 0.05, 0);
    cameraRef.current = camera;

    // 4. Initialize Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 5. Initialize Studio Lighting
    const lighting = new KebaLighting();
    scene.add(lighting.group);
    lightingRef.current = lighting;

    // 6. Initialize Contact Shadow
    const shadow = new KebaContactShadow(2.4, 0.38);
    scene.add(shadow.mesh);
    shadowRef.current = shadow;

    // 7. Initialize Character
    const character = new KebaCharacter();
    character.setReducedMotion(prefersReduced);

    // Initial position matching current store
    const initialStore = useKebaStore.getState();
    character.group.position.set(...initialStore.characterPosition);
    character.group.scale.setScalar(initialStore.characterScale);
    character.group.rotation.y = initialStore.characterRotationY;

    scene.add(character.group);
    characterRef.current = character;

    // 8. High-resolution animation timer
    timerRef.current = {
      lastTime: performance.now(),
      totalElapsed: 0,
    };

    // 9. Load Character GLB Asset
    character
      .load((percent) => {
        setLoadProgress(percent);
      })
      .then((res) => {
        setIsLoading(false);
        setAvailableClips(res.availableClips);
        setMissingClips(res.missingClips);
        const { targetClip } = character.playState('IDLE');
        setActiveClipName(targetClip);
      })
      .catch((err) => {
        setIsLoading(false);
        setLoadError(`Failed to load 3D character asset: ${err instanceof Error ? err.message : String(err)}`);
      });

    // 10. Initial Resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // 11. Visibility & Tab Focus Tracking (Pause rendering when tab is hidden)
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 12. Intersection Observer (Pause rendering when scrolled out of viewport)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = !!entry?.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 13. Context Loss Detection & Recovery
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isRunningRef.current = false;
      setLoadError('WebGL context lost. Attempting hardware recovery...');
    };

    const handleContextRestored = () => {
      setLoadError(null);
      handleResize();
      isRunningRef.current = true;
      if (timerRef.current) {
        timerRef.current.lastTime = performance.now();
      }
      if (renderLoopRef.current) {
        renderLoopRef.current();
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 14. Pointer interaction
    if (options.interactive) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    // 15. Setup & Start Render Loop
    const loop = () => {
      if (!isRunningRef.current) return;

      if (isVisibleRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        if (timerRef.current && characterRef.current) {
          const now = performance.now();
          const delta = Math.min((now - timerRef.current.lastTime) / 1000, 0.1);
          timerRef.current.lastTime = now;
          timerRef.current.totalElapsed += delta;
          characterRef.current.update(delta, timerRef.current.totalElapsed);

          // Synchronize 3D position, scale, and rotation from store coordinates
          const store = useKebaStore.getState();
          const targetPos = store.characterPosition;
          const targetScale = store.characterScale;
          const targetRotY = store.characterRotationY;

          // Smooth lerp toward target transform
          characterRef.current.group.position.x = THREE.MathUtils.lerp(
            characterRef.current.group.position.x,
            targetPos[0],
            0.12
          );
          characterRef.current.group.position.y = THREE.MathUtils.lerp(
            characterRef.current.group.position.y,
            targetPos[1],
            0.12
          );
          characterRef.current.group.position.z = THREE.MathUtils.lerp(
            characterRef.current.group.position.z,
            targetPos[2],
            0.12
          );

          const currentScale = characterRef.current.group.scale.x;
          const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.12);
          characterRef.current.group.scale.setScalar(nextScale);

          characterRef.current.group.rotation.y = THREE.MathUtils.lerp(
            characterRef.current.group.rotation.y,
            targetRotY,
            0.12
          );

          // Align contact shadow with character ground position
          if (shadowRef.current) {
            shadowRef.current.setPosition(
              characterRef.current.group.position.x,
              characterRef.current.group.position.y,
              characterRef.current.group.position.z
            );
            shadowRef.current.setOpacity(0.38 * Math.min(nextScale, 1.0));
          }
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    renderLoopRef.current = loop;
    isRunningRef.current = true;
    loop();

    // 16. Comprehensive Disposal Cleanup on Unmount
    return () => {
      isRunningRef.current = false;
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      if (options.interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
      }

      character.dispose();
      lighting.dispose();
      shadow.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      characterRef.current = null;
      lightingRef.current = null;
      shadowRef.current = null;
      timerRef.current = null;
      renderLoopRef.current = null;
    };
  }, [
    canvasRef,
    checkWebGLSupport,
    handlePointerMove,
    handleResize,
    options.interactive,
    prefersReduced,
    setActiveClipName,
    setAvailableClips,
    setIsLoading,
    setLoadError,
    setLoadProgress,
    setMissingClips,
    setWebGLAvailable,
  ]);

  return {
    triggerState: setCharacterState,
  };
}
