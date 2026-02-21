// ── MATRIX RAIN ──
(function(){
  const c=document.getElementById('mx'), x=c.getContext('2d');
  const ch='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789@#$%';
  const fs=13; let d=[];
  function resize(){ c.width=innerWidth; c.height=innerHeight; d=Array.from({length:Math.floor(c.width/fs)},()=>Math.random()*c.height/fs); }
  function draw(){ x.fillStyle='rgba(0,0,0,.055)'; x.fillRect(0,0,c.width,c.height); x.fillStyle='#00ff41'; x.font=fs+'px monospace'; d.forEach((v,i)=>{ x.fillText(ch[Math.floor(Math.random()*ch.length)],i*fs,v*fs); if(v*fs>c.height&&Math.random()>.975)d[i]=0; d[i]++; }); }
  resize(); window.addEventListener('resize',resize); setInterval(draw,48);
})();

// ── TYPEWRITER ──
(function(){
  const words=['Stampa 3D','Software AI','Produzioni Musicali'];
  const el=document.getElementById('tw');
  let wi=0,ci=0,del=false;
  function tick(){
    const w=words[wi];
    del ? ci-- : ci++;
    el.textContent=w.slice(0,ci);
    if(!del&&ci===w.length){ del=true; setTimeout(tick,1800); return; }
    if(del&&ci===0){ del=false; wi=(wi+1)%words.length; }
    setTimeout(tick,del?45:80);
  }
  setTimeout(tick,400);
})();

// ── SCROLL: progress + nav shadow + back-to-top ──
(function(){
  const bar=document.getElementById('prog'), nav=document.getElementById('nav'), btt=document.getElementById('btt');
  window.addEventListener('scroll',()=>{
    const s=scrollY, t=document.documentElement.scrollHeight-innerHeight;
    bar.style.width=(s/t*100)+'%';
    nav.style.boxShadow=s>30?'0 2px 20px rgba(0,255,65,.08)':'none';
    btt.classList.toggle('on',s>400);
  },{passive:true});
  btt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();

// ── HAMBURGER ──
(function(){
  const h=document.getElementById('hbg'), m=document.getElementById('mn');
  h.addEventListener('click',()=>{ h.classList.toggle('on'); m.classList.toggle('on'); });
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ h.classList.remove('on'); m.classList.remove('on'); }));
})();

// ── SMOOTH SCROLL + ACTIVE NAV ──
(function(){
  const NH=58;
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');
    if(!a)return;
    const t=document.querySelector(a.getAttribute('href'));
    if(!t)return;
    e.preventDefault();
    scrollTo({top:t.getBoundingClientRect().top+scrollY-NH-8,behavior:'smooth'});
  });
  const secs=[...document.querySelectorAll('section[id]')];
  const links=[...document.querySelectorAll('#nl li a, #mn a')];
  function setAct(){
    let cur='';
    secs.forEach(s=>{ if(s.getBoundingClientRect().top<=NH+100)cur=s.id; });
    links.forEach(l=>l.classList.toggle('act',l.getAttribute('href')==='#'+cur));
  }
  window.addEventListener('scroll',setAct,{passive:true}); setAct();
})();

// ── SCROLL REVEAL ──
(function(){
  const obs=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target);} }),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
})();

// ── REVEAL PHONE ──
(function(){
  const PH='+39 379 307 2693';
  document.querySelectorAll('.rph').forEach(b=>b.addEventListener('click',function(){
    const ph=document.getElementById(this.dataset.t), wp=document.getElementById(this.dataset.w), n=document.getElementById(this.dataset.n);
    if(ph){ph.textContent=PH; ph.style.color='#00ff41';}
    this.style.display='none';
    if(wp)wp.style.display='inline-block';
    if(n)n.style.display='block';
  }));
})();

// ── YOUTUBE VIDEOS ──
(function(){
  const grid=document.getElementById('vgrid');
  const FB=['jexuwfBA0Fo','mXyZzCB0ba8','XYIkNkon4gQ','RhjZHy90jSk','rtN5PTFfWzU','b0xwUUtLY1A'];

  // Inserisci qui l'ID del tuo canale per aggiornamento automatico dei video
  // Per trovarlo: youtube.com/@DaProdMusica → Altro → Condividi → cerca "channel/"
  const CH_ID=''; // es: 'UCxxxxxxxxxxxxxxxxxxxxxxx'

  function getId(url){ const m=(url||'').match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/); return m?m[1]:null; }

  function render(ids){
    if(!ids?.length)ids=FB;
    grid.innerHTML='';
    ids.forEach(id=>{
      const d=document.createElement('div'); d.className='vw rv';
      d.innerHTML=`
        <a href="https://www.youtube.com/watch?v=${id}" target="_blank" class="vlink">
          <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="Video Thumbnail" loading="lazy">
          <div class="vplay">
            <div class="vplay-inner">
              <i class="fas fa-play"></i>
              <span>Guarda su YouTube</span>
            </div>
          </div>
        </a>`;
      grid.appendChild(d);
    });
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target);}}),{threshold:.1});
    grid.querySelectorAll('.rv').forEach(el=>obs.observe(el));

    document.querySelector('.ytbox')?.remove();
    const box=document.createElement('div'); box.className='ytbox rv';
    box.innerHTML=`<p>Scopri tutte le produzioni sul canale YouTube:</p><a href="https://www.youtube.com/@DaProdMusica/videos" target="_blank" class="btnyt"><i class="fab fa-youtube"></i> Visita DaProdMusica</a><p style="font-size:.8em;color:#2d4a2d;margin-top:10px">Ogni produzione realizzata interamente offline con software open source.</p>`;
    grid.parentNode.insertBefore(box,grid.nextSibling);
    obs.observe(box);
  }

  function fromRSS(ch){ return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id='+ch)}&count=12`).then(r=>r.json()).then(d=>{ if(d.status!=='ok'||!d.items?.length)throw 0; const ids=d.items.map(i=>getId(i.link||i.guid)).filter(Boolean); if(!ids.length)throw 0; return ids; }); }
  function fromTxt(){ return fetch('video.txt').then(r=>{if(!r.ok)throw 0;return r.text();}).then(t=>{ const ids=t.split('\n').map(l=>getId(l.trim())).filter(Boolean); if(!ids.length)throw 0; return ids; }); }

  (CH_ID ? fromRSS(CH_ID).catch(fromTxt) : fromTxt()).catch(()=>FB).then(render);
})();
