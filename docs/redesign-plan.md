# OFFSCRIPT SOLUTION — Animated Front-End Redesign Plan

**Document Ref**: `/docs/redesign-plan.md`  
**Status**: APPROVED & IN-PROGRESS  
**Branch**: `redesign/animated-v2`  
**Engineering Goal**: Rebuild the front-end into an award-quality, modern, animated website with flawless alignment, 60fps smooth scrolling, strict performance, and 100% functional integrity.

---

## 1. Visual Direction & Design System

### 1.1 Aesthetic Philosophy
The aesthetic is **Art-Directed Architectural Modernism**:
- Resembles a top-tier Swiss/Nordic technology design studio (think Pentagram meets teenage engineering and Stripe Press).
- Strictly rejects generic SaaS templates, floating purple blob gradients, and chaotic multi-colored glow effects.
- Relies on sharp geometry, asymmetric editorial grids, generous whitespace, warm physical paper tones (Warm Ivory), dense Carbon Ink frames, and disciplined Terracotta accents.

### 1.2 Color Token Architecture (CSS Variables)

```css
:root {
  --ink: #191B1E;          /* Primary text, dark framing, high contrast */
  --ivory: #F5F3ED;        /* Natural editorial surface background */
  --terra: #D36B4D;        /* Primary accent, CTAs, interactive highlights */
  --stone: #92938D;        /* Decorative hairlines, secondary markers */
  --stone-text: #6B6C67;   /* Secondary body copy (WCAG AA > 4.6:1 contrast) */
  --sand: #E6E2D9;         /* Structural borders, subtle panel fills */
  --sage: #DCE3DD;         /* Supporting tech badges and accent surfaces */
  --card-hover: rgba(25, 27, 30, 0.04);
}
```

### 1.3 Typography System
1. **Display & Hero Titles**: `Syne` (Bold / Extra Bold, 700/800) — Sculptural, confident, boutique identity.
2. **Technical Section Headings**: `Space Grotesk` (SemiBold / Bold, 600/700) — Precise, architectural, modern engineering.
3. **Editorial & Body Copy**: `Inter` (Regular / Medium, 400/500) — High-legibility humanist sans-serif.
4. **Telemetry, Code & Indices**: `JetBrains Mono` (Medium / Bold) — Monospaced technical telemetry, code snippets, timestamps.

### 1.4 Spacing, Radius & Elevation Scale
- **Spacing Rhythm**: 4px base modular scale:
  - Micro: `8px`, `12px`, `16px`
  - Macro: `24px`, `32px`, `48px`, `64px`, `96px`, `128px`
  - Hero Standard: `pt-36 sm:pt-44 pb-20 sm:pb-28` across all sub-pages.
- **Border Radius Language**:
  - Cards, Bento cells, and Dialogs: `rounded-none` or subtle `rounded-xs` (2px max) for disciplined architectural feel.
  - Buttons and Inputs: Sharp rectangular `rounded-none`.
  - Filter Pills & Category Tags: `rounded-full` exclusively for chips and badges.
- **Shadow & Elevation Language**:
  - Zero heavy drop shadows.
  - Subtle architectural elevation: `shadow-[0_8px_30px_rgba(25,27,30,0.04)]` on elevated cards.
  - Hairline borders: `1px solid var(--sand)` or `1px solid var(--ink)`.

---

## 2. Animation System & Tool Matrix (One Tool Per Job)

To prevent library bloat and maintain 60fps frame rates, we assign **ONE tool per job**:

| Library | Specific Responsibility | Implementation Rule |
|---|---|---|
| **Lenis (`lenis/react`)** | Viewport-wide smooth scroll with hardware acceleration | Single provider in `SmoothScroll.tsx`, synced with GSAP ScrollTrigger |
| **GSAP + ScrollTrigger** | Scroll-driven timeline storytelling, pinned text illumination, horizontal marquees | Cleaned up with `@gsap/react` `useGSAP` or explicit `ScrollTrigger.kill()` |
| **Motion (`motion/react`)** | Component transitions, filter list reordering, accessible dialog modals, hover/tap micro-interactions | Standardized easing curves; animate `transform` and `opacity` only |
| **Spotlight Card (React Bits)** | Cursor-following radial light on Carbon Ink cards | CSS radial-gradient driven by pointer coordinates; zero layout thrashing |
| **Text Reveal (Motion/GSAP)** | Staggered kinetic character and word entrance on hero and section titles | `overflow-hidden` container with `y: "100%"` to `y: 0` entrance |
| **Topology Grid (Canvas)** | Ambient interactive grid topology on Carbon Ink sections | Lightweight 2D canvas (< 10 KB) with device pixel ratio scaling |

### 2.1 Motion Rules & Guardrails
- **Timing**:
  - UI micro-interactions (hovers, taps, toggles): `200ms – 300ms`.
  - Component reveals & modal transitions: `350ms – 500ms`.
  - Hero entrance choreography: `800ms – 1000ms`.
  - Scroll scrubbed sequences: Linked directly to scroll progress (`scrub: 1`).
- **Easing Curves**:
  - Editorial Smooth Entrance: `cubic-bezier(0.16, 1, 0.3, 1)` (outExpo).
  - Standard UI Interaction: `cubic-bezier(0.2, 0.7, 0.1, 1)`.
- **Reduced Motion Compliance**:
  - All primitives must check `useReducedMotion()`.
  - When active, all parallax, scrub, and kinetic transforms are disabled; content renders statically at `opacity: 1`.

---

## 3. Page-by-Page & Section-by-Section Blueprint

### 3.1 Homepage (`/`)
1. **Header Navigation**:
   - Sticky backdrop blur with hairline border.
   - Active route underline indicator (`layoutId="nav-underline"`).
   - Mobile menu overlay with circular clip-path reveal.
2. **Hero Section**:
   - Staggered `TextReveal` on "OFFSCRIPT SOLUTION" & "Engineered Differently."
   - Animated SVG OS symbol composition with GSAP stroke draw (`DrawPath`) and float loop.
   - Ambient background grid with subtle mouse interaction.
   - Hairline scroll cue with pulsating diamond indicator.
3. **Marquee Strip**:
   - Infinitely looping Syne discipline ticker (`SOFTWARE ENGINEERING // APPLIED AI // CLOUD INFRASTRUCTURE...`).
   - Smooth pause on hover; zero CPU spike.
4. **Brand Ethos Statement (Carbon Ink)**:
   - Pinned scroll sequence with `ScrollWords` progressive word-by-word illumination.
   - Ghosted 3D logo watermark rotating subtly on scroll scrub.
5. **Services Accordion**:
   - 6 numbered capability rows with smooth expand/collapse.
   - Hover row translation (`x: 8px`) and active arrow indicator.
6. **Studio Approach Timeline**:
   - 4-phase sequential timeline on Soft Sand with scroll-fill hairline progress and active step indicators.
7. **Custom Solutions Bento Grid**:
   - Asymmetric 12-column Bento rhythm (7/5, 4/4/4, 12).
   - Cursor-following `SpotlightCard` effect on card hover.
8. **Selected Work Portfolio Showcase**:
   - Interactive category filter pills with fluid layout transition.
   - Project cards with status badges and hover frame zoom (`scale: 1.02`).
9. **Why OFFSCRIPT**:
   - 4 oversized Terracotta numerals with staggered scroll entrance.
10. **Technology Ecosystem**:
    - Categorized language, framework, and cloud tags with hover elevation.
11. **Final CTA & Intake Launchpad**:
    - Carbon Ink section with oversized headline, floating 3D logo asset, and direct intake button.
12. **Footer**:
    - Full site directory, legal links, response SLA note, and copyright notice.

### 3.2 Services Suite (`/services` & `/services/[slug]`)
- **Overview (`/services`)**:
  - Editorial hero with Syne headline.
  - 6 large capability cards with deliverables preview and deep-dive link.
- **Detail Pages (`/services/[slug]`)**:
  - Distinct section rhythms (problem-first, deliverable-forward, technical-bento, workflow-matrix, infrastructure-split, human-narrative).
  - Technical architecture topology diagram with staggered node entry.
  - Interactive FAQ accordion with `aria-expanded` transitions.

### 3.3 Solutions Hub (`/solutions`)
- Editorial bento grid showcasing 6 solution groups.
- Detailed 4-stage engineering approach breakdown.

### 3.4 Work & Case Studies (`/work` & `/work/[slug]`)
- **Portfolio Hub (`/work`)**:
  - Dual filter toolbar (Discipline + Status) with instant keyboard navigation.
  - Smooth card reordering with Motion layout animation.
- **Detail Pages (`/work/[slug]`)**:
  - Full PART 6.5 order: back link, hero, metadata rail, challenge, objectives, architecture topology, stack badges, benchmark telemetry, and accessible Radix Lightbox gallery.

### 3.5 Insights Journal (`/insights` & `/insights/[slug]`)
- **Journal Index (`/insights`)**:
  - Research area category filter.
  - Featured article card with date and reading time.
  - Remaining articles grid.
- **Detail Pages (`/insights/[slug]`)**:
  - Sticky reading progress bar at top of viewport.
  - Interactive table of contents with active scroll spy.
  - Syntax-highlighted code blocks with single-click copy button.
  - Architectural callouts, pull quotes, and native share buttons.
  - Strict 404 enforcement on draft essays.

### 3.6 Company & Conversion Pages (`/about`, `/contact`, `/privacy`, `/terms`)
- **About (`/about`)**:
  - Editorial hero, 4-point operational comparison matrix (Agency vs OFFSCRIPT), 4 engineering tenets, studio facts.
- **Contact (`/contact`)**:
  - 4-item information rail (Email, 24h SLA, Bilateral NDA, Global Model).
  - Interactive multi-step consultation intake form with Zod validation.
  - Honeypot anti-spam protection.
  - Instant SLA confirmation screen upon submission.
- **Legal (`/privacy`, `/terms`)**:
  - Clean editorial layouts on Warm Ivory with metadata rails and detailed clauses.
- **System (`not-found.tsx`, `error.tsx`, `global-error.tsx`)**:
  - Branded 404 with quick destinations; error boundaries with retry actions.

---

## 4. Performance & Quality Targets

- **Performance Budget**:
  - Total JS < 300 KB compressed.
  - CSS < 80 KB compressed.
  - Web fonts < 100 KB total.
  - Above-the-fold images < 400 KB total.
- **Target Lighthouse Scores (Mobile Profile)**:
  - **Performance**: >= 90 / 100 (elevating from baseline 83).
  - **Accessibility**: 100 / 100 (elevating from baseline 96).
  - **Best Practices**: >= 95 / 100.
  - **SEO**: >= 95 / 100.
- **Core Web Vitals Targets**:
  - Largest Contentful Paint (LCP): < 2.5s.
  - Cumulative Layout Shift (CLS): < 0.05.
  - Interaction to Next Paint (INP): < 150ms.
- **Zero Breakpoints Horizontal Overflow**:
  - Verified across 390px, 768px, 1024px, 1440px, and 1920px.
- **Zero Console Errors**:
  - 0 errors across all routes and interactions.

