import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SERVICES } from '@/content/services';
import { SITE_CONFIG } from '@/content/site';

import { ServiceBreadcrumbs } from '@/components/services/ServiceBreadcrumbs';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceNarrative } from '@/components/services/ServiceNarrative';
import { ServiceProblems } from '@/components/services/ServiceProblems';
import { ServiceCapabilities } from '@/components/services/ServiceCapabilities';
import { ServiceDeliverables } from '@/components/services/ServiceDeliverables';
import { ServiceTechStack } from '@/components/services/ServiceTechStack';
import { ServiceRelatedWork } from '@/components/services/ServiceRelatedWork';
import { ServiceFaq } from '@/components/services/ServiceFaq';
import { ServiceCta } from '@/components/services/ServiceCta';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/services/${service.slug}`;

  return {
    title: `${service.title} — OFFSCRIPT SOLUTION`,
    description: service.tagline,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} — OFFSCRIPT SOLUTION`,
      description: service.tagline,
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} — OFFSCRIPT SOLUTION`,
      description: service.tagline,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${SITE_CONFIG.url}/services/${service.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: service.title,
    areaServed: 'Global',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Capabilities`,
      itemListElement: service.capabilities.map((cap) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: cap,
        },
      })),
    },
  };

  return (
    <article className="pt-32 sm:pt-40 pb-24 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Structured Schema.org Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Container>
        <ServiceBreadcrumbs currentTitle={service.title} />

        <ServiceHero
          number={service.number}
          title={service.title}
          tagline={service.tagline}
        />

        {/* Distinct Layout Rhythm Sequencing based on service.layoutVariant */}
        {service.layoutVariant === 'problem-first' && (
          <>
            <ServiceProblems problems={service.problems} layout="grid" />
            <ServiceNarrative description={service.description} />
            <ServiceCapabilities capabilities={service.capabilities} />
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {service.layoutVariant === 'deliverable-forward' && (
          <>
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceNarrative description={service.description} theme="card" />
            <ServiceCapabilities capabilities={service.capabilities} theme="sand" />
            <ServiceProblems problems={service.problems} layout="grid" />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {service.layoutVariant === 'technical-bento' && (
          <>
            <ServiceNarrative description={service.description} />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceCapabilities capabilities={service.capabilities} />
            <ServiceProblems problems={service.problems} layout="list" />
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {service.layoutVariant === 'workflow-matrix' && (
          <>
            <ServiceCapabilities capabilities={service.capabilities} />
            <ServiceProblems problems={service.problems} layout="grid" />
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceNarrative description={service.description} />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {service.layoutVariant === 'infrastructure-split' && (
          <>
            <ServiceNarrative description={service.description} theme="card" />
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceProblems problems={service.problems} layout="grid" />
            <ServiceCapabilities capabilities={service.capabilities} />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {service.layoutVariant === 'human-narrative' && (
          <>
            <ServiceNarrative description={service.description} />
            <ServiceCapabilities capabilities={service.capabilities} theme="sand" />
            <ServiceDeliverables deliverables={service.deliverables} />
            <ServiceProblems problems={service.problems} layout="list" />
            <ServiceTechStack technologies={service.technologies} />
            <ServiceRelatedWork relatedProjectSlugs={service.relatedProjectSlugs} />
            <ServiceFaq faqs={service.faqs} />
          </>
        )}

        {/* Universal Studio Intake Call to Action */}
        <ServiceCta serviceTitle={service.title} />
      </Container>
    </article>
  );
}
