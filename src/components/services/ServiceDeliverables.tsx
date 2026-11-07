import { Check } from 'lucide-react';

interface ServiceDeliverablesProps {
  deliverables: string[];
}

export function ServiceDeliverables({ deliverables }: ServiceDeliverablesProps) {
  return (
    <section id="deliverables" aria-labelledby="deliverables-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="deliverables-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Concrete Architectural Outputs
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-10">
        Tangible deliverables transferred to client infrastructure.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 bg-white border border-[#E6E2D9] flex items-start gap-4 hover:border-[#191B1E] transition-colors"
          >
            <div className="w-6 h-6 rounded-xs bg-[#DCE3DD] flex items-center justify-center text-[#191B1E] shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#92938D] uppercase tracking-wider block mb-1">
                Artifact 0{idx + 1}
              </span>
              <p className="font-medium text-base sm:text-lg text-[#191B1E] leading-snug">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

