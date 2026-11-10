'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  href?: string;
  arrow?: boolean;
}

/**
 * Editorial studio button primitive with upward fill wipe on hover and optional directional arrow.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      href,
      arrow = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'btn-studio inline-flex items-center justify-center font-mono text-[13px] font-medium tracking-[0.1em] uppercase border transition-all duration-400 ease-[cubic-bezier(0.2,0.7,0.1,1)] relative overflow-hidden min-h-[48px] px-7 py-3.5';

    const variantClasses = {
      primary:
        'btn-studio-primary bg-[#D36B4D] border-[#D36B4D] text-[#191B1E] hover:text-[#F5F3ED] hover:border-[#191B1E]',
      secondary:
        'bg-transparent border-[#191B1E] text-[#191B1E] hover:text-[#F5F3ED]',
      outline:
        'bg-transparent border-[#E6E2D9] text-[#F5F3ED] hover:text-[#191B1E] hover:bg-[#F5F3ED]',
      dark:
        'bg-[#191B1E] border-[#191B1E] text-[#F5F3ED] hover:bg-[#D36B4D] hover:border-[#D36B4D] hover:text-[#191B1E]',
    };

    const combinedClasses = cn(baseClasses, variantClasses[variant], className);

    const content = (
      <>
        <span>{children}</span>
        {arrow && <ArrowUpRight className="w-4 h-4 ml-2.5 arrow-icon shrink-0" />}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

