'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MaskRevealProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'div';
  className?: string;
  delayMs?: number;
}

/**
 * Editorial masked line reveal for headlines.
 * Each line is wrapped in an overflow-hidden mask with translateY(110%) -> translateY(0).
 */
export function MaskReveal({
  lines,
  as: Component = 'h2',
  className = '',
  delayMs = 0,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.2 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <Component ref={containerRef as never} className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-[0.08em]">
          <span
            className={`block font-normal transition-transform duration-1000 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
              shouldShow ? 'translate-y-0' : 'translate-y-[110%]'
            }`}
            style={{
              transitionDelay: `${delayMs + idx * 100}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}
