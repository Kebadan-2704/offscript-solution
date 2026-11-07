interface ServiceTechStackProps {
  technologies: string[];
}

export function ServiceTechStack({ technologies }: ServiceTechStackProps) {
  return (
    <section aria-labelledby="tech-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="tech-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Technological Foundation
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-8">
        Proven languages and platforms deployed for this discipline.
      </h3>

      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs sm:text-sm px-4 py-2 bg-white text-[#191B1E] border border-[#E6E2D9] hover:border-[#191B1E] hover:bg-[#191B1E] hover:text-[#F5F3ED] transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

