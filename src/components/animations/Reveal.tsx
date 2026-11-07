'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  delayIndex?: number;
  className?: string;
  threshold?: number;
}

/**
 * Accessible entrance reveal using IntersectionObserver.
 * Enhances HTML with translate + fade without hiding content if JavaScript fails or reduced motion is active.
 */
export function Reveal({
  children,
  delayIndex = 0,
  className = '',
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useReducedMotion();
  const shouldShow = inView || prefersReduced;

  useEffect(() => {
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => observer.disconnect();
  }, [threshold, prefersReduced]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
        shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        transitionDelay: `${delayIndex * 90}ms`,
      }}
    >
      {children}
    </div>
  );
}
