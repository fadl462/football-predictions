import { prisma } from './prisma';
import { demoFree, demoHistory, demoMatches } from './demo';
import { hasVip } from './auth';

const demoEnabled = () => process.env.DEMO_MODE === 'true' || !process.env.DATABASE_URL;
const startOfAlgeriaDay = () => { const now = new Date(); const d = new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Algiers',year:'numeric',month:'2-digit',day:'2-digit'}).format(now); return new Date(`${d}T00:00:00+01:00`); };

export async function homeData(){
  if(demoEnabled()) return {matches:demoMatches,predictions:demoFree,affiliate:null,freeCount:3,vipCount:8,vipPrice:9.99};
  try {
    const start=startOfAlgeriaDay(); const end=new Date(start); end.setDate(end.getDate()+1);
    const [fixtures,predictions,affiliate,settings]=await Promise.all([
      prisma.fixture.findMany({where:{kickoff:{gte:start,lte:end},league:{active:true}},include:{league:true},orderBy:[{league:{priority:'desc'}},{kickoff:'asc'}],take:24}),
      prisma.prediction.findMany({where:{tier:'FREE',publishedAt:{gte:start,lte:end}},include:{fixture:{include:{league:true}}},orderBy:{confidence:'desc'},take:10}),
      prisma.affiliateLink.findFirst({where:{active:true},orderBy:{createdAt:'asc'},select:{id:true,name:true}}),
      prisma.setting.findMany({where:{key:{in:['free_prediction_count','vip_prediction_count','vip_price_usd']}}})
    ]);
    return {matches:fixtures.map(f=>({...f,league:f.league.name,country:f.league.country})),predictions:predictions.slice(0,Number(settings.find(s=>s.key==='free_prediction_count')?.value||3)).map(p=>({...p,home:p.fixture.homeTeam,away:p.fixture.away,kickoff:p.fixture.kickoff.toISOString(),league:p.fixture.league.name})),affiliate,freeCount:Number(settings.find(s=>s.key==='free_prediction_count')?.value||3),vipCount:Number(settings.find(s=>s.key==='vip_prediction_count')?.value||8),vipPrice:Number(settings.find(s=>s.key==='vip_price_usd')?.value||9.99)};
  } catch { return {matches:demoMatches,predictions:demoFree,affiliate:null,freeCount:3,vipCount:8,vipPrice:9.99}; }
}
export async function historyData(){
  if(demoEnabled()) return demoHistory;
  try { const rows=await prisma.prediction.findMany({include:{fixture:{include:{league:true}}},orderBy:{publishedAt:'desc'},take:200}); return rows.map(p=>({date:p.publishedAt.toISOString(),match:`${p.fixture.homeTeam} vs ${p.fixture.awayTeam}`,prediction:`${p.market} — ${p.selection}`,confidence:p.confidence,result:p.status,status:p.status,league:p.fixture.league.name})); } catch { return demoHistory; }
}
export async function vipData(user:any){
  if(demoEnabled()) return demoFree.map(p=>({...p,confidence:Math.min(94,p.confidence+8),tier:'VIP'}));
  if(!hasVip(user)) return [];
  try { const start=startOfAlgeriaDay(); const end=new Date(start); end.setDate(end.getDate()+1); return await prisma.prediction.findMany({where:{tier:'VIP',publishedAt:{gte:start,lt:end}},include:{fixture:{include:{league:true}}},orderBy:{confidence:'desc'}}); } catch { return []; }
}
