import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLighthouseAudit() {
  const port = 3333;
  console.log(`Starting Next.js production server on port ${port}...`);

  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    shell: true,
    stdio: 'ignore',
  });

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
    throw new Error('Next.js server failed to respond on port ' + port);
  }

  console.log('Server is ready. Running Lighthouse Mobile Audit...');
  const jsonPath = path.resolve(process.cwd(), 'docs', 'lighthouse-mobile.json');

  try {
    const cmd = `npx lighthouse http://localhost:${port} --output json --output-path "${jsonPath}" --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true`;
    execSync(cmd, { stdio: 'inherit' });

    console.log('Lighthouse run complete. Parsing scores...');
    if (fs.existsSync(jsonPath)) {
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const categories = report.categories || {};
      const audits = report.audits || {};

      const perf = Math.round((categories.performance?.score || 0) * 100);
      const a11y = Math.round((categories.accessibility?.score || 0) * 100);
      const bp = Math.round((categories['best-practices']?.score || 0) * 100);
      const seo = Math.round((categories.seo?.score || 0) * 100);

      const fcp = audits['first-contentful-paint']?.displayValue;
      const lcp = audits['largest-contentful-paint']?.displayValue;
      const tbt = audits['total-blocking-time']?.displayValue;
      const cls = audits['cumulative-layout-shift']?.displayValue;
      const speedIndex = audits['speed-index']?.displayValue;

      console.log('\n=======================================');
      console.log('📊 LIGHTHOUSE AUDIT RESULTS (MOBILE)');
      console.log('=======================================');
      console.log(`Performance:    ${perf}/100`);
      console.log(`Accessibility:  ${a11y}/100`);
      console.log(`Best Practices: ${bp}/100`);
      console.log(`SEO:            ${seo}/100`);
      console.log('---------------------------------------');
      console.log(`FCP:         ${fcp}`);
      console.log(`LCP:         ${lcp}`);
      console.log(`TBT:         ${tbt}`);
      console.log(`CLS:         ${cls}`);
      console.log(`Speed Index: ${speedIndex}`);
      console.log('=======================================\n');
    }
  } finally {
    console.log('Stopping server...');
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

runLighthouseAudit().catch((err) => {
  console.error('Lighthouse audit failed:', err);
  process.exit(1);
});

