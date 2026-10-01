// 하루 — 놀이(게임 모음). index.html의 전역(S, $, el, save, say, setMood, mascot, mPlace, pub, opening, pick, sleep, R, A)을 쓴다.
(()=>{
const GAMES=[
 {id:'chess',name:'체스',sub:'왕을 잡으면 승리',duo:true,icon:'<path d="M9 20h6M8.5 17h7l-1-4.5 1.5-2-2-4-3-.5-2.5 2.5 1.5 1.5-1 1-1.5-.5z"/>'},
 {id:'omok',name:'오목',sub:'다섯 줄을 먼저',duo:true,icon:'<circle cx="8.5" cy="12" r="4.5"/><circle cx="15.5" cy="12" r="4.5"/>'},
 {id:'blackjack',name:'블랙잭',sub:'21에 가깝게',duo:true,trio:true,bet:true,icon:'<rect x="4.5" y="5" width="10" height="14" rx="2"/><path d="M14.5 7.5l4.2 1.2-3.3 11.4-5.2-1.5"/>'},
 {id:'holdem',name:'홀덤',sub:'텍사스 홀덤 포커',duo:true,trio:true,bet:true,icon:'<path d="M12 4.5c3 3.5 6.5 5.3 6.5 8.4a3.3 3.3 0 0 1-5.6 2.3L13.6 19h-3.2l.7-3.8a3.3 3.3 0 0 1-5.6-2.3c0-3.1 3.5-4.9 6.5-8.4z"/>'},
 {id:'yacht',name:'요트',sub:'주사위 다섯 개로 점수표 채우기',duo:true,trio:true,bet:true,icon:'<rect x="3.5" y="9" width="9" height="9" rx="2"/><rect x="11.5" y="4.5" width="9" height="9" rx="2"/><circle cx="8" cy="13.5" r=".9"/><circle cx="14" cy="7" r=".9"/><circle cx="18" cy="11" r=".9"/>'},
 {id:'mahjong',name:'마작',sub:'몸통 넷 + 머리 하나',duo:true,trio:true,bet:true,icon:'<rect x="6.5" y="3.5" width="11" height="17" rx="2"/><path d="M10 8h4M12 8v8M9.5 12h5"/>'}];
const HELP={
 chess:['<b>목표</b> 상대 왕(♚)이 더 이상 피할 곳이 없게 만들면 이겨요(체크메이트).','<b>하는 법</b> 내 말(흰색)을 누르면 갈 수 있는 칸이 점으로 보여요. 점을 누르면 이동해요.','<b>말 움직임</b> 폰: 앞으로 1칸(처음엔 2칸), 잡을 땐 대각선 · 나이트(말 머리): L자로 뛰어넘기 · 비숍: 대각선 · 룩(성): 가로세로 · 퀸: 가로세로+대각선 · 킹: 아무 방향 1칸','폰이 끝까지 가면 퀸이 돼요.'],
 omok:['<b>목표</b> 같은 색 돌 다섯 개를 가로·세로·대각선으로 먼저 이으면 이겨요.','빈 칸을 누르면 돌을 놓아요. 나는 검은 돌이에요.'],
 blackjack:['<b>목표</b> 카드 합이 <span class="k">21에 가까운 쪽</span>이 이겨요. 21을 넘으면 바로 져요(버스트).','<b>숫자</b> 2~10은 그대로, J·Q·K는 10, A는 1 또는 11(유리한 쪽으로 자동).','<b>버튼</b> 히트: 한 장 더 받기 · 스탠드: 그만 받기 · 더블: 건 칩을 두 배로 하고 딱 한 장만 더','딜러는 16 이하면 무조건 더 받고 17 이상이면 멈춰요. 처음 두 장이 21이면 블랙잭, 1.5배를 받아요.','아래 <span class="k">추천</span>을 따라 해보면 금방 익숙해져요.'],
 holdem:['<b>목표</b> 내 카드 2장 + 가운데 카드 5장 중에서 가장 좋은 5장으로 족보를 겨뤄요.','<b>순서</b> 카드 2장 받기 → 가운데 3장 → 1장 → 1장. 매번 칩을 걸지 정해요.','<b>버튼</b> 체크: 그냥 넘기기 · 콜: 상대만큼 걸기 · 레이즈: 더 걸기 · 폴드: 포기(이미 건 칩은 잃어요)','<b>족보</b>(강한 순) 스트레이트 플러시 › 포카드 › 풀하우스 › 플러시(같은 무늬 5장) › 스트레이트(연속 5장) › 트리플 › 투페어 › 원페어 › 하이카드','아래 <span class="k">이길 확률</span>을 보고 콜·폴드를 정하면 돼요.'],
 yacht:['<b>목표</b> 12칸 점수표를 채워서 총점이 가장 높으면 이겨요.','<b>하는 법</b> 굴리기(최대 3번) → 남길 주사위를 누르면 고정 → 점수표의 빈칸(미리 보이는 숫자)을 하나 눌러 기록.','<b>칸</b> 1~6: 그 숫자 눈의 합 · 초이스: 전부 합 · 포카드: 같은 눈 4개면 전부 합 · 풀하우스: 3개+2개면 전부 합 · 스몰 스트레이트: 4개 연속 15점 · 라지 스트레이트: 5개 연속 30점 · 요트: 5개 모두 같으면 50점','1~6 칸 합이 63 이상이면 보너스 35점. <span class="k">노란 칸</span>이 추천이에요.'],
 mahjong:['<b>목표</b> 손패 14장으로 <span class="k">몸통 4개 + 머리 1개</span>를 먼저 만들면 이겨요.','<b>몸통</b> 같은 패 3장(예: 5萬 5萬 5萬) 또는 같은 종류 연속 3장(예: 3筒 4筒 5筒) · <b>머리</b> 같은 패 2장. 같은 패 2장씩 7쌍(치또이츠)도 돼요.','<b>패 종류</b> 萬·筒·索은 숫자 패(연속 가능) · 東南西北白發中은 글자 패(연속 안 됨, 3장 모으기만).','<b>하는 법</b> 내 차례에 1장 받고, 필요 없는 1장을 눌러 두 번 누르면 버려요. 내가 뽑아서 완성하면 쯔모, 남이 버린 패로 완성하면 론!','<span class="k">노란 테두리 패</span>가 버리기 추천이에요. 아래에 완성까지 얼마나 남았는지도 보여요.']};
const NAME={haru:'하루',navi:'나비'};
// 대사: 하루는 쿨하고 짧게, 나비는 귀엽게
const L={
 haru:{start:['…한 판 해요. 봐주진 않을 거예요.','먼저 두세요.','좋아요. 시작해요.'],think:['음…','…','그럼 저는…','여기요.'],uwin:['…졌어요. 조금 분하네요.','잘하시네요. 다음엔 안 져요.'],awin:['제가 이겼네요. …다시 해요?','이번엔 제 차례였어요.'],draw:['무승부네요. …나쁘지 않았어요.'],threat:['…거기, 알고 있어요.','위험했네요.'],attack:['…이제 막으셔야 할걸요.','여기, 보이세요?'],idle:['천천히 두세요.','…흥미롭네요.','당신 차례예요.'],check:['체크예요.','…왕, 조심하세요.'],pass:['둘 곳이 없네요. 한 번 쉴게요.'],upass:['둘 곳이 없으시네요. 제가 한 번 더 둘게요.'],
  deal:['카드 나눠드릴게요.','…자, 받으세요.'],bust:['…넘으셨네요.'],pwin:['이번 판은 제 거예요.','…가져갈게요.'],plose:['…가져가세요. 다음엔 안 줘요.','운이 좋으시네요.'],push:['비겼네요.'],raise:['올릴게요.','…조금 더요.'],fold:['이번엔 접을게요.'],ccgo:['먼저 굴리세요. 세 번까지예요.'],ccbig:['…좋은 패예요.'],ccbad:['…1-2-3. 운이 없네요.']},
 navi:{start:['한 판 해요! 먼저 두세요~','놀자! 저부터… 아니 먼저 두세요!'],think:['음…','어디 둘까~','여기!'],uwin:['으앙, 졌어요… 한 판 더!','우와, 잘하시네요!'],awin:['이겼다! 헤헤, 다시 해요?','제가 이겼어요~!'],draw:['비겼어요! 사이좋게~'],threat:['앗, 거긴 막아야 해요!','깜짝이야!'],attack:['이제 막아보세요~','후후, 보이세요?'],idle:['천천히 두세요~','두근두근…','차례예요!'],check:['체크! 헤헤','왕 조심~'],pass:['둘 데가 없어요… 패스!'],upass:['어? 둘 데가 없네요. 제가 또 둘게요~'],
  deal:['카드 나눠요~'],bust:['앗, 넘었다!'],pwin:['헤헤, 내가 가져갈게요~'],plose:['힝… 가져가요.'],push:['비겼다~'],raise:['올려요! 후후','더 걸게요~'],fold:['이건 포기~'],ccgo:['먼저 굴려요! 세 번까지~'],ccbig:['우와 대박!'],ccbad:['으앙 1-2-3…']}};
const EMO={deal:'base',bust:'surprised',pwin:'smile',plose:'surprised',push:'nod',raise:'pleased',fold:'side',ccbig:'surprised',ccbad:'sad',start:'smile',think:'think',uwin:'surprised',awin:'smile',draw:'nod',threat:'surprised',attack:'pleased',check:'pleased',rwin:'smile',rlose:'sad',rdraw:'nod',gwin:'pleased',glose:'surprised'};
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
// ---------- 체스 ----------
const VAL={p:100,n:320,b:330,r:500,q:900,k:0},GLY={k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
const isW=p=>p&&p===p.toUpperCase(),col=p=>p?(isW(p)?'w':'b'):null;
// 기물은 글꼴 기호를 따로 그린 뒤 실제 그려진 픽셀 범위를 재서 칸 가운데에 놓는다(기기마다 글꼴 정렬이 달라서)
const SPR={};function pieceSprite(p,m){const key=p+'|'+Math.round(m);if(SPR[key])return SPR[key];const dpr=window.devicePixelRatio||1,F=m*.8*dpr,Z=Math.ceil(F*2),c=document.createElement('canvas');c.width=c.height=Z;const x=c.getContext('2d',{willReadFrequently:true});
 x.font=`${F}px "Apple Symbols","Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",serif`;x.textAlign='left';x.textBaseline='alphabetic';x.lineJoin='round';const g=GLY[p.toLowerCase()]+'\uFE0E',ox=F*.4,oy=F*1.4;
 if(isW(p)){x.lineWidth=F*.075;x.strokeStyle='#121214';x.strokeText(g,ox,oy);const gr=x.createLinearGradient(0,0,Z,Z);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#ece4f2');gr.addColorStop(1,'#d3dcef');x.fillStyle=gr;x.fillText(g,ox,oy)}
 else{x.lineWidth=F*.06;x.strokeStyle='rgba(232,228,240,.75)';x.strokeText(g,ox,oy);x.fillStyle='#09090b';x.fillText(g,ox,oy)}
 const d=x.getImageData(0,0,Z,Z).data;let x0=Z,y0=Z,x1=0,y1=0;for(let j=0;j<Z;j++)for(let i=0;i<Z;i++)if(d[(j*Z+i)*4+3]>10){if(i<x0)x0=i;if(i>x1)x1=i;if(j<y0)y0=j;if(j>y1)y1=j}
 if(x1<x0){x0=y0=0;x1=y1=Z-1}const w=x1-x0+1,h=y1-y0+1;
 // 크기는 킹 높이를 기준으로 맞춘다(폰은 작게, 킹은 크게 그대로)
 const kh=p.toLowerCase()==='k'?h:pieceSprite(isW(p)?'K':'k',m).h,sc=(m*.8)/kh;return SPR[key]={c,x:x0,y:y0,w,h,dw:w*sc,dh:h*sc}}
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
  for(let s=0;s<64;s++){const p=st.b[s];if(!p)continue;const sp=pieceSprite(p,m);x.drawImage(sp.c,sp.x,sp.y,sp.w,sp.h,((s&7)+.5)*m-sp.dw/2,((s>>3)+.5)*m-sp.dh/2+m*.03,sp.dw,sp.dh)}
  x.fillStyle='rgba(214,236,238,.55)';G.tg.forEach(t=>{x.beginPath();x.arc(((t.t&7)+.5)*m,((t.t>>3)+.5)*m,st.b[t.t]?m*.44:m*.12,0,7);st.b[t.t]?(x.strokeStyle='rgba(214,236,238,.6)',x.lineWidth=2,x.stroke()):x.fill()})},
 after(){const st=G.st,ms=this.legal(st);if(!ms.length){if(this.inCheck(st))return end(st.t==='b'?'w':'l'),true;return end('d'),true}
  const left=st.b.filter(Boolean);if(left.length===2)return end('d'),true;return false},
 async tap(px,py,W){const m=W/8,s=Math.floor(py/m)*8+Math.floor(px/m),st=G.st;if(st.t!=='w')return;
  const mv=G.tg.find(t=>t.t===s);if(mv){G.st=this.make(st,mv);G.last=mv;G.sel=-1;G.tg=[];this.draw();if(this.after())return;
   busy=true;talk(opp,'think');await sleep(60);await new Promise(r=>requestAnimationFrame(()=>setTimeout(r,R(250,500))));if(!alive())return;
   const a=this.ai();G.st=this.make(G.st,a);G.last=a;busy=false;this.draw();if(this.after())return;if(this.inCheck(G.st))talk(opp,'check');else if(Math.random()<.25)talk(opp,'idle');else if(opp==='navi')mascot('base');return}
  if(st.b[s]&&col(st.b[s])==='w'){G.sel=s;G.tg=this.legal(st).filter(t=>t.f===s)}else{G.sel=-1;G.tg=[]}this.draw()}};
// ---------- 칩 · 카드 공통 ----------
const COIN0=1000;
const coin=w=>w==='me'?(S.coin=S.coin==null?COIN0:S.coin):((S.coinOpp=S.coinOpp||{})[w]=S.coinOpp[w]==null?COIN0:S.coinOpp[w]);
const addCoin=(w,v)=>{if(w==='me')S.coin=coin('me')+v;else{coin(w);S.coinOpp[w]+=v}};
const fmtC=n=>Math.round(n).toLocaleString('ko-KR');
function refill(ids){for(const w of ids){if(coin(w)>=20)continue;if(w==='me'){S.coin=COIN0;talk('haru','…칩이 다 떨어지셨네요. 1,000개 다시 채워드릴게요.','worry')}else{S.coinOpp[w]=COIN0;talk(w,w==='haru'?'…저도 다시 채울게요.':'칩 다시 받아왔어요~','base')}}save()}
const SUIT=['♠','♥','♦','♣'],RK={11:'J',12:'Q',13:'K',14:'A'};
function deck(){const d=[];for(let s=0;s<4;s++)for(let r=2;r<=14;r++)d.push({r,s});for(let i=d.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[d[i],d[j]]=[d[j],d[i]]}return d}
function cardEl(c,hide){const e=el('span','pc'+(hide?' back':(c.s===1||c.s===2?' red':'')));if(!hide){e.append(el('b',null,RK[c.r]||String(c.r)),el('i',null,SUIT[c.s]+'︎'))}return e}
function cardsEl(cs,hideFrom){const w=el('span','pcs');cs.forEach((c,i)=>w.appendChild(cardEl(c,hideFrom!=null&&i>=hideFrom)));return w}
function betBar(vals,cb){const box=el('div','seg bets');vals.forEach(v=>{const b=el('button',G.bet===v?'on':'',fmtC(v));b.onclick=()=>{G.bet=v;cb()};box.appendChild(b)});return box}
const who=()=>opp==='trio'?['me','haru','navi']:['me',opp];
const nameOf=w=>w==='me'?(S.name||'나'):NAME[w];
function row(w,inner,sub,cls){const r=el('div','prow'+(cls?' '+cls:''));const h=el('div','ph');h.append(av(w),el('span','pn',nameOf(w)),el('span','pchip',fmtC(coin(w))));r.append(h);if(inner)r.appendChild(inner);if(sub!=null)r.appendChild(el('div','psub',sub));return r}
// ---------- 블랙잭 ----------
const bjv=cs=>{let t=0,a=0;cs.forEach(c=>{t+=c.r>=11&&c.r<=13?10:c.r===14?11:c.r;if(c.r===14)a++});while(t>21&&a){t-=10;a--}return t};
const isBJ=cs=>cs.length===2&&bjv(cs)===21;
const BJ={id:'blackjack',dom:true,
 init(){G={bet:G&&G.bet||50,phase:'bet',d:[],dl:[],P:{},msg:{}}},
 dealer(){return opp==='trio'?'haru':opp},
 players(){return opp==='trio'?['me','navi']:['me']},
 draw(){const S0=$('gStage');S0.innerHTML='';const dl=this.dealer();
  S0.appendChild(row(dl,G.dl.length?cardsEl(G.dl,G.phase==='play'?1:null):el('span','pcs ghost','딜러'),G.dl.length&&G.phase!=='play'?`${bjv(G.dl)}`:'', 'dealer'));
  const PW=el('div',this.players().length>1?'popps':'');S0.appendChild(PW);this.players().forEach(w=>{const h=G.P[w];PW.appendChild(row(w,h?cardsEl(h.c):null,h?`${bjv(h.c)}${h.bust?' · 버스트':''}${G.msg[w]?' · '+G.msg[w]:''} · 베팅 ${fmtC(h.bet)}`:'',G.turn===w&&G.phase==='play'?'on':''))});
  const pad=el('div','gpad col');
  if(G.phase==='bet'||G.phase==='done'){pad.appendChild(betBar([10,50,100,200],()=>this.draw()));const b=el('button','btn',G.phase==='done'?'다음 판':'딜');b.onclick=()=>this.deal();pad.appendChild(b)}
  else if(G.turn==='me'){const r=el('div','gpad');const h=G.P.me;[['히트',()=>this.hit()],['스탠드',()=>this.stand()]].forEach(([l,f])=>{const b=el('button','btn',l);b.onclick=f;r.appendChild(b)});
   if(h.c.length===2&&coin('me')>=h.bet*2){const b=el('button','btn ghost','더블');b.onclick=()=>this.dbl();r.appendChild(b)}pad.appendChild(r)}
  S0.appendChild(pad);$('gTip').textContent=G.phase==='play'&&G.turn==='me'?this.tip(G.P.me.c):G.phase==='bet'?'걸 칩을 고르고 딜을 누르세요':''},
 tip(c){const v=bjv(c),up=G.dl[0].r>=11&&G.dl[0].r<=13?10:G.dl[0].r===14?11:G.dl[0].r,soft=c.some(x=>x.r===14)&&c.reduce((a,x)=>a+(x.r>=11&&x.r<=13?10:x.r===14?1:x.r),0)+10===v;
  if(v<=11)return`추천: 히트 — ${v}이면 더 받아도 21을 안 넘어요`;if(soft&&v<=17)return'추천: 히트 — A를 1로 바꿀 수 있어서 안전해요';if(v>=17)return`추천: 스탠드 — ${v}면 충분히 높아요`;
  if(up<=6)return`추천: 스탠드 — 딜러 카드(${up})가 약해서 딜러가 넘기 쉬워요`;return`추천: 히트 — 딜러 카드(${up})가 강해서 ${v}로는 지기 쉬워요`},
 async deal(){if(busy)return;refill(['me',...this.players(),this.dealer()]);if(G.bet>coin('me'))G.bet=Math.max(10,Math.floor(coin('me')/10)*10);
  G.d=deck();G.dl=[G.d.pop(),G.d.pop()];G.P={};G.msg={};this.players().forEach(w=>{const bet=w==='me'?G.bet:Math.min(coin(w),pick([20,50,50,100]));G.P[w]={c:[G.d.pop(),G.d.pop()],bet,done:false}});
  G.phase='play';talk(this.dealer(),'deal');
  if(isBJ(G.dl)){G.phase='end';return this.settle()}
  G.order=this.players().slice();this.next()},
 next(){G.turn=G.order.find(w=>!G.P[w].done);if(G.turn&&isBJ(G.P[G.turn].c)){G.P[G.turn].done=true;G.msg[G.turn]='블랙잭!';return this.next()}
  this.draw();if(!G.turn)return this.dealerPlay();if(G.turn!=='me')this.aiPlay(G.turn)},
 hit(){const h=G.P.me;h.c.push(G.d.pop());if(bjv(h.c)>21){h.bust=h.done=true;talk(this.dealer(),'bust')}else if(bjv(h.c)===21)h.done=true;this.next()},
 stand(){G.P.me.done=true;this.next()},
 dbl(){const h=G.P.me;h.bet*=2;h.c.push(G.d.pop());if(bjv(h.c)>21)h.bust=true;h.done=true;this.next()},
 async aiPlay(w){busy=true;const h=G.P[w],up=G.dl[0].r>=11&&G.dl[0].r<=13?10:G.dl[0].r===14?11:G.dl[0].r;
  while(true){await sleep(700);if(!alive())return;const v=bjv(h.c);if(v>=17||(v>=13&&up<=6)||(w==='navi'&&v>=15&&Math.random()<.5))break;h.c.push(G.d.pop());this.draw();if(bjv(h.c)>21){h.bust=true;break}}
  h.done=true;busy=false;this.next()},
 async dealerPlay(){busy=true;G.phase='reveal';this.draw();const live=this.players().some(w=>!G.P[w].bust);
  while(live&&bjv(G.dl)<17){await sleep(650);if(!alive())return;G.dl.push(G.d.pop());this.draw()}busy=false;this.settle()},
 settle(){const dl=this.dealer(),dv=bjv(G.dl),dbj=isBJ(G.dl);let meNet=0;
  this.players().forEach(w=>{const h=G.P[w],v=bjv(h.c),bj=isBJ(h.c);let net;
   if(h.bust)net=-h.bet;else if(bj&&!dbj)net=Math.floor(h.bet*1.5);else if(dbj&&!bj)net=-h.bet;else if(dv>21||v>dv)net=h.bet;else if(v<dv)net=-h.bet;else net=0;
   addCoin(w,net);addCoin(dl,-net);G.msg[w]=net>0?`+${fmtC(net)}`:net<0?`-${fmtC(-net)}`:'무승부';if(w==='me')meNet=net});
  G.phase='done';G.turn=null;save();score();this.draw();talk(dl,meNet>0?'pwin':meNet<0?'plose':'push')}};
// ---------- 홀덤 ----------
const HN=['하이카드','원페어','투페어','트리플','스트레이트','플러시','풀하우스','포카드','스트레이트 플러시'];
function ev5(cs){const r=cs.map(c=>c.r).sort((a,b)=>b-a),fl=cs.every(c=>c.s===cs[0].s);let u=[...new Set(r)],st=0;
 if(u.length===5){if(u[0]-u[4]===4)st=u[0];else if(u[0]===14&&u[1]===5)st=5}
 const cnt={};r.forEach(x=>cnt[x]=(cnt[x]||0)+1);const g=Object.entries(cnt).map(([k,v])=>[v,+k]).sort((a,b)=>b[0]-a[0]||b[1]-a[1]);
 const k=(cat,arr)=>cat*1e10+arr.reduce((s,v,i)=>s+v*Math.pow(15,4-i),0);
 if(st&&fl)return k(8,[st]);if(g[0][0]===4)return k(7,[g[0][1],g[1][1]]);if(g[0][0]===3&&g[1][0]===2)return k(6,[g[0][1],g[1][1]]);if(fl)return k(5,r);if(st)return k(4,[st]);
 if(g[0][0]===3)return k(3,g.map(x=>x[1]));if(g[0][0]===2&&g[1][0]===2)return k(2,g.map(x=>x[1]));if(g[0][0]===2)return k(1,g.map(x=>x[1]));return k(0,r)}
function best7(cs){let b=0;const n=cs.length;for(let a=0;a<n;a++)for(let c=a+1;c<n;c++){const f=cs.filter((_,i)=>i!==a&&i!==c);if(f.length===5){const v=ev5(f);if(v>b)b=v}}return n===5?ev5(cs):b}
const hname=v=>HN[Math.floor(v/1e10)];
function equity(hole,board,nOpp,known){const used=new Set([...hole,...board].map(c=>c.r*4+c.s));let win=0;const N=160;
 for(let t=0;t<N;t++){const d=deck().filter(c=>!used.has(c.r*4+c.s));const bd=board.concat(d.splice(0,5-board.length));const me=best7(hole.concat(bd));let ok=1,tie=0;
  for(let o=0;o<nOpp;o++){const v=best7(d.splice(0,2).concat(bd));if(v>me){ok=0;break}if(v===me)tie=1}win+=ok?(tie?.5:1):0}return win/N}
const HE={id:'holdem',dom:true,
 init(){G={phase:'idle',btn:G&&G.btn!=null?G.btn:0,P:[],bd:[],pot:0,log:{}}},
 draw(){const S0=$('gStage');S0.innerHTML='';const show=G.phase==='show';
  const OP=el('div',G.P.length>2?'popps':'');S0.appendChild(OP);G.P.filter(p=>p.id!=='me').forEach(p=>OP.appendChild(row(p.id,p.h?cardsEl(p.h,show&&!p.fold?null:0):null,p.fold?'폴드':[G.log[p.id]||'',p.bet?`베팅 ${fmtC(p.bet)}`:''].filter(Boolean).join(' · '),G.turn===p.id?'on':p.fold?'out':'')));
  const mid=el('div','pboard');const bd=el('span','pcs');for(let i=0;i<5;i++)bd.appendChild(G.bd[i]&&i<this.shown()?cardEl(G.bd[i]):el('span','pc slot'));mid.append(bd,el('div','ppot',`팟 ${fmtC(G.pot+G.P.reduce((a,p)=>a+p.bet,0))}`));S0.appendChild(mid);
  const me=G.P.find(p=>p.id==='me');S0.appendChild(row('me',me&&me.h?cardsEl(me.h):null,me&&me.h?(G.phase==='show'?(G.log.me||''):[this.shown()>=3?hname(best7(me.h.concat(G.bd.slice(0,this.shown())))):'',me.bet?`베팅 ${fmtC(me.bet)}`:'',G.log.me||''].filter(Boolean).join(' · ')):'',G.turn==='me'?'on':''));
  const pad=el('div','gpad');
  if(G.phase!=='play'){const b=el('button','btn',G.phase==='idle'?'시작 (블라인드 10/20)':'다음 판');b.onclick=()=>this.hand();pad.appendChild(b)}
  else if(G.turn==='me'){const mx=Math.max(...G.P.map(p=>p.bet)),need=mx-me.bet,step=G.street<2?20:40;
   const f=el('button','btn ghost','폴드');f.onclick=()=>this.act('fold');const c=el('button','btn ghost',need?`콜 ${fmtC(Math.min(need,coin('me')))}`:'체크');c.onclick=()=>this.act('call');pad.append(f,c);
   if(G.raises<4&&coin('me')>need){const r=el('button','btn',`레이즈 +${step}`);r.onclick=()=>this.act('raise');pad.appendChild(r)}}
  S0.appendChild(pad);$('gTip').textContent=G.turn==='me'&&G.phase==='play'?this.tip(me):G.phase==='idle'?'시작을 누르면 카드 2장을 받아요':''},
 tip(me){const key=G.street+'|'+G.bd.length+'|'+me.h.map(c=>c.r*4+c.s).join();if(G.tipK!==key){G.tipK=key;G.eq=equity(me.h,G.bd.slice(0,this.shown()),this.alive().length-1)}
  const mx=Math.max(...G.P.map(p=>p.bet)),need=mx-me.bet,pot=G.pot+G.P.reduce((a,p)=>a+p.bet,0),e=Math.round(G.eq*100),odds=need/(pot+need||1);
  return`이길 확률 약 ${e}% · `+(G.eq>.62?'강한 편이에요. 레이즈해볼 만해요':need===0?'체크하고 다음 카드를 봐도 돼요':G.eq>odds+.05?'콜할 만해요':'접는(폴드) 게 나아요')},
 shown(){return[0,3,4,5][G.street]||0},
 hand(){if(busy)return;const ids=who();refill(ids);const n=ids.length;G.btn=(G.btn+1)%n;G.d=deck();G.P=ids.map(id=>({id,h:[G.d.pop(),G.d.pop()],bet:0,put:0,fold:false,allin:false,acted:false}));G.bd=[G.d.pop(),G.d.pop(),G.d.pop(),G.d.pop(),G.d.pop()];G.pot=0;G.log={};
  G.street=0;G.raises=0;G.phase='play';const sb=n===2?G.btn:(G.btn+1)%n,bb=(sb+1)%n;this.pay(G.P[sb],10);this.pay(G.P[bb],20);G.log[G.P[sb].id]='SB';G.log[G.P[bb].id]='BB';G.cur=(bb+1)%n;this.loop()},
 pay(p,v){v=Math.min(v,coin(p.id));addCoin(p.id,-v);p.bet+=v;p.put+=v;if(coin(p.id)<=0)p.allin=true},
 alive(){return G.P.filter(p=>!p.fold)},
 async loop(){for(;;){if(!alive())return;const live=this.alive();if(live.length===1)return this.win([live[0]]);
   const mx=Math.max(...G.P.map(p=>p.bet));const n=G.P.length;let p=null;for(let i=0;i<n;i++){const q=G.P[(G.cur+i)%n];if(!q.fold&&!q.allin&&(!q.acted||q.bet<mx)){p=q;G.cur=(G.cur+i)%n;break}}
   if(!p){if(!(await this.street()))return;continue}
   G.turn=p.id;this.draw();if(p.id==='me')return;busy=true;await sleep(R(600,1100));if(!alive())return;busy=false;this.ai(p)}},
 act(a){const p=G.P.find(q=>q.id==='me');if(G.turn!=='me')return;this.apply(p,a);this.loop()},
 apply(p,a){const mx=Math.max(...G.P.map(q=>q.bet)),step=G.street<2?20:40;p.acted=true;
  if(a==='fold'){p.fold=true;G.log[p.id]='폴드'}else if(a==='raise'&&G.raises<4){this.pay(p,mx-p.bet+step);G.raises++;G.P.forEach(q=>{if(q!==p)q.acted=false});G.log[p.id]=`레이즈`}
  else{const need=mx-p.bet;if(need){this.pay(p,need);G.log[p.id]='콜'}else G.log[p.id]='체크'}
  if(p.id!=='me'&&(a==='raise'||a==='fold'))talk(p.id,a==='raise'?'raise':'fold');G.cur=(G.P.indexOf(p)+1)%G.P.length},
 ai(p){const mx=Math.max(...G.P.map(q=>q.bet)),need=mx-p.bet,pot=G.pot+G.P.reduce((a,q)=>a+q.bet,0),eq=equity(p.h,G.bd.slice(0,this.shown()),this.alive().length-1),odds=need/(pot+need||1),loose=p.id==='navi'?.07:0;
  let a;if(eq>(p.id==='haru'?.62:.58)-loose&&G.raises<4&&Math.random()<.8)a='raise';else if(need===0)a=(Math.random()<.08+loose&&G.raises<4)?'raise':'call';else if(eq+loose>odds+.04)a='call';else a=Math.random()<loose?'call':'fold';
  this.apply(p,a)},
 async street(){G.P.forEach(p=>{G.pot+=p.bet;p.bet=0;p.acted=false});G.raises=0;
  const can=this.alive().filter(p=>!p.allin).length;if(G.street===3)return this.show(),false;
  G.street++;G.log={};const n=G.P.length;G.cur=(G.btn+1)%n;this.draw();
  if(can<=1){busy=true;await sleep(700);if(!alive())return false;busy=false;return this.street()}return true},
 show(){G.phase='show';G.turn=null;const live=this.alive(),sc=new Map(live.map(p=>[p,best7(p.h.concat(G.bd))]));
  // 사이드팟까지 나눠주기
  const lv=[...new Set(G.P.map(p=>p.put))].sort((a,b)=>a-b);let prev=0,won={};
  for(const L of lv){const slice=G.P.reduce((a,p)=>a+Math.max(0,Math.min(p.put,L)-prev),0);const el2=live.filter(p=>p.put>=L);if(!el2.length||!slice){prev=L;continue}
   const top=Math.max(...el2.map(p=>sc.get(p))),ws=el2.filter(p=>sc.get(p)===top);ws.forEach(p=>{addCoin(p.id,slice/ws.length);won[p.id]=(won[p.id]||0)+slice/ws.length});prev=L}
  live.forEach(p=>G.log[p.id]=hname(sc.get(p))+(won[p.id]?` · +${fmtC(won[p.id])}`:''));save();score();this.draw();
  const mw=won.me>0,w=Object.keys(won).find(k=>k!=='me');talk(w||(opp==='trio'?'haru':opp),mw?'plose':'pwin')},
 win(ws){const tot=G.pot+G.P.reduce((a,p)=>a+p.bet,0);G.P.forEach(p=>{p.bet=0});G.pot=0;addCoin(ws[0].id,tot);G.log[ws[0].id]=`+${fmtC(tot)}`;G.phase='won';G.turn=null;save();score();this.draw();
  const w=ws[0].id;talk(w==='me'?(opp==='trio'?'haru':opp):w,w==='me'?'plose':'pwin')}};
// ---------- 주사위 그림 ----------
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function die(n){const d=el('span','die');for(let i=0;i<9;i++){const p=document.createElement('i');if(PIPS[n].includes(i))p.className='on';d.appendChild(p)}return d}
// ---------- 요트 ----------
const YC=[['1','1'],['2','2'],['3','3'],['4','4'],['5','5'],['6','6'],['ch','초이스'],['4k','포카드'],['fh','풀하우스'],['ss','스몰 스트레이트'],['ls','라지 스트레이트'],['y','요트']];
const YPAR={1:2,2:5,3:8,4:11,5:14,6:17,ch:22,'4k':12,fh:16,ss:12,ls:9,y:8};
function ysc(c,d){const cnt=[0,0,0,0,0,0,0];d.forEach(v=>cnt[v]++);const sum=d.reduce((a,b)=>a+b,0),has=a=>a.every(v=>cnt[v]);
 if(/^[1-6]$/.test(c))return cnt[+c]*+c;if(c==='ch')return sum;if(c==='4k')return cnt.some(x=>x>=4)?sum:0;if(c==='fh')return(cnt.includes(3)&&cnt.includes(2))||cnt.includes(5)?sum:0;
 if(c==='ss')return has([1,2,3,4])||has([2,3,4,5])||has([3,4,5,6])?15:0;if(c==='ls')return has([1,2,3,4,5])||has([2,3,4,5,6])?30:0;return cnt.includes(5)?50:0}
const yup=s=>['1','2','3','4','5','6'].reduce((a,c)=>a+(s[c]||0),0);
const ytot=s=>Object.values(s).reduce((a,b)=>a+b,0)+(yup(s)>=63?35:0);
const YT={id:'yacht',dom:true,
 init(){G={bet:G&&G.bet||50,phase:'bet',sc:{},d:[1,2,3,4,5],hold:[0,0,0,0,0],rolls:0,turn:null,rnd:0}},
 draw(){const S0=$('gStage');S0.innerHTML='';const ids=who(),me=G.turn==='me'&&G.phase==='play';
  const dr=el('div','ydice');G.d.forEach((v,i)=>{const b=el('button','ydie'+(G.hold[i]?' hold':''));b.appendChild(die(v));b.disabled=!me||!G.rolls||busy;b.onclick=()=>{G.hold[i]^=1;this.draw()};dr.appendChild(b)});S0.appendChild(dr);
  const tb=el('table','ytab');const hr=document.createElement('tr');hr.appendChild(el('th',null,G.phase==='play'?`${G.rnd+1} / 12`:''));ids.forEach(w=>{const th=el('th',G.turn===w?'on':'');th.appendChild(av(w));hr.appendChild(th)});tb.appendChild(hr);
  const line=(lab,f,cls)=>{const tr=el('tr',cls||'');tr.appendChild(el('td','yl',lab));ids.forEach(w=>tr.appendChild(f(w)));tb.appendChild(tr)};
  const bestC=me&&G.rolls?this.pick('me'):null;YC.forEach(([c,l],i)=>{line(l,w=>{const s=G.sc[w]||{},td=el('td','');if(s[c]!=null)td.textContent=s[c];else if(w==='me'&&me&&G.rolls){td.textContent=ysc(c,G.d);td.className='pv'+(c===bestC?' best':'');td.onclick=()=>this.put('me',c)}return td},i===5?'ysep':i===6?'ysep2':'');
   if(i===5)line('보너스',w=>el('td','yb',yup(G.sc[w]||{})>=63?'+35':`${yup(G.sc[w]||{})}/63`),'ybon')});
  line('합계',w=>el('td','',String(ytot(G.sc[w]||{}))),'ysum');S0.appendChild(tb);
  const pad=el('div','gpad col');
  if(G.phase!=='play'){pad.appendChild(betBar([10,50,100,200],()=>this.draw()));const b=el('button','btn',G.phase==='done'?'다시 하기':'시작');b.onclick=()=>this.start();pad.appendChild(b)}
  else if(me){const r=el('div','gpad');if(G.rolls>0&&G.rolls<3){const k=el('button','btn ghost','추천대로 고정');k.onclick=()=>{G.hold=this.keep('me');this.draw()};r.appendChild(k)}const b=el('button','btn',G.rolls<3?`굴리기 ${G.rolls}/3`:'점수 칸을 골라주세요');b.disabled=G.rolls>=3||busy;b.onclick=()=>this.roll();r.appendChild(b);pad.appendChild(r)}
  S0.appendChild(pad);$('gTip').textContent=me?(G.rolls?`노란 칸 추천: ${YC.find(x=>x[0]===bestC)[1]} ${ysc(bestC,G.d)}점 · 다시 굴리려면 남길 주사위를 누르세요`:'굴리기를 눌러 시작하세요'):G.phase==='bet'?'걸 칩을 고르고 시작을 누르세요':''},
 start(){if(busy)return;refill(who());if(G.bet>coin('me'))G.bet=Math.max(10,Math.floor(coin('me')/10)*10);G.sc={};who().forEach(w=>G.sc[w]={});G.rnd=0;G.phase='play';G.order=who();this.begin('me');talk(opp==='trio'?'haru':opp,opp==='navi'?'요트! 저부터… 아니 먼저 굴려요~':'열두 칸을 채우면 끝이에요. 먼저 굴리세요.','base')},
 begin(w){G.turn=w;G.rolls=0;G.hold=[0,0,0,0,0];this.draw();if(w!=='me')this.ai(w)},
 async roll(){if(busy||G.rolls>=3)return;busy=true;const t0=Date.now();while(Date.now()-t0<450){G.d=G.d.map((v,i)=>G.hold[i]?v:1+Math.random()*6|0);this.draw();await sleep(60);if(!alive())return}
  G.d=G.d.map((v,i)=>G.hold[i]?v:1+Math.random()*6|0);G.rolls++;busy=false;this.draw();if(G.turn!=='me'&&ysc('y',G.d)===50)talk(G.turn,'ccbig')},
 put(w,c){const s=G.sc[w];if(s[c]!=null)return;s[c]=ysc(c,G.d);if(w!=='me'&&s[c]===50&&c==='y')talk(w,'ccbig');
  const i=G.order.indexOf(w),nx=G.order[(i+1)%G.order.length];if(i===G.order.length-1)G.rnd++;if(G.rnd>=12)return this.finish();this.begin(nx)},
 keep(w){const cnt=[0,0,0,0,0,0,0];G.d.forEach(v=>cnt[v]++);const s=G.sc[w],open=c=>s[c]==null;
  const run=[[1,2,3,4,5],[2,3,4,5,6],[1,2,3,4],[2,3,4,5],[3,4,5,6]].find(r=>r.filter(v=>cnt[v]).length>=r.length-1&&(open('ls')||open('ss'))&&r.filter(v=>cnt[v]).length>=4);
  if(run&&!cnt.some(x=>x>=3)){const used={};return G.d.map(v=>run.includes(v)&&!used[v]?(used[v]=1):0)}
  let best=6;for(let v=6;v>=1;v--)if(cnt[v]>cnt[best])best=v;if(cnt[best]===1)return G.d.map(v=>v>=5?1:0);return G.d.map(v=>v===best?1:0)},
 pick(w){const s=G.sc[w],open=YC.map(x=>x[0]).filter(c=>s[c]==null);let best=open[0],bv=-1e9;
  open.forEach(c=>{let v=ysc(c,G.d)-YPAR[c];if(/^[1-6]$/.test(c)&&yup(s)<63)v+=ysc(c,G.d)>=3*+c?4:0;if(w==='navi')v+=Math.random()*8;if(v>bv){bv=v;best=c}});return best},
 async ai(w){busy=true;await sleep(500);if(!alive())return;busy=false;
  for(let r=0;r<3;r++){await this.roll();if(!alive())return;await sleep(500);if(!alive())return;
   const d=G.d,c=this.pick(w);if(r===2||(ysc(c,d)>=YPAR[c]+8&&ysc(c,d)>0)||ysc('y',d)===50)break;G.hold=w==='navi'&&Math.random()<.25?G.d.map(()=>Math.random()<.5?1:0):this.keep(w);this.draw();await sleep(400);if(!alive())return}
  this.put(w,this.pick(w))},
 finish(){G.phase='done';G.turn=null;const ids=who(),T={};ids.forEach(w=>T[w]=ytot(G.sc[w]));const top=Math.max(...ids.map(w=>T[w])),ws=ids.filter(w=>T[w]===top);
  if(ws.length===1){const W=ws[0];ids.filter(w=>w!==W).forEach(w=>{const p=Math.min(coin(w),G.bet);addCoin(w,-p);addCoin(W,p)})}
  save();score();this.draw();talk(ws.length>1?(opp==='trio'?'haru':opp):ws[0]==='me'?(opp==='trio'?'haru':opp):ws[0],ws.length>1?'push':ws[0]==='me'?'plose':'pwin')}};
// ---------- 마작 (간이: 울기 없이 쯔모·론) ----------
// 패 번호: 0-8 만, 9-17 통, 18-26 삭, 27-30 동남서북, 31-33 백발중
const MJN=['東','南','西','北','白','發','中'],MJS=['萬','筒','索'];
function mjEl(t,cls){const e=el('span','mj'+(cls?' '+cls:''));if(t<27){e.classList.add('s'+Math.floor(t/9));e.append(el('b',null,String(t%9+1)),el('i',null,MJS[Math.floor(t/9)]))}else{const h=MJN[t-27];e.classList.add('h',t===31?'w':t===32?'g':t===33?'r':'k');e.append(el('b',null,t===31?'':h))}return e}
const mjc=h=>{const c=Array(34).fill(0);h.forEach(t=>c[t]++);return c};
function mjShanten(c){let best=6;{let p=0,k=0;for(let i=0;i<34;i++){if(c[i]>=2)p++;if(c[i])k++}best=6-p+Math.max(0,7-k)}
 const rec=(i,m,t,p)=>{while(i<34&&!c[i])i++;if(i>=34){const s=8-2*m-Math.min(t,4-m)-p;if(s<best)best=s;return}
  if(c[i]>=3){c[i]-=3;rec(i,m+1,t,p);c[i]+=3}
  if(i<27&&i%9<7&&c[i+1]&&c[i+2]){c[i]--;c[i+1]--;c[i+2]--;rec(i,m+1,t,p);c[i]++;c[i+1]++;c[i+2]++}
  if(c[i]>=2){if(!p){c[i]-=2;rec(i,m,t,1);c[i]+=2}if(m+t<4){c[i]-=2;rec(i,m,t+1,p);c[i]+=2}}
  if(m+t<4&&i<27&&i%9<8&&c[i+1]){c[i]--;c[i+1]--;rec(i,m,t+1,p);c[i]++;c[i+1]++}
  if(m+t<4&&i<27&&i%9<7&&c[i+2]){c[i]--;c[i+2]--;rec(i,m,t+1,p);c[i]++;c[i+2]++}
  c[i]--;rec(i,m,t,p);c[i]++};
 rec(0,0,0,0);return best}
const mjWin=h=>h.length%3===2&&mjShanten(mjc(h))===-1;
function mjYaku(h,tsumo){const c=mjc(h),y=[];let han=1;y.push('화료');if(tsumo){han++;y.push('쯔모')}
 const suits=new Set(h.filter(t=>t<27).map(t=>Math.floor(t/9))),hon=h.some(t=>t>=27);
 if(h.every(t=>t<27&&t%9>0&&t%9<8)){han++;y.push('탕야오')}
 if(suits.size===1&&!hon){han+=5;y.push('청일색')}else if(suits.size===1&&hon){han+=2;y.push('혼일색')}else if(suits.size===0){han+=5;y.push('자일색')}
 const pairs=c.filter(x=>x===2).length;if(pairs===7){han+=2;y.push('치또이츠')}else if(c.every(x=>x===0||x===3||x===2)&&pairs===1){han+=2;y.push('또이또이')}
 [31,32,33].forEach(t=>{if(c[t]>=3){han++;y.push(MJN[t-27]+' 삼원패')}});return{han,y}}
function mjBest(h,smart){const c=mjc(h),cand=[...new Set(h)];let best=null,bs=99,bu=-1;
 for(const t of cand){c[t]--;const s=mjShanten(c);let u=0;if(smart&&s<=bs){for(let x=0;x<34;x++){if(c[x]>=4||(G.sanma&&x>=1&&x<=7))continue;c[x]++;if(mjShanten(c)<s)u+=4-c[x]+1;c[x]--}}else u=Math.random()*3+(t>=27?2:0);
  c[t]++;if(s<bs||(s===bs&&u>bu)){bs=s;bu=u;best=t}}return{t:best,s:bs}}
const MJ={id:'mahjong',dom:true,
 init(){G={bet:G&&G.bet||10,phase:'bet',H:{},P:{},wall:[],turn:null,sel:-1,last:null,res:null}},
 draw(){const S0=$('gStage');S0.innerHTML='';const ids=who(),play=G.phase!=='bet';
  const OP=el('div',ids.length>2?'popps':'');S0.appendChild(OP);
  ids.filter(w=>w!=='me').forEach(w=>{const pond=el('div','mjp');(G.P[w]||[]).forEach((t,i,a)=>pond.appendChild(mjEl(t,'sm'+(G.last&&G.last.w===w&&i===a.length-1?' last':''))));
   const reveal=G.phase==='done'&&G.res&&G.res.w===w;const hand=reveal?(()=>{const r=el('div','mjh sm');G.H[w].slice().sort((a,b)=>a-b).forEach(t=>r.appendChild(mjEl(t,'sm')));return r})():null;
   const r=row(w,play?pond:null,play?(reveal?G.res.txt:`패 ${G.H[w]?G.H[w].length:13}장`):'',G.turn===w?'on':'');if(hand)r.insertBefore(hand,r.children[1]);OP.appendChild(r)});
  if(play)S0.appendChild(el('div','ppot',`남은 패 ${G.wall.length}`+(G.res&&G.res.w==='draw'?' · 유국':'')));
  const mine=el('div','');if(play){const pond=el('div','mjp');(G.P.me||[]).forEach(t=>pond.appendChild(mjEl(t,'sm')));mine.appendChild(pond)}
  const meRow=row('me',mine,G.res&&G.res.w==='me'?G.res.txt:'',G.turn==='me'?'on':'');S0.appendChild(meRow);
  if(play&&G.H.me){const hr=el('div','mjh');const h=G.H.me,n=h.length,drawn=n%3===2?G.drawn:null;let skip=drawn!=null;
   const order=h.map((t,i)=>i).filter(i=>!(skip&&i===h.lastIndexOf(drawn)&&(skip=false,true)));order.sort((a,b)=>h[a]-h[b]);if(drawn!=null)order.push(h.lastIndexOf(drawn));
   const tipT=G.turn==='me'&&G.phase==='play'&&n%3===2&&!mjWin(h)?(G.tipK===h.join()?G.tipT:(G.tipK=h.join(),G.tipR=mjBest(h,true),G.tipT=G.tipR.t)):null;let tipDone=false;
   order.forEach((i,k)=>{const isTip=tipT!=null&&!tipDone&&h[i]===tipT&&(tipDone=true);const b=mjEl(h[i],(G.sel===i?'sel':'')+(isTip?' tip':'')+(drawn!=null&&k===order.length-1?' drawn':''));b.onclick=()=>this.tap(i);hr.appendChild(b)});meRow.appendChild(hr)}
  const pad=el('div','gpad col');
  if(G.phase==='bet'||G.phase==='done'){pad.appendChild(betBar([10,20,50,100],()=>this.draw()));const b=el('button','btn',G.phase==='done'?'다음 판':'시작');b.onclick=()=>this.start();pad.appendChild(b)}
  else if(G.phase==='ron'){const r=el('div','gpad');const a=el('button','btn','론!');a.onclick=()=>this.win('me',false,G.last.w);const p=el('button','btn ghost','넘기기');p.onclick=()=>{G.phase='play';this.after(G.last.w)};r.append(a,p);pad.appendChild(r)}
  else if(G.turn==='me'){const r=el('div','gpad');if(mjWin(G.H.me)){const t=el('button','btn','쯔모!');t.onclick=()=>this.win('me',true);r.appendChild(t)}
   const d=el('button','btn ghost',G.sel>=0?'이 패 버리기':'버릴 패를 누르세요');d.disabled=G.sel<0;d.onclick=()=>this.discard('me',G.sel);r.appendChild(d);pad.appendChild(r)}
  S0.appendChild(pad);let tp='';if(G.phase==='ron')tp='남이 버린 패로 완성됐어요! 론을 누르면 이겨요';else if(G.turn==='me'&&G.phase==='play'&&G.H.me){if(mjWin(G.H.me))tp='완성! 쯔모를 누르면 이겨요';else{const s=G.tipR&&G.tipK===G.H.me.join()?G.tipR.s:mjShanten(mjc(G.H.me.slice(0,13)));tp=(s===0?'텐파이 — 이걸 버리면 한 장만 더 오면 완성이에요':`완성까지 패를 ${s+1}번쯤 더 바꿔야 해요`)+' · 노란 테두리가 버리기 추천'}}else if(G.phase==='bet')tp='걸 칩을 고르고 시작을 누르세요';$('gTip').textContent=tp},
 start(){if(busy)return;refill(who());if(G.bet>coin('me'))G.bet=Math.max(10,Math.floor(coin('me')/10)*10);
  const w=[];for(let t=0;t<34;t++)for(let k=0;k<4;k++)w.push(t);for(let i=w.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[w[i],w[j]]=[w[j],w[i]]}
  G.wall=w;G.H={};G.P={};G.res=null;G.last=null;G.sel=-1;G.order=who();G.order.forEach(id=>{G.H[id]=G.wall.splice(0,13);G.P[id]=[]});G.phase='play';
  talk(opp==='trio'?'haru':opp,opp==='navi'?'마작이다! 먼저 시작해요~':'몸통 넷에 머리 하나, 아니면 일곱 쌍이에요. 먼저 하세요.','base');this.turn('me')},
 turn(w){if(!G.wall.length){G.phase='done';G.turn=null;G.res={w:'draw',txt:''};this.draw();talk(opp==='trio'?'haru':opp,'push');return}
  G.turn=w;const t=G.wall.pop();G.H[w].push(t);G.drawn=t;G.sel=-1;this.draw();if(w!=='me')this.ai(w)},
 tap(i){if(G.turn!=='me'||G.phase!=='play'||busy)return;if(G.sel===i)return this.discard('me',i);G.sel=i;this.draw()},
 discard(w,i){const t=G.H[w].splice(i,1)[0];G.P[w].push(t);G.last={w,t};G.sel=-1;G.drawn=null;
  for(const o of G.order){if(o===w)continue;const h=G.H[o].concat(t);if(!mjWin(h))continue;if(o==='me'){G.phase='ron';G.turn=null;this.draw();return}this.win(o,false,w);return}
  this.after(w)},
 after(w){const i=G.order.indexOf(w);this.draw();setTimeout(()=>{if(alive()&&G.phase==='play')this.turn(G.order[(i+1)%G.order.length])},w==='me'?250:350)},
 async ai(w){busy=true;await sleep(R(600,1000));if(!alive())return;busy=false;const h=G.H[w];if(mjWin(h))return this.win(w,true);
  let best=mjBest(h,w==='haru').t;if(w==='navi'&&Math.random()<.15)best=pick([...new Set(h)]);this.discard(w,h.indexOf(best))},
 win(w,tsumo,from){const h=tsumo?G.H[w]:G.H[w].concat(G.last.t);G.H[w]=h;const{han,y}=mjYaku(h,tsumo),amt=G.bet*han;let got=0;
  (tsumo?G.order.filter(o=>o!==w):[from]).forEach(o=>{const p=Math.min(coin(o),amt);addCoin(o,-p);got+=p});addCoin(w,got);
  G.res={w,txt:`${tsumo?'쯔모':'론'} · ${y.join(' · ')} · ${han}판 · +${fmtC(got)}`};G.phase='done';G.turn=null;save();score();this.draw();
  const sp=w==='me'?(tsumo?(opp==='trio'?'haru':opp):from):w;talk(sp,w==='me'?'plose':'pwin')}};
// ---------- 화면 ----------
const alive=()=>G&&G.seq===seq&&$('game').classList.contains('open');
let mode='duo',duoOpp='haru';
function score(){if(cur&&!MOD[cur.id].dom){const r=recOf(cur.id,opp);$('gScore').textContent=`${r.w}승 ${r.l}패${r.d?` ${r.d}무`:''}`}else $('gScore').textContent=`칩 ${fmtC(coin('me'))}`}
function recTxt(g){if(g.bet)return'칩을 걸고';const r=recOf(g.id,opp);return r.w+r.l+r.d?`${r.w}승 ${r.l}패`+(r.d?` ${r.d}무`:''):'아직 안 해봤어요'}
function catOn(){$('app').classList.toggle('withcat',opp==='navi'||opp==='trio');requestAnimationFrame(()=>{mPlace();setTimeout(mPlace,380)})}
function seg(id,list,curV,cb){const O=$(id);O.innerHTML='';list.forEach(([v,l])=>{const b=el('button',curV===v?'on':'',l);b.onclick=()=>cb(v);O.appendChild(b)})}
function hub(){cur=null;G=null;seq++;busy=false;opp=mode==='trio'?'trio':duoOpp;$('gTitle').textContent='놀이';$('gBack').hidden=true;$('gHelpB').hidden=true;$('gPlay').hidden=true;$('gHub').hidden=false;score();
 seg('gMode',[['duo','둘이서'],['trio','셋이서']],mode,v=>{mode=v;hub()});$('gOpp').hidden=mode!=='duo';
 if(mode==='duo')seg('gOpp',[['haru','하루랑'],['navi','나비랑']],duoOpp,v=>{duoOpp=v;hub()});
 const C=$('gCards');C.innerHTML='';GAMES.filter(g=>mode==='trio'?g.trio:g.duo).forEach(g=>{const b=el('button','gcard');b.innerHTML=`<svg viewBox="0 0 24 24">${g.icon}</svg>`;b.append(el('b',null,g.name),el('small',null,g.sub),el('span','rec',recTxt(g)));b.onclick=()=>start(g.id);C.appendChild(b)});
 $('gLine').textContent=mode==='trio'?'셋이서 뭐 할까요? …칩은 봐주지 않아요.':opp==='navi'?'나비랑 뭐 하고 놀까요?':'…뭐 하고 싶으세요?';av(mode==='trio'?'haru':opp,$('gAv'));if(opp==='navi'||opp==='trio')mascot('happy');catOn()}
function start(id){cur=MOD[id];$('gTitle').textContent=GAMES.find(g=>g.id===id).name;$('gBack').hidden=false;$('gHub').hidden=true;$('gPlay').hidden=false;
 $('gBoard').hidden=!!cur.dom;$('gStage').hidden=!cur.dom;$('gLvW').hidden=!!cur.dom;$('gPlay').querySelector('.gbtns').hidden=!!cur.dom;if(!cur.dom){const c=$('gBoard');c.style.height=c.clientWidth*cur.aspect+'px'}
 $('gLvW').hidden=true;
 const H=$('gHelp');H.innerHTML=HELP[id].map(t=>`<p>${t}</p>`).join('');S.ruleSeen=S.ruleSeen||{};H.hidden=!!S.ruleSeen[id];S.ruleSeen[id]=1;save();$('gHelpB').hidden=false;$('gHelpB').classList.toggle('on',!H.hidden);
 $('gTip').textContent=id==='chess'?'내 말(흰색)을 누르면 갈 수 있는 칸이 보여요':'';
 fresh();catOn()}
const INTRO={blackjack:{haru:'제가 딜러예요. 걸 칩을 고르고 딜을 누르세요.',navi:'제가 딜러할게요~ 칩 고르고 딜!'},holdem:{haru:'블라인드 10, 20이에요. …시작할까요?',navi:'포커다! 저 잘해요~'},yacht:{haru:'점수가 제일 높은 사람이 칩을 가져가요. 걸 칩을 고르세요.',navi:'요트 하자! 칩 고르고 시작~'},mahjong:{haru:'울기 없이 쯔모·론만 해요. 판 수 × 건 칩만큼 받아요.',navi:'마작! 저 패 잘 섞어요~'}};
function fresh(){seq++;busy=false;cur.init();G.seq=seq;G.over=false;score();cur.draw();
 if(cur.dom){const sp=opp==='trio'?'haru':opp;talk(sp,INTRO[cur.id][sp],'base');if(opp==='trio')mascot('happy')}else talk(opp,'start')}
function open(){if(opening)return;mode=S.gameMode||'duo';duoOpp=S.gameOpp||(pub?'navi':'haru');lv=1;rec();$('app').classList.add('gaming');$('game').classList.add('open');hub()}
function close(){seq++;busy=false;S.gameMode=mode;S.gameOpp=duoOpp;save();$('app').classList.remove('gaming','withcat');$('game').classList.remove('open');if(!pub)setMood(idle())}
const MOD={chess:CH,omok:OM,blackjack:BJ,holdem:HE,yacht:YT,mahjong:MJ};
$('gBack').onclick=hub;$('gHelpB').onclick=()=>{const H=$('gHelp');H.hidden=!H.hidden;$('gHelpB').classList.toggle('on',!H.hidden)};$('gClose').onclick=close;$('gNew').onclick=()=>cur&&fresh();
$('gBoard').addEventListener('click',e=>{if(!cur||cur.dom||!G||G.over||busy)return;const r=e.currentTarget.getBoundingClientRect();cur.tap(e.clientX-r.left,e.clientY-r.top,r.width)});
document.querySelectorAll('nav button[data-g]').forEach(b=>b.onclick=open);
window.addEventListener('resize',()=>{if(!$('game').classList.contains('open'))return;if(cur&&!cur.dom){const c=$('gBoard');c.style.height=c.clientWidth*cur.aspect+'px';cur.draw()}mPlace()});
window.gameOpen=open;
if(window.ResizeObserver)new ResizeObserver(()=>{if($('game').classList.contains('open'))mPlace()}).observe($('game'));
})();
