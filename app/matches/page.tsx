import {homeData} from '@/lib/data';

export default async function Matches(){
  const {matches}=await homeData();
  return <main className="page"><div className="container"><span className="eyebrow">MATCH CENTRE · EUROPE FIRST</span><h1>Football <span>by priority.</span></h1><p className="muted">Elite Europe → UEFA → Global → Algérie. Fixtures are sorted by the platform's competition priority score before kickoff time.</p><div className="fixtureList" style={{marginTop:28}}>{matches.map((m:any)=><div className="fixture" key={m.id}><div className="league"><b>{m.league}</b><br/><span>{m.country}</span></div><div className="teamsLine">{m.home} <span className="muted">vs</span> {m.away}</div><div><div className="kick">{new Intl.DateTimeFormat('fr-DZ',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Algiers'}).format(new Date(m.kickoff))}</div><span className="status">{m.status==='NS'?'UPCOMING':m.status}</span></div></div>)}</div></div></main>
}
