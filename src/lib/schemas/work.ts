import { z } from 'zod';

export const ProjectStatusSchema = z.enum([
  'Concept',
  'Academic',
  'Prototype',
  'Commercial',
]);

export const ProjectCategorySchema = z.enum([
  'AI systems',
  'Healthcare & wellness',
  'Enterprise',
  'Automation',
  'Mobile',
  'IoT',
]);

export const WorkItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  status: ProjectStatusSchema,
  category: ProjectCategorySchema,
  categoryKey: z.string(),
  industry: z.string(),
  year: z.string(),
  summary: z.string(),
  challenge: z.string(),
  objectives: z.array(z.string()),
  solution: z.string(),
  architectureNarrative: z.string(),
  architectureDiagram: z.object({
    type: z.enum(['edge-ai', 'telemetry-stream', 'distributed-grid', 'generic']),
    caption: z.string(),
    nodes: z.array(
      z.object({
        label: z.string(),
        sublabel: z.string(),
        tier: z.enum(['ingest', 'compute', 'storage', 'interface']),
      })
    ),
  }),
  stack: z.array(z.string()),
  links: z
    .object({
      live: z.string().optional(),
      repo: z.string().optional(),
    })
    .optional(),
  verified: z.boolean(),
  results: z.array(z.string()).optional(),
  targetMetrics: z.array(z.string()).optional(),
  coverImage: z.string(),
  gallery: z.array(
    z.object({
      title: z.string(),
      caption: z.string(),
      aspectRatio: z.string().default('16/10'),
    })
  ),
  placeholder: z.boolean(),
  featured: z.boolean().optional(),
});

export type WorkItem = z.infer<typeof WorkItemSchema>;

