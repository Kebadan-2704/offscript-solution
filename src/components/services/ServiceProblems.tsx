interface ServiceProblemsProps {
  problems: string[];
  layout?: 'grid' | 'list';
}

export function ServiceProblems({ problems, layout = 'grid' }: ServiceProblemsProps) {
  return (
    <section aria-labelledby="problems-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="problems-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Bottlenecks & Failures Addressed
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-10">
        Operational challenges that standard off-the-shelf software fails to resolve.
      </h3>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white border border-[#E6E2D9] flex flex-col justify-between hover:border-[#191B1E] transition-colors"
            >
              <span className="font-mono text-xs font-semibold text-[#D36B4D] mb-4">
                0{idx + 1}
              </span>
              <p className="text-sm sm:text-base text-[#191B1E] leading-relaxed">
                {prob}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E6E2D9] flex items-start gap-4 hover:border-[#191B1E] transition-colors"
            >
              <span className="font-mono text-xs font-semibold text-[#D36B4D] pt-0.5">
                0{idx + 1}
              </span>
              <p className="text-base text-[#191B1E] leading-relaxed">
                {prob}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

