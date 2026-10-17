import {getShareBook} from './sharing-catalog.js';
import {walk,localized} from './engine.js';
import {restoreShare,serializeShare,nextShare,chooseShare,backShare} from './share-model.js';

const t=(ko,en,es)=>({ko,en,es});
const words={
 title:t('마음 건네보기','Sharing my heart','Compartir lo que siento'),
 subtitle:t('같은 순간, 서로 다른 마음','One moment, different feelings','Un mismo momento, distintos sentimientos'),
 intro:t('동화 속 한 사람의 자리에 서서 내 생각과 마음을 살펴보고, 상대의 이야기도 들어보세요.','Step into a character’s place, notice your own thoughts and feelings, and hear the other person too.','Ponte en el lugar de un personaje, observa lo que piensas y sientes y escucha también a la otra persona.'),
 shelf:t('← 책으로 돌아가기','← Back to the book','← Volver al libro'),language:t('언어','Language','Idioma'),
 stages:[t('마음 살피기','Notice','Observar'),t('건네기','Share','Compartir'),t('듣기','Listen','Escuchar'),t('이어가기','Continue','Continuar')],
 artnote:t('이 동화의 그림과 함께해요.','With illustrations from this story.','Con ilustraciones de este cuento.'),
 feelingTitle:t('이 자리에 있다면, 나는 어떤 마음일까요?','How might I feel in this moment?','¿Cómo me sentiría en este momento?'),
 feelingNote:t('여러 마음을 골라도 괜찮아요. 고르지 않고 이야기를 이어가도 좋아요.','You can choose more than one feeling, or continue without choosing.','Puedes elegir más de un sentimiento o continuar sin elegir.'),
 feelings:[t('걱정돼요','I feel worried','Siento preocupación'),t('조심스럽게 말하고 싶어요','I want to speak gently','Quiero hablar con cuidado'),t('상대의 이야기도 궁금해요','I am curious about their side too','También quiero escuchar su historia'),t('아직 잘 모르겠어요','I am not sure yet','Todavía no lo sé'),t('조금 서운해요','I feel hurt','Me ha dolido'),t('화가 나기도 해요','I feel angry too','También siento enfado'),t('혼자 생각할 시간이 필요해요','I need time to think','Necesito tiempo para pensar')],
 clueTitle:t('그림을 조금 더 살펴볼까요?','Shall we look a little closer?','¿Miramos un poco más de cerca?'),
 talkTitle:t('내 마음을 어떻게 건네볼까요?','How could I share my heart?','¿Cómo podría expresar lo que siento?'),
 talkNote:t('해보고 싶은 말이나 행동을 골라보세요. 다른 표현도 나중에 만나볼 수 있어요.','Choose words or an action you would like to try. You can explore another expression later.','Elige una frase o un gesto que quieras probar. Después puedes explorar otra forma de expresarte.'),
 listenTitle:t('상대의 마음도 들어봐요','Let’s listen to the other person too','Escuchemos también a la otra persona'),
 said:t('내가 건넨 말과 행동','What I said or did','Lo que dije o hice'),
 after:t('그다음, 이야기 속에서는…','Then, in the story…','Después, en el cuento…'),
 openHeart:t('마음속 이야기 들어보기','Hear their side of the story','Escuchar su historia'),
 listenNote:t('그림만 보고는 몰랐던 이야기를 동화 속 인물이 들려줘요.','The character shares something the picture alone could not tell us.','El personaje cuenta algo que el dibujo por sí solo no podía decirnos.'),
 replyTitle:t('이야기를 듣고 나니, 어떤 말을 건네고 싶나요?','After listening, what would I like to say or do?','Después de escuchar, ¿qué me gustaría decir o hacer?'),
 replyNote:t('처음에 고른 마음을 바꾸지 않아도 괜찮아요. 지금 해보고 싶은 표현을 골라보세요.','You do not have to change the feeling you chose earlier. Try an expression that fits this moment.','No tienes que cambiar el sentimiento que elegiste antes. Prueba una forma de expresarte que encaje con este momento.'),
 continue:t('대화 이어가기 →','Continue the conversation →','Continuar la conversación →'),
 begin:t('마음 건네보기 →','Try sharing my heart →','Intentar compartir lo que siento →'),
 back:t('← 앞 장면','← Back','← Volver'),
 endTitle:t('우리의 말로 이어진 이야기','A story continued by our words','Una historia que sigue con nuestras palabras'),
 myHeart:t('내가 살펴본 마음','The feelings I noticed','Los sentimientos que observé'),
 noFeeling:t('마음을 말로 고르지 않고 이야기를 따라왔어요.','I followed the story without putting a name to my feelings.','Seguí el cuento sin poner nombre a lo que sentía.'),
 otherHeart:t('상대에게서 들은 이야기','What I heard from the other person','Lo que escuché de la otra persona'),
 retry:t('다른 말도 건네보기','Try another expression','Probar otra forma de expresarme'),
 otherRole:t('다른 사람의 자리에서','From another person’s place','Desde el lugar de otra persona'),
 original:t('원래 동화 읽기','Read the original story','Leer el cuento original'),
 endNote:t('이야기를 듣고 내게 남은 마음은 무엇인가요? 지금 답을 정하지 않고, 다음에 다시 생각해도 좋아요.','What feelings stay with me after this conversation? I can leave the question open and return to it another time.','¿Qué siento después de esta conversación? Puedo dejar la pregunta abierta y volver a pensarla en otro momento.'),
 fine:t('원래 동화와 함께 마음을 나누는 활동입니다. 그림은 원래 동화의 장면을 사용하며, 새로 고른 말의 모든 행동을 그대로 그린 것은 아니에요. 지금 마음을 바꾸거나 결론을 내리지 않아도 괜찮아요.','An activity for sharing feelings alongside the original story. The pictures are scenes from the story, not exact depictions of every new action. You do not have to change your feelings or reach a conclusion now.','Una actividad para compartir lo que sentimos a partir del cuento original. Las imágenes son del cuento y no representan exactamente cada gesto nuevo. No tienes que cambiar lo que sientes ni llegar ahora a una conclusión.'),
 pending:t('준비 중','Coming soon','Próximamente')
};
const app=document.querySelector('#app'),select=document.querySelector('#language');
let state=restoreShare(location.search);
let book=getShareBook(state.book);
const text=v=>localized(v,state.lang)??localized(words.pending,state.lang);
const el=(tag,content,cls)=>{const e=document.createElement(tag);if(content!==undefined)e.textContent=content;if(cls)e.className=cls;return e;};
function button(content,fn,cls='secondary'){const e=el('button',content,cls);e.type='button';e.onclick=fn;return e;}
function save(next,focus=true,replace=false){state=next;book=getShareBook(state.book);history[replace?'replaceState':'pushState'](null,'',serializeShare(state));render(focus);}
function restart(role=state.role){save({...state,role,choices:[],scene:'start',stage:'feel',feelings:[],revealed:false,clue:false,issues:[]});}
function artBox(){
 const indices={feel:2,talk:2,listen:3,reply:4,end:state.choices[1]==='c'?2:4};
 const a=book.roles.find(r=>r.id===state.role).art[indices[state.stage]],c=a.crop,frame=el('div',undefined,'illustration');
 frame.setAttribute('role','img');frame.setAttribute('aria-label',text(words.subtitle));
 frame.style.aspectRatio=String(a.aspect);frame.style.backgroundImage=`url("${a.atlas}")`;frame.style.backgroundSize=`${10000/c.w}% ${10000/c.h}%`;frame.style.backgroundPosition=`${c.x/(100-c.w)*100}% ${c.y/(100-c.h)*100}%`;
 return frame;
}
function render(focus=false){
 const {role,node,trail}=walk(book,state.role,state.choices),heart=role.heart,s=state.stage;
 document.documentElement.lang=state.lang;document.title=text(book.title)+' · '+text(words.title);select.value=state.lang;
 document.querySelector('#language-label').textContent=text(words.language);const shelf=document.querySelector('#shelf');shelf.textContent=text(words.shelf);shelf.href='../index.html?book='+book.id+'&lang='+state.lang+'&v=published129';
 app.replaceChildren();app.append(el('p',text(book.title),'kicker'),el('h1',text(words.title)),el('p',text(words.intro),'intro'));
 const roles=el('nav',undefined,'roles');roles.setAttribute('aria-label',text(words.otherRole));book.roles.forEach(r=>{const b=button(text(r.name),()=>restart(r.id),'role');b.dataset.role=r.id;b.setAttribute('aria-pressed',String(r.id===role.id));roles.append(b);});app.append(roles);
 const stages=el('ol',undefined,'stages');const current=['feel','talk','listen','reply','end'].indexOf(s);words.stages.forEach((v,i)=>{const li=el('li',text(v));if(i===Math.min(current,3))li.setAttribute('aria-current','step');stages.append(li);});app.append(stages);
 const bookFrame=el('section',undefined,'book');bookFrame.append(artBox(),el('p',text(words.artnote),'art-note'));
 const story=el('div',undefined,'story');const title=el('h2',text(s==='feel'?words.feelingTitle:s==='talk'?words.talkTitle:s==='listen'?words.listenTitle:s==='reply'?words.replyTitle:words.endTitle));title.tabIndex=-1;title.id='activity-title';story.append(el('p',text(role.name),'speaker'),title);
 if(s==='feel'||s==='talk')story.append(el('p',text(role.nodes.start.text),'text'));
 if(s==='listen'){story.append(el('p',text(words.said),'speaker'),el('blockquote',text(trail[0].edge.label),'quote'));}
 if(s==='reply'){story.append(el('p',text(heart.name),'speaker'),el('blockquote',text(heart.text),'quote'));}
 if(s==='end')story.append(el('p',text(node.text),'text'));
 bookFrame.append(story);app.append(bookFrame);
 const activity=el('section',undefined,'activity');activity.dataset.stage=s;
 if(s==='feel'){
  activity.append(el('p',text(t('나는 이 모습을 어떤 뜻으로 받아들였을까요? 적거나 말하지 않고 잠깐 생각만 해도 좋아요.','What meaning did I give this moment? You can simply think without writing or speaking.','¿Cómo interpreté este momento? Puedes pensarlo sin escribir ni decir nada.')),'note'),el('p',text(words.feelingNote),'note'));const choices=el('div',undefined,'feelings');[4,5,0,6,1,2,3].forEach(i=>{const v=words.feelings[i];const b=button(text(v),()=>{const feelings=state.feelings.includes(i)?state.feelings.filter(n=>n!==i):[...state.feelings,i];save({...state,feelings},false);},'feeling');b.dataset.feel=i;b.setAttribute('aria-pressed',String(state.feelings.includes(i)));choices.append(b);});activity.append(choices);
  const clue=el('details',undefined,'clue');clue.open=state.clue;clue.append(el('summary',text(words.clueTitle)),el('p',text(role.nodes.start.clue.text)));clue.ontoggle=()=>{if(state.stage==='feel'&&state.clue!==clue.open){state={...state,clue:clue.open};history.replaceState(null,'',serializeShare(state));}};activity.append(clue);
 }
 if(s==='talk'||s==='reply'){
  activity.append(el('p',text(s==='talk'?words.talkNote:words.replyNote),'note'));
  const choices=el('div',undefined,'choices');node.choices.forEach(edge=>{const b=button(undefined,()=>save(chooseShare(state,edge.id)),'choice');b.dataset.choice=edge.id;b.disabled=localized(edge.label,state.lang)===null;b.append(el('span',text(edge.label)),el('span','→'));choices.append(b);});activity.append(choices);
 }
 if(s==='listen'){
  activity.append(el('p',text(words.after),'speaker'),el('p',text(trail[0].edge.reaction),'quote'),el('p',text(words.listenNote),'note'));
  if(!state.revealed){const b=button(text(heart.name)+' · '+text(words.openHeart),()=>{save({...state,revealed:true},false);const voice=document.querySelector('#heart-voice');voice.tabIndex=-1;voice.focus({preventScroll:true});voice.scrollIntoView({block:'center'});},'primary');b.id='open-heart';activity.append(b);}
  else {const voice=el('div',undefined,'voice');voice.id='heart-voice';voice.setAttribute('role','status');voice.append(el('p',text(heart.name),'speaker'),el('blockquote',text(heart.text),'quote'));activity.append(voice);}
 }
 if(s==='end'){
  const summary=el('div',undefined,'summary');const add=(label,value)=>{const sec=el('section');sec.append(el('h3',label),el('p',value));summary.append(sec);};
  add(text(words.myHeart),state.feelings.length?state.feelings.map(i=>text(words.feelings[i])).join(' · '):text(words.noFeeling));add(text(words.said),trail.map(v=>text(v.edge.label)).join('\n'));add(text(words.otherHeart),text(heart.text));activity.append(summary,el('p',text(words.endNote),'note'));
 }
 const nav=el('nav',undefined,'nav-actions');if(s!=='feel')nav.append(button(text(words.back),()=>save(backShare(state)),'soft-back'));
 if(s==='feel')nav.append(button(text(words.begin),()=>save(nextShare(state)),'primary'));
 if(s==='listen'&&state.revealed)nav.append(button(text(words.continue),()=>save(nextShare(state)),'primary'));
 if(s==='end'){nav.append(button(text(words.retry),()=>save({...backShare(backShare(backShare(state))),stage:'talk',revealed:false,clue:false}),'primary'));const back=el('a',text(words.shelf),'secondary');back.href='../index.html?book=errand&lang='+state.lang;nav.append(back);}
 activity.append(nav);app.append(activity);
 const footer=el('div',undefined,'footer');const allDrafts=el('a',text(t('다른 책 활동 살펴보기','Explore the other book activities','Explorar las actividades de otros libros')));allDrafts.href='./review.html?lang='+state.lang+'&v=published129';footer.append(allDrafts);const original=el('a',text(words.original));original.href=book.original+'&lang='+state.lang;footer.append(original);if(s==='end')footer.append(button(text(words.otherRole),()=>restart(book.roles[(book.roles.findIndex(r=>r.id===state.role)+1)%book.roles.length].id)));app.append(footer,el('p',text(words.fine),'fine'));
 if(focus){title.focus({preventScroll:true});bookFrame.scrollIntoView({block:'start'});}
}
select.onchange=()=>save({...state,lang:select.value},false);
addEventListener('popstate',()=>{state=restoreShare(location.search);book=getShareBook(state.book);render();});
save(state,false,true);
