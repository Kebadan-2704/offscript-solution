import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

/**
 * Centered layout container capped at 1360px with fluid clamp padding.
 */
export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return <Component className={cn('wrap', className)}>{children}</Component>;
}

