import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { algorithmRules } from '@/lib/predictions';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Record<string, string> = {
    footballApiKey: process.env.FOOTBALL_API_KEY ? 'configured' : 'missing',
    chargilyKey: process.env.CHARGILY_SECRET_KEY ? 'configured' : 'missing',
    database: process.env.DATABASE_URL ? 'configured' : 'missing',
  };

  if (process.env.DATABASE_URL && process.env.DEMO_MODE !== 'true') {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = 'connected';
    } catch {
      checks.database = 'unreachable';
    }
  }

  const ready = process.env.DEMO_MODE === 'true' || checks.database === 'connected';
  return NextResponse.json({
    ok: ready,
    service: 'DZ Football Edge',
    country: 'DZ',
    timezone: 'Africa/Algiers',
    algorithm: algorithmRules.version,
    mode: process.env.DEMO_MODE === 'true' ? 'demo' : 'production',
    checks,
    timestamp: new Date().toISOString(),
  }, { status: ready ? 200 : 503 });
}
