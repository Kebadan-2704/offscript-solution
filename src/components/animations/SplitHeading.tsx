'use client';

import type { ReactNode } from 'react';
import { MaskReveal } from './MaskReveal';

interface SplitHeadingProps {
  lines: (string | ReactNode)[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delayMs?: number;
  trigger?: boolean;
}

/**
 * SplitHeading wrapper providing consistent typography styling for large editorial titles.
 */
export function SplitHeading({
  lines,
  as = 'h2',
  className = '',
  delayMs = 0,
  trigger,
}: SplitHeadingProps) {
  const defaultFont = className.includes('font-') ? '' : 'font-space';
  return (
    <MaskReveal
      lines={lines}
      as={as}
      className={`${defaultFont} font-bold tracking-tight text-[#191B1E] leading-[0.98] ${className}`}
      delayMs={delayMs}
      trigger={trigger}
    />
  );
}

