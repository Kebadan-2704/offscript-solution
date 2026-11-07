interface ServiceCapabilitiesProps {
  capabilities: string[];
  theme?: 'ivory' | 'sand';
}

export function ServiceCapabilities({ capabilities, theme = 'ivory' }: ServiceCapabilitiesProps) {
  const bgClass = theme === 'sand' ? 'bg-[#E6E2D9]/40' : 'bg-transparent';

  return (
    <section aria-labelledby="capabilities-heading" className={`py-14 sm:py-20 border-b border-[#E6E2D9] ${bgClass}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="capabilities-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Specialised Capabilities
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-10">
        Disciplined engineering competencies applied across engagements.
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {capabilities.map((cap, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-[#E6E2D9] flex items-center justify-between group hover:border-[#191B1E] transition-colors"
          >
            <span className="font-medium text-[#191B1E] text-base group-hover:text-[#D36B4D] transition-colors">
              {cap}
            </span>
            <span className="font-mono text-sm text-[#D36B4D] ml-3" aria-hidden="true">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

