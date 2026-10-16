/* 직접 녹음한 한국어 음원만 사용합니다. 자동 음성 합성은 사용하지 않습니다. */
(()=>{
  let audio=null, generation=0;
  function stop(){generation++;if(audio){audio.pause();audio.currentTime=0;audio=null;}}
  function mount(slot,context){
    if(!slot)return;
    stop();slot.replaceChildren();
    if(window.heartLanguage()!=='ko')return;
    const track=window.heartNarrationTracks?.[context.book]?.[context.view]?.[context.page];
    if(typeof track!=='string'||!track.startsWith('./audio/'))return;
    const bar=document.createElement('div');bar.className='story-audio';
    const status=document.createElement('small');status.setAttribute('role','status');
    bar.append(status);slot.append(bar);
    const player=new Audio(track);audio=player;player.preload='metadata';
    const play=document.createElement('button'),pause=document.createElement('button'),restart=document.createElement('button');
    play.type=pause.type=restart.type='button';play.textContent='읽어주기';pause.textContent='일시정지';restart.textContent='처음부터 듣기';pause.disabled=true;
    bar.prepend(play,pause,restart);status.textContent=(slot.dataset.narrator?slot.dataset.narrator+' · ':'')+'이 장의 본문을 읽어드려요.';
    const update=()=>{play.textContent=player.currentTime>0&&!player.ended?'이어서 듣기':'읽어주기';play.disabled=!player.paused;pause.disabled=player.paused;};
    const start=async()=>{const token=generation;status.textContent='소리를 준비하고 있어요.';try{await player.play();if(token!==generation){player.pause();return;}status.textContent='이야기를 듣고 있어요.';update();}catch{if(token!==generation)return;status.textContent='음원을 불러오지 못했어요. 잠시 후 다시 눌러 주세요.';update();}};
    play.onclick=start;pause.onclick=()=>{player.pause();status.textContent='잠시 쉬고 있어요.';update();};restart.onclick=()=>{player.currentTime=0;return start();};
    player.onended=()=>{status.textContent='이 장의 이야기를 다 들었어요.';update();};
    player.onerror=()=>{status.textContent='읽어주기 음원을 준비하고 있어요.';play.disabled=pause.disabled=restart.disabled=true;};
  }
  window.heartNarration={stop,mount};
  const slot=document.getElementById('narration-slot');
  if(slot)mount(slot,{book:slot.dataset.book,view:slot.dataset.listenView,page:Number(slot.dataset.listenPage)});
  window.addEventListener('pagehide',stop);
})();
