const BASE=process.env.FOOTBALL_API_BASE_URL||'https://v3.football.api-sports.io';
async function api(path:string){
 if(!process.env.FOOTBALL_API_KEY) throw new Error('FOOTBALL_API_KEY is not configured');
 const r=await fetch(`${BASE}${path}`,{headers:{'x-apisports-key':process.env.FOOTBALL_API_KEY},cache:'no-store'});
 if(!r.ok) throw new Error(`Football API ${r.status}`); return r.json();
}
export async function getFixtures(date:string){return api(`/fixtures?date=${date}`)}
export async function getFixture(id:number){return api(`/fixtures?id=${id}`)}
export async function getPredictions(id:number){return api(`/predictions?fixture=${id}`)}
export async function getLeagues(){return api('/leagues?current=true')}
export async function getFixtureStats(id:number){return api(`/fixtures/statistics?fixture=${id}`)}
