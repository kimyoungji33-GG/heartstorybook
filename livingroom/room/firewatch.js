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
  const CUSHION = 'images/cushions/floor-cushion.webp';
  const pct = (v, total) => (v / total * 100) + '%';
  // 거실 그림(1920 × 1080) 기준: 방석 왼쪽 위 x, y, 너비, 좌우 뒤집기, 앉으면 보는 쪽(불이 왼쪽에 있으면 left)
  // 방석 너비 240: 앉은 그림의 사람 키가 서 있는 아바타 키의 절반 남짓이 되는 크기(11-21 고침, 전엔 150이라 앉으면 작아짐)
  const SPOTS = [
    { x: 14, y: 676, w: 240, flip: false, look: 'right' },   // 벽난로 받침 앞 바닥(11-21: 받침 위로 떠 보여 내림)
    { x: 248, y: 640, w: 240, flip: true, look: 'left' },
    { x: 196, y: 808, w: 240, flip: false, look: 'left' },
  ];
  const ASPECT = 181 / 300; // 방석 그림 높이/너비

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
    const bottom = spot.y + spot.w * ASPECT;
    button.style.left = pct(spot.x, 1920);
    button.style.top = pct(spot.y, 1080);
    button.style.width = pct(spot.w, 1920);
    button.style.zIndex = String(Math.round(bottom / 1080 * 1000));
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
    const centerX = (spot.x + spot.w / 2) / 1920 * 100;
    const bottomY = (spot.y + spot.w * ASPECT) / 1080 * 100;
    const target = { x: centerX, y: bottomY, offsetX: spot.look === 'left' ? 3 : -3, offsetY: 2 };
    walking = true;
    const started = avatar.approach(target, () => {
      walking = false;
      const pic = new Image();
      pic.onload = () => show(spot, index, art);
      pic.onerror = () => {};
      pic.src = art;
    }, () => { walking = false; });
    if (!started) walking = false;
  }

  function show(spot, index, art) {
    const sitter = document.createElement('div');
    sitter.className = 'firewatch-sitter';
    const bottom = spot.y + spot.w * ASPECT;
    sitter.style.left = pct(spot.x, 1920);
    sitter.style.top = pct(bottom + 2, 1080);
    sitter.style.width = pct(spot.w, 1920);
    sitter.style.zIndex = String(Math.round(bottom / 1080 * 1000) + 1);
    const image = document.createElement('img');
    image.src = art;
    image.alt = '';
    sitter.append(image);
    stage.append(sitter);
    document.body.classList.add('is-firewatching');
    cushions[index]?.classList.add('is-taken');
    requestAnimationFrame(() => sitter.classList.add('is-shown'));
    sitting = { index, sitter };
    const crackle = () => { window.roomFire?.crackle?.(8, .45); crackleTimer = setTimeout(crackle, 7600); };
    crackle();
  }

  function stand() {
    if (!sitting) return;
    clearTimeout(crackleTimer);
    window.roomFire?.quiet?.();
    const { index, sitter } = sitting;
    sitting = null;
    document.body.classList.remove('is-firewatching');
    cushions[index]?.classList.remove('is-taken');
    sitter.remove();
  }

  // 다른 곳을 누르면 일어나서 그쪽으로 가요.
  stage.addEventListener('click', event => {
    if (sitting && !event.target.closest('.firewatch-cushion')) stand();
  }, true);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') stand(); });
  document.addEventListener('hometextchange', () => {
    cushions.forEach(button => button?.setAttribute('aria-label', t('벽난로 앞 방석')));
  });
  window.roomFirewatch = { stand, get sitting() { return Boolean(sitting); } };
})();
