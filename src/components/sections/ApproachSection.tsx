'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APPROACH_STAGES } from '@/content/approach';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Section 05: The Studio Approach timeline on Soft Sand background.
 * Horizontal progress on desktop, vertical on mobile.
 */
export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(prefersReduced ? 100 : 0);

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.75;
      const total = rect.height + windowHeight * 0.2;
      const current = start - rect.top;

      const progress = Math.max(0, Math.min(100, (current / total) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReduced]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-pad bg-[#E6E2D9] border-b border-[#191B1E]/15"
    >
      <Container>
        <SectionHeading
          index="05 // 11"
          eyebrow="The Studio Method"
          title="Engineering by deliberate design, not assumption."
          description="A four-stage methodology forged through production systems to eliminate risk and ensure technical longevity."
        />

        {/* Timeline Container */}
        <div className="relative mt-16 sm:mt-24 pt-8">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] bg-[#191B1E]/15">
            <div
              className="h-full bg-[#D36B4D] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* 4 Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {APPROACH_STAGES.map((stage, idx) => {
              const stageThreshold = (idx + 0.5) * 25;
              const isActive = prefersReduced || scrollProgress >= stageThreshold;

              return (
                <div key={stage.number} className="relative flex flex-col justify-between">
                  {/* Stage Diamond Indicator */}
                  <div
                    aria-hidden="true"
                    className={`hidden lg:block absolute -top-[39px] left-0 w-3.5 h-3.5 rotate-45 border-2 transition-colors duration-400 ${
                      isActive
                        ? 'bg-[#D36B4D] border-[#D36B4D]'
                        : 'bg-[#F5F3ED] border-[#191B1E]'
                    }`}
                  />

                  <div>
                    {/* Oversized Outlined Numeral */}
                    <div
                      className="font-space text-6xl sm:text-7xl font-bold leading-none select-none text-transparent mb-4"
                      style={{
                        WebkitTextStroke: '1px #191B1E',
                      }}
                    >
                      {stage.number}
                    </div>

                    <h3 className="font-space text-2xl font-semibold text-[#191B1E] mb-2 tracking-tight">
                      {stage.name}
                    </h3>

                    <p className="font-mono text-xs text-[#9B3F27] uppercase tracking-wider mb-4 font-semibold">
                      {stage.tagline}
                    </p>

                    <p className="text-[#555650] text-sm leading-relaxed mb-6">
                      {stage.description}
                    </p>
                  </div>

                  {/* Activity tags */}
                  <ul className="space-y-1.5 pt-4 border-t border-[#191B1E]/15 text-xs font-mono text-[#191B1E]/80">
                    {stage.activities.map((act, aIdx) => (
                      <li key={act} className="flex items-center gap-2">
                        <span className="text-[#9B3F27]">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
