'use strict';

// 벽난로 앞 불멍 (Claude, 2026-11-21)
// - 벽난로 앞(담요 바구니가 있던 자리)에 방석 세 개를 놓아요. 창가 둥근 방석과 같은 색.
// - 방석을 누르면 아바타가 걸어가 앉아 벽난로 불을 바라봐요(images/firewatch/firewatch-{아바타}[-right].webp).
// - 앉아 있는 동안은 타닥타닥 불 소리만(말 없음). 방석을 다시 누르거나 다른 곳을 누르면 일어나요.
// - 그림이 없으면 방석도 나타나지 않아요.
(() => {
  const stage = document.getElementById('stage');
  if (!stage) return;
  const t = text => window.homeText ? window.homeText.t(text) : text;
  const layout = window.roomFloorCushions;
  if (!layout) return;
  const CUSHION = layout.image;
  const pct = (v, total) => (v / total * 100) + '%';
  const SPOTS = layout.spots;

  const css = document.createElement('style');
  css.textContent = `
    .firewatch-cushion { position: absolute; padding: 0; border: 0; background: none; cursor: pointer; }
    .firewatch-cushion img { display: block; width: 100%; height: auto; pointer-events: none; }
    .firewatch-cushion.is-flipped img { transform: scaleX(-1); }
    .firewatch-cushion:hover img, .firewatch-cushion:focus-visible img { filter: brightness(1.06); }
    .firewatch-cushion:focus-visible { outline: 2px solid #795222; outline-offset: 2px; border-radius: 6px; }
    .firewatch-cushion.is-taken img { opacity: 0; }
    .firewatch-sitter { position: absolute; pointer-events: none; transform: translateY(-100%); opacity: 0; transition: opacity .45s ease; }
    .firewatch-sitter.is-shown { opacity: 1; }
    .firewatch-sitter img { display: block; width: 100%; height: auto; }
    body.is-firewatching #avatar { visibility: hidden; }
  `;
  document.head.append(css);
  layout.installStyles();

  const cushions = [];
  const probe = new Image();
  probe.onload = () => SPOTS.forEach(build);
  probe.src = CUSHION;

  function build(spot, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'firewatch-cushion' + (spot.flip ? ' is-flipped' : '');
    button.dataset.homeAria = '벽난로 앞 방석';
    button.setAttribute('aria-label', t('벽난로 앞 방석'));
    layout.place(button, spot, index);
    const image = document.createElement('img');
    image.src = CUSHION;
    image.alt = '';
    image.draggable = false;
    button.append(image);
    button.addEventListener('click', event => {
      event.stopPropagation();
      if (sitting && sitting.index === index) stand();
      else sitDown(spot, index);
    });
    stage.append(button);
    cushions[index] = button;
  }

  let sitting = null, walking = false, crackleTimer = 0;
  function sitDown(spot, index) {
    const avatar = window.roomAvatar;
    if (!avatar || walking) return;
    if (sitting) stand();
    const id = avatar.visitorId?.() || 'woman';
    const art = 'images/firewatch/firewatch-' + id + (spot.look === 'right' ? '-right' : '') + '.webp';
    const box = layout.geometry(spot);
    const centerX = box.centerX / 1920 * 100;
    const bottomY = box.floorY / 1080 * 100;
    const target = { x: centerX, y: bottomY, offsetX: spot.look === 'left' ? 3 : -3, offsetY: 2 };
    walking = true;
    layout.allow(index);
    const started = avatar.approach(target, () => {
      walking = false;
      layout.allow();
      const pic = new Image();
      pic.onload = () => show(spot, index, art);
      pic.onerror = () => {};
      pic.src = art;
    }, () => { walking = false; layout.allow(); });
    if (!started) { walking = false; layout.allow(); }
  }

  function show(spot, index, art) {
    const sitter = document.createElement('div');
    sitter.className = 'firewatch-sitter';
    const box = layout.geometry(spot);
    sitter.style.left = pct(box.left, 1920);
    sitter.style.top = pct(box.floorY + 2, 1080);
    sitter.style.width = pct(box.width, 1920);
    sitter.style.zIndex = String(box.zIndex + 1);
    const image = document.createElement('img');
    image.src = art;
    image.alt = '';
    sitter.append(image);
    stage.append(sitter);
    document.body.classList.add('is-firewatching');
    cushions[index]?.classList.add('is-taken');
    requestAnimationFrame(() => sitter.classList.add('is-shown'));
    sitting = { index, sitter };
    window.roomYuzuTea?.startCollecting?.();
    const crackle = () => { window.roomFire?.crackle?.(8, .45); crackleTimer = setTimeout(crackle, 7600); };
    crackle();
  }

  function stand() {
    if (!sitting) return;
    clearTimeout(crackleTimer);
    window.roomFire?.quiet?.();
    const { index, sitter } = sitting;
    sitting = null;
    window.roomYuzuTea?.stopCollecting?.();
    document.body.classList.remove('is-firewatching');
    cushions[index]?.classList.remove('is-taken');
    sitter.remove();
  }

  // 다른 곳을 누르면 일어나서 그쪽으로 가요.
  stage.addEventListener('click', event => {
    // 음소거 버튼은 소리만 끄고, 앉아 있는 아바타는 그대로 둬요.
    if (sitting && !event.target.closest('.firewatch-cushion, #room-sound')) stand();
  }, true);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') stand(); });
  document.addEventListener('hometextchange', () => {
    cushions.forEach(button => button?.setAttribute('aria-label', t('벽난로 앞 방석')));
  });
  window.roomFirewatch = { stand, get sitting() { return Boolean(sitting); } };
})();
