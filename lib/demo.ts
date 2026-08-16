export const demoMatches = [
  { id: 201, league: 'Premier League', country: 'England', region: 'Europe', tier: 1, kickoff: '2026-08-16T18:30:00+01:00', home: 'Arsenal', away: 'Manchester City', status: 'NS' },
  { id: 202, league: 'La Liga', country: 'Spain', region: 'Europe', tier: 1, kickoff: '2026-08-16T21:00:00+01:00', home: 'Real Madrid', away: 'Atlético Madrid', status: 'NS' },
  { id: 203, league: 'UEFA Champions League', country: 'Europe', region: 'UEFA', tier: 1, kickoff: '2026-08-16T20:00:00+01:00', home: 'Paris Saint-Germain', away: 'Bayern Munich', status: 'NS' },
  { id: 204, league: 'Serie A', country: 'Italy', region: 'Europe', tier: 1, kickoff: '2026-08-16T19:45:00+01:00', home: 'Inter', away: 'Napoli', status: 'NS' },
  { id: 205, league: 'Bundesliga', country: 'Germany', region: 'Europe', tier: 1, kickoff: '2026-08-16T17:30:00+01:00', home: 'Bayern Munich', away: 'Borussia Dortmund', status: 'NS' },
  { id: 206, league: 'Ligue 1', country: 'France', region: 'Europe', tier: 1, kickoff: '2026-08-16T20:00:00+01:00', home: 'Paris Saint-Germain', away: 'Marseille', status: 'NS' },
  { id: 207, league: 'Copa Libertadores', country: 'South America', region: 'Americas', tier: 2, kickoff: '2026-08-16T23:00:00+01:00', home: 'Flamengo', away: 'River Plate', status: 'NS' },
  { id: 208, league: 'Brasileirao', country: 'Brazil', region: 'Americas', tier: 2, kickoff: '2026-08-16T22:00:00+01:00', home: 'Palmeiras', away: 'Fluminense', status: 'NS' },
  { id: 209, league: 'Saudi Pro League', country: 'Saudi Arabia', region: 'Asia', tier: 2, kickoff: '2026-08-16T18:00:00+01:00', home: 'Al Hilal', away: 'Al Nassr', status: 'NS' },
  { id: 210, league: 'J1 League', country: 'Japan', region: 'Asia', tier: 2, kickoff: '2026-08-16T13:00:00+01:00', home: 'Kawasaki Frontale', away: 'Yokohama F. Marinos', status: 'NS' },
  { id: 211, league: 'CAF Champions League', country: 'Africa', region: 'Africa', tier: 3, kickoff: '2026-08-16T17:00:00+01:00', home: 'Al Ahly', away: 'Esperance', status: 'NS' },
  { id: 212, league: 'Ligue 1 Mobilis', country: 'Algeria', region: 'Africa', tier: 4, kickoff: '2026-08-16T18:00:00+01:00', home: 'MC Alger', away: 'CR Belouizdad', status: 'NS' },
  { id: 213, league: 'Ligue 1 Mobilis', country: 'Algeria', region: 'Africa', tier: 4, kickoff: '2026-08-16T20:30:00+01:00', home: 'JS Kabylie', away: 'USM Alger', status: 'NS' },
];
export const demoFree = [
  { id: 'p1', fixtureId: 201, league: 'Premier League', home: 'Arsenal', away: 'Manchester City', kickoff: demoMatches[0].kickoff, market: 'Double Chance', selection: 'Arsenal or Draw', confidence: 81, status: 'PENDING' },
  { id: 'p2', fixtureId: 202, league: 'La Liga', home: 'Real Madrid', away: 'Atlético Madrid', kickoff: demoMatches[1].kickoff, market: '1X2', selection: 'Home Win', confidence: 78, status: 'PENDING' },
  { id: 'p3', fixtureId: 203, league: 'UEFA Champions League', home: 'Paris Saint-Germain', away: 'Bayern Munich', kickoff: demoMatches[2].kickoff, market: 'Total Goals', selection: 'Over 1.5', confidence: 74, status: 'PENDING' },
];
export const demoHistory = [
  { date: '15 Aug 2026', match: 'Arsenal vs Chelsea', prediction: 'Double Chance — Arsenal/Draw', confidence: 82, result: 'WON', status: 'WON', league: 'Premier League' },
  { date: '14 Aug 2026', match: 'Real Madrid vs Sevilla', prediction: 'Real Madrid Win', confidence: 79, result: 'WON', status: 'WON', league: 'La Liga' },
  { date: '13 Aug 2026', match: 'PSG vs Bayern Munich', prediction: 'Over 1.5 Goals', confidence: 74, result: 'LOST', status: 'LOST', league: 'Champions League' },
  { date: '12 Aug 2026', match: 'Inter vs Napoli', prediction: 'Inter Win', confidence: 76, result: 'WON', status: 'WON', league: 'Serie A' },
  { date: '11 Aug 2026', match: 'MC Alger vs USM Alger', prediction: 'Double Chance', confidence: 72, result: 'VOID', status: 'VOID', league: 'Ligue 1 Mobilis' },
];
