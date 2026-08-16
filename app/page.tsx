import Link from 'next/link';
import PredictionCard from '@/components/PredictionCard';
import { homeData } from '@/lib/data';
import { formatUSD } from '@/lib/config';

const priorityBoards = [
  ['01', 'Europe Elite', 'Premier League · La Liga · Serie A · Bundesliga · Ligue 1'],
  ['02', 'UEFA', 'Champions League · Europa League · Conference League'],
  ['03', 'Global', 'Libertadores · Brasileirão · MLS · Liga MX · Saudi Pro League'],
  ['04', 'Algérie', 'Ligue 1 Mobilis · Ligue 2 · Coupe d’Algérie'],
];

export default async function Home() {
  const { matches, predictions, affiliate, freeCount, vipCount, vipPrice } = await homeData();
  return <main>{process.env.DEMO_MODE === 'true' && <div className="demoBanner">Mode démo — exemples de données. Le moteur live prend le relais après connexion de la base et de l’API football.</div>}
    <section className="hero"><div className="container">
      <span className="eyebrow">● GLOBAL FOOTBALL INTELLIGENCE · EUROPE FIRST</span>
      <h1>Le football<br/><span>dans le bon ordre.</span></h1>
      <p>Un centre de pronostics structuré par niveau : grandes ligues européennes, compétitions UEFA, football mondial avancé, puis notre couverture algérienne dédiée.</p>
      <div className="heroActions"><Link href="#today" className="btn primary">Voir les picks du jour</Link><Link href="/matches" className="btn">Explorer les matchs</Link><Link href="/pricing" className="btn gold">VIP · {formatUSD(vipPrice)}</Link></div>
      <div className="stats"><div className="stat"><strong>{freeCount}</strong><span>Picks gratuits / jour</span></div><div className="stat"><strong>72%+</strong><span>Seuil VIP</span></div><div className="stat"><strong>UEFA</strong><span>Couverture continentale</span></div><div className="stat"><strong>24/7</strong><span>Synchronisation automatique</span></div></div>
    </div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">FOOTBALL PRIORITY BOARD</span><h2>Les compétitions <span>dans l’ordre.</span></h2><p>Le moteur donne d’abord du poids aux compétitions à forte profondeur statistique, puis descend progressivement vers les marchés secondaires.</p></div></div><div className="cards">{priorityBoards.map(([n,title,desc])=><div className="card" key={n}><span className="eyebrow">{n}</span><h3>{title}</h3><p className="muted">{desc}</p></div>)}</div></div></section>
    <section id="today" className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">DAILY EDGE</span><h2>Picks <span>du jour</span></h2><p>Les meilleurs signaux sont sélectionnés après le classement des compétitions.</p></div><Link href="/history" className="btn">Voir l’historique</Link></div><div className="cards">{predictions.map((p:any)=><PredictionCard key={p.id} p={p}/>)}</div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">MATCH CENTRE</span><h2>Europe, UEFA, <span>monde & Algérie.</span></h2><p>Les rencontres sont affichées selon la priorité du moteur, pas seulement selon l’ordre de kickoff.</p></div><Link href="/matches" className="btn">Tous les matchs</Link></div><div className="fixtureList">{matches.slice(0,12).map((m:any)=><div className="fixture" key={m.id}><div className="league">{m.league}<br/><span>{m.country}</span></div><div className="teamsLine">{m.home} <span className="muted">vs</span> {m.away}</div><div><div className="kick">{new Date(m.kickoff).toLocaleTimeString('fr-DZ',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Algiers'})}</div><span className="status">{m.status==='NS'?'À VENIR':m.status}</span></div></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><span className="eyebrow">VIP EDGE</span><h2>Plus de profondeur. <span>Plus de discipline.</span></h2><p>Jusqu’à {vipCount} sélections premium par jour sur les compétitions prioritaires.</p></div><Link href="/pricing" className="btn gold">Découvrir le VIP</Link></div><div className="card"><div className="lock"><div><b>🔒 Prochaine sélection VIP</b><span className="muted">Le contenu premium est réservé aux abonnés actifs. Les marchés Europe Elite et UEFA sont servis en priorité.</span></div></div></div></div></section>
    {affiliate && <section className="section"><div className="container"><div className="card affiliateBanner"><div><span className="eyebrow">PARTENAIRE</span><h2>Offres football de notre partenaire</h2><p className="muted">Destination gérée depuis l’administration — aucun changement de code nécessaire.</p></div><Link href={`/go/${affiliate.id}`} className="btn gold">Voir le partenaire</Link></div></div></section>}
  </main>;
}
