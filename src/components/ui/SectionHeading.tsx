import { type ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  descriptionClassName?: string;
  className?: string;
  dark?: boolean;
}

/**
 * Editorial section header combining mono indexing, eyebrow hairline, and Space Grotesk headline.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  descriptionClassName,
  className = '',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-14 lg:mb-20', className)}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        {index && (
          <span
            className={cn(
              'font-mono text-xs tracking-widest font-medium',
              dark ? 'text-[#92938D]' : 'text-[#5A5B56]'
            )}
          >
            {index}
          </span>
        )}
      </div>

      <h2
        className={cn(
          'font-space font-semibold tracking-[-0.035em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-[1.05] text-balance',
          dark ? 'text-[#F5F3ED]' : 'text-[#191B1E]'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-6 text-base sm:text-lg max-w-2xl leading-relaxed text-pretty',
            descriptionClassName || (dark ? 'text-[#E6E2D9]/80' : 'text-[#5A5B56]')
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

