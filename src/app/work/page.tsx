import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WorkFilterClient } from '@/components/work/WorkFilterClient';
import { SITE_CONFIG } from '@/content/site';
import { PROJECTS } from '@/content/work';

export const metadata: Metadata = {
  title: 'Selected Work & Architectures — OFFSCRIPT SOLUTION',
  description:
    'Exploration of commercial systems, research prototypes, and architectural concepts across AI, IoT, Enterprise Platforms, and Digital Health.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/work`,
  },
  openGraph: {
    title: 'Selected Work & Architectures — OFFSCRIPT SOLUTION',
    description:
      'Exploration of commercial systems, research prototypes, and architectural concepts.',
    url: `${SITE_CONFIG.url}/work`,
    type: 'website',
  },
};

export default function WorkPage() {
  // CollectionPage JSON-LD, excluding placeholder: true entries per PART 6.5
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OFFSCRIPT SOLUTION Selected Systems',
    description: 'Portfolio of production architectures and research prototypes.',
    url: `${SITE_CONFIG.url}/work`,
    hasPart: PROJECTS.filter((p) => !p.placeholder).map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      description: p.summary,
      url: `${SITE_CONFIG.url}/work/${p.slug}`,
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
        name: 'Work',
        item: `${SITE_CONFIG.url}/work`,
      },
    ],
  };

  return (
    <div className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
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
        {/* Section Heading */}
        <SectionHeading
          index="01 // 06"
          eyebrow="Portfolio & Systems"
          title={
            <>
              Selected Architectures<span className="text-[#D36B4D]">.</span> Real engineering craft<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="A selection of commercial, prototype, and research architectures demonstrating technical rigor, domain adaptation, and zero-compromise engineering."
        />

        {/* Filterable Work Gallery with Keyboard Accessibility */}
        <WorkFilterClient />

        {/* Studio Disclaimer per PART 6.5 & PART 11 */}
        <div className="mt-16 p-6 border-l-4 border-[#D36B4D] bg-white border border-[#E6E2D9] font-mono text-xs text-[#6B6C67] leading-relaxed">
          <span className="text-[#191B1E] font-bold block mb-1">
            [Transparency & Portfolio Governance]:
          </span>
          Entries marked <code className="text-[#D36B4D] font-bold">Concept</code> or <code className="text-[#191B1E] font-bold">Prototype</code> reflect internal studio engineering architectures and technical explorations. We never fabricate commercial clients or metric claims. Verified commercial client engagements are cataloged in accordance with client confidentiality and NDA agreements.
        </div>
      </Container>
    </div>
  );
}
