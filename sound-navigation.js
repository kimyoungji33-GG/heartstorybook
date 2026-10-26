/* Two sound collections remain distinct in the shared menu, as on the entrance. */
(()=>{
 function add(){const lang=window.heartLanguage?.()||'ko';document.querySelectorAll('.menu-before-reading').forEach(section=>{const parent=section.querySelector('a[href*="perspective-games.html"]');if(!parent)return;let sub=section.querySelector('[data-sound-collections]');if(!sub){sub=document.createElement('div');sub.dataset.soundCollections='';sub.className='sound-menu-collections';parent.after(sub);}if(sub.dataset.lang===lang)return;sub.dataset.lang=lang;const t=x=>window.storySoundTranslate(x,lang);sub.innerHTML=`<a href="./perspective-games.html?lang=${lang}#landscapes">${t('소리로 떠올리는 풍경')}</a><a href="./story-sounds.html?lang=${lang}">${t('이야기 속 소리 탐험')}</a>`;});}
 add();new MutationObserver(add).observe(document.body,{childList:true,subtree:true});
})();
