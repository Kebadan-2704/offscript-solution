'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * Editorial scroll-scrubbed text component.
 * Words illuminate progressively from 18% to 100% opacity as the container passes through the viewport.
 * Guarantees persistent whitespace across mobile browsers and selection states.
 */
export function ScrollWords({
  text,
  className = '',
  wordClassName = '',
}: ScrollWordsProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  const [activeCount, setActiveCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when top of element enters middle of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;

      if (rect.top > start) {
        setActiveCount(0);
      } else if (rect.bottom < end) {
        setActiveCount(words.length);
      } else {
        const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        const count = Math.floor(progress * words.length);
        setActiveCount(count);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length, prefersReduced]);

  return (
    <p ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, idx) => {
          const isLit = prefersReduced || idx <= activeCount;
          return (
            <Fragment key={idx}>
              <span
                className={`inline-block mr-[0.22em] transition-opacity duration-200 ${
                  isLit ? 'opacity-100 text-[#F5F3ED]' : 'opacity-40 text-[#F5F3ED]'
                } ${wordClassName}`}
              >
                {word}
              </span>
              {idx < words.length - 1 && ' '}
            </Fragment>
          );
        })}
      </span>
    </p>
  );
}
