'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES } from '@/content/services';
import { ArrowUpRight, Plus } from 'lucide-react';

/**
 * Section 04: Editorial Services list with interactive single-open accordion rows.
 */
export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First service open by default

  const toggleRow = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="section-pad bg-[#F5F3ED] border-b border-[#E6E2D9]">
      <Container>
        <SectionHeading
          index="04 // 11"
          eyebrow="Capabilities & Disciplines"
          title="Architectural capabilities engineered for scale."
          description="Six focused core disciplines spanning low-level system design, edge AI inference, and bespoke web platforms."
        />

        {/* Numbered Rows List */}
        <div className="border-t border-[#191B1E] divide-y divide-[#E6E2D9]">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={service.id}
                className="group relative transition-colors duration-300 hover:bg-[#E6E2D9]/30"
              >
                {/* Header button */}
                <button
                  type="button"
                  onClick={() => toggleRow(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  className="w-full text-left py-7 sm:py-9 flex items-center justify-between gap-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
                >
                  <div className="flex items-center gap-6 sm:gap-12 md:gap-16">
                    <span className="font-mono text-sm sm:text-base font-semibold text-[#D36B4D]">
                      {service.number}
                    </span>
                    <h3 className="font-space text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#191B1E] transition-transform duration-300 ease-out group-hover:translate-x-3">
                      {service.title}
                    </h3>
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`w-9 h-9 sm:w-10 sm:h-10 border border-[#191B1E] flex items-center justify-center text-[#191B1E] transition-transform duration-300 ${
                        isOpen ? 'rotate-45 bg-[#191B1E] text-[#F5F3ED]' : 'rotate-0'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </div>
                </button>

                {/* Expandable Content Area */}
                <div
                  id={`service-panel-${service.id}`}
                  role="region"
                  aria-label={`${service.title} capabilities`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0">
                    <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pl-12 sm:pl-20 md:pl-28">
                      {/* Left: Description & Link */}
                      <div className="md:col-span-6 pr-4">
                        <p className="text-base sm:text-lg text-[#6B6C67] leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#191B1E] font-medium border-b border-[#191B1E] pb-1 hover:text-[#D36B4D] hover:border-[#D36B4D] transition-colors"
                        >
                          <span>Explore Service In-Depth</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Right: Key Deliverables List */}
                      <div className="md:col-span-6">
                        <span className="font-mono text-xs text-[#92938D] uppercase tracking-wider block mb-4">
                          Key Capabilities
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#191B1E]">
                          {service.capabilities.map((cap, capIdx) => (
                            <li key={capIdx} className="flex items-center gap-2">
                              <span className="text-[#D36B4D] font-mono" aria-hidden="true">
                                →
                              </span>
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

