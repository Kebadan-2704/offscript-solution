'use client';

import { useRef, useState, type ReactNode, type HTMLAttributes } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spotlightColor?: string;
  className?: string;
  tilt?: boolean;
}

/**
 * React Bits signature SpotlightCard component enhanced with subtle 3D perspective tilt.
 * Renders an architectural cursor-following radial illumination and tactile card tilt on desktop.
 * Zero layout shift, fully accessible, GPU-accelerated.
 */
export function SpotlightCard({
  children,
  spotlightColor = 'rgba(211, 107, 77, 0.09)',
  className = '',
  tilt = true,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tiltTransform, setTiltTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || !divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (tilt && typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
      const xPct = x / rect.width - 0.5;
      const yPct = y / rect.height - 0.5;
      const rotX = (-yPct * 6).toFixed(2);
      const rotY = (xPct * 6).toFixed(2);
      setTiltTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`);
    }
  };

  const handlePointerEnter = () => {
    if (prefersReduced) return;
    setOpacity(1);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
    setIsHovered(false);
    if (tilt) {
      setTiltTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)');
    }
  };

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: !prefersReduced && tilt ? tiltTransform : undefined,
        transition: isHovered
          ? 'transform 100ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out'
          : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease-out, border-color 300ms ease-out',
        willChange: tilt ? 'transform' : undefined,
        ...props.style,
      }}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Overlay */}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

