/**
 * KEBA AI — Cinematic Entrance GSAP Timeline Coordinator
 * 
 * Orchestrates:
 * 1. Top-right paper tear opening and curling.
 * 2. 3D character emergence from behind the torn opening.
 * 3. Landing onto virtual floor plane.
 * 4. Transition into greeting animation and facing the visitor.
 * 5. Paper fade-out and dialogue prompt reveal.
 */

import { gsap } from 'gsap';
import { useKebaStore } from '../state/kebaStore';

export interface EntranceTimelineCallbacks {
  onPaperProgress?: (progress: number) => void;
  onPaperOpacity?: (opacity: number) => void;
  onStageChange?: (stage: string) => void;
  onComplete?: () => void;
}

export class EntranceTimeline {
  private timeline: gsap.core.Timeline | null = null;
  private isDestroyed = false;

  public play(callbacks: EntranceTimelineCallbacks = {}): void {
    this.kill();
    this.isDestroyed = false;

    const store = useKebaStore.getState();

    // 1. Initial State: Position character high in top-right behind tear
    store.setCharacterPosition([1.1, 0.65, -1.2]);
    store.setCharacterScale(0.65);
    store.setCharacterRotationY(-0.35);
    store.setCharacterState('WALKING'); // Emergence movement motion
    store.setEntranceStage('TEARING');

    callbacks.onStageChange?.('TEARING');

    // Values to animate
    const anim = {
      paperProgress: 0,
      paperOpacity: 1,
      charX: 1.1,
      charY: 0.65,
      charZ: -1.2,
      charScale: 0.65,
      charRotY: -0.35,
    };

    const tl = gsap.timeline({
      onUpdate: () => {
        if (this.isDestroyed) return;

        // Update paper canvas
        callbacks.onPaperProgress?.(anim.paperProgress);
        callbacks.onPaperOpacity?.(anim.paperOpacity);

        // Update 3D character coordinates in store
        store.setCharacterPosition([anim.charX, anim.charY, anim.charZ]);
        store.setCharacterScale(anim.charScale);
        store.setCharacterRotationY(anim.charRotY);
      },
      onComplete: () => {
        if (this.isDestroyed) return;
        store.setEntranceStage('QUESTION');
        callbacks.onStageChange?.('QUESTION');
        callbacks.onComplete?.();
      },
    });

    this.timeline = tl;

    // STEP 1: Paper tear begins at top-right corner (0.0s - 0.9s)
    tl.to(
      anim,
      {
        paperProgress: 1.0,
        duration: 0.9,
        ease: 'power2.out',
      },
      0
    );

    // STEP 2: Character emerges forward through opening (0.45s - 1.6s)
    tl.call(() => {
      store.setEntranceStage('EMERGING');
      callbacks.onStageChange?.('EMERGING');
    }, [], 0.45);

    tl.to(
      anim,
      {
        charX: 0.45,
        charY: -0.05,
        charZ: 0.4,
        charScale: 0.95,
        charRotY: 0.0, // Face forward directly toward visitor
        duration: 1.2,
        ease: 'power2.out',
      },
      0.45
    );

    // STEP 3: Character lands and transitions into Greeting (1.6s)
    tl.call(() => {
      store.setCharacterState('GREETING');
      store.setEntranceStage('GREETING');
      callbacks.onStageChange?.('GREETING');
    }, [], 1.6);

    // STEP 4: Torn paper dissolves, uncovering the full website (1.8s - 2.4s)
    tl.to(
      anim,
      {
        paperOpacity: 0.0,
        duration: 0.6,
        ease: 'power1.inOut',
      },
      1.8
    );
  }

  /**
   * Fast-forwards directly to steady state (used by Skip or Reduced Motion).
   */
  public skip(): void {
    this.kill();
    const store = useKebaStore.getState();
    store.setCharacterPosition([0.45, -0.05, 0.4]);
    store.setCharacterScale(0.95);
    store.setCharacterRotationY(0);
    store.setCharacterState('GREETING');
    store.setEntranceStage('QUESTION');
  }

  public kill(): void {
    this.isDestroyed = true;
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
  }
}
