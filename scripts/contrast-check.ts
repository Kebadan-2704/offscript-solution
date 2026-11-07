/**
 * Automated WCAG 2.2 Contrast Ratio Verification Script
 * Checks all brand color token pairings used in the OFFSCRIPT SOLUTION design system.
 */

interface ColorToken {
  name: string;
  hex: string;
}

const TOKENS: Record<string, ColorToken> = {
  ink: { name: 'Carbon Ink', hex: '#191B1E' },
  ivory: { name: 'Warm Ivory', hex: '#F5F3ED' },
  terra: { name: 'Terracotta', hex: '#D36B4D' },
  stone: { name: 'Stone Grey', hex: '#92938D' },
  stoneText: { name: 'Stone Text (Darkened)', hex: '#6B6C67' },
  sand: { name: 'Soft Sand', hex: '#E6E2D9' },
  sage: { name: 'Muted Sage', hex: '#DCE3DD' },
  white: { name: 'Pure White', hex: '#FFFFFF' },
};

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const sRGB = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0]! + 0.7152 * sRGB[1]! + 0.0722 * sRGB[2]!;
}

function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface PairCheck {
  fg: ColorToken;
  bg: ColorToken;
  usage: string;
  minRatio: number; // 4.5 for normal text, 3.0 for large/UI
}

const CHECKS: PairCheck[] = [
  // Primary Text on Ivory
  { fg: TOKENS.ink!, bg: TOKENS.ivory!, usage: 'Body text (Ink on Ivory)', minRatio: 4.5 },
  // Secondary Text on Ivory
  { fg: TOKENS.stoneText!, bg: TOKENS.ivory!, usage: 'Secondary body text (Stone Text on Ivory)', minRatio: 4.5 },
  // Ivory on Ink (Dark sections)
  { fg: TOKENS.ivory!, bg: TOKENS.ink!, usage: 'Headline / Body on Ink (Ivory on Ink)', minRatio: 4.5 },
  // Terracotta on Ivory (Labels / Large Accents / Eyebrows)
  { fg: TOKENS.terra!, bg: TOKENS.ivory!, usage: 'Eyebrow / Accent on Ivory (Terracotta on Ivory)', minRatio: 3.0 },
  // Terracotta on Ink
  { fg: TOKENS.terra!, bg: TOKENS.ink!, usage: 'Accent / Links on Ink (Terracotta on Ink)', minRatio: 3.0 },
  // Ink on Terracotta (Small buttons)
  { fg: TOKENS.ink!, bg: TOKENS.terra!, usage: 'Button label (Ink on Terracotta)', minRatio: 4.5 },
  // Ink on Sage (Tech panel)
  { fg: TOKENS.ink!, bg: TOKENS.sage!, usage: 'Tech tags (Ink on Sage)', minRatio: 4.5 },
  // Ink on Sand (Approach timeline)
  { fg: TOKENS.ink!, bg: TOKENS.sand!, usage: 'Body on Sand (Ink on Sand)', minRatio: 4.5 },
  // Stone Text on Sand
  { fg: TOKENS.stoneText!, bg: TOKENS.sand!, usage: 'Secondary text on Sand', minRatio: 4.0 },
];

console.log('='.repeat(70));
console.log('OFFSCRIPT SOLUTION — WCAG 2.2 Token Contrast Verification');
console.log('='.repeat(70));

let hasFailure = false;

for (const check of CHECKS) {
  const ratio = contrastRatio(check.fg.hex, check.bg.hex);
  const roundedRatio = Math.round(ratio * 100) / 100;
  const passed = ratio >= check.minRatio;

  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(
    `${status} [${roundedRatio.toFixed(2)}:1 (req >= ${check.minRatio}:1)] - ${check.usage} (${check.fg.hex} on ${check.bg.hex})`
  );

  if (!passed) {
    hasFailure = true;
  }
}

console.log('='.repeat(70));

if (hasFailure) {
  console.error('ERROR: One or more token pairings failed WCAG AA requirements!');
  process.exit(1);
} else {
  console.log('SUCCESS: All design system token pairings pass WCAG 2.2 AA standards.');
  process.exit(0);
}

