import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_CONFIG } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Service & Engineering Engagements — OFFSCRIPT SOLUTION',
  description:
    'Commercial terms governing engineering advisory, software architecture engagements, and 100% client intellectual property ownership.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
  openGraph: {
    title: 'Terms of Service & Engineering Engagements — OFFSCRIPT SOLUTION',
    description:
      'Commercial terms governing engineering advisory, software architecture engagements, and 100% client intellectual property ownership.',
    url: `${SITE_CONFIG.url}/terms`,
    type: 'website',
  },
};

export default function TermsPage() {
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
        name: 'Terms of Service',
        item: `${SITE_CONFIG.url}/terms`,
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
          eyebrow="Commercial Governance"
          title={
            <>
              Terms of Service<span className="text-[#D36B4D]">.</span> Client Rights<span className="text-[#D36B4D]">.</span>
            </>
          }
          description="Clear, transparent commercial principles. We believe clients should own 100% of their intellectual property with zero studio dependencies or licensing traps."
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
                Core Principle
              </span>
              <span className="font-bold text-[#191B1E] text-sm block">100% Client IP Ownership</span>
            </div>

            <div className="p-6 bg-white border border-[#E6E2D9]">
              <span className="text-[#92938D] uppercase tracking-wider block mb-2 font-medium">
                Commercial Contact
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
                1. Scope of Technological Advisory
              </h2>
              <p className="text-[#6B6C67] mb-4">
                OFFSCRIPT SOLUTION provides high-level architectural advisory, full-stack software
                engineering, applied machine learning systems, cloud infrastructure engineering, and
                digital product design services.
              </p>
              <p className="text-[#6B6C67]">
                All client engagements are formally governed by an executed Master Services Agreement
                (MSA) and accompanying Statement of Work (SOW) outlining technical specifications,
                milestone deliverables, sprint cadence, and commercial consideration.
              </p>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                2. 100% Intellectual Property Ownership
              </h2>
              <p className="text-[#6B6C67] mb-4">
                We believe in absolute client ownership. Upon receipt of full payment for contracted
                milestones:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6B6C67] font-normal">
                <li>All custom software source code, database schemas, infrastructure scripts, and documentation transfer 100% exclusively to the client.</li>
                <li>You receive full administrative access to all GitHub/GitLab repositories, cloud hosting accounts, and container registries.</li>
                <li>The studio retains no recurring licensing royalties, maintenance rights, or restrictive proprietary lock-ins.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                3. Thirty-Day Post-Launch Warranty
              </h2>
              <p className="text-[#6B6C67] mb-4">
                We stand behind our code. Every commercial deliverable includes a thirty (30) day
                post-deployment stabilization period during which the studio remediates any verified
                functional defects or regressions against the approved architectural specification at
                zero additional billing.
              </p>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                4. Mutual Confidentiality & Trade Secrets
              </h2>
              <p className="text-[#6B6C67] mb-4">
                We treat all client business logic, operational metrics, algorithms, and system
                topologies as strictly proprietary confidential information. We do not disclose
                client names, publish case study specifics, or reference performance benchmarks
                without prior explicit written approval from your authorized leadership.
              </p>
            </section>

            <section>
              <h2 className="font-space text-2xl font-bold mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-[#6B6C67] mb-4">
                To the maximum extent permitted by applicable law, neither party shall be liable for
                indirect, incidental, consequential, or punitive damages arising from the use or
                inability to use software deliverables. Our aggregate commercial liability under any
                engagement is strictly bounded to the total fees paid by the client under the
                applicable Statement of Work.
              </p>
            </section>

            <div className="pt-8 border-t border-[#E6E2D9] flex items-center justify-between font-mono text-xs text-[#92938D]">
              <span>Document Ref: OS-TERMS-2026.1</span>
              <Link href="/privacy" className="text-[#191B1E] hover:text-[#D36B4D] transition-colors">
                View Privacy Policy →
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
