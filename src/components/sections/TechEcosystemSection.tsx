import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TECH_ECOSYSTEM } from '@/content/tech';

/**
 * Section 09: Technology Ecosystem on Muted Sage surface with restrained mono tags.
 */
export function TechEcosystemSection() {
  return (
    <section className="section-pad bg-[#DCE3DD] border-b border-[#191B1E]/15">
      <Container>
        <SectionHeading
          index="09 // 11"
          eyebrow="Technology Ecosystem"
          title="Battle-tested stacks engineered for production."
          description="We select foundational languages and battle-tested frameworks based on execution speed, concurrency, and long-term maintainability."
          descriptionClassName="text-[#191B1E]/90"
        />

        {/* 3-Column Technology Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mt-12 sm:mt-16">
          {Object.entries(TECH_ECOSYSTEM).map(([category, tags]) => (
            <div key={category} className="border-t border-[#191B1E]/20 pt-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#191B1E]/80 mb-5 font-semibold">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs font-medium px-3.5 py-1.5 border border-[#191B1E] bg-transparent text-[#191B1E] transition-all duration-300 hover:bg-[#191B1E] hover:text-[#F5F3ED] hover:-translate-y-1 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[#191B1E]/15 font-mono text-xs text-[#191B1E]/85">
          [Architecture Note]: Technology selection is driven by workload constraints. Custom
          specializations evaluated per engagement.
        </div>
      </Container>
    </section>
  );
}

