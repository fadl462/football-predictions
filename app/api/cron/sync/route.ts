import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getFixtures, getFixture } from '@/lib/football';
import { generatePredictionCandidate, settlePrediction, algorithmRules, priorityForLeague } from '@/lib/predictions';

export const dynamic='force-dynamic';
const todayInAlgeria = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Algiers',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dateOffset = (days:number) => { const d=new Date(); d.setDate(d.getDate()+days); return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Algiers',year:'numeric',month:'2-digit',day:'2-digit'}).format(d); };

export async function GET(req:Request){
 const auth=req.headers.get('authorization');
 if(!process.env.CRON_SECRET||auth!==`Bearer ${process.env.CRON_SECRET}`)return new NextResponse('Unauthorized',{status:401});
 if(!process.env.FOOTBALL_API_KEY)return NextResponse.json({ok:false,message:'FOOTBALL_API_KEY is not configured.'},{status:503});
 try{
  let imported=0,publishedFree=0,publishedVip=0,settled=0;
  for(const date of [todayInAlgeria(),dateOffset(1)]){
   const data=await getFixtures(date);
   for(const f of data.response||[]){
    const leagueName=String(f.league.name||''); const country=String(f.league.country||''); const normalized=`${leagueName} ${country}`.toLowerCase();
    const priority = normalized.includes('champions league')?140 : normalized.includes('premier league')?135 : normalized.includes('la liga')?134 : normalized.includes('serie a')?133 : normalized.includes('bundesliga')?132 : (normalized.includes('ligue 1')&&!normalized.includes('algeria'))?131 : normalized.includes('europa league')?129 : normalized.includes('conference league')?128 : normalized.includes('eredivisie')?124 : normalized.includes('primeira liga')?123 : normalized.includes('championship')?118 : normalized.includes('2. bundesliga')||normalized.includes('2 bundesliga')?106 : (normalized.includes('ligue 2')&&!normalized.includes('algeria'))?105 : normalized.includes('copa libertadores')?98 : (normalized.includes('brasileirao')||normalized.includes('brasileirão'))?97 : normalized.includes('liga mx')?95 : normalized.includes('mls')?94 : normalized.includes('saudi pro league')?93 : normalized.includes('j1 league')?92 : normalized.includes('caf')?88 : (normalized.includes('algeria')&&normalized.includes('ligue 1'))?84 : (normalized.includes('algeria')&&normalized.includes('ligue 2'))?82 : (normalized.includes('coupe nationale')||normalized.includes("coupe d'algerie")||normalized.includes("coupe d'algérie"))?80 : 50;
    if (priority < 80) continue;
    const league=await prisma.league.upsert({where:{externalId:f.league.id},update:{name:f.league.name,country:f.league.country,logo:f.league.logo,sport:'FOOTBALL',priority},create:{externalId:f.league.id,name:f.league.name,country:f.league.country,logo:f.league.logo,sport:'FOOTBALL',priority}});
    await prisma.fixture.upsert({where:{externalId:f.fixture.id},update:{leagueId:league.id,kickoff:new Date(f.fixture.date),homeTeam:f.teams.home.name,awayTeam:f.teams.away.name,homeLogo:f.teams.home.logo,awayLogo:f.teams.away.logo,sport:'FOOTBALL',status:f.fixture.status.short,homeScore:f.goals.home,awayScore:f.goals.away,rawJson:f},create:{externalId:f.fixture.id,leagueId:league.id,kickoff:new Date(f.fixture.date),homeTeam:f.teams.home.name,awayTeam:f.teams.away.name,homeLogo:f.teams.home.logo,awayLogo:f.teams.away.logo,sport:'FOOTBALL',status:f.fixture.status.short,homeScore:f.goals.home,awayScore:f.goals.away,rawJson:f}});
    imported++;
   }
  }
  const countSetting=await prisma.setting.findUnique({where:{key:'free_prediction_count'}}); const freeCount=Number(countSetting?.value||3);
  const vipCountSetting=await prisma.setting.findUnique({where:{key:'vip_prediction_count'}}); const vipCount=Number(vipCountSetting?.value||8);
  const minSetting=await prisma.setting.findUnique({where:{key:'min_confidence'}}); const minConfidence=Number(minSetting?.value||algorithmRules.freeMinimumConfidence);
  const vipMinSetting=await prisma.setting.findUnique({where:{key:'vip_min_confidence'}}); const vipMin=Number(vipMinSetting?.value||algorithmRules.vipMinimumConfidence);
  const fixtures=await prisma.fixture.findMany({where:{kickoff:{gte:new Date(),lte:new Date(Date.now()+48*60*60*1000)},status:{in:['NS','TBD']},league:{active:true}},include:{league:true},take:100,orderBy:[{league:{priority:'desc'}},{kickoff:'asc'}]});
  const candidates=[];
  for(const f of fixtures){const c=await generatePredictionCandidate({fixture:{id:f.externalId,date:f.kickoff.toISOString()},teams:{home:{name:f.homeTeam},away:{name:f.awayTeam}},league:{name:f.league.name,country:f.league.country}});if(c)candidates.push({...c,fixtureDbId:f.id});}
  candidates.sort((a,b)=>(b.priority*10+b.confidence)-(a.priority*10+a.confidence));
  for(const c of candidates){
    if(c.confidence>=minConfidence && publishedFree<freeCount){
      const exists=await prisma.prediction.findUnique({where:{fixtureId_tier:{fixtureId:c.fixtureDbId,tier:'FREE'}}});
      if(!exists){await prisma.prediction.create({data:{fixtureId:c.fixtureDbId,tier:'FREE',market:c.market,selection:c.selection,confidence:c.confidence,algorithmVersion:algorithmRules.version}});publishedFree++;}
    }
    if(c.confidence>=vipMin && publishedVip<vipCount){
      const exists=await prisma.prediction.findUnique({where:{fixtureId_tier:{fixtureId:c.fixtureDbId,tier:'VIP'}}});
      if(!exists){await prisma.prediction.create({data:{fixtureId:c.fixtureDbId,tier:'VIP',market:c.market,selection:c.selection,confidence:c.confidence,algorithmVersion:algorithmRules.version}});publishedVip++;}
    }
  }
  const pending=await prisma.prediction.findMany({where:{status:'PENDING'},include:{fixture:true},take:300});
  const finalStatuses = new Set(['FT','AET','PEN','AWD','WO']);
  const voidStatuses = new Set(['CANC','PST','ABD','SUSP','INT','TBD']);
  for(const p of pending){
    let home=p.fixture.homeScore, away=p.fixture.away, fixtureStatus=p.fixture.status;
    try{
      const fresh=await getFixture(p.fixture.externalId);
      const f=fresh?.response?.[0];
      if(f){
        home=f.goals.home; away=f.goals.away; fixtureStatus=f.fixture.status.short;
        await prisma.fixture.update({where:{id:p.fixtureId},data:{status:fixtureStatus,homeScore:home,awayScore:away,rawJson:f}});
      }
    }catch{}
    if(voidStatuses.has(fixtureStatus)){
      await prisma.prediction.update({where:{id:p.id},data:{status:'VOID',settledAt:new Date(),resultNote:`Fixture status ${fixtureStatus}`}}); settled++; continue;
    }
    if(!finalStatuses.has(fixtureStatus)) continue;
    const status=settlePrediction(p.selection,home,away);
    if(status!=='PENDING'){
      await prisma.prediction.update({where:{id:p.id},data:{status,settledAt:new Date()}}); settled++;
    }
  }
  await prisma.subscription.updateMany({where:{status:{in:['ACTIVE','NON_RENEWING']},endsAt:{lt:new Date()}},data:{status:'EXPIRED'}});
  await prisma.apiLog.create({data:{operation:'global-football-daily-sync',success:true,message:`Imported ${imported}; free ${publishedFree}; VIP ${publishedVip}; settled ${settled}`}});
  return NextResponse.json({ok:true,imported,publishedFree,publishedVip,settled,algorithm:algorithmRules.version,priority:'Europe-first / Algeria-featured'});
 }catch(e:any){await prisma.apiLog.create({data:{operation:'global-football-daily-sync',success:false,message:e.message}}).catch(()=>{});return NextResponse.json({ok:false,error:e.message},{status:500});}
}
