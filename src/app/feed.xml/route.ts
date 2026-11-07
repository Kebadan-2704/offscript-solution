import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/content/site';

export async function GET() {
  return NextResponse.redirect(`${SITE_CONFIG.url}/insights/feed.xml`, 308);
}

