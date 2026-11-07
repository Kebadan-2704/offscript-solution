import { chromium } from '@playwright/test';
import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runPhase5Gate() {
  const screenshotsDir = path.resolve(process.cwd(), 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 3456;
  console.log(`[Phase 5 Gate] Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/about`);
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
    aboutPassed: false,
    aboutJsonLdPassed: false,
    contactRenderPassed: false,
    contactValidationPassed: false,
    contactSubmissionPassed: false,
    contactHoneypotPassed: false,
    privacyPassed: false,
    termsPassed: false,
    custom404Passed: false,
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
          if (text.includes('status of 404')) {
            return;
          }
          consoleErrors.push(`[Console Error]: ${text}`);
        }
      });
    });

    // ==========================================
    // 1. AUDIT /about PAGE
    // ==========================================
    console.log('\n--- 1. Testing /about Page ---');
    const aboutRes = await desktopPage.goto(`http://localhost:${port}/about`, { waitUntil: 'networkidle' });
    if (aboutRes?.status() !== 200) {
      throw new Error(`Failed to load /about: status ${aboutRes?.status()}`);
    }

    const aboutTitle = await desktopPage.title();
    console.log(`About Page Title: "${aboutTitle}"`);

    const aboutScrollWDesktop = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (aboutScrollWDesktop > 1440) {
      console.error(`❌ Overflow on desktop /about: ${aboutScrollWDesktop}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/about`, { waitUntil: 'networkidle' });
    const aboutScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (aboutScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /about: ${aboutScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'about-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'about-375.png'), fullPage: false });
    console.log('✅ Captured about-1440.png and about-375.png');

    // Check JSON-LD
    const aboutJsonLd = await desktopPage.$$eval('script[type="application/ld+json"]', (scripts) =>
      scripts.map((s) => {
        try {
          return JSON.parse(s.textContent || '');
        } catch {
          return null;
        }
      })
    );
    const hasAboutPage = aboutJsonLd.some((ld) => ld?.['@type'] === 'AboutPage');
    if (hasAboutPage) {
      results.aboutJsonLdPassed = true;
      console.log('✅ About Schema JSON-LD AboutPage validated.');
    }

    // Check comparison grid and tenets
    const aboutContent = await desktopPage.textContent('body');
    const hasComparison = aboutContent?.includes('Boutique Precision vs. Agency Bloat');
    const hasTenets = aboutContent?.includes('Disciplined Refactoring Over Greenfield Rebuilds');
    if (hasComparison && hasTenets) {
      results.aboutPassed = true;
      console.log('✅ About page sections, operational comparison, and engineering tenets verified.');
    }

    // ==========================================
    // 2. AUDIT /contact PAGE & INTAKE SYSTEM
    // ==========================================
    console.log('\n--- 2. Testing /contact Page & Consultation Intake ---');
    const contactRes = await desktopPage.goto(`http://localhost:${port}/contact`, { waitUntil: 'networkidle' });
    if (contactRes?.status() !== 200) {
      throw new Error(`Failed to load /contact: status ${contactRes?.status()}`);
    }

    const contactScrollWDesktop = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (contactScrollWDesktop > 1440) {
      console.error(`❌ Overflow on desktop /contact: ${contactScrollWDesktop}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/contact`, { waitUntil: 'networkidle' });
    const contactScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (contactScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /contact: ${contactScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'contact-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'contact-375.png'), fullPage: false });
    console.log('✅ Captured contact-1440.png and contact-375.png');
    results.contactRenderPassed = true;

    // Test Client-Side Validation on Empty Submit
    console.log('Testing client validation errors on empty submission...');
    await desktopPage.click('button[type="submit"]');
    await wait(400);

    const hasNameError = await desktopPage.isVisible('#fullName-error');
    const hasEmailError = await desktopPage.isVisible('#workEmail-error');
    const hasCompanyError = await desktopPage.isVisible('#company-error');
    const hasScopeError = await desktopPage.isVisible('#projectScope-error');

    console.log(
      `Validation Errors Visible - Name: ${hasNameError}, Email: ${hasEmailError}, Company: ${hasCompanyError}, Scope: ${hasScopeError}`
    );

    if (hasNameError && hasEmailError && hasCompanyError && hasScopeError) {
      results.contactValidationPassed = true;
      console.log('✅ Form client validation correctly blocks incomplete submission.');
    }

    // Test Valid Form Submission
    console.log('Testing valid form submission...');
    await desktopPage.fill('#fullName', 'Elena Vance');
    await desktopPage.fill('#workEmail', 'elena@apex.io');
    await desktopPage.fill('#company', 'Apex Dynamics');
    await desktopPage.fill(
      '#projectScope',
      'Architecting an event-driven telemetry ingestion engine with sub-25ms classification latency across distributed sensor hubs.'
    );
    await desktopPage.fill('#preferredStack', 'TypeScript, Go, Redis, Docker, PostgreSQL');

    // Click submit
    await desktopPage.click('button[type="submit"]');
    await wait(1000);

    // Verify Success Screen
    const isSuccessStateVisible = await desktopPage.isVisible('[data-testid="contact-success-state"]');
    console.log(`Success Confirmation State: ${isSuccessStateVisible}`);

    if (isSuccessStateVisible) {
      const successText = await desktopPage.textContent('[data-testid="contact-success-state"]');
      const hasSLA = successText?.includes('Within 24 Business Hours');
      const hasRefId = successText?.includes('Reference ID:');
      console.log(`Success State Verification - SLA: ${hasSLA}, Ref ID: ${hasRefId}`);

      if (hasSLA && hasRefId) {
        results.contactSubmissionPassed = true;
        console.log('✅ Consultation intake form submitted successfully and SLA receipt rendered.');
        await desktopPage.screenshot({
          path: path.join(screenshotsDir, 'contact-success-1440.png'),
          fullPage: false,
        });
        console.log('✅ Captured contact-success-1440.png');
      }
    }

    // Test Honeypot Anti-Spam protection via API
    console.log('Testing honeypot anti-spam API drop...');
    const honeypotRes = await fetch(`http://localhost:${port}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Spam Bot',
        workEmail: 'spambot@spammer.xyz',
        company: 'Spam Corp',
        discipline: 'software-engineering',
        budget: '25k-50k',
        timeline: 'immediate',
        projectScope: 'Automated spam message requesting backlinks or cheap offshore staffing.',
        website: 'http://malicious-spam-url.com', // honeypot populated
      }),
    });
    const honeypotJson = await honeypotRes.json();
    console.log(`Honeypot API Response: ${honeypotRes.status}`, honeypotJson);
    if (honeypotRes.status === 200 && honeypotJson.success) {
      results.contactHoneypotPassed = true;
      console.log('✅ Honeypot drop verified: returns silent success without processing.');
    }

    // ==========================================
    // 3. AUDIT /privacy & /terms PAGES
    // ==========================================
    console.log('\n--- 3. Testing /privacy & /terms Legal Pages ---');
    const privRes = await desktopPage.goto(`http://localhost:${port}/privacy`, { waitUntil: 'networkidle' });
    if (privRes?.status() !== 200) {
      throw new Error(`Failed to load /privacy: status ${privRes?.status()}`);
    }

    const privScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (privScrollW > 1440) {
      console.error(`❌ Overflow on desktop /privacy: ${privScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/privacy`, { waitUntil: 'networkidle' });
    const privScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (privScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /privacy: ${privScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'privacy-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'privacy-375.png'), fullPage: false });
    console.log('✅ Captured privacy-1440.png and privacy-375.png');

    const privText = await desktopPage.textContent('body');
    if (privText?.includes('Cookieless Web Analytics') && privText?.includes('Statutory Rights')) {
      results.privacyPassed = true;
      console.log('✅ Privacy policy verified.');
    }

    const termsRes = await desktopPage.goto(`http://localhost:${port}/terms`, { waitUntil: 'networkidle' });
    if (termsRes?.status() !== 200) {
      throw new Error(`Failed to load /terms: status ${termsRes?.status()}`);
    }

    const termsScrollW = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
    if (termsScrollW > 1440) {
      console.error(`❌ Overflow on desktop /terms: ${termsScrollW}px`);
      results.zeroOverflowPassed = false;
    }

    await mobilePage.goto(`http://localhost:${port}/terms`, { waitUntil: 'networkidle' });
    const termsScrollWMobile = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (termsScrollWMobile > 375) {
      console.error(`❌ Overflow on mobile /terms: ${termsScrollWMobile}px`);
      results.zeroOverflowPassed = false;
    }

    await desktopPage.screenshot({ path: path.join(screenshotsDir, 'terms-1440.png'), fullPage: false });
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'terms-375.png'), fullPage: false });
    console.log('✅ Captured terms-1440.png and terms-375.png');

    const termsText = await desktopPage.textContent('body');
    if (termsText?.includes('100% Intellectual Property Ownership') && termsText?.includes('Thirty-Day Post-Launch Warranty')) {
      results.termsPassed = true;
      console.log('✅ Terms of service verified.');
    }

    // ==========================================
    // 4. AUDIT CUSTOM 404 PAGE
    // ==========================================
    console.log('\n--- 4. Testing Custom 404 Page on Non-Existent Route ---');
    const nonExistentRes = await desktopPage.goto(`http://localhost:${port}/system-endpoint-that-does-not-exist`, {
      waitUntil: 'networkidle',
    });
    console.log(`404 Route HTTP status: ${nonExistentRes?.status()}`);

    const notFoundText = await desktopPage.textContent('body');
    const has404Header = notFoundText?.includes('404 // Route Error');
    const hasOffscriptBrand = notFoundText?.includes('OFF SCRIPT');
    const hasQuickLinks = notFoundText?.includes('Selected Work') && notFoundText?.includes('Custom Solutions');

    console.log(`404 Page Checks - Header: ${has404Header}, Brand: ${hasOffscriptBrand}, Quick Links: ${hasQuickLinks}`);

    if (nonExistentRes?.status() === 404 && has404Header && hasOffscriptBrand && hasQuickLinks) {
      results.custom404Passed = true;
      console.log('✅ Custom 404 page verified: status 404 and branded navigation links present.');
      await desktopPage.screenshot({ path: path.join(screenshotsDir, 'not-found-1440.png'), fullPage: false });
      console.log('✅ Captured not-found-1440.png');
    }

    // ==========================================
    // 5. CONSOLE ERROR AUDIT
    // ==========================================
    console.log('\n--- 5. Console Error Audit ---');
    if (consoleErrors.length > 0) {
      console.error(`❌ Unexpected Console Errors Logged (${consoleErrors.length}):`);
      consoleErrors.forEach((err) => console.error(err));
      results.zeroConsoleErrors = false;
    } else {
      console.log('✅ Zero console errors logged across entire Phase 5 suite.');
    }
  } finally {
    await browser.close();
    console.log('\n[Phase 5 Gate] Stopping Next.js server...');
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
  console.log('      PHASE 5 GATE VERIFICATION RESULTS      ');
  console.log('=============================================');
  console.log(JSON.stringify(results, null, 2));

  const allPassed = Object.values(results).every(Boolean);
  if (!allPassed) {
    console.error('\n❌ PHASE 5 GATE FAILED');
    process.exit(1);
  } else {
    console.log('\n🎉 PHASE 5 GATE PASSED ALL CHECKS!');
  }
}

runPhase5Gate().catch((err) => {
  console.error('Fatal error during gate verification:', err);
  process.exit(1);
});

