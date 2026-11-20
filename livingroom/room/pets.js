'use strict';

// 거실의 동물 식구와 놀이.
// - 모모·세미: 평소엔 할아버지·할머니 옆 원래 자리에 있어요. 캣타워를 누르면 와서 자요(세미 1층, 모모는 껑충 뛰어 2층).
// - 보리(골든리트리버): 책장 옆 햇살 자리에서 쉬다가, 공이나 인형을 던지면 주워 와요.
// - 장난감 바구니(캣타워 옆): 낚싯대로 고양이랑 놀기, 보리에게 공·인형 던지기.
// - 군고구마 찜기: 감 먹기처럼 할머니 → 할아버지께 드리고, 마지막에 대사 없이 호호 불어 먹어요.
// 그림은 images/pets/ 에 넣으면 바뀌어요(파일 이름은 아래 ART 참고). 없으면 거실 고양이 그림과 임시 그림을 써요.
(() => {
  const stage = document.getElementById('stage');
  if (!stage || !window.roomFamily) return;
  const $ = id => document.getElementById(id);
  const t = (text, values) => window.homeText ? window.homeText.t(text, values) : text;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const still = () => reduced.matches || document.getElementById('experience')?.classList.contains('motion-still');
  const isPublic = /github\.io$/.test(location.hostname);

  // ---------- 켜고 끄기 ----------
  // 11-17 밤: 고양이는 할아버지·할머니처럼 원래 자리에 가만히 있어요. 보리만 더해서 같이 책 읽기.
  // 캣타워, 고양이 돌아다니기, 장난감 바구니(낚싯대·공·인형)는 코드만 남겨 두고 꺼 뒀어요. 다시 쓰려면 true.
  const FEATURES = { catsMove: false, catTower: false, toyBasket: false };

  // ---------- 자리(거실 그림 기준 %) ----------
  // 2층 캣타워: 벽난로 옆(담요 바구니 자리). 1층은 세미, 2층은 모모 자리예요.
  const TOWER = { x: 5, y: 63.5 };                // 캣타워 바닥 가운데(벽난로 불이 가리지 않게 낮게)
  const TOWER_BASE = { x: 11, y: 69 };           // 올라가기 전에 서는 곳(타워 앞)
  const TOWER_FLOOR = {
    semi: { x: 4.8, y: 56.5, level: 1 },        // 1층 칸
    momo: { x: 5.2, y: 46.8, level: 2 },        // 2층 꼭대기
  };
  const BORI_HOME = { x: 82, y: 66 };          // 책장 옆 햇살 드는 자리
  const POT = { x: 17, y: 44 };                 // 군고구마 찜기
  const POT_APPROACH = { x: 21, y: 63 };

  // 새 고양이 그림: sit(정면 앉기), side(옆으로 앉기), jump(뛰어오르기), sleep(웅크려 자기), walk-1~4(걷기 동작)
  function newCatArt(id) {
    const base = 'images/pets/' + id + '-';
    return {
      newSit: base + 'sit.png', newSide: base + 'side.png', newJump: base + 'jump.png', newSleep: base + 'sleep.png',
      walk1: base + 'walk-1.png', walk2: base + 'walk-2.png', walk3: base + 'walk-3.png', walk4: base + 'walk-4.png',
    };
  }
  const ART = {
    // 지금 쓰는 고양이 그림(side, sleep)과, 새로 그리면 바꿔 쓸 그림(images/pets/모모·세미-…png).
    momo: { walk: 'images/pets/momo-walk.png', side: 'images/momo_right.webp', sleep: 'images/momo_sleep.webp', ...newCatArt('momo') },
    semi: { walk: 'images/pets/semi-walk.png', side: 'images/semi_right.webp', sleep: 'images/semi_sleep.webp', ...newCatArt('semi') },
    bori: {
      lie: 'images/pets/bori-lie.webp', sit: 'images/pets/bori-sit.webp',
      run: 'images/pets/bori-run.webp', carry: 'images/pets/bori-carry.png',
    },
    tower: 'images/pets/cat-tower.png',            // 2층 캣타워(있으면 씀)
    toyBasket: 'images/pets/toy-basket.png',       // 장난감 바구니(있으면 씀)
    ball: 'images/pets/toy-ball.png', doll: 'images/pets/toy-doll.png', wand: 'images/pets/toy-wand.png',
    sweetPotato: 'images/pets/sweet-potato.png',
    elderEat: { grandma: 'images/pets/grandma-sweet-potato.png', grandpa: 'images/pets/grandpa-sweet-potato.png' },
  };
  const found = {};
  function probe(path, done) {
    if (found[path] !== undefined) { if (found[path]) done?.(path); return; }
    found[path] = null;
    const image = new Image();
    image.onload = () => { found[path] = path; done?.(path); };
    image.onerror = () => { found[path] = false; };
    image.src = path;
  }
  Object.values(ART).forEach(value => {
    if (typeof value === 'string') probe(value);
    else Object.values(value).forEach(path => typeof path === 'string' ? probe(path) : Object.values(path).forEach(p => probe(p)));
  });

  // ---------- 작은 소리 ----------
  let audioCtx = null;
  const muted = () => document.getElementById('room-sound')?.getAttribute('aria-pressed') === 'true';
  function tone(freq, length = .15, type = 'sine', volume = .12, slide = 1) {
    if (muted()) return;
    try {
      audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (slide !== 1) osc.frequency.exponentialRampToValueAtTime(freq * slide, now + length);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(.001, now + length);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + length + .02);
    } catch {}
  }
  const woof = () => { tone(260, .12, 'square', .06, .7); setTimeout(() => tone(240, .14, 'square', .06, .65), 170); };
  const ting = () => { tone(1500, .2, 'triangle', .08); setTimeout(() => tone(1900, .2, 'triangle', .06), 90); };
  const whoosh = () => tone(500, .35, 'sine', .05, 2.2);

  // ---------- 움직이기 ----------
  function moveTo(item, target, speed, onStep, done) {
    cancelAnimationFrame(item.frame || 0);
    const start = { x: item.x, y: item.y };
    const length = Math.hypot((target.x - start.x) * 1.78, target.y - start.y);
    const duration = still() ? 0 : Math.max(300, length / speed * 1000);
    const began = performance.now();
    const step = now => {
      const p = duration ? Math.min(1, (now - began) / duration) : 1;
      const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      item.x = start.x + (target.x - start.x) * e;
      item.y = start.y + (target.y - start.y) * e;
      onStep?.();
      if (p < 1) item.frame = requestAnimationFrame(step);
      else { item.frame = 0; done?.(); }
    };
    item.frame = requestAnimationFrame(step);
  }

  // ---------- 캣타워 ----------
  const tower = document.createElement('button');
  tower.type = 'button';
  tower.className = 'pet-cat-tower';
  tower.dataset.homeAria = '캣타워';
  tower.setAttribute('aria-label', t('캣타워'));
  tower.style.left = TOWER.x + '%';
  tower.style.top = TOWER.y + '%';
  const TOWER_Z = Math.round(TOWER.y * 10) - 5;
  tower.style.zIndex = String(TOWER_Z);
  tower.innerHTML = '<span class="tw-post"></span><span class="tw-floor tw-floor-1"></span><span class="tw-floor tw-floor-2"></span><span class="tw-base"></span>';
  stage.append(tower);
  // 공개 홈페이지에서는 마음에 드는 그림이 들어오기 전까지 임시 모양을 숨겨요(거실 분위기 지키기).
  tower.hidden = isPublic || !FEATURES.catTower;
  probe(ART.tower, path => { tower.style.backgroundImage = 'url("' + path + '")'; tower.classList.add('has-art'); tower.hidden = !FEATURES.catTower; });
  tower.addEventListener('click', event => {
    event.stopPropagation();
    const purr = document.getElementById('purr-sound');
    const asleep = cats.length && cats.every(cat => cat.level && cat.state === 'sleep');
    if (asleep) {
      if (purr && !muted()) { purr.currentTime = 0; purr.volume = .4; purr.play().catch(() => {}); }
      heart(TOWER.x, TOWER_FLOOR.momo.y - 6);
      return;
    }
    napTogether();
  });

  // ---------- 고양이 ----------
  const cats = [];
  function setupCats() {
    const entries = window.roomFamily.pets?.() || [];
    for (const entry of entries) {
      if (!entry?.el || cats.some(cat => cat.id === entry.c.id)) continue;
      const img = entry.el.querySelector('img');
      cats.push({
        id: entry.c.id, c: entry.c, el: entry.el, img,
        sitSrc: entry.c.img, baseWidth: parseFloat(entry.c.w) || 6,
        x: entry.c.x, y: entry.c.y, home: { x: entry.c.x, y: entry.c.y }, state: 'sit', facing: 1, timer: 0, frame: 0,
      });
    }
    if (FEATURES.catsMove) cats.forEach(cat => schedule(cat, 6000 + Math.random() * 10000));
  }

  function placeCat(cat) {
    cat.c.x = cat.x;
    cat.c.y = cat.y;
    cat.el.style.left = cat.x + '%';
    cat.el.style.top = cat.y + '%';
    // 캣타워 위에 있을 때는 타워보다 앞에 보여요.
    cat.el.style.zIndex = String(cat.level ? TOWER_Z + cat.level : Math.round(cat.y * 10));
  }

  function showCat(cat, state, facing = cat.facing) {
    cat.state = state;
    cat.facing = facing;
    const art = ART[cat.id] || {};
    let src = found[art.newSit] || cat.sitSrc;
    let width = cat.baseWidth;
    const side = found[art.newSide] || art.side;
    if (state === 'walk') src = walkFrames(cat)[0] || found[art.walk] || side;
    if (state === 'side') src = side;
    if (state === 'jump') src = found[art.newJump] || side;
    if (state === 'walk' || state === 'side' || state === 'jump') width = cat.baseWidth * (cat.id === 'momo' ? 1.25 : 1.05);
    if (state === 'sleep') { src = found[art.newSleep] || art.sleep; width = cat.baseWidth * 1.5; }
    if (cat.img.getAttribute('src') !== src) cat.img.src = src;
    const front = state === 'sit';
    cat.img.style.aspectRatio = front ? '' : 'auto';
    cat.img.style.scale = front ? '' : (facing < 0 ? '-1 1' : '1 1');
    cat.el.style.width = width + '%';
    cat.el.classList.toggle('pet-side', !front);
    cat.el.classList.toggle('pet-walking', state === 'walk');
    cat.el.classList.toggle('pet-sleeping', state === 'sleep');
    cat.el.classList.toggle('pet-jumping', state === 'jump');
  }

  function busy(cat) {
    return cat.el.classList.contains('is-petted') || document.querySelector('.fam-bubble') || cat.playing;
  }

  function schedule(cat, delay) {
    clearTimeout(cat.timer);
    cat.timer = setTimeout(() => wander(cat), delay);
  }

  function walkCat(cat, target, done) {
    // 캣타워 위에 있으면 먼저 폴짝 내려와요.
    if (cat.level) { leaveTower(cat, () => walkCat(cat, target, done)); return; }
    const facing = target.x < cat.x ? -1 : 1;
    showCat(cat, 'walk', facing);
    // 걷기 동작 그림(walk-1~4)이 있으면 번갈아 보여 줘요.
    const frames = walkFrames(cat);
    clearInterval(cat.walkTimer);
    if (frames.length > 1 && !still()) {
      let i = 0;
      cat.walkTimer = setInterval(() => { cat.img.src = frames[++i % frames.length]; }, 150);
    }
    moveTo(cat, target, 14, () => placeCat(cat), () => { clearInterval(cat.walkTimer); done?.(); });
  }
  function walkFrames(cat) {
    const art = ART[cat.id] || {};
    return [art.walk1, art.walk2, art.walk3, art.walk4].map(path => found[path]).filter(Boolean);
  }

  // 껑충 뛰기: 포물선으로 날아올라(내려)가요.
  function hop(cat, target, height, done) {
    cancelAnimationFrame(cat.frame || 0);
    const start = { x: cat.x, y: cat.y };
    const duration = still() ? 0 : 650;
    const began = performance.now();
    showCat(cat, 'jump', target.x < cat.x ? -1 : 1);
    cat.el.classList.add('pet-hopping');
    const step = now => {
      const p = duration ? Math.min(1, (now - began) / duration) : 1;
      cat.x = start.x + (target.x - start.x) * p;
      cat.y = start.y + (target.y - start.y) * p - Math.sin(Math.PI * p) * height;
      placeCat(cat);
      if (p < 1) cat.frame = requestAnimationFrame(step);
      else { cat.frame = 0; cat.el.classList.remove('pet-hopping'); done?.(); }
    };
    cat.frame = requestAnimationFrame(step);
  }

  function onTower(cat) { return Boolean(cat.level); }
  // 캣타워에 올라가 자기: 세미는 1층, 모모는 2층으로 껑충.
  function napOnTower(cat, then) {
    const floor = TOWER_FLOOR[cat.id] || TOWER_FLOOR.semi;
    if (cat.level === floor.level) { showCat(cat, 'sleep', -1); then?.(); return; }
    walkCat(cat, TOWER_BASE, () => {
      cat.level = floor.level;   // 뛰는 동안에도 타워 앞에 보이게
      tone(520, .12, 'sine', .05, 1.6);
      hop(cat, floor, floor.level === 2 ? 9 : 5, () => {
        showCat(cat, 'sleep', -1);
        then?.();
      });
    });
  }
  function leaveTower(cat, done) {
    hop(cat, TOWER_BASE, cat.level === 2 ? 4 : 3, () => {
      cat.level = 0;
      placeCat(cat);
      done?.();
    });
  }

  // 평소에는 할아버지 옆(모모), 할머니 옆(세미) 원래 자리에 있어요.
  // 캣타워를 누르면 와서 자고, 한참 자고 나면 다시 원래 자리로 돌아가요.
  function atHome(cat) { return !cat.level && Math.hypot(cat.x - cat.home.x, cat.y - cat.home.y) < .5; }
  function goHome(cat) {
    walkCat(cat, cat.home, () => {
      showCat(cat, 'sit', 1);
      schedule(cat, 12000 + Math.random() * 15000);
    });
  }
  function wander(cat) {
    if (still()) return;
    if (busy(cat)) { schedule(cat, 5000); return; }
    if (cat.level || !atHome(cat)) { goHome(cat); return; }
    // 제자리에서 가끔 몸만 돌려 앉아요.
    showCat(cat, cat.state === 'sit' ? 'side' : 'sit', Math.random() < .5 ? -1 : 1);
    schedule(cat, 10000 + Math.random() * 15000);
  }
  // 캣타워를 누르면: 세미는 1층으로, 모모는 껑충 뛰어 2층으로 와서 자요.
  function napTogether() {
    if (tower.hidden) return;
    cats.forEach((cat, i) => {
      clearTimeout(cat.timer);
      if (cat.playing) return;
      cat.timer = setTimeout(() => napOnTower(cat, () => schedule(cat, still() ? 60000 : 50000 + Math.random() * 30000)),
        still() ? 0 : i * 900);
    });
  }

  // ---------- 보리 ----------
  const bori = { x: BORI_HOME.x, y: BORI_HOME.y, state: 'lie', facing: -1, frame: 0, el: null, img: null, icon: null };
  function boriAvailable() {
    return Boolean(found[ART.bori.lie] || found[ART.bori.sit]) || !isPublic;
  }
  function setupBori() {
    if (bori.el || !boriAvailable()) return;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'pet-bori';
    el.dataset.homeAria = '보리';
    el.setAttribute('aria-label', t('보리'));
    const img = document.createElement('img');
    img.alt = '';
    img.draggable = false;
    const icon = document.createElement('span');
    icon.className = 'pet-bori-icon';
    icon.textContent = '🐕';
    el.append(img, icon);
    el.addEventListener('click', event => {
      event.stopPropagation();
      woof();
      el.classList.remove('is-wagging');
      void el.offsetWidth;
      el.classList.add('is-wagging');
      heart(bori.x, bori.y - 9);
      if (bori.state === 'lie') showBori('sit');
    });
    stage.append(el);
    Object.assign(bori, { el, img, icon });
    placeBori();
    showBori('lie');
  }
  function placeBori() {
    if (!bori.el) return;
    bori.el.style.left = bori.x + '%';
    bori.el.style.top = bori.y + '%';
    bori.el.style.zIndex = String(Math.round(bori.y * 10));
  }
  function showBori(state, facing = bori.facing) {
    if (!bori.el) return;
    bori.state = state;
    bori.facing = facing;
    const order = { lie: ['lie', 'sit'], sit: ['sit', 'lie'], run: ['run', 'sit'], carry: ['carry', 'run', 'sit'] }[state];
    const path = order.map(key => found[ART.bori[key]] && ART.bori[key]).find(Boolean);
    bori.img.hidden = !path;
    bori.icon.hidden = Boolean(path);
    if (path && bori.img.getAttribute('src') !== path) bori.img.src = path;
    bori.el.style.setProperty('--facing', facing < 0 ? -1 : 1);
    bori.el.dataset.state = state;
  }

  // ---------- 보리와 같이 책 읽기 ----------
  // 방석에 앉아 책을 펴면 보리가 와서 옆에 엎드려요. 책을 덮거나 일어나면 원래 자리로 돌아가요.
  const READ_SPOT = { x: 63.5, y: 67.5 };   // 방석 왼쪽 앞, 아바타를 바라보는 자리
  let readingWithBori = false;
  function isReading() {
    const open = $('home-story-open');
    return stage.classList.contains('is-resting') && open && !open.hidden;
  }
  function watchReading() {
    if (!bori.el || playing) return;
    const reading = isReading();
    if (reading === readingWithBori) return;
    readingWithBori = reading;
    const target = reading ? READ_SPOT : BORI_HOME;
    cancelAnimationFrame(bori.frame || 0);
    showBori('run', target.x < bori.x ? -1 : 1);
    moveTo(bori, target, 7, placeBori, () => {
      if (readingWithBori) { showBori('sit', 1); setTimeout(() => readingWithBori && showBori('lie', 1), still() ? 0 : 1200); }
      else showBori('lie', -1);
    });
  }
  setInterval(watchReading, 700);

  // ---------- 장난감 ----------
  function toyElement(kind) {
    const toy = document.createElement('span');
    toy.className = 'pet-toy pet-toy-' + kind;
    const path = found[ART[kind]];
    if (path) {
      const image = document.createElement('img');
      image.src = path;
      image.alt = '';
      toy.append(image);
    } else toy.textContent = { ball: '🎾', doll: '🧸', wand: '🪶' }[kind];
    stage.append(toy);
    return toy;
  }

  function avatarSpot() {
    const avatar = $('avatar');
    const x = parseFloat(avatar?.style.left) || 50;
    const y = parseFloat(avatar?.style.top) || 80;
    return { x, y };
  }

  let playing = false;
  function throwForBori(kind) {
    if (playing || !bori.el) return;
    playing = true;
    const from = avatarSpot();
    const target = { x: 50 + Math.random() * 38, y: 72 + Math.random() * 18 };
    const toy = toyElement(kind);
    const toyPos = { x: from.x, y: from.y - 10 };
    const placeToy = () => { toy.style.left = toyPos.x + '%'; toy.style.top = toyPos.y + '%'; toy.style.zIndex = String(Math.round(toyPos.y * 10) + 2); };
    placeToy();
    whoosh();
    // 포물선으로 날아가기
    const start = { ...toyPos };
    const began = performance.now();
    const flight = still() ? 0 : 700;
    const fly = now => {
      const p = flight ? Math.min(1, (now - began) / flight) : 1;
      toyPos.x = start.x + (target.x - start.x) * p;
      toyPos.y = start.y + (target.y - start.y) * p - Math.sin(p * Math.PI) * 18;
      placeToy();
      if (p < 1) requestAnimationFrame(fly);
      else fetchToy();
    };
    requestAnimationFrame(fly);
    function fetchToy() {
      woof();
      showBori('run', target.x < bori.x ? -1 : 1);
      moveTo(bori, { x: target.x, y: target.y + .5 }, 16, placeBori, () => {
        toy.hidden = true;
        const back = avatarSpot();
        const home = { x: Math.max(6, Math.min(94, back.x + (back.x > 50 ? -7 : 7))), y: Math.max(62, Math.min(92, back.y)) };
        showBori('carry', home.x < bori.x ? -1 : 1);
        if (found[ART.bori.carry] === false || !found[ART.bori.carry]) {
          toy.hidden = false;
          toy.classList.add('is-carried');
        }
        moveTo(bori, home, 13, () => {
          placeBori();
          if (!toy.hidden) { toyPos.x = bori.x + bori.facing * 2.5; toyPos.y = bori.y - 4; placeToy(); }
        }, () => {
          toy.classList.remove('is-carried');
          toy.hidden = false;
          toyPos.x = bori.x + bori.facing * 3;
          toyPos.y = bori.y + .5;
          placeToy();
          showBori('sit', back.x < bori.x ? -1 : 1);
          bori.el.classList.remove('is-wagging');
          void bori.el.offsetWidth;
          bori.el.classList.add('is-wagging');
          woof();
          heart(bori.x, bori.y - 9);
          setTimeout(() => {
            toy.classList.add('is-fading');
            setTimeout(() => toy.remove(), 600);
            playing = false;
            setTimeout(() => {
              if (playing) return;
              showBori('run', BORI_HOME.x < bori.x ? -1 : 1);
              moveTo(bori, BORI_HOME, 6, placeBori, () => showBori('lie', -1));
            }, 6000);
          }, 1600);
        });
      });
    }
  }

  function playWithCats() {
    if (playing || !cats.length) return;
    playing = true;
    const spot = { x: 40 + Math.random() * 18, y: 76 + Math.random() * 8 };
    const wand = toyElement('wand');
    wand.style.left = spot.x + '%';
    wand.style.top = (spot.y - 9) + '%';
    wand.style.zIndex = '1500';
    wand.classList.add('is-swinging');
    ting();
    let arrived = 0;
    cats.forEach((cat, i) => {
      clearTimeout(cat.timer);
      cat.playing = true;
      cancelAnimationFrame(cat.frame || 0);
      const target = { x: spot.x + (i ? 4 : -4), y: spot.y };
      walkCat(cat, target, () => {
        showCat(cat, 'jump', spot.x < cat.x ? -1 : 1);
        if (++arrived === cats.length) ting();
        setTimeout(() => {
          showCat(cat, 'side');
          cat.playing = false;
          if (cats.every(c => !c.playing)) {
            wand.classList.add('is-fading');
            setTimeout(() => wand.remove(), 600);
            playing = false;
          }
          schedule(cat, 2500 + Math.random() * 2000);   // 놀고 나면 원래 자리로
        }, still() ? 600 : 3600);
      });
    });
  }

  function heart(x, y) {
    const h = document.createElement('span');
    h.className = 'pet-heart';
    h.textContent = '♥';
    h.style.left = x + '%';
    h.style.top = y + '%';
    stage.append(h);
    setTimeout(() => h.remove(), 1200);
  }

  // ---------- 장난감 바구니 ----------
  const basket = document.createElement('button');
  basket.type = 'button';
  basket.className = 'furniture-target pet-basket-target';
  basket.dataset.homeAria = '장난감 바구니';
  basket.setAttribute('aria-label', t('장난감 바구니'));
  basket.setAttribute('aria-haspopup', 'true');
  const basketLabel = document.createElement('span');
  basketLabel.dataset.homeText = '장난감 바구니';
  basketLabel.textContent = t('장난감 바구니');
  basket.append(basketLabel);
  stage.append(basket);
  basket.hidden = isPublic || !FEATURES.toyBasket;   // 공개판: 바구니 그림이 오기 전엔 숨김
  probe(ART.toyBasket, path => { basket.style.backgroundImage = 'url("' + path + '")'; basket.classList.add('has-art'); basket.hidden = !FEATURES.toyBasket; });

  const menu = document.createElement('div');
  menu.className = 'pet-toy-menu';
  menu.hidden = true;
  menu.setAttribute('role', 'menu');
  stage.append(menu);
  function renderMenu() {
    menu.replaceChildren();
    const options = [['🪶', '낚싯대로 고양이랑 놀기', playWithCats]];
    if (bori.el) options.push(['🎾', '보리에게 공 던지기', () => throwForBori('ball')], ['🧸', '보리에게 인형 던지기', () => throwForBori('doll')]);
    for (const [icon, label, action] of options) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'menuitem');
      b.textContent = icon + ' ' + t(label);
      b.addEventListener('click', event => {
        event.stopPropagation();
        menu.hidden = true;
        action();
      });
      menu.append(b);
    }
  }
  basket.addEventListener('click', event => {
    event.stopPropagation();
    renderMenu();
    menu.hidden = !menu.hidden;
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== basket) menu.hidden = true;
  });

  // ---------- 군고구마 ----------
  const pot = document.createElement('button');
  pot.type = 'button';
  pot.className = 'furniture-target pet-pot-target';
  pot.dataset.homeAria = '군고구마 먹기';
  pot.setAttribute('aria-label', t('군고구마 먹기'));
  const potLabel = document.createElement('span');
  potLabel.dataset.homeText = '군고구마 먹기';
  potLabel.textContent = t('군고구마 먹기');
  pot.append(potLabel);
  stage.append(pot);
  pot.hidden = isPublic;      // 공개판: 군고구마 그림이 오기 전엔 숨김(임시 그림 대신)
  probe(ART.sweetPotato, () => { pot.hidden = false; });
  let eating = false;
  // 감 먹기처럼: 찜기에서 고구마를 집어 → 할머니 → 할아버지께 드리고 → 마지막에 나도 호호 불어 먹어요.
  function snackIcon(path) {
    const piece = document.createElement('span');
    piece.className = 'pet-sweet-potato';
    if (path) {
      const image = document.createElement('img');
      image.src = path;
      image.alt = '';
      piece.append(image);
    } else piece.textContent = '🍠';
    return piece;
  }
  function pct(px, total) { return (px / total * 100) + '%'; }
  // 걸어가는 동안 손에 든 고구마(아바타 들고 가는 그림이 생기기 전 임시)
  let carried = null, carryRaf = 0;
  function startCarry() {
    carried = snackIcon(found[ART.sweetPotato]);
    carried.classList.add('is-carried');
    stage.append(carried);
    const follow = () => {
      const frame = $('frame')?.getBoundingClientRect();
      const box = stage.getBoundingClientRect();
      if (carried && frame && box.width) {
        carried.style.left = pct(frame.left + frame.width * .5 - box.left, box.width);
        carried.style.top = pct(frame.top + frame.height * .56 - box.top, box.height);
      }
      carryRaf = requestAnimationFrame(follow);
    };
    follow();
  }
  function stopCarry() {
    cancelAnimationFrame(carryRaf);
    carried?.remove();
    carried = null;
  }
  // 할머니·할아버지가 고구마를 받아 드세요. 전용 그림(images/pets/grandma-sweet-potato.png 등)이 있으면 그걸 써요.
  function feedElder(id, el, next) {
    const img = el.querySelector('img');
    const own = found[ART.elderEat[id]];
    const before = img?.src;
    let piece = null;
    if (own && img) img.src = own;
    else {
      const rect = el.getBoundingClientRect();
      const box = stage.getBoundingClientRect();
      piece = snackIcon(found[ART.sweetPotato]);
      piece.style.left = pct(rect.left + rect.width * (id === 'grandma' ? .36 : .64) - box.left, box.width);
      piece.style.top = pct(rect.top + rect.height * .43 - box.top, box.height);
      piece.append(steamPuff());
      stage.append(piece);
    }
    tone(330, .2, 'sine', .04, .8);
    setTimeout(() => {
      piece?.remove();
      if (own && img && before) img.src = before;
      next();
    }, still() ? 600 : 1800);
  }
  function steamPuff() {
    const steam = document.createElement('span');
    steam.className = 'pet-steam';
    steam.textContent = '〰';
    return steam;
  }
  pot.addEventListener('click', event => {
    event.stopPropagation();
    if (eating || !window.roomAvatar) return;
    eating = true;
    const done = () => { stopCarry(); eating = false; };
    const serve = window.roomFamily?.serveSnack;
    const started = serve ? serve({
      pickup: POT_APPROACH,
      onPickup: () => { window.roomAvatar.faceToward(POT.x); startCarry(); },
      feed: feedElder,
      eat: finish => { stopCarry(); eatSweetPotato(finish); },
      end: done,
    }) : window.roomAvatar.approach({ ...POT_APPROACH, offsetX: 0, offsetY: 0 }, () => {
      window.roomAvatar.faceToward(POT.x);
      eatSweetPotato(done);
    }, done);
    if (!started) done();
  });
  // 대사 없이, 호호 불어서 먹어요(김이 훅 날아가요).
  function eatSweetPotato(done) {
    const frame = $('frame')?.getBoundingClientRect();
    const box = stage.getBoundingClientRect();
    const piece = snackIcon(found[ART.sweetPotato]);
    piece.classList.add('is-blowing');
    piece.append(steamPuff());
    if (frame) {
      piece.style.left = pct(frame.left + frame.width * .3 - box.left, box.width);
      piece.style.top = pct(frame.top + frame.height * .34 - box.top, box.height);
    }
    stage.append(piece);
    const blow = () => { const puff = document.createElement('span'); puff.className = 'pet-blow'; piece.append(puff); setTimeout(() => puff.remove(), 900); };
    blow(); const second = setTimeout(blow, 700);
    tone(300, .25, 'sine', .05, .8);
    setTimeout(() => { clearTimeout(second); piece.remove(); done(); }, still() ? 1500 : 3400);
  }

  // ---------- 시작 ----------
  function start() {
    setupCats();
    setTimeout(setupBori, 300);
  }
  if (document.readyState === 'complete') start();
  else addEventListener('load', start);
  document.addEventListener('hometextchange', () => {
    basket.setAttribute('aria-label', t('장난감 바구니'));
    pot.setAttribute('aria-label', t('군고구마 먹기'));
    bori.el?.setAttribute('aria-label', t('보리'));
  });

  window.roomPets = { cats, bori, playWithCats, throwForBori, napTogether };
})();
