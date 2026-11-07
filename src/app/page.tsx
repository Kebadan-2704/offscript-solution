import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/ui/Marquee';
import { BrandStatementSection } from '@/components/sections/BrandStatementSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { WhySection } from '@/components/sections/WhySection';
import { TechEcosystemSection } from '@/components/sections/TechEcosystemSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function HomePage() {
  const marqueeDisciplines = [
    'SOFTWARE ENGINEERING',
    'ARTIFICIAL INTELLIGENCE',
    'INTELLIGENT WORKFLOWS',
    'CLOUD ARCHITECTURE',
    'DIGITAL EXPERIENCES',
    'SaaS PRODUCTS',
    'EDGE INFERENCE',
    'DISTRIBUTED SYSTEMS',
  ];

  return (
    <div className="flex flex-col w-full bg-[#F5F3ED] text-[#191B1E] overflow-hidden">
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. Running Marquee */}
      <Marquee items={marqueeDisciplines} speedSeconds={28} />

      {/* 03. Brand Statement (Carbon Ink) */}
      <BrandStatementSection />

      {/* 04. Capabilities & Services (Numbered Accordion Rows) */}
      <ServicesSection />

      {/* 05. The Studio Approach (Timeline on Sand) */}
      <ApproachSection />

      {/* 06. Custom Solutions (Asymmetric 12-Column Grid) */}
      <SolutionsSection />

      {/* 07. Selected Work (Filterable Portfolio) */}
      <WorkSection />

      {/* 08. Why OFFSCRIPT (Offset 2-Column Numerals) */}
      <WhySection />

      {/* 09. Technology Ecosystem (Muted Sage Panel) */}
      <TechEcosystemSection />

      {/* 10. Final CTA (Carbon Ink with 3D Symbol Accent) */}
      <FinalCtaSection />
    </div>
  );
}
