'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { INSIGHTS, INSIGHT_CATEGORIES } from '@/content/insights';

export function InsightsFilterClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = INSIGHTS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const featured = filtered.find((i) => i.featured) || filtered[0];
  const listItems = filtered.filter((i) => i.slug !== featured?.slug);

  return (
    <div>
      {/* Category Pills Toolbar */}
      <div className="mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#52534E] block mb-3 font-semibold">
          Filter By Research Area
        </span>
        <div
          role="toolbar"
          aria-label="Filter insights by category"
          className="flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          {INSIGHT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                data-category-filter={cat}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2.5 border rounded-full transition-all duration-300 uppercase tracking-wider cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D36B4D] ${
                  isActive
                    ? 'bg-[#191B1E] text-[#F5F3ED] border-[#191B1E]'
                    : 'bg-white text-[#191B1E] border-[#E6E2D9] hover:border-[#191B1E]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Article Card */}
      {featured && (
        <article className="mb-16 p-8 sm:p-12 lg:p-16 border border-[#191B1E] bg-[#191B1E] text-[#F5F3ED] transition-all group">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold">
                Featured Essay · {featured.category}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-[#92938D]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.publishedAt}</span>
              </span>
              <span aria-hidden="true" className="text-[#92938D]">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{featured.readingTime}</span>
              </span>
            </div>
          </div>

          <h2 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight group-hover:text-[#D36B4D] transition-colors">
            <Link href={`/insights/${featured.slug}`} className="focus-visible:outline-hidden">
              {featured.title}
            </Link>
          </h2>

          <p className="text-base sm:text-xl text-[#E6E2D9]/80 leading-relaxed max-w-3xl mb-8 font-normal">
            {featured.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="font-mono text-xs text-[#92938D]">
              <span>Author: </span>
              <span className="text-[#F5F3ED] font-semibold">{featured.author}</span>
              <span className="text-[#92938D]"> ({featured.authorRole})</span>
            </div>

            <Link
              href={`/insights/${featured.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#D36B4D] hover:text-white transition-colors"
            >
              <span>Read Full Architectural Essay</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {listItems.map((article) => (
          <article
            key={article.slug}
            className="p-8 bg-white border border-[#E6E2D9] flex flex-col justify-between hover:border-[#191B1E] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs text-[#D36B4D] uppercase font-semibold">
                  {article.category}
                </span>
                <span className="font-mono text-xs text-[#52534E]">
                  {article.readingTime}
                </span>
              </div>

              <h3 className="font-space text-2xl font-bold text-[#191B1E] mb-3 group-hover:text-[#D36B4D] transition-colors leading-snug">
                <Link href={`/insights/${article.slug}`} className="focus-visible:outline-hidden">
                  {article.title}
                </Link>
              </h3>

              <p className="text-sm text-[#6B6C67] leading-relaxed mb-6">
                {article.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E6E2D9] mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 bg-[#F5F3ED] text-[#191B1E] border border-[#E6E2D9]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#6B6C67]">
                <span>{article.publishedAt}</span>
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold uppercase text-[#191B1E] hover:text-[#D36B4D] transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {listItems.length % 2 === 1 && (
          <article className="p-8 bg-[#191B1E] text-[#F5F3ED] border border-[#191B1E] flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs text-[#D36B4D] uppercase font-semibold">
                  Studio Research Guild
                </span>
                <span className="font-mono text-xs text-[#92938D]">
                  Ongoing Inquiry
                </span>
              </div>

              <h3 className="font-space text-2xl font-bold text-[#F5F3ED] mb-3 group-hover:text-[#D36B4D] transition-colors leading-snug">
                Architectural Advisory & Custom Research Briefs
              </h3>

              <p className="text-sm text-[#E6E2D9]/80 leading-relaxed mb-6 font-normal">
                Facing an unaddressed distributed systems constraint, specialized ML inference dilemma, or legacy strangler modernization challenge? Our founding engineers conduct tailored feasibility evaluations and architectural stress-testing.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-4">
                {['Direct Advisory', 'Zero Vendor Lock-in', 'Fixed Sprints'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 bg-white/10 text-[#F5F3ED] border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#E6E2D9]/70">
                <span>Response SLA: 24h</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-semibold uppercase text-[#D36B4D] hover:text-white transition-colors"
                >
                  <span>Request Advisory Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center border border-[#E6E2D9] bg-white my-8">
          <p className="font-space text-lg text-[#191B1E] mb-2">
            No essays cataloged under {activeCategory}.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className="font-mono text-xs text-[#D36B4D] uppercase font-semibold underline cursor-pointer"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}

