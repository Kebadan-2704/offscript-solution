import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ServiceBreadcrumbsProps {
  currentTitle: string;
}

export function ServiceBreadcrumbs({ currentTitle }: ServiceBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 sm:mb-14">
      <ol className="flex items-center flex-wrap gap-2 font-mono text-xs text-[#6B6C67]">
        <li>
          <Link href="/" className="hover:text-[#191B1E] transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-[#92938D]" />
        </li>
        <li>
          <Link href="/services" className="hover:text-[#191B1E] transition-colors">
            Services
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-[#92938D]" />
        </li>
        <li aria-current="page" className="text-[#191B1E] font-medium truncate max-w-[200px] sm:max-w-none">
          {currentTitle}
        </li>
      </ol>
    </nav>
  );
}

