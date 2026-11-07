import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/content/work';

interface ServiceRelatedWorkProps {
  relatedProjectSlugs: string[];
}

export function ServiceRelatedWork({ relatedProjectSlugs }: ServiceRelatedWorkProps) {
  if (!relatedProjectSlugs || relatedProjectSlugs.length === 0) {
    return null;
  }

  const projects = PROJECTS.filter((p) => relatedProjectSlugs.includes(p.slug));

  if (projects.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-work-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h2
          id="related-work-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Selected Architectures & Research
        </h2>
      </div>

      <h3 className="font-space text-2xl sm:text-4xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-10">
        Representative implementations demonstrating this discipline.
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="p-8 bg-white border border-[#E6E2D9] flex flex-col justify-between hover:border-[#191B1E] transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs text-[#D36B4D] uppercase font-semibold">
                  {project.category}
                </span>
                <span className="font-mono text-[11px] px-2 py-0.5 bg-[#F5F3ED] text-[#191B1E] border border-[#E6E2D9]">
                  {project.status}
                </span>
              </div>

              <h4 className="font-space text-2xl font-semibold text-[#191B1E] group-hover:text-[#D36B4D] transition-colors mb-3">
                {project.title}
              </h4>

              <p className="text-sm text-[#6B6C67] leading-relaxed mb-6">
                {project.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E6E2D9] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] px-2 py-0.5 bg-[#F5F3ED] text-[#6B6C67]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href="/work"
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#191B1E] hover:text-[#D36B4D]"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

