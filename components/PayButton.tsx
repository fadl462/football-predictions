'use client';
import { useState } from 'react';
export default function PayButton(){
 const [busy,setBusy]=useState(false); const [err,setErr]=useState('');
 async function go(){setBusy(true);setErr('');const r=await fetch('/api/chargily/initialize',{method:'POST'});const j=await r.json();if(!r.ok){setErr(j.error||'Le paiement ne peut pas démarrer');setBusy(false);return}if(j.checkout_url)window.location.href=j.checkout_url;else{setErr('Le prestataire n’a pas renvoyé de lien de paiement.');setBusy(false)}}
 return <><button className="btn gold" onClick={go} disabled={busy}>{busy?'Ouverture du paiement…':'Activer le VIP'}</button>{err&&<div className="notice" style={{marginTop:10}}>{err}</div>}</>;
}
