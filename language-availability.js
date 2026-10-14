/* English and Spanish are retained for future review; Korean is the available edition. */
(()=>{
  window.heartAvailableLanguages=['ko'];
  const url=new URL(location.href),requested=url.searchParams.get('lang');
  const deferred=requested==='en'||requested==='es';
  if(deferred){url.searchParams.set('lang','ko');history.replaceState(null,'',url.href);}
  try{localStorage.setItem('heart-language','ko');}catch{}
  document.documentElement.lang='ko';
  function mark(){
    for(const select of document.querySelectorAll('select')){
      const options=Array.from(select.options);
      if(!options.some(o=>o.value==='ko')||!options.some(o=>o.value==='en'))continue;
      for(const option of options){if(option.value==='en'){if(option.textContent!=='English · 준비 중')option.textContent='English · 준비 중';option.disabled=true;}else if(option.value==='es'){if(option.textContent!=='Español · 준비 중')option.textContent='Español · 준비 중';option.disabled=true;}}
      select.value='ko';
    }
  }
  new MutationObserver(mark).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',()=>{mark();if(deferred){const note=document.createElement('p');note.className='language-preparing-note';note.setAttribute('role','status');note.textContent='영어와 스페인어는 준비 중입니다. 지금은 한국어로 이야기를 만나보세요.';note.style.cssText='max-width:1100px;margin:12px auto;padding:0 24px;color:#68715f;font:14px/1.7 sans-serif;text-align:center';(document.querySelector('header')||document.body).insertAdjacentElement('afterend',note);}});
  document.addEventListener('change',event=>{if(event.target.tagName==='SELECT'&&['en','es'].includes(event.target.value)){event.target.value='ko';event.stopImmediatePropagation();}},true);
})();
