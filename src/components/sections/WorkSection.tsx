'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS, WORK_FILTERS } from '@/content/work';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

function ProjectArtwork({ slug }: { slug: string }) {
  switch (slug) {
    case 'liferoute-driver':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="38" stroke="#191B1E" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M25 75L50 25L75 75L50 62L25 75Z" fill="#D36B4D" stroke="#191B1E" strokeWidth="2" />
          <circle cx="50" cy="25" r="5" fill="#191B1E" />
          <path d="M50 25L75 25" stroke="#191B1E" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );
    case 'liferoute-user':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="#E6E2D9" strokeWidth="3" />
          <circle cx="50" cy="50" r="28" stroke="#D36B4D" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="16" fill="#D36B4D" opacity="0.3" />
          <path d="M50 15V85M15 50H85" stroke="#191B1E" strokeWidth="2" />
          <path d="M42 50H58M50 42V58" stroke="#F5F3ED" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'baava-technologies':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="18" y="18" width="64" height="64" stroke="#191B1E" strokeWidth="2" />
          <rect x="28" y="28" width="44" height="44" stroke="#D36B4D" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M18 50H82M50 18V82" stroke="#E6E2D9" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="#191B1E" />
          <rect x="68" y="68" width="10" height="10" fill="#D36B4D" />
        </svg>
      );
    case 'costa-devices':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="25" y="25" width="50" height="50" rx="4" stroke="#191B1E" strokeWidth="2.5" fill="#F5F3ED" />
          <path d="M15 35H25M15 50H25M15 65H25M75 35H85M75 50H85M75 65H85" stroke="#191B1E" strokeWidth="2" strokeLinecap="round" />
          <path d="M35 15V25M50 15V25M65 15V25M35 75V85M50 75V85M65 75V85" stroke="#191B1E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="12" fill="#D36B4D" />
          <path d="M38 50H62" stroke="#F5F3ED" strokeWidth="2" />
        </svg>
      );
    case 'amos-frank':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="45" cy="45" r="32" stroke="#191B1E" strokeWidth="2.5" />
          <rect x="40" y="30" width="42" height="48" stroke="#D36B4D" strokeWidth="2" />
          <path d="M20 78L80 22" stroke="#191B1E" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="65" cy="40" r="6" fill="#D36B4D" />
        </svg>
      );
    case 'trinity-prayer-house':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 80V45C20 28 34 16 50 16C66 16 80 28 80 45V80" stroke="#191B1E" strokeWidth="2" />
          <path d="M35 80V50C35 42 42 36 50 36C58 36 65 42 65 50V80" stroke="#D36B4D" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M50 16V80" stroke="#E6E2D9" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="5" fill="#D36B4D" />
        </svg>
      );
    case 'keba-studio':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M50 18L82 36V72L50 90L18 72V36L50 18Z" stroke="#191B1E" strokeWidth="2" />
          <path d="M50 18V54M50 54L18 36M50 54L82 36M50 54V90" stroke="#191B1E" strokeWidth="2" />
          <polygon points="50,18 82,36 50,54 18,36" fill="#D36B4D" opacity="0.3" />
          <circle cx="50" cy="54" r="6" fill="#D36B4D" />
        </svg>
      );
    case 'smoke-haus':
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="36" stroke="#191B1E" strokeWidth="2" />
          <path d="M35 65C35 65 40 45 50 30C60 45 65 65 65 65C65 72 58 75 50 75C42 75 35 72 35 65Z" fill="#D36B4D" stroke="#191B1E" strokeWidth="2" />
          <circle cx="50" cy="55" r="4" fill="#F5F3ED" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="20" y="20" width="60" height="60" stroke="#191B1E" strokeWidth="2" />
          <circle cx="50" cy="50" r="14" fill="#D36B4D" />
        </svg>
      );
  }
}

/**
 * Section 07: Selected Work showcase with interactive filtering and status indicators.
 */
export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categoryKey === activeFilter);

  return (
    <section id="work" className="section-pad bg-[#F5F3ED] border-b border-[#E6E2D9]">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Portfolio & Systems"
          title="Engineered solutions across complex domains."
          description="A selection of commercial, prototype, and research architectures demonstrating technical rigor and domain adaptation."
        />

        {/* Filter Pills */}
        <div
          role="toolbar"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6"
        >
          {WORK_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`font-mono text-xs min-h-[44px] min-w-[44px] justify-center px-5 py-2.5 inline-flex items-center rounded-full border transition-all duration-300 uppercase tracking-wider cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D] ${
                  isActive
                    ? 'bg-[#191B1E] text-[#F5F3ED] border-[#191B1E]'
                    : 'bg-transparent text-[#191B1E] border-[#191B1E]/30 hover:border-[#191B1E]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const statusColor =
              project.status === 'Commercial'
                ? 'bg-[#D36B4D] text-[#191B1E]'
                : project.status === 'Prototype'
                ? 'bg-[#DCE3DD] text-[#191B1E]'
                : project.status === 'Academic'
                ? 'bg-[#E6E2D9] text-[#191B1E]'
                : 'bg-[#F5F3ED] text-[#191B1E] border border-[#191B1E]/20';

            return (
              <Reveal key={project.id} delayIndex={idx % 3}>
                <article
                  className="group flex flex-col justify-between border border-[#E6E2D9] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#191B1E] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(25,27,30,0.08)] h-full"
                >
                  {/* 16:10 Abstract Frame */}
                  <div className="relative aspect-[16/10] bg-[#E6E2D9]/40 overflow-hidden flex items-center justify-center border-b border-[#E6E2D9]">
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${statusColor}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Unique Bespoke Geometric Artwork per Project */}
                    <div className="w-1/2 aspect-square flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-108">
                      <ProjectArtwork slug={project.slug} />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-mono text-xs text-[#9B3F27] uppercase tracking-wider block mb-2 font-semibold">
                        {project.category}
                      </span>

                      <h3 className="font-space text-xl sm:text-2xl font-semibold text-[#191B1E] tracking-tight mb-3 group-hover:text-[#D36B4D] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#52534E] leading-relaxed mb-6">
                        {project.summary}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6E2D9] mb-4">
                        {project.stack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[11px] px-2 py-0.5 bg-[#F5F3ED] text-[#191B1E] border border-[#E6E2D9]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#191B1E] hover:text-[#9B3F27] transition-colors min-h-[44px] py-2"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>

                        {(project.links?.live || project.links?.repo) && (
                          <a
                            href={project.links?.live || project.links?.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-[#52534E] hover:text-[#9B3F27] underline underline-offset-2 transition-colors min-h-[44px] py-2"
                          >
                            <span>{project.links?.live ? 'Live App' : 'Repository'}</span>
                            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

