import Link from 'next/link';
export default function PredictionCard({p,vip=false}:{p:any;vip?:boolean}){
  const home=p.home||'Home', away=p.away||'Away';
  return <article className={`card prediction ${vip?'vip':''}`}>
    <div className="cardTop"><span className={`tag ${vip?'gold':''}`}>{vip?'PRO PICK':'FREE PICK'}</span><span className="confidence">{p.confidence}% confidence</span></div>
    <div className="match"><div className="team"><span className="teamBadge">{home.slice(0,3).toUpperCase()}</span><span>{home}</span></div><span className="vs">VS</span><div className="team"><span className="teamBadge alt">{away.slice(0,3).toUpperCase()}</span><span>{away}</span></div></div>
    <div className="pick"><small>{p.market}</small><strong>{p.selection}</strong></div>
    <div className="meta"><span>{p.league}</span><span>{new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Algiers'}).format(new Date(p.kickoff))}</span></div>
    {vip&&<div style={{marginTop:14}}><Link className="btn gold" style={{width:'100%'}} href="/pricing">Manage Pro access</Link></div>}
  </article>;
}
