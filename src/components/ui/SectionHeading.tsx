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
  as?: 'h1' | 'h2' | 'h3';
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
  as: Component = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-6 lg:mb-8', className)}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        {index && (
          <span
            className={cn(
              'font-mono text-xs tracking-widest font-semibold',
              dark ? 'text-[#E6E2D9]/70' : 'text-[#52534E]'
            )}
          >
            {index}
          </span>
        )}
      </div>

      <Component
        className={cn(
          'font-space font-semibold tracking-[-0.035em] text-[clamp(1.85rem,4.5vw,3.75rem)] max-w-3xl leading-[1.05] text-balance',
          dark ? 'text-[#F5F3ED]' : 'text-[#191B1E]'
        )}
      >
        {title}
      </Component>

      {description && (
        <p
          className={cn(
            'mt-6 text-base sm:text-lg max-w-2xl leading-relaxed text-pretty',
            descriptionClassName || (dark ? 'text-[#E6E2D9]/90' : 'text-[#52534E]')
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

