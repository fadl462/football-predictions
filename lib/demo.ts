export const demoMatches = [
  { id: 101, league: 'Ligue 1 Mobilis', country: 'Algeria', kickoff: '2026-08-16T18:00:00+01:00', home: 'MC Alger', away: 'CR Belouizdad', homeLogo: 'https://media.api-sports.io/football/teams/2002.png', awayLogo: 'https://media.api-sports.io/football/teams/2001.png', status: 'NS' },
  { id: 102, league: 'Ligue 1 Mobilis', country: 'Algeria', kickoff: '2026-08-16T20:30:00+01:00', home: 'JS Kabylie', away: 'USM Alger', homeLogo: 'https://media.api-sports.io/football/teams/2000.png', awayLogo: 'https://media.api-sports.io/football/teams/2004.png', status: 'NS' },
  { id: 103, league: 'Ligue 1 Mobilis', country: 'Algeria', kickoff: '2026-08-17T17:00:00+01:00', home: 'ES Sétif', away: 'CS Constantine', status: 'NS' },
  { id: 104, league: 'Ligue 2', country: 'Algeria', kickoff: '2026-08-17T18:00:00+01:00', home: 'USM El Harrach', away: 'ASM Oran', status: 'NS' },
];
export const demoFree = [
  { id: 'p1', fixtureId: 101, league: 'Ligue 1 Mobilis', home: 'MC Alger', away: 'CR Belouizdad', kickoff: demoMatches[0].kickoff, market: 'Double Chance', selection: 'MC Alger or Draw', confidence: 79, status: 'PENDING' },
  { id: 'p2', fixtureId: 102, league: 'Ligue 1 Mobilis', home: 'JS Kabylie', away: 'USM Alger', kickoff: demoMatches[1].kickoff, market: 'Double Chance', selection: 'JS Kabylie or Draw', confidence: 76, status: 'PENDING' },
  { id: 'p3', fixtureId: 103, league: 'Ligue 1 Mobilis', home: 'ES Sétif', away: 'CS Constantine', kickoff: demoMatches[2].kickoff, market: '1X2', selection: 'Home Win', confidence: 72, status: 'PENDING' },
];
export const demoHistory = [
  { date: '15 Aug 2026', match: 'MC Alger vs USM Alger', prediction: 'Double Chance — MC Alger/Draw', confidence: 82, result: 'WON', status: 'WON' },
  { date: '14 Aug 2026', match: 'CR Belouizdad vs JS Kabylie', prediction: 'Under 3.5 Goals', confidence: 76, result: 'WON', status: 'WON' },
  { date: '13 Aug 2026', match: 'ES Sétif vs MC Oran', prediction: 'BTTS — Yes', confidence: 70, result: 'LOST', status: 'LOST' },
  { date: '12 Aug 2026', match: 'USM Alger vs CS Constantine', prediction: 'USM Alger Win', confidence: 74, result: 'WON', status: 'WON' },
  { date: '11 Aug 2026', match: 'Paradou AC vs JS Saoura', prediction: 'Double Chance', confidence: 72, result: 'VOID', status: 'VOID' },
];
