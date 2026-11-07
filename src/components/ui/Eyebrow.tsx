import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * Editorial Eyebrow component with a 32px hairline prefix.
 */
export function Eyebrow({
  children,
  className = '',
  dark = false,
}: EyebrowProps) {
  return (
    <div
      className={cn(
        'eyebrow',
        dark ? 'text-[#D36B4D]' : 'text-[#D36B4D]',
        className
      )}
    >
      <span>{children}</span>
    </div>
  );
}

