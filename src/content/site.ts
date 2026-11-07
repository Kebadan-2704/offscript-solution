export const SITE_CONFIG = {
  name: 'OFFSCRIPT SOLUTION',
  tagline: 'Engineered Differently.',
  description:
    'An independent technology and digital solutions studio engineering software, intelligent systems and bespoke digital experiences.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://offscriptsolution.com',
  ogImage: '/og/default.png',
  
  // Real or verified contact details
  contact: {
    email: 'hello@offscriptsolution.com',
    location: 'Remote / Global Presence',
    responseTime: 'Within 24–48 business hours',
  },

  // Social URLs (rendered only when provided and verified)
  socials: {
    linkedin: 'https://linkedin.com/company/offscript-solution',
    github: 'https://github.com/offscript-solution',
    x: 'https://x.com/offscriptstudio',
  },

  // Founder / Studio note - strictly unverified placeholder per PART 6.2 & PART 11
  founder: {
    isSupplied: false,
    name: 'Studio Principal',
    role: 'Founder & Technical Director',
    bio: '',
  },
};

