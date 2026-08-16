import Link from 'next/link';

const groups = [
  {title:'Top Leagues', items:[['Premier League','/matches?league=Premier%20League'],['La Liga','/matches?league=La%20Liga'],['Serie A','/matches?league=Serie%20A'],['Bundesliga','/matches?league=Bundesliga'],['Ligue 1','/matches?league=Ligue%201'],['Eredivisie','/matches?league=Eredivisie'],['Primeira Liga','/matches?league=Primeira%20Liga']]},
  {title:'UEFA', items:[['Champions League','/matches?league=UEFA%20Champions%20League'],['Europa League','/matches?league=UEFA%20Europa%20League'],['Conference League','/matches?league=UEFA%20Conference%20League'],['European Championship','/matches?region=UEFA']]},
  {title:'Americas', items:[['Copa Libertadores','/matches?league=Copa%20Libertadores'],['Brasileirão','/matches?league=Brasileirao'],['Argentina Primera','/matches?league=Argentina%20Primera'],['Liga MX','/matches?league=Liga%20MX'],['MLS','/matches?league=MLS']]},
  {title:'Asia & Middle East', items:[['Saudi Pro League','/matches?league=Saudi%20Pro%20League'],['J1 League','/matches?league=J1%20League'],['K League 1','/matches?league=K%20League%201'],['Qatar Stars League','/matches?league=Qatar%20Stars%20League'],['AFC Champions League Elite','/matches?region=AFC']]},
  {title:'Africa', items:[['CAF Champions League','/matches?league=CAF%20Champions%20League'],['CAF Confederation Cup','/matches?league=CAF%20Confederation%20Cup'],['Egypt Premier League','/matches?league=Egypt%20Premier%20League'],['Botola Pro','/matches?league=Botola%20Pro'],['Algeria Ligue 1','/matches?league=Ligue%201%20Mobilis'],['Algeria Ligue 2','/matches?league=Ligue%202']]},
];

export default function WorldNav(){
 return <nav className="worldNav" aria-label="World football navigation">
   <Link className="worldNavHome" href="/">Desk</Link>
   <details><summary>Top Leagues</summary><div className="mega"><div className="megaIntro"><span className="eyebrow">WORLD FOOTBALL</span><h3>Top competitions, organized.</h3><p>Start with the leagues and competitions that matter most. Algeria is available under Africa, not promoted as the global top-level menu.</p><Link className="btn primary" href="/matches">Open Match Centre</Link></div><div className="megaGroups">{groups.map(g=><div key={g.title}><b>{g.title}</b>{g.items.map(([label,url])=><Link key={url} href={url}>{label}</Link>)}</div>)}</div></div></details>
   <Link href="/matches">Matches</Link><Link href="/history">Track Record</Link><Link href="/pricing">Pro</Link>
 </nav>
}
