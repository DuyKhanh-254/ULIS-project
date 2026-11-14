import {roles, personas, quizQuestions, levels, leaderTree, leaderEndings, quickScenarios, reversal, stageRoleMap, stageScenarios} from './data.js';
import {drawPersonaCard, personaStyles} from './persona-card.js';

const ROOT=document.getElementById('app');
const TOAST=document.getElementById('toast');
const STORE='teamcraft-redesign-v4';
let saved={}; try{saved=JSON.parse(localStorage.getItem(STORE)||localStorage.getItem('teamcraft-redesign-v3')||'{}')}catch{}
let extraUnlocked=[]; try{extraUnlocked=JSON.parse(localStorage.getItem('unlockedStages')||'[]')}catch{}
let extraLevels=[]; try{extraLevels=JSON.parse(localStorage.getItem('unlockedLevels')||'[]')}catch{}
const initialStages=Array.from(new Set(['1:0',...(saved.unlockedStages||[]),...(Array.isArray(extraUnlocked)?extraUnlocked:[])]));
const initialLevels=Array.from(new Set([1,...(saved.unlockedLevels||[]),...(Array.isArray(extraLevels)?extraLevels:[])]));
if(initialStages.includes('1:4')||(saved.done&&saved.done.some(k=>k.startsWith('1:4:')))){
  if(!initialLevels.includes(2))initialLevels.push(2);
  if(!initialStages.includes('2:0'))initialStages.push('2:0');
}

const state={
  screen:'home',
  level:1,
  stage:0,
  role:saved.role||'leader',
  outfit:saved.outfit||'blue',
  persona:saved.persona||null,
  previewPersona:null,
  nickname:saved.nickname||'CUT3FROG247',
  quizAnswers:[],
  quizIndex:0,
  quizTime:60,
  gameTime:20,
  game:null,
  done:saved.done||[],
  wallet:saved.wallet||[],
  unlockedStages:initialStages,
  unlockedLevels:initialLevels
};

let clock=null;
const allOutfits=[{id:'blue',name:'Xanh ULIS'},{id:'rose',name:'Hồng pastel'},{id:'leaf',name:'Xanh lá'},{id:'violet',name:'Tím nhạt'},{id:'gold',name:'Vàng mật ong'}];
const safe=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const role=id=>roles.find(r=>r.id===id)||roles[0];
const level=id=>levels.find(l=>l.id===Number(id))||levels[0];

function save(){
  try{
    localStorage.setItem(STORE,JSON.stringify({
      role:state.role,
      outfit:state.outfit,
      persona:state.persona,
      nickname:state.nickname,
      done:state.done,
      wallet:state.wallet,
      unlockedStages:state.unlockedStages,
      unlockedLevels:state.unlockedLevels
    }));
    localStorage.setItem('unlockedStages',JSON.stringify(state.unlockedStages));
    localStorage.setItem('unlockedLevels',JSON.stringify(state.unlockedLevels));
  }catch{}
}

const isLevelUnlocked=lvlId=>{const n=Number(lvlId);if(n>2)return false;return n===1||state.unlockedLevels.includes(n)};
const isStageUnlocked=(lvlId,stgIdx)=>{if(!isLevelUnlocked(lvlId))return false;if(stgIdx===0)return true;return state.unlockedStages.includes(`${lvlId}:${stgIdx}`)};
function unlockLevel(lvlId){const n=Number(lvlId);if(!state.unlockedLevels.includes(n)){state.unlockedLevels.push(n)}unlockStage(n,0);save()}
function unlockStage(lvlId,stgIdx){const key=`${lvlId}:${stgIdx}`;if(!state.unlockedStages.includes(key)){state.unlockedStages.push(key);save()}}

const assetPath=path=>window.__assetMap?.[path]||path;
const icon=(name,cls='')=>`<img class="icon ${cls}" src="${assetPath('assets/ui/'+name+'.svg')}" alt="">`;
const sprite=(id,pose='idle')=>assetPath(`assets/characters/${id}_${pose}.svg`);
const avatar=(id,cl='',pose='idle')=>`<img class="character ${cl}" src="${sprite(id,pose)}" alt="">`;
const player=(pose='idle',cl='')=>avatar(state.role,cl,pose);
const outfitted=(cl='')=>`<img class="character ${cl}" src="${assetPath(`assets/characters/${state.role}_outfit_${state.outfit}.svg`)}" alt="">`;
const logo=(sm=false)=>`<div class="brand ${sm?'brand-sm':''}"><span>TEAM</span><span>CRAFT</span></div>`;
const shell=(cls,html)=>`<main class="device"><section class="page ${cls}">${html}</section></main>`;
const btn=(label,action='map',variant='green',extras='')=>`<button class="game-btn ${variant}" data-go="${action}" ${extras}>${label}</button>`;
const topbar=(title,go='map',showHome=true)=>`<header class="page-top"><button class="circle-action" data-go="${go}" aria-label="Quay lại">${icon('back')}</button><h1>${safe(title)}</h1>${showHome?`<button class="circle-action" data-go="home" aria-label="Trang chủ">${icon('home')}</button>`:`<div class="page-top-spacer"></div>`}</header>`;

function toast(text){TOAST.textContent=text;TOAST.classList.add('on');clearTimeout(TOAST._t);TOAST._t=setTimeout(()=>TOAST.classList.remove('on'),2400)}
function stopClock(){if(clock!==null)clearInterval(clock);clock=null}
function route(screen){stopClock();state.screen=screen;render();window.scrollTo(0,0)}

function home(){return shell('home-page',`
<header class="home-head"><div class="logo-mark">${icon('spark')} TEAM-CRAFT</div><button class="head-action" data-go="wallet">${icon('book')} Ví (${state.wallet.length})</button></header>
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
<button class="game-btn pale large" data-action="start-quiz">${icon('star')} LÀM QUIZ 60 GIÂY</button>
<button class="peek-card-cta" data-go="personaGallery">✦ KHÁM PHÁ 7 THẺ NHÂN VẬT VUI NHỘN <span>›</span></button></section>
<div class="home-feature-strip"><div>${icon('team')}<span>5 VAI TRÒ</span></div><div>${icon('rotate')}<span>ĐẢO VAI</span></div><div>${icon('book')}<span>BÀI HỌC</span></div></div>
<p class="footer-note">Phiên bản trải nghiệm • Ải 1 & Ải 2 đầy đủ kịch bản</p>
`)}

const mapNPCLayout=[
 ['student-a',14.5,30.5,'idle','kid-a'],['student-c',82,35.5,'talk','kid-b'],
 ['student-b',14.2,56.3,'idle','kid-c'],['student-a',86,63.5,'walk_a','kid-d']
];
function map(){
  const nodes=[
    {n:5,x:49,y:24.6,name:'Dự Án Công Sở',theme:'locked'},
    {n:4,x:65,y:38.2,name:'Trùm Free-rider',theme:'locked'},
    {n:3,x:43,y:51,name:'Nước Đến Chân Mới Nhảy',theme:'locked'},
    {n:2,x:52,y:65.4,cap:'TRUNG BÌNH',name:'Người Lạ Ơi',theme:'blue'},
    {n:1,x:31,y:79.7,cap:'DỄ',name:'Nhóm Bạn Thân',theme:'green'}
  ];
  return shell('map-page',`
<img class="map-scene" src="${assetPath('assets/campus-map.webp')}" alt="Khuôn viên trường học phong cách hoạt hình, con đường đi qua năm ải">
<div class="map-hud">
  <div class="map-hud-left">
    <button class="map-logo" data-go="home" aria-label="Trang chủ">${logo(true)}</button>
    <button class="map-home-btn" data-go="home" aria-label="Về Trang chủ">${icon('home')} <span>Trang chủ</span></button>
  </div>
  <div class="resources"><span>${icon('heart')} <b>120</b></span><span>${icon('coin')} <b>500</b></span></div></div>
${mapNPCLayout.map(([name,x,y,pose,id])=>`<img class="map-npc ${id}" src="${sprite(name,pose)}" style="left:${x}%;top:${y}%" alt="" loading="lazy">`).join('')}
${nodes.map(n=>{
  const isComingSoon=n.n>2;
  const isLocked=isComingSoon||!isLevelUnlocked(n.n);
  const badgeText=isComingSoon?'SẮP RA MẮT':n.cap;
  return `<button class="level-spot ${n.theme} ${isLocked?'is-locked':''} ${isComingSoon?'is-coming-soon':''}" style="left:${n.x}%;top:${n.y}%" data-level="${n.n}" aria-label="Ải ${n.n}: ${n.name}">
 <span class="level-orb ${isComingSoon?'is-coming-soon':''}">${isLocked?icon('lock'):n.n===2?icon('chat'):icon('check')}</span>
 <span class="level-copy"><b>ẢI ${n.n}: ${n.name}</b><small class="${isComingSoon?'coming-badge':''}">${badgeText}</small></span></button>`;
}).join('')}
<nav class="map-dock"><button data-go="roles" class="dock-small">${icon('team')}<span>Vai trò</span></button>
<button class="dock-play" data-action="play-campaign">${icon('play')}<strong>CHƠI NGAY</strong></button>
<button data-go="wallet" class="dock-small">${icon('book')}<span>Nhiệm vụ</span></button></nav>
`)}

function rolesView(){const r=role(state.role);return shell('interior-page',`${topbar('Chọn vai trò','map',true)}
<div class="page-body"><div class="page-intro">Mỗi vai trò có cách nhìn và nhiệm vụ khác nhau.</div>
<div class="role-grid">${roles.map(item=>`<div class="role-tile ${state.role===item.id?'active':''}">
<button class="role-select" data-role="${item.id}" aria-label="Nhập vai ${safe(item.name)}"><div class="role-figure">${avatar(item.id,'role-char',state.role===item.id?'talk':'idle')}</div><b>${safe(item.name)}</b><small>${item.en}</small><em>NHẬP VAI</em></button>
<button class="role-quick-edit" data-custom-role="${item.id}" aria-label="Tùy chỉnh ${safe(item.name)}">${icon('edit')}</button>
${state.role===item.id?`<span class="checkmark">${icon('check')}</span>`:''}</div>`).join('')}</div>
<div class="role-summary"><div class="role-portrait">${avatar(state.role,'portrait-char')}</div><div><strong>${safe(r.name)}</strong><p>${safe(r.skill)}</p></div></div>
<div class="button-pair">${btn(`${icon('edit')} Tùy chỉnh`,'custom','sky')}${btn('Xác nhận','map','green')}</div>
</div>`)}

function customView(){return shell('interior-page',`${topbar('Tùy chỉnh nhân vật','roles',true)}
<div class="page-body"><div class="preview-stage"><div class="preview-ring"></div>${outfitted('preview-character')}<div class="preview-name">${safe(role(state.role).name)}</div></div>
<h2 class="subheading">Bộ trang phục</h2><div class="outfit-row">${allOutfits.map(x=>`<button class="outfit-item ${x.id===state.outfit?'active':''}" data-outfit="${x.id}"><img src="${assetPath(`assets/characters/${state.role}_outfit_${x.id}.svg`)}" alt=""><span>${x.name}</span></button>`).join('')}</div>
${btn(`${icon('check')} Hoàn tất`,'roles','green full')}</div>`)}

function comingSoonView(){const l=level(state.level);const tagText='SẮP RA MẮT';return shell('interior-page',`${topbar('Ải '+l.id+': '+l.name,'map',true)}
<div class="page-body centered">
  <div class="preview-stage small" style="margin-bottom:6px">${avatar(l.roles?.[0]||'leader','preview-character','talk')}</div>
  <div style="text-align:center"><span class="coming-badge-tag">${icon('spark')} ${tagText}</span><h2 class="coming-title">ẢI ${l.id}: ${safe(l.name)}</h2></div>
  <div class="lesson-card coming-soon-card">
    <div class="coming-highlight-icon">${icon('lock')}</div>
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
<div class="stage-list">${l.stages.map((s,i)=>{
  const ready=isStageUnlocked(l.id,i);
  const stageKey=`${l.id}:${i}`;
  const hasDialogue=Boolean(stageScenarios[stageKey]||quickScenarios[stageKey]);
  const isChat=(l.id===1&&[0,3].includes(i))||(l.id===2&&[0,1,5].includes(i));
  return `<button class="stage-item ${ready?'is-ready':'is-locked'}" data-stage="${i}"><span class="stage-image">${avatar(l.roles[i%l.roles.length],'stage-char',ready?'talk':'idle')}</span><span class="stage-text"><b>MÀN ${i+1} · ${safe(s[0])}</b><span class="stage-mode">${isChat?'CHAT NHÓM':l.id<=2?'LÀM VIỆC TRỰC TIẾP':'CHƯA ĐỊNH DẠNG'}</span><small>${safe(s[1])}</small><em>${hasDialogue?(ready?'CHƠI MÀN NÀY':'CHƯA MỞ KHÓA'):'ĐANG CẬP NHẬT'}</em></span><span class="stage-icon">${icon(ready?'play':'lock')}</span></button>`;
}).join('')}</div>
</div>`)}

function stageIntro(){
  const l=level(state.level);
  if(l.id>2)return comingSoonView();
  const s=l.stages[state.stage];
  if(!s)return stagesView();
  const isChat=(l.id===1&&[0,3].includes(state.stage))||(l.id===2&&[0,1,5].includes(state.stage));
  return shell('interior-page',`${topbar('Thẻ bối cảnh','stages',true)}
<div class="page-body"><div class="stage-intro-meta"><span>ẢI ${l.id} • MÀN ${state.stage+1}</span><span>${isChat?'CHAT NHÓM':'LÀM VIỆC TRỰC TIẾP'}</span>${l.id===1?'<span>CÒN 48 GIỜ</span>':''}</div>
<div class="stage-intro-art">${avatar('leader','stage-pola','idle')}${avatar('doer','stage-pola','talk')}${avatar(l.id===1?'mediator':'follower','stage-pola','idle')}</div>
<h2 class="stage-intro-title">${safe(s[0])}</h2><p class="stage-intro-desc">${safe(s[1])}</p>
<div class="stage-intro-tip"><strong>Bạn là ${safe(role(state.role).name)}.</strong> Phản ứng của đồng đội và kết cục bài thuyết trình phụ thuộc vào lựa chọn của bạn. Có thể chơi lại để thử một cách xử lý khác.</div>
${btn(`${icon('play')} BẮT ĐẦU MÔ PHỎNG`,'beginStage','green full')}
</div>`)}

function stagePreview(){const l=level(state.level);if(l.id>2)return comingSoonView();const s=l.stages[state.stage];return shell('interior-page',`${topbar('Thông tin màn','stages',true)}<div class="page-body centered"><div class="preview-stage small">${avatar(l.roles[0],'preview-character')}</div><div class="lesson-card"><b>ẢI ${l.id} / MÀN ${state.stage+1}</b><h2>${safe(s?s[0]:'Đang cập nhật')}</h2><p>${safe(s?s[1]:'')}</p><p class="muted">Màn này đang trong quá trình hoàn thiện kịch bản chi tiết.</p></div>${btn('Các màn khác','stages','sky full')}</div>`)}

function quizView(){const q=quizQuestions[state.quizIndex];return shell('quiz-page',`${topbar('Quiz phong cách','home',true)}
<div class="page-body"><div class="progress-header"><strong>CÂU ${state.quizIndex+1} / 5</strong><span id="quiz-count">${state.quizTime}s</span></div><div class="progress-track"><span style="width:${(state.quizIndex+1)*20}%"></span></div>
<div class="quiz-panel"><div class="quiz-figure">${avatar(state.quizIndex%2?'mediator':'follower','quiz-char')}</div><h2>${safe(q.question)}</h2><div class="quiz-options">${q.answers.map((ans,i)=>`<button class="answer" data-quiz="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(ans[0])}</button>`).join('')}</div></div>
<p class="small-note">Quiz chỉ mang tính khám phá phong cách làm việc, không phải kiểm tra EQ.</p></div>`)}

function quizResult(){
  const p=personas.find(x=>x.id===(state.previewPersona||state.persona))||personas[0];
  const isPreview=Boolean(state.previewPersona);
  return shell('quiz-page persona-result-page',`${topbar(isPreview?'Xem thử thẻ':'Thẻ nhân vật của bạn','home',true)}
<div class="page-body persona-result-body">
  <div class="card-context"><span class="card-context-spark">✦</span><div><strong>${isPreview?'Bộ sưu tập phong cách':'Xin chào, đồng đội!'}</strong><p>${isPreview?'Bản xem thử · Hoàn thành Quiz để nhận thẻ của chính bạn':'Thẻ nhân vật đã sẵn sàng để lưu và đăng Story'}</p></div></div>
  <div class="persona-canvas-wrap"><canvas id="persona-render" width="900" height="1190" role="img" aria-label="Thẻ vui nhộn ${safe(p.title)}"></canvas></div>
  <label class="nickname-label" for="player-nickname">TÊN HIỂN THỊ TRÊN THẺ <small>(không cần tên thật)</small></label>
  <div class="nick-wrap"><input id="player-nickname" type="text" maxlength="22" autocomplete="off" placeholder="Nhập biệt danh của bạn..." value="${safe(state.nickname || '')}" aria-label="Tên người chơi trên thẻ"><button type="button" class="nick-pencil" id="btn-focus-nick" aria-label="Chỉnh sửa biệt danh">✎</button></div>
  <div class="card-actions"><button class="card-action download" data-action="download-card">⬇ TẢI ẢNH PNG</button><button class="card-action share" data-action="share-card">↗ CHIA SẺ</button></div>
  <div class="card-cta-box">
    <p class="cta-question">Muốn thử nghiệm cách điều chỉnh phong cách làm việc?</p>
    <button class="game-btn green full persona-enter" data-go="map">${icon('play')} VÀO GAME MÔ PHỎNG NGAY!</button>
  </div>
  <div class="persona-secondary"><button data-action="start-quiz">↻ Làm Quiz lại</button><button data-go="personaGallery">Xem 7 thẻ khác</button></div>
  <p class="card-privacy">Kết quả để khám phá và giải trí, không phải chẩn đoán hay điểm EQ. Tính năng chia sẻ sử dụng trình chia sẻ của thiết bị khi được hỗ trợ.</p>
</div>`);
}

function personaGallery(){return shell('quiz-page persona-gallery-page',`${topbar('7 hình mẫu trong Quiz','home',true)}
<div class="page-body"><div class="gallery-intro"><span>✦ BỘ SƯU TẬP ✦</span><h2>Bạn thuộc team nào?</h2><p>Nhấn vào một thẻ để xem giao diện. Đây là 7 kiểu phong cách từ đề xuất TEAM-CRAFT; kết quả cá nhân được tạo sau 5 câu Quiz.</p></div>
<div class="persona-grid">${personas.map(p=>`<button class="persona-mini-card" style="--persona-color:${personaStyles[p.id]?.bg||'#ffdfed'}" data-persona-preview="${p.id}"><img src="${assetPath(`assets/personas/${p.id}.svg`)}" alt=""><strong>${safe(personaStyles[p.id]?.name||p.title)}</strong><small>Xem thẻ ›</small></button>`).join('')}</div>
<button class="game-btn pale full" data-action="start-quiz">${icon('star')} LÀM QUIZ NHẬN THẺ</button></div>`)}

async function updatePersonaCanvas(){
 if(state.screen!=='quizResult')return;
 const canvas=document.getElementById('persona-render');if(!canvas)return;
 const current=state.previewPersona||state.persona||'bee';
 const p=personas.find(x=>x.id===current)||personas[0];
 const nick=(state.nickname&&state.nickname.trim())?state.nickname.trim():'CUT3FROG247';
 try {await drawPersonaCard(canvas,p,nick)} catch(err){console.error(err); toast('Không tải được hình linh vật. Vui lòng thử mở bằng localhost.');}
}
function imageBlob(canvas){return new Promise(resolve=>canvas.toBlob(resolve,'image/png'))}
async function getCardFile(){
 const canvas=document.getElementById('persona-render');if(!canvas)return null;
 await updatePersonaCanvas();
 const blob=await imageBlob(canvas);if(!blob)return null;
 const id=(state.previewPersona||state.persona||'bee').replace(/[^a-z0-9_-]/gi,'');
 return new File([blob],`TEAM-CRAFT-card-${id}.png`,{type:'image/png'});
}
function saveFile(file){
 const a=document.createElement('a');const url=URL.createObjectURL(file);a.href=url;a.download=file.name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
async function downloadPersonaCard(){const file=await getCardFile();if(!file)return toast('Chưa tạo được ảnh.');saveFile(file);toast('Đã tạo ảnh PNG để đăng Story!')}
async function sharePersonaCard(){
 const file=await getCardFile();if(!file)return toast('Chưa tạo được ảnh.');
 try {
  if(navigator.share && navigator.canShare?.({files:[file]})){
   await navigator.share({files:[file],title:'Thẻ TEAM-CRAFT của mình',text:'Còn bạn thuộc phong cách làm việc nhóm nào?'});
  } else {saveFile(file);toast('Thiết bị chưa hỗ trợ chia sẻ ảnh trực tiếp. Đã tải PNG để bạn đăng Story.');}
 } catch(e){ if(e.name!=='AbortError'){saveFile(file);toast('Đã tải ảnh PNG để chia sẻ thủ công.');} }
}

const talkSprites={
  'Minh':'doer','Lan':'mediator','Huy':'follower','An':'leader','Bạn':null,'Hệ thống':'follower',
  'Minh (suy nghĩ)':'doer','Doer (suy nghĩ)':'doer',
  'Leader':'leader','Doer':'doer','QC':'qc','Mediator':'mediator','Follower':'follower'
};
function bubble(name,msg){
  const mine=name==='Bạn';
  const normName=name.toLowerCase();
  const id=talkSprites[name]||(roles.some(r=>r.id===normName)?normName:state.role);
  return `<div class="bubble-row ${mine?'self':''}"><span class="bubble-avatar">${avatar(id,'bubble-character',name==='Hệ thống'?'idle':'talk')}</span><div class="bubble-content"><small>${safe(name)}</small><p>${safe(msg)}</p></div></div>`
}

function currentNode(){
  const g=state.game;
  if(g.mode==='reversal'){
    if(g.level===2)return {messages:[['Minh (suy nghĩ)','Mới vào nhóm lạ, mình không biết nhận phần nào, nhưng rất ngại hỏi...'],['An','Có ai muốn nhận phần mở đầu không?']],prompt:'Ở góc nhìn người mới, bạn làm gì?',options:[{text:'Giới thiệu thế mạnh, hỏi rõ đầu việc và deadline.',type:'good',answer:'Cả nhóm bắt đầu mở lời và chủ động phân công.',lesson:'Phá băng bắt đầu từ một lời xác nhận cụ thể.'},{text:'Tiếp tục im lặng để tránh bị chú ý.',type:'bad',answer:'Leader không biết bạn có thể làm gì, việc bị chậm.',lesson:'Im lặng có thể bị hiểu nhầm là thiếu hợp tác.'}]};
    return {messages:reversal.messages,prompt:'Là Minh, bạn sẽ phản hồi thế nào?',options:reversal.choices};
  }
  const stageKey=`${g.level}:${state.stage}`;
  if(stageScenarios[stageKey]){
    const sc=stageScenarios[stageKey];
    return {messages:sc.messages,prompt:sc.prompt||sc.title,options:sc.choices};
  }
  if(quickScenarios[stageKey]){
    const sc=quickScenarios[stageKey];
    return {messages:sc.messages,prompt:sc.prompt||sc.title,options:sc.choices};
  }
  if(g.level===1 && g.role==='leader' && leaderTree[g.node])return leaderTree[g.node];
  const q=quickScenarios[`${g.level}:${g.role}`]||quickScenarios['1:0'];
  return {...q,prompt:q.prompt||q.title,options:q.choices};
}

function chatView(){
  const g=state.game;
  const current=currentNode();
  const lines=[...g.history,...current.messages.map(([name,text])=>({name,text}))];
  return shell('chat-page',`
<header class="chat-head"><button class="circle-action" data-go="stages" aria-label="Quay lại">${icon('back')}</button><span class="chat-head-face">${player('idle')}</span><div class="chat-head-text"><strong>${g.mode==='reversal'?'ĐẢO VAI / GÓC NHÌN KHÁC':'Nhóm Bài Tập · Ải '+g.level}</strong><small>Bạn đang là ${safe(role(g.role).name)}</small></div><span class="timer" id="game-count">${state.gameTime}s</span><button class="circle-action" data-go="home" aria-label="Trang chủ">${icon('home')}</button></header>
<div class="message-zone" id="message-zone"><div class="privacy-note">MÔ PHỎNG CHAT • KHÔNG GỬI TIN THẬT</div>${lines.map(x=>bubble(x.name,x.text)).join('')}</div>
<div class="decision-box"><div class="decision-head"><b>${safe(current.prompt||current.title||'Bạn sẽ phản hồi thế nào?')}</b><small>20 GIÂY / LƯỢT</small></div><div class="time-track"><span id="time-fill" style="width:${state.gameTime*5}%"></span></div>
${current.options.map((o,i)=>`<button class="decision-choice" data-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(o.text)}</button>`).join('')}</div>`)}

function getEnding(){
  const g=state.game;
  if(g.mode==='reversal')return g.reversalOutcome;
  if(g.ending)return leaderEndings[g.ending]||leaderEndings.E1;
  return g.quickOutcome;
}

function endingView(){
  const g=state.game;
  const o=getEnding();
  const tone=o.tone||o.type||'mid';
  const l=level(state.level);
  const nextStageIndex=state.stage+1;
  const hasNextStage=nextStageIndex<l.stages.length;
  const nextLvlId=state.level+1;
  const nextLvl=levels.find(x=>x.id===nextLvlId);
  const isFinalCampaignLevel=state.level===2&&!hasNextStage;
  const hasNextLevel=!hasNextStage&&Boolean(nextLvl)&&!isFinalCampaignLevel;
  return shell('interior-page ending-page',`${topbar(g.mode==='reversal'?'Đảo vai hoàn tất':'Lesson Unlocked','stages',true)}
<div class="page-body"><div class="ending-medal ${tone}">${avatar(tone==='good'?'follower':tone==='bad'?'qc':'mediator','medal-character',tone==='good'?'walk_a':'idle')}</div>
<h2 class="ending-title">${safe(o.name||(tone==='good'?'Giải quyết hiệu quả':tone==='bad'?'Nhóm gặp khó khăn':'Cần điều chỉnh'))}</h2><p class="ending-desc">${safe(o.message||o.answer)}</p>
<div class="lesson-card"><div class="lesson-caption">${icon('book')} LESSON UNLOCKED</div><p>${safe(o.lesson)}</p></div>
${o.template?`<div class="lesson-card template-card"><strong>VÍ KỊCH BẢN • MẪU TIN NHẮN</strong><p>${safe(o.template)}</p><button class="small-button" data-action="save-template">${icon('check')} Lưu mẫu tin nhắn</button></div>`:''}
<div class="action-stack">
  ${hasNextStage?`<button class="game-btn green full" data-action="next-stage">${icon('play')} Màn tiếp theo</button>`:''}
  ${hasNextLevel?`<button class="game-btn green full" data-action="next-level">${icon('play')} Sang Ải ${nextLvl.id}: ${safe(nextLvl.name)}</button>`:''}
  ${isFinalCampaignLevel?`<button class="game-btn green full" data-action="finish-campaign">${icon('spark')} Xem lộ trình tiếp theo</button>`:''}
  ${g.mode==='reversal'?'':`<button class="game-btn pale full" data-action="reversal">${icon('rotate')} THỬ ĐẢO VAI</button>`}
  <div class="button-pair">${btn('Chơi lại','replay','sky')}${btn('Bản đồ','map',hasNextStage||hasNextLevel||isFinalCampaignLevel?'pale':'green')}</div>
</div><p class="small-note">Kết quả chỉ là tình huống mô phỏng, không dự đoán chắc chắn phản ứng ngoài đời.</p></div>`)}

function walletView(){return shell('interior-page',`${topbar('Ví kịch bản','map',true)}<div class="page-body"><div class="page-intro">Lưu và sao chép các mẫu tin nhắn từ màn chơi đã hoàn thành.</div>${state.wallet.length?state.wallet.map((w,i)=>`<article class="lesson-card wallet-item"><strong>Mẫu tin nhắn ${i+1}</strong><p>${safe(w.text)}</p><button class="small-button" data-copy="${i}">${icon('chat')} Sao chép</button></article>`).join(''):`<div class="empty-wallet">${avatar('follower','empty-char')}<h2>Ví của bạn đang trống</h2><p>Hoàn thành một màn chơi để lưu tin nhắn thực chiến.</p></div>`}${btn('Quay lại bản đồ','map','green full')}</div>`)}

function render(){
  const mapRender={home,map,roles:rolesView,custom:customView,stages:stagesView,stageIntro,stagePreview,comingSoon:comingSoonView,quiz:quizView,quizResult,personaGallery,chat:chatView,ending:endingView,wallet:walletView,replay:()=>{startGame();return ''}};
  ROOT.innerHTML=(mapRender[state.screen]||home)();
  if(state.screen==='quizResult')updatePersonaCanvas();
  if(state.screen==='chat'){document.getElementById('message-zone')?.scrollTo(0,9999)}
  if(state.screen==='quiz')runQuizClock();
  if(state.screen==='chat')runGameClock();
}

function runQuizClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='quiz'){stopClock();return;}state.quizTime=Math.max(0,state.quizTime-1);const el=document.getElementById('quiz-count');if(el)el.textContent=state.quizTime+'s';if(state.quizTime===0)finishQuiz()},1000)}
function runGameClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='chat'){stopClock();return;}state.gameTime=Math.max(0,state.gameTime-1);const el=document.getElementById('game-count');const bar=document.getElementById('time-fill');if(el)el.textContent=state.gameTime+'s';if(bar)bar.style.width=(state.gameTime*5)+'%';if(state.gameTime===0)autoGameEnd()},1000)}

function startQuiz(){state.previewPersona=null;state.quizIndex=0;state.quizAnswers=[];state.quizTime=60;route('quiz')}
function chooseQuiz(index){const ans=quizQuestions[state.quizIndex].answers[index];if(!ans)return;state.quizAnswers.push(ans[1]);if(state.quizIndex===4)finishQuiz();else {state.quizIndex++;render()}}
function finishQuiz(){state.previewPersona=null;const tally={};state.quizAnswers.forEach(x=>tally[x]=(tally[x]||0)+1);state.persona=Object.entries(tally).sort((a,b)=>b[1]-a[1])[0]?.[0]||'bee';save();route('quizResult')}

function openLevel(id){
  const lvlId=Number(id);
  if(lvlId>2){
    toast('Nội dung Ải này đang được cập nhật. Hãy hoàn thành Ải 1 & Ải 2 trước nhé!');
    return;
  }
  if(!isLevelUnlocked(lvlId)){
    toast(`Ải ${lvlId} chưa mở khóa! Hãy hoàn thành ải trước.`);
    return;
  }
  state.level=lvlId;
  route('stages');
}

function openStage(index){
  state.stage=Number(index);
  const l=level(state.level);
  if(l.id>2)return route('comingSoon');
  if(!isLevelUnlocked(l.id)){
    toast(`Ải ${l.id} chưa mở khóa!`);
    return route('map');
  }
  if(!isStageUnlocked(l.id,state.stage)){
    toast(`Màn ${state.stage+1} chưa mở khóa! Hãy hoàn thành màn trước.`);
    return route('stages');
  }
  const stageKey=`${l.id}:${state.stage}`;
  if(!stageScenarios[stageKey]&&!quickScenarios[stageKey])return route('stagePreview');
  const targetRole=stageRoleMap?.[stageKey]||(l.roles.includes(state.role)?state.role:l.roles[0]);
  if(state.role!==targetRole){
    state.role=targetRole;
    save();
  }
  route('stageIntro');
}

function startGame(){
  state.game={level:state.level,role:state.role,mode:'main',node:'start',history:[],ending:null,quickOutcome:null,reversalOutcome:null};
  state.gameTime=20;
  route('chat');
}

function finishMain(){
  const key=`${state.game.level}:${state.stage}:${state.role}`;
  if(!state.done.includes(key))state.done.push(key);
  const l=level(state.level);
  if(state.stage<l.stages.length-1){
    unlockStage(state.level,state.stage+1);
  }else{
    const nextLvlId=state.level+1;
    if(nextLvlId<=levels.length){
      unlockLevel(nextLvlId);
      unlockStage(nextLvlId,0);
    }
  }
  save();
  route('ending');
}

function nextStage(){
  const l=level(state.level);
  const nextIndex=state.stage+1;
  if(nextIndex<l.stages.length){
    state.stage=nextIndex;
    unlockStage(state.level,nextIndex);
    openStage(nextIndex);
  }else{
    if(state.level>=2){
      finishCampaign();
    }else{
      nextLevel();
    }
  }
}

function nextLevel(){
  const nextLvlId=state.level+1;
  const nextLvl=levels.find(x=>x.id===nextLvlId);
  if(!nextLvl||nextLvlId>2)return finishCampaign();
  state.level=nextLvlId;
  state.stage=0;
  unlockLevel(nextLvlId);
  unlockStage(nextLvlId,0);
  const stageKey=`${nextLvlId}:0`;
  const targetRole=stageRoleMap?.[stageKey]||nextLvl.roles[0];
  state.role=targetRole;
  save();
  toast(`Bắt đầu Ải ${nextLvl.id}: ${nextLvl.name}`);
  openStage(0);
}

function finishCampaign(){
  toast('Chúc mừng bạn đã hoàn thành toàn bộ nội dung hiện có (Ải 1 & Ải 2)! Các Ải 3, 4, 5 đang được cập nhật.');
  route('map');
}

function playCampaign(){
  const l1=levels[0];
  const l2=levels[1];
  const l1Unfinished=l1.stages.findIndex((_,i)=>!state.done.some(k=>k.startsWith(`1:${i}:`)));
  if(l1Unfinished!==-1){
    state.level=1;
    state.stage=l1Unfinished;
    if(!isStageUnlocked(1,l1Unfinished))unlockStage(1,l1Unfinished);
    save();
    return openStage(l1Unfinished);
  }
  if(!isLevelUnlocked(2)){
    unlockLevel(2);
    unlockStage(2,0);
  }
  const l2Unfinished=l2.stages.findIndex((_,i)=>!state.done.some(k=>k.startsWith(`2:${i}:`)));
  if(l2Unfinished!==-1){
    state.level=2;
    state.stage=l2Unfinished;
    if(!isStageUnlocked(2,l2Unfinished))unlockStage(2,l2Unfinished);
    save();
    return openStage(l2Unfinished);
  }
  toast('Bạn đã hoàn thành toàn bộ nội dung hiện có! Đang mở Ải 1 để bạn trải nghiệm lại.');
  state.level=1;
  state.stage=0;
  save();
  route('stages');
}

function answerGame(index){
  const g=state.game;
  const node=currentNode();
  const o=node.options[index];
  if(!o)return;
  g.history.push(...node.messages.map(([name,text])=>({name,text})),{name:'Bạn',text:o.template||o.text});
  if(g.mode==='reversal'){
    g.reversalOutcome={name:'Đảo vai hoàn tất',type:o.type,answer:o.answer,lesson:o.lesson};
    route('ending');
    return;
  }
  if(o.to){
    if(o.to.startsWith('E')){
      g.ending=o.to;
      finishMain();
    }else{
      g.node=o.to;
      state.gameTime=20;
      render();
    }
  }else{
    g.quickOutcome={
      name:o.name||(o.type==='good'?'Cả nhóm đã tiến lên!':o.type==='bad'?'Nhóm vẫn bế tắc':'Có điều cần cải thiện'),
      type:o.type,
      answer:o.answer||o.result,
      lesson:o.lesson,
      template:o.template
    };
    finishMain();
  }
}

function autoGameEnd(){
  const g=state.game;
  if(!g)return;
  if(g.mode==='reversal'){
    g.reversalOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Cả nhóm không biết bạn đang nghĩ gì.',lesson:'Im lặng cũng ảnh hưởng đến việc phối hợp.'};
    route('ending');
    return;
  }
  if(g.ending)g.ending='E1';
  else g.quickOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Không có phản hồi kịp thời.',lesson:'Chủ động lên tiếng giúp nhóm hoạt động hiệu quả.'};
  finishMain();
}

function startReversal(){state.game={...state.game,mode:'reversal',history:[]};state.gameTime=20;route('chat')}
function saveTemplate(){const o=getEnding();if(!o?.template)return;state.wallet.unshift({level:state.game.level,text:o.template});state.wallet=state.wallet.slice(0,30);save();toast('Đã lưu mẫu tin nhắn vào ví')}
async function copyWallet(index){const w=state.wallet[index];if(!w)return;try{await navigator.clipboard.writeText(w.text);toast('Đã sao chép')}catch{toast('Trình duyệt không cho phép sao chép tự động')}}

ROOT.addEventListener('click',e=>{
  if(e.target.closest('#btn-focus-nick')||(e.target.closest('.nick-wrap')&&e.target.id!=='player-nickname')){
    const inp=document.getElementById('player-nickname');
    if(inp){inp.focus();inp.select?.();}
    return;
  }
  let x=e.target.closest('[data-go]');
  if(x){
    if(x.dataset.go==='replay'||x.dataset.go==='beginStage')return startGame();
    if(x.dataset.go==='next-stage')return nextStage();
    if(x.dataset.go==='next-level')return nextLevel();
    if(x.dataset.go==='finish-campaign')return finishCampaign();
    return route(x.dataset.go);
  }
  x=e.target.closest('[data-level]');
  if(x){
    const lvlId=Number(x.dataset.level);
    if(lvlId>2){
      x.classList.remove('lock-shake');
      void x.offsetWidth;
      x.classList.add('lock-shake');
      toast('Nội dung Ải này đang được cập nhật. Hãy hoàn thành Ải 1 & Ải 2 trước nhé!');
      return;
    }
    if(!isLevelUnlocked(lvlId)){
      toast(`Ải ${lvlId} chưa mở khóa! Hãy hoàn thành ải trước.`);
      return;
    }
    return openLevel(lvlId);
  }
  x=e.target.closest('[data-role]');if(x){state.role=x.dataset.role;save();return render()}
  x=e.target.closest('[data-custom-role]');if(x){state.role=x.dataset.customRole;save();return route('custom')}
  x=e.target.closest('[data-outfit]');if(x){state.outfit=x.dataset.outfit;save();return render()}
  x=e.target.closest('[data-stage]');if(x)return openStage(x.dataset.stage);
  x=e.target.closest('[data-quiz]');if(x)return chooseQuiz(Number(x.dataset.quiz));
  x=e.target.closest('[data-persona-preview]');if(x){state.previewPersona=x.dataset.personaPreview;return route('quizResult')}
  x=e.target.closest('[data-choice]');if(x)return answerGame(Number(x.dataset.choice));
  x=e.target.closest('[data-copy]');if(x)return copyWallet(Number(x.dataset.copy));
  x=e.target.closest('[data-action]');
  if(!x)return;
  if(x.dataset.action==='play-campaign')return playCampaign();
  if(x.dataset.action==='start-quiz')startQuiz();
  if(x.dataset.action==='save-template')saveTemplate();
  if(x.dataset.action==='reversal')startReversal();
  if(x.dataset.action==='next-stage')nextStage();
  if(x.dataset.action==='next-level')nextLevel();
  if(x.dataset.action==='finish-campaign')finishCampaign();
  if(x.dataset.action==='download-card')downloadPersonaCard();
  if(x.dataset.action==='share-card')sharePersonaCard();
});

ROOT.addEventListener('input',e=>{if(e.target.id==='player-nickname'){state.nickname=e.target.value.slice(0,22);save();updatePersonaCanvas();}});

// Sparkle Click Effect
const SPARKLE_COLORS=['#FFD166','#FF8FAB','#72EFDD','#BDB2FF','#FFFFFF'];
function spawnSparkles(x,y){
  if(typeof x!=='number'||typeof y!=='number'||isNaN(x)||isNaN(y))return;
  const count=6+Math.floor(Math.random()*3);
  const fragment=document.createDocumentFragment();
  for(let i=0;i<count;i++){
    const el=document.createElement('span');
    const color=SPARKLE_COLORS[Math.floor(Math.random()*SPARKLE_COLORS.length)];
    const isStar=i%3!==0;
    const angle=(Math.PI*2*i)/count+(Math.random()-0.5)*0.5;
    const dist=25+Math.random()*30;
    const dx=Math.round(Math.cos(angle)*dist);
    const dy=Math.round(Math.sin(angle)*dist);
    const rot=Math.round((Math.random()-0.5)*180);
    const duration=Math.round(500+Math.random()*150);
    el.className=`click-sparkle ${isStar?'click-sparkle-star':'click-sparkle-dot'}`;
    el.style.left=`${x}px`;
    el.style.top=`${y}px`;
    el.style.setProperty('--dx',`${dx}px`);
    el.style.setProperty('--dy',`${dy}px`);
    el.style.setProperty('--rot',`${rot}deg`);
    el.style.setProperty('--duration',`${duration}ms`);
    if(isStar){
      const size=Math.round(14+Math.random()*8);
      el.style.width=`${size}px`;
      el.style.height=`${size}px`;
      el.innerHTML=`<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z" fill="${color}"/></svg>`;
    }else{
      const size=Math.round(5+Math.random()*4);
      el.style.width=`${size}px`;
      el.style.height=`${size}px`;
      el.style.background=color;
    }
    el.addEventListener('animationend',()=>el.remove(),{once:true});
    setTimeout(()=>el.remove(),duration+100);
    fragment.appendChild(el);
  }
  document.body.appendChild(fragment);
}
window.addEventListener('pointerdown',e=>{if(e.clientX||e.clientY)spawnSparkles(e.clientX,e.clientY)},{passive:true});

route('home');
