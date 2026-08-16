'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="mobileNav">
    <button className="mobileMenuButton" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>☰</button>
    {open && <div className="mobilePanel">
      <Link href="/" onClick={() => setOpen(false)}>Pronostics</Link>
      <Link href="/matches" onClick={() => setOpen(false)}>Matchs</Link>
      <Link href="/history" onClick={() => setOpen(false)}>Historique</Link>
      <Link href="/pricing" onClick={() => setOpen(false)}>Pro</Link><Link href="/about" onClick={() => setOpen(false)}>About</Link>
    </div>}
  </div>;
}
