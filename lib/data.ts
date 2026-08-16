import {prisma} from './prisma';
import {demoFree,demoHistory,demoMatches} from './demo';
import {hasVip} from './auth';
export async function homeData(){
 if(process.env.DEMO_MODE==='true'||!process.env.DATABASE_URL)return {matches:demoMatches,predictions:demoFree};
 const now=new Date(), end=new Date(now);end.setHours(23,59,59,999);
 const [fixtures,predictions]=await Promise.all([prisma.fixture.findMany({where:{kickoff:{gte:now,lte:end}},orderBy:{kickoff:'asc'},take:12}),prisma.prediction.findMany({where:{tier:'FREE',publishedAt:{gte:new Date(now.getFullYear(),now.getMonth(),now.getDate())}},include:{fixture:{include:{league:true}}},orderBy:{confidence:'desc'},take:3})]);
 return {matches:fixtures.map(f=>({...f,league:f.league.name})),predictions:predictions.map(p=>({...p,home:p.fixture.homeTeam,away:p.fixture.awayTeam,kickoff:p.fixture.kickoff.toISOString(),league:p.fixture.league.name}))};
}
export async function historyData(){if(process.env.DEMO_MODE==='true'||!process.env.DATABASE_URL)return demoHistory;const rows=await prisma.prediction.findMany({include:{fixture:{include:{league:true}}},orderBy:{publishedAt:'desc'},take:100});return rows.map(p=>({date:p.publishedAt.toISOString(),match:`${p.fixture.homeTeam} vs ${p.fixture.awayTeam}`,prediction:`${p.market} — ${p.selection}`,confidence:p.confidence,result:p.status,status:p.status}));}
export async function vipData(user:any){if(!hasVip(user))return [];if(process.env.DEMO_MODE==='true'||!process.env.DATABASE_URL)return demoFree.map(p=>({...p,confidence:Math.min(93,p.confidence+8),tier:'VIP'}));return prisma.prediction.findMany({where:{tier:'VIP',publishedAt:{gte:new Date(new Date().setHours(0,0,0,0))}},include:{fixture:true},orderBy:{confidence:'desc'}})}
