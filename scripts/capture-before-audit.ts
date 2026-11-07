import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PAGES_TO_AUDIT = [
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

async function captureBeforeAudit() {
  const baseDir = path.resolve(process.cwd(), 'docs', 'screenshots', 'before');
  const recordDir = path.resolve(process.cwd(), 'docs', 'recordings', 'before');

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
  if (!fs.existsSync(recordDir)) fs.mkdirSync(recordDir, { recursive: true });

  const port = 3000;
  console.log(`[Before Audit] Connecting to http://localhost:${port}...`);

  // Verify server is reachable
  try {
    const res = await fetch(`http://localhost:${port}`);
    if (res.status !== 200) throw new Error('Server returned ' + res.status);
  } catch (err) {
    console.error('Server on port 3000 not reachable, exiting:', err);
    process.exit(1);
  }

  const browser = await chromium.launch();

  console.log('\n--- 1. Capturing Desktop & Mobile Screenshots ---');
  for (const pageItem of PAGES_TO_AUDIT) {
    console.log(`Capturing: ${pageItem.name} (${pageItem.path})...`);

    // Desktop 1440
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const dPage = await desktopContext.newPage();
    await dPage.goto(`http://localhost:${port}${pageItem.path}`, { waitUntil: 'networkidle' });
    await wait(600);
    await dPage.screenshot({
      path: path.join(baseDir, `${pageItem.name}-1440.png`),
      fullPage: false,
    });
    await desktopContext.close();

    // Mobile 390
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const mPage = await mobileContext.newPage();
    await mPage.goto(`http://localhost:${port}${pageItem.path}`, { waitUntil: 'networkidle' });
    await wait(600);
    await mPage.screenshot({
      path: path.join(baseDir, `${pageItem.name}-390.png`),
      fullPage: false,
    });
    await mobileContext.close();
  }

  console.log('\n--- 2. Recording Screen Video Session ---');
  const videoContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: recordDir,
      size: { width: 1440, height: 900 },
    },
  });
  const videoPage = await videoContext.newPage();

  // Walk through Homepage
  console.log('Recording Homepage interaction...');
  await videoPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
  await wait(1000);

  // Smooth scroll down the page
  for (let y = 0; y <= 4000; y += 400) {
    await videoPage.evaluate((scrollToY) => window.scrollTo({ top: scrollToY, behavior: 'smooth' }), y);
    await wait(400);
  }
  await wait(800);

  // Navigate to Services
  console.log('Recording Services navigation...');
  await videoPage.click('a[href="/services"]');
  await videoPage.waitForURL(`http://localhost:${port}/services`);
  await wait(800);
  await videoPage.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await wait(600);

  // Navigate to Work
  console.log('Recording Work navigation & filter interaction...');
  await videoPage.click('a[href="/work"]');
  await videoPage.waitForURL(`http://localhost:${port}/work`);
  await wait(800);
  await videoPage.click('button:has-text("AI Systems")');
  await wait(600);
  await videoPage.click('button:has-text("All Disciplines")');
  await wait(600);

  // Navigate to Contact
  console.log('Recording Contact intake navigation...');
  await videoPage.click('a[href="/contact"]');
  await videoPage.waitForURL(`http://localhost:${port}/contact`);
  await wait(1000);

  await videoContext.close();
  console.log(`✅ Video recorded to ${recordDir}`);

  await browser.close();
  console.log('\n✅ Before Audit Captures Complete!');
}

captureBeforeAudit().catch((err) => {
  console.error('Fatal error during before audit capture:', err);
  process.exit(1);
});

