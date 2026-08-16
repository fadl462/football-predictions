'use client';

import { useState } from 'react';

type Prediction = { id: string; market: string; selection: string; confidence: number; status: string; manuallyOverridden: boolean; fixture: { homeTeam: string; awayTeam: string } };
type User = { id: string; email: string; role: string; subscription?: { status: string } | null };
type League = { id: string; name: string; priority: number; active: boolean };
type Affiliate = { id: string; name: string; url: string; active: boolean; clicks: number };
type Setting = { key: string; value: string };

async function post(body: unknown) {
  const response = await fetch('/api/admin/manage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || 'Action failed');
  return json;
}

export default function AdminControls({ predictions, users, leagues, affiliates, settings }: { predictions: Prediction[]; users: User[]; leagues: League[]; affiliates: Affiliate[]; settings: Setting[] }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [affiliateUrl, setAffiliateUrl] = useState(affiliates[0]?.url || '');

  async function run(body: unknown) {
    setBusy(true); setMessage(''); setError('');
    try { await post(body); setMessage('Saved. Refresh the page to see the updated values.'); }
    catch (e: any) { setError(e.message || 'Action failed'); }
    finally { setBusy(false); }
  }

  return <div className="adminControls">
    {(message || error) && <div className="notice">{error || message}</div>}

    <section className="card" style={{ marginTop: 14 }}>
      <h2>Automation settings</h2>
      <div className="adminFormGrid">
        {[['free_prediction_count','Free picks/day','3'],['vip_prediction_count','VIP picks/day','8'],['min_confidence','Free confidence %','68'],['vip_min_confidence','VIP confidence %','72']].map(([key,label,defaultValue]) => { const current = settings.find(s => s.key === key)?.value || defaultValue; return <form key={key} onSubmit={e => { e.preventDefault(); const value = new FormData(e.currentTarget).get('value')?.toString() || defaultValue; run({ action:'setting', key, value }); }}><label>{label}<input name="value" defaultValue={current} inputMode="numeric" /></label><button className="btn" disabled={busy}>Save</button></form>; })}
      </div>
    </section>

    <section className="card" style={{ marginTop: 14 }}>
      <h2>Affiliate destination</h2>
      <p className="muted">The public redirect is `/go/&lt;affiliate-id&gt;`, so the destination can change without editing the site.</p>
      <form onSubmit={e => { e.preventDefault(); run({ action:'affiliate', id:affiliates[0]?.id, name:affiliates[0]?.name || 'Primary Betting Partner', url:affiliateUrl, active:true }); }} className="adminFormRow"><input value={affiliateUrl} onChange={e => setAffiliateUrl(e.target.value)} placeholder="https://approved-partner.example/..." type="url" required /><button className="btn" disabled={busy}>Save affiliate</button></form>
    </section>

    <section className="card" style={{ marginTop: 14 }}>
      <h2>Manual prediction overrides</h2>
      {predictions.map(p => <form key={p.id} className="fixture" onSubmit={e => { e.preventDefault(); const fd=new FormData(e.currentTarget); run({ action:'prediction', id:p.id, market:fd.get('market'), selection:fd.get('selection'), confidence:Number(fd.get('confidence')), status:fd.get('status') }); }}><div><b>{p.fixture.homeTeam} vs {p.fixture.awayTeam}</b><br/><span className="muted">{p.manuallyOverridden?'Manual override':'Automated'} · {p.status}</span></div><input name="market" defaultValue={p.market} /><input name="selection" defaultValue={p.selection} /><input name="confidence" type="number" min="0" max="100" defaultValue={p.confidence} /><select name="status" defaultValue={p.status}><option>PENDING</option><option>WON</option><option>LOST</option><option>VOID</option></select><button className="btn" disabled={busy}>Update</button></form>)}
    </section>

    <section className="card" style={{ marginTop: 14 }}>
      <h2>User & VIP management</h2>
      {users.map(u => <div className="fixture" key={u.id}><div><b>{u.email}</b><br/><span className="muted">Role: {u.role} · VIP: {u.subscription?.status || 'NONE'}</span></div><button className="btn" disabled={busy} onClick={() => run({ action:'user', id:u.id, subscriptionStatus:'ACTIVE' })}>Grant 30d VIP</button><button className="btn" disabled={busy} onClick={() => run({ action:'user', id:u.id, subscriptionStatus:'EXPIRED' })}>Expire VIP</button><button className="btn" disabled={busy} onClick={() => run({ action:'user', id:u.id, role:u.role==='ADMIN'?'USER':'ADMIN' })}>{u.role==='ADMIN'?'Make user':'Make admin'}</button></div>)}
    </section>

    <section className="card" style={{ marginTop: 14 }}>
      <h2>League controls</h2>
      {leagues.map(l => <div className="fixture" key={l.id}><div><b>{l.name}</b><br/><span className="muted">Priority {l.priority}</span></div><button className="btn" disabled={busy} onClick={() => fetch('/api/admin/league',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:l.id,active:!l.active})}).then(()=>location.reload())}>{l.active?'Disable':'Enable'}</button></div>)}
    </section>
  </div>;
}
