/* Shared page gestures for dynamically rendered story readers. */
(()=>{'use strict';
const registered=new WeakMap();let start=null,suppressUntil=0;
const surfaceSelector='.universe-picture,.book,.open-book,.animal-picture,.plant-art,.plant-panel,.plant-scene,.nature-illustration,.story,#story';
const controls='button,a,input,select,textarea,summary,audio,video,[contenteditable="true"],[role="button"]';
window.bindBookSwipe=(surface,previous,next)=>{if(surface){surface.dataset.bookSwipe='true';registered.set(surface,{previous,next});}};
window.bookSwipeHint=()=>{
 let lang=new URLSearchParams(location.search).get('lang');try{lang=lang||localStorage.getItem('heart-language');}catch{}
 const text={ko:'그림이나 글 위에서 손가락을 좌우로 밀어 책장을 넘겨보세요. 버튼으로도 넘길 수 있어요.',en:'Swipe left or right over the picture or story to turn the page. You can also use the buttons.',es:'Desliza el dedo sobre la imagen o el texto para pasar la página. También puedes usar los botones.'};
 return '<p class="swipe-guide"><span aria-hidden="true">↔</span> '+(text[lang]||text.ko)+'</p>';
};
function findSurface(target){
 for(let el=target;el&&el!==document.body;el=el.parentElement)if(registered.has(el))return{surface:el,...registered.get(el)};
 const surface=target.closest(surfaceSelector);if(!surface)return null;
 const root=surface.closest('main,#app,#reader,#plant-app,#nature-app,#friendship-app')||document;
 const previous=root.querySelector('#prev,#prev-page'),next=root.querySelector('#next,#next-page');
 if(!previous||!next)return null;
 const turn=button=>{if(button.id==='next'&&root.id==='plant-app'&&button.textContent.includes('간직하기'))return;if(button.isConnected&&!button.disabled&&button.getAttribute('aria-disabled')!=='true')button.click();};
 return{surface,previous:()=>turn(previous),next:()=>turn(next)};
}
document.addEventListener('pointerdown',event=>{
 if(!event.isPrimary||event.button!==0||!(event.target instanceof Element)||event.target.closest(controls))return;
 const binding=findSurface(event.target);if(!binding)return;
 start={...binding,id:event.pointerId,x:event.clientX,y:event.clientY};
 binding.surface.setPointerCapture?.(event.pointerId);
});
document.addEventListener('pointercancel',()=>{start=null;});
document.addEventListener('pointerup',event=>{
 if(!start||event.pointerId!==start.id)return;
 const gesture=start;start=null;if(!gesture.surface.isConnected)return;
 const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
 const threshold=Math.max(55,Math.min(110,gesture.surface.clientWidth*.13));
 if(Math.abs(dx)<threshold||Math.abs(dx)<Math.abs(dy)*1.5)return;
 if(event.pointerType==='mouse'&&String(window.getSelection()).length)return;
 suppressUntil=Date.now()+400;
 setTimeout(()=>{if(gesture.surface.isConnected)(dx<0?gesture.next:gesture.previous)();},0);
});
document.addEventListener('click',event=>{if(Date.now()<suppressUntil&&event.isTrusted){event.preventDefault();event.stopImmediatePropagation();}},true);
document.addEventListener('dragstart',event=>{if(event.target instanceof Element&&event.target.matches('img')&&event.target.closest(surfaceSelector))event.preventDefault();});
})();
