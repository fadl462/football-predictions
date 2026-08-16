import Link from 'next/link';
import { homeData } from '@/lib/data';
import { formatAlgeriaTime } from '@/lib/config';

export default async function Matches({searchParams}:{searchParams?:Promise<{league?:string;region?:string}>}){
 const params=await searchParams;
 const {matches}=await homeData();
 const filtered=matches.filter((m:any)=>{
   if(params?.league && m.league!==params.league) return false;
   if(params?.region && m.region!==params.region && !(params.region==='UEFA'&&m.league.includes('UEFA'))) return false;
   return true;
 });
 return <main className="page"><div className="container"><div className="sectionHead"><div><span className="eyebrow">WORLD MATCH CENTRE</span><h1>Every fixture. <span>Ranked by importance.</span></h1><p className="muted">Top Leagues → UEFA → Americas → Asia → Africa. Algeria is covered inside Africa rather than taking over the global menu.</p></div><Link className="btn primary" href="/">Today's desk</Link></div><div className="filterRow"><Link href="/matches" className={!params?.league&&!params?.region?'filter active':'filter'}>All</Link><Link href="/matches?region=Europe" className={params?.region==='Europe'?'filter active':'filter'}>Top Leagues</Link><Link href="/matches?region=UEFA" className={params?.region==='UEFA'?'filter active':'filter'}>UEFA</Link><Link href="/matches?region=Americas" className={params?.region==='Americas'?'filter active':'filter'}>Americas</Link><Link href="/matches?region=Asia" className={params?.region==='Asia'?'filter active':'filter'}>Asia</Link><Link href="/matches?region=Africa" className={params?.region==='Africa'?'filter active':'filter'}>Africa</Link></div><div className="fixtureList" style={{marginTop:20}}>{filtered.length?filtered.map((m:any)=><Link href={`/matches/${m.id}`} className="fixture matchLink" key={m.id}><div className="league"><b>{m.league}</b><br/><span>{m.country} · {m.region||'Global'}</span></div><div className="teamsLine"><b>{m.home}</b> <span className="muted">vs</span> <b>{m.away}</b></div><div><div className="kick">{formatAlgeriaTime(m.kickoff)}</div><span className="status">{m.status==='NS'?'UPCOMING':m.status}</span></div><span className="arrow">→</span></Link>):<div className="notice">No demo fixtures match this filter yet. The production API will populate the selected competition automatically.</div>}</div></div></main>
}
