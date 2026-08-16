const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
const menu=$('.mobile-menu'); $('.mobile-toggle')?.addEventListener('click',()=>menu.classList.toggle('open')); $$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
const modal=$('#modal'), content=$('#modal-content');
function show(type){
 if(type==='vip'){content.innerHTML=`<span class="eyebrow gold">VIP / 30 JOURS</span><h3>Débloquez la sélection premium</h3><p>Dans la version en ligne, ce bouton ouvrira le checkout sécurisé Chargily Pay en DZD. Ici, nous présentons le parcours utilisateur.</p><button class="gold-btn" onclick="alert('Démo : le paiement sera connecté après déploiement.')">Continuer vers le paiement</button>`}
 else {content.innerHTML=`<span class="eyebrow">COMPTE</span><h3>Connexion</h3><p>Accédez à vos pronostics VIP et à votre espace personnel.</p><input class="modal-input" placeholder="Adresse e-mail"><input class="modal-input" type="password" placeholder="Mot de passe"><button class="primary">Se connecter</button><p style="margin-top:15px">Nouveau ? <b>Créer un compte</b></p>`}
 modal.classList.add('show');
}
$$('[data-modal]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.modal)));
$('.modal-close')?.addEventListener('click',()=>modal.classList.remove('show')); $('.modal-backdrop')?.addEventListener('click',()=>modal.classList.remove('show'));
