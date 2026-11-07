interface ServiceNarrativeProps {
  description: string;
  theme?: 'default' | 'card';
}

export function ServiceNarrative({ description, theme = 'default' }: ServiceNarrativeProps) {
  return (
    <section aria-labelledby="narrative-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className={theme === 'card' ? 'p-8 sm:p-12 bg-white border border-[#E6E2D9]' : ''}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
          <h2
            id="narrative-heading"
            className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
          >
            Engineering Narrative & Principles
          </h2>
        </div>

        <div className="max-w-4xl">
          <p className="font-inter text-lg sm:text-2xl text-[#191B1E] leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

