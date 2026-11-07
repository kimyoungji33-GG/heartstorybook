(() => {
'use strict';
const ART={
  garden:'assets/bookshop-garden.png',hallway:'assets/hallway-continuity.png',
  plant:'assets/plant.png',blooms:'assets/seed-blooms.png',
  ruben:'assets/ruben-welcome.png',rubenLook:'assets/ruben-look.png',rubenSpeak:'assets/ruben-speak.png',
  mira:'assets/mira.png',inside:'assets/elevator-inside.png'
};
const RECORDINGS={
  walk:'assets/footsteps.mp3',
  wheel:'assets/handcart.mp3',
  open:'assets/door-open.mp3',
  close:'assets/door-close.mp3'
};
const KEY='heart-meadow-simple-v2';
const SEEDS=['고마움','미안함','알아봐 줌','기다림','다정함','배려','그리움','귀 기울임'];
const BLOOMS=['노란 데이지','보라 제비꽃','해바라기','라벤더','분홍 코스모스','하얀 은방울꽃','파란 물망초','붉은 동백꽃'];
const PHRASES=['양보인 줄 알았는데, 기다림이었구나.','보이지 않던 사정이 있었구나.','다음에는 한 번 더 살펴보고 싶어요.','내 속도도, 다른 사람의 속도도 소중해요.'];
const SCENES=[
{speaker:'나 · 같은 층 이웃',text:'1층에 내려가려고 엘리베이터 앞에 왔어요. 같은 층에 사는 루벤 씨가 문 옆에 서 있어요.',next:'엘리베이터 기다리기'},
{speaker:'루벤',text:'“먼저 타세요.”',detail:'루벤 씨가 손을 내리고 오른쪽 복도 끝으로 고개를 돌려요.',next:'문 앞에 서기',clues:true},
{speaker:'나',text:'나는 열린 문 바로 앞에 있어요. 오른쪽 복도에서 바퀴 소리가 가까워져요.',choice:true},
{speaker:'미라',text:'“잠깐만요, 같이 내려가도 될까요?”',detail:'같은 층 이웃 미라 씨가 복도 끝에서 상자를 실은 손수레를 밀고 와요.',next:'문을 잡고 기다리기'},
{speaker:'루벤',text:'“저는 안 타요. 집에 들어가려다가 손수레 소리가 들려서 기다렸어요.”',detail:'루벤 씨가 내 쪽으로 고개를 돌려 말해요. 나는 문을 잡은 채 미라 씨가 들어갈 자리를 내줘요.',next:'내가 미라 씨와 타기'},
{speaker:'미라 · 엘리베이터 안',text:'“루벤 씨, 기다려 주셔서 고마워요.”',detail:'미라 씨가 복도에 남은 루벤 씨에게 인사하고, 안에 함께 탄 나를 보며 말해요. “문 잡아 주셔서 고마워요.”',next:'이 마음 간직하기'}
];
const $=id=>document.getElementById(id), app=$('app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fresh=()=>({version:2,hearts:0,slots:[null,null,null],episode:{step:0,choice:null,reopened:false,done:false,rewarded:false,replaying:false},phrase:'',notes:[],sound:false,lastVisit:0});
let state=fresh(),screen='field',selectedSlot=0,selectedSeed=SEEDS[0],clue='',timer,saveOK=true,audio;
let sceneMotion='',boardingTimer,playingRecording;
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let welcome=false;
try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw?.version===2&&Array.isArray(raw.slots)&&raw.slots.length===3&&Array.isArray(raw.notes)&&raw.episode){state={...fresh(),...raw};state.hearts=Number.isSafeInteger(raw.hearts)&&raw.hearts>=0?raw.hearts:0;state.slots=raw.slots.map(p=>p&&SEEDS.includes(p.seed)?{seed:p.seed,to:String(p.to||''),why:String(p.why||''),name:String(p.name||p.seed),hearts:Math.min(8,Math.max(0,Number(p.hearts)||0))}:null);state.notes=raw.notes.filter(n=>n&&typeof n.text==='string');state.episode={...fresh().episode,...raw.episode};state.episode.step=Math.min(5,Math.max(0,Number.isInteger(raw.episode.step)?raw.episode.step:0));welcome=Date.now()-Number(raw.lastVisit)>86400000;}}catch{saveOK=false;}
state.lastVisit=Date.now();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));saveOK=true;}catch{saveOK=false;}$('save-status').textContent=saveOK?'이야기와 화분도 여기에서 기억해요.':'지금은 저장이 어려워요. 창을 닫으면 내용이 남지 않을 수 있어요.';}
function toast(t){$('toast').textContent=t;$('toast').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function stage(h){return h>=8?5:h>=6?4:h>=4?3:h>=2?2:h>=1?1:0;}
function sprite(hearts,label='',grow=false,seed){
  const growth=stage(hearts);
  const flowerIndex=SEEDS.indexOf(seed);
  const isBloom=growth===5&&flowerIndex>=0;
  const image=isBloom?ART.blooms:ART.plant;
  const column=isBloom?flowerIndex%4:growth%3;
  const row=isBloom?Math.floor(flowerIndex/4):Math.floor(growth/3);
  const description=isBloom?BLOOMS[flowerIndex]:['씨앗','작은 싹','새잎','줄기','꽃봉오리','활짝 핀 꽃'][growth];
  const left=isBloom?12.5-column*75:-column*100;
  return `<span class="sprite ${grow?'grow':''}" role="img" aria-label="${esc(label||description)}">
    <img class="plant-atlas ${isBloom?'bloom-atlas':''}" src="${image}" alt="" style="left:${left}%;top:${-row*100}%">
  </span>`;
}
const button=(text,action,extra='',cls='')=>`<button type="button" class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
function renderHeader(){
$('hearts').textContent='♥ '+state.hearts;$('sound').textContent=state.sound?'효과음 끄기':'효과음 켜기';$('sound').setAttribute('aria-pressed',String(state.sound));
}
function render(){
renderHeader();
app.innerHTML=screen==='story'?story():screen==='reward'?reward():field();save();
}
function field(){
  const inProgress=!state.episode.done&&state.episode.step>0||state.episode.replaying;
  return `
    <section class="stage field garden-scene" aria-label="마음동화책방 앞마당의 마음정원">
      <img class="backdrop" src="${ART.garden}" alt="그림책이 보이는 마음동화책방과 꽃이 핀 앞마당">
      <div class="field-title">
        <span class="garden-kicker">마음동화책방 앞마당</span>
        <h1>마음정원</h1>
        <p>책방에 들른 사람들이<br>마음을 한 알씩 심어 가꾸는 정원이에요.</p>
        <p class="welcome">${welcome?'기다렸어요. 오늘은 어떤 마음으로 오셨나요?':'오늘은 어떤 마음을 심어 볼까요?'}</p>
      </div>
      <div class="plots">${state.slots.map((plant,index)=>`
        <button class="plot ${plant?'':'empty'}" data-action="plot" data-slot="${index}" aria-label="${plant?esc(plant.name)+' 화분 돌보기':(index+1)+'번 자리에 씨앗 심기'}">
          ${sprite(plant?.hearts||0,plant?'':'씨앗을 기다리는 빈 화분',false,plant?.seed)}
          <span class="plot-label">${plant?esc(plant.name):'＋ 씨앗 심기'}</span>
        </button>`).join('')}</div>
    </section>
    <nav class="garden-actions" aria-label="마음정원에서 할 일">
        ${button(inProgress?'이야기 이어서 하기':'1화 · 엘리베이터 앞','start','','primary')}
        ${button('간직한 마음','journal')}
        ${state.episode.done?button('다시 만나기','replay'):''}
    </nav>`;
}
function story(){
  const episode=state.episode;
  const scene=SCENES[episode.step];
  const inside=episode.step===5;
  const boarding=sceneMotion==='board';
  const almostClosed=episode.step===3&&episode.choice==='close'&&!episode.reopened;
  const showMira=episode.step===3||episode.step===4;
  const doorState=episode.step===0?'shut':almostClosed?'narrow':'open';
  const opening=sceneMotion==='open'||sceneMotion==='reopen';
  const closing=sceneMotion==='close';
  const wheelCue=sceneMotion==='approach'||closing;
  const soundCaption=opening?'문이 열립니다':closing?'문이 닫힙니다':wheelCue?'손수레 바퀴 소리':sceneMotion==='wheel'?'복도 끝에서 들려오는 바퀴 소리':boarding?'내 발걸음 소리':sceneMotion==='walk'?'복도를 걷는 발걸음 소리':'';
  const location=inside?'내 위치 · 엘리베이터 안':boarding?'내가 문을 지나 안으로':'내 위치 · 엘리베이터 문 앞';
  const rubenArt=episode.step===0?ART.ruben:episode.step===4?ART.rubenSpeak:ART.rubenLook;
  const rubenDescription=episode.step===0?'문 옆에서 손바닥을 펴 보이는 루벤 씨':episode.step===4?'손을 몸 가까이 내리고 나를 바라보며 말하는 루벤 씨':'손을 내리고 오른쪽 복도를 바라보는 루벤 씨';
  const arrows=`
    <div class="door-actions" aria-label="내가 누르는 엘리베이터 단추">
      ${button('<span aria-hidden="true">◀ ▶</span> '+(almostClosed?'다시 열기':'열림 누르기'),almostClosed?'reopen':'choose','data-choice="open"','door-action')}
      ${almostClosed?'':button('<span aria-hidden="true">▶ ◀</span> 닫힘 누르기','choose','data-choice="close"','door-action')}
    </div>`;
  return `
    <section class="story" aria-label="1화 · 엘리베이터 앞">
      <div class="story-picture ${inside?'inside-picture':'hall-picture'} ${boarding?'boarding-picture':''}">
        <div class="camera-view">
        <img class="story-backdrop" src="${inside?ART.inside:ART.hallway}" alt="${inside?'엘리베이터 안의 미라와 손수레, 열린 문 밖 복도에 서 있는 루벤':'왼쪽 엘리베이터와 오른쪽으로 이어지는 공용 복도'}">
        ${inside?'':`
          <div class="lift-opening ${doorState} ${opening?'opening':''} ${sceneMotion==='reopen'?'reopening':''} ${closing?'closing':''}" aria-hidden="true">
            <div class="lift-panel"></div><div class="lift-panel"></div>
          </div>
          <img class="story-ruben" src="${rubenArt}" alt="${rubenDescription}">
          ${showMira?`<div class="story-mira ${wheelCue?'approaching':''}"><img src="${ART.mira}" alt="오른쪽 복도에서 상자를 실은 손수레를 밀고 오는 미라 씨"></div>`:''}
        `}
        </div>
        <span class="story-place">${location}</span>
        ${soundCaption?`<span class="sound-caption" role="status">${soundCaption}</span>`:''}
        ${scene.clues?`
          ${button('⌕','clue','data-clue="foot" aria-label="루벤 씨 발밑 살펴보기"','story-marker foot')}
          ${button('⌕','clue','data-clue="end" aria-label="복도 끝 살펴보기"','story-marker end')}
        `:''}
      </div>
      <div class="story-caption">
        <div>
          <span class="story-speaker">${boarding?'나':scene.speaker}</span>
          <p>${boarding?'문턱을 지나 미라 씨와 엘리베이터 안으로 들어가요.':scene.text}</p>
          ${!boarding&&scene.detail?`<p class="story-detail">${scene.detail}</p>`:''}
          ${almostClosed?'<p class="story-detail">문이 닫히기 시작했어요. 미라 씨가 타도록 다시 열어 볼까요?</p>':''}
        </div>
        ${scene.choice||almostClosed?arrows:button(boarding?'타는 중…':scene.next,'next',boarding?'disabled':'','primary')}
        ${clue?`<aside class="story-clue" role="status"><p>${esc(clue)}</p>${button('그렇구나','dismiss')}</aside>`:''}
      </div>
    </section>`;
}
function reward(){return `<section class="stage field"><img class="backdrop" src="${ART.garden}" alt="마음동화책방 앞마당"><article class="reward-card"><div class="reward-hearts" aria-label="하트 세 개">♥ ♥ ♥</div><h1>기다려 줘서 고마워요.</h1><p>${state.episode.replaying?'다시 만나도 마음은 새롭게 보일 수 있어요.':'이야기를 끝까지 만나 하트 3개를 받았어요.'}</p><p>지금 마음에 남는 문장을 골라 주세요.</p><div class="phrases">${PHRASES.map((p,i)=>button(esc(p),'phrase',`data-index="${i}" aria-pressed="${state.phrase===p}"`)).join('')}</div><label for="own-phrase">내 말로 적어도 좋아요 <small>선택</small></label><textarea id="own-phrase" maxlength="240" placeholder="짧은 한 줄이면 충분해요."></textarea><div class="actions" style="margin-top:18px">${button('이 마음 정원에 놓기','finish','','primary')}${button('지금은 그냥 돌아가기','home')}</div><p class="hint" style="margin-top:15px">문장을 고르지 않아도 하트는 그대로예요. 첫 이야기 완료 보상은 한 번만 받아요.</p></article></section>`;}
function go(where,motion=''){
  screen=where;
  sceneMotion=motion;
  clue='';
  render();
  app.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
}
function boardElevator(){
  const arrive=()=>{
    state.episode.step=5;
    go('story');
  };
  playSound('walk');
  if(reduced()){
    arrive();
    return;
  }
  go('story','board');
  boardingTimer=setTimeout(arrive,1120);
}
function seedDialog(index){
  selectedSlot=index;
  selectedSeed=SEEDS[0];
  $('seed-preview').innerHTML=sprite(0,'작은 씨앗이 담긴 화분');
  $('seed-options').innerHTML=SEEDS.map((seed,i)=>button(
    `<span class="seed-flower" aria-hidden="true">${sprite(8,BLOOMS[i],false,seed)}</span><span>${seed}</span><small>${BLOOMS[i]}</small>`,
    'seed',`data-seed="${seed}" aria-pressed="${seed===selectedSeed}"`,'seed-card'
  )).join('');
  $('seed-note').open=false;
  $('recipient').value='';
  $('reason').value='';
  $('seed-dialog').showModal();
}
function plantDialog(i,grow=false){selectedSlot=i;const p=state.slots[i];if(!p)return;const full=p.hearts>=8;$('plant-content').innerHTML=`<div class="plant-summary"><div class="plant-preview">${sprite(p.hearts,'',grow,p.seed)}</div><h2 id="plant-title">${esc(p.name)}</h2><p>${esc(p.seed)} 씨앗이에요. 피어날 꽃 · ${BLOOMS[SEEDS.indexOf(p.seed)]}</p><div class="growth" aria-label="성장 하트 ${p.hearts}개, 여덟 개면 꽃이 피어요">${Array.from({length:8},(_,i)=>`<i class="${i<p.hearts?'on':''}"></i>`).join('')}</div><p>${full?'꽃이 피었어요. 잘 돌봐 주었네요.':`꽃까지 하트 ${8-p.hearts}개가 더 필요해요.`}</p>${button(full?'꽃이 활짝 피었어요':'♥ 하트 1개 건네기','water',full||state.hearts<1?'disabled':'','primary')}<p class="hint" style="margin-top:12px">내 주머니에는 하트 ${state.hearts}개가 있어요.</p></div><label for="plant-name">반려식물 이름</label><input id="plant-name" maxlength="20" value="${esc(p.name)}">${button('이름 간직하기','rename','style="margin-top:12px"')}<div class="plant-note">${p.to?`<p>누구에게: ${esc(p.to)}</p>`:''}${p.why?`<p>심은 마음: ${esc(p.why)}</p>`:''}<label for="care-note">오늘 건네고 싶은 한 줄 <small>선택</small></label><textarea id="care-note" maxlength="240" placeholder="나에게 건네는 말도 좋아요."></textarea>${button('한 줄 간직하기','care-note','style="margin-top:12px"')}<p class="hint" style="margin-top:12px">새로운 마음을 적으면 하트 2개를 받아요.</p></div>`;if(!$('plant-dialog').open)$('plant-dialog').showModal();}
function addNote(text,kind){text=text.trim();if(!text||state.notes.some(n=>n.text===text))return false;state.notes.push({text,kind,date:new Date().toISOString()});if(kind==='written')state.hearts+=2;return true;}
function journal(){$('journal-content').innerHTML=state.notes.length?state.notes.map(n=>`<article class="journal-note"><small>${n.kind==='written'?'내가 적은 마음':'이야기에서 고른 마음'}</small><p>${esc(n.text)}</p></article>`).join(''):'<p>씨앗을 심거나 이야기를 만나며 마음을 남겨 보세요.</p>';$('journal-dialog').showModal();}
function finishStory(){
  state.episode.done=true;
  const firstTime=!state.episode.rewarded;
  if(firstTime){state.hearts+=3;state.episode.rewarded=true;}
  go('reward');
  if(firstTime) playSound('heart');
}
function stopRecording(){
  if(playingRecording) playingRecording.pause();
  playingRecording=null;
}
function playRecording(effects){
  stopRecording();
  if(!window.Audio) return;
  const clip=new window.Audio();
  playingRecording=clip;
  let index=0;
  const playNext=()=>{
    if(playingRecording!==clip||!state.sound) return;
    const effect=effects[index++];
    if(!effect){
      playingRecording=null;
      return;
    }
    clip.src=RECORDINGS[effect];
    clip.volume=effect==='wheel'?.75:.92;
    clip.play().catch(()=>{if(playingRecording===clip) stopRecording();});
  };
  clip.addEventListener('ended',playNext);
  playNext();
}
function playSound(effect,...following){
  if(!state.sound) return;
  if(RECORDINGS[effect]){
    playRecording([effect,...following]);
    return;
  }
  stopRecording();
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio) return;
  try{
    audio ||= new Audio();
    audio.resume().catch(()=>{});
    const start=audio.currentTime+.025;
    function note(pitch,delay,length,volume){
      const oscillator=audio.createOscillator();
      const envelope=audio.createGain();
      const at=start+delay;
      oscillator.frequency.value=pitch;
      envelope.gain.setValueAtTime(.001,at);
      envelope.gain.linearRampToValueAtTime(volume,at+.015);
      envelope.gain.exponentialRampToValueAtTime(.001,at+length);
      oscillator.connect(envelope).connect(audio.destination);
      oscillator.start(at);
      oscillator.stop(at+length+.025);
    }
    if(effect==='heart'){
      [523,659,784].forEach((pitch,i)=>note(pitch,i*.13,.55,.048));
    }else if(effect==='water'){
      note(698,0,.24,.039);
      note(932,.075,.26,.025);
    }
  }catch{
    toast('소리 없이도 장면과 대사를 따라갈 수 있어요.');
  }
}
function water(buttonElement){const p=state.slots[selectedSlot];if(!p||p.hearts>=8||state.hearts<1)return;state.hearts--;p.hearts++;save();if(!reduced()){const from=buttonElement.getBoundingClientRect(),to=document.querySelector('.plant-preview').getBoundingClientRect(),heart=document.createElement('span');heart.className='flying-heart';heart.textContent='♥';heart.style.left=from.left+from.width/2+'px';heart.style.top=from.top+'px';heart.style.setProperty('--dx',to.left+to.width/2-from.left-from.width/2+'px');heart.style.setProperty('--dy',to.top+to.height/2-from.top+'px');document.body.append(heart);setTimeout(()=>heart.remove(),850);}render();plantDialog(selectedSlot,true);playSound('water');if(p.hearts===8)toast('꽃이 피었어요. 함께 남긴 마음도 잘 간직할게요.');}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.close){$(b.dataset.close).close();return;}const a=b.dataset.action;
if(a==='plot'){const i=Number(b.dataset.slot);return state.slots[i]?plantDialog(i):seedDialog(i);}
if(a==='seed'){selectedSeed=b.dataset.seed;document.querySelectorAll('[data-action="seed"]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.seed===selectedSeed)));return;}
if(a==='start'){
  if(state.episode.done&&!state.episode.replaying){go('reward');return;}
  go('story',state.episode.step===0?'walk':'');
  if(state.episode.step===0) playSound('walk');
  return;
}
if(a==='replay'){
  Object.assign(state.episode,{step:0,choice:null,reopened:false,replaying:true});
  go('story','walk');
  playSound('walk');
  return;
}
if(a==='next'){
  if(screen!=='story'||sceneMotion==='board') return;
  const episode=state.episode;
  if(episode.step===5) return finishStory();
  if(episode.step===2||(episode.step===3&&episode.choice==='close'&&!episode.reopened)) return;
  if(episode.step===4) return boardElevator();
  episode.step++;
  const effect={1:'open',2:'wheel'}[episode.step];
  go('story',effect||'');
  if(effect) playSound(effect);
  return;
}
if(a==='clue'){
  clue=b.dataset.clue==='foot'?'루벤 씨는 실내 슬리퍼를 신고 있어요. 멀리 나갈 차림은 아닌 것 같아요.':'오른쪽 공용 복도 끝에서 작은 바퀴 소리가 들려요.';
  sceneMotion='';
  render();
  if(b.dataset.clue==='end') playSound('wheel');
  return;
}
if(a==='dismiss'){clue='';render();return;}
if(a==='choose'&&screen==='story'&&state.episode.step===2){
  const close=b.dataset.choice==='close';
  Object.assign(state.episode,{choice:close?'close':'open',reopened:false,step:3});
  go('story',close?'close':'approach');
  if(close) playSound('close','wheel');
  else playSound('wheel');
  return;
}
if(a==='reopen'&&screen==='story'&&state.episode.step===3&&state.episode.choice==='close'){
  Object.assign(state.episode,{reopened:true,step:4});
  go('story','reopen');
  playSound('open');
  return;
}
if(a==='phrase'){state.phrase=PHRASES[Number(b.dataset.index)]||'';document.querySelectorAll('[data-action="phrase"]').forEach(x=>x.setAttribute('aria-pressed',String(PHRASES[Number(x.dataset.index)]===state.phrase)));save();return;}
if(a==='finish'){const own=$('own-phrase').value.trim();if(own){state.phrase=own;addNote(own,'written');}else if(state.phrase)addNote(state.phrase,'selected');state.episode.replaying=false;go('field');toast('오늘의 마음을 잘 간직했어요.');return;}
if(a==='home'){state.episode.replaying=false;go('field');return;}
if(a==='journal')return journal();
if(a==='water')return water(b);
if(a==='rename'){const p=state.slots[selectedSlot],name=$('plant-name').value.trim();if(!name)return toast('부르고 싶은 이름을 적어 주세요.');p.name=name;save();render();plantDialog(selectedSlot);toast('이름을 간직했어요.');return;}
if(a==='care-note'){const text=$('care-note').value.trim();if(!text)return toast('간직하고 싶은 한 줄을 적어 주세요.');if(!addNote(text,'written'))return toast('이미 간직한 마음이에요.');save();render();plantDialog(selectedSlot);toast('한 줄과 하트 2개를 간직했어요.');return;}
});
$('seed-form').addEventListener('submit',e=>{e.preventDefault();if(state.slots[selectedSlot])return;const to=$('recipient').value.trim(),why=$('reason').value.trim();state.slots[selectedSlot]={seed:selectedSeed,to,why,name:selectedSeed,hearts:0};if(to||why)addNote([to?to+'에게':'',why].filter(Boolean).join(' · '),'written');$('seed-dialog').close();save();render();toast('씨앗을 심었어요. 천천히 함께 지내요.');});
$('home').addEventListener('click',()=>{
  clearTimeout(boardingTimer);
  stopRecording();
  go('field');
});
$('sound').addEventListener('click',()=>{
  state.sound=!state.sound;
  renderHeader();
  save();
  if(state.sound){
    toast('발걸음, 손수레 바퀴, 한국어 문 안내와 하트 소리가 들려요.');
  }else{
    audio?.suspend().catch(()=>{});
    stopRecording();
  }
});
render();
})();
