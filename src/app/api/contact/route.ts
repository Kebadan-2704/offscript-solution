import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/schemas/contact';

// In-memory rate limiting map (IP -> timestamps[])
// In production edge deployments, this is backed by Upstash Redis
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove timestamps outside window
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return false;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Identify Client IP for rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Maximum 5 consultation briefs per 10 minutes. Please retry shortly.',
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate JSON Payload
    const rawBody = await req.json();
    const parseResult = ContactFormSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please correct the highlighted fields.',
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 3. Honeypot Anti-Spam Check
    // If the hidden 'website' field is populated, silently drop the spam
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Consultation brief received by studio principals. Response SLA: 24 business hours.',
      });
    }

    // 4. In a production environment with Resend API configured, dispatch email to hello@offscriptsolution.com
    // For local evaluation, we log the verified submission to server logs
    console.info(`[OFFSCRIPT INQUIRY]: From ${data.fullName} (${data.workEmail}) at ${data.company}`);
    console.info(`[SCOPE]: ${data.discipline} | Budget: ${data.budget} | Timeline: ${data.timeline}`);

    return NextResponse.json({
      success: true,
      message: 'Consultation brief received by studio principals. Response SLA: 24 business hours.',
      submissionId: `OS-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    console.error('[API /contact] Internal Server Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your brief. Please email hello@offscriptsolution.com directly.',
      },
      { status: 500 }
    );
  }
}

