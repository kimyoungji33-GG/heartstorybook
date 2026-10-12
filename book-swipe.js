/* Touch, pen and mouse page gestures; vertical scrolling and clue taps remain available. */
window.bindBookSwipe = function (surface, previous, next) {
  if (!surface) return;
  surface.style.touchAction = 'pan-y pinch-zoom';
  surface.querySelectorAll('img').forEach(image => { image.draggable = false; });
  let start = null, suppressUntil = 0;
  surface.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('button,a,input,select,textarea,summary')) return;
    start = { id: event.pointerId, x: event.clientX, y: event.clientY };
    if (surface.setPointerCapture) surface.setPointerCapture(event.pointerId);
  });
  surface.addEventListener('pointercancel', () => { start = null; });
  surface.addEventListener('lostpointercapture', () => { start = null; });
  window.addEventListener('pointerup', finish, { signal: cleanupSignal(surface) });
  function finish(event) {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    start = null;
    const threshold = Math.max(60, Math.min(110, surface.clientWidth * .13));
    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (event.pointerType === 'mouse' && String(window.getSelection()).length) return;
    suppressUntil = Date.now() + 400;
    (dx < 0 ? next : previous)();
  }
  surface.addEventListener('click', event => {
    if (Date.now() < suppressUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  function cleanupSignal(element) {
    const controller = new AbortController();
    const observer = new MutationObserver(() => {
      if (!element.isConnected) { controller.abort(); observer.disconnect(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return controller.signal;
  }
};
window.bookSwipeHint = function () {
  let savedLanguage = 'ko';
  try { savedLanguage = localStorage.getItem('heart-language') || 'ko'; } catch {}
  const language = new URLSearchParams(location.search).get('lang') || savedLanguage;
  const text = {
    ko: '그림이나 글 위에서 손가락을 좌우로 밀어 책장을 넘겨보세요. 버튼으로도 넘길 수 있어요.',
    en: 'Swipe left or right over the picture or story to turn the page. You can also use the buttons.',
    es: 'Desliza el dedo a izquierda o derecha sobre la imagen o el texto para pasar la página. También puedes usar los botones.'
  };
  return '<p class="swipe-guide"><span aria-hidden="true">↔</span> ' + (text[language] || text.ko) + '</p>';
};
