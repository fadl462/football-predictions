import {getPredictions} from './football';
export type Candidate={fixtureId:number;home:string;away:string;league:string;kickoff:string;market:string;selection:string;confidence:number};
function scoreCandidate(raw:any):{market:string;selection:string;confidence:number}|null{
 const p=raw?.response?.[0]?.predictions; if(!p)return null;
 const probs=[['Home Win',Number(p?.percent?.home||0)],['Draw',Number(p?.percent?.draw||0)],['Away Win',Number(p?.percent?.away||0)]];
 probs.sort((a,b)=>b[1]-a[1]); const top=probs[0];
 if(top[1]>=68) return {market:'1X2',selection:top[0],confidence:Math.round(top[1])};
 return {market:'Double Chance',selection:top[0]==='Home Win'?'Home or Draw':top[0]==='Away Win'?'Away or Draw':'Home or Away',confidence:Math.min(88,Math.round(Math.max(...probs.map(x=>x[1]))+15))};
}
export async function generatePredictionCandidate(f:any):Promise<Candidate|null>{
 try{const r=await getPredictions(Number(f.fixture.id));const s=scoreCandidate(r);if(!s)return null;return {fixtureId:f.fixture.id,home:f.teams.home.name,away:f.teams.away.name,league:f.league.name,kickoff:f.fixture.date, ...s};}catch{return null}
}
export function settlePrediction(selection:string,home:number|null,away:number|null):'WON'|'LOST'|'VOID'|'PENDING'{
 if(home===null||away===null)return 'PENDING'; if(selection==='Home Win')return home>away?'WON':'LOST'; if(selection==='Away Win')return away>home?'WON':'LOST'; if(selection==='Draw')return home===away?'WON':'LOST'; if(selection==='Home or Draw')return home>=away?'WON':'LOST'; if(selection==='Away or Draw')return away>=home?'WON':'LOST'; if(selection==='Home or Away')return home!==away?'WON':'LOST'; return 'VOID';
}
