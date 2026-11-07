import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PROJECTS } from '@/content/work';
import { SITE_CONFIG } from '@/content/site';
import { WorkDiagram } from '@/components/work/WorkDiagram';
import { WorkGallery } from '@/components/work/WorkGallery';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const pageUrl = `${SITE_CONFIG.url}/work/${project.slug}`;

  return {
    title: `${project.title} — Case Study — OFFSCRIPT SOLUTION`,
    description: project.summary,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} — OFFSCRIPT SOLUTION`,
      description: project.summary,
      url: pageUrl,
      type: 'article',
    },
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  const relatedProjects = PROJECTS.filter(
    (p) => p.slug !== project.slug && p.category === project.category
  ).slice(0, 2);

  // Schema.org Structured Data (Excluded if placeholder: true per PART 6.5)
  const softwareJsonLd = !project.placeholder
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.summary,
        applicationCategory: project.category,
        operatingSystem: 'Cross-platform',
        author: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
      }
    : null;

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
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_CONFIG.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <article className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {softwareJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* 1. Back link */}
        <div className="mb-10 sm:mb-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#6B6C67] hover:text-[#191B1E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* 2. Placeholder Ribbon (Visible for placeholder entries per PART 6.5) */}
        {project.placeholder && (
          <div className="mb-8 p-4 bg-[#D36B4D]/10 border-l-4 border-[#D36B4D] font-mono text-xs text-[#191B1E] flex items-center justify-between">
            <span>
              [Placeholder Notice]: Template case study for client review. Replace with verified production case study data in <code className="font-bold">src/content/work.ts</code> prior to launch.
            </span>
            <span className="font-bold uppercase tracking-wider text-[#D36B4D]">
              Archived / Concept
            </span>
          </div>
        )}

        {/* 3. Hero Header */}
        <header className="border-b border-[#E6E2D9] pb-14 sm:pb-20">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-mono text-xs font-semibold text-[#D36B4D] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 border border-[#191B1E]/20 bg-white">
              Status: {project.status}
            </span>
          </div>

          <h1 className="font-space text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#191B1E] mb-6 leading-[1.04] max-w-4xl">
            {project.title}
          </h1>

          <p className="font-inter text-xl sm:text-2xl text-[#6B6C67] leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </header>

        {/* 4. Metadata Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-[#E6E2D9] font-mono text-xs">
          <div>
            <span className="text-[#92938D] uppercase tracking-wider block mb-1">
              Domain / Industry
            </span>
            <span className="font-medium text-[#191B1E]">{project.industry}</span>
          </div>
          <div>
            <span className="text-[#92938D] uppercase tracking-wider block mb-1">
              Timeline / Year
            </span>
            <span className="font-medium text-[#191B1E]">{project.year}</span>
          </div>
          <div>
            <span className="text-[#92938D] uppercase tracking-wider block mb-1">
              Studio Role
            </span>
            <span className="font-medium text-[#191B1E]">Full Architecture & Build</span>
          </div>
          <div>
            <span className="text-[#92938D] uppercase tracking-wider block mb-1">
              Core Stack
            </span>
            <span className="font-medium text-[#191B1E] truncate block">
              {project.stack.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        {/* 5. Challenge & Objectives */}
        <section aria-labelledby="challenge-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
                The Operational Bottleneck
              </span>
              <h2
                id="challenge-heading"
                className="font-space text-2xl sm:text-4xl font-bold text-[#191B1E] mb-6"
              >
                The Challenge
              </h2>
              <p className="text-base sm:text-lg text-[#191B1E] leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="lg:col-span-6 p-8 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
                Engineering Mandates
              </span>
              <h3 className="font-space text-xl font-bold text-[#191B1E] mb-6">
                Project Objectives
              </h3>
              <ul className="space-y-3">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#6B6C67]">
                    <Check className="w-4 h-4 text-[#D36B4D] shrink-0 mt-1" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Solution Architecture & Technical Diagram Slot */}
        <section aria-labelledby="solution-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
            Architectural Resolution
          </span>
          <h2
            id="solution-heading"
            className="font-space text-2xl sm:text-4xl font-bold text-[#191B1E] max-w-3xl mb-6"
          >
            Engineering Solution & Topology
          </h2>
          <p className="text-lg text-[#191B1E] leading-relaxed max-w-3xl mb-8">
            {project.solution}
          </p>

          {/* Technical Architecture Diagram */}
          <WorkDiagram diagram={project.architectureDiagram} />

          <div className="p-8 bg-white border border-[#E6E2D9] mt-8 max-w-4xl">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#92938D] mb-3 font-semibold">
              Deep Architecture Narrative
            </h4>
            <p className="text-base text-[#6B6C67] leading-relaxed">
              {project.architectureNarrative}
            </p>
          </div>
        </section>

        {/* 7. Technology Stack Badges */}
        <section aria-labelledby="stack-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
            Technology Foundation
          </span>
          <h3 id="stack-heading" className="font-space text-2xl sm:text-3xl font-bold text-[#191B1E] mb-8">
            Technologies Deployed
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs sm:text-sm px-4 py-2 bg-white border border-[#E6E2D9] text-[#191B1E]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 8. Results / Verified Metrics per PART 6.5 */}
        <section aria-labelledby="results-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <h3
              id="results-heading"
              className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
            >
              {project.verified ? 'Verified Results & Telemetry' : 'Target Architecture Metrics (Concept)'}
            </h3>
          </div>

          <p className="text-sm text-[#6B6C67] mb-8">
            {project.verified
              ? 'Empirical performance metrics measured in production environment.'
              : '[Honest Reporting]: Target specifications modeled for this concept architecture. Verified commercial metrics will replace these targets upon client sign-off.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(project.verified && project.results ? project.results : project.targetMetrics || []).map(
              (metric, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#E6E2D9]">
                  <span className="font-mono text-xs text-[#D36B4D] block mb-2 font-semibold">
                    BENCHMARK 0{idx + 1}
                  </span>
                  <p className="font-space text-base font-semibold text-[#191B1E]">
                    {metric}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* 9. Screenshot Gallery with Lightbox */}
        <WorkGallery gallery={project.gallery} />

        {/* 10. Next / Previous Project Navigation */}
        <div className="py-12 border-b border-[#E6E2D9] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-[#191B1E] hover:text-[#D36B4D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <span className="text-[#92938D]">First Project</span>
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-[#191B1E] hover:text-[#D36B4D] transition-colors ml-auto"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-[#92938D]">Last Project</span>
          )}
        </div>

        {/* 11. Related Projects */}
        {relatedProjects.length > 0 && (
          <section aria-labelledby="related-heading" className="py-14 sm:py-20 border-b border-[#E6E2D9]">
            <h3 id="related-heading" className="font-space text-2xl font-bold text-[#191B1E] mb-8">
              Related Systems in {project.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <div key={rel.id} className="p-8 bg-white border border-[#E6E2D9] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#D36B4D] uppercase block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="font-space text-2xl font-bold text-[#191B1E] mb-3">
                      {rel.title}
                    </h4>
                    <p className="text-sm text-[#6B6C67] leading-relaxed mb-6">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    href={`/work/${rel.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase text-[#191B1E] hover:text-[#D36B4D]"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. Final Consultation CTA */}
        <section aria-labelledby="cta-heading" className="my-16 sm:my-24 p-8 sm:p-14 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E]">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-3 font-semibold">
              Bespoke System Engineering
            </span>
            <h3 id="cta-heading" className="font-space text-3xl sm:text-5xl font-bold text-[#F5F3ED] mb-4">
              Need a similar architecture built for your operations?
            </h3>
            <p className="text-base text-[#E6E2D9]/80 leading-relaxed mb-8">
              We design custom prototypes, proof-of-concepts, and production distributed systems tailored to your technical constraints.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              <span>Scope Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Container>
    </article>
  );
}

