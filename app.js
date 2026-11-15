import {roles, personas, quizQuestions, levels, quickScenarios, reversals, stageRoleMap, stageUIMode, charTypes, allOutfits} from './data.js';
import {ROUNDTABLE_BACKDROP_SVG, renderRoundtableCharacters, startMouthFlap, stopMouthFlap, focusRoundtableSpeaker, applyRoundtableExpressions} from './roundtable-scene-v5.js';

const ROOT=document.getElementById('app');
const TURN_SECONDS=60; // Nâng cấp V5: 60 giây mỗi lượt quyết định tình huống
const fmtTime=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
const TOAST=document.getElementById('toast');
const STORE='teamcraft-redesign-v5';

// Tương thích ngược từ v3/v4 sang v5
let saved={};
try {
  saved=JSON.parse(localStorage.getItem(STORE)||localStorage.getItem('teamcraft-redesign-v3')||'{}');
} catch{}

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

// Danh sách trang phục hợp lệ V5
const VALID_OUTFITS = ['vnu','ulis','uet','ueb','sis','christmas','halloween'];
const initialOutfit = (saved.outfit && VALID_OUTFITS.includes(saved.outfit)) ? saved.outfit : 'vnu';

// State trung tâm của game V5
const state = {
  screen: saved.avatarType ? 'home' : 'charSelect', // Nếu chưa chọn nhân vật thì vào chọn trước
  avatarType: saved.avatarType || 'boy',            // boy | girl | cat | rabbit | bear | frog
  level: 1,
  stage: 0,
  role: saved.role || 'leader',
  outfit: initialOutfit,
  ownedOutfits: Array.from(new Set(['vnu', ...(Array.isArray(saved.ownedOutfits) ? saved.ownedOutfits.filter(x=>VALID_OUTFITS.includes(x)) : [])])),
  persona: saved.persona || null,
  quizAnswers: [],
  quizIndex: 0,
  quizTime: 60,
  gameTime: TURN_SECONDS,
  game: null,
  done: saved.done || [],
  wallet: saved.wallet || [],
  unlockedStages: initialStages,
  unlockedLevels: initialLevels,
  hearts: typeof saved.hearts === 'number' ? saved.hearts : 60,
  coins: typeof saved.coins === 'number' ? saved.coins : 200, // 200 xu ban đầu
  selectedReaction: null,
  rtTypingTimer: null
};

let clock = null;

const safe=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const role=id=>roles.find(r=>r.id===id)||roles[0];
const level=id=>levels.find(l=>l.id===Number(id))||levels[0];

function save(){
  try{
    const payload = {
      avatarType: state.avatarType,
      role: state.role,
      outfit: state.outfit,
      persona: state.persona,
      done: state.done,
      wallet: state.wallet,
      unlockedStages: state.unlockedStages,
      unlockedLevels: state.unlockedLevels,
      hearts: state.hearts,
      coins: state.coins,
      ownedOutfits: state.ownedOutfits
    };
    localStorage.setItem(STORE, JSON.stringify(payload));
    localStorage.setItem('unlockedStages', JSON.stringify(state.unlockedStages));
    localStorage.setItem('unlockedLevels', JSON.stringify(state.unlockedLevels));
  }catch{}
}

const HEART_DELTA={good:8,mid:2,bad:-6};
function applyReward(type,coinGain){
  const delta=HEART_DELTA[type]||0;
  state.hearts=Math.max(0,Math.min(100,state.hearts+delta));
  state.coins+=coinGain;
  save();
  const bits=[];
  if(delta)bits.push(`${delta>0?'+':''}${delta} Thấu cảm`);
  if(coinGain)bits.push(`+${coinGain} xu`);
  if(bits.length)toast(bits.join(' • '),true);
}

const isLevelUnlocked=lvlId=>{const n=Number(lvlId);return n===1||state.unlockedLevels.includes(n)};
const isStageUnlocked=(lvlId,stgIdx)=>{if(!isLevelUnlocked(lvlId))return false;if(stgIdx===0)return true;return state.unlockedStages.includes(`${lvlId}:${stgIdx}`)};
function unlockLevel(lvlId){const n=Number(lvlId);if(!state.unlockedLevels.includes(n)){state.unlockedLevels.push(n)}unlockStage(n,0);save()}
function unlockStage(lvlId,stgIdx){const key=`${lvlId}:${stgIdx}`;if(!state.unlockedStages.includes(key)){state.unlockedStages.push(key);save()}}

const icon=(name,cls='')=>`<img class="icon ${cls}" src="assets/ui/${name}.svg" alt="">`;

// Sprite resolver hỗ trợ avatarType và 10 biểu cảm:
function sprite(id, pose='idle') {
  if (id === 'player') {
    return state.avatarType === 'boy' ? `assets/characters/${state.role}_${pose}.svg` : `assets/characters/${state.avatarType}_${pose}.svg`;
  }
  return `assets/characters/${id}_${pose}.svg`;
}

function avatar(id, cl='', pose='idle') {
  return `<img class="character ${cl}" src="${sprite(id,pose)}" alt="">`;
}

const player=(pose='idle',cl='')=>avatar('player',cl,pose);

// Render trang phục trường học đã mặc
function outfitted(cl='') {
  const base = state.avatarType === 'boy' ? state.role : state.avatarType;
  return `<img class="character ${cl}" src="assets/characters/${base}_outfit_${state.outfit}.svg" alt="">`;
}

const logo=(sm=false)=>`<div class="brand ${sm?'brand-sm':''}"><span>TEAM</span><span>CRAFT</span></div>`;
const shell=(cls,html)=>`<main class="device"><section class="page ${cls}">${html}</section></main>`;
const btn=(label,action='map',variant='green',extras='')=>`<button class="game-btn ${variant}" data-go="${action}" ${extras}>${label}</button>`;
const topbar=(title,go='map',showHome=false)=>`<header class="page-top"><button class="circle-action" data-go="${go}" aria-label="Quay lại">${icon('back')}</button><h1>${safe(title)}</h1>${showHome?`<button class="circle-action" data-go="home" aria-label="Trang chủ">${icon('home')}</button>`:`<div class="page-top-spacer"></div>`}</header>`;

function toast(text,reward=false){
  TOAST.textContent=text;
  TOAST.classList.toggle('reward',reward);
  TOAST.classList.add('on');
  clearTimeout(TOAST._t);
  TOAST._t=setTimeout(()=>TOAST.classList.remove('on'),2400);
}

function stopClock(){
  if(clock!==null)clearInterval(clock);
  clock=null;
  if(state.rtTypingTimer)clearInterval(state.rtTypingTimer);
  state.rtTypingTimer=null;
}

function route(screen){
  stopClock();
  state.screen=screen;
  render();
  window.scrollTo(0,0);
}

// -------------------------------------------------------------
// 1. MÀN HÌNH CHỌN NHÂN VẬT (MALE / FEMALE / CUTE MASCOTS)
// -------------------------------------------------------------
function charSelectView(){
  return shell('interior-page',`
    ${topbar('Chọn Diện Mạo', state.screen==='charSelect' && saved.avatarType ? 'custom' : 'home')}
    <div class="page-body">
      <div class="page-intro">
        <strong>Chào mừng bạn đến với TEAM-CRAFT!</strong><br>
        Hãy chọn diện mạo đại diện của bạn. Giới tính và vai trò trong nhóm hoàn toàn độc lập với nhau.
      </div>
      <div class="char-select-grid">
        ${charTypes.map(c => `
          <button class="char-select-tile ${state.avatarType===c.id?'active':''}" data-set-avatar="${c.id}">
            <div class="char-select-figure">${avatar(c.id==='boy'?'leader':c.id, '', 'talk')}</div>
            <b>${safe(c.name)}</b>
            <small>${safe(c.desc)}</small>
            ${state.avatarType===c.id ? `<span class="checkmark">${icon('check')}</span>` : ''}
          </button>
        `).join('')}
      </div>
      <button class="game-btn green full large" style="margin-top:12px" data-action="confirm-avatar">
        ${icon('check')} Xác Nhận & Bắt Đầu
      </button>
    </div>
  `);
}

// -------------------------------------------------------------
// 2. TRANG CHỦ & BẢN ĐỒ
// -------------------------------------------------------------
function home(){
  return shell('home-page',`
    <header class="home-head">
      <div class="logo-mark">${icon('spark')} TEAM-CRAFT V5</div>
      <div class="home-head-right">
        <button class="head-action" data-go="shop">${icon('gift')} Shop (${state.coins} xu)</button>
        <button class="head-action" data-go="wallet">${icon('book')} Ví (${state.wallet.length})</button>
      </div>
    </header>
    <section class="home-hero">
      <div class="sparkle one"></div><div class="sparkle two"></div>
      <div class="home-ribbon">WEBGAME MÔ PHỎNG KỸ NĂNG LÀM VIỆC NHÓM</div>
      ${logo()}
      <p class="hero-tagline">Mọi mắt xích đều tạo nên chiến thắng!</p>
      <div class="character-group">
        <div class="podium podium-left"></div><div class="podium podium-right"></div>
        ${avatar('mediator','home-person left','happy')}
        ${outfitted('home-person lead')}
        ${avatar('doer','home-person right','talk')}
      </div>
      <div class="talk-label">Chọn cách ứng xử. Xem điều gì sẽ xảy ra!</div>
    </section>
    <section class="home-cta">
      <button class="game-btn green large" data-go="map">${icon('play')} BẮT ĐẦU CHƠI</button>
      <button class="game-btn pale large" data-action="start-quiz">${icon('star')} LÀM QUIZ 60 GIÂY</button>
    </section>
    <div class="home-feature-strip">
      <div data-go="charSelect" style="cursor:pointer">${icon('team')}<span>DIỆN MẠO</span></div>
      <div data-go="roles" style="cursor:pointer">${icon('rotate')}<span>5 VAI TRÒ</span></div>
      <div data-go="shop" style="cursor:pointer">${icon('gift')}<span>ĐỒNG PHỤC</span></div>
    </div>
    <p class="footer-note">Phiên bản V5 • Đại học Quốc gia Hà Nội • 2 Ải hoàn chỉnh</p>
  `);
}

const mapNPCLayout=[
 ['student-a',14.5,30.5,'happy','kid-a'],['student-c',82,35.5,'talk','kid-b'],
 ['student-b',14.2,56.3,'idle','kid-c'],['student-a',86,63.5,'walk_a','kid-d']
];

function map(){
  const nodes=[
   {n:5,x:49,y:24.6,cap:'BOSS CUỐI',name:'Dự Án Công Sở',theme:'boss'},
   {n:4,x:65,y:38.2,cap:'CĂNG THẲNG',name:'Trùm Free-rider',theme:'danger'},
   {n:3,x:43,y:51,cap:'TĂNG ÁP LỰC',name:'Nước Đến Chân Mới Nhảy',theme:'orange'},
   {n:2,x:52,y:65.4,cap:'TRUNG BÌNH',name:'Người Lạ Ơi',theme:'blue'},
   {n:1,x:31,y:79.7,cap:'DỄ',name:'Nhóm Bạn Thân',theme:'green'}
  ];
  const playableLevels=state.unlockedLevels.filter(n=>n<=2);
  const highestPlayableLevel=playableLevels.length?Math.max(...playableLevels):1;
  return shell('map-page',`
    <img class="map-scene" src="assets/campus-map.webp" alt="Khuôn viên trường học">
    <div class="map-hud">
      <div class="map-hud-left">
        <button class="circle-action" data-go="home" aria-label="Trang chủ">${icon('home')}</button>
        <button class="map-logo" data-go="home">${logo(true)}</button>
      </div>
      <div class="resources">
        <span>${icon('heart')} <b>${state.hearts}</b></span>
        <span>${icon('coin')} <b>${state.coins}</b></span>
      </div>
    </div>
    ${mapNPCLayout.map(([name,x,y,pose,id])=>`<img class="map-npc ${id}" src="${sprite(name,pose)}" style="left:${x}%;top:${y}%" alt="">`).join('')}
    ${nodes.map(n=>{
      const unlocked=isLevelUnlocked(n.n);
      const isDev=n.n>2;
      const themeIcon={1:'check',2:'chat',3:'clock',4:'bolt',5:'skull'}[n.n];
      const needsLockBadge=!unlocked&&!isDev;
      const orbIcon=`${icon(themeIcon)}${needsLockBadge?`<span class="lock-badge">${icon('lock')}</span>`:''}`;
      let labelText=unlocked?(isDev?(n.n===3?'ĐANG PHÁT TRIỂN':'CHƯA CẬP NHẬT'):n.cap):(n.n<=2?'CHƯA MỞ KHÓA':'CHƯA CẬP NHẬT');
      const devClass=isDev?(unlocked?'is-dev is-unlocked':'is-dev is-locked'):(unlocked?'is-unlocked':'is-locked');
      return `<button class="level-spot ${n.theme} ${devClass}" style="left:${n.x}%;top:${n.y}%" data-level="${n.n}">
        <span class="level-orb">${orbIcon}</span>
        <span class="level-copy"><b>ẢI ${n.n}: ${n.name}</b><small>${labelText}</small></span>
      </button>`;
    }).join('')}
    <nav class="map-dock">
      <button data-go="roles" class="dock-small">${icon('team')}<span>Vai trò</span></button>
      <button class="dock-play" data-level="${highestPlayableLevel}">${icon('play')}<strong>CHƠI NGAY</strong></button>
      <button data-go="wallet" class="dock-small">${icon('book')}<span>Ví kịch bản</span></button>
    </nav>
  `);
}

// -------------------------------------------------------------
// 3. VAI TRÒ, TÙY CHỈNH & CỬA HÀNG TRANG PHỤC V5
// -------------------------------------------------------------
function rolesView(){
  const r=role(state.role);
  return shell('interior-page',`
    ${topbar('Chọn vai trò','map')}
    <div class="page-body">
      <div class="page-intro">Mỗi vai trò có góc nhìn, trách nhiệm và cách giải quyết khác nhau.</div>
      <div class="role-grid">
        ${roles.map(item=>`
          <button class="role-tile ${state.role===item.id?'active':''}" data-role="${item.id}">
            <div class="role-figure">${avatar(item.id,'role-char',state.role===item.id?'happy':'idle')}</div>
            <b>${safe(item.name)}</b>
            <small>${item.en}</small>
            ${state.role===item.id?`<span class="checkmark">${icon('check')}</span>`:''}
          </button>
        `).join('')}
      </div>
      <div class="role-summary">
        <div class="role-portrait">${player('happy','portrait-char')}</div>
        <div><strong>${safe(r.name)}</strong><p>${safe(r.skill)}</p></div>
      </div>
      <div class="button-pair">
        ${btn(`${icon('edit')} Tùy chỉnh`,'custom','sky')}
        ${btn('Vào Bản đồ','map','green')}
      </div>
    </div>
  `);
}

function customView(){
  const base = state.avatarType === 'boy' ? state.role : state.avatarType;
  return shell('interior-page',`
    ${topbar('Tùy chỉnh nhân vật','roles')}
    <div class="page-body">
      <div class="preview-stage">
        <div class="preview-ring"></div>
        ${outfitted('preview-character')}
        <div class="preview-name">${safe(role(state.role).name)} (${state.avatarType.toUpperCase()})</div>
      </div>
      <div class="button-pair">
        <button class="game-btn pale full" data-go="charSelect">${icon('team')} Đổi Diện Mạo / Giới Tính</button>
        <button class="game-btn sky full" data-go="shop">${icon('gift')} Cửa Hàng Đồng Phục</button>
      </div>
      <h2 class="subheading">Tủ đồ đồng phục ĐHQGHN</h2>
      <div class="outfit-row">
        ${allOutfits.map(x=>{
          const owned=state.ownedOutfits.includes(x.id);
          return `<button class="outfit-item ${x.id===state.outfit?'active':''} ${owned?'':'is-locked'}" ${owned?`data-outfit="${x.id}"`:'data-go="shop"'}>
            <img src="assets/characters/${base}_outfit_${x.id}.svg" alt="">
            <span>${x.name}</span>
            ${owned?'':`<em class="outfit-price">${icon('coin')}${x.cost}</em>`}
          </button>`;
        }).join('')}
      </div>
      ${btn(`${icon('check')} Hoàn tất`,'roles','green full')}
    </div>
  `);
}

function shopView(){
  const base = state.avatarType === 'boy' ? state.role : state.avatarType;
  return shell('interior-page',`
    ${topbar('Shop Trang Phục V5','custom',true)}
    <div class="page-body">
      <div class="shop-balance">${icon('coin')} Số dư hiện có: <b>${state.coins}</b> Xu</div>
      <div class="page-intro">Mở khóa đồng phục các trường thành viên ĐHQGHN và trang phục mùa lễ hội bằng Xu kiếm được khi giải quyết drama nhóm!</div>
      <div class="shop-grid">
        ${allOutfits.map(x=>{
          const owned=state.ownedOutfits.includes(x.id);
          const afford=state.coins>=x.cost;
          return `
            <div class="shop-item">
              <div class="shop-item-img">
                <img src="assets/characters/${base}_outfit_${x.id}.svg" alt="">
              </div>
              <b>${safe(x.name)}</b>
              <small style="font-size:9.5px;color:#788696">${safe(x.desc)}</small>
              ${owned ? `
                <span class="shop-tag owned">${icon('check')} Đã sở hữu</span>
              ` : x.cost ? `
                <button class="shop-buy ${afford?'':'is-disabled'}" data-buy="${x.id}">
                  ${icon('coin')} Mua ${x.cost} xu
                </button>
              ` : `
                <span class="shop-tag owned">${icon('check')} Miễn phí</span>
              `}
            </div>
          `;
        }).join('')}
      </div>
      <p class="small-note">Mua xong sẽ mở khóa vĩnh viễn và tự động mặc. Đổi vai trò hoặc giới tính vẫn giữ nguyên trang phục đã mua.</p>
      ${btn(`${icon('edit')} Về Tùy chỉnh nhân vật`,'custom','green full')}
    </div>
  `);
}

function buyOutfit(id){
  if(state.ownedOutfits.includes(id)){
    state.outfit=id;
    save();
    toast('Đã mặc trang phục này!');
    return render();
  }
  const item=allOutfits.find(o=>o.id===id);
  if(!item)return;
  if(state.coins < item.cost){
    toast(`Thiếu Xu rồi! Cần ${item.cost} xu nhưng bạn chỉ có ${state.coins} xu. Hãy chơi thêm để tích lũy nhé!`);
    return;
  }
  state.coins -= item.cost;
  state.ownedOutfits.push(id);
  state.outfit = id;
  save();
  toast(`🎉 Đã mở khóa vĩnh viễn & mặc áo "${item.name}" (-${item.cost} xu)!`, true);
  render();
}

// -------------------------------------------------------------
// 4. DANH SÁCH MÀN CHƠI & COMING SOON
// -------------------------------------------------------------
function comingSoonView(){
  const l=level(state.level);
  return shell('interior-page',`
    ${topbar('Ải '+l.id+': '+l.name,'map',true)}
    <div class="page-body centered">
      <div class="preview-stage small" style="margin-bottom:6px">${avatar(l.roles?.[0]||'leader','preview-character','worried')}</div>
      <div style="text-align:center">
        <span class="coming-badge-tag">${icon('spark')} ĐANG PHÁT TRIỂN (DEMO)</span>
        <h2 class="coming-title">ẢI ${l.id}: ${safe(l.name)}</h2>
      </div>
      <div class="lesson-card coming-soon-card">
        <div class="coming-highlight-icon">${icon('clock')}</div>
        <p class="coming-message"><strong>Nội dung Ải ${l.id} đang được đội ngũ hoàn thiện kịch bản!</strong></p>
        <p class="coming-subtext">Hệ thống kịch bản, nhánh đối thoại thực chiến và bài học chuyên sâu của Ải ${l.id} sẽ ra mắt trong bản cập nhật kế tiếp.</p>
        <div class="coming-info-box">
          <div><b>Chủ đề:</b> ${safe(l.description)}</div>
          <div><b>Vai trò:</b> ${l.roles.map(id=>role(id).name).join(' • ')}</div>
          <div><b>Quy mô:</b> ${l.stages.length} tình huống mô phỏng</div>
        </div>
      </div>
      <div class="button-pair" style="margin-top:16px">
        ${btn(`${icon('back')} Quay lại Bản đồ`,'map','green')}
        ${btn(`${icon('home')} Về Trang chủ`,'home','sky')}
      </div>
    </div>
  `);
}

function stagesView(){
  const l=level(state.level);
  if(l.id>2)return comingSoonView();
  return shell('interior-page',`
    ${topbar('Ải '+l.id+': '+l.name,'map',true)}
    <div class="page-body">
      <div class="stage-banner">
        <div>
          <span>CHƯƠNG ${l.id} • ${safe(l.sub)}</span>
          <h2>${safe(l.name)}</h2>
          <p>${safe(l.description)}</p>
        </div>
        ${avatar(l.roles[0],'banner-char','happy')}
      </div>
      <div class="level-info">Vai trò ở ải này: ${l.roles.map(id=>role(id).name).join(' • ')}</div>
      <div class="stage-list">
        ${l.stages.map((s,i)=>{
          const ready=isStageUnlocked(l.id,i);
          const uiType=stageUIMode[`${l.id}:${i}`]==='round'?'Bàn Tròn':'Chat';
          return `
            <button class="stage-item ${ready?'is-ready':'is-locked'}" data-stage="${i}">
              <span class="stage-image">${avatar(l.roles[i%l.roles.length],'stage-char',ready?'happy':'idle')}</span>
              <span class="stage-text">
                <b>MÀN ${i+1} · ${safe(s[0])} <span style="font-size:9px;background:#e2f2ff;color:#20639b;padding:2px 6px;border-radius:99px">${uiType}</span></b>
                <small>${safe(s[1])}</small>
                <em>${!ready?'CHƯA MỞ KHÓA':'CHƠI MÀN NÀY'}</em>
              </span>
              <span class="stage-icon">${icon(ready?'play':'lock')}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `);
}

// -------------------------------------------------------------
// 5. GAMEPLAY: CHAT VIEW & ROUNDTABLE VIEW
// -------------------------------------------------------------
const talkSprites={
  'Minh':'doer','Lan':'mediator','Huy':'follower','An':'leader','Bạn':null,
  'Hệ thống':'follower','Minh (suy nghĩ)':'doer','Leader':'leader','Doer':'doer',
  'QC':'qc','Mediator':'mediator','Active Follower':'follower','Bạn thân':'mediator',
  'A':'doer','B':'follower'
};

function bubble(name,msg){
  const mine=name==='Bạn';
  const id=talkSprites[name]||'follower';
  return `
    <div class="bubble-row ${mine?'self':''}">
      <span class="bubble-avatar">${mine ? player('talk','bubble-character') : avatar(id,'bubble-character',name==='Hệ thống'?'idle':'talk')}</span>
      <div class="bubble-content">
        <small>${safe(name)}</small>
        <p>${safe(msg)}</p>
      </div>
    </div>
  `;
}

function currentNode(){
  const g=state.game;
  const stageKey=`${g.level}:${state.stage}`;
  if(g.mode==='reversal'){
    const r=reversals[stageKey]||reversals['1:0'];
    return {messages:r.messages, prompt:r.prompt||`${r.title} — bạn sẽ phản hồi thế nào?`, options:r.choices};
  }
  if(quickScenarios[stageKey]){
    const q=quickScenarios[stageKey];
    return {...q, prompt:q.prompt||q.title, options:q.choices};
  }
  const q=quickScenarios[`${g.level}:${g.role}`];
  return {...q, prompt:q.prompt||q.title, options:q.choices};
}

// 5.1. Chat View (5 tình huống: 1:0, 1:3, 2:0, 2:1, 2:5)
function chatView(){
  const g=state.game;
  const current=currentNode();
  const lines=[...g.history,...current.messages.map(([name,text])=>({name,text}))];
  const urgentClass = state.gameTime <= 15 ? 'timer-urgent' : '';

  return shell('chat-page',`
    <header class="chat-head">
      <button class="circle-action" data-go="stages" aria-label="Quay lại">${icon('back')}</button>
      <span class="chat-head-face">${player('talk')}</span>
      <div class="chat-head-text">
        <strong>${g.mode==='reversal'?'ĐẢO VAI / GÓC NHÌN KHÁC':'Nhóm Bài Tập · Ải '+g.level}</strong>
        <small>Bạn đang đóng vai: ${safe(role(g.role).name)}</small>
      </div>
      <span class="timer ${urgentClass}" id="game-count">${fmtTime(state.gameTime)}</span>
    </header>
    <div class="message-zone" id="message-zone">
      <div class="privacy-note">MÔ PHỎNG CHAT NHÓM • 60 GIÂY / LƯỢT</div>
      ${lines.map(x=>bubble(x.name,x.text)).join('')}
    </div>
    <div class="decision-box">
      <div class="decision-head">
        <b>${safe(current.prompt||current.title||'Bạn sẽ phản hồi thế nào?')}</b>
        <small>60 GIÂY / LƯỢT</small>
      </div>
      <div class="time-track">
        <span id="time-fill" style="width:${state.gameTime/TURN_SECONDS*100}%"></span>
      </div>
      ${current.options.map((o,i)=>`
        <button class="decision-choice" data-choice="${i}">
          <span>${String.fromCharCode(65+i)}</span>
          ${safe(o.text)}
        </button>
      `).join('')}
    </div>
  `);
}

// 5.2. Roundtable View V5 (22 tình huống bàn tròn ngồi trao đổi trực tiếp)
function getRoundtableMoodsPDF(current, step, activeMsg) {
  const g = state.game;
  const stageKey = g ? `${g.level}:${state.stage}` : '';

  const CURATED_PDF_MOODS = {
    '1:1': [
      { Leader: 'thoughtful', Doer: 'neutral', QC: 'neutral', Mediator: 'neutral', BanThan: 'thoughtful' },
      { Leader: 'neutral', Doer: 'worried', QC: 'neutral', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'neutral', QC: 'serious', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'neutral', Doer: 'neutral', QC: 'neutral', Mediator: 'happy', BanThan: 'thoughtful' },
      { Leader: 'worried', Doer: 'worried', QC: 'thoughtful', Mediator: 'thoughtful', BanThan: 'worried' }
    ],
    '1:2': [
      { Leader: 'worried', Doer: 'neutral', QC: 'serious', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'neutral', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'neutral', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'worried', BanThan: 'worried' }
    ],
    '1:4': [
      { Leader: 'thoughtful', Doer: 'neutral', QC: 'worried', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'confused', QC: 'worried', Mediator: 'worried', BanThan: 'confused' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'happy', Doer: 'happy', QC: 'neutral', Mediator: 'happy', BanThan: 'happy' }
    ],
    '2:2': [
      { Leader: 'confused', Doer: 'worried', QC: 'confused', Mediator: 'worried', BanThan: 'thoughtful' },
      { Leader: 'worried', Doer: 'worried', QC: 'confused', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'worried', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'worried', QC: 'confused', Mediator: 'worried', BanThan: 'worried' }
    ],
    '2:3': [
      { Leader: 'worried', Doer: 'serious', QC: 'worried', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'serious', QC: 'serious', Mediator: 'worried', BanThan: 'worried' },
      { Leader: 'worried', Doer: 'serious', QC: 'serious', Mediator: 'worried', BanThan: 'worried' }
    ],
    '2:4': [
      { Leader: 'happy', Doer: 'happy', QC: 'neutral', Mediator: 'happy', BanThan: 'happy' },
      { Leader: 'worried', Doer: 'confused', QC: 'serious', Mediator: 'worried', BanThan: 'confused' },
      { Leader: 'worried', Doer: 'worried', QC: 'serious', Mediator: 'worried', BanThan: 'worried' }
    ]
  };

  if (CURATED_PDF_MOODS[stageKey] && CURATED_PDF_MOODS[stageKey][step]) {
    return CURATED_PDF_MOODS[stageKey][step];
  }

  if (!activeMsg) return { Leader: 'neutral', QC: 'neutral', Doer: 'neutral', Mediator: 'neutral', BanThan: 'neutral' };
  const speaker = (activeMsg[0] || '').toLowerCase();
  const text = (activeMsg[1] || '').toLowerCase();

  let speakerMood = 'neutral';
  let teamMood = 'neutral';

  if (text.includes('bận') || text.includes('quá tải') || text.includes('áp lực') || text.includes('ngại') || text.includes('sợ') || text.includes('lo')) {
    speakerMood = 'worried';
    teamMood = 'worried';
  } else if (text.includes('lỗi') || text.includes('chưa kỹ') || text.includes('xóa') || text.includes('soi') || text.includes('ảnh hưởng')) {
    speakerMood = 'serious';
    teamMood = 'worried';
  } else if (text.includes('hay mình') || text.includes('đồng ý') || text.includes('giải pháp') || text.includes('bình tĩnh') || text.includes('cảm ơn') || text.includes('vui')) {
    speakerMood = 'happy';
    teamMood = 'happy';
  } else if (text.includes('ai sẽ') || text.includes('chưa biết') || text.includes('thế nào') || text.includes('sao') || text.includes('nghĩ')) {
    speakerMood = 'confused';
    teamMood = 'confused';
  }

  const moods = { Leader: teamMood, QC: teamMood, Doer: teamMood, Mediator: teamMood, BanThan: teamMood };
  if (speaker.includes('leader')) moods.Leader = speakerMood;
  else if (speaker.includes('qc') || speaker === 'b') moods.QC = speakerMood;
  else if (speaker.includes('doer') || speaker === 'a') moods.Doer = speakerMood;
  else if (speaker.includes('mediator')) moods.Mediator = speakerMood;
  else if (speaker.includes('bạn thân') || speaker.includes('follower')) moods.BanThan = speakerMood;

  return moods;
}

function roundtableView(){
  const g=state.game;
  const current=currentNode();
  const step=g.rtStep||0;
  const done=step>=current.messages.length;
  const activeMsg=!done?current.messages[step]:null;
  const activeName=activeMsg?activeMsg[0]:null;
  const urgentClass = state.gameTime <= 15 ? 'timer-urgent' : '';

  let speakerKey = 'Leader';
  let tailLeft = '28%';
  let bubbleTop = '15%';

  if (activeName) {
    const low = activeName.toLowerCase();
    if (low.includes('doer') || activeName === 'A') {
      speakerKey = 'Doer';
      tailLeft = '16%';
      bubbleTop = '18%';
    } else if (low.includes('leader')) {
      speakerKey = 'Leader';
      tailLeft = '28%';
      bubbleTop = '15%';
    } else if (low.includes('qc') || activeName === 'B') {
      speakerKey = 'QC';
      tailLeft = '72%';
      bubbleTop = '15%';
    } else if (low.includes('mediator')) {
      speakerKey = 'Mediator';
      tailLeft = '84%';
      bubbleTop = '18%';
    } else if (low.includes('bạn thân') || low.includes('follower') || low.includes('bạn')) {
      speakerKey = 'BanThan';
      tailLeft = '68%';
      bubbleTop = '20%';
    }
  }

  const isShowChoices = done || (g && g.showChoices);

  const moods = (done || isShowChoices)
    ? { Leader: 'worried', QC: 'worried', Doer: 'worried', Mediator: 'worried', BanThan: 'worried' }
    : getRoundtableMoodsPDF(current, step, activeMsg);

  setTimeout(() => {
    applyRoundtableExpressions(moods, state);
    if (!done && !isShowChoices && activeName && activeName !== 'Hệ thống') {
      focusRoundtableSpeaker(speakerKey);
    } else {
      focusRoundtableSpeaker(null);
    }
  }, 20);

  const levelName = g.mode === 'reversal' ? 'Đảo Vai' : (level(g.level)?.name || 'Nhóm Bạn Thân');

  return shell('interior-page rt-page', `
    <header class="rt-head-v5">
      <div class="rt-head-pill left">
        <span class="rt-head-dot"></span>
        <b>Ải ${g.level}: ${safe(levelName)}</b>
      </div>
      <div class="rt-head-pill right">
        <span class="rt-head-heart">❤️</span>
        <span>Thấu cảm: <b>${state.empathy || 50}</b></span>
      </div>
    </header>

    <div class="rt-v5-scene ${(done || isShowChoices) ? 'rt-dimmed' : ''}">
      <div class="rt-backdrop-wrap">
        ${ROUNDTABLE_BACKDROP_SVG}
      </div>

      <div class="rt-chars-wrap">
        ${renderRoundtableCharacters(state, moods, (!done && !isShowChoices && activeName && activeName !== 'Hệ thống') ? speakerKey : null)}
      </div>

      ${!isShowChoices ? `
        <div class="rt-bubble-v5" style="top:${bubbleTop}" data-action="rt-next">
          <div class="rt-bubble-header">
            <span class="rt-speaker-badge speaker-${speakerKey.toLowerCase()}">${safe(activeName)}</span>
            <span class="rt-step-counter">${step + 1} / ${current.messages.length}</span>
          </div>
          <p class="rt-bubble-quote">“${safe(activeMsg[1].replace(/^[“"]|[”"]$/g, ''))}”</p>
          <div class="rt-bubble-tail" style="left:${tailLeft}"></div>
        </div>

        <div class="rt-bottom-bar">
          <button class="rt-btn-restart" data-action="rt-restart">
            <span class="rt-btn-icon">↺</span> Chơi lại
          </button>
          <button class="rt-btn-next" data-action="rt-next">
            <span>${step + 1 < current.messages.length ? 'Tiếp theo' : 'Đưa ra quyết định'}</span>
            <span class="rt-btn-arrow">▶</span>
          </button>
          <button class="rt-btn-choices-toggle" data-action="rt-show-choices">
            <span>⚡ Chọn đáp án (${current.options.length})</span>
          </button>
        </div>
      ` : `
        <div class="rt-decision">
          <div class="rt-decision-top">
            <div class="rt-decision-avatar">${player('worried')}</div>
            <div class="decision-head" style="flex:1;">
              <b>${safe(current.prompt || current.title || 'Bạn sẽ phản hồi thế nào?')}</b>
              <small>60 GIÂY / LƯỢT</small>
            </div>
            ${!done ? `
              <button class="rt-btn-back-chat" data-action="rt-hide-choices" title="Thu nhỏ để xem tiếp bàn tròn">
                ✕
              </button>
            ` : ''}
          </div>
          <div class="time-track">
            <span id="time-fill" style="width:${state.gameTime / TURN_SECONDS * 100}%"></span>
          </div>
          <div class="rt-choices-list">
            ${current.options.map((o, i) => `
              <button class="decision-choice" data-choice="${i}">
                <span>${String.fromCharCode(65 + i)}</span>
                <p style="margin:0;flex:1;">${safe(o.text)}</p>
              </button>
            `).join('')}
          </div>
          ${!done ? `
            <div style="text-align:center;margin-top:2px;">
              <button class="rt-btn-review" data-action="rt-hide-choices">
                ‹ Quay lại nghe thảo luận (${step + 1}/${current.messages.length})
              </button>
            </div>
          ` : ''}
        </div>
      `}
    </div>
  `);
}

function advanceRT(){
  const g=state.game;
  if(!g)return;
  const current=currentNode();
  const nextStep=(g.rtStep||0)+1;
  g.rtStep=Math.min(nextStep,current.messages.length);
  if(g.rtStep>=current.messages.length){
    g.showChoices=true;
  }
  render();
}

function chatOrRoundtable(){
  const g=state.game;
  if(!g||g.mode==='reversal')return chatView();
  const mode=stageUIMode[`${g.level}:${state.stage}`]||'chat';
  return mode==='round'?roundtableView():chatView();
}

// -------------------------------------------------------------
// 6. POLAROID CAPTURE & SCRAPBOOK RESULT SCREEN (V5 CORE)
// -------------------------------------------------------------
function buildSnapshotSVG(tone='good'){
  const userRole = state?.role || 'leader';
  const userAvatarType = state?.avatarType || 'girl';
  const userOutfit = state?.outfit || 'vnu';

  const SEATS = [
    { role: 'leader', label: 'Leader', style: 'left:32%; bottom:44px; width:56px; height:70px; z-index:6;' },
    { role: 'qc', label: 'QC', style: 'left:68%; bottom:44px; width:56px; height:70px; z-index:6;' },
    { role: 'doer', label: 'Doer', style: 'left:12%; bottom:20px; width:56px; height:70px; z-index:12;' },
    { role: 'mediator', label: 'Mediator', style: 'left:88%; bottom:20px; width:56px; height:70px; z-index:12;' },
    { role: 'follower', label: 'Bạn thân', style: 'left:62%; bottom:4px; width:54px; height:68px; z-index:15;' }
  ];

  const bgGradient = tone === 'good'
    ? 'linear-gradient(180deg, #a7e1fc 0%, #fdf2de 55%, #dfb288 56%, #be8758 100%)'
    : tone === 'bad'
    ? 'linear-gradient(180deg, #d3c4db 0%, #f3ded7 55%, #c89c74 56%, #a37248 100%)'
    : 'linear-gradient(180deg, #bde0ea 0%, #fae6cf 55%, #d4a57b 56%, #b07d4f 100%)';

  const titleBg = tone === 'good' ? '#fff6d6' : tone === 'bad' ? '#fbe4e4' : '#f5eada';
  const titleColor = tone === 'good' ? '#5a3d24' : tone === 'bad' ? '#6b2b2b' : '#523a27';

  let charsHtml = '';
  SEATS.forEach(seat => {
    const isPlayer = seat.role === userRole;
    const base = isPlayer ? (userAvatarType === 'boy' ? seat.role : userAvatarType) : seat.role;
    let mood = 'happy';
    if (tone === 'bad') {
      mood = seat.role === 'leader' ? 'worried' : seat.role === 'follower' ? 'embarrassed' : (seat.role === 'qc' ? 'angry' : 'sad');
    } else if (tone === 'neutral' || tone === 'mid') {
      mood = seat.role === 'leader' ? 'confused' : (seat.role === 'doer' ? 'worried' : 'idle');
    }

    charsHtml += `
      <div class="snap-char" style="${seat.style}">
        <img class="snap-char-img" src="assets/characters/${base}_${mood}.svg" alt="">
        ${(isPlayer && userOutfit && userOutfit !== 'vnu') ? `
          <img class="snap-char-outfit" src="assets/characters/${base}_outfit_${userOutfit}.svg" style="position:absolute; top:0; left:0; width:100%; height:100%; clip-path: inset(50% 0 0 0); pointer-events:none;" alt="">
        ` : ''}
      </div>
    `;
  });

  return `
    <div class="snap-scene" style="background:${bgGradient};">
      <!-- Campus Gate Title Sign -->
      <div class="snap-gate-sign" style="background:${titleBg}; color:${titleColor};">
        🏛️ ĐẠI HỌC QUỐC GIA HÀ NỘI
      </div>

      <!-- Characters -->
      <div class="snap-chars-wrap">
        ${charsHtml}
      </div>

      <!-- 3D Table -->
      <div class="snap-table">
        <svg viewBox="0 0 200 68" width="100%" height="100%">
          <ellipse cx="100" cy="38" rx="94" ry="26" fill="#8c5830" stroke="#4a2c17" stroke-width="2"/>
          <ellipse cx="100" cy="34" rx="94" ry="25" fill="#d69f69" stroke="#4a2c17" stroke-width="2"/>
          <ellipse cx="100" cy="34" rx="84" ry="20" fill="none" stroke="#fae5cc" stroke-width="1.2" opacity="0.6"/>
          <!-- Laptop -->
          <polygon points="56,22 84,20 90,29 62,31" fill="#d8e1eb" stroke="#473022" stroke-width="1.2"/>
          <polygon points="54,8 82,6 84,20 56,22" fill="#eef3f8" stroke="#473022" stroke-width="1.2"/>
          <!-- Cups -->
          <circle cx="120" cy="28" r="4.5" fill="#f8e7d2" stroke="#68422a" stroke-width="1"/>
          <circle cx="136" cy="26" r="4" fill="#ffcca8" stroke="#68422a" stroke-width="1"/>
        </svg>
      </div>

      <!-- Effects -->
      ${tone === 'good' ? `
        <div class="snap-sparkle s1">✨</div>
        <div class="snap-sparkle s2">⭐</div>
        <div class="snap-sparkle s3">✨</div>
      ` : tone === 'bad' ? `
        <div class="snap-sparkle s1" style="font-size:16px;">💧</div>
        <div class="snap-sparkle s2" style="font-size:14px;">💦</div>
      ` : ''}
    </div>
  `;
}

function polaroidView(){
  const g=state.game;
  const o=g.lastOutcome;
  const tone=o.type||'mid';
  const stageNum = state.stage + 1;
  const caption = o.name || (tone==='good'?'Cả Nhóm Đã Tiến Lên!':tone==='bad'?'Xung Đột Căng Thẳng':'Cần Thêm Thời Gian');

  return shell('interior-page',`
    <div class="cam-flash"></div>
    ${topbar('Khoảnh Khắc Vừa Qua','stages',true)}
    <div class="page-body centered" style="padding-top:20px">
      <div class="polaroid-card">
        <div class="polaroid-photo-frame">
          ${buildSnapshotSVG(tone)}
        </div>
        <div class="polaroid-caption">
          Ải ${g.level} · Màn ${stageNum} • ${safe(caption)}
        </div>
      </div>
      <div style="margin-top:20px;width:100%">
        <button class="game-btn green full large" data-go="scrapbook">
          ${icon('book')} Mở Sổ Lưu Niệm & Phân Tích
        </button>
      </div>
    </div>
  `);
}

function scrapbookView(){
  const g=state.game;
  const o=g.lastOutcome;
  const tone=o.type||'mid';
  const stageNum = state.stage + 1;

  return shell('interior-page scrapbook-page',`
    ${topbar('Sổ Lưu Niệm Kết Quả','stages',true)}
    <div class="page-body" style="padding-top:6px">
      <!-- Polaroid nghiêng góc -->
      <div class="scrapbook-polaroid-wrap">
        <div class="scrapbook-polaroid">
          <div class="photo">
            ${buildSnapshotSVG(tone)}
          </div>
          <div class="caption">Ải ${g.level}: Màn ${stageNum} · ${tone==='good'?'Gắn kết':'Thử thách'}</div>
        </div>
      </div>

      <!-- Notecard kẻ dòng phân tích nguyên nhân -->
      <div class="scrapbook-notecard">
        <div class="scrapbook-rings">
          <span class="scrapbook-ring-dot"></span>
          <span class="scrapbook-ring-dot"></span>
          <span class="scrapbook-ring-dot"></span>
          <span class="scrapbook-ring-dot"></span>
        </div>

        <div class="scrapbook-sec">
          <h4>${icon('play')} Diễn biến tình huống</h4>
          <p>${safe(o.development || o.answer || 'Cả nhóm đã trao đổi và thực hiện lựa chọn của bạn.')}</p>
        </div>

        <div class="scrapbook-sec sec-result">
          <h4>${icon('star')} Kết quả đạt được</h4>
          <p>${safe(o.result || o.name || 'Tiến độ được cập nhật.')}</p>
        </div>

        <div class="scrapbook-sec sec-positive">
          <h4>${icon('check')} Nguyên nhân tích cực</h4>
          <p>${safe(o.positive || 'Bạn đã thể hiện trách nhiệm và mong muốn xây dựng nhóm.')}</p>
        </div>

        <div class="scrapbook-sec sec-negative">
          <h4>${icon('clock')} Nguyên nhân hạn chế & Lưu ý</h4>
          <p>${safe(o.negative || 'Cần chú ý lắng nghe và kiểm soát cảm xúc cá nhân hơn.')}</p>
        </div>
      </div>

      <div style="margin-top:12px">
        <button class="game-btn green full large" data-go="ending">
          ${icon('spark')} Mở Khóa Bài Học (Lesson Unlocked)
        </button>
      </div>
    </div>
  `);
}

// -------------------------------------------------------------
// 7. KẾT THÚC MÀN & VÍ KỊCH BẢN
// -------------------------------------------------------------
const MOOD_EMOJI={good:'🥳',mid:'😅',bad:'🥹'};
function getEnding(){
  const g=state.game;
  return g.mode==='reversal'?g.reversalOutcome:g.quickOutcome;
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

  return shell('interior-page ending-page',`
    ${topbar(g.mode==='reversal'?'Đảo vai hoàn tất':'Lesson Unlocked','stages',true)}
    <div class="page-body">
      <div class="ending-medal ${tone}">
        ${player(tone==='good'?'happy':tone==='bad'?'worried':'idle','medal-character')}
        <span class="mood-badge">${MOOD_EMOJI[tone]||'😐'}</span>
      </div>
      <h2 class="ending-title">${safe(o.name||(tone==='good'?'Giải quyết hiệu quả':tone==='bad'?'Nhóm gặp khó khăn':'Cần điều chỉnh'))}</h2>
      <p class="ending-desc">${safe(o.message||o.answer)}</p>

      <div class="lesson-card">
        <div class="lesson-caption">${icon('book')} LESSON UNLOCKED</div>
        <p>${safe(o.lesson)}</p>
      </div>

      ${o.template ? `
        <div class="lesson-card template-card">
          <strong>VÍ KỊCH BẢN • MẪU TIN NHẮN THỰC CHIẾN</strong>
          <p>${safe(o.template)}</p>
          <button class="small-button" data-action="save-template">
            ${icon('check')} Lưu mẫu tin nhắn vào Ví
          </button>
        </div>
      ` : ''}

      <div class="action-stack">
        ${hasNextStage ? `<button class="game-btn green full" data-action="next-stage">${icon('play')} Màn tiếp theo</button>` : ''}
        ${hasNextLevel || isFinalCampaignLevel ? `<button class="game-btn green full" data-action="level-complete">${icon('spark')} Xem thành tích Ải ${l.id}</button>` : ''}
        ${g.mode==='reversal' ? '' : `<button class="game-btn pale full" data-action="reversal">${icon('rotate')} THỬ ĐẢO VAI (ROLE REVERSAL)</button>`}
        <div class="button-pair">
          ${btn('Chơi lại','replay','sky')}
          ${btn('Bản đồ','map',hasNextStage||hasNextLevel||isFinalCampaignLevel?'pale':'green')}
        </div>
      </div>
      <p class="small-note">TEAM-CRAFT V5 • Học hỏi từ thử nghiệm thực tế</p>
    </div>
  `);
}

function levelCompleteView(){
  const l=level(state.completedLevelId||state.level);
  const r=role(state.role);
  const hasNext=state.completedLevelId===1;
  const code=`AI${l.id}-CLEAR-0${l.stages.length}0${l.stages.length}`;
  return shell('interior-page ending-page',`
    ${topbar('Hoàn thành Ải','map',true)}
    <div class="page-body">
      <div class="id-card theme-green" id="level-complete-card">
        <span class="id-star s1">${icon('star')}</span>
        <span class="id-star s2">${icon('star')}</span>
        <span class="id-star s3">${icon('star')}</span>
        <div class="id-card-title">ẢI ${l.id}: ${safe(l.name).toUpperCase()}</div>
        <div class="id-card-body">
          <div class="id-photo"><div class="id-photo-frame">${player('happy','id-photo-char')}</div></div>
          <div class="id-info">
            <small>MÃ HOÀN THÀNH</small>
            <span class="id-handle">${code}</span>
            <small>VAI TRÒ ĐÃ CHƠI</small>
            <span class="id-team">${safe(r.name)} (${state.avatarType.toUpperCase()})</span>
          </div>
        </div>
        <p class="id-desc">Đã vượt qua ${l.stages.length}/${l.stages.length} tình huống mô phỏng. Tích lũy được ${icon('heart')} ${state.hearts} Thấu cảm · ${icon('coin')} ${state.coins} Xu.</p>
        <div class="id-card-foot"><span>TEAM-CRAFT · HOÀN THÀNH ẢI ${l.id}</span></div>
        <div class="id-stamp"><span>TEAM<br>CRAFT</span><small>HOÀN THÀNH</small></div>
      </div>
      <div class="persona-actions">
        <button class="game-btn sky" data-action="download-level">${icon('book')} Tải ảnh</button>
        <button class="game-btn pale" data-action="share-level">${icon('send')} Chia sẻ</button>
      </div>
      <button class="game-btn green full" data-action="continue-after-level">${icon('play')} ${hasNext?'Sang Ải tiếp theo':'Xem lộ trình tiếp theo'}</button>
    </div>
  `);
}

function openLevelComplete(){state.completedLevelId=state.level;route('levelComplete')}
function continueAfterLevel(){if(state.completedLevelId===1)nextLevel();else finishCampaign()}
function finishCampaign(){toast('Chúc mừng bạn đã hoàn thành toàn bộ nội dung hiện có (Ải 1 & Ải 2)! Các Ải 3, 4, 5 đang được cập nhật.');route('map')}

function walletView(){
  return shell('interior-page',`
    ${topbar('Ví kịch bản','map')}
    <div class="page-body">
      <div class="page-intro">Lưu và sao chép các mẫu tin nhắn từ các tình huống đã vượt qua để áp dụng khi làm việc nhóm thật.</div>
      ${state.wallet.length ? state.wallet.map((w,i)=>`
        <article class="lesson-card wallet-item">
          <strong>Mẫu tin nhắn ${i+1} · Ải ${w.level}</strong>
          <p>${safe(w.text)}</p>
          <button class="small-button" data-copy="${i}">${icon('chat')} Sao chép</button>
        </article>
      `).join('') : `
        <div class="empty-wallet">
          ${avatar('follower','empty-char','idle')}
          <h2>Ví của bạn đang trống</h2>
          <p>Hoàn thành một màn chơi để lưu tin nhắn thực chiến vào ví.</p>
        </div>
      `}
      ${btn('Quay lại bản đồ','map','green full')}
    </div>
  `);
}

// -------------------------------------------------------------
// 8. QUIZ 60 GIÂY
// -------------------------------------------------------------
function quizView(){
  const q=quizQuestions[state.quizIndex];
  return shell('quiz-page',`
    ${topbar('Quiz phong cách','home')}
    <div class="page-body">
      <div class="progress-header">
        <strong>CÂU ${state.quizIndex+1} / 5</strong>
        <span id="quiz-count">${state.quizTime}s</span>
      </div>
      <div class="progress-track"><span style="width:${(state.quizIndex+1)*20}%"></span></div>
      <div class="quiz-panel">
        <div class="quiz-figure">${avatar(state.quizIndex%2?'mediator':'follower','quiz-char','talk')}</div>
        <h2>${safe(q.question)}</h2>
        <div class="quiz-options">
          ${q.answers.map((ans,i)=>`
            <button class="answer" data-quiz="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(ans[0])}</button>
          `).join('')}
        </div>
      </div>
      <p class="small-note">Quiz chỉ mang tính khám phá phong cách làm việc nhóm, không phải kiểm tra EQ.</p>
    </div>
  `);
}

function quizResult(){
  const p=personas.find(x=>x.id===state.persona)||personas[0];
  return shell('quiz-page',`
    ${topbar('Thẻ phong cách','home')}
    <div class="page-body">
      <div class="id-card" id="persona-card">
        <span class="id-star s1">${icon('star')}</span><span class="id-star s2">${icon('star')}</span><span class="id-star s3">${icon('star')}</span>
        <div class="id-card-title">${safe(p.title)}</div>
        <div class="id-card-body">
          <div class="id-photo"><div class="id-photo-frame">${player('happy','id-photo-char')}</div></div>
          <div class="id-info">
            <small>MÃ ĐỊNH DANH</small>
            <span class="id-handle">${safe(p.handle)}</span>
            <small>ĐỘI</small>
            <span class="id-team">TEAM-CRAFT · ĐHQGHN</span>
          </div>
        </div>
        <p class="id-desc">${safe(p.desc)}</p>
        <div class="id-card-foot"><span>THẺ KHÁM PHÁ PHONG CÁCH LÀM VIỆC NHÓM</span></div>
        <div class="id-stamp"><span>TEAM<br>CRAFT</span><small>ĐÃ XÁC NHẬN</small></div>
      </div>
      <div class="persona-actions">
        <button class="game-btn sky" data-action="download-persona">${icon('book')} Tải ảnh</button>
        <button class="game-btn pale" data-action="share-persona">${icon('send')} Chia sẻ</button>
      </div>
      <div class="lesson-card"><strong>Gợi ý của TEAM-CRAFT</strong><p>${safe(p.tip)}</p></div>
      ${btn(`${icon('play')} Vào game mô phỏng`,'map','green full')}
    </div>
  `);
}

async function captureEl(id){
  const el=document.getElementById(id);if(!el)return null;
  if(typeof window.html2canvas!=='function'){toast('Thiếu thư viện html2canvas, cần kết nối mạng để tải ảnh');return null}
  try{if(document.fonts?.ready)await document.fonts.ready;return await window.html2canvas(el,{backgroundColor:null,scale:2,useCORS:true})}catch{toast('Tạo ảnh thất bại, thử lại nhé');return null}
}
function cardBlob(canvas){return new Promise(res=>canvas.toBlob(res,'image/png'))}
async function downloadCard(id,filename){
  toast('Đang tạo ảnh...');
  const canvas=await captureEl(id);
  if(!canvas)return;
  const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=filename;a.click();
  toast('Đã tải ảnh về máy');
}
async function shareCard(id,filename,title,text){
  toast('Đang tạo ảnh...');
  const canvas=await captureEl(id);
  if(!canvas)return;
  const blob=await cardBlob(canvas);
  if(!blob)return toast('Tạo ảnh thất bại, thử lại nhé');
  const file=new File([blob],filename,{type:'image/png'});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    try{await navigator.share({files:[file],title,text})}
    catch(err){if(err?.name!=='AbortError')toast('Không thể chia sẻ lúc này')}
    return;
  }
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();
  toast('Đã tải ảnh về để bạn tự đăng lên Story/Post nhé!');
}

// -------------------------------------------------------------
// 9. GAME ENGINE & CLOCK
// -------------------------------------------------------------
function render(){
  const mapRender={
    charSelect: charSelectView,
    home, map,
    roles: rolesView,
    custom: customView,
    shop: shopView,
    stages: stagesView,
    comingSoon: comingSoonView,
    quiz: quizView,
    quizResult,
    chat: chatOrRoundtable,
    polaroid: polaroidView,
    scrapbook: scrapbookView,
    ending: endingView,
    levelComplete: levelCompleteView,
    wallet: walletView,
    replay: ()=>{ startGame(); return ''; }
  };
  ROOT.innerHTML = (mapRender[state.screen]||home)();
  if(state.screen==='chat'){
    document.getElementById('message-zone')?.scrollTo(0,9999);
    runGameClock();
  }
  if(state.screen==='quiz') runQuizClock();
}

function runQuizClock(){
  stopClock();
  clock=setInterval(()=>{
    if(state.screen!=='quiz'){stopClock();return;}
    state.quizTime=Math.max(0,state.quizTime-1);
    const el=document.getElementById('quiz-count');
    if(el)el.textContent=state.quizTime+'s';
    if(state.quizTime===0)finishQuiz();
  },1000);
}

function runGameClock(){
  stopClock();
  clock=setInterval(()=>{
    if(state.screen!=='chat'){stopClock();return;}
    state.gameTime=Math.max(0,state.gameTime-1);
    const el=document.getElementById('game-count');
    const bar=document.getElementById('time-fill');
    if(el){
      el.textContent=fmtTime(state.gameTime);
      el.classList.toggle('timer-urgent', state.gameTime<=15);
    }
    if(bar)bar.style.width=(state.gameTime/TURN_SECONDS*100)+'%';
    if(state.gameTime===0)autoGameEnd();
  },1000);
}

function startQuiz(){
  state.quizIndex=0;state.quizAnswers=[];state.quizTime=60;route('quiz');
}
function chooseQuiz(index){
  const ans=quizQuestions[state.quizIndex].answers[index];
  if(!ans)return;
  state.quizAnswers.push(ans[1]);
  if(state.quizIndex===4)finishQuiz();
  else {state.quizIndex++;render();}
}
function finishQuiz(){
  const tally={};state.quizAnswers.forEach(x=>tally[x]=(tally[x]||0)+1);
  state.persona=Object.entries(tally).sort((a,b)=>b[1]-a[1])[0]?.[0]||'bee';
  save();
  route('quizResult');
}

function openLevel(id){
  const lvlId=Number(id);
  state.level=lvlId;
  if(lvlId>2)return route('comingSoon');
  route('stages');
}

function openStage(index){
  state.stage=Number(index);
  const l=level(state.level);
  if(l.id>2)return route('comingSoon');
  if(!isLevelUnlocked(l.id)){toast(`Ải ${l.id} chưa mở khóa!`);return route('map');}
  if(!isStageUnlocked(l.id,state.stage)){toast(`Màn ${state.stage+1} chưa mở khóa! Hãy hoàn thành màn trước.`);return route('stages');}
  const stageKey=`${l.id}:${state.stage}`;
  if(!quickScenarios[stageKey])return route('comingSoon');
  const targetRole=stageRoleMap?.[stageKey]||(l.roles.includes(state.role)?state.role:l.roles[0]);
  state.role=targetRole;
  save();
  startGame();
}

function startGame(){
  state.game={level:state.level, role:state.role, mode:'main', history:[], quickOutcome:null, reversalOutcome:null, lastOutcome:null, rtStep:0, showChoices:false};
  state.gameTime=TURN_SECONDS;
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
    if(nextLvlId<=levels.length){unlockLevel(nextLvlId);}
  }
  save();
  // V5 Flow: chuyển sang Polaroid -> Scrapbook Result
  route('polaroid');
}

function nextStage(){
  const l=level(state.level);
  const nextIndex=state.stage+1;
  if(nextIndex<l.stages.length){
    state.stage=nextIndex;
    unlockStage(state.level,nextIndex);
    openStage(nextIndex);
  }else{
    if(state.level>=2){finishCampaign()}else{nextLevel()}
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
  startGame();
}

function answerGame(index){
  const g=state.game;
  const node=currentNode();
  const o=node.options[index];
  if(!o)return;

  // Hiệu ứng rung lắc nếu kết quả tiêu cực/căng thẳng
  if(o.type==='bad'){
    const device=document.querySelector('.device');
    if(device){
      device.classList.remove('screen-shake');
      void device.offsetWidth;
      device.classList.add('screen-shake');
    }
  }

  g.history.push(...node.messages.map(([name,text])=>({name,text})),{name:'Bạn',text:o.template||o.text});

  if(g.mode==='reversal'){
    applyReward(o.type,10);
    g.reversalOutcome={name:'Đảo vai hoàn tất',type:o.type,answer:o.answer,lesson:o.lesson,development:o.development,result:o.result,positive:o.positive,negative:o.negative};
    g.lastOutcome=g.reversalOutcome;
    route('polaroid');
    return;
  }

  applyReward(o.type,20);
  g.quickOutcome={
    name:o.name||(o.type==='good'?'Cả nhóm đã tiến lên!':o.type==='bad'?'Nhóm vẫn bế tắc':'Có điều cần cải thiện'),
    type:o.type,
    answer:o.answer,
    lesson:o.lesson,
    template:o.template,
    development:o.development,
    result:o.result,
    positive:o.positive,
    negative:o.negative
  };
  g.lastOutcome=g.quickOutcome;
  finishMain();
}

function autoGameEnd(){
  const g=state.game;
  if(!g)return;
  applyReward('bad',0);
  const outcome = {
    name:'Bỏ lỡ lượt phản hồi',
    type:'mid',
    answer:'Cả nhóm không nhận được phản hồi kịp thời từ bạn.',
    lesson:'Chủ động lên tiếng đúng lúc giúp nhóm tránh bị động và bế tắc.',
    development:'Hết thời gian 60 giây, nhóm phải tự xoay xở.',
    result:'Tiến độ bị chậm trễ.',
    positive:'Không gây tranh cãi lớn.',
    negative:'Sự im lặng khiến nhóm hoang mang.'
  };
  if(g.mode==='reversal'){
    g.reversalOutcome=outcome;
    g.lastOutcome=outcome;
    route('polaroid');
    return;
  }
  g.quickOutcome=outcome;
  g.lastOutcome=outcome;
  finishMain();
}

function startReversal(){
  state.game={...state.game,mode:'reversal',history:[],rtStep:0};
  state.gameTime=TURN_SECONDS;
  route('chat');
}

function saveTemplate(){
  const o=getEnding();
  if(!o?.template)return;
  state.wallet.unshift({level:state.game.level,text:o.template});
  state.wallet=state.wallet.slice(0,30);
  save();
  toast('Đã lưu mẫu tin nhắn vào ví kịch bản!');
}

async function copyWallet(index){
  const w=state.wallet[index];
  if(!w)return;
  try{await navigator.clipboard.writeText(w.text);toast('Đã sao chép vào bộ nhớ tạm')}catch{toast('Trình duyệt không cho phép sao chép tự động')}
}

// -------------------------------------------------------------
// 10. EVENT LISTENERS
// -------------------------------------------------------------
ROOT.addEventListener('click',e=>{
  let x=e.target.closest('[data-go]');
  if(x){
    if(x.dataset.go==='replay')return startGame();
    if(x.dataset.go==='next-stage')return nextStage();
    if(x.dataset.go==='next-level')return nextLevel();
    if(x.dataset.go==='finish-campaign')return finishCampaign();
    return route(x.dataset.go);
  }
  x=e.target.closest('[data-level]');
  if(x){
    const lvlId=Number(x.dataset.level);
    if(lvlId>2){return openLevel(lvlId)}
    if(!isLevelUnlocked(lvlId)){toast(`Ải ${lvlId} chưa mở khóa! Hãy hoàn thành ải trước.`);return}
    return openLevel(lvlId);
  }
  x=e.target.closest('[data-set-avatar]');
  if(x){
    state.avatarType=x.dataset.setAvatar;
    save();
    return render();
  }
  x=e.target.closest('[data-role]');
  if(x){
    state.role=x.dataset.role;
    save();
    return render();
  }
  x=e.target.closest('[data-outfit]');
  if(x){
    state.outfit=x.dataset.outfit;
    save();
    return render();
  }
  x=e.target.closest('[data-stage]');
  if(x)return openStage(x.dataset.stage);
  x=e.target.closest('[data-quiz]');
  if(x)return chooseQuiz(Number(x.dataset.quiz));
  x=e.target.closest('[data-choice]');
  if(x)return answerGame(Number(x.dataset.choice));
  x=e.target.closest('[data-copy]');
  if(x)return copyWallet(Number(x.dataset.copy));
  x=e.target.closest('[data-buy]');
  if(x)return buyOutfit(x.dataset.buy);

  x=e.target.closest('[data-action]');
  if(!x)return;
  if(x.dataset.action==='confirm-avatar'){
    save();
    route('home');
  }
  if(x.dataset.action==='start-quiz')startQuiz();
  if(x.dataset.action==='save-template')saveTemplate();
  if(x.dataset.action==='download-persona')downloadCard('persona-card','teamcraft-the-phong-cach.png');
  if(x.dataset.action==='share-persona')shareCard('persona-card','teamcraft-the-phong-cach.png','Thẻ phong cách TEAM-CRAFT','Mình vừa khám phá phong cách làm việc nhóm trên TEAM-CRAFT V5!');
  if(x.dataset.action==='download-level')downloadCard('level-complete-card','teamcraft-hoan-thanh-ai.png');
  if(x.dataset.action==='share-level')shareCard('level-complete-card','teamcraft-hoan-thanh-ai.png','Hoàn thành Ải TEAM-CRAFT','Mình vừa vượt qua một Ải drama nhóm trên TEAM-CRAFT!');
  if(x.dataset.action==='reversal')startReversal();
  if(x.dataset.action==='rt-next')advanceRT();
  if(x.dataset.action==='rt-show-choices'){
    if(state.game){
      state.game.showChoices=true;
      render();
    }
  }
  if(x.dataset.action==='rt-hide-choices'){
    if(state.game){
      state.game.showChoices=false;
      render();
    }
  }
  if(x.dataset.action==='rt-restart'){
    if(state.game){
      state.game.rtStep=0;
      state.game.showChoices=false;
      stopMouthFlap();
      render();
    }
  }
  if(x.dataset.action==='next-stage')nextStage();
  if(x.dataset.action==='level-complete')openLevelComplete();
  if(x.dataset.action==='continue-after-level')continueAfterLevel();
});

route(state.screen);
