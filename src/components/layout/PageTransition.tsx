'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * 250ms subtle entrance transition between route updates.
 * Disabled on prefers-reduced-motion.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <div
      key={pathname}
      className="animate-in fade-in-50 duration-300 ease-[cubic-bezier(0.2,0.7,0.1,1)] min-h-screen flex flex-col justify-between"
    >
      {children}
    </div>
  );
}

