import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const json = (body: Record<string, string>, status: number) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'This signup link has expired. Refresh the page and try again.' }, 403);
  }

  const length = Number(request.headers.get('content-length') || 0);
  if (length > 4096) return json({ error: 'That signup is too large. Please try again.' }, 413);

  let input: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return json({ error: 'That signup is too large. Please try again.' }, 413);
    input = JSON.parse(raw);
  } catch {
    return json({ error: 'Please check your details and try again.' }, 400);
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return json({ error: 'Please check your details and try again.' }, 400);
  }

  const { name, email, consent, website } = input as Record<string, unknown>;
  if (typeof website === 'string' && website.trim()) return json({ message: 'You’re on the list.' }, 200);
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return json({ error: 'Enter a valid email address to join the list.' }, 400);
  }
  if (consent !== true) return json({ error: 'Please opt in to receive Marlin’s launch news.' }, 400);
  if (name !== undefined && (typeof name !== 'string' || name.length > 80)) {
    return json({ error: 'Please keep your name under 80 characters.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return json({ error: 'Our launch list is nearly ready. Please come back shortly to save your place.' }, 503);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const fullName = typeof name === 'string' ? name.trim() : '';
  const [firstName, ...lastName] = fullName.split(/\s+/).filter(Boolean);
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

  try {
    const contactResponse = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: normalizedEmail,
        ...(firstName ? { first_name: firstName } : {}),
        ...(lastName.length ? { last_name: lastName.join(' ') } : {}),
        unsubscribed: false,
      }),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });

    if (!contactResponse.ok && contactResponse.status !== 409) {
      return json({ error: 'We couldn’t add you just now. Please try again shortly.' }, 502);
    }

    const segmentResponse = await fetch(
      `https://api.resend.com/contacts/${encodeURIComponent(normalizedEmail)}/segments/${encodeURIComponent(segmentId)}`,
      { method: 'POST', headers, signal: AbortSignal.timeout(8000), cache: 'no-store' },
    );
    if (!segmentResponse.ok && segmentResponse.status !== 409) {
      return json({ error: 'We couldn’t finish saving your place. Please try again shortly.' }, 502);
    }

    return json({ message: 'You’re on the list.' }, 200);
  } catch {
    return json({ error: 'We couldn’t reach our launch list. Please try again shortly.' }, 502);
  }
}
