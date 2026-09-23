const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── PIOGGIA MATRIX ──
(function(){
  const c = document.getElementById('mx'), x = c.getContext('2d');
  const ch = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789@#$%₤';
  const fs = 14; let d = [];
  function resize(){ c.width = innerWidth; c.height = innerHeight; d = Array.from({length:Math.ceil(c.width/fs)}, () => Math.random()*c.height/fs); }
  function draw(){
    x.fillStyle = 'rgba(2,8,6,.08)'; x.fillRect(0,0,c.width,c.height);
    x.font = fs+'px monospace';
    d.forEach((v,i) => {
      x.fillStyle = Math.random() > .97 ? '#b8ffd0' : (i % 7 === 0 ? '#3ddbff' : '#00ff41');
      x.fillText(ch[Math.floor(Math.random()*ch.length)], i*fs, v*fs);
      if (v*fs > c.height && Math.random() > .975) d[i] = 0;
      d[i]++;
    });
  }
  resize(); addEventListener('resize', resize);
  if (REDUCED) { for (let i = 0; i < 40; i++) draw(); return; }
  setInterval(() => { if (!document.hidden) draw(); }, 55);
})();

// ── BOLLE ──
(function(){
  const c = document.getElementById('bubbles'), x = c.getContext('2d');
  let W, H, dpr, bs = [];
  function mk(fromBottom){
    const r = 6 + Math.random()*Math.random()*38;
    return { x:Math.random()*W, y:fromBottom ? H + r + Math.random()*H*.3 : Math.random()*H, r,
      v:.15 + Math.random()*.45 + r/140, w:Math.random()*Math.PI*2, ws:.004 + Math.random()*.01 };
  }
  function resize(){
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    c.width = W*dpr; c.height = H*dpr; c.style.width = W+'px'; c.style.height = H+'px';
    x.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.round(Math.min(16, W/80));
    bs = Array.from({length:n}, () => mk(false));
  }
  function bubble(b){
    const g = x.createRadialGradient(b.x - b.r*.35, b.y - b.r*.4, b.r*.05, b.x, b.y, b.r);
    g.addColorStop(0, 'rgba(255,255,255,.28)');
    g.addColorStop(.55, 'rgba(61,219,255,.03)');
    g.addColorStop(.9, 'rgba(61,255,160,.14)');
    g.addColorStop(1, 'rgba(180,255,230,.4)');
    x.fillStyle = g; x.beginPath(); x.arc(b.x, b.y, b.r, 0, Math.PI*2); x.fill();
    x.fillStyle = 'rgba(255,255,255,.6)';
    x.beginPath(); x.ellipse(b.x - b.r*.38, b.y - b.r*.45, b.r*.26, b.r*.14, -.6, 0, Math.PI*2); x.fill();
  }
  function frame(){
    x.clearRect(0,0,W,H);
    bs.forEach((b,i) => {
      b.y -= b.v; b.w += b.ws; b.x += Math.sin(b.w)*.35;
      if (b.y < -b.r*2) bs[i] = mk(true);
      bubble(b);
    });
    if (!document.hidden) requestAnimationFrame(frame);
  }
  resize(); addEventListener('resize', resize);
  if (REDUCED) { bs.forEach(bubble); return; }
  requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestAnimationFrame(frame); });
})();

// ── MACCHINA DA SCRIVERE ──
(function(){
  const words = ['giochi arcade nel browser.', 'app AI che girano sul tuo PC.', 'gestionali senza abbonamento.', 'musica, tutta offline.', 'oggetti in stampa 3D.'];
  const el = document.getElementById('tw');
  if (REDUCED) { el.textContent = words[0]; return; }
  let wi = 0, ci = 0, del = false;
  function tick(){
    const w = words[wi];
    del ? ci-- : ci++;
    el.textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; setTimeout(tick, 1900); return; }
    if (del && ci === 0) { del = false; wi = (wi+1) % words.length; }
    setTimeout(tick, del ? 32 : 65);
  }
  setTimeout(tick, 500);
})();

// ── NAV: ombra, menu, link attivo, torna su ──
(function(){
  const nav = document.getElementById('nav'), btt = document.getElementById('btt');
  const menu = document.getElementById('menu'), links = document.getElementById('links');
  const close = () => { menu.classList.remove('on'); links.classList.remove('on'); menu.setAttribute('aria-expanded','false'); };
  menu.addEventListener('click', () => {
    const on = !links.classList.contains('on');
    menu.classList.toggle('on', on); links.classList.toggle('on', on); menu.setAttribute('aria-expanded', on);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  const secs = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...links.querySelectorAll('a:not(.aqua)')];
  function onScroll(){
    const s = scrollY;
    nav.classList.toggle('scrolled', s > 30);
    btt.classList.toggle('on', s > 600);
    let cur = '';
    secs.forEach(sec => { if (sec.getBoundingClientRect().top <= 140) cur = sec.id; });
    navLinks.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#'+cur));
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  btt.addEventListener('click', () => scrollTo({top:0, behavior: REDUCED ? 'auto' : 'smooth'}));
})();

// ── COMPARSA ALLO SCROLL ──
const reveal = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('v'); reveal.unobserve(e.target); }
}), {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el => reveal.observe(el));

// ── SALA SLOT: miniature ──
document.querySelectorAll('.cab').forEach(cab => {
  const shot = cab.querySelector('.screen .shot');
  cab.querySelectorAll('.thumb').forEach(t => t.addEventListener('click', () => {
    cab.querySelectorAll('.thumb').forEach(o => o.classList.toggle('on', o === t));
    shot.style.opacity = 0;
    setTimeout(() => { shot.src = t.dataset.src; shot.alt = t.dataset.alt; shot.style.opacity = 1; }, 180);
  }));
});

// ── CONTATTI ──
(function(){
  const PH = '+39 379 307 2693', WA = '393793072693';
  const mail = document.getElementById('c-mail'), wa = document.getElementById('c-wa');
  const reveal = document.getElementById('c-reveal'), phone = document.getElementById('c-phone'), note = document.getElementById('c-note');
  let topic = 'un progetto';
  function update(){
    const msg = `Ciao! Sono interessato a ${topic} e vorrei più informazioni.`;
    wa.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    mail.href = `mailto:dapprod22@gmail.com?subject=${encodeURIComponent('Info su ' + topic)}&body=${encodeURIComponent(msg)}`;
  }
  document.querySelectorAll('.topic').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.topic').forEach(o => { o.classList.toggle('on', o === b); o.setAttribute('aria-checked', o === b); });
    topic = b.dataset.t; update();
  }));
  reveal.addEventListener('click', () => {
    phone.textContent = PH; phone.hidden = false; note.hidden = false; wa.hidden = false; reveal.hidden = true;
  });
  update();
})();

// ── VIDEO YOUTUBE ──
(function(){
  const grid = document.getElementById('vgrid');
  const FB = ['jexuwfBA0Fo','mXyZzCB0ba8','XYIkNkon4gQ','RhjZHy90jSk','rtN5PTFfWzU','b0xwUUtLY1A'];

  // Inserisci qui l'ID del tuo canale per aggiornamento automatico dei video
  // Per trovarlo: youtube.com/@DaProdMusica → Altro → Condividi → cerca "channel/"
  const CH_ID = ''; // es: 'UCxxxxxxxxxxxxxxxxxxxxxxx'

  function getId(url){ const m = (url||'').match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/); return m ? m[1] : null; }

  function render(ids){
    if (!ids?.length) ids = FB;
    grid.innerHTML = '';
    ids.forEach(id => {
      const a = document.createElement('a');
      a.className = 'vid rv'; a.href = `https://www.youtube.com/watch?v=${id}`; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', 'Guarda il video su YouTube');
      a.innerHTML = `<img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><span class="play"><i class="fas fa-play"></i></span>`;
      grid.appendChild(a);
      reveal.observe(a);
    });
  }

  function fromRSS(ch){ return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id='+ch)}&count=12`).then(r => r.json()).then(d => { if (d.status !== 'ok' || !d.items?.length) throw 0; const ids = d.items.map(i => getId(i.link || i.guid)).filter(Boolean); if (!ids.length) throw 0; return ids; }); }
  function fromTxt(){ return fetch('video.txt').then(r => { if (!r.ok) throw 0; return r.text(); }).then(t => { const ids = t.split('\n').map(l => getId(l.trim())).filter(Boolean); if (!ids.length) throw 0; return ids; }); }

  (CH_ID ? fromRSS(CH_ID).catch(fromTxt) : fromTxt()).catch(() => FB).then(render);
})();

document.getElementById('yr').textContent = new Date().getFullYear();
