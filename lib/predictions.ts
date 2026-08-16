import { getPredictions } from './football';
import { siteConfig } from './config';

export type Candidate = {
  fixtureId: number;
  home: string;
  away: string;
  league: string;
  country?: string;
  kickoff: string;
  market: string;
  selection: string;
  confidence: number;
  priority: number;
};

const priorityForLeague = (league: string, country = '') => {
  const normalized = `${league} ${country}`.toLowerCase();
  if (normalized.includes('champions league')) return 140;
  if (normalized.includes('premier league')) return 135;
  if (normalized.includes('la liga')) return 134;
  if (normalized.includes('serie a')) return 133;
  if (normalized.includes('bundesliga')) return 132;
  if (normalized.includes('ligue 1') && !normalized.includes('algeria')) return 131;
  if (normalized.includes('europa league')) return 129;
  if (normalized.includes('conference league')) return 128;
  if (normalized.includes('eredivisie')) return 124;
  if (normalized.includes('primeira liga')) return 123;
  if (normalized.includes('championship')) return 118;
  if (normalized.includes('2. bundesliga') || normalized.includes('2 bundesliga')) return 106;
  if (normalized.includes('ligue 2') && !normalized.includes('algeria')) return 105;
  if (normalized.includes('scottish premiership')) return 104;
  if (normalized.includes('super lig')) return 103;
  if (normalized.includes('jupiler')) return 102;
  if (normalized.includes('copa libertadores')) return 98;
  if (normalized.includes('brasileirao') || normalized.includes('brasileirão')) return 97;
  if (normalized.includes('liga mx')) return 95;
  if (normalized.includes('mls')) return 94;
  if (normalized.includes('saudi pro league')) return 93;
  if (normalized.includes('j1 league')) return 92;
  if (normalized.includes('caf')) return 88;
  if (normalized.includes('algeria') && normalized.includes('ligue 1')) return 84;
  if (normalized.includes('algeria') && normalized.includes('ligue 2')) return 82;
  if (normalized.includes('coupe nationale') || normalized.includes("coupe d'algerie") || normalized.includes("coupe d'algérie")) return 80;
  return 50;
};

function scoreCandidate(raw: any) {
  const p = raw?.response?.[0]?.predictions;
  if (!p) return null;
  const home = Number(p?.percent?.home || 0);
  const draw = Number(p?.percent?.draw || 0);
  const away = Number(p?.percent?.away || 0);
  if (![home, draw, away].every(Number.isFinite)) return null;

  const singles = [
    ['Home Win', home],
    ['Draw', draw],
    ['Away Win', away],
  ] as [string, number][];
  singles.sort((a, b) => b[1] - a[1]);
  const top = singles[0];
  if (top[1] >= siteConfig.minConfidenceDefault) {
    return { market: '1X2', selection: top[0], confidence: Math.round(top[1]) };
  }

  const doubles = [
    ['Home or Draw', home + draw],
    ['Away or Draw', away + draw],
    ['Home or Away', home + away],
  ] as [string, number][];
  doubles.sort((a, b) => b[1] - a[1]);
  const bestDouble = doubles[0];
  if (bestDouble[1] >= siteConfig.minConfidenceDefault) {
    return { market: 'Double Chance', selection: bestDouble[0], confidence: Math.min(99, Math.round(bestDouble[1])) };
  }
  return null;
}

export async function generatePredictionCandidate(f: any): Promise<Candidate | null> {
  try {
    const r = await getPredictions(Number(f.fixture.id));
    const s = scoreCandidate(r);
    if (!s) return null;
    const league = f.league.name;
    return {
      fixtureId: f.fixture.id,
      home: f.teams.home.name,
      away: f.teams.away.name,
      league,
      country: f.league.country,
      kickoff: f.fixture.date,
      priority: priorityForLeague(league, f.league.country),
      ...s,
    };
  } catch {
    return null;
  }
}

export function settlePrediction(selection: string, home: number | null, away: number | null): 'WON' | 'LOST' | 'VOID' | 'PENDING' {
  if (home === null || away === null) return 'PENDING';
  if (selection === 'Home Win') return home > away ? 'WON' : 'LOST';
  if (selection === 'Away Win') return away > home ? 'WON' : 'LOST';
  if (selection === 'Draw') return home === away ? 'WON' : 'LOST';
  if (selection === 'Home or Draw') return home >= away ? 'WON' : 'LOST';
  if (selection === 'Away or Draw') return away >= home ? 'WON' : 'LOST';
  if (selection === 'Home or Away') return home !== away ? 'WON' : 'LOST';
  return 'VOID';
}

export const algorithmRules = {
  version: 'dz-v2',
  description: 'Europe-first global football ranking, followed by strong global competitions and a featured Algeria market.',
  freeMinimumConfidence: siteConfig.minConfidenceDefault,
  vipMinimumConfidence: siteConfig.vipMinConfidenceDefault,
};
