'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS, WORK_FILTERS } from '@/content/work';
import { ArrowUpRight } from 'lucide-react';

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
          index="07 // 11"
          eyebrow="Portfolio & Systems"
          title="Engineered solutions across complex domains."
          description="A selection of commercial, prototype, and research architectures demonstrating technical rigor and domain adaptation."
        />

        {/* Filter Pills */}
        <div
          role="toolbar"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12"
        >
          {WORK_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-300 uppercase tracking-wider cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D] ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <article
                key={project.id}
                className="group flex flex-col justify-between border border-[#E6E2D9] bg-white transition-all duration-300 hover:border-[#191B1E] hover:shadow-xs"
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

                  {/* Geometric art placeholder */}
                  <div className="w-1/2 aspect-square flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-105">
                    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full stroke-[#191B1E]">
                      <rect
                        x="10"
                        y="10"
                        width="60"
                        height="60"
                        strokeWidth="2"
                        strokeDasharray={idx % 2 === 0 ? '4 4' : 'none'}
                      />
                      <path d="M10 70L70 10" strokeWidth="2" />
                      <circle cx="40" cy="40" r="14" fill="#D36B4D" opacity="0.85" />
                    </svg>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-xs text-[#D36B4D] uppercase tracking-wider block mb-2 font-medium">
                      {project.category}
                    </span>

                    <h3 className="font-space text-xl sm:text-2xl font-semibold text-[#191B1E] tracking-tight mb-3 group-hover:text-[#D36B4D] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#6B6C67] leading-relaxed mb-6">
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

                    <Link
                      href={`/work`}
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#191B1E] hover:text-[#D36B4D] transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Placeholder review notice banner per PART 6.5 & PART 11 */}
        <div className="mt-12 p-4 border-l-2 border-[#D36B4D] bg-[#E6E2D9]/40 font-mono text-xs text-[#6B6C67]">
          [Review Note]: Sample project architecture concepts. Replace with verified commercial case
          studies via <code className="text-[#191B1E]">src/content/work.ts</code> before public
          launch.
        </div>
      </Container>
    </section>
  );
}

