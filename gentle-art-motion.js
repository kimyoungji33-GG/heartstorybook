(() => {
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = () => {
    const language = window.heartLanguage?.() || 'ko';
    return language === 'en' ? ['Pause the gentle movement','Let the picture move gently'] : language === 'es' ? ['Pausar el movimiento suave','Dejar que el dibujo se mueva suavemente'] : ['움직임 잠시 쉬기','그림 움직임 켜기'];
  };
  function mount() {
    const art = document.querySelector('.sound-illustration');
    if (!art || art.classList.contains('gently-listening')) return;
    art.classList.add('gently-listening');
    art.insertAdjacentHTML('beforeend','<span class="sound-tree-drift" aria-hidden="true"></span><span class="sound-soft-light" aria-hidden="true"></span>');
    const button = document.createElement('button');
    button.className = 'sound-motion-control';
    const update = () => {
      art.classList.toggle('motion-paused',paused);
      button.textContent = labels()[paused ? 1 : 0];
      button.setAttribute('aria-pressed',String(!paused));
    };
    button.onclick = () => { paused = !paused; update(); };
    art.insertAdjacentElement('afterend',button);update();
  }
  new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});mount();
})();
