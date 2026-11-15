(function () {
  'use strict';
  const { text, bind, link: localizedLink } = window.roomLanguage;

  // ===== 설정: 여기만 고치면 돼요 =====
  const PUBLIC = !roomSettings.testing; // Local test mode only.
  const URLS = {
    sameDay: 'https://kimyoungji33-gg.github.io/heartstorybook/previous-home.html#same-day', // '같은 하루, 다른 마음' 페이지 주소로 바꾸세요
    whatIf: 'https://kimyoungji33-gg.github.io/heartstorybook/previous-home.html#tales',      // '만약 이랬다면 어땠을까' 페이지 주소(없으면 비워 두면 버튼이 안 보여요)
    heartVoice: 'https://kimyoungji33-gg.github.io/heartstorybook/perspective-games.html' // '마음의 소리' 페이지 주소로 바꾸세요
  };
  // x, y = 발 위치(그림 가로세로의 %), w = 가로 크기(%)
  // 할아버지가 왼쪽, 할머니가 오른쪽. 뒤쪽 안락의자에 나란히 계세요.
  const FAMILY = [
    { id: 'grandpa', name: '할아버지', img: 'images/grandpa_chair.webp', x: 32.5, y: 57.1, w: 17.4,
      say: '마음의 소리, 같이 들어 볼까?',
      links: [{ label: '소리로 떠올리는 풍경', url: 'https://kimyoungji33-gg.github.io/heartstorybook/perspective-games.html#landscapes' },
              { label: '이야기 속 소리 탐험', url: 'https://kimyoungji33-gg.github.io/heartstorybook/story-sounds.html' }] },
    { id: 'grandma', name: '할머니', img: 'images/grandma_chair.webp', x: 45.7, y: 56.7, w: 15.5,
      say: '왔니. 이야기 하나 같이 볼까?',
      links: [{ label: '같은 하루, 다른 마음', url: URLS.sameDay },
              { label: '만약 이랬다면 어땠을까', url: URLS.whatIf }] },
    { id: 'momo', name: '모모', img: 'images/momo-storybook.png', x: 22, y: 60.4, w: 5.25, cat: true, action: 'door',
      say: '곧 열려요.' },
    { id: 'semi', name: '세미', img: 'images/semi-storybook.png', x: 57.3, y: 60.8, w: 6.625, cat: true,
      say: '이야기 속 마음을 찾는 열쇠가 있다냥. 같이 알아볼까냥?',
      links: [{ label: '마음열쇠 알아보기', url: 'https://kimyoungji33-gg.github.io/heartstorybook/heart-keys.html' }] }
  ];
  const DOOR = { x: 95, y: 48 }; // 문 틈으로 빛이 새는 위치(%)
  // 감 쟁반을 집는 위치(%). 미리보기에서 어색하면 숫자만 조정하면 돼요.
  const FRUIT_TABLE = { x: 40, y: 63 };
  const EATING_IMG = { grandpa: 'images/reading-samples/grandpa_eating.png', grandma: 'images/reading-samples/grandma_eating.png' };
  const GREETING_DISTANCE = 15; // 숫자를 키우면 더 멀리서도 '인사하기'가 떠요.
  const SEMI_BLINK_MS = 4100;
  const stage = document.getElementById('stage') ||
    document.querySelector('.stage, #room, #scene, #game, main') || document.body;
  if (getComputedStyle(stage).position === 'static') stage.style.position = 'relative';

  const css = document.createElement('style');
  css.textContent = `
  .fam{position:absolute;transform:translate(-50%,-100%);cursor:pointer;z-index:30;-webkit-tap-highlight-color:transparent}
  .fam img{width:100%;display:block;transform-origin:50% 100%;animation:famBreath 5s ease-in-out infinite}
  .fam[data-family="momo"] img{aspect-ratio:1024 / 1536;object-fit:contain;object-position:center bottom}
  .fam[data-family="semi"] img{aspect-ratio:1148 / 1371;object-fit:contain;object-position:center bottom}
  .semi-eyes{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;transform-origin:50% 100%;animation:famBreath 5s ease-in-out infinite}
  .fam[data-family="semi"] img,.semi-eyes{scale:-1 1}
  .semi-eyes rect{transform-box:fill-box;transform-origin:top;transform:scaleY(0)}
  .semi-eyes .semi-eye-line{opacity:0}
  .is-petted .semi-eyes rect{animation:semiLids ${SEMI_BLINK_MS}ms ease-in-out both}
  .is-petted .semi-eye-line{animation:semiEyeLine ${SEMI_BLINK_MS}ms ease-in-out both}
  @keyframes semiLids{0%,100%{transform:scaleY(0)}14%,79%{transform:scaleY(1)}}
  @keyframes semiEyeLine{0%,10%,90%,100%{opacity:0}16%,79%{opacity:1}}
  .motion-still .is-petted .semi-eyes rect,.motion-still .is-petted .semi-eye-line{animation:none}
  .motion-still .is-petted .semi-eyes rect{transform:scaleY(1)}
  .motion-still .is-petted .semi-eye-line{opacity:1}
  .fam .sh{position:absolute;left:6%;right:6%;bottom:-2%;height:10%;z-index:-1;background:radial-gradient(ellipse at center,rgba(60,35,15,.4),transparent 70%)}
  .fam:hover img,.fam:focus-visible img{filter:brightness(1.07)}
  .fam[data-family="semi"]:is(:hover,:focus-visible) img{filter:none}
  .fam:focus-visible{outline:2px solid rgba(255,230,180,.95);outline-offset:4px;border-radius:12px}
  .fam .miss{display:flex;align-items:center;justify-content:center;aspect-ratio:1;border-radius:50%;background:rgba(232,166,74,.85);color:#3b2614;font:700 14px sans-serif;text-align:center}
  .fam-bubble{position:absolute;z-index:9000;transform:translate(-50%,-100%);box-sizing:border-box;width:max-content;max-width:min(90%,240px);max-height:calc(100% - 12px);overflow-y:auto;background:rgba(255,248,232,.98);color:#4a3322;border:1.5px solid rgba(200,150,80,.6);border-radius:16px;padding:8px 10px;font:16px/1.4 "Malgun Gothic","Apple SD Gothic Neo",sans-serif;box-shadow:0 6px 18px rgba(60,35,15,.25);animation:famPop .25s ease}
  .fam-elder-bubble{position:fixed}
  .fam-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
  .fam-btn{min-height:44px;padding:10px 14px;border-radius:999px;border:1.5px solid rgba(200,150,80,.7);background:#f6d9a8;color:#3b2614;font:15px "Malgun Gothic",sans-serif;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center}
  .fam-bubble .fam-row{display:grid;justify-items:start;gap:5px;margin-top:6px}
  .fam-bubble .fam-btn{max-width:100%;min-height:40px;padding:7px 12px;text-align:center;justify-content:center}
  .fam-btn:hover,.fam-btn:focus-visible{background:#fbe6c3;outline:none}
  .fam-door{position:absolute;z-index:20;width:22%;height:46%;transform:translate(-50%,-50%);pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(255,215,140,.75),rgba(255,215,140,0) 68%);transition:opacity 1.2s ease}
  .fam-door.on{opacity:1}
  .fam-note{font-size:13px;opacity:.8;margin-top:6px}
  .fam-old{margin-top:10px;max-height:150px;overflow:auto;font-size:14px;border-top:1px dashed #d9b47a;padding-top:8px}
  .fam-panel{position:fixed;left:8px;bottom:8px;z-index:20000;background:rgba(0,0,0,.75);color:#fff;font:12px/1.5 monospace;padding:8px 10px;border-radius:8px;max-width:90vw;white-space:pre-wrap}
  @keyframes famBreath{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.2px)}}
  @keyframes famPop{from{opacity:0;transform:translate(-50%,-96%)}to{opacity:1;transform:translate(-50%,-100%)}}
  @media (prefers-reduced-motion:reduce){
    .fam img,.fam-bubble,.semi-eyes,.is-petted .semi-eyes rect,.is-petted .semi-eye-line{animation:none}
    .is-petted .semi-eyes rect{transform:scaleY(1)}
    .is-petted .semi-eye-line{opacity:1}
    .fam-door{transition:none}
  }
  `;
  document.head.appendChild(css);

  const door = document.createElement('div');
  door.className = 'fam-door';
  door.style.left = DOOR.x + '%';
  door.style.top = DOOR.y + '%';
  stage.appendChild(door);

  let bubble = null, bubbleTimer = null, layoutOn = false, dragging = null, selected = null, moved = false;
  const soundButton = document.getElementById('room-sound');
  const effects = {
    purr: { audio: document.getElementById('purr-sound'), volume: .4, duration: 7000, fade: 380 },
  };
  const weatherAudio = document.getElementById('weather-sound');
  weatherAudio.volume = .35;
  let muted = false;
  for (const effect of Object.values(effects)) effect.audio.volume = effect.volume;

  function playEffect(name) {
    if (muted) return;
    const effect = effects[name];
    const audio = effect.audio;
    clearTimeout(effect.stop);
    clearInterval(effect.fadeTimer);
    audio.currentTime = 0;
    audio.volume = effect.fade ? .12 : effect.volume;
    audio.play().catch(() => {});
    effect.stop = setTimeout(() => {
      audio.pause();
      clearInterval(effect.fadeTimer);
    }, effect.duration);
    if (effect.fade) {
      const start = performance.now();
      effect.fadeTimer = setInterval(() => {
        const part = Math.min(1, (performance.now() - start) / effect.fade);
        audio.volume = muted ? 0 : .12 + (effect.volume - .12) * part;
        if (part === 1) clearInterval(effect.fadeTimer);
      }, 40);
    }
  }

  soundButton.addEventListener('click', () => {
    muted = !muted;
    soundButton.setAttribute('aria-pressed', String(muted));
    for (const effect of Object.values(effects)) {
      effect.audio.volume = muted ? 0 : effect.volume;
    }
    weatherAudio.volume = muted ? 0 : .35;
  });

  function actionButton(label, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'fam-btn';
    bind(button, label);
    button.addEventListener('click', onClick);
    return button;
  }

  function positionBubble(box, speaker) {
    const room = stage.getBoundingClientRect();
    const margin = 6;
    const side = speaker.dataset.family;
    const elder = side === 'grandpa' || side === 'grandma';
    const speakerArt = (speaker.querySelector('img') || speaker).getBoundingClientRect();
    if (elder) {
      const bottom = Math.max(margin + 1, speakerArt.top - 12);
      const maxWidth = Math.min(room.width * .9, 240) + 'px';
      const maxHeight = Math.max(1, bottom - margin) + 'px';
      if (box.style.maxWidth !== maxWidth) box.style.maxWidth = maxWidth;
      if (box.style.maxHeight !== maxHeight) box.style.maxHeight = maxHeight;
      const half = box.offsetWidth / 2;
      const center = speakerArt.left + speakerArt.width / 2;
      const offset = speakerArt.width * .19 + margin + half;
      const left = Math.max(room.left + margin + half,
        Math.min(room.right - margin - half, center + (side === 'grandpa' ? -offset : offset))) + 'px';
      const top = bottom + 'px';
      if (box.style.left !== left) box.style.left = left;
      if (box.style.top !== top) box.style.top = top;
      return;
    }
    const width = box.offsetWidth;
    const height = box.offsetHeight;
    const half = width / 2;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const placement = (center, bottom) => ({
      x: clamp(center, margin + half, room.width - margin - half),
      y: clamp(bottom, margin + height, room.height - margin),
    });
    const head = actor => {
      const art = (actor.querySelector('img') || actor).getBoundingClientRect();
      const center = art.left + art.width / 2 - room.left;
      return {
        left: center - art.width * .19 - margin,
        right: center + art.width * .19 + margin,
        top: art.top - room.top,
        bottom: art.top - room.top + art.height * .31 + margin,
      };
    };
    const target = head(speaker);
    const center = (target.left + target.right) / 2;
    const faces = elders.map(entry => entry.el).filter(el => el.isConnected).map(head);
    faces.push(target);
    const overlap = ({ x, y }) => faces.reduce((total, face) => {
      const w = Math.max(0, Math.min(x + half, face.right) - Math.max(x - half, face.left));
      const h = Math.max(0, Math.min(y, face.bottom) - Math.max(y - height, face.top));
      return total + w * h;
    }, 0);
    const above = placement(center, target.top - margin);
    let best = above;
    if (overlap(above)) {
      const alternatives = [
        placement(target.left - half, above.y),
        placement(target.right + half, above.y),
        placement(center, target.bottom + height),
      ];
      for (const face of faces) {
        alternatives.push(placement(face.left - half, above.y), placement(face.right + half, above.y));
      }
      best = alternatives.reduce((current, option) => {
        const score = point => overlap(point) * 1000 + Math.hypot(point.x - above.x, point.y - above.y);
        return score(option) < score(current) ? option : current;
      }, above);
    }
    const left = best.x + 'px';
    const top = best.y + 'px';
    if (box.style.left !== left) box.style.left = left;
    if (box.style.top !== top) box.style.top = top;
  }

  let bubbleFrame = 0;

  function closeBubble() {
    cancelAnimationFrame(bubbleFrame);
    if (bubble) { bubble.remove(); bubble = null; }
    clearTimeout(bubbleTimer);
  }
  function showBubble(el, build) {
    closeBubble();
    const b = document.createElement('div');
    b.className = 'fam-bubble';
    if (el.classList.contains('fam-elder')) b.classList.add('fam-elder-bubble');
    build(b);
    stage.appendChild(b);
    bubble = b;
    function followSpeaker() {
      if (!el.isConnected) {
        closeBubble();
        return;
      }
      positionBubble(b, el);
      bubbleFrame = requestAnimationFrame(followSpeaker);
    }
    followSpeaker();
    bubbleTimer = setTimeout(closeBubble, 12000);
  }
  function link(label, url) {
    const a = document.createElement('a');
    a.className = 'fam-btn'; a.textContent = text(label); a.href = localizedLink(url);
    a.target = '_blank'; a.rel = 'noopener';
    return a;
  }

  function act(c, el) {
    if (c.cat) {
      playEffect('purr');
      blinkCat(el);
    }
    if (c.action === 'door') {
      door.classList.add('on');
      setTimeout(function () { door.classList.remove('on'); }, 4500);
    }
    showBubble(el, function (b) {
      const p = document.createElement('div');
      bind(p, c.say);
      b.appendChild(p);
      const links = (c.links || []).filter(function (l) { return l.url; });
      if (links.length) {
        const row = document.createElement('div');
        row.className = 'fam-row';
        links.forEach(function (l) { row.appendChild(link(l.label, l.url)); });
        b.appendChild(row);
      }
    });
  }

  const els = {};
  const elders = [];
  const avatar = document.getElementById('avatar');
  let busy = false;
  let avatarPosition;
  let avatarReady = false;

  function blinkCat(el) {
    const isSemi = el.dataset.family === 'semi';
    if (isSemi && el.classList.contains('is-petted')) return;
    el.classList.remove('is-petted');
    // Restart the blink when the same cat is petted again.
    void el.offsetWidth;
    el.classList.add('is-petted');
    clearTimeout(el.petTimer);
    const duration = isSemi ? SEMI_BLINK_MS : 1500;
    el.petTimer = setTimeout(() => el.classList.remove('is-petted'), duration);
  }

  function addSemiEyes(el) {
    // The overlay follows the original image's size, alignment, and breathing.
    el.insertAdjacentHTML('beforeend', `
      <svg class="semi-eyes" viewBox="0 0 1086 1448" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <linearGradient id="semi-lid-left" x2="0%" y2="100%">
            <stop stop-color="#bf8d61"/><stop offset="1" stop-color="#f2cc9d"/>
          </linearGradient>
          <linearGradient id="semi-lid-right" x2="0%" y2="100%">
            <stop stop-color="#ce9a6d"/><stop offset="1" stop-color="#edc294"/>
          </linearGradient>
          <clipPath id="semi-lids-sweep">
            <rect x="576" y="383" width="112" height="91"/>
            <rect x="754" y="322" width="78" height="88"/>
          </clipPath>
        </defs>
        <g clip-path="url(#semi-lids-sweep)">
          <path fill="url(#semi-lid-left)" d="M580 433Q592 391 619 387Q648 381 673 424Q684 440 677 445Q657 473 627 471Q594 472 580 433Z"/>
          <path fill="url(#semi-lid-right)" d="M759 367Q762 334 785 326Q805 324 820 350Q833 375 820 391Q807 411 785 404Q763 394 759 367Z"/>
        </g>
        <path class="semi-eye-line" fill="none" stroke="#59402e" stroke-width="6" stroke-linecap="round"
          d="M586 434Q628 455 674 431M762 371Q789 389 820 361"/>
      </svg>
    `);
  }

  function finishGreeting() {
    busy = false;
    drawActions();
  }

  function beginFamilyAction() {
    closeBubble();
    busy = true;
    drawActions();
  }

  function greet(entry) {
    if (busy || !avatarReady) return;
    beginFamilyAction();
    const target = {
      ...entry.c,
      offsetX: entry.c.id === 'grandma' ? 8.8 : -8.8,
      offsetY: 8,
    };
    if (!window.roomAvatar.approach(target, () => {
      avatar.classList.add('is-greeting');
      window.roomAvatar.bowToward(entry.c.x, () => {
        avatar.classList.remove('is-greeting');
        answerGreeting(entry);
      });
    }, finishGreeting)) finishGreeting();
  }

  function answerGreeting(entry) {
    entry.el.classList.add('is-nodding');
    setTimeout(() => {
      entry.el.classList.remove('is-nodding');
      finishGreeting();
    }, 1200);
  }

  function finishPersimmon() {
    busy = false;
    window.roomAvatar.setCarrying(null);
    drawActions();
  }

  function givePersimmon() {
    if (busy || !avatarReady) return;
    beginFamilyAction();

    // Keep the tray visibly in her hands for the whole trip (pickup → both
    // elders); there's no dedicated walking-with-tray art yet, so a gentle
    // bob/sway (already built into the walk code) stands in for footsteps.
    function feedNext(index) {
      const order = [els.grandma, els.grandpa].filter(Boolean);
      if (index >= order.length) {
        window.roomAvatar.eatPersimmon(finishPersimmon);
        return;
      }
      const entry = order[index];
      const target = {
        ...entry.c,
        offsetX: entry.c.id === 'grandma' ? 8.8 : -8.8,
        offsetY: 8,
      };
      if (!window.roomAvatar.approach(target, () => {
        window.roomAvatar.faceToward(entry.c.x);
        const img = entry.el.querySelector('img');
        img.src = EATING_IMG[entry.c.id];
        entry.el.classList.add('is-nodding');
        setTimeout(() => {
          entry.el.classList.remove('is-nodding');
          img.src = entry.c.img;
          feedNext(index + 1);
        }, 1800);
      }, finishPersimmon)) finishPersimmon();
    }

    if (!window.roomAvatar.approach({ ...FRUIT_TABLE, offsetX: 0, offsetY: 0 }, () => {
      window.roomAvatar.setCarrying('carry');
      feedNext(0);
    }, finishPersimmon)) finishPersimmon();
  }

  function placeGreeting(control) {
    if (!control.offsetWidth) return;
    const room = stage.getBoundingClientRect();
    const sprite = document.getElementById('frame').getBoundingClientRect();
    const half = control.offsetWidth / 2;
    const gap = 8;
    const center = sprite.left + sprite.width / 2 - room.left;
    let x = Math.max(half + gap, Math.min(room.width - half - gap, center));
    const elderTop = Math.min(...elders.filter(entry => entry.el.isConnected)
      .map(entry => entry.el.getBoundingClientRect().top));
    let bottom = Math.min(sprite.top, elderTop) - room.top - gap;
    if (bottom < control.offsetHeight + gap) {
      const right = sprite.right - room.left + gap + half;
      x = right + half <= room.width - gap ? right : sprite.left - room.left - gap - half;
      bottom = Math.min(room.height - gap, Math.max(control.offsetHeight + gap, sprite.top - room.top + control.offsetHeight));
    }
    control.style.left = x + 'px';
    control.style.top = bottom + 'px';
  }

  let facedEntry = null;
  function drawActions(position = avatarPosition, ready = avatarReady) {
    avatarPosition = position;
    avatarReady = ready;
    let nearest;
    let nearestDistance = GREETING_DISTANCE;
    if (ready && !busy && !layoutOn) {
      for (const entry of elders) {
        if (!entry.el.isConnected) continue;
        const distance = Math.hypot(position.x - entry.c.x, position.y - entry.c.y);
        if (distance <= nearestDistance && (!nearest || distance < nearestDistance)) {
          nearest = entry;
          nearestDistance = distance;
        }
      }
    }
    // Turn to face whichever elder just came into range, once per approach.
    // (facedEntry is updated BEFORE calling faceToward, which triggers a
    // synchronous re-entrant draw() -> drawActions() call.)
    const justArrived = nearest && nearest !== facedEntry;
    facedEntry = nearest || null;
    if (justArrived) window.roomAvatar.faceToward(nearest.c.x);
    for (const entry of elders) {
      const { actions } = entry;
      const visible = entry === nearest;
      if (actions.hidden !== !visible) actions.hidden = !visible;
      if (!visible) continue;
      placeGreeting(actions);
    }
  }

  function makeElderActions(entry) {
    const actions = document.createElement('div');
    actions.className = 'fam-actions';
    actions.setAttribute('role', 'group');
    bind(actions, entry.c.name, 'aria-label');
    actions.hidden = true;
    const greetButton = actionButton('인사하기', () => greet(entry));
    actions.append(greetButton);
    stage.append(actions);
    Object.assign(entry, { actions });
    elders.push(entry);
  }

  window.roomFamily = {
    draw: drawActions,
    givePersimmon,
    blockers: () => FAMILY.filter(c => els[c.id]?.el.isConnected).map(c => ({
      x: c.x, y: c.y - (c.cat ? 1 : 3.2),
      rx: c.w * (c.cat ? .31 : .34), ry: c.cat ? 2.1 : 5.3,
      sortKey: c.y,
    })),
    playWeather(weather) {
      weatherAudio.pause();
      if (muted) return;
      weatherAudio.src = weather === 'sunny' ? 'sfx/bird.mp3' : 'sfx/weather-' + weather + '.wav';
      weatherAudio.play().catch(() => {});
    },
  };

  FAMILY.forEach(function (c) {
    const el = document.createElement('div');
    el.className = 'fam';
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    bind(el, c.name, 'aria-label');
    el.dataset.family = c.id;
    el.style.left = c.x + '%';
    el.style.top = c.y + '%';
    el.style.width = c.w + '%';
    el.style.zIndex = String(Math.round(c.y * 10));
    el.classList.toggle('fam-elder', !c.cat);
    el.innerHTML = '<div class="sh"></div>';
    const img = new Image();
    img.alt = ''; img.draggable = false;
    img.onerror = function () {
      img.remove();
      if (PUBLIC) { el.remove(); return; }
      const m = document.createElement('div');
      m.className = 'miss'; m.textContent = c.name + '\n(그림 없음)';
      el.appendChild(m);
      console.warn('[family.js] 그림 파일이 없어요:', c.img);
    };
    img.src = c.img;
    el.appendChild(img);
    if (c.id === 'semi') {
      addSemiEyes(el);
    } else if (c.cat) {
      const eyes = document.createElement('span');
      eyes.className = 'fam-eyes';
      eyes.setAttribute('aria-hidden', 'true');
      eyes.append(document.createElement('i'), document.createElement('i'));
      el.append(eyes);
    }
    img.addEventListener('load', () => drawActions());
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      if (moved) { moved = false; return; }
      if (layoutOn) { select(el); return; }
      act(c, el);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (layoutOn) select(el);
        else act(c, el);
      }
    });
    stage.appendChild(el);
    els[c.id] = { c: c, el: el };
    if (!c.cat) makeElderActions(els[c.id]);
  });

  document.addEventListener('click', function (e) {
    if (bubble && !bubble.contains(e.target)) closeBubble();
  });
  document.addEventListener('roomlanguagechange', () => {
    closeBubble();
    soundButton.title = text('음소거');
    drawActions();
  });
  soundButton.title = text('음소거');
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeBubble();
      drawActions();
    }
  });

  // ----- 위치 조정 모드 (L): 끌어서 옮기고, +/-로 크기, C로 값 복사 -----
  let panel = null;
  function select(el) {
    selected = el;
    Object.values(els).forEach(function (o) { o.el.style.outline = o.el === el ? '2px dashed #fff' : 'none'; });
    updatePanel();
  }
  function snapshot() {
    return Object.values(els).map(function (o) {
      return "{ id: '" + o.c.id + "', x: " + o.c.x.toFixed(1) + ', y: ' + o.c.y.toFixed(1) + ', w: ' + o.c.w.toFixed(1) + ' }';
    }).join('\n');
  }
  function updatePanel() {
    if (!panel) return;
    panel.textContent = '위치 조정 모드 (L 끄기)\n끌어서 옮기기 · 인물 선택 후 + / - 크기 · C 값 복사\n' + snapshot();
  }
  function setLayout(on) {
    layoutOn = on;
    if (on) {
      panel = document.createElement('div');
      panel.className = 'fam-panel';
      document.body.appendChild(panel);
      updatePanel();
    } else if (panel) {
      panel.remove(); panel = null;
      Object.values(els).forEach(function (o) { o.el.style.outline = 'none'; });
    }
    drawActions();
  }
  if (!PUBLIC) {
    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'l') setLayout(!layoutOn);
      if (!layoutOn) return;
      if (k === 'c') {
        try { navigator.clipboard.writeText(snapshot()); } catch (err) { console.log(snapshot()); }
      }
      if (selected && (e.key === '+' || e.key === '=' || e.key === '-')) {
        const o = Object.values(els).find(function (x) { return x.el === selected; });
        o.c.w = Math.max(3, o.c.w + (e.key === '-' ? -0.5 : 0.5));
        o.el.style.width = o.c.w + '%';
        updatePanel();
      }
    });
    stage.addEventListener('pointerdown', function (e) {
      if (!layoutOn) return;
      const t = e.target.closest && e.target.closest('.fam');
      if (!t) return;
      dragging = t; moved = false; select(t);
      t.setPointerCapture && t.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function (e) {
      if (!layoutOn || !dragging) return;
      const s = stage.getBoundingClientRect();
      const o = Object.values(els).find(function (x) { return x.el === dragging; });
      o.c.x = Math.max(0, Math.min(100, (e.clientX - s.left) / s.width * 100));
      o.c.y = Math.max(0, Math.min(100, (e.clientY - s.top) / s.height * 100));
      dragging.style.left = o.c.x + '%';
      dragging.style.top = o.c.y + '%';
      dragging.style.zIndex = String(Math.round(o.c.y * 10));
      moved = true;
      updatePanel();
    });
    stage.addEventListener('pointerup', function () { dragging = null; });
  }
})();
