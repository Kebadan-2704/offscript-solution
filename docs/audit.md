# OFFSCRIPT SOLUTION — Front-End, UX & Motion Audit

**Date**: January 2026  
**Auditor**: Senior Front-End Engineer & Motion Designer  
**Scope**: Entire Application (Desktop 1440px, Mobile 390px, Tablets & Wide Displays)  
**Baseline Commit**: `redesign/animated-v2`  

---

## 1. Executive Summary & Site Purpose

### 1.1 Business Model & Purpose
**OFFSCRIPT SOLUTION** is an independent technology and digital solutions studio operating under the positioning: *"Engineered Differently"*. The studio rejects off-the-shelf templates, generic SaaS clones, billable-hour inflation, and junior staff bait-and-switch. It specializes in mission-critical software engineering, applied machine learning systems, intelligent automation, cloud infrastructure, and bespoke digital products.

### 1.2 Target Audience & Core User Personas
- **Technical Buyers (CTO / VP Engineering / Head of Architecture)**: Seeking senior engineering talent capable of tackling complex distributed systems, latency bottlenecks, and cloud cost refactoring without agency fluff.
- **Enterprise Product Leaders**: Looking for digital product engineering, high-throughput web/mobile applications, and clean design systems.
- **Founders & High-Growth Startups**: Seeking technical co-architects to build resilient MVPs and scalable infrastructure from day zero.

### 1.3 Main User Goals
1. Verify studio competence, architectural depth, and engineering credibility.
2. Review real and prototype architectural case studies with concrete system topologies and benchmarks.
3. Read technical viewpoints and essays in the Insights journal.
4. Initiate a direct, senior-level consultation brief without dealing with sales representatives or account managers.

### 1.4 Complete Route & Architecture Inventory

| Route | Purpose | Key Components / Features |
|---|---|---|
| `/` | Primary Homepage | 11 editorial sections: Hero, Marquee, Brand Statement, Services Accordion, Approach Timeline, Solutions Bento, Selected Work Gallery, Why Offscript, Tech Ecosystem, Final CTA, Footer |
| `/services` | Services Overview Hub | Comprehensive overview of 6 engineering disciplines with deep-dive anchor navigation |
| `/services/[slug]` | 6 Individual Service Pages | `software-engineering`, `web-mobile-development`, `artificial-intelligence`, `automation-intelligent-workflows`, `cloud-digital-infrastructure`, `ui-ux-digital-experiences`. Distinct layout rhythms per service, custom deliverables, FAQs, and JSON-LD |
| `/solutions` | Architecture Solutions Hub | 6 core architectural solution groups and 4-stage studio methodology |
| `/work` | Portfolio Hub | Filterable project showcase with dual toolbar (Discipline + Status), card metadata, and transparency notices |
| `/work/[slug]` | Case Study Detail Pages | 3 deep case studies + 3 concept prototypes. Architecture diagrams, objectives, stack tags, benchmark telemetry, and accessible Lightbox modal |
| `/insights` | Studio Journal Hub | Filterable research area essays, featured article banner, RSS XML feed link |
| `/insights/[slug]` | Architectural Essay Detail | Sticky table of contents, `ReadingProgress` bar, syntax-highlighted `CodeBlock`, callouts, pull quotes, share links, and draft 404 protection |
| `/about` | Studio Philosophy & Operational Model | 4-point operational comparison matrix (Agency vs OFFSCRIPT), 4 engineering tenets, studio facts, and `AboutPage` JSON-LD |
| `/contact` | Consultation Intake System | Direct communication rail, 24h SLA notice, client-side validated Zod form, honeypot spam protection, and SLA confirmation screen |
| `/api/contact` | Inbound Brief API Route | Rate-limited POST endpoint, spam bot filtering, Zod schema validation, structured error responses |
| `/privacy` | Privacy Policy | Cookieless analytics disclosures, data sovereignty, GDPR/CCPA statutory rights |
| `/terms` | Terms of Service | 100% Client IP Ownership on day one, 30-day post-launch warranty, mutual confidentiality |
| `/_not-found` | System 404 Route | Branded Syne layout, error diagnostics, and quick navigation routes |
| `/insights/feed.xml` | RSS Feed | Valid RSS 2.0 XML feed excluding draft articles |
| `/sitemap.xml` | Dynamic Sitemap | Dynamic sitemap strictly excluding draft insights and placeholder case studies |

---

## 2. Technology Stack & Dependencies

- **Core Framework**: Next.js 16.4.5 (App Router, Turbopack, React Server Components, Static Site Generation).
- **Runtime & Language**: React 19.3.0, React DOM 19.3.0, TypeScript 5 (Strict Mode).
- **Styling Architecture**: Tailwind CSS v4 (`@tailwindcss/turbopack`), PostCSS, Theme CSS variables.
- **Animation Ecosystem**:
  - `motion` (formerly Framer Motion) `14.10.1`
  - `gsap` `3.15.1` & `@gsap/react` `2.1.2`
  - `lenis` `1.3.27`
  - `animejs` `4.5.0`
  - `@formkit/auto-animate` `0.10.2`
  - `three` `0.187.0`
- **UI & Form Management**:
  - Radix UI accessible primitives (`@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-tabs`)
  - `react-hook-form` `7.91.0` + `@hookform/resolvers` `7.0.3`
  - `zod` `4.6.7`
  - `lucide-react` `1.70.0`
- **Testing & Quality Tools**:
  - Playwright Test `1.65.0` (E2E, responsive audits, accessibility checks, video recording)
  - Lighthouse `13.6.0` (Core Web Vitals & quality scores)
  - ESLint 9 (`eslint-config-next`, strict hooks, accessibility plugin)

---

## 3. Content & Brand Token Inventory

### 3.1 Color Palette
- **Carbon Ink (`--ink`)**: `#191B1E` — Primary text, dark backgrounds, high-contrast framing.
- **Warm Ivory (`--ivory`)**: `#F5F3ED` — Main page surface background, editorial warmth.
- **Terracotta (`--terra`)**: `#D36B4D` — Primary accent, CTAs, active highlights, key metrics.
- **Stone Grey (`--stone`)**: `#92938D` — Decorative rules, large secondary numerals, borders.
- **Stone Text (`--stone-text`)**: `#6B6C67` — Secondary body copy (WCAG AA compliant contrast > 4.6:1 on Ivory).
- **Soft Sand (`--sand`)**: `#E6E2D9` — Borders, subtle panel fills, secondary dividers.
- **Muted Sage (`--sage`)**: `#DCE3DD` — Occasional accent cards, tech ecosystem highlight badges.

### 3.2 Typography Hierarchy
- **Display / Main Headings**: `Syne` (Bold, 700/800) — Bold geometric boutique personality.
- **Subheadings / Tech Labels**: `Space Grotesk` (Medium/Bold, 500/700) — Architectural technical precision.
- **Body & Longform**: `Inter` (Regular/Medium, 400/500) — High readability at all sizes.
- **Telemetry, Metrics & Code**: `JetBrains Mono` (Regular/Bold) — Monospaced data, indices, timelines.

### 3.3 Brand Assets
- `public/brand/logo-lockup.png` (Symbol + OFFSCRIPT SOLUTION wordmark)
- `public/brand/logo-lockup-light.png` (Ivory-remapped version for dark Ink surfaces)
- `public/brand/logo-wordmark.png` (Wordmark only)
- `public/brand/logo-symbol-flat.png` (OS symbol flat for app icons & favicon)
- `public/brand/logo-symbol-3d.png` (OS symbol 3D render for hero, loader, and CTA accents)
- Optimized `.webp` and `.avif` companion formats for zero-shift delivery.

---

## 4. Invariant Functionality (Must Not Break)

1. **Consultation Intake Form (`/contact`)**:
   - Client-side validation: instant inline field error states for missing required fields.
   - API endpoint `/api/contact`: rate limiting, honeypot drop, proper JSON response.
   - Success state with reference ID and SLA commitment ("Within 24 Business Hours").
2. **Work Portfolio Dual Filtering (`/work`)**:
   - Discipline filters (Software, AI, Cloud, Automation, Web/Mobile, UI/UX).
   - Status filters (Commercial, Prototype, Academic, Concept).
   - Keyboard operability (`Tab`, `Space`, `Enter`).
3. **Insights Journal Hub Filtering (`/insights`)**:
   - Filter by research area.
   - Dynamic update of featured article and article grid.
4. **Accessible Lightbox Modal (`/work/[slug]`)**:
   - Opens full-resolution architecture view on card click.
   - Closes on Escape, background overlay click, or Close button click.
5. **Draft Article Protection**:
   - `/insights/template-architectural-decision-records` MUST strictly return HTTP 404.
   - RSS feed and sitemap MUST exclude drafts and placeholder case studies.
6. **Code Blocks & Reading Progress**:
   - Single-click clipboard copy with status confirmation.
   - Sticky top reading progress bar on longform essays.

---

## 5. Current Deficiencies & UX Alignment Issues

### 5.1 Animation & Motion Deficiencies
1. **Unsynchronized Smooth Scroll**: Lenis is initialized in `SmoothScroll.tsx` but is not synchronized with GSAP ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`), causing occasional frame jitter when scrubbed scroll triggers fire.
2. **Hero Entrance Sequencing**: The hero text renders statically with a basic Motion stagger, lacking the dramatic editorial kinetic reveal expected of an international boutique studio.
3. **Scroll Storytelling**: The Brand Statement ("Engineered Differently") uses `ScrollWords` opacity scrubbing, but the pin and scrub timing could be smoother with Lenis + ScrollTrigger.
4. **Interactive Hover Feedback**: Cards in Services, Bento grids, and Work galleries have basic border transitions rather than responsive magnetic micro-interactions or smooth spotlight fills.

### 5.2 Layout & Alignment Inconsistencies
1. **Header Spacing Discrepancies**: The distance between top navigation and hero headings varies slightly across `/about`, `/contact`, and `/insights` due to mixed `pt-32` vs `pt-36` vs `pt-40` classes.
2. **Bento Card Hierarchy**: In `SolutionsSection.tsx`, grid cards have variable vertical alignment when title lengths vary across 2 or 3 lines.
3. **Mobile Heading Hierarchy**: On smaller viewports (390px and below), some long titles in `/services/[slug]` wrap awkwardly across 4 lines without balanced text wrapping (`text-wrap: balance`).
4. **Touch Targets**: Some filter pills on mobile have 36px touch heights; WCAG 2.2 target criterion recommends at least 44x44px touch targets.

### 5.3 Baseline Performance & Lighthouse Scores (Mobile Profile)
- **Performance**: 83 / 100 (Target: >= 90)
  - Primary bottleneck: Largest Contentful Paint (LCP) was 3.6s on mobile profile due to un-cached font rendering and initial hero SVG path computation.
- **Accessibility**: 96 / 100 (Target: 100)
  - Missing minor ARIA labels on back-to-top button and filter container roles.
- **Best Practices**: 96 / 100 (Target: >= 95)
- **SEO**: 100 / 100 (Target: >= 95)

---

## 6. High-Leverage Opportunities

1. **Global SmoothScroll Engine**: One centralized Lenis + GSAP ScrollTrigger sync hook with proper `useGSAP` scope and automatic garbage collection.
2. **Award-Quality Hero Reveal**: Choreographed kinetic text entrance combining Syne split-type motion with smooth SVG path draw and subtle mouse-following parallax.
3. **Spotlight & Magnetic Cards**: Clean, CSS-accelerated cursor-following spotlight glows on Carbon Ink cards and Soft Sand bento boxes without layout thrashing.
4. **Balanced Typography & Flawless Alignment**: Standardized `page-hero-padding` token, `text-wrap: balance` on all editorial headlines, and strict 44px touch target compliance on mobile.
5. **Fluid Page Transitions**: Polished, subtle page-entry wipe using Warm Ivory and Terracotta accents that feels instantaneous and cinematic.

