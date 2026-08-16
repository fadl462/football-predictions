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

export const priorityForLeague = (league: string, country = '') => {
  const normalized = `${league} ${country}`.toLowerCase();
  if (normalized.includes('algeria') && normalized.includes('ligue 1')) return 84;
  if (normalized.includes('algeria') && normalized.includes('ligue 2')) return 82;
  const rules: Array<[string, number]> = [
    ['champions league', 140], ['premier league', 135], ['la liga', 134], ['serie a', 133], ['bundesliga', 132],
    ['ligue 1', 131], ['europa league', 129], ['conference league', 128], ['eredivisie', 124], ['primeira liga', 123],
    ['championship', 118], ['2. bundesliga', 106], ['ligue 2', 105], ['scottish premiership', 104], ['super lig', 103],
    ['jupiler', 102], ['copa libertadores', 98], ['brasileirao', 97], ['brasileirão', 97], ['argentina primera', 96],
    ['liga mx', 95], ['mls', 94], ['saudi pro league', 93], ['j1 league', 92], ['k league 1', 91],
    ['qatar stars league', 90], ['afc champions league elite', 89], ['caf champions league', 88], ['caf confederation', 87],
    ['egypt premier league', 86], ['botola pro', 85], ['algeria', 84],
  ];
  const found = rules.find(([name]) => normalized.includes(name));
  return found?.[1] ?? 50;
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
  description: 'Global competition board: top leagues first, then UEFA, Americas, Asia and Africa, with Algeria covered inside Africa.',
  freeMinimumConfidence: siteConfig.minConfidenceDefault,
  vipMinimumConfidence: siteConfig.vipMinConfidenceDefault,
};
