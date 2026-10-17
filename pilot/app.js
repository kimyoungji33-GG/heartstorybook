import {book} from './data.js';
import {restore,serialize,walk,choose,localized} from './engine.js';
const ui={
 ko:{shelf:'책방 입구',language:'언어',notice:'공개 전 검토용 · 원문을 바꾸지 않은 가상 선택 이야기입니다. 그림·녹음은 연결하지 않았어요. 정답이나 점수는 없어요.',pending:'준비 중 — 이 부분의 번역을 준비하고 있어요.',role:'누구의 자리에서 읽어 볼까요?',step:'번째 선택',end:'이 경로의 마지막 장면',clue:'🔑 마음열쇠 · 몸짓 살펴보기',history:'지나온 선택과 반응',back:'한 선택 되돌리기',reset:'이 역할 처음부터',original:'원작 읽기',warn:'주소의 상태가 맞지 않아 유효한 시작 장면으로 정리했어요.',empty:'아직 선택하지 않았어요.',first:'첫 번째 선택',second:'두 번째 선택'},
 en:{shelf:'Bookshop entrance',language:'Language',notice:'Review draft · These imagined choices do not replace the original story. No illustrations or recordings are attached. There are no scores or right answers.',pending:'Coming soon — this translation is being prepared.',role:'Whose point of view would you like to try?',end:'The last scene on this path',clue:'🔑 Heart key · Look at the gestures',history:'Your choices and the responses',back:'Undo one choice',reset:'Restart this point of view',original:'Read the original',warn:'The address contained an invalid state. A valid starting scene has been restored.',empty:'No choices yet.',first:'First choice',second:'Second choice'},
 es:{shelf:'Entrada de la librería',language:'Idioma',notice:'Borrador para revisión · Estas decisiones imaginadas no sustituyen al cuento original. No se han añadido ilustraciones ni grabaciones. No hay puntuaciones ni respuestas correctas.',pending:'Próximamente — estamos preparando esta traducción.',role:'¿Qué punto de vista quieres explorar?',end:'La última escena de este camino',clue:'🔑 Llave del corazón · Observa los gestos',history:'Tus decisiones y las reacciones',back:'Deshacer una decisión',reset:'Empezar de nuevo con este personaje',original:'Leer el cuento original',warn:'La dirección contenía un estado no válido. Se ha restaurado una escena inicial válida.',empty:'Aún no has elegido.',first:'Primera elección',second:'Segunda elección'}
};
let state=restore(book,location.search);
const app=document.querySelector('#app'),select=document.querySelector('#language');
const el=(tag,text,className)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e;};
function translated(tag,value){const text=localized(value,state.lang);return el(tag,text??ui[state.lang].pending,text===null?'pending':undefined);}
function save(next){state=next;history.pushState(null,'',serialize(book,state));render(true);}
function render(focus=false){
 const u=ui[state.lang],{role,node,trail}=walk(book,state.role,state.choices);
 document.documentElement.lang=state.lang;select.value=state.lang;
 document.querySelector('#shelf').textContent=u.shelf;document.querySelector('#shelf').href=`../index.html?lang=${state.lang}`;
 document.querySelector('#language-label').textContent=u.language;
 document.title=localized(book.title,state.lang)??u.pending;app.replaceChildren();
 app.append(el('p',u.notice,'notice'),translated('h1',book.title));
 if(state.issues.length)app.append(el('p',u.warn,'notice'));
 app.append(el('h2',u.role));const roles=el('nav',undefined,'roles');roles.setAttribute('aria-label',u.role);
 for(const r of book.roles){const b=translated('button',r.name);b.setAttribute('aria-pressed',String(r.id===state.role));b.onclick=()=>save({...state,role:r.id,choices:[],scene:'start',issues:[]});roles.append(b);}app.append(roles);
 const card=el('article',undefined,'card');card.dataset.scene=node.id;card.dataset.role=role.id;
 const heading=el('h2',node.type==='ending'?u.end:(trail.length?u.second:u.first));heading.id='scene-title';heading.tabIndex=-1;card.append(heading,translated('p',node.text));
 if(node.type==='decision'){
   const details=el('details',undefined,'clue');details.open=true;details.append(el('summary',u.clue),translated('p',node.clue.text));card.append(details);
   if(node.prompt&&localized(node.prompt,state.lang)!==heading.textContent)card.append(translated('h3',node.prompt));
   const choices=el('div',undefined,'choices');for(const edge of node.choices){const b=translated('button',edge.label);b.dataset.choice=edge.id;b.disabled=localized(edge.label,state.lang)===null;b.onclick=()=>save(choose(book,state,edge.id));choices.append(b);}card.append(choices);
 }
 app.append(card);
 const historySection=el('section');historySection.append(el('h2',u.history));
 if(!trail.length)historySection.append(el('p',u.empty));else {const list=el('ol');for(const {edge}of trail){const item=el('li');item.append(translated('strong',edge.label),translated('p',edge.reaction));list.append(item);}historySection.append(list);}app.append(historySection);
 const actions=el('div',undefined,'actions');if(trail.length){const b=el('button',u.back);b.onclick=()=>{const choices=state.choices.slice(0,-1);save({...state,choices,scene:walk(book,state.role,choices).node.id,issues:[]});};actions.append(b);}
 const reset=el('button',u.reset);reset.onclick=()=>save({...state,choices:[],scene:'start',issues:[]});actions.append(reset);app.append(actions);
 const original=el('a',u.original);original.href=`${book.original}&lang=${state.lang}`;app.append(original);
 if(focus)heading.focus({preventScroll:true});
}
select.onchange=()=>save({...state,lang:select.value});
window.addEventListener('popstate',()=>{state=restore(book,location.search);render(true);});
history.replaceState(null,'',serialize(book,state));render();
