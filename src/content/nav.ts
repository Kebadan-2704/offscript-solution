export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV = {
  services: [
    { label: 'Software Engineering', href: '/services/software-engineering' },
    { label: 'Web & Mobile Apps', href: '/services/web-mobile-development' },
    { label: 'Artificial Intelligence', href: '/services/artificial-intelligence' },
    { label: 'Intelligent Workflows', href: '/services/automation-intelligent-workflows' },
    { label: 'Cloud & Infrastructure', href: '/services/cloud-digital-infrastructure' },
    { label: 'UI/UX & Experiences', href: '/services/ui-ux-digital-experiences' },
  ],
  studio: [
    { label: 'About Studio', href: '/about' },
    { label: 'Selected Work', href: '/work' },
    { label: 'Custom Solutions', href: '/solutions' },
    { label: 'Insights Journal', href: '/insights' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Engagement', href: '/terms' },
  ],
};

