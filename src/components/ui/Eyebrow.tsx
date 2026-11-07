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
        dark ? 'eyebrow-dark text-[#E07A5C]' : 'text-[#9B3F27]',
        className
      )}
    >
      <span>{children}</span>
    </div>
  );
}

