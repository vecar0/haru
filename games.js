// 하루 — 놀이(게임 모음). index.html의 전역(S, $, el, save, say, setMood, mascot, mPlace, pub, opening, pick, sleep, R, A)을 쓴다.
(()=>{
const GAMES=[
 {id:'chess',name:'체스',sub:'왕을 잡으면 승리',duo:true,icon:'<path d="M9 20h6M8.5 17h7l-1-4.5 1.5-2-2-4-3-.5-2.5 2.5 1.5 1.5-1 1-1.5-.5z"/>'},
 {id:'omok',name:'오목',sub:'다섯 줄을 먼저',duo:true,icon:'<circle cx="8.5" cy="12" r="4.5"/><circle cx="15.5" cy="12" r="4.5"/>'},
 {id:'reversi',name:'리버시',sub:'더 많이 뒤집기',duo:true,icon:'<circle cx="12" cy="12" r="7"/><path d="M12 5a7 7 0 0 0 0 14z" fill="url(#pg)"/>'},
 {id:'four',name:'사목',sub:'네 줄을 먼저',duo:true,icon:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><circle cx="15" cy="10" r="1.6"/><circle cx="9" cy="15" r="1.6"/><circle cx="15" cy="15" r="1.6"/>'},
 {id:'rps',name:'가위바위보',sub:'세 판 먼저 이기기',trio:true,icon:'<path d="M7 13V7.5a1.5 1.5 0 0 1 3 0V12M10 11V6a1.5 1.5 0 0 1 3 0v5M13 11V7a1.5 1.5 0 0 1 3 0v6c0 3.5-2 6-5 6s-4.5-1.5-5-4l-1-3a1.4 1.4 0 0 1 2.4-1.3L7 13"/>'},
 {id:'updown',name:'업다운',sub:'1~100 숫자 맞히기',trio:true,icon:'<path d="M8 10l4-4 4 4M8 14l4 4 4-4"/>'},
 {id:'dice',name:'주사위',sub:'큰 수가 이겨요',trio:true,icon:'<rect x="5" y="5" width="14" height="14" rx="3"/><circle cx="9" cy="9" r="1.1"/><circle cx="15" cy="15" r="1.1"/><circle cx="12" cy="12" r="1.1"/>'}];
const NAME={haru:'하루',navi:'나비'};
// 대사: 하루는 쿨하고 짧게, 나비는 귀엽게
const L={
 haru:{start:['…한 판 해요. 봐주진 않을 거예요.','먼저 두세요.','좋아요. 시작해요.'],think:['음…','…','그럼 저는…','여기요.'],uwin:['…졌어요. 조금 분하네요.','잘하시네요. 다음엔 안 져요.'],awin:['제가 이겼네요. …다시 해요?','이번엔 제 차례였어요.'],draw:['무승부네요. …나쁘지 않았어요.'],threat:['…거기, 알고 있어요.','위험했네요.'],attack:['…이제 막으셔야 할걸요.','여기, 보이세요?'],idle:['천천히 두세요.','…흥미롭네요.','당신 차례예요.'],check:['체크예요.','…왕, 조심하세요.'],pass:['둘 곳이 없네요. 한 번 쉴게요.'],upass:['둘 곳이 없으시네요. 제가 한 번 더 둘게요.'],
  rwin:['…이번엔 제가.','제가 가져갈게요.'],rlose:['…다음엔 안 져요.','흠.'],rdraw:['다시요.','…비겼네요.'],gwin:['제가 이겼어요. …재밌었어요.'],glose:['…축하해요. 진심이에요.']},
 navi:{start:['한 판 해요! 먼저 두세요~','놀자! 저부터… 아니 먼저 두세요!'],think:['음…','어디 둘까~','여기!'],uwin:['으앙, 졌어요… 한 판 더!','우와, 잘하시네요!'],awin:['이겼다! 헤헤, 다시 해요?','제가 이겼어요~!'],draw:['비겼어요! 사이좋게~'],threat:['앗, 거긴 막아야 해요!','깜짝이야!'],attack:['이제 막아보세요~','후후, 보이세요?'],idle:['천천히 두세요~','두근두근…','차례예요!'],check:['체크! 헤헤','왕 조심~'],pass:['둘 데가 없어요… 패스!'],upass:['어? 둘 데가 없네요. 제가 또 둘게요~'],
  rwin:['야호!','헤헤, 내가 이겼다~'],rlose:['힝…','다음엔 이길 거예요!'],rdraw:['또 비겼다!','한 번 더~'],gwin:['내가 1등이다~!'],glose:['으앙, 졌다… 축하해요!']}};
const EMO={start:'smile',think:'think',uwin:'surprised',awin:'smile',draw:'nod',threat:'surprised',attack:'pleased',check:'pleased',rwin:'smile',rlose:'sad',rdraw:'nod',gwin:'pleased',glose:'surprised'};
const HEMO={think:'side',rlose:'worry',glose:'pleased'};
let opp='haru',lv=1,cur=null,G=null,busy=false,seq=0;
const rec=()=>{S.games=S.games||{};if(S.omok&&!S.games.omok){S.games.omok={navi:{w:S.omok.w||0,l:S.omok.l||0,d:0}};delete S.omok}return S.games};
const recOf=(id,o)=>{const g=rec();g[id]=g[id]||{};return g[id][o]=g[id][o]||(o==='trio'?{me:0,haru:0,navi:0}:{w:0,l:0,d:0})};
// 말하는 사람 얼굴(동그란 사진)
function av(who,e){e=e||el('span','gav');e.className='gav '+who;if(who==='haru')e.style.backgroundImage=`url(${A.c_base})`;else if(who==='navi')e.style.backgroundImage=`url(${A.k_base})`;else{e.style.backgroundImage='';e.textContent=(S.name||'나').slice(0,1)}return e}
function talk(who,key,emo){const t=L[who]&&L[who][key]?pick(L[who][key]):key;av(who,$('gAv'));$('gLine').textContent=t;$('gAv').dataset.n=NAME[who]||'';
 const e=emo||EMO[key];if(who==='navi')mascot(e||'base');else if(who==='haru'&&!pub&&(HEMO[key]||e))setMood(HEMO[key]||e,3500)}
const stoneOpp=()=>opp;
// ---------- shared drawing ----------
function stone(x,cx,cy,r,v){const s=x.createRadialGradient(cx-r*.35,cy-r*.35,r*.1,cx,cy,r);
 if(v===1){s.addColorStop(0,'#5a5a60');s.addColorStop(1,'#050506')}else{s.addColorStop(0,'#ffffff');s.addColorStop(.55,'#e9eef6');s.addColorStop(.8,'#efdff0');s.addColorStop(1,'#b9c2d6')}
 x.fillStyle=s;x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}
function pearlLine(x,W,H){const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'rgba(232,240,246,.42)');g.addColorStop(.5,'rgba(236,220,236,.36)');g.addColorStop(1,'rgba(214,224,246,.42)');return g}
function bgFill(x,W,H){const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1b1b1f');g.addColorStop(1,'#0d0d0f');x.fillStyle=g;x.fillRect(0,0,W,H)}
function canvas(){const c=$('gBoard'),dpr=window.devicePixelRatio||1,W=c.clientWidth,H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);return{x,W,H}}
function end(res){G.over=true;const r=recOf(cur.id,opp);r[res]++;save();score();talk(opp,res==='w'?'uwin':res==='l'?'awin':'draw')}
// ---------- 오목 ----------
const OM={id:'omok',aspect:1,N:15,
 init(){G={b:Array.from({length:15},()=>Array(15).fill(0)),last:null,win:null,moves:0}},
 draw(){const{x,W}=canvas(),N=15,m=W/(N+1);bgFill(x,W,W);x.strokeStyle=pearlLine(x,W,W);x.lineWidth=1;
  for(let i=1;i<=N;i++){x.beginPath();x.moveTo(m,i*m);x.lineTo(W-m,i*m);x.stroke();x.beginPath();x.moveTo(i*m,m);x.lineTo(i*m,W-m);x.stroke()}
  x.fillStyle='rgba(232,236,246,.6)';[[4,4],[4,12],[12,4],[12,12],[8,8]].forEach(([a,b])=>{x.beginPath();x.arc(a*m,b*m,2.4,0,7);x.fill()});const r=m*.44;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++)if(G.b[j][i])stone(x,(i+1)*m,(j+1)*m,r,G.b[j][i]);
  if(G.last){const[a,b]=G.last;x.strokeStyle=G.b[b][a]===1?'rgba(255,255,255,.8)':'rgba(0,0,0,.6)';x.lineWidth=1.6;x.beginPath();x.arc((a+1)*m,(b+1)*m,r*.42,0,7);x.stroke()}
  if(G.win){x.strokeStyle='rgba(255,236,190,.9)';x.lineWidth=3;x.beginPath();x.moveTo((G.win[0][0]+1)*m,(G.win[0][1]+1)*m);x.lineTo((G.win[1][0]+1)*m,(G.win[1][1]+1)*m);x.stroke()}},
 line(b,x,y,dx,dy,p){let n=1,o=0,ex=[x,y],sx=[x,y];let i=x+dx,j=y+dy;while(i>=0&&j>=0&&i<15&&j<15&&b[j][i]===p){n++;ex=[i,j];i+=dx;j+=dy}if(i>=0&&j>=0&&i<15&&j<15&&b[j][i]===0)o++;
  i=x-dx;j=y-dy;while(i>=0&&j>=0&&i<15&&j<15&&b[j][i]===p){n++;sx=[i,j];i-=dx;j-=dy}if(i>=0&&j>=0&&i<15&&j<15&&b[j][i]===0)o++;return{n,o,sx,ex}},
 win(b,x,y){const p=b[y][x];for(const[dx,dy]of[[1,0],[0,1],[1,1],[1,-1]]){const q=this.line(b,x,y,dx,dy,p);if(q.n>=5)return[q.sx,q.ex]}return null},
 pat(n,o){if(n>=5)return 1e6;if(o===0)return 0;if(n===4)return o===2?5e4:6e3;if(n===3)return o===2?5e3:500;if(n===2)return o===2?300:40;return o===2?12:3},
 eval(b,x,y,p){let s=0,f=0,t=0;b[y][x]=p;for(const[dx,dy]of[[1,0],[0,1],[1,1],[1,-1]]){const q=this.line(b,x,y,dx,dy,p);s+=this.pat(q.n,q.o);if(q.n>=4&&q.o)f++;if(q.n===3&&q.o===2)t++}b[y][x]=0;if(f>=2||(f&&t))s+=4e4;else if(t>=2)s+=8e3;return s},
 ai(){const b=G.b;let best=null,bs=-1;const near=(x,y)=>{for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const a=x+i,c=y+j;if(a>=0&&c>=0&&a<15&&c<15&&b[c][a])return true}return false};
  const dW=[.75,1,1.15][lv],noise=[.35,.08,.02][lv];
  for(let y=0;y<15;y++)for(let x=0;x<15;x++){if(b[y][x]||!near(x,y))continue;const a=this.eval(b,x,y,2),d=this.eval(b,x,y,1);let s=(a*1.05+d*dW)*(1+Math.random()*noise);if(lv===0&&d>=5e3&&d<5e4&&Math.random()<.35)s*=.3;if(s>bs){bs=s;best=[x,y]}}return best||[7,7]},
 threat(p){const b=G.b;for(let y=0;y<15;y++)for(let x=0;x<15;x++){if(b[y][x])continue;b[y][x]=p;const w=this.win(b,x,y);b[y][x]=0;if(w)return true}return false},
 put(x,y,p){G.b[y][x]=p;G.last=[x,y];G.moves++;const w=this.win(G.b,x,y);if(w)G.win=w;return w},
 async tap(px,py,W){const m=W/16,x=Math.round(px/m)-1,y=Math.round(py/m)-1;if(x<0||y<0||x>14||y>14||G.b[y][x])return;
  if(this.put(x,y,1)){this.draw();return end('w')}this.draw();if(G.moves>=225)return end('d');
  busy=true;const th=this.threat(1);talk(opp,th?'threat':'think');if(opp==='navi'&&!th)mascot('stone');await sleep(R(450,850));if(!alive())return;
  const[a,b]=this.ai();const w=this.put(a,b,2);this.draw();busy=false;if(w)return end('l');if(G.moves>=225)return end('d');
  if(this.threat(2))talk(opp,'attack');else if(Math.random()<.3)talk(opp,'idle');else if(opp==='navi')mascot('base')}};
// ---------- 사목 (Connect Four) ----------
const FO={id:'four',aspect:6/7,
 init(){G={b:Array.from({length:6},()=>Array(7).fill(0)),last:null,win:null,moves:0}},
 draw(){const{x,W,H}=canvas(),cw=W/7,ch=H/6;bgFill(x,W,H);const r=Math.min(cw,ch)*.38;
  for(let rr=0;rr<6;rr++)for(let c=0;c<7;c++){const cx=(c+.5)*cw,cy=(rr+.5)*ch,v=G.b[rr][c];if(v)stone(x,cx,cy,r,v);else{x.strokeStyle='rgba(232,228,240,.18)';x.lineWidth=1;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke()}}
  if(G.last){const[c,rr]=G.last;x.strokeStyle=G.b[rr][c]===1?'rgba(255,255,255,.8)':'rgba(0,0,0,.6)';x.lineWidth=1.6;x.beginPath();x.arc((c+.5)*cw,(rr+.5)*ch,r*.4,0,7);x.stroke()}
  if(G.win){x.strokeStyle='rgba(255,236,190,.9)';x.lineWidth=3;x.beginPath();x.moveTo((G.win[0][0]+.5)*cw,(G.win[0][1]+.5)*ch);x.lineTo((G.win[1][0]+.5)*cw,(G.win[1][1]+.5)*ch);x.stroke()}},
 drop(b,c){for(let r=5;r>=0;r--)if(!b[r][c])return r;return-1},
 win(b,c,r){const p=b[r][c];for(const[dc,dr]of[[1,0],[0,1],[1,1],[1,-1]]){let n=1,a=[c,r],z=[c,r],i=c+dc,j=r+dr;while(i>=0&&i<7&&j>=0&&j<6&&b[j][i]===p){n++;z=[i,j];i+=dc;j+=dr}i=c-dc;j=r-dr;while(i>=0&&i<7&&j>=0&&j<6&&b[j][i]===p){n++;a=[i,j];i-=dc;j-=dr}if(n>=4)return[a,z]}return null},
 score(b){let s=0;const w=(a,p)=>{let me=0,op=0;for(const v of a){if(v===2)me++;else if(v===1)op++}if(me&&op)return 0;if(me===4)return 1e5;if(op===4)return-1e5;return me===3?50:me===2?6:op===3?-60:op===2?-6:0};
  for(let r=0;r<6;r++)s+=(b[r][3]===2?4:b[r][3]===1?-4:0);
  for(let r=0;r<6;r++)for(let c=0;c<7;c++)for(const[dc,dr]of[[1,0],[0,1],[1,1],[1,-1]]){const ec=c+3*dc,er=r+3*dr;if(ec<0||ec>6||er<0||er>5)continue;s+=w([0,1,2,3].map(k=>b[r+k*dr][c+k*dc]))}return s},
 nega(b,d,al,be,p){const order=[3,2,4,1,5,0,6];let any=false,best=-Infinity;
  for(const c of order){const r=this.drop(b,c);if(r<0)continue;any=true;b[r][c]=p;let v;if(this.win(b,c,r))v=1e6+d;else if(d===0)v=(p===2?1:-1)*this.score(b);else v=-this.nega(b,d-1,-be,-al,3-p);b[r][c]=0;if(v>best)best=v;if(v>al)al=v;if(al>=be)break}
  return any?best:0},
 ai(){const b=G.b,d=[1,3,5][lv];let best=-Infinity,bc=3;for(const c of[3,2,4,1,5,0,6]){const r=this.drop(b,c);if(r<0)continue;b[r][c]=2;let v=this.win(b,c,r)?1e7:-this.nega(b,d-1,-Infinity,Infinity,1);b[r][c]=0;v+=Math.random()*[400,30,1][lv];if(v>best){best=v;bc=c}}return bc},
 put(c,p){const r=this.drop(G.b,c);G.b[r][c]=p;G.last=[c,r];G.moves++;const w=this.win(G.b,c,r);if(w)G.win=w;return w},
 async tap(px,py,W){const c=Math.floor(px/(W/7));if(c<0||c>6||this.drop(G.b,c)<0)return;
  if(this.put(c,1)){this.draw();return end('w')}this.draw();if(G.moves>=42)return end('d');busy=true;talk(opp,'think');if(opp==='navi')mascot('stone');
  await sleep(R(350,700));if(!alive())return;const w=this.put(this.ai(),2);this.draw();busy=false;if(w)return end('l');if(G.moves>=42)return end('d');if(Math.random()<.3)talk(opp,'idle');else if(opp==='navi')mascot('base')}};
// ---------- 리버시 ----------
const WT=[[100,-20,10,5,5,10,-20,100],[-20,-50,-2,-2,-2,-2,-50,-20],[10,-2,-1,-1,-1,-1,-2,10],[5,-2,-1,-1,-1,-1,-2,5],[5,-2,-1,-1,-1,-1,-2,5],[10,-2,-1,-1,-1,-1,-2,10],[-20,-50,-2,-2,-2,-2,-50,-20],[100,-20,10,5,5,10,-20,100]];
const RV={id:'reversi',aspect:1,
 init(){const b=Array.from({length:8},()=>Array(8).fill(0));b[3][3]=b[4][4]=2;b[3][4]=b[4][3]=1;G={b,last:null}},
 flips(b,x,y,p){if(b[y][x])return[];const out=[];for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const t=[];let i=x+dx,j=y+dy;while(i>=0&&j>=0&&i<8&&j<8&&b[j][i]===3-p){t.push([i,j]);i+=dx;j+=dy}if(t.length&&i>=0&&j>=0&&i<8&&j<8&&b[j][i]===p)out.push(...t)}return out},
 moves(b,p){const m=[];for(let y=0;y<8;y++)for(let x=0;x<8;x++){const f=this.flips(b,x,y,p);if(f.length)m.push({x,y,f})}return m},
 count(){let a=0,c=0;G.b.forEach(r=>r.forEach(v=>{if(v===1)a++;else if(v===2)c++}));return[a,c]},
 draw(){const{x,W}=canvas(),m=W/8;bgFill(x,W,W);x.strokeStyle=pearlLine(x,W,W);x.lineWidth=1;for(let i=0;i<=8;i++){x.beginPath();x.moveTo(i*m,0);x.lineTo(i*m,W);x.stroke();x.beginPath();x.moveTo(0,i*m);x.lineTo(W,i*m);x.stroke()}
  for(let j=0;j<8;j++)for(let i=0;i<8;i++)if(G.b[j][i])stone(x,(i+.5)*m,(j+.5)*m,m*.4,G.b[j][i]);
  if(!G.over&&!busy){x.fillStyle='rgba(232,228,240,.28)';this.moves(G.b,1).forEach(v=>{x.beginPath();x.arc((v.x+.5)*m,(v.y+.5)*m,m*.09,0,7);x.fill()})}
  if(G.last){const[a,b]=G.last;x.strokeStyle='rgba(0,0,0,.6)';x.lineWidth=1.6;x.beginPath();x.arc((a+.5)*m,(b+.5)*m,m*.15,0,7);x.stroke()}
  const[me,ai]=this.count();$('gTitle').textContent=`리버시 ${me} : ${ai}`},
 apply(v,p){G.b[v.y][v.x]=p;v.f.forEach(([i,j])=>G.b[j][i]=p);G.last=[v.x,v.y]},
 ai(){const ms=this.moves(G.b,2);if(!ms.length)return null;const pos=v=>WT[v.y][v.x];
  if(lv===0)return pick(ms.slice().sort((a,b)=>b.f.length-a.f.length).slice(0,4));
  let best=null,bs=-Infinity;for(const v of ms){let s=pos(v)+v.f.length*(lv===1?2:1);
   if(lv===2){const b2=G.b.map(r=>r.slice());b2[v.y][v.x]=2;v.f.forEach(([i,j])=>b2[j][i]=2);const rep=this.moves(b2,1);s-=rep.length?Math.max(...rep.map(u=>WT[u.y][u.x]+u.f.length)):-30}
   s+=Math.random()*3;if(s>bs){bs=s;best=v}}return best},
 finish(){const[a,c]=this.count();end(a>c?'w':a<c?'l':'d')},
 async tap(px,py,W){const m=W/8,x=Math.floor(px/m),y=Math.floor(py/m);if(x<0||y<0||x>7||y>7)return;const f=this.flips(G.b,x,y,1);if(!f.length)return;
  this.apply({x,y,f},1);busy=true;this.draw();
  for(;;){if(!this.moves(G.b,2).length){if(!this.moves(G.b,1).length){busy=false;this.draw();return this.finish()}talk(opp,'pass');busy=false;this.draw();return}
   talk(opp,'think');if(opp==='navi')mascot('stone');await sleep(R(450,850));if(!alive())return;this.apply(this.ai(),2);this.draw();
   if(this.moves(G.b,1).length)break;if(!this.moves(G.b,2).length){busy=false;this.draw();return this.finish()}talk(opp,'upass');await sleep(900)}
  busy=false;this.draw();if(Math.random()<.3)talk(opp,'idle');else if(opp==='navi')mascot('base')}};
// ---------- 체스 ----------
const VAL={p:100,n:320,b:330,r:500,q:900,k:0},GLY={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
const isW=p=>p&&p===p.toUpperCase(),col=p=>p?(isW(p)?'w':'b'):null;
const CH={id:'chess',aspect:1,
 init(){const r='rnbqkbnr';const b=[...r,...'pppppppp',...Array(32).fill(''),...'PPPPPPPP',...r.toUpperCase()];G={st:{b,t:'w',c:{K:1,Q:1,k:1,q:1},ep:-1},sel:-1,tg:[],last:null}},
 att(b,sq,by){const r=sq>>3,c=sq&7,at=(rr,cc)=>rr>=0&&rr<8&&cc>=0&&cc<8?b[rr*8+cc]:null,me=p=>p&&col(p)===by;
  const pd=by==='w'?1:-1;for(const dc of[-1,1]){const p=at(r+pd,c+dc);if(me(p)&&p.toLowerCase()==='p')return true}
  for(const[dr,dc]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]){const p=at(r+dr,c+dc);if(me(p)&&p.toLowerCase()==='n')return true}
  for(const[dr,dc]of[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]){const p=at(r+dr,c+dc);if(me(p)&&p.toLowerCase()==='k')return true}
  for(const[dr,dc,t]of[[1,1,'b'],[1,-1,'b'],[-1,1,'b'],[-1,-1,'b'],[1,0,'r'],[-1,0,'r'],[0,1,'r'],[0,-1,'r']]){let rr=r+dr,cc=c+dc;while(rr>=0&&rr<8&&cc>=0&&cc<8){const p=b[rr*8+cc];if(p){if(me(p)&&(p.toLowerCase()===t||p.toLowerCase()==='q'))return true;break}rr+=dr;cc+=dc}}return false},
 pseudo(st){const{b,t}=st,out=[],add=(f,to,x)=>out.push(Object.assign({f,t:to},x));
  for(let s=0;s<64;s++){const p=b[s];if(!p||col(p)!==t)continue;const r=s>>3,c=s&7,k=p.toLowerCase();
   if(k==='p'){const d=t==='w'?-1:1,r1=r+d,last=t==='w'?0:7;if(r1>=0&&r1<8&&!b[r1*8+c]){add(s,r1*8+c,r1===last?{pr:1}:{});const r2=r+2*d;if((t==='w'?r===6:r===1)&&!b[r2*8+c])add(s,r2*8+c,{dbl:1})}
    for(const dc of[-1,1]){const cc=c+dc;if(cc<0||cc>7||r1<0||r1>7)continue;const to=r1*8+cc,q=b[to];if(q&&col(q)!==t)add(s,to,r1===last?{pr:1}:{});else if(to===st.ep)add(s,to,{ep:1})}}
   else if(k==='n'||k==='k'){const D=k==='n'?[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]:[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    for(const[dr,dc]of D){const rr=r+dr,cc=c+dc;if(rr<0||rr>7||cc<0||cc>7)continue;const q=b[rr*8+cc];if(!q||col(q)!==t)add(s,rr*8+cc)}
    if(k==='k'){const o=t==='w'?'b':'w',hr=t==='w'?7:0;if(s===hr*8+4&&!this.att(b,s,o)){
     if(st.c[t==='w'?'K':'k']&&!b[hr*8+5]&&!b[hr*8+6]&&!this.att(b,hr*8+5,o)&&!this.att(b,hr*8+6,o))add(s,hr*8+6,{cs:1});
     if(st.c[t==='w'?'Q':'q']&&!b[hr*8+3]&&!b[hr*8+2]&&!b[hr*8+1]&&!this.att(b,hr*8+3,o)&&!this.att(b,hr*8+2,o))add(s,hr*8+2,{cs:1})}}}
   else{const D=k==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:k==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    for(const[dr,dc]of D){let rr=r+dr,cc=c+dc;while(rr>=0&&rr<8&&cc>=0&&cc<8){const q=b[rr*8+cc];if(q){if(col(q)!==t)add(s,rr*8+cc);break}add(s,rr*8+cc);rr+=dr;cc+=dc}}}}
  return out},
 make(st,m){const b=st.b.slice(),p=b[m.f],t=st.t,c=Object.assign({},st.c);b[m.t]=m.pr?(t==='w'?'Q':'q'):p;b[m.f]='';
  if(m.ep)b[m.t+(t==='w'?8:-8)]='';if(m.cs){const hr=m.t>>3;if((m.t&7)===6){b[hr*8+5]=b[hr*8+7];b[hr*8+7]=''}else{b[hr*8+3]=b[hr*8];b[hr*8]=''}}
  if(p==='K'){c.K=c.Q=0}if(p==='k'){c.k=c.q=0}for(const[s,k]of[[63,'K'],[56,'Q'],[7,'k'],[0,'q']])if(m.f===s||m.t===s)c[k]=0;
  return{b,t:t==='w'?'b':'w',c,ep:m.dbl?(m.f+m.t)/2:-1}},
 king(b,t){return b.indexOf(t==='w'?'K':'k')},
 legal(st){return this.pseudo(st).filter(m=>{const n=this.make(st,m);return!this.att(n.b,this.king(n.b,st.t),n.t)})},
 inCheck(st){return this.att(st.b,this.king(st.b,st.t),st.t==='w'?'b':'w')},
 ev(b){let s=0;for(let i=0;i<64;i++){const p=b[i];if(!p)continue;const k=p.toLowerCase(),r=i>>3,c=i&7,w=isW(p),cen=(3.5-Math.abs(r-3.5))+(3.5-Math.abs(c-3.5));
   let v=VAL[k];if(k==='n')v+=cen*5;else if(k==='b')v+=cen*3;else if(k==='q')v+=cen;else if(k==='p')v+=(w?6-r:r-1)*7+(c>1&&c<6?cen*2:0);else if(k==='k')v-=cen*4;s+=w?-v:v}return s},  // 검은색(AI) 기준
 search(st,d,al,be){if(d===0)return(st.t==='b'?1:-1)*this.ev(st.b);const ms=this.legal(st);if(!ms.length)return this.inCheck(st)?-1e5-d:0;
  ms.sort((a,b)=>(st.b[b.t]?VAL[st.b[b.t].toLowerCase()]:0)-(st.b[a.t]?VAL[st.b[a.t].toLowerCase()]:0));
  let best=-Infinity;for(const m of ms){const v=-this.search(this.make(st,m),d-1,-be,-al);if(v>best)best=v;if(v>al)al=v;if(al>=be)break}return best},
 ai(){const st=G.st,ms=this.legal(st),d=[1,2,3][lv],noise=[90,18,4][lv];let best=null,bs=-Infinity;
  for(const m of ms){const v=-this.search(this.make(st,m),d-1,-Infinity,Infinity)+Math.random()*noise;if(v>bs){bs=v;best=m}}return best},
 draw(){const{x,W}=canvas(),m=W/8,st=G.st;
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){x.fillStyle=(r+c)%2?'#26252b':'#3b3a42';x.fillRect(c*m,r*m,m,m)}
  const tint=(s,col)=>{x.fillStyle=col;x.fillRect((s&7)*m,(s>>3)*m,m,m)};
  if(G.last){tint(G.last.f,'rgba(236,220,236,.14)');tint(G.last.t,'rgba(236,220,236,.2)')}
  if(G.sel>=0)tint(G.sel,'rgba(214,236,238,.28)');
  if(this.inCheck(st)){const k=this.king(st.b,st.t),g=x.createRadialGradient(((k&7)+.5)*m,((k>>3)+.5)*m,2,((k&7)+.5)*m,((k>>3)+.5)*m,m*.6);g.addColorStop(0,'rgba(230,140,160,.6)');g.addColorStop(1,'rgba(230,140,160,0)');x.fillStyle=g;x.fillRect((k&7)*m,(k>>3)*m,m,m)}
  x.textAlign='center';x.textBaseline='middle';x.font=`${m*.78}px "Apple Symbols","Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",serif`;
  for(let s=0;s<64;s++){const p=st.b[s];if(!p)continue;const cx=((s&7)+.5)*m,cy=((s>>3)+.54)*m,g=GLY[p.toLowerCase()]+'︎';
   x.lineJoin='round';if(isW(p)){x.lineWidth=m*.06;x.strokeStyle='#121214';x.strokeText(g,cx,cy);const gr=x.createLinearGradient(cx-m/2,cy-m/2,cx+m/2,cy+m/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#ece4f2');gr.addColorStop(1,'#d3dcef');x.fillStyle=gr;x.fillText(g,cx,cy)}
   else{x.lineWidth=m*.05;x.strokeStyle='rgba(232,228,240,.7)';x.strokeText(g,cx,cy);x.fillStyle='#09090b';x.fillText(g,cx,cy)}}
  x.fillStyle='rgba(214,236,238,.55)';G.tg.forEach(t=>{x.beginPath();x.arc(((t.t&7)+.5)*m,((t.t>>3)+.5)*m,st.b[t.t]?m*.44:m*.12,0,7);st.b[t.t]?(x.strokeStyle='rgba(214,236,238,.6)',x.lineWidth=2,x.stroke()):x.fill()})},
 after(){const st=G.st,ms=this.legal(st);if(!ms.length){if(this.inCheck(st))return end(st.t==='b'?'w':'l'),true;return end('d'),true}
  const left=st.b.filter(Boolean);if(left.length===2)return end('d'),true;return false},
 async tap(px,py,W){const m=W/8,s=Math.floor(py/m)*8+Math.floor(px/m),st=G.st;if(st.t!=='w')return;
  const mv=G.tg.find(t=>t.t===s);if(mv){G.st=this.make(st,mv);G.last=mv;G.sel=-1;G.tg=[];this.draw();if(this.after())return;
   busy=true;talk(opp,'think');await sleep(60);await new Promise(r=>requestAnimationFrame(()=>setTimeout(r,R(250,500))));if(!alive())return;
   const a=this.ai();G.st=this.make(G.st,a);G.last=a;busy=false;this.draw();if(this.after())return;if(this.inCheck(G.st))talk(opp,'check');else if(Math.random()<.25)talk(opp,'idle');else if(opp==='navi')mascot('base');return}
  if(st.b[s]&&col(st.b[s])==='w'){G.sel=s;G.tg=this.legal(st).filter(t=>t.f===s)}else{G.sel=-1;G.tg=[]}this.draw()}};
// ---------- 셋이서: 공통 자리 ----------
const WHO=['me','haru','navi'];
function seats(){const box=el('div','seats');WHO.forEach(w=>{const s=el('div','seat');s.dataset.w=w;s.append(av(w),el('div','nm',w==='me'?(S.name||'나'):NAME[w]),el('div','v',''),el('div','pt',''));box.appendChild(s)});return box}
const seat=w=>$('gStage').querySelector(`.seat[data-w=${w}]`);
function setSeat(w,v,pt,win){const s=seat(w);if(!s)return;if(v!=null){const V=s.querySelector('.v');if(v instanceof Node){V.innerHTML='';V.appendChild(v)}else V.textContent=v}if(pt!=null)s.querySelector('.pt').textContent=pt;s.classList.toggle('win',!!win)}
function trioEnd(w){G.over=true;recOf(cur.id,'trio')[w]++;save();score();
 if(w==='me'){talk('haru','glose');setTimeout(()=>alive()&&talk('navi','glose'),1400)}else{talk(w,'gwin');setTimeout(()=>alive()&&talk(w==='haru'?'navi':'haru',w==='haru'?'rlose':'rlose'),1400)}}
const pts=()=>WHO.forEach(w=>setSeat(w,null,`${G.sc[w]}점`));
// ---------- 가위바위보 ----------
const HAND=['가위','바위','보'],BEAT={가위:'보',바위:'가위',보:'바위'};
const RPS={id:'rps',dom:true,
 init(){G={sc:{me:0,haru:0,navi:0}}},
 draw(){const S0=$('gStage');S0.innerHTML='';S0.appendChild(seats());pts();const pad=el('div','gpad');HAND.forEach(h=>{const b=el('button','btn ghost',h);b.onclick=()=>this.play(h);pad.appendChild(b)});S0.appendChild(pad)},
 async play(h){if(busy||G.over)return;busy=true;WHO.forEach(w=>setSeat(w,'…',null,false));talk(pick(['haru','navi']),'가위, 바위…','base');await sleep(650);if(!alive())return;
  const ch={me:h,haru:pick(HAND),navi:pick(HAND)};WHO.forEach(w=>setSeat(w,ch[w]));const set=new Set(Object.values(ch));
  if(set.size!==2){talk(pick(['haru','navi']),'rdraw');busy=false;return}
  const [a,b]=[...set],win=BEAT[a]===b?a:b,ws=WHO.filter(w=>ch[w]===win);ws.forEach(w=>{G.sc[w]++;setSeat(w,null,null,true)});pts();
  const top=WHO.find(w=>G.sc[w]>=3);busy=false;if(top)return trioEnd(top);
  if(ws.includes('navi'))talk('navi','rwin');else if(ws.includes('haru'))talk('haru','rwin');else talk(pick(['haru','navi']),'rlose')}};
// ---------- 업다운 ----------
const UD={id:'updown',dom:true,
 init(){G={lo:1,hi:100,ans:1+Math.floor(Math.random()*100),turn:0,sc:{me:0,haru:0,navi:0},last:{}}},
 draw(){const S0=$('gStage');S0.innerHTML='';S0.appendChild(seats());WHO.forEach(w=>setSeat(w,G.last[w]!=null?G.last[w]:'–',G.turn===WHO.indexOf(w)&&!G.over?'차례':''));
  const rg=el('div','urange',`${G.lo} ~ ${G.hi}`);S0.appendChild(rg);
  const pad=el('div','gpad');const i=el('input','f');i.type='number';i.inputMode='numeric';i.placeholder='숫자';i.id='udIn';const b=el('button','btn','확인');
  b.onclick=()=>{const v=Math.round(+i.value);if(!v)return;i.value='';this.guess('me',v)};i.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing)b.click()});
  i.disabled=b.disabled=G.turn!==0||G.over||busy;pad.append(i,b);S0.appendChild(pad)},
 async guess(w,v){if(G.over)return;if(v<G.lo||v>G.hi){if(w==='me')talk('haru',`${G.lo}에서 ${G.hi} 사이로 말해주세요.`,'worry');return}
  G.last[w]=v;if(v===G.ans){G.lo=G.hi=v;this.draw();setSeat(w,null,null,true);return trioEnd(w)}
  if(v<G.ans)G.lo=v+1;else G.hi=v-1;const up=v<G.ans;G.turn=(G.turn+1)%3;busy=true;this.draw();
  talk(pick(['haru','navi'].filter(x=>x!==w)),`${v}… ${up?'업!':'다운!'}`,up?'nod':'nod');await sleep(1000);if(!alive())return;busy=false;
  const nx=WHO[G.turn];if(nx==='me'){this.draw();setTimeout(()=>{const i=$('udIn');i&&i.focus()},50);return}
  let g;if(nx==='haru'){const mid=(G.lo+G.hi)/2;g=Math.round(mid+(Math.random()-.5)*Math.min(6,(G.hi-G.lo)/3))}else g=G.lo+Math.floor(Math.random()*(G.hi-G.lo+1));
  g=Math.min(G.hi,Math.max(G.lo,g));talk(nx,nx==='haru'?`…${g}.`:`${g}!`,nx==='haru'?'side':'think');busy=true;this.draw();await sleep(900);if(!alive())return;busy=false;this.guess(nx,g)}};
// ---------- 주사위 ----------
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function die(n){const d=el('span','die');for(let i=0;i<9;i++){const p=document.createElement('i');if(PIPS[n].includes(i))p.className='on';d.appendChild(p)}return d}
const pair=(a,b)=>{const f=document.createDocumentFragment(),w=el('span','dice');w.append(die(a),die(b));f.appendChild(w);return w};
const DI={id:'dice',dom:true,
 init(){G={sc:{me:0,haru:0,navi:0}}},
 draw(){const S0=$('gStage');S0.innerHTML='';S0.appendChild(seats());pts();WHO.forEach(w=>setSeat(w,pair(1,1)));const pad=el('div','gpad');const b=el('button','btn','굴리기');b.onclick=()=>this.roll();pad.appendChild(b);S0.appendChild(pad)},
 async roll(){if(busy||G.over)return;busy=true;WHO.forEach(w=>setSeat(w,null,null,false));const t0=Date.now();
  while(Date.now()-t0<700){WHO.forEach(w=>setSeat(w,pair(1+Math.random()*6|0,1+Math.random()*6|0)));await sleep(80);if(!alive())return}
  const r={};WHO.forEach(w=>{const a=1+Math.random()*6|0,b=1+Math.random()*6|0;r[w]=a+b;setSeat(w,pair(a,b))});const mx=Math.max(...Object.values(r)),ws=WHO.filter(w=>r[w]===mx);
  busy=false;if(ws.length>1){talk(pick(['haru','navi']),'rdraw');return}const w=ws[0];G.sc[w]++;setSeat(w,null,null,true);pts();
  if(G.sc[w]>=3)return trioEnd(w);if(w==='me')talk(pick(['haru','navi']),'rlose');else talk(w,'rwin')}};
const MOD={chess:CH,omok:OM,reversi:RV,four:FO,rps:RPS,updown:UD,dice:DI};
// ---------- 화면 ----------
const alive=()=>G&&G.seq===seq&&$('game').classList.contains('open');
function score(){if(!cur){$('gScore').textContent='';return}if(cur.dom){const r=recOf(cur.id,'trio');$('gScore').textContent=`승 ${r.me} · 하루 ${r.haru} · 나비 ${r.navi}`;return}
 const r=recOf(cur.id,opp);$('gScore').textContent=`${r.w}승 ${r.l}패${r.d?` ${r.d}무`:''}`}
function recTxt(g){if(g.trio){const r=recOf(g.id,'trio');return r.me+r.haru+r.navi?`내가 ${r.me}번 이김`:'아직 안 해봤어요'}const r=recOf(g.id,opp);return r.w+r.l+r.d?`${r.w}승 ${r.l}패`+(r.d?` ${r.d}무`:''):'아직 안 해봤어요'}
function catOn(){$('app').classList.toggle('withcat',opp==='navi'||opp==='trio');requestAnimationFrame(()=>{mPlace();setTimeout(mPlace,380)})}
function hub(){cur=null;G=null;seq++;busy=false;$('gTitle').textContent='놀이';$('gBack').hidden=true;$('gPlay').hidden=true;$('gHub').hidden=false;score();
 const O=$('gOpp');O.innerHTML='';[['haru','하루랑'],['navi','나비랑'],['trio','셋이서']].forEach(([v,l])=>{const b=el('button',opp===v?'on':'',l);b.onclick=()=>{opp=v;hub()};O.appendChild(b)});
 const C=$('gCards');C.innerHTML='';GAMES.filter(g=>opp==='trio'?g.trio:g.duo).forEach(g=>{const b=el('button','gcard');b.innerHTML=`<svg viewBox="0 0 24 24">${g.icon}</svg>`;b.append(el('b',null,g.name),el('small',null,g.sub),el('span','rec',recTxt(g)));b.onclick=()=>start(g.id);C.appendChild(b)});
 $('gLine').textContent=opp==='trio'?'셋이서 뭐 할까요?':opp==='navi'?'나비랑 뭐 하고 놀까요?':'…뭐 하고 싶으세요?';av(opp==='trio'?'haru':opp,$('gAv'));if(opp==='navi')mascot('happy');catOn()}
function start(id){cur=MOD[id];if(cur.dom&&opp!=='trio')opp='trio';$('gTitle').textContent=GAMES.find(g=>g.id===id).name;$('gBack').hidden=false;$('gHub').hidden=true;$('gPlay').hidden=false;
 $('gBoard').hidden=!!cur.dom;$('gStage').hidden=!cur.dom;$('gLvW').hidden=!!cur.dom;if(!cur.dom){const c=$('gBoard');c.style.height=c.clientWidth*cur.aspect+'px'}
 const LV=$('gLv');LV.innerHTML='';if(!cur.dom)[[0,'쉬움'],[1,'보통'],[2,'어려움']].forEach(([v,l])=>{const b=el('button',lv===v?'on':'',l);b.onclick=()=>{lv=v;S.gameLv=v;save();start(cur.id)};LV.appendChild(b)});
 fresh();catOn()}
function fresh(){seq++;busy=false;cur.init();G.seq=seq;G.over=false;score();cur.draw();if(cur.dom){talk('haru',cur.id==='updown'?'제가 숫자 하나 정했어요. 1부터 100 사이. 먼저 말해보세요.':cur.id==='dice'?'세 번 먼저 이기면 끝이에요.':'세 판 먼저 이기는 쪽이 이겨요.','base');if(opp==='trio')mascot('happy')}else talk(opp,'start')}
function open(){if(opening)return;opp=S.gameOpp||(pub?'navi':'haru');lv=S.gameLv!=null?S.gameLv:1;$('app').classList.add('gaming');$('game').classList.add('open');hub()}
function close(){seq++;busy=false;S.gameOpp=opp==='trio'?S.gameOpp:opp;save();$('app').classList.remove('gaming','withcat');$('game').classList.remove('open');if(!pub)setMood(idle())}
$('gBack').onclick=hub;$('gClose').onclick=close;$('gNew').onclick=()=>cur&&fresh();
$('gBoard').addEventListener('click',e=>{if(!cur||cur.dom||!G||G.over||busy)return;const r=e.currentTarget.getBoundingClientRect();cur.tap(e.clientX-r.left,e.clientY-r.top,r.width)});
document.querySelectorAll('nav button[data-g]').forEach(b=>b.onclick=open);
window.addEventListener('resize',()=>{if(!$('game').classList.contains('open'))return;if(cur&&!cur.dom){const c=$('gBoard');c.style.height=c.clientWidth*cur.aspect+'px';cur.draw()}mPlace()});
window.gameOpen=open;
})();
