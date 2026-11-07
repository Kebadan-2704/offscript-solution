import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  const screenshotsDir = path.resolve(process.cwd(), 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 3333;
  console.log(`Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout?.on('data', (d) => console.log(`[Next.js stdout]: ${d.toString().trim()}`));
  server.stderr?.on('data', (d) => console.error(`[Next.js stderr]: ${d.toString().trim()}`));

  // Wait for server to boot
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

  try {
    // 1. Mobile Header (375px)
    console.log('Capturing mobile header at 375px...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://localhost:${port}`, { waitUntil: 'networkidle' });
    await wait(2000); // Wait for first-visit loader curtain to exit

    // Target the header element specifically
    const headerMobile = mobilePage.locator('header');
    await headerMobile.screenshot({
      path: path.join(screenshotsDir, 'header-375.png'),
    });
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, 'home-375-viewport.png'),
    });
    await mobileContext.close();

    // 2. Desktop Header (1440px)
    console.log('Capturing desktop header at 1440px...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`http://localhost:${port}`, { waitUntil: 'networkidle' });
    await wait(2000); // Wait for first-visit loader curtain to exit

    const headerDesktop = desktopPage.locator('header');
    await headerDesktop.screenshot({
      path: path.join(screenshotsDir, 'header-1440.png'),
    });
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, 'home-1440-viewport.png'),
    });
    await desktopContext.close();

    console.log('✅ Screenshots captured:');
    console.log('   - docs/screenshots/header-375.png');
    console.log('   - docs/screenshots/header-1440.png');
    console.log('   - docs/screenshots/home-375-viewport.png');
    console.log('   - docs/screenshots/home-1440-viewport.png');
  } finally {
    await browser.close();
    server.kill();
    // On Windows, also kill child processes if necessary
    if (process.platform === 'win32' && server.pid) {
      spawn('taskkill', ['/pid', String(server.pid), '/T', '/F']);
    }
  }
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
