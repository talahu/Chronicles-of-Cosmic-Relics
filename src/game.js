// ===== I18N =====
const T = {
 vi:{
  subtitle:'Biên Niên Ký Di Tích Vũ Trụ',
  story:'Bạn là Robot Cứu hộ Di sản đến từ tương lai. Trên Mặt Trăng, Sao Hỏa và ngoài không gian sâu, những cỗ máy con người gửi đi đã hoàn thành sứ mệnh và nằm lại trong im lặng. Hãy tìm chúng theo tọa độ thật, làm sạch, sửa chữa, kết nối lại với Trái Đất – và thắp sáng chúng trên Bản đồ Di sản.',
  start:'Bắt đầu nhiệm vụ', cont:'Tiếp tục nhiệm vụ', challenge:'NASA Space Apps Challenge – Abandoned but not Forgotten',
  choose:'Chọn nơi hạ cánh', back:'Quay lại',
  moon:'Mặt Trăng', mars:'Sao Hỏa', deep:'Không gian sâu',
  deepDesc:'Bầu trời sao: lần theo hướng bay thật của Pioneer và Voyager – những cỗ máy đang rời khỏi Hệ Mặt Trời.',
  distSun:'Cách Mặt Trời (ước tính 2026)', launched:'Phóng', earthSun:'Trái Đất & Mặt Trời', skyHint:'Bản đồ bầu trời: tọa độ là xích kinh (RA) và xích vĩ (Dec) – hướng bay thật của từng con tàu.',
  moonDesc:'Nơi có nhiều di tích nhất: tàu Ranger, chuỗi Surveyor, các điểm hạ cánh Apollo và hố va chạm LCROSS.',
  marsDesc:'Những tàu đổ bộ, xe tự hành và chiếc trực thăng đã ngừng hoạt động trên hành tinh đỏ.',
  landOn:'Hạ cánh xuống {p}', progress:'{n}/{t} di tích đã phục hồi',
  nearest:'Tín hiệu gần nhất', allLit:'Mọi di tích ở đây đã sáng', scan:'Quét {name}', viewFile:'Xem hồ sơ {name}',
  heritage:'Bản đồ Di sản', log:'Nhật ký', sources:'Nguồn dữ liệu', planetSwitch:'Đổi hành tinh', menu:'Menu',
  tut:'Chạm hoặc giữ trên bản đồ để lái robot. Đi theo mũi tên tín hiệu để tìm di tích.',
  sysLog:'SYSTEM LOG', robot:'RECOVERY ROBOT', sysAlert:'SYSTEM ALERT', sysOk:'SYSTEM CONFIRMATION',
  detect:'[Tọa độ thực tế: {c} – {site}]. Phát hiện tín hiệu mờ nhạt từ thực thể: {name}.',
  r_dust:'Phát hiện lớp bụi dày bao phủ bề mặt thiết bị. Bắt đầu giao thức làm sạch di sản.',
  r_antenna:'Thiết bị đã mất hướng về Trái Đất. Bắt đầu giao thức căn chỉnh ăng-ten.',
  r_circuit:'Mạch điều khiển bị đứt. Bắt đầu giao thức sửa mạch logic.',
  mission:'Sứ mệnh', site:'Vị trí', coords:'Tọa độ thật', landed:'Hạ cánh', impact:'Va chạm', status:'Trạng thái cuối', science:'Khám phá khoa học',
  begin:'Bắt đầu phục hồi', close:'Đóng', next:'Tiếp tục', restoredTag:'Đã phục hồi', waitingTag:'Đang chờ cứu hộ',
  m_dust:'Làm sạch bụi', i_dust:'Vuốt liên tục trên màn hình để lau sạch lớp bụi.', solar:'Tấm pin mặt trời', radiator:'Bộ tản nhiệt pin của xe', clean:'Độ sạch',
  m_antenna:'Căn hướng về Trái Đất', i_antenna:'Kéo trên khung hình (hoặc dùng nút mũi tên) để xoay ăng-ten. Khi tín hiệu mạnh nhất, giữ yên để khóa sóng.', signal:'Cường độ tín hiệu', locking:'Đang khóa sóng...', locked:'Đã khóa sóng Trái Đất', earth:'Trái Đất',
  m_circuit:'Sửa mạch logic', i_circuit:'Bật hoặc tắt các công tắc A–D để đèn đầu ra sáng lên. Mỗi cổng logic có luật riêng:',
  g_AND:'AND (VÀ): sáng khi cả hai đầu vào đều sáng', g_OR:'OR (HOẶC): sáng khi ít nhất một đầu vào sáng', g_XOR:'XOR (HOẶC LOẠI TRỪ): sáng khi đúng một đầu vào sáng', g_NOT:'NOT (ĐẢO): đảo ngược tín hiệu',
  out:'Đầu ra',
  a_dust:'Độ sạch tấm pin: 100%. Nguồn điện khôi phục: 15%. Khởi động lại phân vùng bộ nhớ trung tâm...',
  a_antenna:'Ăng-ten đã khóa hướng Trái Đất. Đường truyền ổn định. Khởi động lại phân vùng bộ nhớ trung tâm...',
  a_circuit:'Mạch logic đã thông. Nguồn điện khôi phục: 15%. Khởi động lại phân vùng bộ nhớ trung tâm...',
  quizT:'Khôi phục bộ nhớ trung tâm', quizI:'Chọn đáp án đúng để giải mã dữ liệu lịch sử.', wrong:'Dữ liệu chưa khớp. Thử đáp án khác.', right:'Dữ liệu đã khớp!',
  greet:'Chào {name}, chúng tôi đã nhận được tín hiệu của bạn. Dữ liệu của bạn đã được kết nối về Trái Đất.',
  oppyGreet:'Chào Oppy, chúng tôi nhận được tín hiệu của bạn. Trời sẽ không tối nữa đâu. Bạn đã an toàn, hệ thống dữ liệu của bạn đã được kết nối về Trái Đất.',
  thanks:'Tín hiệu Trái Đất đã được thiết lập lại... Cảm ơn bạn đã tìm thấy tôi. Tôi sẵn sàng ghi danh vào Bản đồ Di sản.',
  confirm:'Thực thể {name} đã được phục hồi thành công. Trạng thái: Không bao giờ bị lãng quên.',
  oppyNote:'Ghi chú khoa học: "Pin của tôi yếu... và trời đang tối dần..." Opportunity không thực sự nói câu này. Đây là cách một nhà báo diễn giải những dữ liệu cuối cùng nó gửi về: năng lượng rất thấp và bầu trời tối dần vì bão bụi.',
  lightUp:'Thắp sáng trên Bản đồ Di sản', tapSkip:'Chạm để hiện nhanh',
  ignited:'{name} đã sáng trên Bản đồ Di sản {p}.',
  meaning:'Mỗi đốm sáng là một cỗ máy đã hoàn thành sứ mệnh và để lại tri thức cho nhân loại. Chúng bị bỏ lại, nhưng không bao giờ bị lãng quên.',
  planetDone:'Mọi di tích trên {p} đã được thắp sáng!', goTo:'Đến {p}', explore:'Quay lại khám phá', finish:'Hoàn thành hành trình',
  goHere:'Đi tới đây', heritageHint:'Chạm vào một đốm sáng để xem tên thiết bị.',
  finalT:'Không bao giờ bị lãng quên',
  finalP:'Bạn đã phục hồi và thắp sáng toàn bộ {n} di tích trên Mặt Trăng, Sao Hỏa và ngoài không gian sâu. Những cỗ máy này đã đưa con người đi xa hơn bao giờ hết – và nhờ bạn, câu chuyện của chúng sẽ tiếp tục được kể.',
  replay:'Chơi lại từ đầu', reset:'Xóa tiến trình', resetQ:'Xóa toàn bộ tiến trình và bắt đầu lại?',
  sound:'Âm thanh', lang:'English',
  srcT:'Nguồn dữ liệu NASA',
  srcP:'Thông tin sứ mệnh, ngày tháng và tọa độ trong game được tổng hợp từ các nguồn dữ liệu mở của NASA:',
  srcNote:'Bản đồ trong game là bản vẽ đơn giản hóa theo phép chiếu kinh–vĩ độ. Vị trí các vùng biển, hố, núi lửa và di tích được đặt theo tọa độ thật; địa hình chi tiết là minh họa.',
  activeNear:'Tín hiệu mạnh: {name} đang hoạt động',
  km:'km', resumeHint:'Robot đã trở lại vị trí cũ.',
 },
 en:{
  subtitle:'A heritage rescue mission on the Moon, Mars and beyond',
  story:'You are a Heritage Recovery Robot from the future. On the Moon, on Mars and out in deep space, the machines humanity sent out have finished their missions and fallen silent. Find them at their real coordinates, clean them, repair them, reconnect them with Earth – and light them up on the Heritage Map.',
  start:'Start mission', cont:'Continue mission', challenge:'NASA Space Apps Challenge – Abandoned but not Forgotten',
  choose:'Choose a landing site', back:'Back',
  moon:'The Moon', mars:'Mars', deep:'Deep Space',
  deepDesc:'A star chart: follow the real headings of Pioneer and Voyager – machines leaving the Solar System.',
  distSun:'Distance from the Sun (2026 est.)', launched:'Launched', earthSun:'Earth & Sun', skyHint:'Sky chart: coordinates are right ascension (RA) and declination (Dec) – each craft’s real direction of travel.',
  moonDesc:'The richest site: the Ranger probe, the Surveyor series, Apollo landing sites and the LCROSS impact crater.',
  marsDesc:'Landers, rovers and a helicopter that have gone quiet on the red planet.',
  landOn:'Land on {p}', progress:'{n}/{t} relics restored',
  nearest:'Nearest signal', allLit:'Every relic here is lit', scan:'Scan {name}', viewFile:'Open {name}\u2019s file',
  heritage:'Heritage Map', log:'Logbook', sources:'Data sources', planetSwitch:'Change planet', menu:'Menu',
  tut:'Tap or hold on the map to drive the robot. Follow the signal arrow to find relics.',
  sysLog:'SYSTEM LOG', robot:'RECOVERY ROBOT', sysAlert:'SYSTEM ALERT', sysOk:'SYSTEM CONFIRMATION',
  detect:'[Real coordinates: {c} – {site}]. Faint signal detected from entity: {name}.',
  r_dust:'A thick dust layer covers the equipment. Starting heritage cleaning protocol.',
  r_antenna:'The equipment has lost its bearing to Earth. Starting antenna alignment protocol.',
  r_circuit:'The control circuit is broken. Starting logic repair protocol.',
  mission:'Mission', site:'Location', coords:'Real coordinates', landed:'Landed', impact:'Impact', status:'Final status', science:'Science highlights',
  begin:'Begin restoration', close:'Close', next:'Continue', restoredTag:'Restored', waitingTag:'Awaiting rescue',
  m_dust:'Clean off the dust', i_dust:'Keep swiping across the screen to wipe the dust away.', solar:'Solar panel', radiator:'Rover battery radiator', clean:'Cleanliness',
  m_antenna:'Point back to Earth', i_antenna:'Drag on the scene (or use the arrow buttons) to turn the antenna. Hold still at the strongest signal to lock on.', signal:'Signal strength', locking:'Locking on...', locked:'Earth signal locked', earth:'Earth',
  m_circuit:'Repair the logic circuit', i_circuit:'Switch A–D on or off until the output lamp lights. Each logic gate has its own rule:',
  g_AND:'AND: on when both inputs are on', g_OR:'OR: on when at least one input is on', g_XOR:'XOR: on when exactly one input is on', g_NOT:'NOT: flips the signal',
  out:'Output',
  a_dust:'Panel cleanliness: 100%. Power restored: 15%. Rebooting core memory partition...',
  a_antenna:'Antenna locked on Earth. Link stable. Rebooting core memory partition...',
  a_circuit:'Logic circuit closed. Power restored: 15%. Rebooting core memory partition...',
  quizT:'Restore the core memory', quizI:'Pick the right answer to decode the historical data.', wrong:'Data mismatch. Try another answer.', right:'Data matched!',
  greet:'Hello {name}, we received your signal. Your data is connected to Earth again.',
  oppyGreet:'Hi Oppy, we got your signal. It won\u2019t be dark anymore. You\u2019re safe – your data is connected to Earth again.',
  thanks:'Earth link re-established... Thank you for finding me. I am ready to join the Heritage Map.',
  confirm:'Entity {name} successfully restored. Status: Never forgotten.',
  oppyNote:'Science note: Opportunity never actually "said" this. A journalist poetically translated its final data – very low power and a sky darkening from the dust storm.',
  lightUp:'Light it up on the Heritage Map', tapSkip:'Tap to skip',
  ignited:'{name} now shines on the {p} Heritage Map.',
  meaning:'Each light is a machine that finished its mission and left knowledge for all of us. Abandoned, but never forgotten.',
  planetDone:'Every relic on {p} is now lit!', goTo:'Go to {p}', explore:'Back to exploring', finish:'Finish the journey',
  goHere:'Go here', heritageHint:'Tap a light to see which machine it is.',
  finalT:'Never forgotten',
  finalP:'You restored and lit all {n} relics on the Moon, on Mars and in deep space. These machines carried humanity farther than ever before – and thanks to you, their stories keep being told.',
  replay:'Play again from the start', reset:'Reset progress', resetQ:'Erase all progress and start over?',
  sound:'Sound', lang:'Tiếng Việt',
  srcT:'NASA data sources',
  srcP:'Mission facts, dates and coordinates in this game were compiled from NASA\u2019s open data:',
  srcNote:'The in-game maps are simplified drawings in a latitude–longitude projection. Seas, craters, volcanoes and relics sit at their real coordinates; fine terrain detail is illustrative.',
  activeNear:'Strong signal: {name} is still active',
  km:'km', resumeHint:'The robot is back where you left it.',
 }
};
const SOURCES = [
 ['NASA Space Science Data Coordinated Archive (NSSDCA)','nssdc.gsfc.nasa.gov'],
 ['NASA Science – Solar System Exploration, Missions','science.nasa.gov/solar-system'],
 ['NASA JPL – Mars Exploration Program','mars.nasa.gov / science.nasa.gov/mars'],
 ['Lunar Reconnaissance Orbiter Camera – Apollo & Surveyor sites','lroc.sese.asu.edu'],
 ['NASA History Office – Apollo Lunar Surface Journal','nasa.gov/history'],
 ['NASA 3D Resources','science.nasa.gov/3d-resources'],
];

// ===== STATE =====
const STORE='ccr-v1';
const S = {lang:'vi', sound:true, restored:[], pos:{}, planet:null, tut:false};
try{ const raw=localStorage.getItem(STORE); if(raw) Object.assign(S, JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(STORE, JSON.stringify(S)); }catch(e){} }
const t=(k,v)=>{ let s=(T[S.lang]&&T[S.lang][k])??T.vi[k]??k; if(v) for(const x in v) s=s.split('{'+x+'}').join(v[x]); return s; };
const L=o=>typeof o==='string'?o:(o[S.lang]??o.vi);
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDone=id=>S.restored.includes(id);
const relicsOf=p=>RELICS.filter(r=>r.planet===p);
const doneCount=p=>relicsOf(p).filter(r=>isDone(r.id)).length;
const pName=p=>t(p);

function fmtDate(iso){ const [y,m,d]=iso.split('-'); if(S.lang==='vi') return `${d}/${m}/${y}`;
 const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return `${M[+m-1]} ${+d}, ${y}`; }
function fmtLat(a,p){ if(p==='deep') return 'Dec '+(a>=0?'+':'−')+Math.abs(a).toFixed(1)+'°'; if(Math.abs(a)<0.005) return '0°'; return Math.abs(a).toFixed(2)+'°'+(a>=0?'N':'S'); }
function fmtRA(lon,full){ let ra=((180-lon)%360+360)%360/15; let h=Math.floor(ra), m=Math.round((ra-h)*60); if(m===60){h=(h+1)%24;m=0;} return full?`RA ${h}h${String(m).padStart(2,'0')}m`:`${h}h`; }
function fmtLon(lon,planet,full=true){ if(planet==='deep') return fmtRA(lon,full); if(planet==='mars'){ return (((lon%360)+360)%360).toFixed(2)+'°E'; } return Math.abs(lon).toFixed(2)+'°'+(lon>=0?'E':'W'); }
function fmtCoord(lat,lon,p){ return p==='deep'? fmtLon(lon,p)+', '+fmtLat(lat,p) : fmtLat(lat,p)+', '+fmtLon(lon,p); }
function fmtNum(n){ return S.lang==='vi'? n.toLocaleString('vi-VN') : n.toLocaleString('en-US'); }

// ===== SOUND =====
let AC=null;
function beep(f,d,type='sine',vol=.05,when=0){ if(!S.sound) return; try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); const tt=AC.currentTime+when; const o=AC.createOscillator(), g=AC.createGain(); o.type=type; o.frequency.setValueAtTime(f,tt); g.gain.setValueAtTime(vol,tt); g.gain.exponentialRampToValueAtTime(.0001,tt+d); o.connect(g); g.connect(AC.destination); o.start(tt); o.stop(tt+d+.03);}catch(e){} }
const sfx={ tap:()=>beep(660,.07,'triangle',.04), ok:()=>{beep(523,.14,'sine',.05);beep(784,.22,'sine',.05,.1);}, bad:()=>beep(170,.22,'square',.025),
 glow:()=>[523,659,784,1047,1319].forEach((f,i)=>beep(f,1.1,'sine',.035,i*.11)), type:()=>beep(1300+Math.random()*400,.018,'square',.006), lock:()=>{beep(880,.1,'sine',.05);beep(1320,.25,'sine',.05,.08);} };

// ===== MATH / WORLD =====
const W=2880, H=1440, RAD=Math.PI/180, TAU=Math.PI*2;
const PLANETS={
 moon:{R:1737.4, seed:11, start:[3.5,19.5]},
 mars:{R:3389.5, seed:29, start:[2.5,-9.5]},
 deep:{R:57.29578, seed:41, start:[0,-60]},
};
const ll2xy=(lat,lon)=>({x:((lon+180)/360)*W, y:((90-lat)/180)*H});
const xy2ll=(x,y)=>({lat:90-y/H*180, lon:(((x/W)*360)%360+360)%360-180});
const wrapDX=dx=>{ dx=((dx%W)+W)%W; return dx>W/2?dx-W:dx; };
const modW=x=>((x%W)+W)%W;
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
function gcKm(a1,o1,a2,o2,R){ const p1=a1*RAD,p2=a2*RAD,dp=(a2-a1)*RAD,dl=(o2-o1)*RAD; const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2; return 2*R*Math.asin(Math.min(1,Math.sqrt(h))); }
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function makeFbm(seed,bx,by,oct){ const rnd=mulberry32(seed), layers=[];
 for(let o=0;o<oct;o++){ const gx=bx<<o, gy=by<<o, g=new Float32Array(gx*(gy+1)); for(let i=0;i<g.length;i++) g[i]=rnd(); layers.push({gx,gy,g}); }
 return (u,v)=>{ let s=0,a=1,n=0; for(const Lr of layers){ const x=u*Lr.gx, y=v*Lr.gy; const x0=Math.floor(x); const y0=Math.min(Math.floor(y),Lr.gy-1); const fx=x-x0, fy=y-y0; const xa=((x0%Lr.gx)+Lr.gx)%Lr.gx, xb=(xa+1)%Lr.gx, g=Lr.g, gx=Lr.gx;
  const A=g[y0*gx+xa],B=g[y0*gx+xb],C=g[(y0+1)*gx+xa],D=g[(y0+1)*gx+xb]; const sx=fx*fx*(3-2*fx), sy=fy*fy*(3-2*fy);
  s+=a*((A+(B-A)*sx)*(1-sy)+(C+(D-C)*sx)*sy); n+=a; a*=.5; } return s/n; };
}
const smooth=(e0,e1,x)=>{ const k=clamp((x-e0)/(e1-e0),0,1); return k*k*(3-2*k); };

// ===== TERRAIN =====
const TERRAIN={};
function genTerrain(pid){
 const LW=720, LH=360, P=PLANETS[pid];
 const small=document.createElement('canvas'); small.width=LW; small.height=LH;
 const sctx=small.getContext('2d'); const img=sctx.createImageData(LW,LH), D=img.data;
 const n1=makeFbm(P.seed,8,4,6), n2=makeFbm(P.seed+7,16,8,4);
 const prep=a=>a.map(f=>({lat:f[1],lon:f[2],r:f[3],sl:Math.sin(f[1]*RAD),cl:Math.cos(f[1]*RAD),lo:f[2]*RAD}));
 const feats = pid==='moon'? prep(MOON_FEATURES) : pid==='mars'? prep(MARS_DARK) : [];
 const gp={sl:Math.sin(27.13*RAD),cl:Math.cos(27.13*RAD),lo:(180-192.86)*RAD}, gc={sl:Math.sin(-28.94*RAD),cl:Math.cos(-28.94*RAD),lo:(180-266.4)*RAD};
 const bright = pid==='mars'? prep(MARS_BRIGHT) : [];
 const spa = {lat:-53,lon:-169,r:38,sl:Math.sin(-53*RAD),cl:Math.cos(-53*RAD),lo:-169*RAD};
 const featW=(f,sl,cl,lon,m2)=>{ const c=sl*f.sl+cl*f.cl*Math.cos(lon-f.lo); const d=Math.acos(clamp(c,-1,1))/RAD; const e=f.r*(1+(m2-.5)*1.25); return 1-smooth(e*.75,e*1.12,d); };
 for(let j=0;j<LH;j++){ const latd=90-(j+.5)/LH*180, lat=latd*RAD, sl=Math.sin(lat), cl=Math.cos(lat);
  for(let i=0;i<LW;i++){ const lon=((i+.5)/LW*360-180)*RAD, u=i/LW, v=j/LH; const n=n1(u,v), m2=n2(u,v);
   let r,g,b;
   if(pid==='deep'){
    const sb=sl*gp.sl+cl*gp.cl*Math.cos(lon-gp.lo); const bdeg=Math.asin(clamp(sb,-1,1))/RAD;
    const dgc=Math.acos(clamp(sl*gc.sl+cl*gc.cl*Math.cos(lon-gc.lo),-1,1))/RAD;
    let mw=Math.exp(-((bdeg/(9+6*m2))**2))*(.45+.9*n) + Math.exp(-((dgc/20)**2))*.7*n; const rift=Math.exp(-(((bdeg-1.5)/2.2)**2))*clamp((dgc<70?1:0)*(m2-.35)*2,0,1); mw*=1-rift*.75;
    const neb=Math.pow(n,4)*.6;
    r=6+mw*78+neb*30; g=9+mw*80+neb*14; b=24+mw*98+neb*46;
   } else if(pid==='moon'){
    r=g=b=128+78*(n-.5)*2.2+ (m2-.5)*30; r+=4; g+=3;
    let w=0; for(const f of feats){ const x=featW(f,sl,cl,lon,m2); if(x>w) w=x; }
    const ws=featW(spa,sl,cl,lon,m2)*.22;
    const mr=74+40*(n-.5)*2, mg=74+38*(n-.5)*2, mb=80+36*(n-.5)*2;
    r=r*(1-w)+mr*w; g=g*(1-w)+mg*w; b=b*(1-w)+mb*w; r*=1-ws; g*=1-ws; b*=1-ws;
   } else {
    r=176+60*(n-.5)*2; g=94+34*(n-.5)*2; b=56+20*(n-.5)*2;
    let w=0; for(const f of feats){ const x=featW(f,sl,cl,lon,m2); if(x>w) w=x; }
    w*=.78; const dr=96+20*(n-.5), dg=58+12*(n-.5), db=44+10*(n-.5);
    r=r*(1-w)+dr*w; g=g*(1-w)+dg*w; b=b*(1-w)+db*w;
    let br=0; for(const f of bright){ const x=featW(f,sl,cl,lon,m2); if(x>br) br=x; } br*=.45;
    r=r*(1-br)+222*br; g=g*(1-br)+164*br; b=b*(1-br)+112*br;
    const cap = latd>0 ? smooth(77,83,latd+(m2-.5)*8) : smooth(80,86,-latd+(m2-.5)*8);
    r=r*(1-cap)+236*cap; g=g*(1-cap)+232*cap; b=b*(1-cap)+226*cap;
   }
   const k=(j*LW+i)*4; D[k]=r; D[k+1]=g; D[k+2]=b; D[k+3]=255;
  }}
 sctx.putImageData(img,0,0);
 const big=document.createElement('canvas'); big.width=W; big.height=H; const c=big.getContext('2d');
 c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(small,0,0,W,H);
 // grain
 const tile=document.createElement('canvas'); tile.width=tile.height=256; const tc=tile.getContext('2d'); const rnd=mulberry32(P.seed+3);
 for(let i=0;i<9000;i++){ const a=rnd()*.22; tc.fillStyle=rnd()<.5?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a})`; tc.fillRect(rnd()*256|0,rnd()*256|0,1+(rnd()<.2),1); }
 c.fillStyle=c.createPattern(tile,'repeat'); c.fillRect(0,0,W,H);
 const R=mulberry32(P.seed+5);
 const pxd=W/360;
 const crater=(lat,lon,rdeg,s)=>{ const p=ll2xy(lat,lon); const r=Math.max(1.4,rdeg*pxd); const sx=1/Math.max(.22,Math.cos(lat*RAD));
  for(const off of [0,-W,W]){ const x=p.x+off; if(x+r*sx*1.4<0||x-r*sx*1.4>W) continue;
   c.save(); c.translate(x,p.y); c.scale(sx,1);
   c.beginPath(); c.arc(0,0,r,0,TAU); c.fillStyle=`rgba(0,0,0,${.2*s})`; c.fill();
   c.beginPath(); c.arc(r*.2,r*.2,r*.78,0,TAU); c.fillStyle=`rgba(255,255,255,${.08*s})`; c.fill();
   c.lineWidth=Math.max(.8,r*.17);
   c.beginPath(); c.arc(0,0,r,Math.PI*.75,Math.PI*1.75); c.strokeStyle=`rgba(255,255,255,${.24*s})`; c.stroke();
   c.beginPath(); c.arc(0,0,r,Math.PI*1.75,Math.PI*2.75); c.strokeStyle=`rgba(0,0,0,${.22*s})`; c.stroke();
   c.restore(); } };
 const rays=(lat,lon,len,n,a)=>{ const p=ll2xy(lat,lon); c.save(); c.globalCompositeOperation='screen'; for(let i=0;i<n;i++){ const an=R()*TAU, l=(len*.4+R()*len)*pxd; for(const off of [0,-W,W]){ const g=c.createLinearGradient(p.x+off,p.y,p.x+off+Math.cos(an)*l,p.y+Math.sin(an)*l); g.addColorStop(0,`rgba(255,255,255,${a})`); g.addColorStop(1,'rgba(255,255,255,0)'); c.strokeStyle=g; c.lineWidth=1+R()*2.5; c.beginPath(); c.moveTo(p.x+off,p.y); c.lineTo(p.x+off+Math.cos(an)*l/Math.max(.3,Math.cos(lat*RAD)),p.y+Math.sin(an)*l); c.stroke(); } } c.restore(); };
 const sphereLat=()=>Math.asin(2*R()-1)/RAD;
 if(pid==='deep'){
  c.fillStyle='rgba(0,0,0,0)';
  for(let i=0;i<14000;i++){ const la=sphereLat(), lo=R()*360-180, p=ll2xy(la,lo); const a=.15+Math.pow(R(),3)*.85; c.fillStyle=`rgba(${215+R()*40|0},${220+R()*35|0},255,${a})`; const s=R()<.04?2:1; c.fillRect(p.x,p.y,s,s); }
  const SP={}; STARS.forEach(s=>{ SP[s[0]]=ll2xy(s[3],raLon(s[1],s[2])); });
  c.strokeStyle='rgba(140,175,230,.28)'; c.lineWidth=1.2; for(const [a,b2] of STAR_LINES){ const p=SP[a], q=SP[b2]; c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(q.x,q.y); c.stroke(); }
  c.setLineDash([6,8]); c.strokeStyle='rgba(244,182,63,.32)'; c.beginPath(); for(let L2=0;L2<=360;L2+=2){ const lam=L2*RAD, eps=23.44*RAD; const ra=(Math.atan2(Math.sin(lam)*Math.cos(eps),Math.cos(lam))/RAD+360)%360; const de=Math.asin(Math.sin(eps)*Math.sin(lam))/RAD; const p=ll2xy(de,180-ra); if(L2===0) c.moveTo(p.x,p.y); else { const prev=c._px; if(prev!==undefined&&Math.abs(p.x-prev)>W/2) c.moveTo(p.x,p.y); else c.lineTo(p.x,p.y);} c._px=p.x; } c.stroke(); c.setLineDash([]);
  for(const s of STARS){ const p=SP[s[0]]; const r=Math.max(1.6,4.2-s[4]*1.1); const gr=c.createRadialGradient(p.x,p.y,0,p.x,p.y,r*4); gr.addColorStop(0,'rgba(255,255,255,.95)'); gr.addColorStop(.25,'rgba(210,225,255,.35)'); gr.addColorStop(1,'rgba(200,220,255,0)'); c.fillStyle=gr; c.beginPath(); c.arc(p.x,p.y,r*4,0,TAU); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.arc(p.x,p.y,r*.7,0,TAU); c.fill(); }
 } else if(pid==='moon'){
  for(let i=0;i<2600;i++) crater(sphereLat(),R()*360-180,.2+R()*.55,.9);
  for(let i=0;i<300;i++) crater(sphereLat(),R()*360-180,.7+R()*1.4,1);
  for(let i=0;i<18;i++) crater(sphereLat(),R()*360-180,2+R()*3,.75);
  rays(-43.31,-11.36,38,60,.16); rays(9.62,-20.08,14,40,.14); rays(23.7,-47.4,8,24,.12);
  [[-43.31,-11.36,1.45],[9.62,-20.08,1.55],[8.1,-38,.55],[23.7,-47.4,.7],[51.6,-9.4,1.7],[-58.4,-14.4,3.7],[-84.9,-35.5,1.6]].forEach(a=>crater(a[0],a[1],a[2],1.4));
  const pl=ll2xy(51.6,-9.4); c.fillStyle='rgba(40,40,46,.55)'; c.beginPath(); c.ellipse(pl.x,pl.y,1.5*pxd/Math.cos(51.6*RAD),1.5*pxd,0,0,TAU); c.fill();
 } else {
  for(let i=0;i<1100;i++) crater(sphereLat(),R()*360-180,.15+R()*.5,.55);
  for(let i=0;i<150;i++) crater(sphereLat(),R()*360-180,.6+R()*1.5,.6);
  for(let i=0;i<14;i++) crater(sphereLat(),R()*360-180,2+R()*3,.55);
  [[-5.37,137.81,1.3],[18.38,77.58,.45],[-14.5,175.4,1.4],[-2.28,-5.23,.35]].forEach(a=>crater(a[0],a[1],a[2],1.2));
  // Valles Marineris
  const vm=[[-6.5,-96],[-7.5,-88],[-9.5,-80],[-12,-71],[-13.5,-62],[-14,-54],[-12,-46],[-8,-40]].map(a=>ll2xy(a[0],a[1]));
  const stroke=(w,col)=>{ c.strokeStyle=col; c.lineWidth=w; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); vm.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y)); c.stroke(); };
  stroke(20,'rgba(90,40,25,.35)'); stroke(10,'rgba(60,26,18,.55)'); stroke(3,'rgba(30,12,8,.5)');
  const volcano=(lat,lon,rdeg)=>{ const p=ll2xy(lat,lon); const r=rdeg*pxd; const g=c.createRadialGradient(p.x-r*.25,p.y-r*.25,r*.1,p.x,p.y,r);
   g.addColorStop(0,'rgba(240,190,140,.55)'); g.addColorStop(.7,'rgba(200,130,80,.25)'); g.addColorStop(1,'rgba(80,35,20,0)'); c.fillStyle=g; c.beginPath(); c.arc(p.x,p.y,r,0,TAU); c.fill();
   c.strokeStyle='rgba(70,30,18,.45)'; c.lineWidth=2; c.beginPath(); c.arc(p.x,p.y,r*.92,0,TAU); c.stroke();
   c.fillStyle='rgba(60,25,15,.55)'; c.beginPath(); c.arc(p.x,p.y,r*.18,0,TAU); c.fill(); };
  volcano(18.65,-133.8,5.2); volcano(-8.26,-120.09,3); volcano(1.48,-112.96,2.6); volcano(11.92,-104.08,2.6); volcano(24.8,146.9,2.4);
 }
 const tex=document.createElement('canvas'); tex.width=LW; tex.height=LH; const tx=tex.getContext('2d'); tx.drawImage(big,0,0,LW,LH);
 TERRAIN[pid]={big, tex:tx.getImageData(0,0,LW,LH), texCanvas:tex};
}

// ===== RELIC ICONS =====
function drawIcon(c,kind,x,y,s,col,detail){
 c.save(); c.translate(x,y); c.scale(s,s); c.lineCap='round'; c.lineJoin='round'; c.strokeStyle=col; c.fillStyle=col; c.lineWidth=1.6;
 const leg=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke(); c.beginPath(); c.ellipse(x2,y2+.5,2.2,1,0,0,TAU); c.fill();};
 if(kind==='lm'){
  c.beginPath(); c.moveTo(-8,-6); c.lineTo(8,-6); c.lineTo(10,0); c.lineTo(8,5); c.lineTo(-8,5); c.lineTo(-10,0); c.closePath(); c.globalAlpha=.85; c.fill(); c.globalAlpha=1;
  leg(-8,3,-14,10); leg(8,3,14,10); leg(-3,5,-5,11); leg(3,5,5,11);
  if(detail){ c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=.8; c.beginPath(); c.moveTo(-8,-1); c.lineTo(8,-1); c.stroke(); }
 } else if(kind==='lander'){
  c.beginPath(); c.moveTo(-7,2); c.lineTo(7,2); c.lineTo(0,-4); c.closePath(); c.fill();
  leg(-5,2,-12,9); leg(5,2,12,9); leg(0,2,0,10);
  c.beginPath(); c.moveTo(0,-4); c.lineTo(0,-13); c.stroke();
  c.beginPath(); c.ellipse(-4,-14,5,2.4,-.5,0,TAU); c.globalAlpha=.85; c.fill(); c.globalAlpha=1;
  c.fillRect(1,-12,8,5);
 } else if(kind==='rover'){
  c.fillRect(-10,-4,20,6);
  for(const wx of [-8,0,8]){ c.beginPath(); c.arc(wx,5,3.2,0,TAU); c.fill(); }
  c.beginPath(); c.moveTo(6,-4); c.lineTo(6,-12); c.stroke(); c.fillRect(3,-15,7,3.5);
  c.globalAlpha=.7; c.fillRect(-11,-7,15,2); c.globalAlpha=1;
 } else if(kind==='heli'){
  c.beginPath(); c.ellipse(0,0,5,4,0,0,TAU); c.fill();
  c.beginPath(); c.moveTo(0,-4); c.lineTo(0,-11); c.stroke();
  c.lineWidth=1.8; c.beginPath(); c.moveTo(-13,-9); c.lineTo(13,-9); c.moveTo(-11,-12); c.lineTo(11,-12); c.stroke();
  c.lineWidth=1.4; leg(-3,3,-8,10); leg(3,3,8,10);
 } else if(kind==='probe'){
  c.beginPath(); c.ellipse(-1,-5,11,4.2,-.15,0,TAU); c.globalAlpha=.9; c.fill(); c.globalAlpha=1;
  c.beginPath(); c.moveTo(-1,-9); c.lineTo(-1,-14); c.stroke();
  c.fillRect(-4,-1,8,6);
  c.beginPath(); c.moveTo(4,3); c.lineTo(14,9); c.stroke(); c.beginPath(); c.arc(14.5,9.5,2.2,0,TAU); c.fill();
  c.lineWidth=1; c.beginPath(); c.moveTo(-4,2); c.lineTo(-17,5); c.stroke();
 } else { // impact
  c.globalAlpha=.9; c.lineWidth=2; c.beginPath(); c.ellipse(0,2,11,6,0,0,TAU); c.stroke();
  c.globalAlpha=.5; c.beginPath(); c.ellipse(0,2,6,3,0,0,TAU); c.fill(); c.globalAlpha=1;
  for(const [a,d] of [[-2.4,14],[-1.9,16],[-.9,15],[-.5,13],[-2.9,13]]){ c.beginPath(); c.arc(Math.cos(a)*d,2+Math.sin(a)*d*.7,1.3,0,TAU); c.fill(); }
 }
 c.restore();
}
