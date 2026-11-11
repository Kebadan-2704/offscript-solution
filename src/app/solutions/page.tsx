import type { Metadata } from 'next';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SOLUTION_GROUPS, FOUR_STAGE_APPROACH } from '@/content/solutions';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Custom Architecture Solutions',
  description:
    'Six custom architectural solution domains: AI-Powered Products, SaaS Applications, Intelligent Business Automation, Custom Enterprise Platforms, IoT & Connected Systems, and Digital Product Engineering.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/solutions`,
  },
  openGraph: {
    title: 'Custom Architecture Solutions — OFFSCRIPT SOLUTION',
    description:
      'Six custom architectural solution domains engineered for mission-critical software.',
    url: `${SITE_CONFIG.url}/solutions`,
    type: 'website',
  },
};

export default function SolutionsPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OFFSCRIPT SOLUTION Architecture Models',
    description:
      'Custom architectural solutions engineered for mission-critical operations.',
    url: `${SITE_CONFIG.url}/solutions`,
    hasPart: SOLUTION_GROUPS.map((s) => ({
      '@type': 'Product',
      name: s.category,
      description: s.whatItIs,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: `${SITE_CONFIG.url}/solutions`,
      },
    ],
  };

  return (
    <div className="pt-24 sm:pt-28 pb-10 sm:pb-12 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Schema.org Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* Editorial Section Heading */}
        <SectionHeading
          as="h1"
          index="01"
          eyebrow="Architectural Solutions"
          title={
            <>
              Purpose-built solutions<span className="text-[#D36B4D]">.</span> Designed around hard problems<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="Six specialized solution architectures developed for teams where off-the-shelf software and generic SaaS tools hit architectural limits."
        />

        {/* 6 Solution Groups Showcase */}
        <div className="space-y-16 sm:space-y-24 mt-16 sm:mt-24">
          {SOLUTION_GROUPS.map((solution, idx) => {
            const isDark = solution.bgTheme === 'ink';
            const isSage = solution.bgTheme === 'sage';
            const isSand = solution.bgTheme === 'sand';

            let cardBg = 'bg-white border-[#E6E2D9] text-[#191B1E]';
            if (isDark) {
              cardBg = 'bg-[#191B1E] border-[#191B1E] text-[#F5F3ED]';
            } else if (isSage) {
              cardBg = 'bg-[#DCE3DD] border-[#191B1E]/15 text-[#191B1E]';
            } else if (isSand) {
              cardBg = 'bg-[#E6E2D9] border-[#191B1E]/15 text-[#191B1E]';
            }

            return (
              <section
                key={solution.id}
                id={solution.slug}
                aria-labelledby={`solution-heading-${solution.id}`}
                className={`p-8 sm:p-12 lg:p-16 border ${cardBg} transition-all duration-300`}
              >
                {/* Header Row: Category Badge & Index */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold">
                      0{idx + 1} · {solution.category}
                    </span>
                    <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
                  </div>
                  <span
                    className={`font-mono text-[11px] px-2.5 py-1 border ${
                      isDark
                        ? 'border-white/20 text-[#E6E2D9]'
                        : 'border-[#191B1E]/20 text-[#191B1E]'
                    }`}
                  >
                    Architectural Domain
                  </span>
                </div>

                {/* Title & Tagline */}
                <h2
                  id={`solution-heading-${solution.id}`}
                  className="font-space text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight"
                >
                  {solution.title}
                </h2>
                <p
                  className={`text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mb-12 ${
                    isDark ? 'text-[#E6E2D9]/80' : 'text-[#6B6C67]'
                  }`}
                >
                  {solution.tagline}
                </p>

                {/* Deep Dive Grid: What It Is + Typical Problems + Approach */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-8 border-t border-current/15 mb-12">
                  {/* Left: What It Is & Approach */}
                  <div className="lg:col-span-6 space-y-8">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] mb-3 font-semibold">
                        What It Is
                      </h3>
                      <p
                        className={`text-base sm:text-lg leading-relaxed ${
                          isDark ? 'text-[#F5F3ED]' : 'text-[#191B1E]'
                        }`}
                      >
                        {solution.whatItIs}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] mb-3 font-semibold">
                        How OFFSCRIPT Approaches It
                      </h3>
                      <p
                        className={`text-base leading-relaxed ${
                          isDark ? 'text-[#E6E2D9]/90' : 'text-[#6B6C67]'
                        }`}
                      >
                        {solution.howOffscriptApproachesIt}
                      </p>
                    </div>
                  </div>

                  {/* Right: Typical Problems Addressed */}
                  <div className="lg:col-span-6">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] mb-4 font-semibold">
                      Typical Operational Bottlenecks
                    </h3>
                    <ul className="space-y-3">
                      {solution.typicalProblems.map((prob, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-3 text-sm sm:text-base leading-relaxed"
                        >
                          <span className="text-[#D36B4D] font-mono text-sm mt-0.5" aria-hidden="true">
                            —
                          </span>
                          <span className={isDark ? 'text-[#E6E2D9]/90' : 'text-[#191B1E]'}>
                            {prob}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example Concepts (Labelled Concept) */}
                <div className="pt-8 border-t border-current/15">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] mb-6 font-semibold">
                    Representative Solution Architectures
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solution.exampleConcepts.map((concept, cIdx) => (
                      <div
                        key={cIdx}
                        className={`p-6 border flex flex-col justify-between ${
                          isDark
                            ? 'bg-white/5 border-white/10'
                            : 'bg-white border-[#E6E2D9]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <h4
                              className={`font-space text-xl font-semibold ${
                                isDark ? 'text-[#F5F3ED]' : 'text-[#191B1E]'
                              }`}
                            >
                              {concept.title}
                            </h4>
                            <span className="font-mono text-[10px] px-2 py-0.5 bg-[#D36B4D] text-[#191B1E] uppercase font-semibold">
                              {concept.label}
                            </span>
                          </div>

                          <p
                            className={`text-sm leading-relaxed mb-6 ${
                              isDark ? 'text-[#E6E2D9]/80' : 'text-[#6B6C67]'
                            }`}
                          >
                            {concept.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-current/10">
                          {concept.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`font-mono text-[11px] px-2 py-0.5 border ${
                                isDark
                                  ? 'border-white/15 text-[#E6E2D9]'
                                  : 'border-[#E6E2D9] text-[#191B1E] bg-[#F5F3ED]'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* 4-Stage Method Section: "How We Approach Custom Solution Development" */}
        <section
          aria-labelledby="method-heading"
          className="mt-24 sm:mt-36 p-8 sm:p-14 lg:p-20 bg-white border border-[#E6E2D9]"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <h2
              id="method-heading"
              className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
            >
              The Studio Methodology
            </h2>
          </div>

          <h3 className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#191B1E] max-w-3xl mb-4 leading-tight">
            How we approach custom solution engineering.
          </h3>
          <p className="text-lg text-[#6B6C67] max-w-2xl leading-relaxed mb-16 font-normal">
            A disciplined four-stage pipeline that deconstructs physical operational constraints before committing a single line of production code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FOUR_STAGE_APPROACH.map((stage) => (
              <div
                key={stage.stage}
                className="flex flex-col justify-between p-6 sm:p-8 bg-[#F5F3ED] border border-[#E6E2D9]"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-[#D36B4D] block mb-3">
                    STAGE {stage.stage}
                  </span>
                  <h4 className="font-space text-2xl font-bold text-[#191B1E] mb-2">
                    {stage.name}
                  </h4>
                  <p className="font-mono text-xs text-[#D36B4D] mb-4 font-medium">
                    {stage.tagline}
                  </p>
                  <p className="text-sm text-[#6B6C67] leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E2D9]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#52534E] block mb-2 font-semibold">
                    Key Artifacts:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#191B1E]">
                    {stage.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#D36B4D] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Consultation CTA */}
        <section
          aria-labelledby="cta-heading"
          className="mt-20 sm:mt-28 p-10 sm:p-16 bg-[#191B1E] text-[#F5F3ED] flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[#191B1E]"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-3 font-semibold">
              Explore A Custom Architecture
            </span>
            <h3
              id="cta-heading"
              className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3ED] mb-4"
            >
              Bring us your most challenging operational problem.
            </h3>
            <p className="text-base text-[#E6E2D9]/80 font-normal leading-relaxed">
              We discuss technical feasibility, concurrency limits, and data sovereignty directly with our engineering principals.
            </p>
          </div>

          <div className="shrink-0">
            <Button href="/contact" variant="primary">
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
