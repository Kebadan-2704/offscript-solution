'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // Maximum offset in pixels (default: 16)
  className?: string;
}

/**
 * Editorial Magnetic hover wrapper.
 * Gently pulls interactive elements towards the user cursor on desktop.
 * Automatically bypassed on touch devices and when prefers-reduced-motion is active.
 */
export function Magnetic({
  children,
  strength = 14,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;

    // Skip on touch-only devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Normalize and apply strength bounds
    const factorX = (middleX / (width / 2)) * strength;
    const factorY = (middleY / (height / 2)) * strength;

    x.set(factorX);
    y.set(factorY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
