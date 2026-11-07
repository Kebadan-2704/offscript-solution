import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X, Shield, Cpu, Scale, Lock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'About the Studio — Engineered Differently — OFFSCRIPT SOLUTION',
  description:
    'An independent technology studio engineering mission-critical software, applied AI, and cloud infrastructure with zero middleman overhead.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: 'About OFFSCRIPT SOLUTION — Engineered Differently',
    description:
      'An independent technology studio engineering mission-critical software, applied AI, and cloud infrastructure with zero middleman overhead.',
    url: `${SITE_CONFIG.url}/about`,
    type: 'website',
  },
};

const OPERATIONAL_COMPARISON = [
  {
    dimension: 'Project Leadership',
    agency: 'Non-technical account managers and sales intermediaries relay messages with loss of fidelity.',
    offscript: 'Direct collaboration with principal systems architects who write and review production code.',
  },
  {
    dimension: 'Team Composition',
    agency: 'Senior partners pitch the contract; implementation is immediately delegated to rotating junior staff.',
    offscript: 'Senior-only execution teams. Every engineer on your build has 8+ years of production experience.',
  },
  {
    dimension: 'Architecture Strategy',
    agency: 'Cobbling together brittle third-party SaaS plugins and heavy off-the-shelf templates.',
    offscript: 'Bespoke, zero-fat architecture engineered specifically for your domain constraints and throughput.',
  },
  {
    dimension: 'Commercial Integrity',
    agency: 'Incentivized to prolong hours, create vendor dependencies, and bill for redundant rework.',
    offscript: 'Fixed architectural scope, deterministic sprint milestones, and 100% intellectual property transfer.',
  },
];

const CORE_PRINCIPLES = [
  {
    icon: Scale,
    title: 'Disciplined Refactoring Over Greenfield Rebuilds',
    text: 'We reject the knee-jerk impulse to rewrite legacy systems from scratch. Greenfield rebuilds routinely run over budget and fail to reproduce edge-case behaviors. We decouple monoliths incrementally using strangler patterns, branch-by-abstraction, and contract testing.',
  },
  {
    icon: Cpu,
    title: 'Zero-Fat Infrastructure & Lean Compute',
    text: 'Modern cloud architectures have become needlessly bloated. We benchmark latency, memory profiles, and CPU utilization obsessively. We deliver sub-millisecond edge inference and right-sized compute that reduces monthly cloud spend rather than inflating it.',
  },
  {
    icon: Shield,
    title: 'Empirical Telemetry Over Speculative Claims',
    text: 'We never fabricate metrics, client rosters, or performance results. If an architecture is a concept prototype, it is explicitly labelled as such. When systems run in production, our telemetry is mathematically verified through real load tests and APM traces.',
  },
  {
    icon: Lock,
    title: 'Absolute Data Sovereignty & Zero Vendor Lock-in',
    text: 'You own 100% of your source code, infrastructure as code (IaC), deployment pipelines, and trained model weights upon completion. We build open architectures that your internal teams can maintain, extend, or migrate without paying studio rents.',
  },
];

const STUDIO_FACTS = [
  { label: 'Operating Philosophy', value: 'Zero Middleman Overhead' },
  { label: 'Studio Governance', value: '100% Founder-Owned & Independent' },
  { label: 'Concurrent Mandates', value: 'Capped at 4 Active Client Builds' },
  { label: 'Execution Staff', value: 'Principal & Senior Systems Engineers Only' },
  { label: 'IP Transfer Protocol', value: '100% Full Ownership on Day 1' },
  { label: 'Response SLA', value: '< 24 Business Hours Direct Access' },
];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About OFFSCRIPT SOLUTION',
    description:
      'OFFSCRIPT SOLUTION is an independent technology studio engineering mission-critical software, applied AI, and cloud infrastructure.',
    url: `${SITE_CONFIG.url}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      alternateName: 'Offscript',
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      foundingDate: '2025',
      knowsAbout: [
        'Software Engineering',
        'Artificial Intelligence',
        'Cloud Infrastructure',
        'Intelligent Automation',
        'Web and Mobile Development',
        'UI/UX Design',
      ],
    },
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
        name: 'About Studio',
        item: `${SITE_CONFIG.url}/about`,
      },
    ],
  };

  return (
    <div className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Schema.org Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* Section 1: Hero & Philosophy */}
        <SectionHeading
          index="01 // 04"
          eyebrow="Studio Philosophy"
          title={
            <>
              Question the Default<span className="text-[#D36B4D]">.</span> Engineer Differently<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="We founded OFFSCRIPT SOLUTION because the digital technology sector has become complacent: bloated agencies selling pre-baked templates, enterprise consultancies billing for non-technical managers, and artificial complexity that drives up client costs."
        />

        {/* Narrative Essay Card */}
        <section aria-labelledby="origin-narrative" className="mb-20 sm:mb-28">
          <div className="p-8 sm:p-14 bg-white border border-[#E6E2D9] max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold block mb-4">
              The Studio Ethos
            </span>
            <h2 id="origin-narrative" className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#191B1E] mb-6 leading-tight">
              Technology solutions engineered for resilience, not billable hours.
            </h2>
            <div className="space-y-6 font-inter text-base sm:text-lg text-[#6B6C67] leading-relaxed">
              <p>
                In a world obsessed with superficial velocity, software systems are frequently
                shipped with technical debt baked in from the first commit. Companies pay twice:
                once to build a fragile prototype, and again when it crumbles under real-world
                concurrency or security scrutiny.
              </p>
              <p>
                OFFSCRIPT SOLUTION operates as an independent, senior-only engineering studio.
                We deliberately cap our active client engagements to four concurrent mandates.
                This operational constraint allows our principal engineers to immerse themselves in
                your system topology, identify core architectural bottlenecks, and craft solutions
                that endure for years without maintenance drag.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Operational Disruption (Agency vs OFFSCRIPT) */}
        <section aria-labelledby="comparison-heading" className="mb-20 sm:mb-28 border-t border-[#E6E2D9] pt-16 sm:pt-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold block mb-3">
              Operational Model
            </span>
            <h2 id="comparison-heading" className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#191B1E] mb-4">
              Boutique Precision vs. Agency Bloat
            </h2>
            <p className="text-base sm:text-lg text-[#6B6C67]">
              How our direct-to-principal operational model eliminates communication latency and protects your capital.
            </p>
          </div>

          <div className="space-y-4">
            {OPERATIONAL_COMPARISON.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 border border-[#E6E2D9] bg-white overflow-hidden"
              >
                <div className="lg:col-span-3 p-6 sm:p-8 bg-[#F5F3ED]/40 border-b lg:border-b-0 lg:border-r border-[#E6E2D9] flex items-center">
                  <span className="font-space text-lg font-bold text-[#191B1E]">
                    {row.dimension}
                  </span>
                </div>

                <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E6E2D9] flex items-start gap-3">
                  <X className="w-5 h-5 text-[#92938D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#92938D] block mb-1.5 font-semibold">
                      Typical Agency Default
                    </span>
                    <p className="text-sm text-[#6B6C67] leading-relaxed">
                      {row.agency}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 bg-[#191B1E] text-[#F5F3ED] flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D36B4D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D36B4D] block mb-1.5 font-semibold">
                      OFFSCRIPT Architecture
                    </span>
                    <p className="text-sm text-[#E6E2D9]/90 leading-relaxed font-normal">
                      {row.offscript}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Engineering Tenets */}
        <section aria-labelledby="principles-heading" className="mb-20 sm:mb-28 border-t border-[#E6E2D9] pt-16 sm:pt-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold block mb-3">
              Engineering Disciplines
            </span>
            <h2 id="principles-heading" className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#191B1E] mb-4">
              Our Foundational Tenets
            </h2>
            <p className="text-base sm:text-lg text-[#6B6C67]">
              The non-negotiable engineering principles that govern every repository, pull request, and deployment script we produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-10 bg-white border border-[#E6E2D9] flex flex-col justify-between hover:border-[#191B1E] transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#F5F3ED] border border-[#E6E2D9] flex items-center justify-center text-[#D36B4D] mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#D36B4D] font-semibold uppercase tracking-wider block mb-2">
                      Tenet 0{idx + 1}
                    </span>
                    <h3 className="font-space text-xl sm:text-2xl font-bold text-[#191B1E] mb-4 leading-snug">
                      {principle.title}
                    </h3>
                    <p className="font-inter text-sm sm:text-base text-[#6B6C67] leading-relaxed">
                      {principle.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Studio Facts Matrix */}
        <section aria-labelledby="facts-heading" className="mb-20 sm:mb-28 border-t border-[#E6E2D9] pt-16 sm:pt-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold block mb-3">
              Transparent Governance
            </span>
            <h2 id="facts-heading" className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#191B1E] mb-4">
              Studio Operating Invariants
            </h2>
            <p className="text-base sm:text-lg text-[#6B6C67]">
              Clear commercial terms and transparent operational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDIO_FACTS.map((fact, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-white border border-[#E6E2D9]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#92938D] block mb-2 font-medium">
                  {fact.label}
                </span>
                <span className="font-space text-lg sm:text-xl font-bold text-[#191B1E]">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="p-8 sm:p-14 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold block mb-2">
              Ready To Build Differently?
            </span>
            <h3 className="font-space text-2xl sm:text-4xl font-bold tracking-tight mb-2">
              Let&apos;s evaluate your architectural requirements.
            </h3>
            <p className="text-sm text-[#E6E2D9]/80 font-normal">
              Direct consultation with our founding systems architect. Response SLA within 24 hours.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#191B1E] transition-colors shrink-0"
          >
            <span>Start Technical Brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </Container>
    </div>
  );
}
