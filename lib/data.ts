import { prisma } from './prisma';
import { demoFree, demoHistory, demoMatches } from './demo';
import { hasVip } from './auth';

const startOfAlgeriaDay = () => {
  const now = new Date();
  return new Date(new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Algiers', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now) + 'T00:00:00+01:00');
};

export async function homeData() {
  if (process.env.DEMO_MODE === 'true' || !process.env.DATABASE_URL) return { matches: demoMatches, predictions: demoFree, affiliate: null };
  const start = startOfAlgeriaDay();
  const end = new Date(start); end.setDate(end.getDate() + 1); end.setMilliseconds(-1);
  const [fixtures, predictions, affiliate] = await Promise.all([
    prisma.fixture.findMany({ where: { kickoff: { gte: start, lte: end } }, include: { league: true }, orderBy: { kickoff: 'asc' }, take: 16 }),
    prisma.prediction.findMany({ where: { tier: 'FREE', publishedAt: { gte: start, lte: end } }, include: { fixture: { include: { league: true } } }, orderBy: { confidence: 'desc' }, take: 3 }),
    prisma.affiliateLink.findFirst({ where: { active: true }, orderBy: { createdAt: 'asc' }, select: { id: true, name: true } }),
  ]);
  return {
    matches: fixtures.map(f => ({ ...f, league: f.league.name, country: f.league.country })),
    predictions: predictions.map(p => ({ ...p, home: p.fixture.homeTeam, away: p.fixture.awayTeam, kickoff: p.fixture.kickoff.toISOString(), league: p.fixture.league.name })),
    affiliate,
  };
}

export async function historyData() {
  if (process.env.DEMO_MODE === 'true' || !process.env.DATABASE_URL) return demoHistory;
  const rows = await prisma.prediction.findMany({ include: { fixture: { include: { league: true } } }, orderBy: { publishedAt: 'desc' }, take: 200 });
  return rows.map(p => ({ date: p.publishedAt.toISOString(), match: `${p.fixture.homeTeam} vs ${p.fixture.awayTeam}`, prediction: `${p.market} — ${p.selection}`, confidence: p.confidence, result: p.status, status: p.status, league: p.fixture.league.name }));
}

export async function vipData(user: any) {
  if (!hasVip(user)) return [];
  if (process.env.DEMO_MODE === 'true' || !process.env.DATABASE_URL) return demoFree.map(p => ({ ...p, confidence: Math.min(93, p.confidence + 8), tier: 'VIP' }));
  const start = startOfAlgeriaDay();
  const end = new Date(start); end.setDate(end.getDate() + 1);
  return prisma.prediction.findMany({ where: { tier: 'VIP', publishedAt: { gte: start, lt: end } }, include: { fixture: { include: { league: true } } }, orderBy: { confidence: 'desc' } });
}
