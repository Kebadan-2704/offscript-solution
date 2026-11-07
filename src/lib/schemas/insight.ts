import { z } from 'zod';

export const InsightCategorySchema = z.enum([
  'Artificial Intelligence',
  'Software Engineering',
  'Product Development',
  'Automation',
  'Technology Insights',
  'Digital Innovation',
]);

export const InsightItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  category: InsightCategorySchema,
  publishedAt: z.string(), // ISO date YYYY-MM-DD
  readingTime: z.string(),
  author: z.string(),
  authorRole: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  toc: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    })
  ),
  content: z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('paragraph'),
        text: z.string(),
      }),
      z.object({
        type: z.literal('heading'),
        level: z.enum(['h2', 'h3']),
        id: z.string(),
        text: z.string(),
      }),
      z.object({
        type: z.literal('callout'),
        variant: z.enum(['note', 'warning', 'decision']),
        title: z.string(),
        text: z.string(),
      }),
      z.object({
        type: z.literal('quote'),
        quote: z.string(),
        attribution: z.string(),
      }),
      z.object({
        type: z.literal('code'),
        language: z.string(),
        filename: z.string().optional(),
        code: z.string(),
      }),
      z.object({
        type: z.literal('list'),
        items: z.array(z.string()),
      }),
    ])
  ),
});

export type InsightItem = z.infer<typeof InsightItemSchema>;

