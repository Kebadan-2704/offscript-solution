import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/content/site';
import { SERVICES } from '@/content/services';
import { PROJECTS } from '@/content/work';
import { INSIGHTS } from '@/content/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Base core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 6 Service detail pages
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date('2026-01-01'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Selected work case studies: EXCLUDE placeholder: true entries per PART 6.5 & PART 9
  const workRoutes: MetadataRoute.Sitemap = PROJECTS.filter((p) => !p.placeholder).map(
    (p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  );

  // Technical insights essays: EXCLUDE draft: true entries per PART 6.6 & PART 9
  const insightRoutes: MetadataRoute.Sitemap = INSIGHTS.filter((i) => !i.draft).map(
    (i) => ({
      url: `${baseUrl}/insights/${i.slug}`,
      lastModified: new Date(i.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes];
}

