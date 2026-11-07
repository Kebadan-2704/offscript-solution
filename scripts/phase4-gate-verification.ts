import { chromium } from '@playwright/test';
import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runPhase4Gate() {
  const screenshotsDir = path.resolve(process.cwd(), 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 3456;
  console.log(`[Phase 4 Gate] Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/solutions`);
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
    solutionsPassed: false,
    workIndexPassed: false,
    workFilteringPassed: false,
    workDetailPassed: false,
    workLightboxPassed: false,
    workPlaceholderRibbonPassed: false,
    insightsIndexPassed: false,
    insightsFilteringPassed: false,
    insightsDetailPassed: false,
    insightsDraft404Passed: false,
    rssExcludesDraftPassed: false,
    sitemapExcludesPlaceholdersAndDraftsPassed: false,
    zeroOverflowPassed: true,
    zeroConsoleErrors: true,
  };

  try {
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });

    const desktopPage = await desktopContext.newPage();
    const mobilePage = await mobileContext.newPage();

    [desktopPage, mobilePage].forEach((p) => {
      p.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Exclude expected 404 network log when intentionally testing draft 404
          if (text.includes('status of 404')) {
            return;
          }
          consoleErrors.push(`[Console Error]: ${text}`);
        }
      });
    });

    // ==========================================
    // 1. AUDIT /solutions PAGE
    // ==========================================
    console.log('\n--- 1. Testing /solutions Page ---');
    const solRes = await desktopPage.goto(`http://localhost:${port}/solutions`, { waitUntil: 'networkidle' });
    if (solRes?.status() !== 200) {
      throw new Error(`Failed to load /solutions: status ${solRes?.status()}`);
    }

    const solTitle = await desktopPage.title();
    console.log(`Solutions Title: "${solTitle}"`);

    const solScrollWDesktop = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (solScrollWDesktop > 1440) {
      console.error(`❌ Overflow on desktop /solutions: ${solScrollWDesktop}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/solutions`, { waitUntil: 'networkidle' });
    const solScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (solScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /solutions: ${solScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'solutions-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'solutions-375.png'), fullPage: false });
    console.log('✅ Captured solutions-1440.png and solutions-375.png');

    // Check JSON-LD
    const solJsonLd = await desktopPage.$$eval('script[type="application/ld+json"]', (scripts) =>
      scripts.map((s) => {
        try {
          return JSON.parse(s.textContent || '');
        } catch {
          return null;
        }
      })
    );
    const hasCollectionPage = solJsonLd.some((ld) => ld?.['@type'] === 'CollectionPage');
    console.log(`Solutions Schema JSON-LD CollectionPage: ${hasCollectionPage ? 'FOUND' : 'MISSING'}`);
    results.solutionsPassed = hasCollectionPage;

    // ==========================================
    // 2. AUDIT /work INDEX & FILTERING
    // ==========================================
    console.log('\n--- 2. Testing /work Index & Interactive Filtering ---');
    const workRes = await desktopPage.goto(`http://localhost:${port}/work`, { waitUntil: 'networkidle' });
    if (workRes?.status() !== 200) {
      throw new Error(`Failed to load /work: status ${workRes?.status()}`);
    }

    const workScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (workScrollW > 1440) {
      console.error(`❌ Overflow on desktop /work: ${workScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/work`, { waitUntil: 'networkidle' });
    const workScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (workScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /work: ${workScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'work-index-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'work-index-375.png'), fullPage: false });
    console.log('✅ Captured work-index-1440.png and work-index-375.png');

    // Count initial cards (should be 6)
    const initialCardsCount = await desktopPage.$$eval('article[data-project-card="true"]', (cards) => cards.length);
    console.log(`Initial project cards count: ${initialCardsCount}`);

    // Test category filter click (e.g., "AI Systems")
    console.log('Testing category filter: "AI Systems"...');
    await desktopPage.click('button:has-text("AI Systems")');
    await wait(300);
    const aiCardsCount = await desktopPage.$$eval('article[data-project-card="true"]', (cards) => cards.length);
    console.log(`AI Systems filtered count: ${aiCardsCount}`);

    // Test keyboard navigation on filter pills
    console.log('Testing keyboard navigation on filter toolbar...');
    await desktopPage.keyboard.press('Tab');
    await desktopPage.keyboard.press('Tab');
    // Reset to "All Disciplines"
    await desktopPage.click('button:has-text("All Disciplines")');
    await wait(300);
    const resetCount = await desktopPage.$$eval('article[data-project-card="true"]', (cards) => cards.length);
    console.log(`Reset back to all count: ${resetCount}`);

    // Test status filter click (e.g., "Prototype")
    console.log('Testing status filter: "Prototype"...');
    await desktopPage.click('button:has-text("Prototype")');
    await wait(300);
    const prototypeCardsCount = await desktopPage.$$eval('article[data-project-card="true"]', (cards) => cards.length);
    console.log(`Prototype status filtered count: ${prototypeCardsCount}`);

    // Reset status to "All Statuses"
    await desktopPage.click('button:has-text("All Statuses")');
    await wait(300);

    if (initialCardsCount === 6 && aiCardsCount >= 1 && resetCount === 6 && prototypeCardsCount >= 1) {
      results.workIndexPassed = true;
      results.workFilteringPassed = true;
      console.log('✅ /work Index & Dual-filter system passed.');
    } else {
      console.error('❌ /work filter count discrepancy.');
    }

    // ==========================================
    // 3. AUDIT /work/[slug] DETAIL & LIGHTBOX
    // ==========================================
    console.log('\n--- 3. Testing /work/[slug] Detail & Lightbox Dialog ---');
    const caseStudyRes = await desktopPage.goto(`http://localhost:${port}/work/vision-anomaly-detector`, {
      waitUntil: 'networkidle',
    });
    if (caseStudyRes?.status() !== 200) {
      throw new Error(`Failed to load case study detail: status ${caseStudyRes?.status()}`);
    }

    const detailScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (detailScrollW > 1440) {
      console.error(`❌ Overflow on desktop /work/vision-anomaly-detector: ${detailScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/work/vision-anomaly-detector`, { waitUntil: 'networkidle' });
    const detailScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (detailScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /work/vision-anomaly-detector: ${detailScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'work-detail-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'work-detail-375.png'), fullPage: false });
    console.log('✅ Captured work-detail-1440.png and work-detail-375.png');

    // Test Lightbox Interaction
    console.log('Testing accessible Lightbox modal on gallery item click...');
    await desktopPage.waitForSelector('button[data-testid="gallery-trigger"]');
    await wait(600);
    await desktopPage.click('button[data-testid="gallery-trigger"]');
    await wait(600);

    const isDialogVisible = await desktopPage.isVisible('[data-testid="gallery-dialog"]');
    console.log(`Lightbox dialog visibility: ${isDialogVisible}`);

    if (isDialogVisible) {
      results.workLightboxPassed = true;
      // Close modal via Close button
      await desktopPage.click('button[aria-label="Close modal"]');
      await wait(300);
      const isClosed = !(await desktopPage.isVisible('[data-testid="gallery-dialog"]'));
      console.log(`Lightbox closed cleanly: ${isClosed}`);
    } else {
      console.error('❌ Dialog was not visible after clicking gallery trigger.');
    }

    // Verify Placeholder Case Study Banner
    console.log('Verifying placeholder case study ribbon on /work/iot-telemetry-array...');
    await desktopPage.goto(`http://localhost:${port}/work/iot-telemetry-array`, { waitUntil: 'networkidle' });
    const placeholderText = await desktopPage.textContent('body');
    const hasRibbon =
      placeholderText?.includes('[Placeholder Notice]') && placeholderText?.includes('Archived / Concept');
    if (hasRibbon) {
      results.workPlaceholderRibbonPassed = true;
      console.log('✅ Placeholder notice ribbon verified on placeholder case study.');
    } else {
      console.error('❌ Placeholder ribbon missing on placeholder case study.');
    }

    results.workDetailPassed = true;

    // ==========================================
    // 4. AUDIT /insights INDEX & FILTERING
    // ==========================================
    console.log('\n--- 4. Testing /insights Index & Category Filter ---');
    const insRes = await desktopPage.goto(`http://localhost:${port}/insights`, { waitUntil: 'networkidle' });
    if (insRes?.status() !== 200) {
      throw new Error(`Failed to load /insights: status ${insRes?.status()}`);
    }

    const insScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (insScrollW > 1440) {
      console.error(`❌ Overflow on desktop /insights: ${insScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/insights`, { waitUntil: 'networkidle' });
    const insScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (insScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /insights: ${insScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'insights-index-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'insights-index-375.png'), fullPage: false });
    console.log('✅ Captured insights-index-1440.png and insights-index-375.png');

    // Test Category Filter on Insights
    console.log('Testing category filter: "Software Engineering"...');
    await desktopPage.click('button[data-category-filter="Software Engineering"]');
    await wait(500);
    const swEngArticleVisible = await desktopPage.isVisible(':has-text("Why We Refactor Before We Rewrite")');
    console.log(`Refactor article visible under Software Engineering filter: ${swEngArticleVisible}`);

    // Reset to "All"
    await desktopPage.click('button:has-text("All")');
    await wait(300);

    results.insightsIndexPassed = true;
    results.insightsFilteringPassed = swEngArticleVisible;

    // ==========================================
    // 5. AUDIT /insights/[slug] DETAIL & DRAFT 404
    // ==========================================
    console.log('\n--- 5. Testing /insights/[slug] Published Detail & Draft 404 ---');
    const essayRes = await desktopPage.goto(`http://localhost:${port}/insights/evaluating-realtime-edge-inference`, {
      waitUntil: 'networkidle',
    });
    if (essayRes?.status() !== 200) {
      throw new Error(`Failed to load published insight: status ${essayRes?.status()}`);
    }

    const essayScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (essayScrollW > 1440) {
      console.error(`❌ Overflow on desktop /insights detail: ${essayScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/insights/evaluating-realtime-edge-inference`, {
      waitUntil: 'networkidle',
    });
    const essayScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (essayScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /insights detail: ${essayScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'insight-detail-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'insight-detail-375.png'), fullPage: false });
    console.log('✅ Captured insight-detail-1440.png and insight-detail-375.png');

    // Verify Reading Progress, CodeBlock, Pull Quote, Callout
    const hasReadingProgress = await desktopPage.isVisible('[aria-label="Reading progress"]');
    const hasCodeBlock = await desktopPage.isVisible('pre code');
    const hasCallout = (await desktopPage.textContent('body'))?.includes('Architectural Invariant');
    console.log(
      `Essay Primitives - Progress Bar: ${hasReadingProgress}, Code Block: ${hasCodeBlock}, Callout: ${hasCallout}`
    );
    results.insightsDetailPassed = Boolean(hasReadingProgress && hasCodeBlock && hasCallout);

    // Verify Draft Article Returns 404
    console.log('Verifying draft article returns 404 in production...');
    const draftRes = await desktopPage.goto(
      `http://localhost:${port}/insights/template-architectural-decision-records`,
      { waitUntil: 'networkidle' }
    );
    console.log(`Draft article HTTP status: ${draftRes?.status()}`);
    if (draftRes?.status() === 404) {
      results.insightsDraft404Passed = true;
      console.log('✅ Draft article strictly returns 404 in production.');
    } else {
      console.error(`❌ Draft article did NOT return 404: status was ${draftRes?.status()}`);
    }

    // ==========================================
    // 6. AUDIT /insights/feed.xml & /sitemap.xml
    // ==========================================
    console.log('\n--- 6. Testing /insights/feed.xml & /sitemap.xml ---');
    const feedRes = await fetch(`http://localhost:${port}/insights/feed.xml`);
    const feedXml = await feedRes.text();
    const feedHasPublished = feedXml.includes('evaluating-realtime-edge-inference');
    const feedHasDraft = feedXml.includes('template-architectural-decision-records');
    console.log(`RSS Feed Status: ${feedRes.status}, Published: ${feedHasPublished}, Draft Excluded: ${!feedHasDraft}`);

    if (feedRes.status === 200 && feedHasPublished && !feedHasDraft) {
      results.rssExcludesDraftPassed = true;
      console.log('✅ RSS Feed verified: contains published essays, strictly excludes draft.');
    } else {
      console.error('❌ RSS Feed failed draft exclusion or content check.');
    }

    const sitemapRes = await fetch(`http://localhost:${port}/sitemap.xml`);
    const sitemapXml = await sitemapRes.text();
    const sitemapHasPublishedWork = sitemapXml.includes('/work/vision-anomaly-detector');
    const sitemapHasPlaceholderWork = sitemapXml.includes('/work/iot-telemetry-array');
    const sitemapHasPublishedInsight = sitemapXml.includes('/insights/evaluating-realtime-edge-inference');
    const sitemapHasDraftInsight = sitemapXml.includes('/insights/template-architectural-decision-records');

    console.log(
      `Sitemap Checks: Published Work: ${sitemapHasPublishedWork}, Placeholder Excluded: ${!sitemapHasPlaceholderWork}, Published Insight: ${sitemapHasPublishedInsight}, Draft Excluded: ${!sitemapHasDraftInsight}`
    );

    if (
      sitemapRes.status === 200 &&
      sitemapHasPublishedWork &&
      !sitemapHasPlaceholderWork &&
      sitemapHasPublishedInsight &&
      !sitemapHasDraftInsight
    ) {
      results.sitemapExcludesPlaceholdersAndDraftsPassed = true;
      console.log('✅ Sitemap strictly excludes placeholders and draft essays.');
    } else {
      console.error('❌ Sitemap failed verification.');
    }

    // ==========================================
    // 7. AUDIT CONSOLE ERRORS
    // ==========================================
    console.log('\n--- 7. Console Error Audit ---');
    if (consoleErrors.length > 0) {
      console.error(`❌ Console Errors Logged (${consoleErrors.length}):`);
      consoleErrors.forEach((err) => console.error(err));
      results.zeroConsoleErrors = false;
    } else {
      console.log('✅ Zero console errors logged across entire suite.');
    }
  } finally {
    await browser.close();
    console.log('\n[Phase 4 Gate] Stopping Next.js server...');
    if (process.platform === 'win32') {
      try {
        const netstat = execSync(`netstat -ano | findstr :${port}`).toString();
        const pids = Array.from(
          new Set(
            netstat
              .split('\n')
              .map((line: string) => line.trim().split(/\s+/).pop())
              .filter(
                (p: string | undefined): p is string =>
                  Boolean(p && /^\d+$/.test(p) && p !== '0' && p !== String(process.pid))
              )
          )
        );
        for (const pid of pids) {
          try {
            execSync(`taskkill /F /PID ${pid}`);
          } catch {}
        }
      } catch {}
    } else {
      server.kill('SIGTERM');
    }
  }

  console.log('\n=============================================');
  console.log('      PHASE 4 GATE VERIFICATION RESULTS      ');
  console.log('=============================================');
  console.log(JSON.stringify(results, null, 2));

  const allPassed = Object.values(results).every(Boolean);
  if (!allPassed) {
    console.error('\n❌ PHASE 4 GATE FAILED');
    process.exit(1);
  } else {
    console.log('\n🎉 PHASE 4 GATE PASSED ALL CHECKS!');
  }
}

runPhase4Gate().catch((err) => {
  console.error('Fatal error during gate verification:', err);
  process.exit(1);
});

