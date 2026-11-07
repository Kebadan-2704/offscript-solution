import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/content/services';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services & Engineering Disciplines — OFFSCRIPT SOLUTION',
  description:
    'Six foundational engineering disciplines designed for performance, resilience, and operational clarity. Bespoke software, intelligent systems, and scalable cloud platforms.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/services`,
  },
  openGraph: {
    title: 'Services & Engineering Disciplines — OFFSCRIPT SOLUTION',
    description:
      'Six foundational engineering disciplines designed for performance, resilience, and operational clarity.',
    url: `${SITE_CONFIG.url}/services`,
    type: 'website',
  },
};

export default function ServicesPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OFFSCRIPT SOLUTION Engineering Disciplines',
    description:
      'Architectural specifications and engineering services offered by OFFSCRIPT SOLUTION.',
    url: `${SITE_CONFIG.url}/services`,
    hasPart: SERVICES.map((s) => ({
      '@type': 'Service',
      name: s.title,
      description: s.tagline,
      url: `${SITE_CONFIG.url}/services/${s.slug}`,
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
        name: 'Services',
        item: `${SITE_CONFIG.url}/services`,
      },
    ],
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Structured JSON-LD Metadata */}
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
          index="01 // 06"
          eyebrow="Studio Capabilities & Disciplines"
          title={
            <>
              Engineered for resilience<span className="text-[#D36B4D]">.</span> Built without compromises<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="We do not resell white-label templates or configure off-the-shelf plugins. Every engagement is engineered from architectural first principles to solve concrete operational bottlenecks."
        />

        {/* Large Editorial Services Index Rows */}
        <div className="mt-14 sm:mt-20 divide-y divide-[#E6E2D9] border-y border-[#E6E2D9]">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group hover:bg-white/60 transition-colors duration-300 -mx-4 sm:-mx-8 px-4 sm:px-8"
            >
              {/* Col 1: Discipline Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-base font-semibold text-[#D36B4D]">
                  {service.number} {'//'} 06
                </span>
              </div>

              {/* Col 2: Title & Tagline */}
              <div className="lg:col-span-5 pr-4">
                <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#191B1E] group-hover:text-[#D36B4D] transition-colors mb-4">
                  <Link href={`/services/${service.slug}`} className="focus-visible:outline-hidden">
                    {service.title}
                  </Link>
                </h2>
                <p className="text-base sm:text-lg text-[#6B6C67] leading-relaxed mb-6 font-normal">
                  {service.tagline}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-1 bg-white border border-[#E6E2D9] text-[#191B1E]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 3: Key Capabilities Preview */}
              <div className="lg:col-span-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#92938D] block mb-3 font-semibold">
                  Core Specializations
                </span>
                <ul className="space-y-2 text-sm text-[#191B1E]">
                  {service.capabilities.slice(0, 4).map((cap, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#D36B4D] font-mono text-xs" aria-hidden="true">
                        →
                      </span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: Action Link */}
              <div className="lg:col-span-2 flex justify-start lg:justify-end items-center pt-4 lg:pt-0">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#191B1E] group-hover:text-[#D36B4D] border-b border-[#191B1E] group-hover:border-[#D36B4D] pb-1 transition-all"
                >
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Studio Engineering Discipline Pillars */}
        <section aria-labelledby="pillars-heading" className="mt-20 sm:mt-28 pt-16 border-t border-[#E6E2D9]">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <h2
              id="pillars-heading"
              className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
            >
              The Studio Standard
            </h2>
          </div>

          <h3 className="font-space text-3xl sm:text-5xl font-semibold tracking-tight text-[#191B1E] max-w-3xl mb-12">
            How we approach every architectural vertical.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs text-[#D36B4D] block mb-3 font-semibold">
                PILLAR // 01
              </span>
              <h4 className="font-space text-xl font-semibold text-[#191B1E] mb-2">
                Zero White-Label Code
              </h4>
              <p className="text-sm text-[#6B6C67] leading-relaxed">
                We write purpose-built software architectures without generic plugins or brittle dependency bloat.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs text-[#D36B4D] block mb-3 font-semibold">
                PILLAR // 02
              </span>
              <h4 className="font-space text-xl font-semibold text-[#191B1E] mb-2">
                Strict Typing & Testing
              </h4>
              <p className="text-sm text-[#6B6C67] leading-relaxed">
                Deterministic static analysis, contract testing, and regression suites block regressions before deployment.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs text-[#D36B4D] block mb-3 font-semibold">
                PILLAR // 03
              </span>
              <h4 className="font-space text-xl font-semibold text-[#191B1E] mb-2">
                Speed as a Feature
              </h4>
              <p className="text-sm text-[#6B6C67] leading-relaxed">
                Sub-second rendering, 60fps animations, and optimized query execution are mandatory benchmarks.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs text-[#D36B4D] block mb-3 font-semibold">
                PILLAR // 04
              </span>
              <h4 className="font-space text-xl font-semibold text-[#191B1E] mb-2">
                Full Client Sovereignty
              </h4>
              <p className="text-sm text-[#6B6C67] leading-relaxed">
                100% code ownership and deployment directly into your own cloud accounts with zero vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Global Consultation CTA */}
        <section aria-labelledby="cta-heading" className="mt-20 sm:mt-28 p-10 sm:p-16 bg-[#191B1E] text-[#F5F3ED] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-3 font-semibold">
              Direct Engineering Engagement
            </span>
            <h3
              id="cta-heading"
              className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3ED] mb-4"
            >
              Have a technical challenge in mind?
            </h3>
            <p className="text-base text-[#E6E2D9]/80 font-normal leading-relaxed">
              We discuss real architecture, technical trade-offs, and timeline boundaries from the first conversation.
            </p>
          </div>

          <div className="shrink-0">
            <Button href="/contact" variant="primary">
              <span>Initiate Project Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
