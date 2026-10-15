(()=>{'use strict';function setup(){for(const label of document.querySelectorAll('.language,.reader-language-choice')){
 const select=label.querySelector('select');if(!select||label.dataset.flagsReady)continue;label.dataset.flagsReady='true';label.classList.add('language-enhanced');
 const current=['ko','en','es'].includes(document.documentElement.lang)?document.documentElement.lang:'ko',button=document.createElement('button');button.type='button';button.className='language-current';button.setAttribute('aria-label',({ko:'언어 선택: 한국어',en:'Choose language: English',es:'Elegir idioma: Español'})[current]);button.setAttribute('aria-expanded','false');button.innerHTML=`<img src="./flag-${({ko:'ko',en:'us',es:'es'})[current]}.svg" alt="" aria-hidden="true"><span>`+({ko:'한국어',en:'English',es:'Español'})[current]+'</span><span class="language-chevron" aria-hidden="true">⌄</span>';
 const menu=document.createElement('div');menu.className='language-options';menu.hidden=true;menu.setAttribute('role','group');menu.setAttribute('aria-label',({ko:'언어 선택',en:'Choose language',es:'Elegir idioma'})[current]);
 const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');};
 for(const[lang,name,flag]of [['ko','한국어','./flag-ko.svg'],['en','English','./flag-us.svg'],['es','Español','./flag-es.svg']]){
  const option=document.createElement('button');option.type='button';option.className='language-option';option.innerHTML=`<img src="${flag}" alt="" aria-hidden="true"><span>`+name+'</span>';option.disabled=false;option.setAttribute('aria-current',String(lang===current));
  option.onclick=()=>{close();if(lang===current){button.focus();return;}try{localStorage.setItem('heart-language',lang);}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);location.assign(url.href);};menu.append(option);
 }
 label.append(button,menu);button.onclick=e=>{e.preventDefault();menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden));};document.addEventListener('click',e=>{if(!label.contains(e.target))close();});label.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();}});
}}
new MutationObserver(setup).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();})();
