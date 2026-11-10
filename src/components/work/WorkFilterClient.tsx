'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, WORK_FILTERS, STATUS_FILTERS } from '@/content/work';

export function WorkFilterClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  const filtered = PROJECTS.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' || p.categoryKey === activeCategory;
    const matchesStatus =
      activeStatus === 'all' || p.status === activeStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div>
      {/* Filter Controls Toolbar */}
      <div className="space-y-6 mb-12 sm:mb-16">
        {/* Category Filters */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#52534E] block mb-3 font-semibold">
            Filter By Discipline
          </span>
          <div
            role="toolbar"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {WORK_FILTERS.map((f) => {
              const isActive = activeCategory === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(f.key)}
                  className={`font-mono text-xs min-h-[44px] min-w-[44px] justify-center px-5 py-2.5 inline-flex items-center border rounded-full transition-all duration-300 uppercase tracking-wider cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D] ${
                    isActive
                      ? 'bg-[#191B1E] text-[#F5F3ED] border-[#191B1E]'
                      : 'bg-white text-[#191B1E] border-[#E6E2D9] hover:border-[#191B1E]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Filters */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#52534E] block mb-3 font-semibold">
            Filter By Status
          </span>
          <div
            role="toolbar"
            aria-label="Filter projects by development status"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {STATUS_FILTERS.map((f) => {
              const isActive = activeStatus === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveStatus(f.key)}
                  className={`font-mono text-xs min-h-[44px] min-w-[44px] justify-center px-4 py-2.5 inline-flex items-center border transition-all duration-300 uppercase tracking-wider cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D] ${
                    isActive
                      ? 'bg-[#D36B4D] text-[#191B1E] border-[#D36B4D] font-bold'
                      : 'bg-transparent text-[#6B6C67] border-[#E6E2D9] hover:border-[#191B1E] hover:text-[#191B1E]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, idx) => {
          const statusBg =
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
              data-project-card="true"
              className="group flex flex-col justify-between border border-[#E6E2D9] bg-white transition-all duration-300 hover:border-[#191B1E] hover:shadow-xs"
            >
              {/* 16:10 Frame Thumbnail */}
              <div className="relative aspect-[16/10] bg-[#E6E2D9]/40 border-b border-[#E6E2D9] overflow-hidden flex items-center justify-center">
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${statusBg}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Placeholder Ribbon if placeholder */}
                {project.placeholder && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#191B1E] text-[#F5F3ED]">
                      Archived / Concept
                    </span>
                  </div>
                )}

                {/* Abstract Geometric Art Frame */}
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

              {/* Project Card Meta & Summary */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <span className="font-mono text-xs text-[#D36B4D] uppercase tracking-wider block mb-2 font-semibold">
                    {project.category}
                  </span>

                  <h3 className="font-space text-2xl font-bold text-[#191B1E] tracking-tight mb-3 group-hover:text-[#D36B4D] transition-colors leading-snug">
                    <Link href={`/work/${project.slug}`} className="focus-visible:outline-hidden">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#6B6C67] leading-relaxed mb-6 font-normal">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6E2D9] mb-4">
                    {project.stack.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] px-2 py-0.5 bg-[#F5F3ED] text-[#191B1E] border border-[#E6E2D9]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#191B1E] hover:text-[#9B3F27] transition-colors min-h-[44px] py-2"
                  >
                    <span>View Architectural Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center border border-[#E6E2D9] bg-white my-8">
          <p className="font-space text-lg text-[#191B1E] mb-2">
            No projects match the active filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setActiveStatus('all');
            }}
            className="font-mono text-xs text-[#D36B4D] uppercase font-semibold underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

