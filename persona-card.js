/** TEAM-CRAFT · funny work-style license cards. Self-contained canvas exporter. */
export const personaStyles = {
  turtle: {name:'Rùa Gánh Tạ',caption:'Leader thương team quá mức',code:'TURTLE-001',tag:'ÔM VIỆC',tag2:'HẾT LÒNG',bg:'#ffdfed',ink:'#813f64',accent:'#d67ea5',detail:'#d7f5d2',trait:'Mình làm nốt cũng được…'},
  star:   {name:'Ếch Trưởng Nhóm',caption:'Leader biết chia việc',code:'FROG-002',tag:'CHỦ ĐỘNG',tag2:'CÓ KẾ HOẠCH',bg:'#e6f7dd',ink:'#446b54',accent:'#75be9a',detail:'#fff2bc',trait:'Mỗi người một việc nhé!'},
  sloth:  {name:'Lười Hẹn Mai',caption:'Bạn của deadline phút cuối',code:'SLOTH-003',tag:'CHẬM MÀ CHẮC?',tag2:'CẦN MỐC NHỎ',bg:'#ffeadc',ink:'#80583e',accent:'#d39b7f',detail:'#f9e3b0',trait:'Mai làm thật, hứa luôn!'},
  eagle:  {name:'Đại Bàng Soi Lỗi',caption:'Đôi mắt không bỏ qua typo',code:'EAGLE-004',tag:'CHẤT LƯỢNG',tag2:'TỈ MỈ',bg:'#e9efff',ink:'#5a547d',accent:'#8d91cf',detail:'#d8edfa',trait:'Khoan, slide 7 còn sai!'},
  owl:    {name:'Cú Đêm Hòa Giải',caption:'Giữ bình tĩnh giữa drama',code:'OWL-005',tag:'LẮNG NGHE',tag2:'HÒA GIẢI',bg:'#f3e5ff',ink:'#785a91',accent:'#b595d6',detail:'#fce4ef',trait:'Nói chậm lại, nghe nhau đã.'},
  bee:    {name:'Ong Chăm Chỉ',caption:'Nhận việc rõ, nộp đúng hẹn',code:'BEE-006',tag:'ĐÚNG HẸN',tag2:'ĐÁNG TIN',bg:'#fff0c9',ink:'#805d31',accent:'#e7b763',detail:'#e2f3d5',trait:'Mình xác nhận phần này nhé!'},
  ghost:  {name:'Ma Tàng Hình',caption:'Seen rồi nhưng hơi ngại nhắn',code:'GHOST-007',tag:'ÍT LÊN TIẾNG',tag2:'CẦN TỰ TIN',bg:'#ecebff',ink:'#65648b',accent:'#aaa6db',detail:'#def0ff',trait:'Đọc rồi… nhưng nhắn sao ta?'},
};

const frameCache=new Map();
async function mascotImage(id){
  if(frameCache.has(id))return frameCache.get(id);
  const img=new Image();
  const path=`assets/personas/${id}.svg`;
  const src=window.__assetMap?.[path] || new URL(path, import.meta.url).href;
  const p=new Promise((resolve,reject)=>{img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Không tải được linh vật '+id));});
  img.src=src;
  frameCache.set(id,p);
  return p;
}
function rr(ctx,x,y,w,h,r,fill,stroke,sw=1){
 ctx.beginPath();ctx.roundRect(x,y,w,h,r);
 if(fill){ctx.fillStyle=fill;ctx.fill()}
 if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke()}
}
function star(ctx,x,y,r,fill){
 ctx.save();ctx.translate(x,y);ctx.beginPath();
 for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5;const k=i%2?0.43:1;const px=Math.cos(a)*r*k;const py=Math.sin(a)*r*k;if(!i)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
 ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.restore();
}
function wrap(ctx, txt, x,y,width,lineHeight,maxLines=9){
  const words=String(txt).split(/\s+/);let line='', lines=0;
  for(let i=0;i<words.length;i++){
    const test=line?line+' '+words[i]:words[i];
    if(ctx.measureText(test).width>width && line){ctx.fillText(line,x,y+lineHeight*lines);lines++;line=words[i];if(lines>=maxLines)return lines;}
    else line=test;
  }
  if(line && lines<maxLines){ctx.fillText(line,x,y+lineHeight*lines);lines++}
  return lines;
}
function titleLines(ctx,text,maxWidth){
  const parts=text.split(' '), out=[];let line='';
  for(const word of parts){const test=line?line+' '+word:word; if(ctx.measureText(test).width>maxWidth && line){out.push(line);line=word;}else line=test;}
  if(line)out.push(line);return out;
}
export async function drawPersonaCard(canvas, p, nickname='CUT3FROG247', date=new Date()){
  const C=canvas.getContext('2d');const W=900,H=1190;canvas.width=W;canvas.height=H;
  const v=personaStyles[p.id] || personaStyles.bee;
  C.clearRect(0,0,W,H);
  const backdrop=C.createLinearGradient(0,0,0,H);backdrop.addColorStop(0,'#fff6f8');backdrop.addColorStop(.5,v.bg);backdrop.addColorStop(1,'#f8d8e8');
  rr(C,0,0,W,H,50,backdrop);
  C.save();C.beginPath();C.roundRect(0,0,W,H,50);C.clip();
  C.strokeStyle='rgba(181,102,147,.13)';C.lineWidth=2;
  for(let i=0;i<W;i+=38){C.beginPath();C.moveTo(i,0);C.lineTo(i,H);C.stroke()}
  for(let i=0;i<H;i+=38){C.beginPath();C.moveTo(0,i);C.lineTo(W,i);C.stroke()}
  for(const [x,y,r] of [[87,112,17],[799,127,16],[75,874,15],[830,890,16],[760,1082,13]])star(C,x,y,r,'#f6b654');
  C.fillStyle='rgba(255,255,255,.5)';
  for(const [x,y,r] of [[830,302,15],[97,564,9],[721,210,8],[230,1041,12]]){C.beginPath();C.arc(x,y,r,0,Math.PI*2);C.fill()}
  C.restore();
  rr(C,19,19,W-38,H-38,38,null,'#ffffff',14);
  rr(C,32,32,W-64,H-64,33,null,v.accent,6);

  rr(C,87,72,726,67,32,'#fffdf8',v.accent,4);
  C.fillStyle=v.ink;C.font='900 29px system-ui,Arial';C.textAlign='center';C.fillText('TEAM-CRAFT  ✦  WORKSTYLE LICENSE',450,115);
  C.fillStyle='#8d6680';C.font='800 21px system-ui,Arial';C.fillText('MỖI MẮT XÍCH ĐỀU TẠO NÊN CHIẾN THẮNG',450,177);
  C.fillStyle=v.ink;C.font='1000 65px system-ui,Arial';C.fillText('HỘ CHIẾU LÀM NHÓM',450,260);
  let fontSize=45;C.font=`1000 ${fontSize}px system-ui,Arial`;
  while(fontSize>27 && C.measureText(p.title).width>758){fontSize-=2;C.font=`1000 ${fontSize}px system-ui,Arial`;}
  C.fillText(p.title,450,332);
  const imageY=382;
  rr(C,79,imageY,352,422,28,'#fffaf7','#ffffff',6);
  rr(C,89,imageY+10,332,402,22,v.detail,v.accent,2);
  const mascot=await mascotImage(p.id);
  C.drawImage(mascot,91,imageY+12,328,352);
  rr(C,130,imageY+335,247,53,24,'#fffefa',v.accent,3);
  C.fillStyle=v.ink;C.textAlign='center';C.font='900 24px system-ui,Arial';C.fillText(v.name,253,imageY+369);

  const infoY=imageY+18;
  rr(C,452,imageY,367,422,28,'#fffdfb','#ffffff',6);
  C.textAlign='left';
  C.fillStyle=v.ink;C.font='900 24px system-ui,Arial';C.fillText('PLAYER ID',483,infoY+35);
  C.fillStyle='#4c3b53';C.font='1000 31px system-ui,Arial';
  wrap(C,nickname.toUpperCase().slice(0,18),483,infoY+83,315,36,2);
  C.strokeStyle='#ead1dd';C.lineWidth=3;C.beginPath();C.moveTo(478,infoY+105);C.lineTo(791,infoY+105);C.stroke();
  C.fillStyle=v.ink;C.font='900 23px system-ui,Arial';C.fillText('MÃ PHONG CÁCH',483,infoY+151);
  C.font='850 26px system-ui,Arial';C.fillText(v.code,483,infoY+188);
  C.font='900 23px system-ui,Arial';C.fillText('CHÂN DUNG TEAM',483,infoY+242);
  C.fillStyle='#685968';C.font='700 23px system-ui,Arial';
  wrap(C,p.desc,483,infoY+279,306,34,4);

  const traitsY=imageY+448;
  rr(C,80,traitsY,739,76,27,'rgba(255,255,255,.91)',v.accent,3);
  C.fillStyle=v.ink;C.font='900 25px system-ui,Arial';C.textAlign='center';
  C.fillText('✦  '+v.tag+'     ✦     '+v.tag2+'  ✦',450,traitsY+48);
  rr(C,80,traitsY+97,739,170,26,'#fffaf3','#e2b4c5',3);
  C.textAlign='left';C.fillStyle=v.ink;C.font='900 25px system-ui,Arial';C.fillText('LỜI NHẮN NHỎ',109,traitsY+142);
  C.fillStyle='#665466';C.font='700 26px system-ui,Arial';
  wrap(C,p.tip,109,traitsY+183,510,35,3);
  C.save();C.translate(735,traitsY+174);C.rotate(-.19);
  C.beginPath();C.arc(0,0,74,0,Math.PI*2);C.fillStyle='#ffeef4';C.fill();C.lineWidth=7;C.strokeStyle='#bd4b73';C.stroke();
  C.beginPath();C.arc(0,0,61,0,Math.PI*2);C.lineWidth=3;C.stroke();
  C.fillStyle='#ae4169';C.font='1000 20px system-ui,Arial';C.textAlign='center';C.fillText('TEAM',0,-22);C.fillText('CRAFT',0,4);C.font='1000 29px system-ui,Arial';C.fillText('✓',0,36);C.restore();

  C.fillStyle=v.ink;C.font='900 19px system-ui,Arial';C.textAlign='center';
  const dt=new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(date);
  C.fillText('CẤP NGÀY '+dt+'   ·   THẺ VUI NHỘN',450,1117);
  C.fillStyle='#8c7384';C.font='700 18px system-ui,Arial';C.fillText('Dành cho trải nghiệm trò chơi · Không phải kết quả đánh giá tâm lý',450,1154);
  return canvas;
}
