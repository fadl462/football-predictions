import Link from 'next/link';
import PredictionCard from '@/components/PredictionCard';
import { homeData } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export default async function Home() {
  const { matches, predictions } = await homeData();
  return <main>
    <section className="hero"><div className="container">
      <span className="eyebrow">● Algeria-first football intelligence</span>
      <h1>Des pronostics plus<br/><span>intelligents. Pour l’Algérie.</span></h1>
      <p>Des données football automatisées, des pronostics gratuits quotidiens et une sélection VIP premium. Le moteur donne la priorité au football algérien et conserve chaque résultat dans un historique transparent.</p>
      <div className="heroActions"><Link href="#today" className="btn primary">Voir les pronostics du jour</Link><Link href="/pricing" className="btn">Accéder au VIP</Link></div>
      <div className="stats"><div className="stat"><strong>3</strong><span>Pronostics gratuits / jour</span></div><div className="stat"><strong>68%+</strong><span>Seuil de confiance</span></div><div className="stat"><strong>🇩🇿 DZ</strong><span>Ligue 1 & Ligue 2 prioritaires</span></div><div className="stat"><strong>24/7</strong><span>Synchronisation automatique</span></div></div>
    </div></section>
    <section id="today" className="section"><div className="container"><div className="sectionHead"><div><h2>Pronostics gratuits du jour</h2><p>Sélectionnés automatiquement à partir des matchs disponibles en Algérie.</p></div><Link href="/history" className="btn">Voir l’historique</Link></div><div className="cards">{predictions.map((p:any)=><PredictionCard key={p.id} p={p}/>)}</div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><h2>VIP — la sélection premium</h2><p>Plus de matchs, filtres plus stricts et couverture renforcée.</p></div><Link href="/pricing" className="btn gold">Découvrir le VIP</Link></div><div className="card"><div className="lock"><div><b>🔒 Pronostics VIP réservés aux abonnés</b><span className="muted">Créez un compte et activez votre accès VIP pour voir la sélection complète.</span></div></div></div></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><div><h2>Matchs en Algérie</h2><p>Les données sont synchronisées automatiquement depuis le fournisseur football.</p></div><Link href="/matches" className="btn">Tous les matchs</Link></div><div className="fixtureList">{matches.slice(0,6).map((m:any)=><div className="fixture" key={m.id}><div className="league">{m.league}<br/><span>{m.country}</span></div><div className="teamsLine">{m.home} <span className="muted">vs</span> {m.away}</div><div><div className="kick">{new Date(m.kickoff).toLocaleTimeString('fr-DZ',{hour:'2-digit',minute:'2-digit',timeZone:siteConfig.timezone})}</div><span className="status">{m.status==='NS'?'À VENIR':m.status}</span></div></div>)}</div></div></section>
  </main>;
}
