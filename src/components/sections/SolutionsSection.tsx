'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SOLUTIONS } from '@/content/solutions';
import { ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from '@/components/animations/SpotlightCard';

/**
 * Geometric glyph icon component for solution tiles.
 */
function SolutionGlyph({ strokeColor = '#D36B4D' }: { strokeColor?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:rotate-12 group-hover:scale-105"
    >
      <path d="M20 30h50l-12 16H8z" fill={strokeColor} opacity="0.85" />
      <path
        d="M42 54h46a14 14 0 0 1 0 28H30"
        stroke={strokeColor}
        strokeWidth="9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Section 06: Asymmetric 12-column solutions architecture showcase with React Bits Spotlight illumination.
 */
export function SolutionsSection() {
  return (
    <section id="solutions" className="section-pad bg-[#F5F3ED] border-b border-[#E6E2D9]">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Custom Architectures"
          title="Engineered solutions for mission-critical software."
          description="Six architectural models solving high-concurrency, edge-inference, and bespoke platform challenges."
        />

        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 mt-6 sm:mt-8">
          {SOLUTIONS.map((item) => {
            const isInk = item.bgTheme === 'ink';
            const isSage = item.bgTheme === 'sage';
            const isSand = item.bgTheme === 'sand';

            let cardBg = 'bg-[#F5F3ED] text-[#191B1E] border-[#E6E2D9]';
            let glyphColor = '#D36B4D';
            let spotlight = 'rgba(211, 107, 77, 0.08)';

            if (isInk) {
              cardBg = 'bg-[#191B1E] text-[#F5F3ED] border-[#191B1E]';
              glyphColor = '#D36B4D';
              spotlight = 'rgba(211, 107, 77, 0.18)';
            } else if (isSage) {
              cardBg = 'bg-[#DCE3DD] text-[#191B1E] border-[#191B1E]/15';
              glyphColor = '#191B1E';
              spotlight = 'rgba(25, 27, 30, 0.08)';
            } else if (isSand) {
              cardBg = 'bg-[#E6E2D9] text-[#191B1E] border-[#191B1E]/15';
              glyphColor = '#D36B4D';
              spotlight = 'rgba(211, 107, 77, 0.10)';
            }

            return (
              <SpotlightCard
                key={item.id}
                spotlightColor={spotlight}
                className={`group relative p-8 sm:p-10 border flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[6px_6px_0px_#191B1E] hover:border-[#191B1E] min-h-[360px] ${cardBg} ${item.colSpan}`}
              >
                {/* Background Rotating Decorative Glyph (Sent strictly to z-0 background with subtle opacity) */}
                <div className="absolute -top-6 -right-6 pointer-events-none z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                  <SolutionGlyph strokeColor={glyphColor} />
                </div>

                {/* Top: Category & Concept Tag */}
                <div className="relative z-10 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                    <span
                      className={`font-mono text-xs font-semibold tracking-wider uppercase ${
                        isInk ? 'text-[#D36B4D]' : 'text-[#9B3F27]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 border ${
                        isInk
                          ? 'border-[#E6E2D9]/30 text-[#E6E2D9]'
                          : 'border-[#191B1E]/30 text-[#191B1E]'
                      }`}
                    >
                      {item.conceptLabel}
                    </span>
                  </div>

                  <h3 className="font-space text-2xl sm:text-3xl font-semibold tracking-tight leading-snug max-w-lg mb-4 break-words">
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base max-w-md leading-relaxed ${
                      isInk
                        ? 'text-[#E6E2D9]/90'
                        : isSage || isSand
                        ? 'text-[#2D2E2B]'
                        : 'text-[#52534E]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Action Trigger */}
                <div className="relative z-10 pt-8 mt-auto">
                  <Link
                    href="/solutions"
                    className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-medium border-b py-2 min-h-[44px] transition-colors ${
                      isInk
                        ? 'border-[#F5F3ED] text-[#F5F3ED] hover:text-[#D36B4D] hover:border-[#D36B4D]'
                        : 'border-[#191B1E] text-[#191B1E] hover:text-[#9B3F27] hover:border-[#9B3F27]'
                    }`}
                  >
                    <span>View Architecture Approach</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
