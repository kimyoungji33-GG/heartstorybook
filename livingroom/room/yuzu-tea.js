'use strict';

// 벽난로 앞에서 유자를 모아 할머니와 할아버지께 차를 드려요.
(() => {
  const stage = document.getElementById('stage');
  if (!stage) return;

  const STORAGE_KEY = 'maeum_yuzu_pieces_v1';
  const TESTING = typeof roomSettings !== 'undefined' && roomSettings.testing;
  const COLLECT_MS = TESTING ? 3000 : 30000;
  // 할머니 찻잔 오른쪽에 주전자와 유자 단지를 나란히 놓아요.
  const TEAPOT = { x: 47.8, y: 52.2, w: 5.3 };
  const JAR = { x: 50.6, y: 52.2, w: 2.35 };
  // 감 쟁반처럼 탁자 앞에서 집어 들어요(탁자 뒤로 들어가지 않게).
  const PICKUP = { x: 49, y: 63 };
  // 단지와 주전자는 탁자 그림(table-new, 656) 바로 위에 놓여요.
  // 아바타가 탁자 앞에 서면 아바타가 더 앞에 보여요.
  const TABLE_DEPTH = 658;
  const ART = {
    jars: [0, 1, 2, 3].map(index => `images/tea/yuzu-jar-${index}.webp`),
    teapot: 'images/tea/yuzu-teapot.png',
    pieces: ['images/tea/yuzu-peel.webp', 'images/tea/yuzu-slice.webp'],
    drinking: {
      grandma: 'images/tea/grandma-yuzutea.webp',
      grandpa: 'images/tea/grandpa-yuzutea.webp',
    },
    thanks: {
      grandma: 'images/tea/grandma-yuzutea-thanks.webp',
      grandpa: 'images/tea/grandpa-yuzutea-thanks.webp',
    },
  };

  const css = document.createElement('style');
  css.textContent = `
    .yuzu-jar{position:absolute;left:${JAR.x}%;top:${JAR.y}%;width:${JAR.w}%;padding:0;border:0;background:none;
      transform:translate(-50%,-100%);cursor:pointer;z-index:${TABLE_DEPTH};-webkit-tap-highlight-color:transparent}
    .yuzu-jar img{display:block;width:100%;height:auto;filter:drop-shadow(0 1px 1px #4d2e1738);pointer-events:none}
    .yuzu-jar:is(:hover,:focus-visible) img{filter:brightness(1.05) drop-shadow(0 1px 2px #4d2e1755)}
    .yuzu-jar:focus-visible{outline:2px solid #fff0bf;outline-offset:3px;border-radius:5px}
    .yuzu-teapot{position:absolute;left:${TEAPOT.x}%;top:${TEAPOT.y}%;width:${TEAPOT.w}%;height:auto;
      transform:translate(-50%,-100%);z-index:${TABLE_DEPTH - 1};pointer-events:none;filter:drop-shadow(0 1px 1px #4d2e1730)}
    .yuzu-piece-flight{position:absolute;width:3.3%;z-index:1200;pointer-events:none;transform:translate(-50%,-50%)}
    .yuzu-piece-flight img{display:block;width:100%;height:auto;filter:drop-shadow(0 0 5px #ffe46f)}
    .yuzu-piece-flight::after{content:'✦';position:absolute;right:-14%;top:-20%;color:#fff1a0;font-size:clamp(12px,1.5vw,24px);
      text-shadow:0 0 7px #ffd34d;animation:yuzuSpark .75s ease-in-out infinite alternate}
    @keyframes yuzuSpark{to{opacity:.35;transform:scale(.72) rotate(30deg)}}
    .yuzu-notice{position:absolute;left:${JAR.x}%;top:${JAR.y + 1.2}%;z-index:9000;transform:translate(-18%,-100%);
      max-width:min(300px,78%);padding:8px 12px;border:1.5px solid #c89650a8;border-radius:14px;background:#fff8e8f7;color:#4a3322;
      box-shadow:0 5px 16px #3c230f38;font:16px/1.35 "Malgun Gothic","Apple SD Gothic Neo",sans-serif}
    .fam.is-yuzu-serving>img{clip-path:none}
    @media(prefers-reduced-motion:reduce){.yuzu-piece-flight::after{animation:none}}
  `;
  document.head.append(css);

  let count = 0;
  try {
    const saved = Number.parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (Number.isFinite(saved) && saved >= 0) count = Math.min(3, saved);
  } catch {}

  function saveCount() {
    try { localStorage.setItem(STORAGE_KEY, String(count)); } catch {}
  }

  function jarStage() {
    // 유자는 3개까지만 모여요. 3개면 가득 찬 단지(차 드릴 준비 끝).
    return Math.min(3, Math.max(0, count));
  }

  const jar = document.createElement('button');
  jar.type = 'button';
  jar.className = 'yuzu-jar';
  jar.dataset.homeAria = '유자차 단지';
  jar.setAttribute('aria-label', '유자차 단지');
  const jarImage = new Image();
  jarImage.alt = '';
  jarImage.draggable = false;
  jar.append(jarImage);
  stage.append(jar);

  const teapot = new Image();
  teapot.className = 'yuzu-teapot';
  teapot.src = ART.teapot;
  teapot.alt = '';
  teapot.draggable = false;
  stage.append(teapot);

  function drawJar() {
    jarImage.src = ART.jars[jarStage()];
    jar.dataset.count = String(count);
    jar.setAttribute('aria-label', `유자차 단지, 유자 ${count}개`);
  }
  drawJar();

  [...ART.jars, ART.teapot, ...ART.pieces, ...Object.values(ART.drinking), ...Object.values(ART.thanks)]
    .forEach(src => { const image = new Image(); image.src = src; });

  let collectTimer = 0;
  let collectedThisSitting = 0;
  let pieceIndex = 0;

  function flyPiece(src) {
    const avatar = document.getElementById('frame')?.getBoundingClientRect();
    const room = stage.getBoundingClientRect();
    if (!avatar || !room.width || !room.height) return;
    const piece = document.createElement('span');
    piece.className = 'yuzu-piece-flight';
    const image = new Image();
    image.src = src;
    image.alt = '';
    piece.append(image);
    const fromX = (avatar.left + avatar.width * .5 - room.left) / room.width * 100;
    const fromY = (avatar.top + avatar.height * .05 - room.top) / room.height * 100;
    piece.style.left = fromX + '%';
    piece.style.top = fromY + '%';
    stage.append(piece);
    const motion = piece.animate([
      { left: fromX + '%', top: fromY + '%', opacity: 0, transform: 'translate(-50%,-35%) scale(.45)' },
      { left: fromX + '%', top: (fromY - 4) + '%', opacity: 1, transform: 'translate(-50%,-50%) scale(1)', offset: .3 },
      { left: JAR.x + '%', top: (JAR.y - 2.3) + '%', opacity: .95, transform: 'translate(-50%,-50%) scale(.6)' },
      { left: JAR.x + '%', top: (JAR.y - .3) + '%', opacity: 0, transform: 'translate(-50%,-50%) scale(.25)' },
    ], { duration: TESTING ? 1100 : 2400, easing: 'ease-in-out' });
    motion.finished.catch(() => {}).finally(() => piece.remove());
  }

  // 나중에 불멍 그림이 생겨도 이 함수만 같은 자리에서 부르면 돼요.
  function gainYuzuPiece() {
    if (collectedThisSitting >= 3 || count >= 3) return false;
    const art = ART.pieces[pieceIndex++ % ART.pieces.length];
    collectedThisSitting += 1;
    count += 1;
    saveCount();
    drawJar();
    flyPiece(art);
    return true;
  }

  function scheduleNext() {
    clearTimeout(collectTimer);
    if (collectedThisSitting >= 3) return;
    collectTimer = setTimeout(() => {
      gainYuzuPiece();
      scheduleNext();
    }, COLLECT_MS);
  }

  function startCollecting() {
    collectedThisSitting = 0;
    // 앉을 때마다 0개부터 새로 모아요.
    count = 0;
    saveCount();
    drawJar();
    scheduleNext();
  }

  function stopCollecting() {
    clearTimeout(collectTimer);
    collectTimer = 0;
    collectedThisSitting = 0;
  }

  let noticeTimer = 0;
  function showNotice(message) {
    document.querySelector('.yuzu-notice')?.remove();
    clearTimeout(noticeTimer);
    const notice = document.createElement('div');
    notice.className = 'yuzu-notice';
    notice.setAttribute('role', 'status');
    notice.textContent = message;
    stage.append(notice);
    noticeTimer = setTimeout(() => notice.remove(), 3000);
  }

  // 찻잔 쟁반은 아바타 그림(carry_yuzutea_*)에 그려져 있어서 따로 겹치지 않아요.
  function startCarry() {}
  function stopCarry() {}

  const artExists = new Map();
  function hasArt(src, after) {
    if (artExists.has(src)) { after(artExists.get(src)); return; }
    const probe = new Image();
    probe.onload = () => { artExists.set(src, true); after(true); };
    probe.onerror = () => { artExists.set(src, false); after(false); };
    probe.src = src;
  }

  function feedElder(id, element, next) {
    const image = element.querySelector('img');
    if (!image) { next(); return; }
    const before = image.src;
    element.classList.add('is-yuzu-serving');
    image.src = ART.drinking[id];
    // 할머니가 마시고 고맙다고 하면 바로 다음 분께 가요(시험 모드도 같은 시간).
    const drinkingMs = 1800;
    const thanksMs = 1400;
    setTimeout(() => {
      hasArt(ART.thanks[id], exists => {
        if (!exists) {
          image.src = before;
          element.classList.remove('is-yuzu-serving');
          next();
          return;
        }
        image.src = ART.thanks[id];
        setTimeout(() => {
          image.src = before;
          element.classList.remove('is-yuzu-serving');
          next();
        }, thanksMs);
      });
    }, drinkingMs);
  }

  let serving = false;
  function finishServing() {
    stopCarry();
    window.roomAvatar?.setCarrying?.(null);
    serving = false;
  }

  function serveTea() {
    if (serving || count < 3 || !window.roomAvatar || !window.roomFamily?.serveSnack) return false;
    serving = true;
    const started = window.roomFamily.serveSnack({
      pickup: PICKUP,
      onPickup: () => {
        window.roomAvatar.faceToward(JAR.x);
        window.roomAvatar.setCarrying('carry', 'yuzuTea');
        startCarry();
      },
      feed: feedElder,
      // 할머니 → 할아버지 다음에 아바타도 자기 찻잔으로 한 모금 마셔요(drink_yuzutea_*).
      eat: finish => {
        stopCarry();
        window.roomAvatar.eatPersimmon(finish, 'yuzuTea', 1800);
      },
      end: finishServing,
    });
    if (!started) {
      finishServing();
      return false;
    }
    // 차를 드리면 0개로 돌아가요.
    count = 0;
    saveCount();
    drawJar();
    return true;
  }

  jar.addEventListener('click', event => {
    event.stopPropagation();
    if (count < 3) {
      showNotice('벽난로 앞 방석에 앉아 불을 바라보면 유자가 모여요');
      return;
    }
    serveTea();
  });

  window.roomYuzuTea = {
    startCollecting,
    stopCollecting,
    gainYuzuPiece,
    serveTea,
    get count() { return count; },
  };
})();
