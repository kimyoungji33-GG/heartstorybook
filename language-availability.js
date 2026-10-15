/* Korean and English editions are available; Spanish remains in preparation. */
(()=>{'use strict';
window.heartAvailableLanguages=['ko','en'];
const url=new URL(location.href),requested=url.searchParams.get('lang');let saved='ko';
try{saved=localStorage.getItem('heart-language')||'ko';}catch{}
const language=['ko','en'].includes(requested)?requested:requested==='es'?'ko':['ko','en'].includes(saved)?saved:'ko';
if(requested&&!['ko','en'].includes(requested)){url.searchParams.set('lang',language);history.replaceState(null,'',url.href);}
try{localStorage.setItem('heart-language',language);}catch{}
document.documentElement.lang=language;
function mark(){for(const select of document.querySelectorAll('select')){
 const options=Array.from(select.options);if(!options.some(o=>o.value==='ko')||!options.some(o=>o.value==='en'))continue;
 const labels={ko:'🇰🇷 한국어',en:'🇺🇸 English',es:language==='en'?'🇪🇸 Español · Coming soon':'🇪🇸 Español · 준비 중'};
 for(const option of options){if(labels[option.value]&&option.textContent!==labels[option.value])option.textContent=labels[option.value];if(['ko','en','es'].includes(option.value))option.disabled=option.value==='es';}
 if(select.value!==language)select.value=language;
}}
new MutationObserver(mark).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',mark);
document.addEventListener('change',event=>{if(event.target.tagName==='SELECT'&&Array.from(event.target.options).some(o=>o.value==='ko')&&['ko','en'].includes(event.target.value)&&event.target.value!==language){const target=new URL(location.href);target.searchParams.set('lang',event.target.value);event.stopImmediatePropagation();location.assign(target.href);return;}if(event.target.tagName==='SELECT'&&event.target.value==='es'){event.target.value=language;event.stopImmediatePropagation();}},true);
})();
