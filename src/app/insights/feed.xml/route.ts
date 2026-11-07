import { NextResponse } from 'next/server';
import { INSIGHTS } from '@/content/insights';
import { SITE_CONFIG } from '@/content/site';

export async function GET() {
  const publishedArticles = INSIGHTS.filter((article) => !article.draft);

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name} — Technical Insights</title>
    <link>${SITE_CONFIG.url}/insights</link>
    <description>${SITE_CONFIG.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/insights/feed.xml" rel="self" type="application/rss+xml"/>
    ${publishedArticles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_CONFIG.url}/insights/${article.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/insights/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${article.category}</category>
      <author>${SITE_CONFIG.contact.email} (${article.author})</author>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

