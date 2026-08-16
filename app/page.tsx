import Link from 'next/link';
import PredictionCard from '@/components/PredictionCard';
import { homeData } from '@/lib/data';
import { formatUSD, competitionBoard } from '@/lib/config';

export default async function Home() {
  const { matches, predictions, affiliate, freeCount, vipCount, vipPrice } = await homeData();
  const board = [
    ['01', 'Top Leagues', competitionBoard.topLeagues.slice(0, 5).map(x => x.name).join(' · ')],
    ['02', 'UEFA', competitionBoard.uefa.map(x => x.name.replace('UEFA ', '')).join(' · ')],
    ['03', 'Americas', competitionBoard.americas.map(x => x.name).join(' · ')],
    ['04', 'Asia & Middle East', competitionBoard.asia.map(x => x.name).join(' · ')],
    ['05', 'Africa', competitionBoard.africa.map(x => x.name).join(' · ')],
  ];
  return <main>{process.env.DEMO_MODE === 'true' && <div className="demoBanner">Demo mode — example data is being used. Live fixtures, predictions and settlement activate after production services are connected.</div>}
    <section className="hero"><div className="container">
      <span className="eyebrow">● WORLD FOOTBALL INTELLIGENCE · TOP COMPETITIONS FIRST</span>
      <h1>Football<br/><span>in the right order.</span></h1>
      <p>A professional prediction workspace organized around the world's most important leagues and competitions — with match intelligence, a transparent track record and a premium Pro layer.</p>
      <div className="heroActions"><Link href="#today" className="btn primary">Today's picks</Link><Link href="/matches" className="btn">Open Match Centre</Link><Link href="/pricing" className="btn gold">Pro · {formatUSD(vipPrice)}</Link></div>
      <div className="stats"><div className="stat"><strong>{freeCount}</strong><span>Free picks / day</span></div><div className="stat"><strong>72%+</strong><span>Pro confidence floor</span></div><div className="stat"><strong>UEFA</strong><span>Dedicated club layer</span></div><div className="stat"><strong>24/7</strong><span>Automated sync</span></div></div>
    </div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">WORLD COMPETITION BOARD</span><h2>The football world, <span>organized.</span></h2><p>Top leagues come first. UEFA, the Americas, Asia and Africa follow as dedicated discovery layers.</p></div><Link href="/matches" className="btn">Explore all</Link></div><div className="cards">{board.map(([n,title,desc])=><div className="card" key={n}><span className="eyebrow">{n}</span><h3>{title}</h3><p className="muted">{desc}</p></div>)}</div></div></section>
    <section id="today" className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">DAILY DESK</span><h2>Today's <span>best signals.</span></h2><p>The engine ranks the competition board before selecting qualifying prediction candidates.</p></div><Link href="/history" className="btn">Track record</Link></div><div className="cards">{predictions.map((p:any)=><PredictionCard key={p.id} p={p}/>)}</div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">MATCH CENTRE</span><h2>Top leagues, UEFA, <span>the world.</span></h2><p>Fixtures are ranked by competition importance and then by kickoff.</p></div><Link href="/matches" className="btn">All matches</Link></div><div className="fixtureList">{matches.slice(0,12).map((m:any)=><Link href={`/matches/${m.id}`} className="fixture matchLink" key={m.id}><div className="league"><b>{m.league}</b><br/><span>{m.country}</span></div><div className="teamsLine"><b>{m.home}</b> <span className="muted">vs</span> <b>{m.away}</b></div><div><div className="kick">{new Date(m.kickoff).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Algiers'})}</div><span className="status">{m.status==='NS'?'UPCOMING':m.status}</span></div><span className="arrow">→</span></Link>)}</div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">PRO INTELLIGENCE</span><h2>More depth. <span>More discipline.</span></h2><p>Up to {vipCount} premium selections per day across the world competition board.</p></div><Link href="/pricing" className="btn gold">Explore Pro</Link></div><div className="card"><div className="lock"><div><b>🔒 Premium selections</b><span className="muted">Pro prioritizes the strongest signals across Top Leagues, UEFA, Americas, Asia and Africa.</span></div></div></div></div></section>
    {affiliate && <section className="section"><div className="container"><div className="card affiliateBanner"><div><span className="eyebrow">PARTNER</span><h2>Football partner offers</h2><p className="muted">Affiliate destinations are managed from the administration layer.</p></div><Link href={`/go/${affiliate.id}`} className="btn gold">View partner</Link></div></div></section>}
  </main>;
}
