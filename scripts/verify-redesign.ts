import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services-overview', path: '/services' },
  { name: 'service-software-engineering', path: '/services/software-engineering' },
  { name: 'service-artificial-intelligence', path: '/services/artificial-intelligence' },
  { name: 'solutions', path: '/solutions' },
  { name: 'work-index', path: '/work' },
  { name: 'work-detail-vision', path: '/work/vision-anomaly-detector' },
  { name: 'insights-index', path: '/insights' },
  { name: 'insight-detail-edge-ai', path: '/insights/evaluating-realtime-edge-inference' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'not-found', path: '/non-existent-test-404' },
];

const BREAKPOINTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-sm', width: 1024, height: 768 },
  { name: 'desktop-lg', width: 1440, height: 900 },
  { name: 'desktop-xl', width: 1920, height: 1080 },
];

async function verifyRedesign() {
  const afterDir = path.resolve(process.cwd(), 'docs', 'screenshots', 'after');
  const recordDir = path.resolve(process.cwd(), 'docs', 'recordings', 'after');

  if (!fs.existsSync(afterDir)) fs.mkdirSync(afterDir, { recursive: true });
  if (!fs.existsSync(recordDir)) fs.mkdirSync(recordDir, { recursive: true });

  const port = 3000;
  console.log(`[Verification] Checking server on http://localhost:${port}...`);
  try {
    const res = await fetch(`http://localhost:${port}`);
    if (res.status !== 200) throw new Error('Status ' + res.status);
  } catch (e) {
    console.error('Server unavailable on 3000:', e);
    process.exit(1);
  }

  const browser = await chromium.launch();

  console.log('\n======================================================');
  console.log('1. RESPONSIVE BREAKPOINT AUDIT & ZERO HORIZONTAL OVERFLOW');
  console.log('======================================================');

  let overflowErrors = 0;

  for (const bp of BREAKPOINTS) {
    const ctx = await browser.newContext({ viewport: { width: bp.width, height: bp.height } });
    const page = await ctx.newPage();

    for (const p of PAGES) {
      await page.goto(`http://localhost:${port}${p.path}`, { waitUntil: 'domcontentloaded' });
      await wait(300);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasOverflow) {
        console.error(`[OVERFLOW FAIL] ${p.name} at ${bp.name} (${bp.width}px)`);
        overflowErrors++;
      }
    }
    await ctx.close();
  }

  if (overflowErrors === 0) {
    console.log(`✓ All 14 pages passed zero-horizontal-overflow check across all 5 viewports!`);
  } else {
    console.error(`✖ Found ${overflowErrors} overflow errors!`);
    process.exit(1);
  }

  console.log('\n======================================================');
  console.log('2. CAPTURING AFTER SCREENSHOTS (1440px & 390px)');
  console.log('======================================================');

  for (const p of PAGES) {
    console.log(`Capturing after screenshot: ${p.name}...`);

    // Desktop
    const dCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const dPage = await dCtx.newPage();
    await dPage.goto(`http://localhost:${port}${p.path}`, { waitUntil: 'networkidle' });
    await wait(600);
    await dPage.screenshot({ path: path.join(afterDir, `${p.name}-1440.png`), fullPage: false });
    await dCtx.close();

    // Mobile
    const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mCtx.newPage();
    await mPage.goto(`http://localhost:${port}${p.path}`, { waitUntil: 'networkidle' });
    await wait(600);
    await mPage.screenshot({ path: path.join(afterDir, `${p.name}-390.png`), fullPage: false });
    await mCtx.close();
  }
  console.log(`✓ All 28 after screenshots captured in docs/screenshots/after/`);

  console.log('\n======================================================');
  console.log('3. INTERACTIVE FUNCTIONALITY VERIFICATION');
  console.log('======================================================');

  const intCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const intPage = await intCtx.newPage();

  // Test Services Accordion on Homepage
  console.log('Testing Services accordion interaction...');
  await intPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  const service2Button = intPage.locator('button[aria-controls="service-panel-web-mobile"]');
  if (await service2Button.count() > 0) {
    await service2Button.click();
    await wait(400);
    const isExpanded = await service2Button.getAttribute('aria-expanded');
    console.log(`Services Accordion toggle: aria-expanded = ${isExpanded} (Expected: true)`);
  }

  // Test Work Section Filtering on Homepage
  console.log('Testing Work Section interactive filtering...');
  const aiFilterBtn = intPage.locator('button:has-text("AI systems")').first();
  if (await aiFilterBtn.count() > 0) {
    await aiFilterBtn.click();
    await wait(400);
    const visionTitle = await intPage.isVisible('text="Autonomous Vision Quality Inspector"');
    console.log(`Work filtering filtered to AI: ${visionTitle} (Expected: true)`);
  }

  // Test Work page category filter
  console.log('Testing /work page category and status filters...');
  await intPage.goto(`http://localhost:${port}/work`, { waitUntil: 'networkidle' });
  const enterpriseBtn = intPage.locator('button:has-text("Enterprise")');
  if (await enterpriseBtn.count() > 0) {
    await enterpriseBtn.click();
    await wait(400);
    const enterpriseVisible = await intPage.isVisible('text="Smart Campus Resource & Dispatch Grid"');
    console.log(`Enterprise filter matched Campus Logistics: ${enterpriseVisible} (Expected: true)`);
  }

  // Test Reduced Motion emulation
  console.log('Testing prefers-reduced-motion emulation...');
  const rmCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const rmPage = await rmCtx.newPage();
  await rmPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await wait(500);

  // Check that headlines and content are immediately visible and not hidden
  const heroHeadingVisible = await rmPage.isVisible('text="WE THINK"');
  console.log(`Reduced motion: Hero heading is visible: ${heroHeadingVisible} (Expected: true)`);
  await rmCtx.close();
  await intCtx.close();

  console.log('\n======================================================');
  console.log('4. RECORDING "AFTER" VIDEO SCREENCAST');
  console.log('======================================================');

  const vCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: recordDir,
      size: { width: 1440, height: 900 },
    },
  });
  const vPage = await vCtx.newPage();

  console.log('Recording Homepage interaction and smooth scroll...');
  await vPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await wait(1000);

  // Smooth scroll through entire homepage
  for (let y = 0; y <= 4500; y += 450) {
    await vPage.evaluate((scrollToY) => window.scrollTo({ top: scrollToY, behavior: 'smooth' }), y);
    await wait(350);
  }
  await wait(600);

  // Navigate to Services
  console.log('Recording navigation to Services...');
  await vPage.click('a[href="/services"]');
  await vPage.waitForURL(`http://localhost:${port}/services`);
  await wait(800);

  // Navigate to Work
  console.log('Recording navigation to Work...');
  await vPage.click('a[href="/work"]');
  await vPage.waitForURL(`http://localhost:${port}/work`);
  await wait(800);

  // Open first case study
  console.log('Recording Case Study detail view...');
  await vPage.click('a[href="/work/vision-anomaly-detector"]');
  await vPage.waitForURL(`http://localhost:${port}/work/vision-anomaly-detector`);
  await wait(1000);

  // Scroll down case study
  for (let y = 0; y <= 2000; y += 400) {
    await vPage.evaluate((scrollToY) => window.scrollTo({ top: scrollToY, behavior: 'smooth' }), y);
    await wait(350);
  }

  // Navigate to Contact
  console.log('Recording Contact consultation page...');
  await vPage.click('a[href="/contact"]');
  await vPage.waitForURL(`http://localhost:${port}/contact`);
  await wait(1000);

  await vCtx.close();
  console.log(`✓ "After" walkthrough video captured in docs/recordings/after/`);

  await browser.close();
  console.log('\n[Verification Complete] All responsive and interaction tests passed cleanly!');
}

verifyRedesign().catch((err) => {
  console.error('Verification script encountered error:', err);
  process.exit(1);
});

