import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, User, AlertCircle, Info, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { INSIGHTS, ALL_INSIGHTS_INCLUDING_DRAFTS } from '@/content/insights';
import { SITE_CONFIG } from '@/content/site';
import { ReadingProgress } from '@/components/insights/ReadingProgress';
import { ShareLinks } from '@/components/insights/ShareLinks';
import { CodeBlock } from '@/components/insights/CodeBlock';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

// In production, strictly exclude drafts from pre-rendering per PART 6.6 & PART 9
export const dynamicParams = false;

export async function generateStaticParams() {
  return INSIGHTS.filter((item) => !item.draft).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = ALL_INSIGHTS_INCLUDING_DRAFTS.find((i) => i.slug === slug);

  if (!article || article.draft) {
    return { title: 'Article Not Found' };
  }

  const pageUrl = `${SITE_CONFIG.url}/insights/${article.slug}`;

  return {
    title: `${article.title} — OFFSCRIPT SOLUTION`,
    description: article.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${article.title} — OFFSCRIPT SOLUTION`,
      description: article.description,
      url: pageUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} — OFFSCRIPT SOLUTION`,
      description: article.description,
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const articleIndex = ALL_INSIGHTS_INCLUDING_DRAFTS.findIndex((i) => i.slug === slug);
  const article = ALL_INSIGHTS_INCLUDING_DRAFTS[articleIndex];

  // Disallow drafts per gate requirements
  if (!article || article.draft) {
    notFound();
  }

  const publishedList = ALL_INSIGHTS_INCLUDING_DRAFTS.filter((i) => !i.draft);
  const currentPublishedIndex = publishedList.findIndex((i) => i.slug === slug);

  const prevArticle = currentPublishedIndex > 0 ? publishedList[currentPublishedIndex - 1] : null;
  const nextArticle =
    currentPublishedIndex < publishedList.length - 1
      ? publishedList[currentPublishedIndex + 1]
      : null;

  const relatedArticles = publishedList
    .filter((i) => i.slug !== article.slug)
    .slice(0, 2);

  const pageUrl = `${SITE_CONFIG.url}/insights/${article.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/brand/logo-lockup.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
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
        name: 'Insights',
        item: `${SITE_CONFIG.url}/insights`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <article className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F5F3ED] text-[#191B1E] min-h-screen">
      {/* Sticky Reading Progress Indicator */}
      <ReadingProgress />

      {/* Structured Schema.org Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-10 sm:mb-14">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#6B6C67] hover:text-[#191B1E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights Journal</span>
          </Link>
        </div>

        {/* Draft Notice if running in non-production */}
        {article.draft && (
          <div className="mb-8 p-4 bg-amber-500/10 border-l-4 border-amber-500 font-mono text-xs text-[#191B1E]">
            [Draft Mode]: This template article has <code className="font-bold">draft: true</code> and is excluded from production builds and XML feeds per PART 6.6.
          </div>
        )}

        {/* Header Block */}
        <header className="border-b border-[#E6E2D9] pb-12 sm:pb-16 max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-mono text-xs font-semibold text-[#D36B4D] uppercase tracking-wider">
              {article.category}
            </span>
            <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
            <div className="flex items-center gap-4 font-mono text-xs text-[#6B6C67]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#92938D]" />
                <span>{article.publishedAt}</span>
              </span>
              <span aria-hidden="true">{'//'}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#92938D]" />
                <span>{article.readingTime}</span>
              </span>
            </div>
          </div>

          <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#191B1E] mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="font-inter text-xl sm:text-2xl text-[#6B6C67] leading-relaxed max-w-3xl mb-8">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-[#E6E2D9] font-mono text-xs text-[#6B6C67]">
            <User className="w-3.5 h-3.5 text-[#D36B4D]" />
            <span className="text-[#191B1E] font-semibold">{article.author}</span>
            <span>—</span>
            <span>{article.authorRole}</span>
          </div>
        </header>

        {/* Article Layout Grid with Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-12 sm:pt-16">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-6 bg-white border border-[#E6E2D9]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-4 font-semibold">
                Table of Contents
              </span>
              <nav aria-label="Table of contents">
                <ul className="space-y-3 font-mono text-xs text-[#6B6C67]">
                  {article.toc.map((tocItem) => (
                    <li key={tocItem.id}>
                      <a
                        href={`#${tocItem.id}`}
                        className="hover:text-[#191B1E] transition-colors block py-0.5"
                      >
                        {tocItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-[#E6E2D9]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#92938D] block mb-2 font-semibold">
                  Article Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[#F5F3ED] text-[#191B1E] border border-[#E6E2D9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Essay Body */}
          <div className="lg:col-span-8 max-w-2xl font-inter text-base sm:text-lg leading-relaxed text-[#191B1E]">
            {article.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="mb-6 font-normal">
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'heading') {
                return (
                  <h2
                    key={idx}
                    id={block.id}
                    className="font-space text-2xl sm:text-3xl font-bold tracking-tight text-[#191B1E] mt-12 mb-4 scroll-mt-28"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'callout') {
                const isDecision = block.variant === 'decision';
                const isWarning = block.variant === 'warning';
                const icon = isDecision ? (
                  <Lightbulb className="w-4 h-4 text-[#D36B4D] shrink-0" />
                ) : isWarning ? (
                  <AlertCircle className="w-4 h-4 text-[#D36B4D] shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-[#D36B4D] shrink-0" />
                );

                return (
                  <div
                    key={idx}
                    className="my-8 p-6 bg-white border-l-4 border-[#D36B4D] border border-[#E6E2D9]"
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#D36B4D]">
                      {icon}
                      <span>{block.title}</span>
                    </div>
                    <p className="text-base text-[#191B1E]">{block.text}</p>
                  </div>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="my-10 p-6 sm:p-8 bg-[#E6E2D9]/40 border-l-4 border-[#191B1E]"
                  >
                    <p className="font-space text-xl sm:text-2xl font-semibold italic text-[#191B1E] mb-3 leading-snug">
                      &ldquo;{block.quote}&rdquo;
                    </p>
                    <cite className="font-mono text-xs text-[#6B6C67] not-italic block uppercase tracking-wider">
                      — {block.attribution}
                    </cite>
                  </blockquote>
                );
              }

              if (block.type === 'code') {
                return (
                  <CodeBlock
                    key={idx}
                    language={block.language}
                    filename={block.filename}
                    code={block.code}
                  />
                );
              }

              if (block.type === 'list') {
                return (
                  <ul key={idx} className="my-6 space-y-2.5">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-base">
                        <span className="text-[#D36B4D] font-mono text-sm mt-0.5" aria-hidden="true">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}

            {/* Native Share Links (No tracking widgets) */}
            <div className="mt-14">
              <ShareLinks title={article.title} url={pageUrl} />
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="py-12 border-b border-[#E6E2D9] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
              {prevArticle ? (
                <Link
                  href={`/insights/${prevArticle.slug}`}
                  className="inline-flex items-center gap-2 text-[#191B1E] hover:text-[#D36B4D] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: {prevArticle.title.slice(0, 36)}...</span>
                </Link>
              ) : (
                <span className="text-[#92938D]">First Essay</span>
              )}

              {nextArticle ? (
                <Link
                  href={`/insights/${nextArticle.slug}`}
                  className="inline-flex items-center gap-2 text-[#191B1E] hover:text-[#D36B4D] transition-colors ml-auto"
                >
                  <span>Next: {nextArticle.title.slice(0, 36)}...</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-[#92938D]">Latest Essay</span>
              )}
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="py-12 border-b border-[#E6E2D9]">
                <h3 className="font-space text-2xl font-bold text-[#191B1E] mb-6">
                  Related Technical Essays
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((rel) => (
                    <div key={rel.slug} className="p-6 bg-white border border-[#E6E2D9]">
                      <span className="font-mono text-xs text-[#D36B4D] uppercase block mb-1 font-semibold">
                        {rel.category}
                      </span>
                      <h4 className="font-space text-xl font-bold text-[#191B1E] mb-2">
                        {rel.title}
                      </h4>
                      <Link
                        href={`/insights/${rel.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase text-[#191B1E] hover:text-[#D36B4D]"
                      >
                        <span>Read Essay</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Discussion CTA */}
            <div className="my-14 p-8 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] block mb-2 font-semibold">
                Architecture Consultation
              </span>
              <h3 className="font-space text-2xl font-bold text-[#F5F3ED] mb-3">
                Discussing a similar system architecture?
              </h3>
              <p className="text-sm text-[#E6E2D9]/80 leading-relaxed mb-6 font-normal">
                Our engineering principals participate directly in early technical scoping and feasibility studies.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D36B4D] text-[#191B1E] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
              >
                <span>Initiate Dialogue</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

