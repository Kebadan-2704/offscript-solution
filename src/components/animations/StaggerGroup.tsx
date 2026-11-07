'use client';

import { Children, isValidElement, type ReactNode } from 'react';
import { Reveal } from './Reveal';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  baseDelayMs?: number;
}

/**
 * Container that automatically attaches staggered entrance delays to each child item.
 */
export function StaggerGroup({
  children,
  className = '',
}: StaggerGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={idx} delayIndex={idx}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
