import type { Metadata } from 'next';
import Link from 'next/link';
import { Rss } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InsightsFilterClient } from '@/components/insights/InsightsFilterClient';
import { INSIGHTS } from '@/content/insights';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Insights & Technical Journal — OFFSCRIPT SOLUTION',
  description:
    'Deep architectural essays on distributed systems, real-time edge AI evaluation, and disciplined software modernization.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/insights`,
    types: {
      'application/rss+xml': `${SITE_CONFIG.url}/insights/feed.xml`,
    },
  },
  openGraph: {
    title: 'Insights & Technical Journal — OFFSCRIPT SOLUTION',
    description:
      'Deep architectural essays on distributed systems, real-time edge AI evaluation, and disciplined software modernization.',
    url: `${SITE_CONFIG.url}/insights`,
    type: 'website',
  },
};

export default function InsightsPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OFFSCRIPT SOLUTION Technical Journal',
    description: 'Deep technical essays authored by OFFSCRIPT SOLUTION engineering principals.',
    url: `${SITE_CONFIG.url}/insights`,
    hasPart: INSIGHTS.map((item) => ({
      '@type': 'BlogPosting',
      headline: item.title,
      description: item.description,
      datePublished: item.publishedAt,
      url: `${SITE_CONFIG.url}/insights/${item.slug}`,
      author: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
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
        name: 'Insights',
        item: `${SITE_CONFIG.url}/insights`,
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            index="01 // 06"
            eyebrow="Studio Journal"
            title={
              <>
                Technical Insights<span className="text-[#D36B4D]">.</span> Architectural Trade-offs<span className="text-[#D36B4D]">.</span>
              </>
            }
            description="Deep essays written by our engineering principals covering high-throughput systems, edge AI benchmarking, and disciplined legacy modernization."
            className="mb-0 lg:mb-0"
          />

          <Link
            href="/insights/feed.xml"
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#6B6C67] hover:text-[#191B1E] px-3.5 py-2 border border-[#E6E2D9] bg-white transition-colors shrink-0"
          >
            <Rss className="w-3.5 h-3.5 text-[#D36B4D]" />
            <span>RSS Feed (XML)</span>
          </Link>
        </div>

        {/* Filterable Articles Engine */}
        <InsightsFilterClient />
      </Container>
    </div>
  );
}
