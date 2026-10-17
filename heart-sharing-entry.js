// Local review: ten books offer story-specific activities. Publication remains on hold.
(()=>{
 const copy={
  ko:{title:'마음 건네보기',note:'이야기 속 인물이 되어 내 마음을 전해봐요.',invite:'이번에는 내 마음을 건네볼까요?',description:'그림을 보며 내 마음을 살피고, 상대의 이야기를 들은 뒤 다시 말을 건네봐요.'},
  en:{title:'Sharing my heart',note:'Step into the story and try sharing how you feel.',invite:'Shall we try sharing our feelings?',description:'Notice your feelings, listen to the other person, then try reaching out again.'},
  es:{title:'Compartir lo que siento',note:'Ponte en el lugar de un personaje y expresa lo que sientes.',invite:'¿Intentamos expresar lo que sentimos?',description:'Observa lo que sientes, escucha a la otra persona y vuelve a acercarte.'}
 };
 const language=()=>window.heartLanguage?.()||'ko';
 const supported=new Set(['errand','cups','plate','door','ball','stars','sleeve','station','flowers','notes']);
 const activityUrl=(id,role)=>'./pilot/play.html?'+new URLSearchParams({book:id,role,lang:language()});
 function intro(){
  if(typeof state==='undefined'||state.screen!=='book'||!supported.has(state.book?.id))return;
  const paths=document.querySelector('.book-paths');if(!paths||paths.querySelector('#choose-heart-sharing'))return;
  const w=copy[language()]||copy.ko,b=document.createElement('button');b.id='choose-heart-sharing';b.className='heart-sharing-path';
  for(const [tag,text] of [['strong',w.title],['span',w.note],['em','→']]){const e=document.createElement(tag);e.textContent=text;b.append(e);}
  b.onclick=()=>{location.href=activityUrl(state.book.id,state.book.id==='errand'?'jiwoo':'main');};paths.classList.add('with-heart-sharing');paths.append(b);
 }
 function lastPage(){
  if(typeof book==='undefined'||!supported.has(book.id)||typeof page==='undefined'||page!==5)return;
  const root=document.querySelector('#reader'),ending=root?.querySelector('.quiet-ending');if(!ending||root.querySelector('#heart-sharing-invitation'))return;
  const w=copy[language()]||copy.ko,section=document.createElement('section');section.className='heart-sharing-invitation';section.id='heart-sharing-invitation';
  const heading=document.createElement('h2');heading.textContent=w.invite;const note=document.createElement('p');note.textContent=w.description;
  const selected=book.id==='errand'?(mode==='activity'?(role===1?'baker':'junho'):'jiwoo'):(mode==='activity'?'role-'+role:'main');
  const link=document.createElement('a');link.className='heart-sharing-start';link.textContent=w.title+' →';link.href=activityUrl(book.id,selected);section.append(heading,note,link);ending.before(section);
 }
 if(document.querySelector('#app')&&typeof bookPage==='function'){const original=bookPage;bookPage=function(){original();intro();};intro();}
 if(document.querySelector('#reader')&&typeof render==='function'){const original=render;render=function(){original();lastPage();};lastPage();}
})();
