'use client';

import { useEffect, useRef, useState, type SVGProps } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DrawPathProps extends SVGProps<SVGPathElement> {
  d: string;
  durationMs?: number;
  delayMs?: number;
}

/**
 * Animated SVG path stroke draw-in component using strokeDasharray/strokeDashoffset.
 */
export function DrawPath({
  d,
  durationMs = 2400,
  delayMs = 400,
  className = '',
  ...props
}: DrawPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const prefersReduced = useReducedMotion();
  const isDrawn = drawn || prefersReduced;

  useEffect(() => {
    if (prefersReduced) return;

    const path = pathRef.current;
    if (path) {
      const totalLength = path.getTotalLength();
      setLength(totalLength);

      const timer = setTimeout(() => {
        setDrawn(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [delayMs, prefersReduced]);

  if (prefersReduced) {
    return <path ref={pathRef} d={d} className={className} {...props} />;
  }

  return (
    <path
      ref={pathRef}
      d={d}
      strokeDasharray={length || 2000}
      strokeDashoffset={isDrawn ? 0 : length || 2000}
      className={`transition-[stroke-dashoffset] ease-[cubic-bezier(0.2,0.7,0.1,1)] ${className}`}
      style={{
        transitionDuration: `${durationMs}ms`,
      }}
      {...props}
    />
  );
}
