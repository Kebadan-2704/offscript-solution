import { z } from 'zod';

export const ContactDisciplineSchema = z.enum([
  'software-engineering',
  'artificial-intelligence',
  'cloud-infrastructure',
  'intelligent-automation',
  'web-mobile',
  'ui-ux-design',
  'other',
]);

export const ContactBudgetSchema = z.enum([
  'under-25k',
  '25k-50k',
  '50k-100k',
  '100k-plus',
  'scope-dependent',
]);

export const ContactTimelineSchema = z.enum([
  'immediate',
  'one-to-three-months',
  'three-to-six-months',
  'flexible',
]);

export const ContactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Please provide your full name (minimum 2 characters).' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  workEmail: z
    .string()
    .email({ message: 'Please enter a valid work email address.' }),
  company: z
    .string()
    .min(1, { message: 'Please provide your company or project name.' })
    .max(120, { message: 'Company name must not exceed 120 characters.' }),
  discipline: ContactDisciplineSchema,
  budget: ContactBudgetSchema,
  timeline: ContactTimelineSchema,
  projectScope: z
    .string()
    .min(20, {
      message: 'Please provide at least 20 characters describing the technical problem or architecture mandate.',
    })
    .max(3000, { message: 'Scope description must not exceed 3000 characters.' }),
  preferredStack: z.string().max(200).optional(),
  // Honeypot field (hidden in UI; bots fill it)
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

