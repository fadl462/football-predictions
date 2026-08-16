import './globals.css';
import { getSessionUser } from '@/lib/auth';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';

export const metadata = {
  title: 'DZ Football Edge | Pronostics football en Algérie',
  description: 'Pronostics football gratuits et VIP, matchs et historique des résultats, avec priorité au football algérien.',
  keywords: ['pronostics football Algérie', 'Ligue 1 Algérie', 'Ligue 2 Algérie', 'paris football Algérie', 'pronostics VIP'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return <html lang="fr-DZ"><body><header className="topbar"><div className="container nav"><Link className="brand" href="/"><span className="brandmark">DZ</span> DZ FOOTBALL EDGE</Link><nav className="navlinks"><Link href="/">Pronostics</Link><Link href="/matches">Matchs</Link><Link href="/history">Historique</Link><Link href="/pricing">VIP</Link></nav><div className="actions">{user?.role==='ADMIN'&&<Link className="btn" href="/admin">Admin</Link>}{user?<Link className="btn primary" href="/vip">Mon VIP</Link>:<Link className="btn primary" href="/login">Connexion</Link>}<MobileNav /></div></div></header>{children}<footer className="footer"><div className="container footerGrid"><div>© 2026 DZ Football Edge. Pronostics à titre informatif — aucun résultat n’est garanti.</div><div>🇩🇿 Algérie • Mobile first • Données automatisées</div></div></footer></body></html>;
}
