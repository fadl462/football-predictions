import Link from 'next/link';
import PayButton from '@/components/PayButton';
import { getSessionUser } from '@/lib/auth';
import { formatDZD } from '@/lib/config';
import { prisma } from '@/lib/prisma';

export default async function Pricing(){
 const user=await getSessionUser();
 const demo=process.env.DEMO_MODE==='true' || !process.env.DATABASE_URL;
 const price=demo?1999:Number((await prisma.setting.findUnique({where:{key:'vip_price_dzd'}}))?.value||1999);
 const vipCount=demo?8:Number((await prisma.setting.findUnique({where:{key:'vip_prediction_count'}}))?.value||8);
 return <main className="page"><div className="container paywall"><div style={{textAlign:'center'}}><span className="eyebrow">Accès premium 🇩🇿</span><h1>Choisissez votre avantage.</h1><p className="muted">Les pronostics gratuits restent accessibles à tous. Le VIP débloque la sélection premium quotidienne.</p></div><div className="priceGrid" style={{marginTop:30}}><div className="price"><span className="tag">GRATUIT</span><h3>Free</h3><strong>0 DA</strong><ul><li>Pronostics gratuits quotidiens</li><li>Pourcentage de confiance</li><li>Historique complet</li><li>Matchs & horaires locaux</li></ul><Link className="btn" href="/register">Créer un compte</Link></div><div className="price featured"><span className="tag gold">VIP</span><h3>VIP Algérie</h3><strong>{formatDZD(price)}<span style={{fontSize:15}}>/30 jours</span></strong><ul><li>Jusqu’à {vipCount} pronostics premium / jour</li><li>Priorité Ligue 1 & Ligue 2</li><li>Filtres de confiance renforcés</li><li>Marchés supplémentaires</li><li>Accès réservé aux abonnés actifs</li></ul>{user?<PayButton/>:<Link className="btn gold" href="/register">Créer un compte pour activer</Link>}</div></div><div className="notice" style={{marginTop:18}}>Paiement local via Chargily Pay, avec prise en charge de CIB et EDAHABIA. Le montant est affiché en dinars algériens. La clé secrète reste uniquement côté serveur.</div></div></main>;
}
