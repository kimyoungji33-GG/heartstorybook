(()=>{'use strict';function setup(){for(const label of document.querySelectorAll('.language,.reader-language-choice')){
 const select=label.querySelector('select');if(!select||label.dataset.flagsReady)continue;label.dataset.flagsReady='true';label.classList.add('language-enhanced');
 const current=document.documentElement.lang==='en'?'en':'ko',button=document.createElement('button');button.type='button';button.className='language-current';button.setAttribute('aria-label',current==='en'?'Choose language: English':'언어 선택: 한국어');button.setAttribute('aria-expanded','false');button.innerHTML=`<img src="./flag-${current==='en'?'us':'ko'}.svg" alt="" aria-hidden="true"><span>`+(current==='en'?'English':'한국어')+'</span><span class="language-chevron" aria-hidden="true">⌄</span>';
 const menu=document.createElement('div');menu.className='language-options';menu.hidden=true;menu.setAttribute('role','group');menu.setAttribute('aria-label',current==='en'?'Choose language':'언어 선택');
 const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');};
 for(const[lang,name,flag]of [['ko','한국어','./flag-ko.svg'],['en','English','./flag-us.svg'],['es','Español','./flag-es.svg']]){
  const option=document.createElement('button');option.type='button';option.className='language-option';option.innerHTML=`<img src="${flag}" alt="" aria-hidden="true"><span>`+name+(lang==='es'?' <small>'+(current==='en'?'Coming soon':'준비 중')+'</small>':'')+'</span>';option.disabled=lang==='es';option.setAttribute('aria-current',String(lang===current));
  if(lang!=='es')option.onclick=()=>{close();if(lang===current){button.focus();return;}try{localStorage.setItem('heart-language',lang);}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);location.assign(url.href);};menu.append(option);
 }
 label.append(button,menu);button.onclick=e=>{e.preventDefault();menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden));};document.addEventListener('click',e=>{if(!label.contains(e.target))close();});label.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();}});
}}
new MutationObserver(setup).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();})();
