// ===== MAP STATE =====
const cv=$('#map'), ctx=cv.getContext('2d');
let DPR=1, VW=0, VH=0;
const G={ planet:null, robot:{x:0,y:0,face:1,trail:[]}, target:null, targetRelic:null, keys:{}, near:null, mode:'title', time:0, burst:null, activeShown:{}, pointerDown:false };
function resize(){ DPR=Math.min(2,window.devicePixelRatio||1); VW=cv.clientWidth; VH=cv.clientHeight; cv.width=Math.round(VW*DPR); cv.height=Math.round(VH*DPR); drawStars(); }
window.addEventListener('resize',resize);

function setPlanet(p){
 if(!TERRAIN[p]) genTerrain(p);
 G.planet=p; S.planet=p;
 const pos=S.pos[p]; if(pos){ G.robot.x=pos.x; G.robot.y=pos.y; } else { const q=ll2xy(PLANETS[p].start[0],PLANETS[p].start[1]); G.robot.x=q.x; G.robot.y=q.y; }
 G.robot.trail=[]; G.target=null; G.targetRelic=null; save();
 $('#planetChip').textContent=pName(p); document.body.dataset.planet=p;
}

function zoomNow(){ return Math.max(1, VH/H, VW/W); }
function cam(){ const z=zoomNow(); const hh=VH/z; return {z, x:G.robot.x, y:clamp(G.robot.y, hh/2, H-hh/2)}; }
function toScreen(x,y,C){ return {x:VW/2+wrapDX(x-C.x)*C.z, y:VH/2+(y-C.y)*C.z}; }
function toWorld(sx,sy,C){ return {x:modW(C.x+(sx-VW/2)/C.z), y:clamp(C.y+(sy-VH/2)/C.z,0,H)}; }

// ===== INPUT =====
function pointerWorld(e){ const r=cv.getBoundingClientRect(); return toWorld(e.clientX-r.left, e.clientY-r.top, cam()); }
cv.addEventListener('pointerdown',e=>{ if(G.mode!=='map') return; G.pointerDown=true; cv.setPointerCapture(e.pointerId); setTargetFrom(e,true); hideTut(); });
cv.addEventListener('pointermove',e=>{ if(G.mode!=='map'||!G.pointerDown) return; setTargetFrom(e,false); });
const up=()=>{ G.pointerDown=false; }; cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',up);
function setTargetFrom(e,allowSnap){ const w=pointerWorld(e); G.targetRelic=null;
 if(allowSnap){ const C=cam(); for(const r of relicsOf(G.planet)){ const p=ll2xy(r.lat,r.lon); const d=Math.hypot(wrapDX(p.x-w.x),p.y-w.y)*C.z; if(d<30){ G.target={x:p.x,y:p.y}; G.targetRelic=r; return; } } }
 G.target=w; }
window.addEventListener('keydown',e=>{ if(G.mode!=='map') return; const k=e.key.toLowerCase(); if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)){ G.keys[k]=true; G.target=null; e.preventDefault(); hideTut(); }
 if((k==='enter'||k===' ')&&G.near&&!document.querySelector('.overlay.open')){ e.preventDefault(); openRelic(G.near); } });
window.addEventListener('keyup',e=>{ G.keys[e.key.toLowerCase()]=false; });

// ===== UPDATE =====
let lastSave=0, lastHud=0;
function update(dt){
 const rb=G.robot, sp=250; let vx=0, vy=0; const k=G.keys;
 if(k.arrowleft||k.a) vx-=1; if(k.arrowright||k.d) vx+=1; if(k.arrowup||k.w) vy-=1; if(k.arrowdown||k.s) vy+=1;
 let moved=false;
 if(vx||vy){ const n=Math.hypot(vx,vy); rb.x+=vx/n*sp*dt; rb.y+=vy/n*sp*dt; if(vx) rb.face=Math.sign(vx); moved=true; }
 else if(G.target){ const dx=wrapDX(G.target.x-rb.x), dy=G.target.y-rb.y, d=Math.hypot(dx,dy); const stop=G.targetRelic?16:0;
  if(d<=stop+sp*dt){ if(!G.targetRelic){ rb.x=G.target.x; rb.y=G.target.y; } G.target=null; }
  else { rb.x+=dx/d*sp*dt; rb.y+=dy/d*sp*dt; if(Math.abs(dx)>1) rb.face=Math.sign(dx); moved=true; } }
 rb.x=modW(rb.x); rb.y=clamp(rb.y,14,H-14);
 if(moved){ const lt=rb.trail[rb.trail.length-1]; if(!lt||Math.hypot(wrapDX(rb.x-lt.x),rb.y-lt.y)>7){ rb.trail.push({x:rb.x,y:rb.y}); if(rb.trail.length>160) rb.trail.shift(); } }
 // proximity
 let best=null,bd=1e9; for(const r of relicsOf(G.planet)){ const p=ll2xy(r.lat,r.lon); const d=Math.hypot(wrapDX(p.x-rb.x),p.y-rb.y); if(d<bd){bd=d;best=r;} }
 G.near = bd<34? best:null;
 for(const a of ACTIVE.filter(a=>a.planet===G.planet)){ const p=ll2xy(a.lat,a.lon); const d=Math.hypot(wrapDX(p.x-rb.x),p.y-rb.y); if(d<40&&!G.activeShown[a.name]){ G.activeShown[a.name]=1; toast(L(a.note)); } if(d>120) G.activeShown[a.name]=0; }
 const now=performance.now();
 if(now-lastSave>2000){ lastSave=now; S.pos[G.planet]={x:rb.x,y:rb.y}; save(); }
 if(now-lastHud>120){ lastHud=now; updateHud(); }
}

function updateHud(){
 const rb=G.robot, ll=xy2ll(rb.x,rb.y), p=G.planet;
 $('#coord').textContent=fmtCoord(ll.lat,ll.lon,p);
 const todo=relicsOf(p).filter(r=>!isDone(r.id));
 $('#prog').textContent=t('progress',{n:doneCount(p),t:relicsOf(p).length});
 const arrow=$('#arrow');
 if(todo.length){ let best=null,bd=1e9; for(const r of todo){ const d=gcKm(ll.lat,ll.lon,r.lat,r.lon,PLANETS[p].R); if(d<bd){bd=d;best=r;} }
  $('#nearName').textContent=best.name; $('#nearDist').textContent= p==='deep'? bd.toFixed(1)+'°' : fmtNum(Math.round(bd))+' '+t('km'); $('#nearLabel').textContent=t('nearest');
  const q=ll2xy(best.lat,best.lon); const ang=Math.atan2(q.y-rb.y, wrapDX(q.x-rb.x)); arrow.style.transform=`rotate(${ang}rad)`; arrow.style.opacity=1;
 } else { $('#nearLabel').textContent=t('allLit'); $('#nearName').textContent=''; $('#nearDist').textContent=''; arrow.style.opacity=0; }
 const btn=$('#interact');
 if(G.near){ btn.hidden=false; btn.textContent=isDone(G.near.id)? t('viewFile',{name:G.near.name}) : t('scan',{name:G.near.name}); btn.classList.toggle('done',isDone(G.near.id)); }
 else btn.hidden=true;
}

// ===== RENDER MAP =====
function render(ts){
 const c=ctx, C=cam(), z=C.z, Tr=TERRAIN[G.planet]; c.setTransform(DPR,0,0,DPR,0,0);
 const sw=VW/z, sh=VH/z; const left=modW(C.x-sw/2), top=C.y-sh/2;
 const w1=Math.min(sw, W-left);
 c.imageSmoothingEnabled=true;
 c.drawImage(Tr.big,left,top,w1,sh,0,0,w1*z,VH);
 if(w1<sw) c.drawImage(Tr.big,0,top,sw-w1,sh,w1*z,0,(sw-w1)*z,VH);
 // grid
 c.lineWidth=1; c.strokeStyle='rgba(255,255,255,.07)'; c.fillStyle='rgba(255,255,255,.42)'; c.font='500 11px "Chakra Petch", sans-serif';
 for(let lon=-180;lon<180;lon+=15){ const s=toScreen(ll2xy(0,lon).x,0,C); if(s.x<-2||s.x>VW+2) continue; c.beginPath(); c.moveTo(s.x,0); c.lineTo(s.x,VH); c.stroke(); c.textAlign='left'; c.fillText(fmtLon(lon,G.planet,false).replace('.00',''),s.x+4,VH-10); }
 for(let lat=-75;lat<=75;lat+=15){ const s=toScreen(0,ll2xy(lat,0).y,C); if(s.y<0||s.y>VH) continue; c.beginPath(); c.moveTo(0,s.y); c.lineTo(VW,s.y); c.stroke(); c.textAlign='left'; c.fillText(G.planet==='deep'?(lat>0?'+':lat<0?'−':'')+Math.abs(lat)+'°':fmtLat(lat).replace('.00',''),6,s.y-4); }
 // labels
 c.textAlign='center'; c.font='500 13px "Chakra Petch", sans-serif';
 for(const [n,la,lo] of (G.planet==='moon'?MOON_LABELS:G.planet==='mars'?MARS_LABELS:DEEP_LABELS)){ const q=ll2xy(la,lo), s=toScreen(q.x,q.y,C); if(s.x<-120||s.x>VW+120||s.y<-20||s.y>VH+20) continue; c.fillStyle='rgba(0,0,0,.35)'; c.fillText(n,s.x+1,s.y+1); c.fillStyle='rgba(255,255,255,.62)'; c.fillText(n,s.x,s.y); }
 // trail
 const tr=G.robot.trail, dp=G.planet==='deep'; for(let i=0;i<tr.length;i++){ const s=toScreen(tr[i].x,tr[i].y,C); const k=i/tr.length; if(dp){ c.fillStyle=`rgba(95,208,230,${.05+.4*k})`; c.beginPath(); c.arc(s.x,s.y,1+1.5*k,0,TAU); c.fill(); } else { c.fillStyle=`rgba(20,16,12,${.06+.3*k})`; c.fillRect(s.x-4,s.y+5,3,2); c.fillRect(s.x+2,s.y+5,3,2); } }
 // target
 if(G.target){ const s=toScreen(G.target.x,G.target.y,C); c.strokeStyle='rgba(95,208,230,.8)'; c.lineWidth=1.5; c.beginPath(); c.arc(s.x,s.y,8+Math.sin(ts/150)*2,0,TAU); c.stroke(); }
 // active markers
 for(const a of ACTIVE.filter(a=>a.planet===G.planet)){ const q=ll2xy(a.lat,a.lon), s=toScreen(q.x,q.y,C); if(s.x<-40||s.x>VW+40) continue; const bl=(Math.sin(ts/300)+1)/2;
  c.fillStyle=`rgba(95,208,230,${.4+.6*bl})`; c.beginPath(); c.arc(s.x,s.y,4,0,TAU); c.fill(); c.strokeStyle='rgba(95,208,230,.5)'; c.beginPath(); c.arc(s.x,s.y,9,0,TAU); c.stroke();
  c.font='500 12px "Chakra Petch", sans-serif'; c.fillStyle='rgba(180,236,248,.9)'; c.fillText(a.name,s.x,s.y+22); }
 // relics
 for(const r of relicsOf(G.planet)){ const q=ll2xy(r.lat,r.lon), s=toScreen(q.x,q.y,C); if(s.x<-80||s.x>VW+80||s.y<-80||s.y>VH+80) continue; const done=isDone(r.id);
  if(done){ const pulse=1+.08*Math.sin(ts/500+q.x); c.save(); c.globalCompositeOperation='lighter';
   const g=c.createRadialGradient(s.x,s.y,0,s.x,s.y,62*pulse); g.addColorStop(0,'rgba(255,214,120,.75)'); g.addColorStop(.25,'rgba(244,182,63,.35)'); g.addColorStop(1,'rgba(244,140,40,0)'); c.fillStyle=g; c.beginPath(); c.arc(s.x,s.y,62*pulse,0,TAU); c.fill(); c.restore();
   drawIcon(c,r.kind,s.x,s.y,1,'#ffe3a1');
  } else { const ph=((ts/1600)+q.x*.001)%1; c.strokeStyle=`rgba(95,208,230,${.55*(1-ph)})`; c.lineWidth=1.5; c.beginPath(); c.arc(s.x,s.y,12+ph*22,0,TAU); c.stroke();
   drawIcon(c,r.kind,s.x,s.y,1,'rgba(206,210,222,.88)'); }
  const dRob=Math.hypot(wrapDX(q.x-G.robot.x),q.y-G.robot.y);
  if(done||dRob<260){ c.font='600 12px "Chakra Petch", sans-serif'; c.fillStyle='rgba(0,0,0,.45)'; c.fillText(r.name,s.x+1,s.y+27); c.fillStyle=done?'#ffd987':'#e9eef8'; c.fillText(r.name,s.x,s.y+26); }
 }
 // burst
 if(G.burst){ const b=G.burst, k=(ts-b.t0)/1400; if(k>1) G.burst=null; else { const q=ll2xy(b.r.lat,b.r.lon), s=toScreen(q.x,q.y,C); c.save(); c.globalCompositeOperation='lighter'; for(let i=0;i<3;i++){ const kk=clamp(k-i*.12,0,1); c.strokeStyle=`rgba(255,210,120,${(1-kk)*.8})`; c.lineWidth=3*(1-kk)+.5; c.beginPath(); c.arc(s.x,s.y,10+kk*140,0,TAU); c.stroke(); } c.restore(); } }
 // robot
 drawRobot(c, toScreen(G.robot.x,G.robot.y,C), ts);
}
function drawRobot(c,s,ts){
 const f=G.robot.face, bob=G.target||Object.values(G.keys).some(Boolean)?Math.sin(ts/70)*.8:0;
 c.save(); c.translate(s.x,s.y+bob); c.fillStyle='rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0,11,15,4,0,0,TAU); c.fill();
 c.scale(f,1);
 c.fillStyle='#2b3150'; c.beginPath(); c.roundRect(-13,4,26,7,3.5); c.fill(); c.fillStyle='#5a6386'; for(let i=-9;i<=9;i+=6){ c.beginPath(); c.arc(i,7.5,2,0,TAU); c.fill(); }
 c.fillStyle='#eef2fa'; c.beginPath(); c.roundRect(-11,-10,22,15,4); c.fill(); c.strokeStyle='#9aa4bf'; c.lineWidth=1; c.stroke();
 c.fillStyle='#14203d'; c.beginPath(); c.roundRect(-3,-7,12,7,3); c.fill(); c.fillStyle='#5fd0e6'; c.beginPath(); c.arc(4,-3.5,2.2,0,TAU); c.fill();
 c.strokeStyle='#cfd6e6'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-6,-10); c.lineTo(-8,-17); c.stroke();
 c.fillStyle=Math.sin(ts/250)>0?'#f4b63f':'#7a5a1e'; c.beginPath(); c.arc(-8,-18,2.2,0,TAU); c.fill();
 c.fillStyle='#f4b63f'; c.fillRect(-9,-4,6,2);
 c.restore();
}

// ===== STARFIELD (title/planet screens) =====
const bg=$('#stars');
function drawStars(){ const d=Math.min(2,devicePixelRatio||1); bg.width=bg.clientWidth*d; bg.height=bg.clientHeight*d; const c=bg.getContext('2d'); const R=mulberry32(4); c.clearRect(0,0,bg.width,bg.height);
 for(let i=0;i<(bg.width*bg.height)/2600;i++){ const a=R()*.8+.1; c.fillStyle=`rgba(${220+R()*35|0},${225+R()*30|0},255,${a})`; const s=R()<.06?2*d:1*d; c.fillRect(R()*bg.width,R()*bg.height,s,s); } }

// ===== GLOBE =====
function makeGlobe(canvas, pid, opts={}){
 const N=opts.res||300; canvas.width=N; canvas.height=N; const c=canvas.getContext('2d'); const img=c.createImageData(N,N), D=img.data;
 const tilt=(opts.tilt??12)*RAD, st=Math.sin(tilt), ct=Math.cos(tilt); const R=N/2-2, cx=N/2;
 const idx=[], lat=[], lonV=[], shade=[]; const Lx=-.55,Ly=.35,Lz=.76;
 for(let j=0;j<N;j++) for(let i=0;i<N;i++){ const x=(i+.5-cx)/R, y=(cx-j-.5)/R, rr=x*x+y*y; if(rr>1) continue; const z=Math.sqrt(1-rr);
  idx.push((j*N+i)*4); lat.push(Math.asin(clamp(z*st+y*ct,-1,1))); lonV.push(Math.atan2(x, z*ct-y*st));
  const l=Math.max(0,x*Lx+y*Ly+z*Lz); shade.push(opts.flat? (.75+.35*z) : clamp(.16+.95*l,0,1.1)*(.82+.18*z)); }
 const n=idx.length; const LA=new Float32Array(lat), LO=new Float32Array(lonV), SH=new Float32Array(shade), IX=new Int32Array(idx);
 const g={canvas,c,img,D,N,R,cx,st,ct,pid,rot:opts.rot??0,
  draw(ts){ const tex=TERRAIN[this.pid].tex, TD=tex.data, TW=tex.width, TH=tex.height; const rot=this.rot;
   for(let k=0;k<n;k++){ let lon=LO[k]+rot; let u=((lon/TAU+.5)%1+1)%1; const tx=(u*TW)|0, ty=clamp(((.5-LA[k]/Math.PI)*TH)|0,0,TH-1); const s=(ty*TW+tx)*4, o=IX[k], sh=SH[k];
    D[o]=TD[s]*sh; D[o+1]=TD[s+1]*sh; D[o+2]=TD[s+2]*sh; D[o+3]=255; }
   this.c.putImageData(this.img,0,0);
   // atmosphere rim
   const c=this.c; if(this.pid==='deep'){ c.save(); c.globalCompositeOperation='lighter'; const gr=c.createRadialGradient(cx,cx,R*.8,cx,cx,R); gr.addColorStop(0,'rgba(95,208,230,0)'); gr.addColorStop(1,'rgba(95,208,230,.28)'); c.fillStyle=gr; c.beginPath(); c.arc(cx,cx,R,0,TAU); c.fill(); c.restore(); } if(this.pid==='mars'){ c.save(); c.globalCompositeOperation='lighter'; const gr=c.createRadialGradient(cx,cx,R*.86,cx,cx,R*1.01); gr.addColorStop(0,'rgba(255,140,90,0)'); gr.addColorStop(1,'rgba(255,150,100,.22)'); c.fillStyle=gr; c.beginPath(); c.arc(cx,cx,R,0,TAU); c.fill(); c.restore(); }
   // beacons
   c.save(); c.globalCompositeOperation='lighter';
   for(const r of relicsOf(this.pid)){ const done=isDone(r.id); const la=r.lat*RAD, lo=r.lon*RAD-rot; const x=Math.cos(la)*Math.sin(lo), y=this.ct*Math.sin(la)-this.st*Math.cos(la)*Math.cos(lo), z=this.st*Math.sin(la)+this.ct*Math.cos(la)*Math.cos(lo);
    if(z<=0.02) continue; const px=cx+x*R, py=cx-y*R, a=Math.min(1,z*3);
    if(done){ const rr=R*.16*(1+.1*Math.sin(ts/400+r.lat)); const gr=c.createRadialGradient(px,py,0,px,py,rr); gr.addColorStop(0,`rgba(255,226,150,${a})`); gr.addColorStop(.3,`rgba(244,182,63,${.45*a})`); gr.addColorStop(1,'rgba(244,140,40,0)'); c.fillStyle=gr; c.beginPath(); c.arc(px,py,rr,0,TAU); c.fill(); }
    else { c.fillStyle=`rgba(160,220,235,${.35*a})`; c.beginPath(); c.arc(px,py,Math.max(1.2,R*.012),0,TAU); c.fill(); } }
   c.restore(); } };
 return g;
}

// ===== OVERLAYS / UI =====
function show(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id)); }
function openOverlay(id){ const o=$('#'+id); o.classList.add('open'); o.setAttribute('aria-hidden','false'); const f=o.querySelector('button,[tabindex]'); if(f) setTimeout(()=>f.focus({preventScroll:true}),30); }
function closeOverlay(id){ const o=$('#'+id); o.classList.remove('open'); o.setAttribute('aria-hidden','true'); if(id==='ovRelic'){ FLOW++; ACTIVE_MINI.stop&&ACTIVE_MINI.stop(); } }
document.addEventListener('click',e=>{ const b=e.target.closest('[data-close]'); if(b){ sfx.tap(); closeOverlay(b.dataset.close); } });
let toastTimer=0; function toast(msg,ms=4200){ const el=$('#toast'); el.textContent=msg; el.classList.add('on'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('on'),ms); }
function hideTut(){ if(!S.tut){ S.tut=true; save(); $('#toast').classList.remove('on'); } }

function applyLang(){
 document.documentElement.lang=S.lang;
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 document.querySelectorAll('[data-tt]').forEach(el=>{ el.title=t(el.dataset.tt); el.setAttribute('aria-label',t(el.dataset.tt)); });
 $('#btnStart').textContent = S.restored.length||S.planet ? t('cont') : t('start');
 $('#langBtn').textContent=S.lang==='vi'?'EN':'VI'; $('#langBtn2').textContent=S.lang==='vi'?'EN':'VI';
 if(G.planet) $('#planetChip').textContent=pName(G.planet);
 updatePlanetCards();
 if(G.mode==='map') updateHud();
}
function toggleLang(){ S.lang=S.lang==='vi'?'en':'vi'; save(); applyLang(); sfx.tap(); }
$('#langBtn').onclick=toggleLang; $('#langBtn2').onclick=toggleLang;
function syncSound(){ $('#soundBtn').classList.toggle('muted',!S.sound); $('#soundBtn').setAttribute('aria-pressed',S.sound); }
$('#soundBtn').onclick=()=>{ S.sound=!S.sound; save(); syncSound(); sfx.tap(); };

// title & planet screens
let globes=[];
$('#btnStart').onclick=()=>{ sfx.tap(); goPlanets(); };
function goPlanets(){ G.mode='planets'; show('scrPlanets'); updatePlanetCards(); }
function updatePlanetCards(){ for(const p of ['moon','mars','deep']){ const el=$('#pc-'+p); if(!el) continue; el.querySelector('.pc-prog').textContent=t('progress',{n:doneCount(p),t:relicsOf(p).length}); el.querySelector('.pc-go').textContent=t('landOn',{p:pName(p)}); el.querySelector('.pc-bar i').style.width=(doneCount(p)/relicsOf(p).length*100)+'%'; } }
document.querySelectorAll('.pc-go').forEach(b=>b.onclick=()=>{ sfx.tap(); enterMap(b.dataset.p); });
$('#btnBack').onclick=()=>{ sfx.tap(); G.mode='title'; show('scrTitle'); };
function enterMap(p){ setPlanet(p); G.mode='map'; show('scrMap'); resize(); updateHud(); if(!S.tut) toast(t('tut'),8000); else if(p==='deep') toast(t('skyHint'),6000); }
$('#planetChip').onclick=()=>{ sfx.tap(); S.pos[G.planet]={x:G.robot.x,y:G.robot.y}; save(); goPlanets(); };
$('#interact').onclick=()=>{ if(G.near){ sfx.tap(); openRelic(G.near); } };
$('#btnHeritage').onclick=()=>{ sfx.tap(); openHeritage({}); };
$('#btnLog').onclick=()=>{ sfx.tap(); openLog(); };
$('#btnSources').onclick=()=>{ sfx.tap(); openSources(); };
$('#btnSourcesTitle').onclick=()=>{ sfx.tap(); openSources(); };

// ===== TYPEWRITER =====
let skipType=false;
function typeLines(box, lines){ skipType=false; return lines.reduce((pr,ln)=>pr.then(()=>new Promise(res=>{
  const row=document.createElement('p'); row.className='ln '+ln.who; if(ln.tag){ const tg=document.createElement('b'); tg.textContent=ln.tag; row.appendChild(tg); }
  const sp=document.createElement('span'); row.appendChild(sp); box.appendChild(row); row.scrollIntoView({block:'nearest'});
  const txt=ln.text, speed=reduceMotion?0:(ln.slow?42:14); let i=0;
  if(!speed){ sp.textContent=txt; return setTimeout(res,80); }
  const step=()=>{ if(skipType){ sp.textContent=txt; return setTimeout(res,60); } i++; sp.textContent=txt.slice(0,i); if(i%3===0) sfx.type(); if(i<txt.length) setTimeout(step,speed); else setTimeout(res,ln.slow?600:260); };
  step(); })), Promise.resolve()); }
$('#relicBody').addEventListener('click',e=>{ if(e.target.closest('.log')) skipType=true; });

// ===== RELIC FLOW =====
let ACTIVE_MINI={}; let FLOW=0;
const body=()=>$('#relicBody');
function openRelic(r){ FLOW++; G.keys={}; G.target=null; openOverlay('ovRelic'); if(isDone(r.id)) showDossier(r,true); else stageScan(r); }
function dossierHTML(r){
 const done=isDone(r.id);
 return `<div class="dossier"><canvas class="art" width="260" height="190" aria-hidden="true"></canvas><div class="dmeta">
  <p class="tag ${done?'ok':''}">${t(done?'restoredTag':'waitingTag')}</p>
  <h2>${esc(r.name)}</h2><p class="mission">${esc(L(r.mission))}</p>
  <dl><dt>${t('site')}</dt><dd>${esc(L(r.site))}</dd><dt>${t('coords')}</dt><dd class="num">${fmtCoord(r.lat,r.lon,r.planet)}</dd>
  <dt>${t(r.dateKind==='impact'?'impact':r.dateKind==='launch'?'launched':'landed')}</dt><dd class="num">${fmtDate(r.date)}</dd>${r.au?`<dt>${t('distSun')}</dt><dd>${esc(L(r.au))}</dd>`:''}<dt>${t('status')}</dt><dd>${esc(L(r.ended))}</dd></dl></div></div>
  <h3>${t('science')}</h3><ul class="facts">${L(r.facts).map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`;
}
function paintArt(r,cnv,lit){ const c=cnv.getContext('2d'), w=cnv.width, h=cnv.height; const mars=r.planet==='mars';
 if(r.planet==='deep'){ c.fillStyle='#04060f'; c.fillRect(0,0,w,h); const R2=mulberry32(r.lat*100|0); for(let i=0;i<140;i++){ c.fillStyle=`rgba(255,255,255,${R2()*.8})`; c.fillRect(R2()*w,R2()*h,1,1); }
  const sg=c.createRadialGradient(w*.12,h*.85,0,w*.12,h*.85,30); sg.addColorStop(0,'rgba(255,240,200,.9)'); sg.addColorStop(1,'rgba(255,200,120,0)'); c.fillStyle=sg; c.beginPath(); c.arc(w*.12,h*.85,30,0,TAU); c.fill();
  if(lit){ c.save(); c.globalCompositeOperation='lighter'; const gr=c.createRadialGradient(w/2,h*.5,0,w/2,h*.5,110); gr.addColorStop(0,'rgba(255,214,120,.6)'); gr.addColorStop(1,'rgba(244,140,40,0)'); c.fillStyle=gr; c.fillRect(0,0,w,h); c.restore(); }
  drawIcon(c,r.kind,w/2,h*.52,4,lit?'#ffd987':'#c7cbd6',true); return; }
 const g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,mars?'#2a1a22':'#0b1024'); g.addColorStop(1,mars?'#5a2c1e':'#151b33'); c.fillStyle=g; c.fillRect(0,0,w,h);
 const R=mulberry32(r.lat*1000|0); for(let i=0;i<50;i++){ c.fillStyle=`rgba(255,255,255,${R()*.6})`; c.fillRect(R()*w,R()*h*.6,1,1); }
 if(!mars){ c.fillStyle='#3d7fd0'; c.beginPath(); c.arc(w*.82,h*.2,14,0,TAU); c.fill(); c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.arc(w*.82-4,h*.2-3,5,0,TAU); c.fill(); }
 c.fillStyle=mars?'#9a4a2a':'#6f6e6a'; c.beginPath(); c.ellipse(w/2,h*1.18,w*.9,h*.48,0,0,TAU); c.fill();
 if(lit){ c.save(); c.globalCompositeOperation='lighter'; const gr=c.createRadialGradient(w/2,h*.62,0,w/2,h*.62,110); gr.addColorStop(0,'rgba(255,214,120,.6)'); gr.addColorStop(1,'rgba(244,140,40,0)'); c.fillStyle=gr; c.fillRect(0,0,w,h); c.restore(); }
 drawIcon(c,r.kind,w/2,h*.62,4,lit?'#ffd987':'#c7cbd6',true); }
function showDossier(r,onlyView){ const b=body(); b.innerHTML=dossierHTML(r)+`<div class="actions"><button class="btn" data-close="ovRelic">${t('close')}</button></div>`; paintArt(r,b.querySelector('.art'),isDone(r.id)); b.scrollTop=0; }
async function stageScan(r){ const my=FLOW; const b=body(); b.innerHTML=`<div class="log" title="${t('tapSkip')}"></div><div class="reveal" hidden></div>`; b.scrollTop=0;
 await typeLines(b.querySelector('.log'),[{who:'sys',tag:t('sysLog'),text:t('detect',{c:fmtCoord(r.lat,r.lon,r.planet),site:L(r.site),name:r.name})},{who:'robot',tag:t('robot'),text:t('r_'+r.mini)}]);
 if(my!==FLOW) return;
 const rv=b.querySelector('.reveal'); if(!rv) return; rv.hidden=false; rv.innerHTML=dossierHTML(r)+`<div class="actions"><button class="btn ghost" data-close="ovRelic">${t('close')}</button><button class="btn primary" id="goMini">${t('begin')}</button></div>`;
 paintArt(r,rv.querySelector('.art'),false); $('#goMini').onclick=()=>{ sfx.tap(); stageMini(r); }; }
function stageMini(r){ FLOW++; const b=body(); b.scrollTop=0; const my=FLOW; const fn={dust:runDust,antenna:runAntenna,circuit:runCircuit}[r.mini]; fn(r,b,()=>{ if(my===FLOW) stageQuiz(r); }); }

async function stageQuiz(r){ FLOW++; const my=FLOW; const b=body(); b.innerHTML=`<div class="log"></div><div class="quiz" hidden></div>`; b.scrollTop=0;
 await typeLines(b.querySelector('.log'),[{who:'alert',tag:t('sysAlert'),text:t('a_'+r.mini)}]);
 if(my!==FLOW) return; const q=b.querySelector('.quiz'); if(!q) return; q.hidden=false; const opts=L(r.quiz.o).map((s,i)=>({s,ok:i===0})); const R=mulberry32(Date.now()&0xffff); for(let i=opts.length-1;i>0;i--){ const j=(R()*(i+1))|0; [opts[i],opts[j]]=[opts[j],opts[i]]; }
 q.innerHTML=`<h3>${t('quizT')}</h3><p class="hint">${t('quizI')}</p><p class="qq">${esc(L(r.quiz.q))}</p><div class="opts">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o.s)}</button>`).join('')}</div><p class="qmsg" role="status"></p><div class="qex" hidden></div>`;
 q.querySelectorAll('.opt').forEach(btn=>btn.onclick=()=>{ const o=opts[+btn.dataset.i]; if(o.ok){ sfx.ok(); btn.classList.add('right'); q.querySelectorAll('.opt').forEach(x=>x.disabled=true); q.querySelector('.qmsg').textContent=t('right');
   const ex=q.querySelector('.qex'); ex.hidden=false; ex.innerHTML=`<p>${esc(L(r.quiz.ex))}</p><div class="actions"><button class="btn primary" id="goDlg">${t('next')}</button></div>`; $('#goDlg').onclick=()=>{ sfx.tap(); stageDialogue(r); }; $('#goDlg').focus({preventScroll:true}); ex.scrollIntoView({block:'nearest',behavior:'smooth'}); }
  else { sfx.bad(); btn.classList.add('wrong'); btn.disabled=true; q.querySelector('.qmsg').textContent=t('wrong'); } }); }

async function stageDialogue(r){ FLOW++; const my=FLOW; const b=body(); b.innerHTML=`<div class="dlg-head"><canvas class="art sm" width="200" height="120" aria-hidden="true"></canvas></div><div class="log" title="${t('tapSkip')}"></div><div class="fin"></div>`; b.scrollTop=0;
 const art=b.querySelector('.art'); paintArt(r,art,false);
 const nm=r.id==='opportunity'?'Opportunity':r.name;
 const lines = r.id==='opportunity'
  ? [{who:'relic',tag:'OPPORTUNITY',text:L(r.voice),slow:true},{who:'note',text:t('oppyNote')},{who:'robot',tag:t('robot'),text:t('oppyGreet')}]
  : [{who:'relic',tag:r.name.toUpperCase(),text:L(r.voice),slow:true},{who:'robot',tag:t('robot'),text:t('greet',{name:r.name.split(' –')[0].split(' (')[0]})}];
 const lg=b.querySelector('.log');
 await typeLines(lg,lines); if(my!==FLOW) return;
 paintArt(r,art,true); sfx.ok();
 await typeLines(lg,[{who:'relic',tag:(r.id==='opportunity'?'OPPORTUNITY':r.name.toUpperCase()),text:t('thanks'),slow:true},{who:'ok',tag:t('sysOk'),text:t('confirm',{name:nm})}]);
 if(my!==FLOW) return;
 const fin=b.querySelector('.fin'); fin.innerHTML=`<div class="actions"><button class="btn primary glow" id="goLight">${t('lightUp')}</button></div>`; fin.scrollIntoView({block:'nearest'});
 $('#goLight').onclick=()=>{ if(!isDone(r.id)) S.restored.push(r.id); save(); closeOverlay('ovRelic'); sfx.glow(); G.burst={r,t0:performance.now()}; openHeritage({ignite:r}); }; }

// ===== MINI: DUST =====
function runDust(r,b,done){
 const kind=r.dust||'solar';
 b.innerHTML=`<h3>${t('m_dust')}</h3><p class="hint">${t('i_dust')}</p><div class="dustwrap"><canvas class="dbase"></canvas><canvas class="dlayer"></canvas><span class="dlabel">${t(kind)} – ${esc(r.name)}</span></div>
  <div class="meter"><span>${t('clean')}</span><div class="bar"><i></i></div><b class="num">0%</b></div>`;
 const wrap=b.querySelector('.dustwrap'), base=b.querySelector('.dbase'), dl=b.querySelector('.dlayer'); const w=wrap.clientWidth, h=Math.round(w*.56); wrap.style.height=h+'px';
 const d=Math.min(2,devicePixelRatio||1); for(const cnv of [base,dl]){ cnv.width=w*d; cnv.height=h*d; }
 const bc=base.getContext('2d'); bc.scale(d,d);
 if(kind==='solar'){ bc.fillStyle='#8b93a6'; bc.fillRect(0,0,w,h); const cols=10, rows=5, pad=8, cw=(w-pad*2)/cols, ch=(h-pad*2)/rows;
  for(let i=0;i<cols;i++) for(let j=0;j<rows;j++){ const x=pad+i*cw, y=pad+j*ch; const g=bc.createLinearGradient(x,y,x+cw,y+ch); g.addColorStop(0,'#1d3f8f'); g.addColorStop(.5,'#2f5fc4'); g.addColorStop(1,'#163170'); bc.fillStyle=g; bc.fillRect(x+1.5,y+1.5,cw-3,ch-3); bc.strokeStyle='rgba(200,220,255,.25)'; bc.lineWidth=.6; bc.beginPath(); bc.moveTo(x+cw/2,y+2); bc.lineTo(x+cw/2,y+ch-2); bc.stroke(); }
  const sh=bc.createLinearGradient(0,0,w,h); sh.addColorStop(0,'rgba(255,255,255,.18)'); sh.addColorStop(.4,'rgba(255,255,255,0)'); bc.fillStyle=sh; bc.fillRect(0,0,w,h); }
 else { const tiles=12; for(let i=0;i<tiles;i++){ const x=i*w/tiles; const g=bc.createLinearGradient(x,0,x+w/tiles,h); g.addColorStop(0,'#dfe6ef'); g.addColorStop(.5,'#a9b4c4'); g.addColorStop(1,'#eef3f9'); bc.fillStyle=g; bc.fillRect(x+1,4,w/tiles-2,h-8); } }
 const c=dl.getContext('2d'); c.scale(d,d); const dust=r.planet==='mars'?[178,104,62]:[138,134,126]; c.fillStyle=`rgb(${dust})`; c.fillRect(0,0,w,h);
 const R=mulberry32(77); for(let i=0;i<900;i++){ const a=R()*.25; c.fillStyle=R()<.5?`rgba(255,255,255,${a*.5})`:`rgba(0,0,0,${a})`; c.beginPath(); c.arc(R()*w,R()*h,R()*6+1,0,TAU); c.fill(); }
 c.globalCompositeOperation='destination-out'; c.lineCap='round'; c.lineJoin='round';
 const br=Math.max(20,w*.055); let last=null, finished=false;
 const pt=e=>{ const rc=dl.getBoundingClientRect(); return {x:e.clientX-rc.left,y:e.clientY-rc.top}; };
 const wipe=p=>{ c.lineWidth=br*2; c.beginPath(); c.moveTo((last||p).x,(last||p).y); c.lineTo(p.x+.01,p.y); c.stroke(); last=p; };
 dl.addEventListener('pointerdown',e=>{ dl.setPointerCapture(e.pointerId); last=null; wipe(pt(e)); });
 dl.addEventListener('pointermove',e=>{ if(e.buttons||e.pointerType==='touch'&&e.pressure>0) wipe(pt(e)); else last=null; });
 dl.addEventListener('pointerup',()=>last=null);
 const bar=b.querySelector('.bar i'), pc=b.querySelector('.meter b');
 const iv=setInterval(()=>{ const data=c.getImageData(0,0,dl.width,dl.height).data; let clear=0,tot=0; for(let i=3;i<data.length;i+=4*7){ tot++; if(data[i]<60) clear++; } const k=clear/tot; const v=Math.min(100,Math.round(k/.93*100)); bar.style.width=v+'%'; pc.textContent=v+'%';
  if(k>=.93&&!finished){ finished=true; clearInterval(iv); dl.style.transition='opacity .6s'; dl.style.opacity=0; bar.style.width='100%'; pc.textContent='100%'; sfx.ok(); setTimeout(done,900); } },140);
 ACTIVE_MINI.stop=()=>clearInterval(iv);
}

// ===== MINI: ANTENNA =====
function runAntenna(r,b,done){
 b.innerHTML=`<h3>${t('m_antenna')}</h3><p class="hint">${t('i_antenna')}</p><div class="antwrap"><canvas class="ant" tabindex="0" aria-label="${t('m_antenna')}"></canvas></div>
  <div class="antctl"><button class="btn round" id="aL" aria-label="◀">◀</button><div class="meter"><span>${t('signal')}</span><div class="bar"><i></i></div><b class="num">0%</b></div><button class="btn round" id="aR" aria-label="▶">▶</button></div><p class="amsg" role="status"></p>`;
 const cnv=b.querySelector('.ant'), wrap=b.querySelector('.antwrap'); const w=wrap.clientWidth, h=Math.round(w*.58); const d=Math.min(2,devicePixelRatio||1); cnv.width=w*d; cnv.height=h*d; cnv.style.height=h+'px'; const c=cnv.getContext('2d'); c.scale(d,d);
 const mars=r.planet==='mars', deep=r.planet==='deep'; const R=mulberry32(Date.now()&0xfff);
 const target=30+R()*120; let ang=target+(R()<.5?-1:1)*(55+R()*35); ang=clamp(ang,8,172); let hold=0, locked=false, alive=true, dragging=false, last=performance.now(), hb=0;
 const piv={x:w*.5,y:h*.8}; const stars=[...Array(70)].map(()=>({x:R()*w,y:R()*h*.75,a:R()}));
 const setFromPt=e=>{ const rc=cnv.getBoundingClientRect(); const x=e.clientX-rc.left, y=e.clientY-rc.top; ang=clamp(Math.atan2(piv.y-y,x-piv.x)/RAD,5,175); };
 cnv.addEventListener('pointerdown',e=>{ if(locked) return; dragging=true; cnv.setPointerCapture(e.pointerId); setFromPt(e); });
 cnv.addEventListener('pointermove',e=>{ if(dragging&&!locked) setFromPt(e); });
 cnv.addEventListener('pointerup',()=>dragging=false);
 let hold_dir=0; const press=dir=>{ hold_dir=dir; }; const rel=()=>{ hold_dir=0; };
 for(const [id,dir] of [['#aL',1],['#aR',-1]]){ const el=b.querySelector(id); el.addEventListener('pointerdown',()=>press(dir)); el.addEventListener('pointerup',rel); el.addEventListener('pointerleave',rel); el.addEventListener('click',()=>{ if(!locked) ang=clamp(ang+dir*1.5,5,175); }); }
 cnv.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){ ang=clamp(ang+2,5,175); e.preventDefault(); } if(e.key==='ArrowRight'){ ang=clamp(ang-2,5,175); e.preventDefault(); } });
 const bar=b.querySelector('.bar i'), pc=b.querySelector('.meter b'), msg=b.querySelector('.amsg');
 const loop=ts=>{ if(!alive) return; const dt=Math.min(.05,(ts-last)/1000); last=ts; if(hold_dir&&!locked) ang=clamp(ang+hold_dir*40*dt,5,175);
  const diff=Math.abs(ang-target); const str=locked?1:Math.exp(-((diff/16)**2));
  if(!locked){ if(diff<3.5){ hold+=dt; msg.textContent=t('locking'); if(ts-hb>250){ hb=ts; beep(700+hold*500,.06,'sine',.03); } } else { hold=Math.max(0,hold-dt*2); if(msg.textContent===t('locking')) msg.textContent=''; }
   if(hold>1.1){ locked=true; ang=target; msg.textContent=t('locked'); sfx.lock(); setTimeout(()=>{ alive=false; done(); },1300); } }
  bar.style.width=Math.round(str*100)+'%'; pc.textContent=Math.round(str*100)+'%';
  // draw
  const g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,mars?'#3a2228':'#070b1c'); g.addColorStop(1,mars?'#8a4a33':'#141a33'); c.fillStyle=g; c.fillRect(0,0,w,h);
  for(const s of stars){ c.fillStyle=`rgba(255,255,255,${.25+.5*s.a})`; c.fillRect(s.x,s.y,1.2,1.2); }
  const ex=piv.x+Math.cos(target*RAD)*w*.42, ey=piv.y-Math.sin(target*RAD)*h*.66;
  const vis=locked?1:clamp((str-.45)*2,0,.9); if(vis>0&&deep){ c.globalAlpha=vis; const sg=c.createRadialGradient(ex,ey,0,ex,ey,14); sg.addColorStop(0,'rgba(255,245,210,1)'); sg.addColorStop(1,'rgba(255,200,120,0)'); c.fillStyle=sg; c.beginPath(); c.arc(ex,ey,14,0,TAU); c.fill(); c.fillStyle='#6fa8ff'; c.beginPath(); c.arc(ex+7,ey-3,1.8,0,TAU); c.fill(); c.font='600 12px "Chakra Petch",sans-serif'; c.fillStyle='#cfe3ff'; c.textAlign='center'; c.fillText(t('earthSun'),ex,ey+26); c.globalAlpha=1; }
  else if(vis>0){ const er=mars?4:16; c.globalAlpha=vis; c.fillStyle='#4f8fe0'; c.beginPath(); c.arc(ex,ey,er,0,TAU); c.fill(); if(!mars){ c.fillStyle='rgba(255,255,255,.75)'; c.beginPath(); c.arc(ex-4,ey-4,5,0,TAU); c.fill(); } c.font='600 12px "Chakra Petch",sans-serif'; c.fillStyle='#cfe3ff'; c.textAlign='center'; c.fillText(t('earth'),ex,ey+er+14); c.globalAlpha=1; }
  // beam
  const bl=w*.8; c.save(); c.translate(piv.x,piv.y-34); c.rotate(-ang*RAD); const bg2=c.createLinearGradient(0,0,bl,0); bg2.addColorStop(0,`rgba(95,208,230,${.15+.45*str})`); bg2.addColorStop(1,'rgba(95,208,230,0)'); c.fillStyle=bg2; c.beginPath(); c.moveTo(0,0); c.lineTo(bl,-bl*.12); c.lineTo(bl,bl*.12); c.closePath(); c.fill(); c.restore();
  // ground
  if(!deep){ c.fillStyle=mars?'#9a4a2a':'#5d5c58'; c.beginPath(); c.ellipse(w/2,h*1.25,w*.95,h*.5,0,0,TAU); c.fill(); }
  drawIcon(c,r.kind==='heli'?'lander':r.kind,piv.x,piv.y-6,2.2,'#c7cbd6');
  // mast + dish
  c.strokeStyle='#dfe4ee'; c.lineWidth=3; c.beginPath(); c.moveTo(piv.x,piv.y-14); c.lineTo(piv.x,piv.y-34); c.stroke();
  c.save(); c.translate(piv.x,piv.y-34); c.rotate(-ang*RAD); c.fillStyle='#eef2fa'; c.beginPath(); c.ellipse(4,0,5,17,0,-Math.PI/2,Math.PI/2); c.fill(); c.strokeStyle='#9aa4bf'; c.lineWidth=1; c.stroke(); c.strokeStyle='#eef2fa'; c.lineWidth=1.5; c.beginPath(); c.moveTo(4,-15); c.lineTo(20,0); c.lineTo(4,15); c.stroke(); c.fillStyle=locked?'#f4b63f':'#5fd0e6'; c.beginPath(); c.arc(20,0,2.6,0,TAU); c.fill(); c.restore();
  // scope
  const sx=12, sy=12, sw=Math.min(180,w*.42), shh=40; c.fillStyle='rgba(0,0,0,.45)'; c.fillRect(sx,sy,sw,shh); c.strokeStyle='rgba(95,208,230,.9)'; c.lineWidth=1.4; c.beginPath();
  for(let i=0;i<=sw;i+=2){ const yy=sy+shh/2+Math.sin(i*.18+ts/90)*str*13+(Math.random()-.5)*(1-str)*30; i?c.lineTo(sx+i,yy):c.moveTo(sx+i,yy); } c.stroke();
  requestAnimationFrame(loop); };
 requestAnimationFrame(loop); ACTIVE_MINI.stop=()=>{ alive=false; };
}

// ===== MINI: CIRCUIT =====
function runCircuit(r,b,done){
 const ev=(g,a,c)=>g==='AND'?(a&c):g==='OR'?(a|c):(a^c);
 const R=mulberry32((Date.now()^r.lat*997)&0xffffff); let P;
 for(let tries=0;tries<200;tries++){ const gs=['AND','OR','XOR']; const g=[0,1,2].map(()=>gs[(R()*3)|0]); const nt=[0,1,2,3].map(()=>R()<.3);
  const f=s=>ev(g[2],ev(g[0],s[0]^nt[0],s[1]^nt[1]),ev(g[1],s[2]^nt[2],s[3]^nt[3]));
  let sols=0; for(let m=0;m<16;m++){ if(f([m&1,m>>1&1,m>>2&1,m>>3&1])) sols++; }
  if(sols<1||sols>5) continue; let init=null; for(let k=0;k<20;k++){ const m=(R()*16)|0; const s=[m&1,m>>1&1,m>>2&1,m>>3&1]; if(!f(s)){ init=s; break; } } if(!init) continue; P={g,nt,f,s:init}; break; }
 const used=new Set(P.g); if(P.nt.some(Boolean)) used.add('NOT');
 b.innerHTML=`<h3>${t('m_circuit')}</h3><p class="hint">${t('i_circuit')}</p><ul class="legend">${['AND','OR','XOR','NOT'].filter(x=>used.has(x)).map(x=>`<li>${t('g_'+x)}</li>`).join('')}</ul><div class="circ"></div><p class="cmsg" role="status"></p>`;
 const box=b.querySelector('.circ'); let solved=false;
 const draw=()=>{ const s=P.s, nt=P.nt; const v=s.map((x,i)=>x^nt[i]); const g1=ev(P.g[0],v[0],v[1]), g2=ev(P.g[1],v[2],v[3]), o=ev(P.g[2],g1,g2);
  const on='var(--wire-on)', off='var(--wire-off)'; const ys=[40,95,165,220], yin=[55,80,180,205];
  let svg=`<svg viewBox="0 0 430 260" role="group" aria-label="${t('m_circuit')}">`;
  for(let i=0;i<4;i++){ const y=ys[i]; if(nt[i]){ svg+=`<path d="M78 ${y} H116" class="w" stroke="${s[i]?on:off}"/><g class="not"><rect x="116" y="${y-11}" width="34" height="22" rx="4"/><text x="133" y="${y+4}">NOT</text></g><path d="M150 ${y} H162 L178 ${yin[i]} H196" class="w" stroke="${v[i]?on:off}"/>`; }
   else svg+=`<path d="M78 ${y} H162 L178 ${yin[i]} H196" class="w" stroke="${v[i]?on:off}"/>`;
   svg+=`<g class="sw ${s[i]?'on':''}" data-i="${i}" tabindex="0" role="switch" aria-checked="${!!s[i]}" aria-label="${'ABCD'[i]}"><rect x="14" y="${y-16}" width="64" height="32" rx="16"/><circle cx="${s[i]?62:30}" cy="${y}" r="11"/><text x="${s[i]?30:62}" y="${y+5}">${'ABCD'[i]}</text></g>`; }
  const gate=(x,y,name,val)=>`<g class="gate ${val?'on':''}"><rect x="${x}" y="${y}" width="66" height="54" rx="10"/><text x="${x+33}" y="${y+33}">${name}</text></g>`;
  svg+=gate(196,40,P.g[0],g1)+gate(196,165,P.g[1],g2);
  svg+=`<path d="M262 67 H282 L300 118 H318" class="w" stroke="${g1?on:off}"/><path d="M262 192 H282 L300 142 H318" class="w" stroke="${g2?on:off}"/>`;
  svg+=gate(318,103,P.g[2],o)+`<path d="M384 130 H398" class="w" stroke="${o?on:off}"/><circle class="lamp ${o?'on':''}" cx="412" cy="130" r="13"/><text class="olabel" x="412" y="160">${t('out')}</text></svg>`;
  box.innerHTML=svg;
  box.querySelectorAll('.sw').forEach(el=>{ const tog=()=>{ if(solved) return; const i=+el.dataset.i; P.s[i]^=1; sfx.tap(); draw(); }; el.addEventListener('click',tog); el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); tog(); const n=box.querySelector(`.sw[data-i="${el.dataset.i}"]`); n&&n.focus(); } }); });
  if(o&&!solved){ solved=true; sfx.ok(); setTimeout(done,1100); } };
 draw(); ACTIVE_MINI.stop=()=>{};
}

// ===== HERITAGE MAP =====
let HM={alive:false};
function openHeritage(opt){
 const ign=opt.ignite||null; let pid=ign?ign.planet:(opt.planet||G.planet||'moon'); if(!TERRAIN[pid]) genTerrain(pid);
 openOverlay('ovHeritage'); const box=$('#heritageBody');
 const draw=()=>{
  const done=doneCount(pid), tot=relicsOf(pid).length, all=RELICS.every(r=>isDone(r.id)); const nextP=['moon','mars','deep'].find(p=>p!==pid&&doneCount(p)<relicsOf(p).length);
  box.innerHTML=`<div class="tabs" role="tablist">${['moon','mars','deep'].map(p=>`<button role="tab" class="tab ${p===pid?'on':''}" aria-selected="${p===pid}" data-p="${p}">${pName(p)} <span class="num">${doneCount(p)}/${relicsOf(p).length}</span></button>`).join('')}</div>
   <div class="hmwrap"><canvas class="hm"></canvas></div><p class="hpill" role="status"></p>
   ${ign&&ign.planet===pid?`<p class="ign">${esc(t('ignited',{name:ign.name,p:pName(pid)}))}</p>`:''}
   <p class="meaning">${ign? t('meaning') : t('heritageHint')}</p>
   <div class="actions">${ign&&done===tot&&!all?`<p class="pdone">${t('planetDone',{p:pName(pid)})}</p>`:''}
    ${all&&ign?`<button class="btn primary glow" id="hFinal">${t('finish')}</button>`:''}
    ${ign&&done===tot&&!all&&nextP?`<button class="btn" id="hOther">${t('goTo',{p:pName(nextP)})}</button>`:''}
    <button class="btn ${all&&ign?'':'primary'}" data-close="ovHeritage">${t('explore')}</button></div>`;
  box.querySelectorAll('.tab').forEach(tb=>tb.onclick=()=>{ sfx.tap(); pid=tb.dataset.p; if(!TERRAIN[pid]) genTerrain(pid); draw(); });
  const f=$('#hFinal'); if(f) f.onclick=()=>{ closeOverlay('ovHeritage'); openFinal(); };
  const o=$('#hOther'); if(o) o.onclick=()=>{ closeOverlay('ovHeritage'); enterMap(nextP); };
  const cnv=box.querySelector('.hm'), wrap=box.querySelector('.hmwrap'); const w=wrap.clientWidth, h=w/2; const d=Math.min(2,devicePixelRatio||1); cnv.width=w*d; cnv.height=h*d; cnv.style.height=h+'px'; const c=cnv.getContext('2d');
  const t0=performance.now(); let sel=null;
  cnv.onclick=e=>{ const rc=cnv.getBoundingClientRect(); const x=e.clientX-rc.left, y=e.clientY-rc.top; let best=null,bd=22; for(const r of relicsOf(pid)){ const px=(r.lon+180)/360*w, py=(90-r.lat)/180*h; const dd=Math.hypot(px-x,py-y); if(dd<bd){bd=dd;best=r;} }
   sel=best; const pill=box.querySelector('.hpill'); if(best){ sfx.tap(); pill.innerHTML=`<b>${esc(best.name)}</b> <span>${esc(L(best.site))}</span> <em class="${isDone(best.id)?'ok':''}">${t(isDone(best.id)?'restoredTag':'waitingTag')}</em> <button class="btn sm" id="hGo">${t('goHere')}</button>`;
    $('#hGo').onclick=()=>{ closeOverlay('ovHeritage'); if(G.planet!==pid||G.mode!=='map') enterMap(pid); const q=ll2xy(best.lat,best.lon); G.target={x:q.x,y:q.y}; G.targetRelic=best; }; } else pill.textContent=''; };
  HM.alive=false; const me={alive:true}; HM=me;
  const loop=ts=>{ if(!me.alive||!$('#ovHeritage').classList.contains('open')) return; c.setTransform(d,0,0,d,0,0); c.drawImage(TERRAIN[pid].texCanvas,0,0,w,h); c.fillStyle='rgba(6,10,26,.45)'; c.fillRect(0,0,w,h);
   c.save(); c.globalCompositeOperation='lighter';
   for(const r of relicsOf(pid)){ const px=(r.lon+180)/360*w, py=(90-r.lat)/180*h; let k=1; const isIgn=ign&&ign.id===r.id;
    if(isIgn) k=clamp((ts-t0-300)/1600,0,1);
    if(isDone(r.id)){ const e=1-Math.pow(1-k,3); const rr=(w*.05)*(1+.12*Math.sin(ts/450+px))*e+.01; const g=c.createRadialGradient(px,py,0,px,py,rr); g.addColorStop(0,'rgba(255,232,170,1)'); g.addColorStop(.25,'rgba(244,182,63,.6)'); g.addColorStop(1,'rgba(244,140,40,0)'); c.fillStyle=g; c.beginPath(); c.arc(px,py,rr,0,TAU); c.fill();
     if(isIgn&&k<1){ for(let i=0;i<3;i++){ const kk=clamp(k*1.4-i*.2,0,1); c.strokeStyle=`rgba(255,215,130,${(1-kk)*.9})`; c.lineWidth=2; c.beginPath(); c.arc(px,py,kk*w*.18,0,TAU); c.stroke(); } }
    } else { c.fillStyle='rgba(150,215,232,.55)'; c.beginPath(); c.arc(px,py,2.5,0,TAU); c.fill(); }
    if(sel===r){ c.strokeStyle='rgba(95,208,230,.95)'; c.lineWidth=1.5; c.beginPath(); c.arc(px,py,9,0,TAU); c.stroke(); } }
   c.restore();
   c.font='600 11px "Chakra Petch",sans-serif'; c.textAlign='left';
   for(const r of relicsOf(pid)){ if(!isDone(r.id)) continue; if(ign&&ign.id===r.id&&ts-t0<900) continue; const px=(r.lon+180)/360*w, py=(90-r.lat)/180*h; if(w<520&&!(ign&&ign.id===r.id)&&sel!==r) continue; c.fillStyle='rgba(0,0,0,.5)'; c.fillText(r.name.split(' –')[0],px+9,py+4); c.fillStyle='#ffe2a0'; c.fillText(r.name.split(' –')[0],px+8,py+3); }
   requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
 };
 draw();
}

// ===== LOGBOOK =====
function openLog(){ const b=$('#logBody');
 b.innerHTML=['moon','mars','deep'].map(p=>`<h3>${pName(p)} <span class="num">${doneCount(p)}/${relicsOf(p).length}</span></h3><ul class="loglist">${relicsOf(p).map(r=>`<li><button class="logrow ${isDone(r.id)?'ok':''}" data-id="${r.id}"><i></i><span><b>${esc(r.name)}</b><small>${esc(L(r.site))} · ${fmtDate(r.date).slice(-4)}</small></span><em>${t(isDone(r.id)?'restoredTag':'waitingTag')}</em></button></li>`).join('')}</ul>`).join('')
 + `<div class="actions"><button class="btn ghost" id="resetBtn">${t('reset')}</button><button class="btn primary" data-close="ovLog">${t('close')}</button></div>`;
 b.querySelectorAll('.logrow').forEach(el=>el.onclick=()=>{ sfx.tap(); const r=RELICS.find(x=>x.id===el.dataset.id); closeOverlay('ovLog'); openOverlay('ovRelic'); showDossier(r,true); });
 $('#resetBtn').onclick=()=>{ if(confirm(t('resetQ'))){ S.restored=[]; S.pos={}; S.planet=null; S.tut=false; save(); location.hash=''; location.reload(); } };
 openOverlay('ovLog'); }
function openSources(){ $('#srcBody').innerHTML=`<p>${t('srcP')}</p><ul class="src">${SOURCES.map(s=>`<li><b>${esc(s[0])}</b><span class="num">${esc(s[1])}</span></li>`).join('')}</ul><p class="hint">${t('srcNote')}</p><div class="actions"><button class="btn primary" data-close="ovSources">${t('close')}</button></div>`; $('#srcTitle').textContent=t('srcT'); openOverlay('ovSources'); }
function openFinal(){ G.mode='final'; show('scrFinal'); $('#finalP').textContent=t('finalP',{n:RELICS.length}); }
$('#btnReplay').onclick=()=>{ S.restored=[]; S.pos={}; S.planet=null; save(); location.reload(); };
$('#btnFinalMap').onclick=()=>{ openHeritage({planet:'moon'}); };
$('#btnFinalBack').onclick=()=>{ goPlanets(); };

document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ const o=[...document.querySelectorAll('.overlay.open')].pop(); if(o) closeOverlay(o.id); } });

window.__back=()=>{ const o=[...document.querySelectorAll('.overlay.open')].pop(); if(o){ closeOverlay(o.id); return true; }
 if(G.mode==='map'){ S.pos[G.planet]={x:G.robot.x,y:G.robot.y}; save(); goPlanets(); return true; }
 if(G.mode==='planets'||G.mode==='final'){ G.mode='title'; show('scrTitle'); applyLang(); return true; } return false; };
// ===== MAIN LOOP =====
let lastT=performance.now();
function frame(ts){ const dt=Math.min(.05,(ts-lastT)/1000); lastT=ts; G.time=ts;
 if(G.mode==='map'){ if(!document.querySelector('.overlay.open')) update(dt); render(ts); }
 else if(G.mode==='title'){ const g=globes[0]; if(g){ g.rot=reduceMotion?.15:Math.sin(ts/9000)*.75; g.draw(ts); } }
 else if(G.mode==='planets'){ for(const g of globes.slice(1)){ if(TERRAIN[g.pid]){ g.rot+=reduceMotion?0:dt*.12; g.draw(ts); } } }
 requestAnimationFrame(frame); }

// ===== BOOT =====
function boot(){
 resize(); syncSound(); applyLang();
 setTimeout(()=>{ genTerrain('moon'); globes[0]=makeGlobe($('#globeTitle'),'moon',{res:340,tilt:6,rot:0});
  globes[1]=makeGlobe($('#globe-moon'),'moon',{res:220,tilt:8,rot:-.3});
  $('#loading').hidden=true; $('#btnStart').disabled=false;
  setTimeout(()=>{ genTerrain('mars'); globes[2]=makeGlobe($('#globe-mars'),'mars',{res:220,tilt:18,rot:1.2});
   setTimeout(()=>{ genTerrain('deep'); globes[3]=makeGlobe($('#globe-deep'),'deep',{res:220,tilt:20,rot:-1.4,flat:true}); },50); },50);
 },30);
 requestAnimationFrame(frame);
}
boot();
