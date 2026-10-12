(()=>{
  let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels=()=>{const l=window.heartLanguage?.()||'ko';return l==='en'?['Pause the gentle movement','Let the picture move gently']:l==='es'?['Pausar el movimiento suave','Dejar que el dibujo se mueva suavemente']:['움직임 잠시 쉬기','그림 움직임 켜기'];};
  function mount(){const art=document.querySelector('.entry:not(.same-day-entry) .gate-art');if(!art||art.classList.contains('living-entrance'))return;
    art.classList.add('living-entrance');art.insertAdjacentHTML('beforeend','<span class="entrance-sunlight" aria-hidden="true"></span><span class="entrance-dust" aria-hidden="true"></span>');
    const toggle=document.createElement('button');toggle.className='entrance-motion-control text-button';
    const update=()=>{art.classList.toggle('motion-paused',paused);toggle.textContent=labels()[paused?1:0];toggle.setAttribute('aria-pressed',String(!paused));};
    toggle.onclick=()=>{paused=!paused;update();};art.insertAdjacentElement('afterend',toggle);update();
    art.onpointermove=e=>{if(paused||e.pointerType==='touch')return;const r=art.getBoundingClientRect();art.style.setProperty('--wander-x',((e.clientX-r.left)/r.width-.5)*4+'px');art.style.setProperty('--wander-y',((e.clientY-r.top)/r.height-.5)*3+'px');};
    art.onpointerleave=()=>{art.style.setProperty('--wander-x','0px');art.style.setProperty('--wander-y','0px');};
  }
  new MutationObserver(mount).observe(document.getElementById('app'),{childList:true,subtree:true});mount();
})();
