import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ServiceHeroProps {
  number: string;
  title: string;
  tagline: string;
}

export function ServiceHero({ number, title, tagline }: ServiceHeroProps) {
  return (
    <header className="border-b border-[#E6E2D9] pb-16 sm:pb-20">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs sm:text-sm font-semibold text-[#D36B4D] tracking-wider">
          DISCIPLINE {number} {'//'} 06
        </span>
        <span className="w-10 sm:w-16 h-px bg-[#D36B4D]" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#6B6C67]">
          Architecture Specification
        </span>
      </div>

      <h1 className="font-space text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#191B1E] mb-6 leading-[1.04] max-w-4xl">
        {title}
      </h1>

      <p className="font-inter text-xl sm:text-2xl text-[#6B6C67] font-normal leading-relaxed max-w-3xl mb-10">
        {tagline}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Button href="/contact" variant="primary">
          <span>Scope Engagement</span>
          <ArrowUpRight className="w-4 h-4" />
        </Button>
        <Link
          href="#deliverables"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#191B1E] hover:text-[#D36B4D] font-medium px-4 py-3 border border-[#E6E2D9] hover:border-[#191B1E] transition-colors"
        >
          Jump to Deliverables
        </Link>
      </div>
    </header>
  );
}

