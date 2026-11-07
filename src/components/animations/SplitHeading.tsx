'use client';

import { MaskReveal } from './MaskReveal';

interface SplitHeadingProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delayMs?: number;
}

/**
 * SplitHeading wrapper providing consistent typography styling for large editorial titles.
 */
export function SplitHeading({
  lines,
  as = 'h2',
  className = '',
  delayMs = 0,
}: SplitHeadingProps) {
  return (
    <MaskReveal
      lines={lines}
      as={as}
      className={`font-space font-semibold tracking-[-0.04em] text-[#191B1E] leading-[0.98] ${className}`}
      delayMs={delayMs}
    />
  );
}

