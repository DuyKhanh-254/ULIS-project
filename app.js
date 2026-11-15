import {roles, personas, quizQuestions, levels, quickScenarios, reversals, stageRoleMap} from './data.js';

const ROOT=document.getElementById('app');
const TURN_SECONDS=120;
const fmtTime=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
const TOAST=document.getElementById('toast');
const STORE='teamcraft-redesign-v3';
let saved={}; try{saved=JSON.parse(localStorage.getItem(STORE)||'{}')}catch{}
let extraUnlocked=[]; try{extraUnlocked=JSON.parse(localStorage.getItem('unlockedStages')||'[]')}catch{}
let extraLevels=[]; try{extraLevels=JSON.parse(localStorage.getItem('unlockedLevels')||'[]')}catch{}
const initialStages=Array.from(new Set(['1:0',...(saved.unlockedStages||[]),...(Array.isArray(extraUnlocked)?extraUnlocked:[])]));
const initialLevels=Array.from(new Set([1,...(saved.unlockedLevels||[]),...(Array.isArray(extraLevels)?extraLevels:[])]));
if(initialStages.includes('1:4')||(saved.done&&saved.done.some(k=>k.startsWith('1:4:')))){
  if(!initialLevels.includes(2))initialLevels.push(2);
  if(!initialStages.includes('2:0'))initialStages.push('2:0');
}
if(initialStages.includes('2:5')||(saved.done&&saved.done.some(k=>k.startsWith('2:5:')))){
  if(!initialLevels.includes(3))initialLevels.push(3);
}
const state={screen:'home',level:1,stage:0,role:saved.role||'leader',outfit:saved.outfit||'blue',persona:saved.persona||null,quizAnswers:[],quizIndex:0,quizTime:60,gameTime:TURN_SECONDS,game:null,done:saved.done||[],wallet:saved.wallet||[],unlockedStages:initialStages,unlockedLevels:initialLevels,hearts:typeof saved.hearts==='number'?saved.hearts:60,coins:typeof saved.coins==='number'?saved.coins:200};
let clock=null;
const allOutfits=[
 {id:'blue',name:'Xanh ULIS',cost:0},{id:'rose',name:'Hồng pastel',cost:0},{id:'leaf',name:'Xanh lá',cost:0},{id:'violet',name:'Tím nhạt',cost:0},{id:'gold',name:'Vàng mật ong',cost:0},
 {id:'vitamin',name:'Cam Vitamin',cost:150},{id:'crimson',name:'Đỏ Nhiệt Huyết',cost:180},{id:'teal',name:'Ngọc Lam Biển',cost:220},{id:'neon',name:'Hồng Neon',cost:250},{id:'noir',name:'Đen Cá Tính',cost:300},{id:'silver',name:'Bạc Ánh Kim',cost:350},
];
const freeOutfitIds=allOutfits.filter(o=>!o.cost).map(o=>o.id);
state.ownedOutfits=Array.from(new Set([...freeOutfitIds,...(Array.isArray(saved.ownedOutfits)?saved.ownedOutfits:[])]));
const safe=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const role=id=>roles.find(r=>r.id===id)||roles[0];
const level=id=>levels.find(l=>l.id===Number(id))||levels[0];
function save(){try{localStorage.setItem(STORE,JSON.stringify({role:state.role,outfit:state.outfit,persona:state.persona,done:state.done,wallet:state.wallet,unlockedStages:state.unlockedStages,unlockedLevels:state.unlockedLevels,hearts:state.hearts,coins:state.coins,ownedOutfits:state.ownedOutfits}));localStorage.setItem('unlockedStages',JSON.stringify(state.unlockedStages));localStorage.setItem('unlockedLevels',JSON.stringify(state.unlockedLevels))}catch{}}
const HEART_DELTA={good:8,mid:2,bad:-6};
function applyReward(type,coinGain){const delta=HEART_DELTA[type]||0;state.hearts=Math.max(0,Math.min(100,state.hearts+delta));state.coins+=coinGain;save();const bits=[];if(delta)bits.push(`${delta>0?'+':''}${delta} Thấu cảm`);if(coinGain)bits.push(`+${coinGain} xu`);if(bits.length)toast(bits.join(' • '),true)}
const isLevelUnlocked=lvlId=>{const n=Number(lvlId);return n===1||state.unlockedLevels.includes(n)};
const isStageUnlocked=(lvlId,stgIdx)=>{if(!isLevelUnlocked(lvlId))return false;if(stgIdx===0)return true;return state.unlockedStages.includes(`${lvlId}:${stgIdx}`)};
function unlockLevel(lvlId){const n=Number(lvlId);if(!state.unlockedLevels.includes(n)){state.unlockedLevels.push(n)}unlockStage(n,0);save()}
function unlockStage(lvlId,stgIdx){const key=`${lvlId}:${stgIdx}`;if(!state.unlockedStages.includes(key)){state.unlockedStages.push(key);save()}}
const icon=(name,cls='')=>`<img class="icon ${cls}" src="assets/ui/${name}.svg" alt="">`;
const sprite=(id,pose='idle')=>`assets/characters/${id}_${pose}.svg`;
const avatar=(id,cl='',pose='idle')=>`<img class="character ${cl}" src="${sprite(id,pose)}" alt="">`;
const player=(pose='idle',cl='')=>avatar(state.role,cl,pose);
const outfitted=(cl='')=>`<img class="character ${cl}" src="assets/characters/${state.role}_outfit_${state.outfit}.svg" alt="">`;
const logo=(sm=false)=>`<div class="brand ${sm?'brand-sm':''}"><span>TEAM</span><span>CRAFT</span></div>`;
const shell=(cls,html)=>`<main class="device"><section class="page ${cls}">${html}</section></main>`;
const btn=(label,action='map',variant='green',extras='')=>`<button class="game-btn ${variant}" data-go="${action}" ${extras}>${label}</button>`;
const topbar=(title,go='map',showHome=false)=>`<header class="page-top"><button class="circle-action" data-go="${go}" aria-label="Quay lại">${icon('back')}</button><h1>${safe(title)}</h1>${showHome?`<button class="circle-action" data-go="home" aria-label="Trang chủ">${icon('home')}</button>`:`<div class="page-top-spacer"></div>`}</header>`;
function toast(text,reward=false){TOAST.textContent=text;TOAST.classList.toggle('reward',reward);TOAST.classList.add('on');clearTimeout(TOAST._t);TOAST._t=setTimeout(()=>TOAST.classList.remove('on'),2400)}
function stopClock(){if(clock!==null)clearInterval(clock);clock=null}
function route(screen){stopClock();state.screen=screen;render();window.scrollTo(0,0)}

function home(){return shell('home-page',`
<header class="home-head"><div class="logo-mark">${icon('spark')} TEAM-CRAFT</div><div class="home-head-right"><button class="head-action" data-go="shop">${icon('gift')} Shop</button><button class="head-action" data-go="wallet">${icon('book')} Ví (${state.wallet.length})</button></div></header>
<section class="home-hero">
  <div class="sparkle one"></div><div class="sparkle two"></div>
  <div class="home-ribbon">WEBGAME MÔ PHỎNG KỸ NĂNG LÀM VIỆC NHÓM</div>
  ${logo()}
  <p class="hero-tagline">Mọi mắt xích đều tạo nên chiến thắng!</p>
  <div class="character-group"><div class="podium podium-left"></div><div class="podium podium-right"></div>
    ${avatar('mediator','home-person left','walk_a')}${outfitted('home-person lead')}${avatar('doer','home-person right','talk')}
  </div>
  <div class="talk-label">Chọn cách ứng xử. Xem điều gì sẽ xảy ra!</div>
</section>
<section class="home-cta"><button class="game-btn green large" data-go="map">${icon('play')} BẮT ĐẦU CHƠI</button>
<button class="game-btn pale large" data-action="start-quiz">${icon('star')} LÀM QUIZ 60 GIÂY</button></section>
<div class="home-feature-strip"><div>${icon('team')}<span>5 VAI TRÒ</span></div><div>${icon('rotate')}<span>ĐẢO VAI</span></div><div>${icon('book')}<span>BÀI HỌC</span></div></div>
<p class="footer-note">Phiên bản trải nghiệm • 2 ải đầu có gameplay mẫu</p>
`)}

const mapNPCLayout=[
 ['student-a',14.5,30.5,'idle','kid-a'],['student-c',82,35.5,'talk','kid-b'],
 ['student-b',14.2,56.3,'idle','kid-c'],['student-a',86,63.5,'walk_a','kid-d']
];
function map(){const nodes=[
 {n:5,x:49,y:24.6,cap:'BOSS CUỐI',name:'Dự Án Công Sở',theme:'boss'},
 {n:4,x:65,y:38.2,cap:'CĂNG THẲNG',name:'Trùm Free-rider',theme:'danger'},
 {n:3,x:43,y:51,cap:'TĂNG ÁP LỰC',name:'Nước Đến Chân Mới Nhảy',theme:'orange'},
 {n:2,x:52,y:65.4,cap:'TRUNG BÌNH',name:'Người Lạ Ơi',theme:'blue'},
 {n:1,x:31,y:79.7,cap:'DỄ',name:'Nhóm Bạn Thân',theme:'green'}];
const playableLevels=state.unlockedLevels.filter(n=>n<=2);
const highestPlayableLevel=playableLevels.length?Math.max(...playableLevels):1;
return shell('map-page',`
<img class="map-scene" src="assets/campus-map.webp" alt="Khuôn viên trường học phong cách hoạt hình, con đường đi qua năm ải">
<div class="map-hud"><div class="map-hud-left"><button class="circle-action" data-go="home" aria-label="Quay lại trang chủ" title="Quay lại trang chủ">${icon('home')}</button><button class="map-logo" data-go="home" aria-label="Trang chủ">${logo(true)}</button></div>
  <div class="resources"><span>${icon('heart')} <b>${state.hearts}</b></span><span>${icon('coin')} <b>${state.coins}</b></span></div></div>
${mapNPCLayout.map(([name,x,y,pose,id])=>`<img class="map-npc ${id}" src="${sprite(name,pose)}" style="left:${x}%;top:${y}%" alt="" loading="lazy">`).join('')}
${nodes.map(n=>{
  const unlocked=isLevelUnlocked(n.n);
  const isDev=n.n>2;
  const themeIcon={1:'check',2:'chat',3:'clock',4:'bolt',5:'skull'}[n.n];
  const needsLockBadge=!unlocked&&!isDev; // chỉ Ải 2 có thể "mở khóa dần", Ải 3-5 là "chưa cập nhật"
  const orbIcon=`${icon(themeIcon)}${needsLockBadge?`<span class="lock-badge">${icon('lock')}</span>`:''}`;
  let labelText='CHƯA CẬP NHẬT';
  if(!unlocked){
    labelText=n.n<=2?'CHƯA MỞ KHÓA':'CHƯA CẬP NHẬT';
  } else {
    labelText=isDev?(n.n===3?'ĐANG PHÁT TRIỂN':'CHƯA CẬP NHẬT'):n.cap;
  }
  const devClass=isDev?(unlocked?'is-dev is-unlocked':'is-dev is-locked'):(unlocked?'is-unlocked':'is-locked');
  return `<button class="level-spot ${n.theme} ${devClass}" style="left:${n.x}%;top:${n.y}%" data-level="${n.n}" aria-label="Ải ${n.n}: ${n.name}">
 <span class="level-orb">${orbIcon}</span>
 <span class="level-copy"><b>ẢI ${n.n}: ${n.name}</b><small class="${isDev&&unlocked?'coming-badge':''}">${labelText}</small></span></button>`;
}).join('')}
<nav class="map-dock"><button data-go="roles" class="dock-small">${icon('team')}<span>Vai trò</span></button>
<button class="dock-play" data-level="${highestPlayableLevel}">${icon('play')}<strong>CHƠI NGAY</strong></button>
<button data-go="wallet" class="dock-small">${icon('book')}<span>Nhiệm vụ</span></button></nav>
`)}

function rolesView(){const r=role(state.role);return shell('interior-page',`${topbar('Chọn vai trò','map')}
<div class="page-body"><div class="page-intro">Mỗi vai trò có cách nhìn và nhiệm vụ khác nhau.</div>
<div class="role-grid">${roles.map(item=>`<button class="role-tile ${state.role===item.id?'active':''}" data-role="${item.id}">
<div class="role-figure">${avatar(item.id,'role-char',state.role===item.id?'talk':'idle')}</div><b>${safe(item.name)}</b><small>${item.en}</small>${state.role===item.id?`<span class="checkmark">${icon('check')}</span>`:''}</button>`).join('')}</div>
<div class="role-summary"><div class="role-portrait">${avatar(state.role,'portrait-char')}</div><div><strong>${safe(r.name)}</strong><p>${safe(r.skill)}</p></div></div>
<div class="button-pair">${btn(`${icon('edit')} Tùy chỉnh`,'custom','sky')}${btn('Xác nhận','map','green')}</div>
</div>`)}

function customView(){return shell('interior-page',`${topbar('Tùy chỉnh nhân vật','roles')}
<div class="page-body"><div class="preview-stage"><div class="preview-ring"></div>${outfitted('preview-character')}<div class="preview-name">${safe(role(state.role).name)}</div></div>
<h2 class="subheading">Bộ trang phục</h2><div class="outfit-row">${allOutfits.map(x=>{const owned=state.ownedOutfits.includes(x.id);
return `<button class="outfit-item ${x.id===state.outfit?'active':''} ${owned?'':'is-locked'}" ${owned?`data-outfit="${x.id}"`:'data-go="shop"'}><img src="assets/characters/${state.role}_outfit_${x.id}.svg" alt=""><span>${x.name}</span>${owned?'':`<em class="outfit-price">${icon('coin')}${x.cost}</em>`}</button>`}).join('')}</div>
<button class="game-btn pale full" data-go="shop">${icon('gift')} Mở Shop mua thêm trang phục</button>
${btn(`${icon('check')} Hoàn tất`,'roles','green full')}</div>`)}

function shopView(){return shell('interior-page',`${topbar('Shop trang phục','custom',true)}
<div class="page-body"><div class="shop-balance">${icon('coin')} Bạn đang có <b>${state.coins}</b> xu</div>
<div class="page-intro">Dùng Xu kiếm được khi chơi để mở khóa trang phục mới cho ${safe(role(state.role).name)}.</div>
<div class="shop-grid">${allOutfits.map(x=>{const owned=state.ownedOutfits.includes(x.id);const afford=state.coins>=x.cost;
return `<div class="shop-item">
 <div class="shop-item-img"><img src="assets/characters/${state.role}_outfit_${x.id}.svg" alt=""></div>
 <b>${safe(x.name)}</b>
 ${owned?`<span class="shop-tag owned">${icon('check')} Đã sở hữu</span>`:x.cost?`<button class="shop-buy ${afford?'':'is-disabled'}" data-buy="${x.id}">${icon('coin')} ${x.cost}</button>`:`<span class="shop-tag owned">${icon('check')} Miễn phí</span>`}
</div>`}).join('')}</div>
<p class="small-note">Mua xong sẽ tự động mặc luôn cho ${safe(role(state.role).name)}. Đổi vai trò khác vẫn giữ nguyên trang phục đã mua.</p>
${btn(`${icon('edit')} Về Tùy chỉnh nhân vật`,'custom','green full')}</div>`)}

function comingSoonView(){const l=level(state.level);const isDev=l.id===3;const tagText=isDev?'ĐANG PHÁT TRIỂN':'CHƯA CẬP NHẬT';return shell('interior-page',`${topbar('Ải '+l.id+': '+l.name,'map',true)}
<div class="page-body centered">
  <div class="preview-stage small" style="margin-bottom:6px">${avatar(l.roles?.[0]||'leader','preview-character','talk')}</div>
  <div style="text-align:center"><span class="coming-badge-tag">${icon('spark')} ${tagText}</span><h2 class="coming-title">ẢI ${l.id}: ${safe(l.name)}</h2></div>
  <div class="lesson-card coming-soon-card">
    <div class="coming-highlight-icon">${icon('clock')}</div>
    <p class="coming-message"><strong>Nội dung Ải này đang được cập nhật. Vui lòng quay lại sau!</strong></p>
    <p class="coming-subtext">Hệ thống kịch bản, nhánh đối thoại thực chiến và bài học chuyên sâu của Ải ${l.id} đang trong quá trình xây dựng.</p>
    <div class="coming-info-box">
      <div><b>Chủ đề:</b> ${safe(l.description)}</div>
      <div><b>Vai trò tiêu biểu:</b> ${l.roles.map(id=>role(id).name).join(' • ')}</div>
      <div><b>Quy mô dự kiến:</b> ${l.stages.length} tình huống mô phỏng</div>
    </div>
  </div>
  <div class="button-pair" style="margin-top:16px">${btn(`${icon('back')} Quay lại Bản đồ`,'map','green')}${btn(`${icon('home')} Về Trang chủ`,'home','sky')}</div>
</div>`)}

function stagesView(){const l=level(state.level);if(l.id>2)return comingSoonView();return shell('interior-page',`${topbar('Ải '+l.id+': '+l.name,'map',true)}
<div class="page-body"><div class="stage-banner"><div><span>CHƯƠNG ${l.id}</span><h2>${safe(l.name)}</h2><p>${safe(l.description)}</p></div>${avatar(l.roles[0],'banner-char','talk')}</div>
<div class="level-info">Vai trò ở ải này: ${l.roles.map(id=>role(id).name).join(' • ')}</div>
<div class="stage-list">${l.stages.map((s,i)=>{const ready=isStageUnlocked(l.id,i);const hasDialogue=Boolean(quickScenarios[`${l.id}:${i}`])||(i===0&&l.id<=2);return `<button class="stage-item ${ready?'is-ready':'is-locked'}" data-stage="${i}"><span class="stage-image">${avatar(l.roles[i%l.roles.length],'stage-char',ready?'talk':'idle')}</span><span class="stage-text"><b>MÀN ${i+1} · ${safe(s[0])}</b><small>${safe(s[1])}</small><em>${!ready?'CHƯA MỞ KHÓA':hasDialogue?'CHƠI MÀN NÀY':'ĐÃ MỞ KHÓA'}</em></span><span class="stage-icon">${icon(ready?'play':'lock')}</span></button>`}).join('')}</div>
</div>`)}
function stagePreview(){const l=level(state.level);if(l.id>2)return comingSoonView();const s=l.stages[state.stage];return shell('interior-page',`${topbar('Thông tin màn','stages',true)}<div class="page-body centered"><div class="preview-stage small">${avatar(l.roles[0],'preview-character')}</div><div class="lesson-card"><b>ẢI ${l.id} / MÀN ${state.stage+1}</b><h2>${safe(s[0])}</h2><p>${safe(s[1])}</p><p class="muted">Màn này đã có tên và mô tả trong đề xuất nhưng chưa có cây thoại hoàn chỉnh để chơi.</p></div>${btn('Các màn khác','stages','sky full')}</div>`)}

function quizView(){const q=quizQuestions[state.quizIndex];return shell('quiz-page',`${topbar('Quiz phong cách','home')}
<div class="page-body"><div class="progress-header"><strong>CÂU ${state.quizIndex+1} / 5</strong><span id="quiz-count">${state.quizTime}s</span></div><div class="progress-track"><span style="width:${(state.quizIndex+1)*20}%"></span></div>
<div class="quiz-panel"><div class="quiz-figure">${avatar(state.quizIndex%2?'mediator':'follower','quiz-char')}</div><h2>${safe(q.question)}</h2><div class="quiz-options">${q.answers.map((ans,i)=>`<button class="answer" data-quiz="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(ans[0])}</button>`).join('')}</div></div>
<p class="small-note">Quiz chỉ mang tính khám phá phong cách làm việc, không phải kiểm tra EQ.</p></div>`)}
function quizResult(){const p=personas.find(x=>x.id===state.persona)||personas[0];return shell('quiz-page',`${topbar('Thẻ phong cách','home')}
<div class="page-body"><div class="id-card" id="persona-card">
<span class="id-star s1">${icon('star')}</span><span class="id-star s2">${icon('star')}</span><span class="id-star s3">${icon('star')}</span>
<div class="id-card-title">${safe(p.title)}</div>
<div class="id-card-body">
  <div class="id-photo"><div class="id-photo-frame">${player('talk','id-photo-char')}</div></div>
  <div class="id-info">
    <small>MÃ ĐỊNH DANH</small>
    <span class="id-handle">${safe(p.handle)}</span>
    <small>ĐỘI</small>
    <span class="id-team">TEAM-CRAFT · ULIS</span>
  </div>
</div>
<p class="id-desc">${safe(p.desc)}</p>
<div class="id-card-foot"><span>THẺ KHÁM PHÁ PHONG CÁCH LÀM VIỆC NHÓM</span></div>
<div class="id-stamp"><span>TEAM<br>CRAFT</span><small>ĐÃ XÁC NHẬN</small></div>
</div>
<div class="persona-actions"><button class="game-btn sky" data-action="download-persona">${icon('book')} Tải ảnh</button><button class="game-btn pale" data-action="share-persona">${icon('send')} Chia sẻ</button></div>
<p class="small-note">Lưu ảnh hoặc chia sẻ thẻ của bạn lên Story/Post để rủ bạn bè cùng làm quiz!</p>
<div class="lesson-card"><strong>Gợi ý của TEAM-CRAFT</strong><p>${safe(p.tip)}</p></div>${btn(`${icon('play')} Vào game mô phỏng`,'map','green full')}</div>`)}
async function captureEl(id){const el=document.getElementById(id);if(!el)return null;if(typeof window.html2canvas!=='function'){toast('Không tạo được ảnh (thiếu html2canvas, cần kết nối mạng)');return null}
 try{if(document.fonts?.ready)await document.fonts.ready;return await window.html2canvas(el,{backgroundColor:null,scale:2,useCORS:true})}catch{toast('Tạo ảnh thất bại, thử lại nhé');return null}}
function cardBlob(canvas){return new Promise(res=>canvas.toBlob(res,'image/png'))}
async function downloadCard(id,filename){toast('Đang tạo ảnh...');const canvas=await captureEl(id);if(!canvas)return;const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=filename;a.click();toast('Đã tải ảnh về máy')}
async function shareCard(id,filename,title,text){toast('Đang tạo ảnh...');const canvas=await captureEl(id);if(!canvas)return;const blob=await cardBlob(canvas);if(!blob)return toast('Tạo ảnh thất bại, thử lại nhé');
 const file=new File([blob],filename,{type:'image/png'});
 if(navigator.canShare && navigator.canShare({files:[file]})){
   try{await navigator.share({files:[file],title,text})}
   catch(err){if(err?.name!=='AbortError')toast('Không thể chia sẻ lúc này')}
   return;
 }
 if(navigator.share){try{await navigator.share({title,text,url:location.href})}catch(err){if(err?.name!=='AbortError')toast('Không thể chia sẻ lúc này')}return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();
 toast('Trình duyệt chưa hỗ trợ chia sẻ trực tiếp, đã tải ảnh về để bạn tự đăng nhé')}

const talkSprites={'Minh':'doer','Lan':'mediator','Huy':'follower','An':'leader','Bạn':null,'Hệ thống':'follower','Minh (suy nghĩ)':'doer','Leader':'leader','Doer':'doer','QC':'qc','Mediator':'mediator','Active Follower':'follower','Bạn thân':'mediator','A':'doer','B':'follower'};
function bubble(name,msg){const mine=name==='Bạn';const id=talkSprites[name]||'follower';return `<div class="bubble-row ${mine?'self':''}"><span class="bubble-avatar">${avatar(mine?state.role:id,'bubble-character',name==='Hệ thống'?'idle':'talk')}</span><div class="bubble-content"><small>${safe(name)}</small><p>${safe(msg)}</p></div></div>`}
function currentNode(){const g=state.game;const stageKey=`${g.level}:${state.stage}`;
if(g.mode==='reversal'){const r=reversals[stageKey]||reversals['1:0'];return {messages:r.messages,prompt:r.prompt||`${r.title} — bạn sẽ phản hồi thế nào?`,options:r.choices}}
if(quickScenarios[stageKey]){const q=quickScenarios[stageKey];return {...q,prompt:q.prompt||q.title,options:q.choices}}
const q=quickScenarios[`${g.level}:${g.role}`];return {...q,prompt:q.prompt||q.title,options:q.choices}}
function chatView(){const g=state.game;const current=currentNode();const lines=[...g.history,...current.messages.map(([name,text])=>({name,text}))];return shell('chat-page',`
<header class="chat-head"><button class="circle-action" data-go="stages" aria-label="Quay lại">${icon('back')}</button><span class="chat-head-face">${player('idle')}</span><div class="chat-head-text"><strong>${g.mode==='reversal'?'ĐẢO VAI / GÓC NHÌN KHÁC':'Nhóm Bài Tập · Ải '+g.level}</strong><small>Bạn đang là ${safe(role(g.role).name)}</small></div><span class="timer" id="game-count">${fmtTime(state.gameTime)}</span></header>
<div class="message-zone" id="message-zone"><div class="privacy-note">MÔ PHỎNG CHAT • KHÔNG GỬI TIN THẬT</div>${lines.map(x=>bubble(x.name,x.text)).join('')}</div>
<div class="decision-box"><div class="decision-head"><b>${safe(current.prompt||current.title||'Bạn sẽ phản hồi thế nào?')}</b><small>2 PHÚT / LƯỢT</small></div><div class="time-track"><span id="time-fill" style="width:${state.gameTime/TURN_SECONDS*100}%"></span></div>
${current.options.map((o,i)=>`<button class="decision-choice" data-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(o.text)}</button>`).join('')}</div>`)}
function getEnding(){const g=state.game;return g.mode==='reversal'?g.reversalOutcome:g.quickOutcome}
function finishCampaign(){toast('Chúc mừng bạn đã hoàn thành toàn bộ nội dung hiện có (Ải 1 & Ải 2)! Các Ải 3, 4, 5 đang được cập nhật.');route('map')}

function endingView(){const g=state.game;const o=getEnding();const tone=o.tone||o.type||'mid';const l=level(state.level);const nextStageIndex=state.stage+1;const hasNextStage=nextStageIndex<l.stages.length;const nextLvlId=state.level+1;const nextLvl=levels.find(x=>x.id===nextLvlId);const isFinalCampaignLevel=state.level===2&&!hasNextStage;const hasNextLevel=!hasNextStage&&Boolean(nextLvl)&&!isFinalCampaignLevel;return shell('interior-page ending-page',`${topbar(g.mode==='reversal'?'Đảo vai hoàn tất':'Lesson Unlocked','stages',true)}
<div class="page-body"><div class="ending-medal ${tone}">${avatar(tone==='good'?'follower':tone==='bad'?'qc':'mediator','medal-character',tone==='good'?'walk_a':'idle')}</div>
<h2 class="ending-title">${safe(o.name||(tone==='good'?'Giải quyết hiệu quả':tone==='bad'?'Nhóm gặp khó khăn':'Cần điều chỉnh'))}</h2><p class="ending-desc">${safe(o.message||o.answer)}</p>
<div class="lesson-card"><div class="lesson-caption">${icon('book')} LESSON UNLOCKED</div><p>${safe(o.lesson)}</p></div>
${o.template?`<div class="lesson-card template-card"><strong>VÍ KỊCH BẢN • MẪU TIN NHẮN</strong><p>${safe(o.template)}</p><button class="small-button" data-action="save-template">${icon('check')} Lưu mẫu tin nhắn</button></div>`:''}
<div class="action-stack">${hasNextStage?`<button class="game-btn green full" data-action="next-stage">${icon('play')} Màn tiếp theo</button>`:''}${hasNextLevel?`<button class="game-btn green full" data-action="level-complete">${icon('spark')} Xem thành tích Ải ${l.id}</button>`:''}${isFinalCampaignLevel?`<button class="game-btn green full" data-action="level-complete">${icon('spark')} Xem thành tích Ải ${l.id}</button>`:''}${g.mode==='reversal'?'':`<button class="game-btn pale full" data-action="reversal">${icon('rotate')} THỬ ĐẢO VAI</button>`}<div class="button-pair">${btn('Chơi lại','replay','sky')}${btn('Bản đồ','map',hasNextStage||hasNextLevel||isFinalCampaignLevel?'pale':'green')}</div></div><p class="small-note">Kết quả chỉ là tình huống mô phỏng, không dự đoán chắc chắn phản ứng ngoài đời.</p></div>`)}
function levelCompleteView(){const l=level(state.completedLevelId||state.level);const r=role(state.role);const hasNext=state.completedLevelId===1;const code=`AI${l.id}-CLEAR-0${l.stages.length}0${l.stages.length}`;return shell('interior-page ending-page',`${topbar('Hoàn thành Ải','map',true)}
<div class="page-body"><div class="id-card theme-green" id="level-complete-card">
<span class="id-star s1">${icon('star')}</span><span class="id-star s2">${icon('star')}</span><span class="id-star s3">${icon('star')}</span>
<div class="id-card-title">ẢI ${l.id}: ${safe(l.name).toUpperCase()}</div>
<div class="id-card-body">
  <div class="id-photo"><div class="id-photo-frame">${avatar(state.role,'id-photo-char','walk_a')}</div></div>
  <div class="id-info">
    <small>MÃ HOÀN THÀNH</small>
    <span class="id-handle">${code}</span>
    <small>VAI TRÒ ĐÃ CHƠI</small>
    <span class="id-team">${safe(r.name)}</span>
  </div>
</div>
<p class="id-desc">Đã vượt qua ${l.stages.length}/${l.stages.length} màn. Tích lũy được ${icon('heart')} ${state.hearts} Thấu cảm · ${icon('coin')} ${state.coins} Xu.</p>
<div class="id-card-foot"><span>TEAM-CRAFT · HOÀN THÀNH ẢI ${l.id}</span></div>
<div class="id-stamp"><span>TEAM<br>CRAFT</span><small>HOÀN THÀNH</small></div>
</div>
<div class="persona-actions"><button class="game-btn sky" data-action="download-level">${icon('book')} Tải ảnh</button><button class="game-btn pale" data-action="share-level">${icon('send')} Chia sẻ</button></div>
<p class="small-note">Khoe thành tích vừa đạt được với bạn bè đi!</p>
<button class="game-btn green full" data-action="continue-after-level">${icon('play')} ${hasNext?'Sang Ải tiếp theo':'Xem lộ trình tiếp theo'}</button>
</div>`)}
function openLevelComplete(){state.completedLevelId=state.level;route('levelComplete')}
function continueAfterLevel(){if(state.completedLevelId===1)nextLevel();else finishCampaign()}
function walletView(){return shell('interior-page',`${topbar('Ví kịch bản','map')}<div class="page-body"><div class="page-intro">Lưu và sao chép các mẫu tin nhắn từ màn chơi đã hoàn thành.</div>${state.wallet.length?state.wallet.map((w,i)=>`<article class="lesson-card wallet-item"><strong>Mẫu tin nhắn ${i+1}</strong><p>${safe(w.text)}</p><button class="small-button" data-copy="${i}">${icon('chat')} Sao chép</button></article>`).join(''):`<div class="empty-wallet">${avatar('follower','empty-char')}<h2>Ví của bạn đang trống</h2><p>Hoàn thành một màn chơi để lưu tin nhắn thực chiến.</p></div>`}${btn('Quay lại bản đồ','map','green full')}</div>`)}

function buyOutfit(id){if(state.ownedOutfits.includes(id))return;const item=allOutfits.find(o=>o.id===id);if(!item)return;
 if(state.coins<item.cost){toast('Không đủ Xu, hãy chơi thêm để kiếm Xu nhé!');return}
 state.coins-=item.cost;state.ownedOutfits.push(id);state.outfit=id;save();toast(`Đã mua và mặc "${item.name}"!`);render()}
function render(){const mapRender={home,map,roles:rolesView,custom:customView,shop:shopView,stages:stagesView,stagePreview,comingSoon:comingSoonView,quiz:quizView,quizResult,chat:chatView,ending:endingView,levelComplete:levelCompleteView,wallet:walletView,replay:()=>{startGame();return ''}};
ROOT.innerHTML=(mapRender[state.screen]||home)();if(state.screen==='chat'){document.getElementById('message-zone')?.scrollTo(0,9999)}if(state.screen==='quiz')runQuizClock();if(state.screen==='chat')runGameClock();}
function runQuizClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='quiz'){stopClock();return;}state.quizTime=Math.max(0,state.quizTime-1);const el=document.getElementById('quiz-count');if(el)el.textContent=state.quizTime+'s';if(state.quizTime===0)finishQuiz()},1000)}
function runGameClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='chat'){stopClock();return;}state.gameTime=Math.max(0,state.gameTime-1);const el=document.getElementById('game-count');const bar=document.getElementById('time-fill');if(el)el.textContent=fmtTime(state.gameTime);if(bar)bar.style.width=(state.gameTime/TURN_SECONDS*100)+'%';if(state.gameTime===0)autoGameEnd()},1000)}
function startQuiz(){state.quizIndex=0;state.quizAnswers=[];state.quizTime=60;route('quiz')}
function chooseQuiz(index){const ans=quizQuestions[state.quizIndex].answers[index];if(!ans)return;state.quizAnswers.push(ans[1]);if(state.quizIndex===4)finishQuiz();else {state.quizIndex++;render()}}
function finishQuiz(){const tally={};state.quizAnswers.forEach(x=>tally[x]=(tally[x]||0)+1);state.persona=Object.entries(tally).sort((a,b)=>b[1]-a[1])[0]?.[0]||'bee';save();route('quizResult')}
function openLevel(id){const lvlId=Number(id);state.level=lvlId;if(lvlId>2)return route('comingSoon');route('stages')}
function openStage(index){state.stage=Number(index);const l=level(state.level);if(l.id>2)return route('comingSoon');if(!isLevelUnlocked(l.id)){toast(`Ải ${l.id} chưa mở khóa!`);return route('map')}if(!isStageUnlocked(l.id,state.stage)){toast(`Màn ${state.stage+1} chưa mở khóa! Hãy hoàn thành màn trước.`);return route('stages')}const stageKey=`${l.id}:${state.stage}`;if(!quickScenarios[stageKey])return route('stagePreview');const targetRole=stageRoleMap?.[stageKey]||(l.roles.includes(state.role)?state.role:l.roles[0]);state.role=targetRole;save();startGame()}
function startGame(){state.game={level:state.level,role:state.role,mode:'main',history:[],quickOutcome:null,reversalOutcome:null};state.gameTime=TURN_SECONDS;route('chat')}
function finishMain(){const key=`${state.game.level}:${state.stage}:${state.role}`;if(!state.done.includes(key))state.done.push(key);const l=level(state.level);if(state.stage<l.stages.length-1){unlockStage(state.level,state.stage+1)}else{const nextLvlId=state.level+1;if(nextLvlId<=levels.length){unlockLevel(nextLvlId)}}save();route('ending')}
function nextStage(){const l=level(state.level);const nextIndex=state.stage+1;if(nextIndex<l.stages.length){state.stage=nextIndex;unlockStage(state.level,nextIndex);openStage(nextIndex)}else{if(state.level>=2){finishCampaign()}else{nextLevel()}}}
function nextLevel(){const nextLvlId=state.level+1;const nextLvl=levels.find(x=>x.id===nextLvlId);if(!nextLvl||nextLvlId>2)return finishCampaign();state.level=nextLvlId;state.stage=0;unlockLevel(nextLvlId);unlockStage(nextLvlId,0);const stageKey=`${nextLvlId}:0`;const targetRole=stageRoleMap?.[stageKey]||nextLvl.roles[0];state.role=targetRole;save();toast(`Bắt đầu Ải ${nextLvl.id}: ${nextLvl.name}`);startGame()}
function answerGame(index){const g=state.game;const node=currentNode();const o=node.options[index];if(!o)return;g.history.push(...node.messages.map(([name,text])=>({name,text})),{name:'Bạn',text:o.template||o.text});
 if(g.mode==='reversal'){applyReward(o.type,10);g.reversalOutcome={name:'Đảo vai hoàn tất',type:o.type,answer:o.answer,lesson:o.lesson};route('ending');return}
 applyReward(o.type,20);
 g.quickOutcome={name:o.name||(o.type==='good'?'Cả nhóm đã tiến lên!':o.type==='bad'?'Nhóm vẫn bế tắc':'Có điều cần cải thiện'),type:o.type,answer:o.answer,lesson:o.lesson,template:o.template};finishMain()}
function autoGameEnd(){const g=state.game;if(!g)return;applyReward('bad',0);if(g.mode==='reversal'){g.reversalOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Cả nhóm không biết bạn đang nghĩ gì.',lesson:'Im lặng cũng ảnh hưởng đến việc phối hợp.'};route('ending');return}g.quickOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Không có phản hồi kịp thời.',lesson:'Chủ động lên tiếng giúp nhóm hoạt động hiệu quả.'};finishMain()}
function startReversal(){state.game={...state.game,mode:'reversal',history:[]};state.gameTime=TURN_SECONDS;route('chat')}
function saveTemplate(){const o=getEnding();if(!o?.template)return;state.wallet.unshift({level:state.game.level,text:o.template});state.wallet=state.wallet.slice(0,30);save();toast('Đã lưu mẫu tin nhắn vào ví')}
async function copyWallet(index){const w=state.wallet[index];if(!w)return;try{await navigator.clipboard.writeText(w.text);toast('Đã sao chép')}catch{toast('Trình duyệt không cho phép sao chép tự động')}}
ROOT.addEventListener('click',e=>{
 let x=e.target.closest('[data-go]');if(x){if(x.dataset.go==='replay')return startGame();if(x.dataset.go==='next-stage')return nextStage();if(x.dataset.go==='next-level')return nextLevel();if(x.dataset.go==='finish-campaign')return finishCampaign();return route(x.dataset.go)}
 x=e.target.closest('[data-level]');if(x){const lvlId=Number(x.dataset.level);if(lvlId>2){return openLevel(lvlId)}if(!isLevelUnlocked(lvlId)){toast(`Ải ${lvlId} chưa mở khóa! Hãy hoàn thành ải trước.`);return}return openLevel(lvlId)}
 x=e.target.closest('[data-role]');if(x){state.role=x.dataset.role;save();return render()}
 x=e.target.closest('[data-outfit]');if(x){state.outfit=x.dataset.outfit;save();return render()}
 x=e.target.closest('[data-stage]');if(x)return openStage(x.dataset.stage);
 x=e.target.closest('[data-quiz]');if(x)return chooseQuiz(Number(x.dataset.quiz));
 x=e.target.closest('[data-choice]');if(x)return answerGame(Number(x.dataset.choice));
 x=e.target.closest('[data-copy]');if(x)return copyWallet(Number(x.dataset.copy));
 x=e.target.closest('[data-buy]');if(x)return buyOutfit(x.dataset.buy);
 x=e.target.closest('[data-action]');if(!x)return;
 if(x.dataset.action==='start-quiz')startQuiz();
 if(x.dataset.action==='save-template')saveTemplate();
 if(x.dataset.action==='download-persona')downloadCard('persona-card','teamcraft-the-ket-qua.png');
 if(x.dataset.action==='share-persona')shareCard('persona-card','teamcraft-the-ket-qua.png','Thẻ phong cách TEAM-CRAFT của tôi','Mình vừa làm quiz phong cách làm việc nhóm trên TEAM-CRAFT, thử xem bạn là kiểu đồng đội nào nhé!');
 if(x.dataset.action==='download-level')downloadCard('level-complete-card','teamcraft-hoan-thanh-ai.png');
 if(x.dataset.action==='share-level')shareCard('level-complete-card','teamcraft-hoan-thanh-ai.png','Mình vừa hoàn thành một Ải trên TEAM-CRAFT!','Thử sức xem bạn xử lý drama nhóm giỏi đến đâu nhé!');
 if(x.dataset.action==='reversal')startReversal();
 if(x.dataset.action==='next-stage')nextStage();
 if(x.dataset.action==='level-complete')openLevelComplete();
 if(x.dataset.action==='continue-after-level')continueAfterLevel();
});
route('home');
