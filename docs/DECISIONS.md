# Architectural & Design Decisions

This document records the foundational technical and design decisions made for the official OFFSCRIPT SOLUTION website.

---

## 1. Framework: Next.js (App Router) with TypeScript

- **Decision**: Use Next.js 16 (App Router) with TypeScript instead of the initial brief's Vite + React + React Router suggestion.
- **Rationale**:
  - OFFSCRIPT SOLUTION is a content-led, internationally competitive studio where static generation (SSG), search engine optimisation (SEO), dynamic Open Graph images (`next/og`), XML sitemaps, robots.txt, and MDX articles (Work case studies and Insights journal) are paramount.
  - Next.js provides automatic route-level code splitting, asset optimisation (`next/image`, `next/font`), streaming SSR, and server-side API routes for secure enquiry form processing (with Turnstile and rate limiting) without needing a separate backend server.
  - Route-level metadata and static parameters (`generateStaticParams`) ensure all service, case-study, and insight routes are pre-rendered at build time.

---

## 2. Technology Stack Omissions (Deliberately Not Installed)

- **Three.js / React Three Fiber**:
  - *Omitted*. The brief explicitly forbids random 3D decoration. The hero visual is an art-directed SVG composition with GSAP stroke animations, float loops, and subtle mouse parallax, which delivers performance and distinct visual identity without hundreds of kilobytes of WebGL overhead.
- **Redux / MobX / Zustand**:
  - *Omitted*. The site's state is predominantly URL-driven (filters, routes) and local component state (modals, accordions, mobile menu, enquiry form). React 19 primitives and URL query params suffice.
- **CSS-in-JS (styled-components, Emotion)**:
  - *Omitted*. Incompatible with React Server Components without runtime client-side style injection. Tailwind CSS v4 provides zero-runtime styling with theme tokens.
- **Heavy UI Kits (MUI, Chakra, Ant Design)**:
  - *Omitted*. They impose generic enterprise/SaaS visual identities that directly contradict the art-directed boutique studio aesthetic. Instead, we use unstyled, accessible Radix UI primitives with bespoke Tailwind styling.
- **External Carousel Libraries (Swiper, Slick)**:
  - *Omitted*. CSS scroll-snap (`scroll-snap-type: x mandatory`) and native browser scrolling provide 60fps performance without bundle bloat.

---

## 3. Typography & Contrast Adjustments

- **`--stone-text` Derivation**:
  - The brand token `--stone` (Stone Grey, `#92938D`) has a contrast ratio of ~3.03:1 against `--ivory` (`#F5F3ED`). This fails WCAG AA for normal text (< 18px / < 14px bold), which requires a minimum ratio of 4.5:1.
  - We derive `--stone-text: #6B6C67`, which delivers a contrast ratio of ~4.85:1 against Warm Ivory, fully passing WCAG 2.2 AA.
  - `--stone` (`#92938D`) is preserved strictly for decorative hairline rules, large secondary numerals, and borders where text contrast thresholds do not apply.
- **White Text on Terracotta**:
  - White text (`#FFFFFF`) on Terracotta (`#D36B4D`) produces a contrast ratio of ~3.34:1, failing AA for small text (< 18px).
  - Small primary action buttons on Terracotta will therefore use Carbon Ink text (`#191B1E` on `#D36B4D` = ~5.16:1 ratio, passing WCAG AA), or white text only when the font size is at least 18px bold / 24px display.

---

## 4. Logo Pipeline & Dark Background Adaptation

- **Source Logos**:
  - `brand/logo-lockup.png`: Wordmark + Symbol (primary mark)
  - `brand/logo-wordmark.png`: Wordmark only
  - `brand/logo-symbol-flat.png`: Flat gradient symbol (favicon, small marks)
  - `brand/logo-symbol-3d.png`: 3D render (hero accent, loader, CTA)
- **Dark Mode / Ink Section Challenge**:
  - The primary wordmark is rendered in near-black ink, disappearing on Carbon Ink (`#191B1E`) backgrounds.
  - *Resolution*: An automated script (`scripts/make-logo-light.ts`) uses `sharp` to remap near-black pixels to Warm Ivory (`#F5F3ED`) while preserving the orange accent, antialiased edge alpha, and exact vector proportions. Output is saved to `public/brand/logo-lockup-light.png`.

---

## 5. Analytics & Privacy

- **Provider**: Plausible Analytics (or Vercel Analytics if deployed on Vercel).
- **Privacy Model**: No cookies are stored, no cross-site tracking, and fully GDPR/PECR/CCPA compliant by default.
- **Banner Decision**: Because Plausible does not set cookies or collect personal identifying data, no intrusive cookie banner is required under EU/UK ePrivacy laws.

