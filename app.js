import {roles, personas, quizQuestions, levels, leaderTree, leaderEndings, quickScenarios, reversal} from './data.js';

const ROOT=document.getElementById('app');
const TOAST=document.getElementById('toast');
const STORE='teamcraft-redesign-v3';
let saved={}; try{saved=JSON.parse(localStorage.getItem(STORE)||'{}')}catch{}
const state={screen:'home',level:1,stage:0,role:saved.role||'leader',outfit:saved.outfit||'blue',persona:saved.persona||null,quizAnswers:[],quizIndex:0,quizTime:60,gameTime:20,game:null,done:saved.done||[],wallet:saved.wallet||[]};
let clock=null;
const allOutfits=[{id:'blue',name:'Xanh ULIS'},{id:'rose',name:'Hồng pastel'},{id:'leaf',name:'Xanh lá'},{id:'violet',name:'Tím nhạt'},{id:'gold',name:'Vàng mật ong'}];
const safe=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const role=id=>roles.find(r=>r.id===id)||roles[0];
const level=id=>levels.find(l=>l.id===Number(id))||levels[0];
function save(){try{localStorage.setItem(STORE,JSON.stringify({role:state.role,outfit:state.outfit,persona:state.persona,done:state.done,wallet:state.wallet}))}catch{}}
const icon=(name,cls='')=>`<img class="icon ${cls}" src="assets/ui/${name}.svg" alt="">`;
const sprite=(id,pose='idle')=>`assets/characters/${id}_${pose}.svg`;
const avatar=(id,cl='',pose='idle')=>`<img class="character ${cl}" src="${sprite(id,pose)}" alt="">`;
const player=(pose='idle',cl='')=>avatar(state.role,cl,pose);
const outfitted=(cl='')=>`<img class="character ${cl}" src="assets/characters/${state.role}_outfit_${state.outfit}.svg" alt="">`;
const logo=(sm=false)=>`<div class="brand ${sm?'brand-sm':''}"><span>TEAM</span><span>CRAFT</span></div>`;
const shell=(cls,html)=>`<main class="device"><section class="page ${cls}">${html}</section></main>`;
const btn=(label,action='map',variant='green',extras='')=>`<button class="game-btn ${variant}" data-go="${action}" ${extras}>${label}</button>`;
const topbar=(title,go='map')=>`<header class="page-top"><button class="circle-action" data-go="${go}" aria-label="Quay lại">${icon('back')}</button><h1>${safe(title)}</h1><div class="page-top-spacer"></div></header>`;
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
return shell('map-page',`
<img class="map-scene" src="assets/campus-map.webp" alt="Khuôn viên trường học phong cách hoạt hình, con đường đi qua năm ải">
<div class="map-hud"><button class="map-logo" data-go="home" aria-label="Trang chủ">${logo(true)}</button>
  <div class="resources"><span>${icon('heart')} <b>120</b></span><span>${icon('coin')} <b>500</b></span></div></div>
${mapNPCLayout.map(([name,x,y,pose,id])=>`<img class="map-npc ${id}" src="${sprite(name,pose)}" style="left:${x}%;top:${y}%" alt="" loading="lazy">`).join('')}
${nodes.map(n=>`<button class="level-spot ${n.theme}" style="left:${n.x}%;top:${n.y}%" data-level="${n.n}" aria-label="Ải ${n.n}: ${n.name}">
 <span class="level-orb">${n.n===5?icon('skull'):n.n===4?icon('bolt'):n.n===3?icon('clock'):n.n===2?icon('chat'):icon('check')}</span>
 <span class="level-copy"><b>ẢI ${n.n}: ${n.name}</b><small>${n.cap}</small></span></button>`).join('')}
<nav class="map-dock"><button data-go="roles" class="dock-small">${icon('team')}<span>Vai trò</span></button>
<button class="dock-play" data-level="1">${icon('play')}<strong>CHƠI NGAY</strong></button>
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
<h2 class="subheading">Bộ trang phục</h2><div class="outfit-row">${allOutfits.map(x=>`<button class="outfit-item ${x.id===state.outfit?'active':''}" data-outfit="${x.id}"><img src="assets/characters/${state.role}_outfit_${x.id}.svg" alt=""><span>${x.name}</span></button>`).join('')}</div>
${btn(`${icon('check')} Hoàn tất`,'roles','green full')}</div>`)}

function stagesView(){const l=level(state.level);return shell('interior-page',`${topbar('Ải '+l.id+': '+l.name,'map')}
<div class="page-body"><div class="stage-banner"><div><span>CHƯƠNG ${l.id}</span><h2>${safe(l.name)}</h2><p>${safe(l.description)}</p></div>${avatar(l.roles[0],'banner-char','talk')}</div>
<div class="level-info">Vai trò ở ải này: ${l.roles.map(id=>role(id).name).join(' • ')}</div>
<div class="stage-list">${l.stages.map((s,i)=>`<button class="stage-item ${i===0&&l.id<=2?'is-ready':'is-locked'}" data-stage="${i}"><span class="stage-image">${avatar(l.roles[i%l.roles.length],'stage-char',i===0?'talk':'idle')}</span><span class="stage-text"><b>MÀN ${i+1} · ${safe(s[0])}</b><small>${safe(s[1])}</small><em>${i===0&&l.id<=2?'CHƠI MÀN NÀY':'CHƯA CÓ HỘI THOẠI'}</em></span><span class="stage-icon">${icon(i===0&&l.id<=2?'play':'lock')}</span></button>`).join('')}</div>
</div>`)}
function stagePreview(){const l=level(state.level);const s=l.stages[state.stage];return shell('interior-page',`${topbar('Thông tin màn','stages')}<div class="page-body centered"><div class="preview-stage small">${avatar(l.roles[0],'preview-character')}</div><div class="lesson-card"><b>ẢI ${l.id} / MÀN ${state.stage+1}</b><h2>${safe(s[0])}</h2><p>${safe(s[1])}</p><p class="muted">Màn này đã có tên và mô tả trong đề xuất nhưng chưa có cây thoại hoàn chỉnh để chơi.</p></div>${btn('Các màn khác','stages','sky full')}</div>`)}

function quizView(){const q=quizQuestions[state.quizIndex];return shell('quiz-page',`${topbar('Quiz phong cách','home')}
<div class="page-body"><div class="progress-header"><strong>CÂU ${state.quizIndex+1} / 5</strong><span id="quiz-count">${state.quizTime}s</span></div><div class="progress-track"><span style="width:${(state.quizIndex+1)*20}%"></span></div>
<div class="quiz-panel"><div class="quiz-figure">${avatar(state.quizIndex%2?'mediator':'follower','quiz-char')}</div><h2>${safe(q.question)}</h2><div class="quiz-options">${q.answers.map((ans,i)=>`<button class="answer" data-quiz="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(ans[0])}</button>`).join('')}</div></div>
<p class="small-note">Quiz chỉ mang tính khám phá phong cách làm việc, không phải kiểm tra EQ.</p></div>`)}
function quizResult(){const p=personas.find(x=>x.id===state.persona)||personas[0];return shell('quiz-page',`${topbar('Thẻ phong cách','home')}
<div class="page-body"><div class="persona-card"><span class="persona-heading">TEAM CRAFT / CHARACTER CARD</span><div class="persona-inner">${player('talk','persona-char')}<div><h2>${safe(p.title)}</h2><p>${safe(p.desc)}</p></div></div><div class="persona-footer">THẺ KHÁM PHÁ PHONG CÁCH LÀM VIỆC NHÓM</div></div>
<div class="lesson-card"><strong>Gợi ý của TEAM-CRAFT</strong><p>${safe(p.tip)}</p></div>${btn(`${icon('play')} Vào game mô phỏng`,'map','green full')}</div>`)}

const talkSprites={'Minh':'doer','Lan':'mediator','Huy':'follower','An':'leader','Bạn':null,'Hệ thống':'follower','Minh (suy nghĩ)':'doer'};
function bubble(name,msg){const mine=name==='Bạn';const id=talkSprites[name]||state.role;return `<div class="bubble-row ${mine?'self':''}"><span class="bubble-avatar">${avatar(id,'bubble-character',name==='Hệ thống'?'idle':'talk')}</span><div class="bubble-content"><small>${safe(name)}</small><p>${safe(msg)}</p></div></div>`}
function currentNode(){const g=state.game;if(g.mode==='reversal'){if(g.level===2)return {messages:[['Minh (suy nghĩ)','Mới vào nhóm lạ, mình không biết nhận phần nào, nhưng rất ngại hỏi...'],['An','Có ai muốn nhận phần mở đầu không?']],prompt:'Ở góc nhìn người mới, bạn làm gì?',options:[{text:'Giới thiệu thế mạnh, hỏi rõ đầu việc và deadline.',type:'good',answer:'Cả nhóm bắt đầu mở lời và chủ động phân công.',lesson:'Phá băng bắt đầu từ một lời xác nhận cụ thể.'},{text:'Tiếp tục im lặng để tránh bị chú ý.',type:'bad',answer:'Leader không biết bạn có thể làm gì, việc bị chậm.',lesson:'Im lặng có thể bị hiểu nhầm là thiếu hợp tác.'}]};return {messages:reversal.messages,prompt:'Là Minh, bạn sẽ phản hồi thế nào?',options:reversal.choices}}
if(g.level===1 && g.role==='leader')return leaderTree[g.node];const q=quickScenarios[`${g.level}:${g.role}`];return {...q,prompt:q.title,options:q.choices}}
function chatView(){const g=state.game;const current=currentNode();const lines=[...g.history,...current.messages.map(([name,text])=>({name,text}))];return shell('chat-page',`
<header class="chat-head"><button class="circle-action" data-go="stages" aria-label="Quay lại">${icon('back')}</button><span class="chat-head-face">${player('idle')}</span><div class="chat-head-text"><strong>${g.mode==='reversal'?'ĐẢO VAI / GÓC NHÌN KHÁC':'Nhóm Bài Tập · Ải '+g.level}</strong><small>Bạn đang là ${safe(role(g.role).name)}</small></div><span class="timer" id="game-count">${state.gameTime}s</span></header>
<div class="message-zone" id="message-zone"><div class="privacy-note">MÔ PHỎNG CHAT • KHÔNG GỬI TIN THẬT</div>${lines.map(x=>bubble(x.name,x.text)).join('')}</div>
<div class="decision-box"><div class="decision-head"><b>${safe(current.prompt||current.title||'Bạn sẽ phản hồi thế nào?')}</b><small>20 GIÂY / LƯỢT</small></div><div class="time-track"><span id="time-fill" style="width:${state.gameTime*5}%"></span></div>
${current.options.map((o,i)=>`<button class="decision-choice" data-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(o.text)}</button>`).join('')}</div>`)}
function getEnding(){const g=state.game;if(g.mode==='reversal')return g.reversalOutcome;if(g.level===1&&g.role==='leader')return leaderEndings[g.ending]||leaderEndings.E1;return g.quickOutcome}
function endingView(){const g=state.game;const o=getEnding();const tone=o.tone||o.type||'mid';return shell('interior-page ending-page',`${topbar(g.mode==='reversal'?'Đảo vai hoàn tất':'Lesson Unlocked','stages')}
<div class="page-body"><div class="ending-medal ${tone}">${avatar(tone==='good'?'follower':tone==='bad'?'qc':'mediator','medal-character',tone==='good'?'walk_a':'idle')}</div>
<h2 class="ending-title">${safe(o.name||(tone==='good'?'Giải quyết hiệu quả':tone==='bad'?'Nhóm gặp khó khăn':'Cần điều chỉnh'))}</h2><p class="ending-desc">${safe(o.message||o.answer)}</p>
<div class="lesson-card"><div class="lesson-caption">${icon('book')} LESSON UNLOCKED</div><p>${safe(o.lesson)}</p></div>
${o.template?`<div class="lesson-card template-card"><strong>VÍ KỊCH BẢN • MẪU TIN NHẮN</strong><p>${safe(o.template)}</p><button class="small-button" data-action="save-template">${icon('check')} Lưu mẫu tin nhắn</button></div>`:''}
<div class="action-stack">${g.mode==='reversal'?'':`<button class="game-btn pale full" data-action="reversal">${icon('rotate')} THỬ ĐẢO VAI</button>`}<div class="button-pair">${btn('Chơi lại','replay','sky')}${btn('Bản đồ','map','green')}</div></div><p class="small-note">Kết quả chỉ là tình huống mô phỏng, không dự đoán chắc chắn phản ứng ngoài đời.</p></div>`)}
function walletView(){return shell('interior-page',`${topbar('Ví kịch bản','map')}<div class="page-body"><div class="page-intro">Lưu và sao chép các mẫu tin nhắn từ màn chơi đã hoàn thành.</div>${state.wallet.length?state.wallet.map((w,i)=>`<article class="lesson-card wallet-item"><strong>Mẫu tin nhắn ${i+1}</strong><p>${safe(w.text)}</p><button class="small-button" data-copy="${i}">${icon('chat')} Sao chép</button></article>`).join(''):`<div class="empty-wallet">${avatar('follower','empty-char')}<h2>Ví của bạn đang trống</h2><p>Hoàn thành một màn chơi để lưu tin nhắn thực chiến.</p></div>`}${btn('Quay lại bản đồ','map','green full')}</div>`)}

function render(){const mapRender={home,map,roles:rolesView,custom:customView,stages:stagesView,stagePreview,quiz:quizView,quizResult,chat:chatView,ending:endingView,wallet:walletView,replay:()=>{startGame();return ''}};
ROOT.innerHTML=(mapRender[state.screen]||home)();if(state.screen==='chat'){document.getElementById('message-zone')?.scrollTo(0,9999)}if(state.screen==='quiz')runQuizClock();if(state.screen==='chat')runGameClock();}
function runQuizClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='quiz'){stopClock();return;}state.quizTime=Math.max(0,state.quizTime-1);const el=document.getElementById('quiz-count');if(el)el.textContent=state.quizTime+'s';if(state.quizTime===0)finishQuiz()},1000)}
function runGameClock(){stopClock();clock=setInterval(()=>{if(state.screen!=='chat'){stopClock();return;}state.gameTime=Math.max(0,state.gameTime-1);const el=document.getElementById('game-count');const bar=document.getElementById('time-fill');if(el)el.textContent=state.gameTime+'s';if(bar)bar.style.width=(state.gameTime*5)+'%';if(state.gameTime===0)autoGameEnd()},1000)}
function startQuiz(){state.quizIndex=0;state.quizAnswers=[];state.quizTime=60;route('quiz')}
function chooseQuiz(index){const ans=quizQuestions[state.quizIndex].answers[index];if(!ans)return;state.quizAnswers.push(ans[1]);if(state.quizIndex===4)finishQuiz();else {state.quizIndex++;render()}}
function finishQuiz(){const tally={};state.quizAnswers.forEach(x=>tally[x]=(tally[x]||0)+1);state.persona=Object.entries(tally).sort((a,b)=>b[1]-a[1])[0]?.[0]||'bee';save();route('quizResult')}
function openLevel(id){state.level=Number(id);route('stages')}
function openStage(index){state.stage=Number(index);const l=level(state.level);if(state.stage!==0||l.id>2)return route('stagePreview');if(!l.roles.includes(state.role)){state.role=l.roles[0];save();toast('Đã chọn vai phù hợp cho ải này')}startGame()}
function startGame(){state.game={level:state.level,role:state.role,mode:'main',node:'start',history:[],ending:null,quickOutcome:null,reversalOutcome:null};state.gameTime=20;route('chat')}
function finishMain(){const key=`${state.game.level}:${state.stage}:${state.role}`;if(!state.done.includes(key))state.done.push(key);save();route('ending')}
function answerGame(index){const g=state.game;const node=currentNode();const o=node.options[index];if(!o)return;g.history.push(...node.messages.map(([name,text])=>({name,text})),{name:'Bạn',text:o.text});
 if(g.mode==='reversal'){g.reversalOutcome={name:'Đảo vai hoàn tất',type:o.type,answer:o.answer,lesson:o.lesson};route('ending');return}
 if(g.level===1&&g.role==='leader'){if(o.to.startsWith('E')){g.ending=o.to;finishMain()}else{g.node=o.to;state.gameTime=20;render()}}else{g.quickOutcome={name:o.type==='good'?'Cả nhóm đã tiến lên!':o.type==='bad'?'Nhóm vẫn bế tắc':'Có điều cần cải thiện',type:o.type,answer:o.answer,lesson:o.lesson,template:o.template};finishMain()}}
function autoGameEnd(){const g=state.game;if(!g)return;if(g.mode==='reversal'){g.reversalOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Cả nhóm không biết bạn đang nghĩ gì.',lesson:'Im lặng cũng ảnh hưởng đến việc phối hợp.'};route('ending');return}if(g.level===1&&g.role==='leader')g.ending='E1';else g.quickOutcome={name:'Bỏ lỡ lượt phản hồi',type:'mid',answer:'Không có phản hồi kịp thời.',lesson:'Chủ động lên tiếng giúp nhóm hoạt động hiệu quả.'};finishMain()}
function startReversal(){state.game={...state.game,mode:'reversal',history:[]};state.gameTime=20;route('chat')}
function saveTemplate(){const o=getEnding();if(!o?.template)return;state.wallet.unshift({level:state.game.level,text:o.template});state.wallet=state.wallet.slice(0,30);save();toast('Đã lưu mẫu tin nhắn vào ví')}
async function copyWallet(index){const w=state.wallet[index];if(!w)return;try{await navigator.clipboard.writeText(w.text);toast('Đã sao chép')}catch{toast('Trình duyệt không cho phép sao chép tự động')}}
ROOT.addEventListener('click',e=>{
 let x=e.target.closest('[data-go]');if(x){if(x.dataset.go==='replay')return startGame();return route(x.dataset.go)}
 x=e.target.closest('[data-level]');if(x)return openLevel(x.dataset.level);
 x=e.target.closest('[data-role]');if(x){state.role=x.dataset.role;save();return render()}
 x=e.target.closest('[data-outfit]');if(x){state.outfit=x.dataset.outfit;save();return render()}
 x=e.target.closest('[data-stage]');if(x)return openStage(x.dataset.stage);
 x=e.target.closest('[data-quiz]');if(x)return chooseQuiz(Number(x.dataset.quiz));
 x=e.target.closest('[data-choice]');if(x)return answerGame(Number(x.dataset.choice));
 x=e.target.closest('[data-copy]');if(x)return copyWallet(Number(x.dataset.copy));
 x=e.target.closest('[data-action]');if(!x)return;
 if(x.dataset.action==='start-quiz')startQuiz();
 if(x.dataset.action==='save-template')saveTemplate();
 if(x.dataset.action==='reversal')startReversal();
});
route('home');
