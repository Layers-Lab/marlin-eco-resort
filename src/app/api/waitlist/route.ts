import { randomUUID } from 'node:crypto';
import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type WaitlistRecord = {
  id: string;
  email: string;
  name?: string;
  status: 'subscribed';
  source: 'website_waitlist';
  marketingConsent: {
    granted: true;
    capturedAt: string;
    textVersion: 'opening-updates-2026-10';
  };
  createdAt: string;
  updatedAt: string;
  submissions: number;
};

const json = (body: Record<string, string>, status: number) => NextResponse.json(body, { status });
const filePath = join(process.cwd(), 'data', 'waitlist.json');
let writeQueue: Promise<void> = Promise.resolve();

async function saveSignup(email: string, name: string | undefined, submittedAt: string) {
  const operation = writeQueue.then(async () => {
    const directory = join(process.cwd(), 'data');
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await chmod(directory, 0o700);

    let records: WaitlistRecord[] = [];
    try {
      const saved = await readFile(filePath, 'utf8');
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error('Waitlist file must contain a JSON array.');
      records = parsed as WaitlistRecord[];
    } catch (error) {
      if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
    }

    const existing = records.find(record => record.email === email);
    if (existing) {
      existing.updatedAt = submittedAt;
      existing.submissions = (existing.submissions || 1) + 1;
      if (!existing.name && name) existing.name = name;
    } else {
      records.push({
        id: randomUUID(),
        email,
        ...(name ? { name } : {}),
        status: 'subscribed',
        source: 'website_waitlist',
        marketingConsent: {
          granted: true,
          capturedAt: submittedAt,
          textVersion: 'opening-updates-2026-10',
        },
        createdAt: submittedAt,
        updatedAt: submittedAt,
        submissions: 1,
      });
    }

    const tempPath = `${filePath}.${randomUUID()}.tmp`;
    await writeFile(tempPath, `${JSON.stringify(records, null, 2)}\n`, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
    await rename(tempPath, filePath);
  });

  writeQueue = operation.then(() => undefined, () => undefined);
  await operation;
}

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

  const normalizedEmail = email.trim().toLowerCase();
  const fullName = typeof name === 'string' ? name.trim() : '';
  try {
    await saveSignup(normalizedEmail, fullName || undefined, new Date().toISOString());
    return json({ message: 'You’re on the list.' }, 200);
  } catch {
    return json({ error: 'We couldn’t save your place just now. Please try again shortly.' }, 500);
  }
}
