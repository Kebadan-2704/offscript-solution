import type { Metadata } from 'next';
import { Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactFormClient } from '@/components/contact/ContactFormClient';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Direct Technical Consultation',
  description:
    'Initiate a direct engineering consultation with our systems architects. Zero sales hand-offs, no account middle layers, 24-business-hour response SLA.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Direct Technical Consultation — OFFSCRIPT SOLUTION',
    description:
      'Initiate a direct engineering consultation with our systems architects. Zero sales hand-offs, no account middle layers, 24-business-hour response SLA.',
    url: `${SITE_CONFIG.url}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'OFFSCRIPT SOLUTION Technical Consultation Intake',
    description: 'Direct access to senior engineering principals for architectural consultation.',
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.contact.email,
      url: SITE_CONFIG.url,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'technical sales & architectural advisory',
        email: SITE_CONFIG.contact.email,
        availableLanguage: ['English'],
      },
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
        name: 'Contact & Intake',
        item: `${SITE_CONFIG.url}/contact`,
      },
    ],
  };

  return (
    <div className="pt-24 sm:pt-28 pb-10 sm:pb-12 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* Editorial Heading */}
        <SectionHeading
          as="h1"
          index="01"
          eyebrow="Direct Technical Consultation"
          title={
            <>
              Engineered Differently<span className="text-[#D36B4D]">.</span> Starting From Day Zero<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="Speak directly with principal engineers. No account managers, no sales commissions, no junior bait-and-switch. We review your architecture, constraints, and timeline within 24 business hours."
        />

        {/* 4-Item Information Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16 font-mono text-xs">
          <div className="p-6 bg-white border border-[#E6E2D9]">
            <div className="flex items-center gap-2.5 text-[#D36B4D] mb-3 font-semibold">
              <Mail className="w-4 h-4" />
              <span className="uppercase tracking-wider">Direct Inbox</span>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="font-medium text-[#191B1E] hover:text-[#D36B4D] transition-colors break-all"
            >
              {SITE_CONFIG.contact.email}
            </a>
            <p className="text-[11px] text-[#52534E] mt-2 font-inter">
              PGP keys available upon request for sensitive enterprise briefs.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E6E2D9]">
            <div className="flex items-center gap-2.5 text-[#D36B4D] mb-3 font-semibold">
              <Clock className="w-4 h-4" />
              <span className="uppercase tracking-wider">Response Protocol</span>
            </div>
            <span className="font-bold text-[#191B1E] block">24 Business Hours</span>
            <p className="text-[11px] text-[#52534E] mt-2 font-inter">
              Every technical brief is assessed directly by a founding engineer.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E6E2D9]">
            <div className="flex items-center gap-2.5 text-[#D36B4D] mb-3 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span className="uppercase tracking-wider">Bilateral NDA</span>
            </div>
            <span className="font-bold text-[#191B1E] block">Mutual Protection</span>
            <p className="text-[11px] text-[#52534E] mt-2 font-inter">
              Standard mutual NDA executed prior to code auditing or proprietary data transfer.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E6E2D9]">
            <div className="flex items-center gap-2.5 text-[#D36B4D] mb-3 font-semibold">
              <MapPin className="w-4 h-4" />
              <span className="uppercase tracking-wider">Operating Model</span>
            </div>
            <span className="font-bold text-[#191B1E] block">Global Studio Network</span>
            <p className="text-[11px] text-[#52534E] mt-2 font-inter">
              Remote-native engineering team operating across UTC-8 to UTC+5:30.
            </p>
          </div>
        </div>

        {/* The Consultation Intake Form Component */}
        <section aria-labelledby="intake-form-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <h2
              id="intake-form-heading"
              className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
            >
              Consultation Intake Specification
            </h2>
          </div>

          <ContactFormClient />
        </section>
      </Container>
    </div>
  );
}
