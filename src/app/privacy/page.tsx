import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Governance — OFFSCRIPT SOLUTION',
  description:
    'Our commitment to absolute privacy: zero advertising cookies, cookieless analytics, zero data monetization, and strict confidentiality for all architectural briefs.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy & Data Governance — OFFSCRIPT SOLUTION',
    description:
      'Our commitment to absolute privacy: zero advertising cookies, cookieless analytics, zero data monetization, and strict confidentiality for all architectural briefs.',
    url: `${SITE_CONFIG.url}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPage() {
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
        name: 'Privacy Policy',
        item: `${SITE_CONFIG.url}/privacy`,
      },
    ],
  };

  return (
    <div className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        <SectionHeading
          index="01 // 01"
          eyebrow="Data Governance & Rights"
          title={
            <>
              Privacy Policy<span className="text-[#D36B4D]">.</span> Data Sovereignty<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="We engineer solutions with privacy and security as non-negotiable architectural primitives. We do not track you, sell your information, or store invasive advertising cookies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 sm:mt-16">
          {/* Metadata Rail */}
          <aside className="lg:col-span-4 font-mono text-xs space-y-6">
            <div className="p-6 bg-white border border-[#E6E2D9]">
              <span className="text-[#92938D] uppercase tracking-wider block mb-2 font-medium">
                Effective Date
              </span>
              <span className="font-bold text-[#191B1E] text-sm block">January 1, 2026</span>
            </div>

            <div className="p-6 bg-white border border-[#E6E2D9]">
              <span className="text-[#92938D] uppercase tracking-wider block mb-2 font-medium">
                Governance Scope
              </span>
              <span className="font-bold text-[#191B1E] text-sm block">Global (GDPR, CCPA, UK DPA)</span>
            </div>

            <div className="p-6 bg-white border border-[#E6E2D9]">
              <span className="text-[#92938D] uppercase tracking-wider block mb-2 font-medium">
                Direct Inquiries
              </span>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="font-medium text-[#191B1E] hover:text-[#D36B4D] transition-colors block break-all text-sm"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </aside>

          {/* Legal Narrative Content */}
          <article className="lg:col-span-8 bg-white border border-[#E6E2D9] p-8 sm:p-14 space-y-10 font-inter text-base text-[#191B1E] leading-relaxed">
            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                1. Foundational Commitment to Privacy
              </h2>
              <p className="text-[#6B6C67] mb-4">
                OFFSCRIPT SOLUTION (&quot;we&quot;, &quot;us&quot;, or &quot;the studio&quot;) is an independent
                technology engineering consultancy. We do not operate advertising networks, broker
                consumer data, or monetize browsing telemetry. We collect only the minimum
                necessary information required to respond to architectural inquiries and execute
                commercial engineering contracts.
              </p>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                2. Cookieless Web Analytics
              </h2>
              <p className="text-[#6B6C67] mb-4">
                This website uses privacy-preserving analytics (Plausible Analytics) to evaluate
                aggregate traffic patterns and system performance.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6C67] font-normal">
                <li>No cookies are written to or read from your device browser storage.</li>
                <li>No persistent unique identifiers, IP addresses, or cross-site tracking tags are stored.</li>
                <li>All telemetry is fully anonymized and compliant with EU ePrivacy, GDPR, and PECR without requiring an intrusive cookie modal.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                3. Consultation Inquiries & Brief Processing
              </h2>
              <p className="text-[#6B6C67] mb-4">
                When you submit a technical brief via our contact intake system, we process:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6C67] font-normal mb-4">
                <li>Your full name, professional email address, and organization name.</li>
                <li>Project scope parameters, budget tiers, deployment deadlines, and technical constraints.</li>
              </ul>
              <p className="text-[#6B6C67]">
                This data is transmitted over encrypted TLS connections and accessible exclusively to
                our principal systems engineers. We never transfer your brief data to marketing
                aggregators, third-party recruiters, or sales outreach lists. Inbound inquiry records
                are automatically expunged after twelve (12) months if no commercial relationship is
                established.
              </p>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                4. Client Codebases & Machine Learning Ethics
              </h2>
              <p className="text-[#6B6C67] mb-4">
                During client engagements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6C67] font-normal">
                <li>We execute bilateral mutual non-disclosure agreements (NDAs) prior to accessing proprietary systems.</li>
                <li>We strictly prohibit the training of public commercial LLMs or AI foundation models on your proprietary source code, internal schemas, or production database dumps.</li>
                <li>All development environments utilize isolated VPCs, scoped SSH keys, and multi-factor hardware security tokens.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                5. Your Statutory Rights (GDPR / CCPA / UK DPA)
              </h2>
              <p className="text-[#6B6C67] mb-4">
                Regardless of your physical geography, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6C67] font-normal mb-4">
                <li>Request access to any personal correspondence or brief data retained by the studio.</li>
                <li>Request immediate permanent erasure of all consultation records (&quot;Right to be Forgotten&quot;).</li>
                <li>Object to or restrict specific data processing workflows.</li>
              </ul>
              <p className="text-[#6B6C67]">
                To exercise any statutory right, email our data privacy lead directly at{' '}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="font-medium text-[#191B1E] underline hover:text-[#D36B4D] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
                . We process all data sovereignty requests within forty-eight (48) hours.
              </p>
            </section>

            <div className="pt-8 border-t border-[#E6E2D9] flex items-center justify-between font-mono text-xs text-[#92938D]">
              <span>Document Ref: OS-PRIVACY-2026.1</span>
              <Link href="/terms" className="text-[#191B1E] hover:text-[#D36B4D] transition-colors">
                View Terms of Service →
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
