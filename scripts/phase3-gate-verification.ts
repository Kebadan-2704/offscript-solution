import { chromium } from '@playwright/test';
import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SERVICE_SLUGS = [
  'software-engineering',
  'web-mobile-development',
  'artificial-intelligence',
  'automation-intelligent-workflows',
  'cloud-digital-infrastructure',
  'ui-ux-digital-experiences',
];

async function runPhase3Gate() {
  const screenshotsDir = path.resolve(process.cwd(), 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 3333;
  console.log(`[Phase 3 Gate] Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/services`);
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      await wait(1000);
    }
  }

  if (!ready) {
    throw new Error('Next.js server failed to respond on port ' + port);
  }

  console.log('Next.js server is ready. Launching Playwright Chromium...');
  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  const results = {
    overviewPassed: false,
    detailPagesPassed: 0,
    uniqueMetadataPassed: false,
    distinctRhythmPassed: false,
    accordionPassed: false,
    jsonLdPassed: false,
    overflowPassed: true,
  };

  const metadataMap: Record<string, { title: string; description: string }> = {};
  const blockOrderMap: Record<string, string[]> = {};

  try {
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });

    const desktopPage = await desktopContext.newPage();
    const mobilePage = await mobileContext.newPage();

    [desktopPage, mobilePage].forEach((p) => {
      p.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(`[Console Error]: ${msg.text()}`);
        }
      });
    });

    // 1. Audit /services Overview Page
    console.log('\n--- 1. Testing /services Overview Page ---');
    await desktopPage.goto(`http://localhost:${port}/services`, { waitUntil: 'networkidle' });
    await wait(1000);

    const overviewTitle = await desktopPage.title();
    console.log(`Overview Title: "${overviewTitle}"`);

    const overviewLinks = await desktopPage.$$eval('article a[href^="/services/"]', (links) =>
      links.map((a) => a.getAttribute('href'))
    );
    console.log(`Found ${overviewLinks.length} service links on overview page.`);

    const overviewScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (overviewScrollW > 1440) {
      console.error(`❌ Overflow on desktop /services: ${overviewScrollW}px`);
      results.overflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/services`, { waitUntil: 'networkidle' });
    await wait(1000);
    const mobileOverviewScrollW = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (mobileOverviewScrollW > 375) {
      console.error(`❌ Overflow on mobile /services: ${mobileOverviewScrollW}px`);
      results.overflowPassed = false;
    }

    await desktopPage.screenshot({
      path: path.join(screenshotsDir, 'services-index-1440.png'),
      fullPage: true,
    });
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, 'services-index-375.png'),
      fullPage: true,
    });

    results.overviewPassed = overviewLinks.length >= 6;
    console.log(`Overview Page Check: ${results.overviewPassed ? '✅ PASS' : '❌ FAIL'}`);

    // 2. Audit All 6 Detail Pages
    console.log('\n--- 2. Testing 6 Detail Pages & Rhythm ---');
    for (const slug of SERVICE_SLUGS) {
      const pageUrl = `http://localhost:${port}/services/${slug}`;
      console.log(`Auditing /services/${slug}...`);

      await desktopPage.goto(pageUrl, { waitUntil: 'networkidle' });
      await wait(800);

      // Metadata check
      const pageTitle = await desktopPage.title();
      const metaDesc = await desktopPage.$eval('meta[name="description"]', (el) => el.getAttribute('content') || '');
      metadataMap[slug] = { title: pageTitle, description: metaDesc };

      // Distinct rhythm check: inspect sequence of section elements
      const sectionHeadings = await desktopPage.$$eval('section h2', (elements) =>
        elements.map((el) => (el.textContent || '').trim())
      );
      blockOrderMap[slug] = sectionHeadings;
      console.log(`  -> Sections rhythm: [${sectionHeadings.join('  >>  ')}]`);

      // Test FAQ accordion interactivity
      const firstFaqBtn = await desktopPage.$('button[id^="faq-btn-0"]');
      if (firstFaqBtn) {
        const isExpandedInitial = await firstFaqBtn.getAttribute('aria-expanded');
        await firstFaqBtn.click();
        await wait(200);
        const isExpandedAfterClick = await firstFaqBtn.getAttribute('aria-expanded');
        if (isExpandedInitial !== isExpandedAfterClick) {
          results.accordionPassed = true;
        }
      }

      // Check JSON-LD
      const jsonLdElements = await desktopPage.$$eval('script[type="application/ld+json"]', (scripts) =>
        scripts.map((s) => s.textContent || '')
      );
      let hasValidServiceJsonLd = false;
      let hasValidBreadcrumbJsonLd = false;
      for (const text of jsonLdElements) {
        try {
          const parsed = JSON.parse(text);
          if (parsed['@type'] === 'Service') hasValidServiceJsonLd = true;
          if (parsed['@type'] === 'BreadcrumbList') hasValidBreadcrumbJsonLd = true;
        } catch {
          // ignore
        }
      }
      if (hasValidServiceJsonLd && hasValidBreadcrumbJsonLd) {
        results.jsonLdPassed = true;
      }

      // Responsive overflow checks
      const dScroll = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
      if (dScroll > 1440) {
        console.error(`  ❌ Desktop overflow on /services/${slug}: ${dScroll}px`);
        results.overflowPassed = false;
      }

      await mobilePage.goto(pageUrl, { waitUntil: 'networkidle' });
      await wait(600);
      const mScroll = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
      if (mScroll > 375) {
        console.error(`  ❌ Mobile overflow on /services/${slug}: ${mScroll}px`);
        results.overflowPassed = false;
      }

      // Screenshots
      await desktopPage.screenshot({
        path: path.join(screenshotsDir, `service-${slug}-1440.png`),
        fullPage: true,
      });
      await mobilePage.screenshot({
        path: path.join(screenshotsDir, `service-${slug}-375.png`),
        fullPage: true,
      });

      results.detailPagesPassed++;
    }

    // 3. Verify Unique Metadata Across All 6 Pages
    const allTitles = Object.values(metadataMap).map((m) => m.title);
    const uniqueTitles = new Set(allTitles);
    const allDescs = Object.values(metadataMap).map((m) => m.description);
    const uniqueDescs = new Set(allDescs);

    results.uniqueMetadataPassed = uniqueTitles.size === SERVICE_SLUGS.length && uniqueDescs.size === SERVICE_SLUGS.length;
    console.log('\n--- 3. Metadata Uniqueness Audit ---');
    console.log(`Unique Titles: ${uniqueTitles.size}/${SERVICE_SLUGS.length}`);
    console.log(`Unique Descriptions: ${uniqueDescs.size}/${SERVICE_SLUGS.length}`);
    console.log(`Metadata Check: ${results.uniqueMetadataPassed ? '✅ PASS' : '❌ FAIL'}`);

    // 4. Verify Distinct Rhythm Across Pages
    const rhythmSignatures = Object.values(blockOrderMap).map((blocks) => blocks.join('||'));
    const uniqueRhythms = new Set(rhythmSignatures);
    results.distinctRhythmPassed = uniqueRhythms.size >= 4; // Multiple unique layouts confirmed
    console.log('\n--- 4. Layout Rhythm Audit ---');
    console.log(`Unique Block Orders: ${uniqueRhythms.size}/${SERVICE_SLUGS.length}`);
    console.log(`Distinct Rhythm Check: ${results.distinctRhythmPassed ? '✅ PASS' : '❌ FAIL'}`);

    // 5. Console Error Audit
    console.log('\n--- 5. Console Error Audit ---');
    if (consoleErrors.length === 0) {
      console.log('✅ PASS: Zero console errors logged across overview and all 6 detail pages.');
    } else {
      console.error(`❌ FAIL: Encountered ${consoleErrors.length} console errors:`, consoleErrors);
    }

    await desktopContext.close();
    await mobileContext.close();

    const gatePassed =
      results.overviewPassed &&
      results.detailPagesPassed === 6 &&
      results.uniqueMetadataPassed &&
      results.distinctRhythmPassed &&
      results.accordionPassed &&
      results.jsonLdPassed &&
      results.overflowPassed &&
      consoleErrors.length === 0;

    console.log('\n=======================================');
    console.log(`🏁 PHASE 3 GATE RESULT: ${gatePassed ? '🌟 PASSED' : '❌ FAILED'}`);
    console.log('=======================================');

    if (!gatePassed) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
    try {
      if (process.platform === 'win32' && server.pid) {
        execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
      } else {
        server.kill();
      }
    } catch {
      // ignore
    }
  }
}

runPhase3Gate().catch((err) => {
  console.error('Phase 3 verification script error:', err);
  process.exit(1);
});

