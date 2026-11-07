import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function makeLogoLight() {
  const brandDir = path.resolve(process.cwd(), 'brand');
  const publicBrandDir = path.resolve(process.cwd(), 'public', 'brand');
  
  if (!fs.existsSync(publicBrandDir)) {
    fs.mkdirSync(publicBrandDir, { recursive: true });
  }

  const inputPath = path.join(brandDir, 'logo-lockup.png');
  const outputPathBrand = path.join(brandDir, 'logo-lockup-light.png');
  const outputPathPublic = path.join(publicBrandDir, 'logo-lockup-light.png');

  console.log('Generating light variant for logo lockup...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Unable to read logo dimensions');
  }

  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Warm Ivory target: #F5F3ED -> R: 245, G: 243, B: 237
  const targetR = 245;
  const targetG = 243;
  const targetB = 237;

  // Process RGBA channels
  const channels = info.channels;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const a = channels === 4 ? data[i + 3]! : 255;

    // Only process visible or semi-transparent pixels
    if (a > 0) {
      // Differentiate dark ink from orange accent
      // Orange has high R, moderate G, low B and high saturation
      const isOrange = r > 140 && (r - g > 45) && (r - b > 65);

      if (!isOrange) {
        // Pixel is part of the dark ink wordmark or border
        // Remap to Warm Ivory while strictly preserving alpha
        data[i] = targetR;
        data[i + 1] = targetG;
        data[i + 2] = targetB;
      }
    }
  }

  // Save as high-quality PNG
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPathBrand);

  fs.copyFileSync(outputPathBrand, outputPathPublic);

  console.log(`✅ Successfully generated: ${outputPathBrand}`);
  console.log(`✅ Copied to public: ${outputPathPublic}`);
}

makeLogoLight().catch((err) => {
  console.error('Failed to generate light logo:', err);
  process.exit(1);
});
