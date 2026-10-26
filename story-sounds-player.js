(() => {
 'use strict';
 const root=document.getElementById('story-sound-app'),lang=window.heartLanguage?.()||'ko';
 const l=lang==='en'?1:lang==='es'?2:0,w=(...v)=>v[l],t=x=>window.storySoundTranslate(x,lang);
 const title=t('헨젤과 그레텔, 마녀의 집에서 들리는 소리');
 const rounds=[
  {before:2,after:3,alt:w('등불이 켜진 방의 커튼 뒤에 커다란 그림자가 비쳐요.','A large shadow falls behind a curtain in a lamplit room.','Una gran sombra aparece tras una cortina en una habitación iluminada.'),reveal:w('흔들의자 아래에 고무오리가 있었네요!','There was a rubber duck under the rocking chair!','¡Había un patito de goma debajo de la mecedora!')},
  {before:4,after:5,alt:w('달이 뜬 창가에서 커다란 솥의 김이 피어올라요.','Steam rises from a large pot beside a moonlit window.','Sale vapor de una gran olla junto a una ventana iluminada por la luna.'),reveal:w('마녀가 크림을 올리고 있었네요!','The witch was adding whipped cream!','¡La bruja estaba poniendo nata montada!')},
  {before:6,after:7,alt:w('열린 문과 창문 사이로 천이 날리고 벽에는 커다란 그림자가 비쳐요.','Fabric blows between an open door and window, and a large shadow falls on the wall.','Una tela ondea entre una puerta y una ventana abiertas y una gran sombra aparece en la pared.'),reveal:w('바람에 천이 날리고, 과자 바구니가 기울었네요!','The fabric was blowing in the wind, and the biscuit basket tipped over!','¡La tela ondeaba con el viento y la cesta de galletas se volcó!')},
  {before:8,after:9,alt:w('밤의 집 밖, 불 켜진 창문에 여러 사람의 그림자가 보여요.','Outside a house at night, several silhouettes appear in a glowing window.','De noche, se ven varias siluetas en una ventana iluminada.'),reveal:w('집 안에서는 할로윈 파티가 열리고 있었어요!','There was a Halloween party inside!','¡Dentro había una fiesta de Halloween!')}
 ];
 const audio=new Audio();audio.preload='metadata';audio.volume=.7;
 let step='shelf',round=0,error='',token=0;
 const button=(id,label,primary=false)=>`<button id="${id}" class="${primary?'primary':''}">${label}</button>`;
 const on=(id,fn)=>{const el=document.getElementById(id);if(el)el.onclick=fn;};
 function stop(){token++;audio.pause();try{audio.currentTime=0;}catch{}}
 function update(){const b=document.getElementById('play-sound'),s=document.getElementById('sound-status');if(b){b.textContent=audio.paused?w('▶ 소리 듣기','▶ Listen','▶ Escuchar'):w('Ⅱ 소리 멈추기','Ⅱ Stop','Ⅱ Detener');b.setAttribute('aria-pressed',String(!audio.paused));}if(s)s.textContent=error||(!audio.paused?w('소리를 듣고 있어요.','The sound is playing.','El sonido está sonando.'):w('눌러서 듣고, 여러 번 다시 들어도 좋아요.','Press to listen. You can listen again as often as you like.','Pulsa para escuchar. Puedes repetirlo las veces que quieras.'));}
 async function play(){if(!audio.paused){stop();update();return;}error='';const current=++token;try{audio.currentTime=0;await audio.play();if(current!==token)audio.pause();}catch(e){if(current===token)error=w('소리를 재생하지 못했어요. 다시 눌러보세요. 그림은 계속 살펴볼 수 있어요.','The sound could not play. Try again, or continue exploring the pictures.','No se pudo reproducir el sonido. Prueba otra vez o sigue explorando las imágenes.');}update();}
 for(const event of ['ended','pause','playing'])audio.addEventListener(event,update);
 audio.addEventListener('error',()=>{error=w('소리를 불러오지 못했어요. 다시 눌러보세요.','The sound could not load. Please try again.','No se pudo cargar el sonido. Prueba otra vez.');update();});
 function go(next,n=round){stop();error='';location.hash=['listen','discover'].includes(next)?`${next}-${n+1}`:next;}
 const image=n=>`./images/story-sounds/hansel/original-${String(n).padStart(2,'0')}.png`;
 const figure=(n,alt,caption='')=>`<figure class="story-scene"><img src="${image(n)}" alt="${alt}" width="1536" height="1024">${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 const listening=()=>`<div class="listening">${button('play-sound',w('▶ 소리 듣기','▶ Listen','▶ Escuchar'))}</div><p id="sound-status" class="listen-status" role="status"></p>`;
 function render(){
  stop();error='';const hash=location.hash.slice(1),m=hash.match(/^(listen|imagine|discover)-([1-4])$/);
  step=m?m[1]:['cover','finish'].includes(hash)?hash:'shelf';round=m?Number(m[2])-1:0;
  if(step==='imagine'){step='listen';history.replaceState(null,'',location.pathname+location.search+'#listen-'+(round+1));}
  root.dataset.step=step;root.dataset.round=String(round+1);
  document.title=(step==='shelf'?t('이야기 속 소리 탐험'):title)+' · '+w('마음동화책방','Heart Storybook Library','Biblioteca de cuentos del corazón');
  if(step==='shelf'){
   root.innerHTML=`<section class="story-sound-shelf"><a class="back-link" href="./perspective-games.html?lang=${lang}">← ${t('마음의 소리로')}</a><img class="story-shelf-hero" src="./images/story-sound-entrance-v1.png" alt="${w('펼친 동화책 속 장면에 귀 기울이는 두 아이','Two children listen to a scene in an open storybook','Dos niños escuchan una escena de un cuento abierto')}"><h1 tabindex="-1">${t('이야기 속 소리 탐험')}</h1><p class="shelf-intro">${t('잠깐 듣고, 상상하고, 그림을 펼쳐요. 정답이나 점수는 없어요.')}</p><a id="open-story" class="sound-collection story-sound-book" href="#cover"><img src="${image(1)}" alt="${w('할로윈 밤에 마녀의 집을 찾아온 헨젤과 그레텔','Hansel and Gretel visit the witch’s house on Halloween night','Hansel y Gretel visitan la casa de la bruja en Halloween')}"><span class="season-label">${w('할로윈 특집 · 소리 놀이','Halloween special · Sound game','Especial de Halloween · Juego de sonidos')}</span><strong>${title}</strong><p>${w('마녀의 집에서 들리는 네 가지 소리. 그림을 펼치며 함께 살펴봐요.','Four sounds in the witch’s house. Open the pictures and explore.','Cuatro sonidos en casa de la bruja. Despliega las imágenes y explora.')}</p><span class="collection-open">${t('소리 탐험 시작하기')} →</span></a></section>`;
  }else{
   const back=button('shelf-back','← '+w('이야기 책장으로','Back to the story shelf','Volver a la estantería'));
   let body='';
   if(step==='cover')body=`<p class="progress">${w('할로윈 특집 · 소리 놀이','Halloween special · Sound game','Especial de Halloween · Juego de sonidos')}</p><h1 tabindex="-1">${title}</h1>${figure(1,w('밤의 집 문을 연 마녀와 헨젤, 그레텔','The witch opens her door to Hansel and Gretel at night','La bruja abre la puerta a Hansel y Gretel por la noche'))}${listening()}<p class="sound-prompt">${w('마녀의 집에 오신 걸 환영해요.\n오늘 밤, 어떤 소리가 들릴까요?','Welcome to the witch’s house.\nWhat will we hear tonight?','Bienvenidos a casa de la bruja.\n¿Qué oiremos esta noche?')}</p><div class="sound-actions">${button('begin',w('첫 번째 장면으로 →','To the first scene →','A la primera escena →'),true)}</div>`;
   else if(step==='finish')body=`<div class="sound-summary"><h1 tabindex="-1">${w('같은 소리에서 시작된 여러 이야기','One sound, many stories','Un sonido, muchas historias')}</h1><p>${w('그림을 펼치기 전에는 어떤 이야기를 상상했나요?\n같은 소리에서도 여러 이야기가 시작될 수 있어요.','What stories did you imagine before opening the pictures?\nThe same sound can be the beginning of many stories.','¿Qué historias imaginaste antes de descubrir las imágenes?\nUn mismo sonido puede dar comienzo a muchas historias.')}</p><p class="optional-note">${w('지금 답을 정하지 않아도 좋아요. 마음에 남은 장면을 간직해보세요.','You do not have to decide on an answer. Keep a moment from the story with you.','No hace falta decidir una respuesta. Guarda un momento del cuento en tu memoria.')}</p><div class="sound-actions">${button('again',w('처음부터 다시 탐험하기','Explore again','Explorar de nuevo'),true)}${button('to-shelf',w('이야기 책장으로','Back to the story shelf','Volver a la estantería'))}</div></div>`;
   else{
    const r=rounds[round],revealed=step==='discover',phase=['listen','discover'].indexOf(step);
    const heading=step==='listen'?w('어디에서 나는 소리일까요?','Where could the sound be coming from?','¿De dónde vendrá el sonido?'):step==='imagine'?w('어떤 장면이 떠올랐나요?','What scene came to mind?','¿Qué escena te vino a la mente?'):w('그림을 보고, 다시 들어봐요','Look at the picture and listen again','Mira la imagen y vuelve a escuchar');
    const prompt=step==='listen'?w('무엇이 들리나요? 어디에서 나는 것 같나요?','What can you hear? Where do you think it comes from?','¿Qué oyes? ¿De dónde crees que viene?'):step==='imagine'?w('무엇이 떠올랐나요?\n그림에서 무엇을 보고 그렇게 생각했나요?','What came to mind?\nWhat did you notice in the picture that made you think of it?','¿Qué te vino a la mente?\n¿Qué viste en la imagen que te hizo pensarlo?'):w('처음 들었을 때와 지금은 어떻게 다른가요?','Does it sound different now that you have seen the picture?','¿Te suena distinto ahora que has visto la imagen?');
    const next=step==='listen'?w('다음 그림으로 →','Next picture →','Siguiente imagen →'):step==='imagine'?w('다음 그림 펼치기 →','Open the next picture →','Descubrir la siguiente imagen →'):round<3?w('다음 소리 탐험하기 →','Explore the next sound →','Explorar el siguiente sonido →'):w('탐험 마치기 →','Finish exploring →','Terminar la exploración →');
    body=`<p class="progress">${w('장면','Scene','Escena')} ${round+1} / 4 · ${phase+1} / 2</p><h1 tabindex="-1">${heading}</h1>${figure(revealed?r.after:r.before,revealed?r.reveal:r.alt,revealed?r.reveal:w('그림을 천천히 보며 소리를 들어보세요.','Take your time looking at the picture and listening.','Mira la imagen con calma y escucha.'))}${listening()}<p class="sound-prompt">${prompt}</p><p class="optional-note">${revealed?w('이 이야기에서는 이런 장면이 펼쳐졌네요.\n다른 장면을 상상했어도 괜찮아요.','This is what happened in this story.\nIt is fine if you imagined a different scene.','Esto es lo que pasó en este cuento.\nEstá bien si imaginaste otra escena.'):w('함께 있는 사람에게 말하거나, 마음속으로만 생각해도 좋아요.','You can tell someone beside you, or simply imagine it quietly.','Puedes contárselo a quien esté contigo o imaginarlo en silencio.')}</p><div class="sound-actions">${button('previous',w('← 이전으로','← Back','← Atrás'))}${button('next',next,true)}</div>`;
   }
   root.innerHTML=`<section class="story-sound-reader">${back}${body}</section>`;
   const src=`./audio/story-sounds/hansel-${step==='cover'?0:round+1}.wav`;if(step!=='finish'&&!audio.src.endsWith(src.slice(2)))audio.src=src;
   on('play-sound',play);on('begin',()=>go('listen',0));on('shelf-back',()=>go('shelf'));on('to-shelf',()=>go('shelf'));on('again',()=>go('cover'));
   on('previous',()=>step==='listen'?(round===0?go('cover'):go('discover',round-1)):go('listen'));
   on('next',()=>step==='listen'?go('discover'):round<3?go('listen',round+1):go('finish'));update();
  }
  root.querySelector('h1')?.focus({preventScroll:true});window.scrollTo(0,0);
 }
 window.addEventListener('hashchange',render);window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});render();
})();
