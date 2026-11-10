import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHY_OFFSCRIPT } from '@/content/why';

/**
 * Section 08: Why OFFSCRIPT studio principles with oversized numerals and offset two-column rhythm.
 */
export function WhySection() {
  return (
    <section className="section-pad bg-[#F5F3ED] border-b border-[#E6E2D9]">
      <Container>
        <SectionHeading
          index="08"
          eyebrow="Why OFFSCRIPT"
          title="Engineered differently by conviction."
          description="We founded this studio to restore engineering depth, accountability, and aesthetic rigor to digital solution development."
        />

        {/* 2-Column Offset Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8 mt-6 sm:mt-8">
          {WHY_OFFSCRIPT.map((pillar, idx) => {
            const isOffset = idx % 2 === 1;

            return (
              <div
                key={pillar.number}
                className={`border-t border-[#191B1E] pt-6 flex flex-col justify-between ${
                  isOffset ? 'md:mt-6' : ''
                }`}
              >
                <div>
                  {/* Oversized Terracotta Numeral */}
                  <span className="font-space text-7xl sm:text-8xl lg:text-9xl font-bold tracking-[-0.06em] text-[#D36B4D] leading-[0.88] block mb-4 select-none">
                    {pillar.number}
                  </span>

                  <h3 className="font-space text-2xl sm:text-3xl font-semibold tracking-tight text-[#191B1E] mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-mono text-xs text-[#52534E] uppercase tracking-wider mb-4 font-semibold">
                    {pillar.tagline}
                  </p>

                  <p className="text-base sm:text-lg text-[#52534E] leading-relaxed max-w-md">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

