import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function processAssets() {
  const brandDir = path.resolve(process.cwd(), 'brand');
  const publicBrandDir = path.resolve(process.cwd(), 'public', 'brand');
  const publicDir = path.resolve(process.cwd(), 'public');

  if (!fs.existsSync(publicBrandDir)) {
    fs.mkdirSync(publicBrandDir, { recursive: true });
  }

  const logos = [
    'logo-lockup.png',
    'logo-lockup-light.png',
    'logo-wordmark.png',
    'logo-symbol-flat.png',
    'logo-symbol-3d.png',
  ];

  console.log('--- Processing Optimized Logo Formats (WebP, AVIF, PNG) ---');

  for (const file of logos) {
    const srcPath = path.join(brandDir, file);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File ${file} does not exist in brand/, skipping...`);
      continue;
    }

    const baseName = path.basename(file, '.png');
    const img = sharp(srcPath);

    // Optimized WebP
    await img.clone().webp({ quality: 95, effort: 6 }).toFile(path.join(publicBrandDir, `${baseName}.webp`));

    // Optimized AVIF
    await img.clone().avif({ quality: 90, effort: 6 }).toFile(path.join(publicBrandDir, `${baseName}.avif`));

    // Optimized PNG (1x)
    await img.clone().png({ compressionLevel: 9 }).toFile(path.join(publicBrandDir, `${baseName}.png`));

    console.log(`✅ Formats generated for ${baseName}`);
  }

  console.log('\n--- Generating Favicon & App Icon Suite ---');
  const symbolFlatPath = path.join(brandDir, 'logo-symbol-flat.png');

  if (fs.existsSync(symbolFlatPath)) {
    const symbolImg = sharp(symbolFlatPath);

    // apple-icon.png (180x180)
    await symbolImg
      .clone()
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'apple-icon.png'));

    // icon-192.png (192x192)
    await symbolImg
      .clone()
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));

    // icon-512.png / icon.png (512x512)
    await symbolImg
      .clone()
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));

    fs.copyFileSync(path.join(publicDir, 'icon-512.png'), path.join(publicDir, 'icon.png'));

    // favicon.ico (32x32 PNG container for modern browsers)
    await symbolImg
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));

    console.log('✅ Favicon suite successfully generated in /public');
  }

  console.log('\n--- Generating Verification Composite Previews ---');
  // Composite test: lockup on Ivory (#F5F3ED) and light lockup on Ink (#191B1E)
  const docsDir = path.resolve(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const previewWidth = 1200;
  const previewHeight = 400;

  // 1. Dark logo on Warm Ivory
  const ivoryBg = await sharp({
    create: {
      width: previewWidth,
      height: previewHeight,
      channels: 4,
      background: { r: 245, g: 243, b: 237, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const logoDarkResized = await sharp(path.join(brandDir, 'logo-lockup.png'))
    .resize(600, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(ivoryBg)
    .composite([{ input: logoDarkResized, gravity: 'center' }])
    .png()
    .toFile(path.join(docsDir, 'preview-logo-on-ivory.png'));

  // 2. Light logo on Carbon Ink
  const inkBg = await sharp({
    create: {
      width: previewWidth,
      height: previewHeight,
      channels: 4,
      background: { r: 25, g: 27, b: 30, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const logoLightResized = await sharp(path.join(brandDir, 'logo-lockup-light.png'))
    .resize(600, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(inkBg)
    .composite([{ input: logoLightResized, gravity: 'center' }])
    .png()
    .toFile(path.join(docsDir, 'preview-logo-on-ink.png'));

  console.log('✅ Composite verification previews created in /docs:');
  console.log('   - docs/preview-logo-on-ivory.png');
  console.log('   - docs/preview-logo-on-ink.png');
}

processAssets().catch((err) => {
  console.error('Error in asset pipeline:', err);
  process.exit(1);
});

