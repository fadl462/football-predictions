export const demoMatches=[
{id:101,league:'Premier League',country:'England',kickoff:'2026-08-16T16:30:00Z',home:'Chelsea',away:'Liverpool',homeLogo:'https://media.api-sports.io/football/teams/49.png',awayLogo:'https://media.api-sports.io/football/teams/40.png',status:'NS'},
{id:102,league:'La Liga',country:'Spain',kickoff:'2026-08-16T19:00:00Z',home:'Barcelona',away:'Sevilla',homeLogo:'https://media.api-sports.io/football/teams/529.png',awayLogo:'https://media.api-sports.io/football/teams/536.png',status:'NS'},
{id:103,league:'Serie A',country:'Italy',kickoff:'2026-08-16T18:45:00Z',home:'Inter',away:'Roma',homeLogo:'https://media.api-sports.io/football/teams/505.png',awayLogo:'https://media.api-sports.io/football/teams/497.png',status:'NS'},
{id:104,league:'Ligue 1',country:'France',kickoff:'2026-08-16T20:00:00Z',home:'PSG',away:'Lyon',homeLogo:'https://media.api-sports.io/football/teams/85.png',awayLogo:'https://media.api-sports.io/football/teams/80.png',status:'NS'}
];
export const demoFree=[{id:'p1',fixtureId:101,league:'Premier League',home:'Chelsea',away:'Liverpool',kickoff:demoMatches[0].kickoff,market:'Double Chance',selection:'Chelsea or Draw',confidence:78,status:'PENDING'},{id:'p2',fixtureId:102,league:'La Liga',home:'Barcelona',away:'Sevilla',kickoff:demoMatches[1].kickoff,market:'Over/Under',selection:'Over 1.5 Goals',confidence:84,status:'PENDING'},{id:'p3',fixtureId:103,league:'Serie A',home:'Inter',away:'Roma',kickoff:demoMatches[2].kickoff,market:'Both Teams To Score',selection:'Yes',confidence:71,status:'PENDING'}];
export const demoHistory=[
{date:'15 Aug 2026',match:'Arsenal vs Brighton',prediction:'Over 1.5 Goals',confidence:82,result:'Won',status:'WON'},
{date:'14 Aug 2026',match:'Real Madrid vs Valencia',prediction:'Real Madrid Win',confidence:76,result:'Won',status:'WON'},
{date:'13 Aug 2026',match:'Napoli vs Lazio',prediction:'BTTS — Yes',confidence:69,result:'Lost',status:'LOST'},
{date:'12 Aug 2026',match:'PSV vs Ajax',prediction:'Over 2.5 Goals',confidence:74,result:'Won',status:'WON'},
{date:'11 Aug 2026',match:'Monaco vs Lille',prediction:'Double Chance — Monaco/Draw',confidence:72,result:'Void',status:'VOID'}
];
