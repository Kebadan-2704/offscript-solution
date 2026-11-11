import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCtaProps {
  serviceTitle: string;
}

export function ServiceCta({ serviceTitle }: ServiceCtaProps) {
  return (
    <section aria-labelledby="cta-heading" className="my-16 sm:my-24 p-8 sm:p-14 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E]">
      <div className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
          Initiate Engineering Engagement
        </span>

        <h3
          id="cta-heading"
          className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3ED] leading-tight mb-6"
        >
          Ready to engineer your {serviceTitle.toLowerCase()} architecture?
        </h3>

        <p className="text-base sm:text-lg text-[#E6E2D9]/80 leading-relaxed mb-10 max-w-xl font-normal">
          Direct dialogue with principal engineers. No account executives, no vague timelines. We scope real requirements and build what lasts.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
          >
            <span>Initiate Direct Scoping</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-6 font-mono text-xs text-[#92938D]">
            <span>SLA: 24H BUSINESS RESPONSE</span>
            <span aria-hidden="true" className="text-[#92938D]">·</span>
            <span>NDA AVAILABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

