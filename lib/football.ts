const BASE = process.env.FOOTBALL_API_BASE_URL || 'https://v3.football.api-sports.io';

async function api(path: string) {
  if (!process.env.FOOTBALL_API_KEY) throw new Error('FOOTBALL_API_KEY is not configured');
  const r = await fetch(`${BASE}${path}`, {
    headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY },
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`Football API ${r.status}`);
  const json = await r.json();
  if (json?.errors && Object.keys(json.errors).length) throw new Error(JSON.stringify(json.errors));
  return json;
}

export async function getFixtures(date: string) {
  return api(`/fixtures?date=${encodeURIComponent(date)}`);
}

export async function getFixturesByLeague(leagueId: number, season: number, date?: string) {
  const params = new URLSearchParams({ league: String(leagueId), season: String(season) });
  if (date) params.set('date', date);
  return api(`/fixtures?${params.toString()}`);
}

export async function getFixture(id: number) { return api(`/fixtures?id=${id}`); }
export async function getPredictions(id: number) { return api(`/predictions?fixture=${id}`); }
export async function getLeagues(country = 'Algeria') { return api(`/leagues?country=${encodeURIComponent(country)}`); }
export async function getCurrentAlgeriaLeagues() { return api('/leagues?country=Algeria&current=true'); }
export async function getFixtureStats(id: number) { return api(`/fixtures/statistics?fixture=${id}`); }
