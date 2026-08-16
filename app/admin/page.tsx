import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AdminControls from '@/components/AdminControls';

export default async function Admin() {
  const admin = await requireAdmin();
  if (!admin) redirect('/login');

  const [userCount, users, predictions, predictionCount, activeVip, affiliates, settings, leagues, win, loss] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({ select: { id: true, email: true, role: true, subscription: { select: { status: true } } }, orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.prediction.findMany({ include: { fixture: true }, orderBy: { publishedAt: 'desc' }, take: 20 }),
    prisma.prediction.count(),
    prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    prisma.affiliateLink.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.setting.findMany(),
    prisma.league.findMany({ where: { country: 'Algeria' }, orderBy: [{ priority: 'desc' }, { name: 'asc' }] }),
    prisma.prediction.count({ where: { status: 'WON' } }),
    prisma.prediction.count({ where: { status: 'LOST' } }),
  ]);

  return <main className="page">
    <div className="container">
      <div className="sectionHead">
        <div><span className="eyebrow">Control center</span><h1>Admin dashboard</h1><p className="muted">Gérez les utilisateurs, le moteur automatisé, les prédictions, les ligues, les abonnements VIP et les affiliés.</p></div>
        <form action="/api/auth/logout" method="post"><button className="btn">Sign out</button></form>
      </div>

      <div className="dashCards">
        <div className="dashCard"><span className="muted">Users</span><br/><b>{userCount}</b></div>
        <div className="dashCard"><span className="muted">VIP active</span><br/><b>{activeVip}</b></div>
        <div className="dashCard"><span className="muted">Predictions</span><br/><b>{predictionCount}</b></div>
        <div className="dashCard"><span className="muted">Record</span><br/><b>{win}–{loss}</b></div>
      </div>

      <div className="adminGrid" style={{ marginTop: 18 }}>
        <aside className="side">
          <Link href="#settings">Settings</Link>
          <Link href="#predictions">Predictions</Link>
          <Link href="#users">Users & VIP</Link>
          <Link href="#leagues">Leagues</Link>
          <Link href="#affiliates">Affiliate</Link>
          <Link href="/history">History</Link>
          <Link href="/matches">Matches</Link>
        </aside>
        <div>
          <section id="settings" className="card">
            <h2>Automation settings</h2>
            <p className="muted">Free/VIP volume and confidence thresholds are stored in PostgreSQL and can be changed without redeploying.</p>
            <div className="fixtureList">
              <div className="fixture"><div><b>Free picks/day</b><br/><span className="muted">{settings.find(s => s.key === 'free_prediction_count')?.value || 3}</span></div><span className="tag">Editable</span></div>
              <div className="fixture"><div><b>VIP picks/day</b><br/><span className="muted">{settings.find(s => s.key === 'vip_prediction_count')?.value || 8}</span></div><span className="tag">Editable</span></div>
              <div className="fixture"><div><b>Free confidence</b><br/><span className="muted">{settings.find(s => s.key === 'min_confidence')?.value || 68}%</span></div><span className="tag">Editable</span></div>
              <div className="fixture"><div><b>VIP confidence</b><br/><span className="muted">{settings.find(s => s.key === 'vip_min_confidence')?.value || 72}%</span></div><span className="tag">Editable</span></div>
            </div>
          </section>

          <section id="predictions" className="card" style={{ marginTop: 14 }}>
            <h2>Prediction operations</h2>
            <p className="muted">Automatic sync imports Algerian fixtures, requests prediction inputs, publishes the daily tiers and settles completed results. Manual overrides are available below.</p>
            <div className="notice">Endpoint: <code>/api/cron/sync</code> · Health: <code>/api/health</code> · Algorithm: <code>dz-v2</code></div>
          </section>

          <div id="users"><AdminControls predictions={predictions} users={users} leagues={leagues} affiliates={affiliates} settings={settings} /></div>
        </div>
      </div>
    </div>
  </main>;
}
