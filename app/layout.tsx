import './globals.css';
import { getSessionUser } from '@/lib/auth';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import WorldNav from '@/components/WorldNav';

export const metadata={title:'The Match Desk | Football Intelligence & Predictions',description:'The Match Desk brings elite European football, UEFA competitions, global fixtures and Algeria into one data-led prediction workspace.',keywords:['football predictions','soccer predictions','Premier League predictions','Champions League predictions','Algeria football']};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const user=await getSessionUser();
 return <html lang="en"><body><header className="topbar"><div className="container nav"><Link className="brand" href="/"><span className="brandmark">MD</span><span>THE MATCH DESK</span></Link><WorldNav/><div className="actions">{user?.role==='ADMIN'&&<Link className="btn" href="/admin">Admin</Link>}{user?<Link className="btn primary" href="/vip">My Pro</Link>:<Link className="btn primary" href="/login">Sign in</Link>}<MobileNav/></div></div></header>{children}<footer className="footer"><div className="container footerGrid"><div><b>THE MATCH DESK</b><br/><span>Football intelligence, probabilities and tracked predictions.</span></div><div><Link href="/about">About</Link> · <Link href="/faq">FAQ</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></div><div>Predictions are estimates, not guarantees. 18+ · Use responsibly.</div></div></footer></body></html>;}
