import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runGate() {
  const screenshotsDir = path.resolve(process.cwd(), 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 3333;
  console.log(`[Phase 2 Gate] Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'pipe',
  });

  // Wait for server ready
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}`);
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      await wait(1000);
    }
  }

  if (!ready) {
    server.kill();
    throw new Error('Next.js server failed to respond on port ' + port);
  }

  console.log('Next.js server is ready. Launching Playwright Chromium...');
  const browser = await chromium.launch();

  const widths = [375, 390, 430, 768, 1024, 1366, 1440, 1920];
  const overflowResults: Record<number, { width: number; scrollWidth: number; passed: boolean }> = {};
  const consoleErrors: string[] = [];

  try {
    // 1. Verify responsive design and horizontal scroll across all 8 breakpoints
    console.log('\n--- 1. Testing 8 Responsive Breakpoints & Overflow ---');

    for (const w of widths) {
      const context = await browser.newContext({
        viewport: { width: w, height: 900 },
        deviceScaleFactor: w < 768 ? 2 : 1,
      });

      const page = await context.newPage();

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(`[Console Error at ${w}px]: ${msg.text()}`);
        }
      });

      page.on('response', (res) => {
        if (res.status() === 404) {
          console.log(`[404 Response at ${w}px]: ${res.url()}`);
        }
      });

      await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle' });
      await wait(1500); // Allow first-visit loader to dismiss

      // Check for horizontal overflow: scrollWidth must be <= innerWidth
      const overflowData = await page.evaluate(() => {
        return {
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
        };
      });

      const passed = overflowData.scrollWidth <= overflowData.innerWidth;
      overflowResults[w] = {
        width: w,
        scrollWidth: overflowData.scrollWidth,
        passed,
      };

      console.log(
        `Breakpoint ${w}px: scrollWidth = ${overflowData.scrollWidth}px -> ${
          passed ? '✅ PASS (No overflow)' : '❌ FAIL (Horizontal overflow detected!)'
        }`
      );

      // Save full-page screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `home-${w}.png`),
        fullPage: true,
      });

      await context.close();
    }

    // 2. Capture reference-base-homepage.html at 1440 and 390 for side-by-side comparison
    console.log('\n--- 2. Capturing Reference HTML at 1440 and 390 ---');
    const refPath = path.resolve(process.cwd(), 'brand', 'reference-base-homepage.html');
    const refUrl = `file://${refPath.replace(/\\/g, '/')}`;

    const refContext1440 = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const refPage1440 = await refContext1440.newPage();
    await refPage1440.goto(refUrl);
    await wait(1000);
    await refPage1440.screenshot({
      path: path.join(screenshotsDir, 'reference-1440.png'),
      fullPage: true,
    });
    await refContext1440.close();

    const refContext390 = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const refPage390 = await refContext390.newPage();
    await refPage390.goto(refUrl);
    await wait(1000);
    await refPage390.screenshot({
      path: path.join(screenshotsDir, 'reference-390.png'),
      fullPage: true,
    });
    await refContext390.close();

    console.log('✅ Reference screenshots saved to docs/screenshots/reference-1440.png and reference-390.png');

    // 3. Log console errors report
    console.log('\n--- 3. Browser Console Error Audit ---');
    let hasErrors = false;
    if (consoleErrors.length === 0) {
      console.log('✅ PASS: Zero console errors across all breakpoints.');
    } else {
      hasErrors = true;
      console.error(`❌ FAIL: Encountered ${consoleErrors.length} console errors:`, consoleErrors);
    }

    const allOverflowPassed = Object.values(overflowResults).every((r) => r.passed);
    if (!allOverflowPassed) {
      hasErrors = true;
    }

    if (hasErrors) {
      console.error('\n❌ PHASE 2 GATE FAILED: Issues detected.');
      process.exitCode = 1;
    } else {
      console.log('\n🌟 PHASE 2 GATE PASSED: All 8 breakpoints verified with zero overflow and zero console errors.');
    }
  } finally {
    await browser.close();
    try {
      if (process.platform === 'win32' && server.pid) {
        const { execSync } = await import('child_process');
        execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
      } else {
        server.kill('SIGTERM');
      }
    } catch {
      // ignore
    }
  }
}

runGate().catch((err) => {
  console.error('Phase 2 Gate verification failed:', err);
  process.exit(1);
});

