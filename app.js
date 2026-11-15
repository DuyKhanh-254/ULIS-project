import {roles, personas, quizQuestions, levels, quickScenarios, reversals, stageRoleMap, stageUIMode, charTypes, allOutfits} from './data.js';

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
const RT_SEATS_5 = [
  {id:'leader', role:'leader', name:'Leader', left:'26%', top:'30%', zIndex:10},
  {id:'qc', role:'qc', name:'QC', left:'74%', top:'30%', zIndex:10},
  {id:'doer', role:'doer', name:'Doer', left:'10%', top:'48%', zIndex:18},
  {id:'mediator', role:'mediator', name:'Mediator', left:'90%', top:'48%', zIndex:18},
  {id:'follower', role:'follower', name:'Bạn thân', left:'50%', top:'68%', zIndex:25}
];

function getRoundtableMoods(current, step, activeMsg){
  const g = state.game;
  const stageKey = g ? `${g.level}:${state.stage}` : '';

  const CURATED_MOODS = {
    '1:1': [
      // 0: Leader: Mọi người nghĩ ai sẽ phù hợp...
      { leader: 'confused', doer: 'idle', qc: 'idle', mediator: 'idle', follower: 'worried' },
      // 1: Doer: Tớ nghĩ phần đó cần người... nhưng tuần này bận 2 bài tập...
      { leader: 'worried', doer: 'embarrassed', qc: 'idle', mediator: 'idle', follower: 'worried' },
      // 2: QC: Phần này mà làm chưa kỹ thì sẽ ảnh hưởng...
      { leader: 'worried', doer: 'embarrassed', qc: 'angry', mediator: 'idle', follower: 'worried' },
      // 3: Mediator: Hay mình xem xét năng lực và thời gian...
      { leader: 'happy', doer: 'happy', qc: 'idle', mediator: 'happy', follower: 'happy' },
      // 4: Leader: Tớ vẫn chưa biết nên phân công thế nào...
      { leader: 'worried', doer: 'worried', qc: 'confused', mediator: 'confused', follower: 'embarrassed' }
    ],
    '1:2': [
      // 0: QC: Xem lại slide, có lỗi chính tả và số liệu...
      { leader: 'worried', doer: 'surprised', qc: 'angry', mediator: 'idle', follower: 'worried' },
      // 1: Doer: Dành nhiều thời gian làm rồi mà, đâu nghiêm trọng...
      { leader: 'worried', doer: 'embarrassed', qc: 'angry', mediator: 'idle', follower: 'worried' },
      // 2: Leader: Sắp nộp bài rồi, nên xử lý sớm...
      { leader: 'worried', doer: 'worried', qc: 'idle', mediator: 'idle', follower: 'worried' },
      // 3: QC: Muốn bài hoàn thiện, ảnh hưởng điểm cả nhóm...
      { leader: 'worried', doer: 'sad', qc: 'angry', mediator: 'idle', follower: 'worried' },
      // 4: Doer: Soi kỹ làm tớ áp lực, bạn bè sao khắt khe...
      { leader: 'worried', doer: 'sad', qc: 'angry', mediator: 'worried', follower: 'worried' }
    ],
    '1:4': [
      // 0: Leader: Tổng hợp nội dung vẫn chưa xong...
      { leader: 'confused', doer: 'surprised', qc: 'worried', mediator: 'worried', follower: 'worried' },
      // 1: Doer: Tưởng có người nhận rồi...
      { leader: 'worried', doer: 'confused', qc: 'worried', mediator: 'worried', follower: 'confused' },
      // 2: QC: Chưa nhận được bản hoàn chỉnh...
      { leader: 'worried', doer: 'worried', qc: 'angry', mediator: 'worried', follower: 'worried' },
      // 3: Leader: Giờ còn nhiều phần chưa xong nguy hiểm thật...
      { leader: 'worried', doer: 'embarrassed', qc: 'angry', mediator: 'worried', follower: 'worried' },
      // 4: Doer: Lúc đầu đâu nói rõ ai phụ trách...
      { leader: 'embarrassed', doer: 'worried', qc: 'angry', mediator: 'worried', follower: 'worried' },
      // 5: Mediator: Cần bình tĩnh xem lại những phần còn thiếu...
      { leader: 'happy', doer: 'happy', qc: 'idle', mediator: 'happy', follower: 'happy' }
    ],
    '2:2': [
      // 0: Active Follower: Ai nhận làm Leader không ạ?
      { leader: 'confused', doer: 'worried', qc: 'confused', mediator: 'worried', follower: 'talk' },
      // 1: A: Tớ yếu khoản này lắm, bận lắm...
      { leader: 'worried', doer: 'embarrassed', qc: 'confused', mediator: 'worried', follower: 'worried' },
      // 2: B: Tớ làm gì cũng được trừ leader...
      { leader: 'worried', doer: 'worried', qc: 'embarrassed', mediator: 'worried', follower: 'sad' },
      // 3: Hệ thống: Không ai lên tiếng...
      { leader: 'sad', doer: 'worried', qc: 'confused', mediator: 'worried', follower: 'sad' }
    ],
    '2:3': [
      // 0: A: Đề nghị mai 20h họp chốt outline...
      { leader: 'worried', doer: 'angry', qc: 'worried', mediator: 'worried', follower: 'worried' },
      // 1: B: Sớm thế làm gì, bận chết đi được...
      { leader: 'worried', doer: 'angry', qc: 'angry', mediator: 'worried', follower: 'worried' },
      // 2: Hệ thống: Thả phẫn nộ, đóng băng...
      { leader: 'sad', doer: 'angry', qc: 'angry', mediator: 'sad', follower: 'worried' }
    ],
    '2:4': [
      // 0: Doer: Hoàn thành phân tích thị trường...
      { leader: 'happy', doer: 'happy', qc: 'idle', mediator: 'happy', follower: 'happy' },
      // 1: A: Viết lủng củng quá đã xóa sạch...
      { leader: 'worried', doer: 'surprised', qc: 'angry', mediator: 'worried', follower: 'surprised' },
      // 2: Hệ thống: Bạn sững sờ...
      { leader: 'worried', doer: 'sad', qc: 'angry', mediator: 'worried', follower: 'sad' }
    ]
  };

  if (CURATED_MOODS[stageKey] && CURATED_MOODS[stageKey][step]) {
    return CURATED_MOODS[stageKey][step];
  }

  // Dynamic Content Analysis
  if (!activeMsg) {
    return { leader: 'idle', qc: 'idle', doer: 'idle', mediator: 'idle', follower: 'idle' };
  }
  const speaker = (activeMsg[0] || '').toLowerCase();
  const text = (activeMsg[1] || '').toLowerCase();

  let speakerMood = 'talk';
  let teamMood = 'idle';

  if (text.includes('bận') || text.includes('quá tải') || text.includes('áp lực') || text.includes('ngại') || text.includes('sợ') || text.includes('lo')) {
    speakerMood = 'worried';
    teamMood = 'worried';
  } else if (text.includes('lỗi') || text.includes('chưa kỹ') || text.includes('xóa') || text.includes('gay gắt') || text.includes('phẫn nộ') || text.includes('soi') || text.includes('khắt khe') || text.includes('ảnh hưởng')) {
    speakerMood = 'angry';
    teamMood = 'embarrassed';
  } else if (text.includes('hay mình') || text.includes('đồng ý') || text.includes('giải pháp') || text.includes('bình tĩnh') || text.includes('cảm ơn') || text.includes('vui')) {
    speakerMood = 'happy';
    teamMood = 'happy';
  } else if (text.includes('ai sẽ') || text.includes('chưa biết') || text.includes('thế nào') || text.includes('sao') || text.includes('nghĩ')) {
    speakerMood = 'confused';
    teamMood = 'confused';
  }

  const moods = { leader: teamMood, qc: teamMood, doer: teamMood, mediator: teamMood, follower: teamMood };

  if (speaker.includes('leader')) moods.leader = speakerMood;
  else if (speaker.includes('qc')) moods.qc = speakerMood;
  else if (speaker.includes('doer')) moods.doer = speakerMood;
  else if (speaker.includes('mediator')) moods.mediator = speakerMood;
  else if (speaker.includes('bạn thân') || speaker.includes('follower')) moods.follower = speakerMood;
  else if (speaker === 'a') moods.doer = speakerMood;
  else if (speaker === 'b') moods.qc = speakerMood;

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

  let tailLeft = '50%';
  if (activeName) {
    const low = activeName.toLowerCase();
    if (low.includes('doer') || activeName === 'A') tailLeft = '18%';
    else if (low.includes('leader')) tailLeft = '30%';
    else if (low.includes('qc') || activeName === 'B') tailLeft = '70%';
    else if (low.includes('mediator')) tailLeft = '82%';
    else if (low.includes('bạn thân') || low.includes('follower')) tailLeft = '50%';
  }

  return shell('interior-page rt-page',`
    <header class="chat-head" style="background:#fef7eb;border-bottom:2px solid #ecd8b8">
      <button class="circle-action" data-go="stages" aria-label="Quay lại">${icon('back')}</button>
      <span class="chat-head-face">${player('talk')}</span>
      <div class="chat-head-text">
        <strong>${g.mode==='reversal'?'BÀN TRÒN · ĐẢO VAI':'BÀN TRÒN · Ải '+g.level+' Màn '+(state.stage+1)}</strong>
        <small>Bạn đang là ${safe(role(g.role).name)}</small>
      </div>
      <span class="timer ${urgentClass}" id="game-count">${fmtTime(state.gameTime)}</span>
    </header>

    <div class="rt-v5-scene ${done?'rt-dimmed':''}">
      <!-- Quán nước sân trường & sàn gỗ -->
      <div class="rt-deck-floor"></div>
      <div class="rt-sunbeams"></div>
      <div class="rt-center-table">
        <svg width="290" height="135" viewBox="0 0 290 135" fill="none" style="display:block;width:100%;height:100%">
          <defs>
            <radialGradient id="rtTableWood" cx="45%" cy="32%" r="68%">
              <stop offset="0%" stop-color="#f5d2a8" />
              <stop offset="70%" stop-color="#d69f69" />
              <stop offset="100%" stop-color="#b57a46" />
            </radialGradient>
          </defs>
          <!-- Base Shadow -->
          <ellipse cx="145" cy="124" rx="70" ry="9" fill="#52321c" opacity="0.28" />
          <rect x="133" y="68" width="24" height="52" rx="6" fill="#7a4c28" stroke="#4a2c17" stroke-width="2" />
          <path d="M105 120 Q145 110 185 120 L180 126 Q145 118 110 126 Z" fill="#633b1d" stroke="#4a2c17" stroke-width="1.8" />
          <!-- Tabletop 3D Edge & Surface -->
          <ellipse cx="145" cy="58" rx="138" ry="46" fill="#8c5830" stroke="#4a2c17" stroke-width="2.5" />
          <ellipse cx="145" cy="52" rx="138" ry="44" fill="url(#rtTableWood)" stroke="#4a2c17" stroke-width="2.5" />
          <ellipse cx="145" cy="52" rx="126" ry="38" fill="none" stroke="#fae5cc" stroke-width="1.5" opacity="0.6" />
          <!-- Leader's Laptop (Left Side) -->
          <g transform="translate(74, 30)">
            <polygon points="6,18 42,15 52,26 14,29" fill="#d8e1eb" stroke="#473022" stroke-width="1.6" stroke-linejoin="round" />
            <polygon points="3,0 39,-3 42,15 6,18" fill="#eef3f8" stroke="#473022" stroke-width="1.6" stroke-linejoin="round" />
            <circle cx="23" cy="7" r="2.5" fill="#8fa2b8" />
          </g>
          <!-- QC's Tablet & Notebooks (Right Side) -->
          <g transform="translate(156, 28)">
            <rect x="2" y="11" width="36" height="8" rx="2.5" fill="#ea8b6e" stroke="#473022" stroke-width="1.5" />
            <rect x="0" y="5" width="36" height="8" rx="2.5" fill="#82b87e" stroke="#473022" stroke-width="1.5" />
            <polygon points="8,-9 38,-7 35,7 5,5" fill="#445772" stroke="#263445" stroke-width="1.5" stroke-linejoin="round" />
          </g>
          <!-- Boba Tea Cup with Straw (Center) -->
          <g transform="translate(133, 38)">
            <rect x="0" y="0" width="12" height="15" rx="3" fill="#ffffff" stroke="#473022" stroke-width="1.4" />
            <ellipse cx="6" cy="0" rx="6" ry="2" fill="#ffe2b8" stroke="#473022" stroke-width="1.2" />
            <line x1="6" y1="0" x2="10" y2="-6" stroke="#e05373" stroke-width="1.8" stroke-linecap="round" />
          </g>
          <!-- Doer's Coffee Cup -->
          <g transform="translate(56, 46)">
            <circle cx="5" cy="5" r="5" fill="#f8e7d2" stroke="#68422a" stroke-width="1.3" />
            <circle cx="5" cy="5" r="3.2" fill="#58351e" />
          </g>
          <!-- Mediator's Matcha Cup -->
          <g transform="translate(202, 46)">
            <circle cx="5" cy="5" r="5" fill="#f8e7d2" stroke="#68422a" stroke-width="1.3" />
            <circle cx="5" cy="5" r="3.2" fill="#4a7350" />
          </g>
        </svg>
      </div>

      <!-- 5 chỗ ngồi quanh bàn -->
      <div class="rt-seats-container">
        ${RT_SEATS_5.map((seat, idx)=>{
          const activeLow = (activeName || '').toLowerCase();
          const isSpeaking = activeName && (
            activeLow.includes(seat.name.toLowerCase()) ||
            activeLow.includes(seat.role.toLowerCase()) ||
            (seat.role === 'doer' && activeName === 'A') ||
            (seat.role === 'qc' && activeName === 'B') ||
            (seat.role === 'follower' && (activeLow.includes('follower') || activeLow.includes('bạn thân')))
          );
          const isUserRole = seat.role === g.role;
          const moods = done ? { leader: 'worried', qc: 'confused', doer: 'worried', mediator: 'idle', follower: 'embarrassed' } : getRoundtableMoods(current, step, activeMsg);
          const seatMood = moods[seat.role] || (isSpeaking ? 'talk' : 'idle');
          const finalPose = isSpeaking && seatMood === 'idle' ? 'talk' : seatMood;

          return `
            <div class="rt-v5-seat ${isSpeaking?'is-speaking':(activeName?'is-dimmed':'')}" style="left:${seat.left};top:${seat.top};z-index:${seat.zIndex}">
              <div class="rt-seat-glow"></div>
              ${isUserRole ? player(finalPose,'rt-seat-char') : avatar(seat.role,'rt-seat-char',finalPose)}
              ${seat.role === 'follower' ? '<div class="rt-seat-stool"></div>' : ''}
              <span class="rt-seat-tag">${safe(seat.name)} ${isUserRole?'(Bạn)':''}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Bong bóng thoại Typewriter -->
      ${!done ? `
        <div class="rt-v5-bubble" data-action="rt-next">
          <div class="rt-bubble-tag">${icon('chat')} ${safe(activeName)}</div>
          <p id="rt-typewriter-text" style="margin:0;font-size:12.5px;font-weight:700;color:#3e2a1e;line-height:1.45">${safe(activeMsg[1])}</p>
          <div class="rt-bubble-tail" style="left:${tailLeft}"></div>
        </div>
        <button class="rt-next-btn" data-action="rt-next">
          ${icon('play')} ${step+1<current.messages.length?'Tiếp tục thảo luận':'Đưa ra quyết định'}
        </button>
      ` : `
        <div class="rt-decision">
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
      `}
    </div>
  `);
}

function advanceRT(){
  const g=state.game;
  if(!g)return;
  const current=currentNode();
  g.rtStep=Math.min((g.rtStep||0)+1,current.messages.length);
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
  const bgSky = tone==='good' ? '#c8ebff' : tone==='bad' ? '#ffd8d8' : '#e8e2f5';
  const sunOpacity = tone==='good' ? '0.75' : '0.25';
  const leaderMouth = tone==='good' ? 'M113 94 Q118 100 123 94' : tone==='bad' ? 'M113 99 Q118 93 123 99' : 'M114 96 L122 96';
  const sparkles = tone==='good' ? `
    <polygon points="44,48 46,53 51,55 46,57 44,62 42,57 37,55 42,53" fill="#ffd13b" stroke="#e0a300" stroke-width="0.8"/>
    <polygon points="234,44 236,49 241,51 236,53 234,58 232,53 227,51 232,49" fill="#ffd13b" stroke="#e0a300" stroke-width="0.8"/>
  ` : '';
  const sweat = tone==='bad' ? `
    <ellipse cx="134" cy="74" rx="3" ry="5" fill="#6ad2ff" stroke="#2381b8" stroke-width="0.8"/>
  ` : '';

  return `
    <svg width="100%" height="100%" viewBox="0 0 280 210" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="snapSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bgSky}" />
          <stop offset="100%" stop-color="#fdf0dc" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="280" height="135" fill="url(#snapSky)" />
      <circle cx="228" cy="34" r="22" fill="#fff3b0" opacity="${sunOpacity}" />
      <rect x="84" y="48" width="112" height="20" rx="4" fill="#f7e6d2" stroke="#6e4d3b" stroke-width="1.5" />
      <text x="140" y="62" text-anchor="middle" font-family="'Baloo 2', Arial, sans-serif" font-weight="800" font-size="9" fill="#5e3d28">ĐẠI HỌC QUỐC GIA HÀ NỘI</text>
      <rect x="0" y="128" width="280" height="82" fill="#d9ad82" />
      <ellipse cx="140" cy="168" rx="100" ry="34" fill="#bd895b" stroke="#7c533c" stroke-width="2" />
      <!-- Leader Center -->
      <g>
        <circle cx="118" cy="84" r="16" fill="#ffe4cf" stroke="#4a3228" stroke-width="1.6" />
        <path d="M102 84 C101 68 135 68 134 84 Z" fill="#4f3223" stroke="#3d2519" stroke-width="1.6" />
        <circle cx="112" cy="85" r="4.5" fill="none" stroke="#4a3228" stroke-width="1.4" />
        <circle cx="124" cy="85" r="4.5" fill="none" stroke="#4a3228" stroke-width="1.4" />
        <line x1="116.5" y1="85" x2="119.5" y2="85" stroke="#4a3228" stroke-width="1.4" />
        <path d="${leaderMouth}" fill="none" stroke="#4a3228" stroke-width="1.8" stroke-linecap="round" />
        ${sweat}
      </g>
      <!-- Teammates -->
      <circle cx="64" cy="98" r="14" fill="#ffdfba" stroke="#4a3228" stroke-width="1.5" />
      <circle cx="176" cy="98" r="14" fill="#f7c9b0" stroke="#4a3228" stroke-width="1.5" />
      <circle cx="218" cy="116" r="14" fill="#eec09c" stroke="#4a3228" stroke-width="1.5" />
      <circle cx="26" cy="116" r="14" fill="#ffd8be" stroke="#4a3228" stroke-width="1.5" />
      ${sparkles}
    </svg>
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
  state.game={level:state.level, role:state.role, mode:'main', history:[], quickOutcome:null, reversalOutcome:null, lastOutcome:null, rtStep:0};
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
  if(x.dataset.action==='next-stage')nextStage();
  if(x.dataset.action==='level-complete')openLevelComplete();
  if(x.dataset.action==='continue-after-level')continueAfterLevel();
});

route(state.screen);
