'use strict';

// 마음 텃밭.
// 꽃: 책 한 권에 한 송이. 주인공 마음으로 끝까지 읽으면 씨앗, 다른 사람 마음으로 하나 읽을 때마다 한 단계 자라요.
// 채소: 물을 줄 때마다 자라고, 수확하면 할머니 시골밥상에 반찬으로 올라가요.
// 읽기 기록은 kitchen.js 가 모아 둔 장부(heartstorybook-reading-ledger-v1)를 읽어요.
(() => {
  const $ = id => document.getElementById(id);
  const t = (text, values) => window.homeText ? window.homeText.t(text, values) : text.replace(/\{(\w+)\}/g, (m, k) => values?.[k] ?? m);
  const localize = data => window.homeText ? window.homeText.localize(data) : data;
  const experience = $('experience');
  const garden = $('garden');
  if (!garden) return;
  const stage = $('garden-stage');
  const fade = $('home-fade');
  const plotsBox = $('garden-plots');
  const speech = $('garden-speech');
  const dialog = $('garden-card');
  const cardBody = $('garden-card-body');
  const canCount = $('garden-cans');
  const avatarBox = $('garden-avatar');
  const figure = avatarBox.querySelector('.kitchen-figure');
  const frameBox = avatarBox.querySelector('.kitchen-frame');
  const sprite = frameBox.querySelector('img');
  const effect = $('garden-effect');

  const art = 'images/garden/';
  const ledgerKey = 'heartstorybook-reading-ledger-v1';
  const stateKey = 'heartstorybook-garden-v1';
  const weatherKey = 'maeum_weather_v1';
  const floor = { left: 5, right: 95, back: 78, front: 94 };
  const door = { x: 6, y: 86 };
  // 꽃밭 6칸(2줄 × 3칸)과 채소밭 3칸의 자리(화면 기준 %).
  const flowerSpots = [
    { x: 16, y: 50 }, { x: 30, y: 50 }, { x: 44, y: 50 },
    { x: 16, y: 66 }, { x: 30, y: 66 }, { x: 44, y: 66 },
  ];
  const vegSpots = [{ x: 64, y: 58 }, { x: 76, y: 58 }, { x: 88, y: 58 }];
  const stageNames = ['빈 밭', '씨앗', '새싹', '꽃'];
  const vegStageNames = ['빈 밭', '갓 심음', '자라는 중', '수확할 때'];

  let plants = { flowers: [], vegetables: { items: [] }, cans: { dailyFromAunt: 1, perReread: 1 } };
  const artFor = {};
  let active = false;
  let visitor = null;
  let still = () => false;
  let entryButton = null;
  let pos = { ...door };
  let facing = 1;
  let pose = 'stand';
  let stepFrame = 0;
  let walking = null;
  let speechTimer = 0;

  // ---------- 저장 ----------
  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function today() {
    const now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  }
  function loadState() {
    const state = readJson(stateKey, {});
    return {
      cansUsed: Number(state.cansUsed) || 0,
      auntGifts: Number(state.auntGifts) || 0,
      auntDay: state.auntDay || '',
      rainDay: state.rainDay || '',
      veg: state.veg || {},
      harvest: state.harvest || {},
      seen: state.seen || {},
      watered: state.watered || {},
      vase: Array.isArray(state.vase) ? state.vase : [],
    };
  }
  let state = loadState();
  function save() {
    try { localStorage.setItem(stateKey, JSON.stringify(state)); } catch {}
  }

  // ---------- 읽기 기록에서 자람 계산 ----------
  function ledger() {
    return readJson(ledgerKey, {});
  }
  function flowerStage(flower) {
    const book = ledger();
    const read = flower.views.map(v => Boolean(book[flower.book + ':' + v.view]));
    if (!read[0] && !read.some(Boolean)) return { stage: 0, read };
    // 주인공 시선을 안 읽고 다른 시선만 읽어도 씨앗부터 시작해요.
    return { stage: Math.min(3, read.filter(Boolean).length), read };
  }
  function cansEarned() {
    const book = ledger();
    let rereads = 0;
    for (const record of Object.values(book)) rereads += Number(record?.rereads) || 0;
    return rereads * (plants.cans.perReread ?? 1) + state.auntGifts;
  }
  function cans() {
    return Math.max(0, cansEarned() - state.cansUsed);
  }
  function showCans() {
    canCount.textContent = t('물뿌리개 {n}개', { n: cans() });
  }

  // ---------- 그림 ----------
  function tryImage(path, done) {
    // 텃밭을 잠가 둔 동안에는 그림을 찾지 않아요(쓸데없는 요청을 줄여 거실이 빨리 떠요).
    if (window.homeFeatures?.garden === false) return;
    const image = new Image();
    image.onload = () => done(path);
    image.src = path;
  }
  function prepare(id) {
    for (const n of [1, 2, 3]) {
      const key = id + '-' + n;
      if (artFor[key] !== undefined) continue;
      artFor[key] = null;
      tryImage(art + key + '.png', path => { artFor[key] = path; if (active) renderPlots(); renderVase(); });
    }
  }
  function plantPicture(id, icons, stageNumber) {
    const box = document.createElement('span');
    box.className = 'garden-plant';
    if (stageNumber <= 0) return box;
    const path = artFor[id + '-' + stageNumber];
    if (path) {
      const image = document.createElement('img');
      image.src = path;
      image.alt = '';
      image.draggable = false;
      box.append(image);
    } else box.textContent = icons[stageNumber - 1] || '';
    box.dataset.stage = String(stageNumber);
    return box;
  }

  fetch('garden-plants.json?v=' + Date.now())
    .then(response => response.ok ? response.json() : Promise.reject(new Error('텃밭 정보를 열 수 없어요.')))
    .then(data => {
      plants = localize(data);
      for (const flower of data.flowers || []) prepare(flower.id);
      for (const veg of data.vegetables?.items || []) prepare(veg.id);
      if (active) renderPlots();
      renderVase();
    })
    .catch(error => console.warn(error));
  for (const [id, file] of [['garden-backdrop', 'garden.png'], ['garden-uncle-art', 'uncle.png'], ['garden-aunt-art', 'aunt.png']]) {
    tryImage(art + file, path => {
      const image = $(id);
      image.src = path;
      image.hidden = false;
      image.parentElement.classList.add('has-art');
      if (id === 'garden-backdrop') stage.classList.add('has-garden-backdrop');
    });
  }

  // ---------- 밭 그리기 ----------
  function renderPlots() {
    plotsBox.replaceChildren();
    (plants.flowers || []).forEach((flower, index) => {
      const spot = flowerSpots[index];
      if (!spot) return;
      const { stage: grown } = flowerStage(flower);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'garden-plot garden-flower';
      button.dataset.plot = flower.id;
      button.dataset.stage = String(grown);
      button.style.left = spot.x + '%';
      button.style.top = spot.y + '%';
      button.setAttribute('aria-label', t('{title} 꽃밭, {stage}', { title: flower.title, stage: t(stageNames[grown]) }));
      button.append(plantPicture(flower.id, flower.icons, grown));
      const label = document.createElement('span');
      label.className = 'garden-plot-label';
      label.textContent = grown === 3 ? flower.name : t(stageNames[grown]);
      button.append(label);
      if (grown > (state.seen[flower.id] || 0)) button.classList.add('is-new');
      if (state.watered[flower.id] === today()) button.classList.add('is-watered');
      button.addEventListener('click', event => {
        event.stopPropagation();
        walkTo({ x: spot.x, y: 82 }, () => openFlower(flower));
      });
      plotsBox.append(button);
    });
    (plants.vegetables?.items || []).forEach((veg, index) => {
      const spot = vegSpots[index];
      if (!spot) return;
      const grown = state.veg[veg.id] || 0;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'garden-plot garden-veg';
      button.dataset.plot = veg.id;
      button.dataset.stage = String(grown);
      button.style.left = spot.x + '%';
      button.style.top = spot.y + '%';
      button.setAttribute('aria-label', t('{name} 밭, {stage}', { name: veg.name, stage: t(vegStageNames[grown]) }));
      button.append(plantPicture(veg.id, veg.icons, grown));
      const label = document.createElement('span');
      label.className = 'garden-plot-label';
      label.textContent = grown ? veg.name : t('빈 밭');
      button.append(label);
      button.addEventListener('click', event => {
        event.stopPropagation();
        walkTo({ x: spot.x, y: 82 }, () => openVeg(veg));
      });
      plotsBox.append(button);
    });
    showCans();
  }

  // ---------- 꽃 카드 ----------
  function button(text, onClick, primary = false) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    if (primary) b.className = 'is-primary';
    b.addEventListener('click', onClick);
    return b;
  }
  function element(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function openFlower(flower) {
    const { stage: grown, read } = flowerStage(flower);
    const firstTime = grown > (state.seen[flower.id] || 0);
    state.seen[flower.id] = grown;
    save();
    cardBody.replaceChildren();
    cardBody.append(element('p', 'garden-card-book', t('『{title}』', { title: flower.title })));
    cardBody.append(element('h2', '', grown === 3 ? t('{name} · 「{meaning}」', { name: flower.name, meaning: flower.meaning }) : t('{name} 밭 · {stage}', { name: flower.name, stage: t(stageNames[grown]) })));
    const list = element('ul', 'garden-views');
    flower.views.forEach((view, i) => {
      const item = element('li', read[i] ? 'is-read' : '');
      item.append(element('b', '', (read[i] ? '✓ ' : '· ') + t('{who}의 마음으로', { who: view.who })));
      item.append(element('span', '', read[i] ? '“' + view.line + '”' : t('아직 읽지 않았어요')));
      list.append(item);
    });
    cardBody.append(list);
    const next = flower.views.find((v, i) => !read[i]);
    const actions = element('div', 'garden-card-actions');
    if (next) {
      cardBody.append(element('p', 'garden-card-hint', grown === 0
        ? t('이 책을 끝까지 읽으면 씨앗을 심을 수 있어요.')
        : t(grown === 2 ? '{who}의 마음으로도 읽어 보면 꽃이 필 거예요.' : '{who}의 마음으로도 읽어 보면 한 뼘 더 자랄 거예요.', { who: next.who })));
      actions.append(button(t('이 책 읽으러 가기'), () => {
        dialog.close();
        window.roomKitchen?.read({ id: flower.book });
      }, true));
    }
    if (grown > 0) actions.append(button(t('물 주기'), () => waterFlower(flower)));
    if (grown === 3) {
      const inVase = state.vase.includes(flower.id);
      actions.append(button(t(inVase ? '거실 화병에서 빼기' : '한 송이 꺾어 거실 화병에 꽂기'), () => {
        state.vase = inVase ? state.vase.filter(id => id !== flower.id) : [...state.vase.filter(id => id !== flower.id), flower.id].slice(-3);
        save();
        renderVase();
        dialog.close();
        if (!inVase) {
          sparkle('💐', 'garden-harvest');
          sayAunt(t('{name} 한 송이, 거실 화병에 꽂아 둘게.', { name: flower.name }));
        }
      }));
    }
    cardBody.append(actions);
    if (!dialog.open) dialog.showModal();
    if (firstTime && grown === 3) {
      sparkle('🌼', 'garden-bloom');
      sayAunt(t('{name:가} 활짝 폈구나.', { name: flower.name }));
    } else if (firstTime && grown > 0) {
      sayUncle(t(grown === 1 ? '씨앗 하나 심었네.' : '새싹 났네.'));
    }
  }

  function useCan() {
    if (cans() <= 0) {
      sayAunt(t('물뿌리개는 이모한테 있어.'));
      return false;
    }
    state.cansUsed += 1;
    save();
    showCans();
    return true;
  }

  function waterFlower(flower) {
    if (!useCan()) return;
    dialog.close();
    state.watered[flower.id] = today();
    save();
    renderPlots();
    sparkle('💧', 'garden-water');
    setTimeout(() => sparkle('🦋', 'garden-butterfly'), still() ? 0 : 700);
    sayUncle(t('시원하겠다.', { name: flower.name }));
  }

  // ---------- 채소 ----------
  function openVeg(veg) {
    const grown = state.veg[veg.id] || 0;
    cardBody.replaceChildren();
    cardBody.append(element('h2', '', t('{name} 밭 · {stage}', { name: veg.name, stage: t(vegStageNames[grown]) })));
    const actions = element('div', 'garden-card-actions');
    if (grown === 0) {
      cardBody.append(element('p', 'garden-card-hint', t('삼촌이랑 같이 심어 볼까요? 물을 줄 때마다 자라요.')));
      actions.append(button(t('심기'), () => {
        state.veg[veg.id] = 1;
        save();
        dialog.close();
        renderPlots();
        sayUncle(t('{name} 심었다. 물 주면 잘 클 거야.', { name: veg.name }));
      }, true));
    } else if (grown < 3) {
      cardBody.append(element('p', 'garden-card-hint', t('물을 {n}번 더 주면 수확할 수 있어요.', { n: 3 - grown })));
      actions.append(button(t('물 주기'), () => {
        if (!useCan()) return;
        state.veg[veg.id] = grown + 1;
        save();
        dialog.close();
        renderPlots();
        sparkle('💧', 'garden-water');
        sayUncle(grown + 1 === 3 ? t('{name} 다 컸네. 따 볼까?', { name: veg.name }) : t('잘 크고 있네.'));
      }, true));
    } else {
      const dish = veg.dish;
      cardBody.append(element('p', 'garden-card-hint', (window.homeFeatures?.kitchen === false ? t('수확해서 할머니께 갖다 드려요.') : t('수확하면 할머니 시골밥상에 「{dish}」이 올라가요.', { dish: dish?.name || veg.name }))));
      actions.append(button(t('수확하기'), () => {
        state.veg[veg.id] = 0;
        state.harvest[veg.id] = (state.harvest[veg.id] || 0) + 1;
        save();
        dialog.close();
        renderPlots();
        sparkle(veg.icons?.[2] || '🧺', 'garden-harvest');
        sayAunt(t('{name} 땄구나. 할머니 갖다 드리자.', { name: veg.name }));
      }, true));
    }
    cardBody.append(actions);
    if (!dialog.open) dialog.showModal();
  }

  // ---------- 거실 화병 ----------
  // 텃밭에서 핀 꽃을 꺾으면 거실 탁자 화병에 꽂혀요(최대 3송이).
  // 화병 그림은 images/garden/vase.png, 꽂힌 꽃은 각 꽃의 (id)-3.png 를 써요. 없으면 임시 그림.
  function renderVase() {
    const room = $('stage');
    if (!room) return;
    let vase = $('room-vase');
    const ids = loadState().vase;
    const flowers = ids.map(id => (plants.flowers || []).find(f => f.id === id)).filter(Boolean);
    if (!flowers.length) { vase?.remove(); return; }
    if (!vase) {
      vase = document.createElement('div');
      vase.id = 'room-vase';
      vase.className = 'room-vase';
      vase.setAttribute('aria-hidden', 'true');
      room.append(vase);
    }
    vase.replaceChildren();
    const bunch = element('span', 'room-vase-flowers');
    flowers.forEach((flower, i) => {
      const stem = element('span', 'room-vase-flower');
      stem.style.setProperty('--tilt', (i - (flowers.length - 1) / 2) * 18 + 'deg');
      const path = artFor[flower.id + '-3'];
      if (path) {
        const image = document.createElement('img');
        image.src = path;
        image.alt = '';
        stem.append(image);
      } else stem.textContent = flower.icons?.[2] || '🌼';
      bunch.append(stem);
    });
    vase.append(bunch);
    const pot = element('span', 'room-vase-pot');
    tryImage(art + 'vase.png', path => {
      pot.style.backgroundImage = 'url("' + path + '")';
      pot.classList.add('has-art');
    });
    vase.append(pot);
  }

  // ---------- 거실의 삼촌, 이모 ----------
  // images/family/uncle-sit.png, aunt-sit.png 가 있으면 거실에 앉아 있어요. 그림이 없으면 나오지 않아요.
  // 자리(x, y: 발끝 위치 %, h: 키 %)는 그림이 들어온 뒤 맞춰요.
  const relatives = [
    { id: 'uncle', who: '삼촌', x: 21, y: 75, h: 30, lines: ['텃밭에 상추 심어 놨어. 같이 가 볼래?', '여기 앉아 있으면 잠이 솔솔 와.', '천천히 읽어. 서두를 거 없어.'] },
    { id: 'aunt', who: '이모', x: 62, y: 77, h: 28, lines: ['이모는 여기서 책 읽는 게 제일 좋더라.', '꽃이 피면 거실 화병에 꽂아 두자.', '창밖 햇살 좀 봐. 참 좋다.'] },
  ];
  let relativeTimer = 0;
  function renderRelatives() {
    const room = $('stage');
    if (!room) return;
    for (const person of relatives) {
      if ($('room-' + person.id)) continue;
      tryImage('images/family/' + person.id + '-sit.png', path => {
        if ($('room-' + person.id)) return;
        const seat = document.createElement('button');
        seat.type = 'button';
        seat.id = 'room-' + person.id;
        seat.className = 'room-relative';
        seat.style.left = person.x + '%';
        seat.style.top = person.y + '%';
        seat.style.height = person.h + '%';
        seat.style.zIndex = String(Math.round(person.y * 10));
        seat.dataset.homeAria = person.who;
        seat.setAttribute('aria-label', t(person.who));
        const image = document.createElement('img');
        image.src = path;
        image.alt = '';
        image.draggable = false;
        seat.append(image);
        let turn = 0;
        seat.addEventListener('click', event => {
          event.stopPropagation();
          const line = turn % 3 === 2 ? hint() : t(person.lines[turn % person.lines.length]);
          turn += 1;
          let bubble = $('room-relative-bubble');
          if (!bubble) {
            bubble = element('p', 'room-relative-bubble');
            bubble.id = 'room-relative-bubble';
            bubble.setAttribute('role', 'status');
            room.append(bubble);
          }
          bubble.replaceChildren(element('b', '', t(person.who) + ' '), document.createTextNode(line));
          bubble.style.left = person.x + '%';
          bubble.style.top = Math.max(4, person.y - person.h - 8) + '%';
          bubble.hidden = false;
          clearTimeout(relativeTimer);
          relativeTimer = setTimeout(() => { bubble.hidden = true; }, 5200);
        });
        room.append(seat);
      });
    }
  }
  renderRelatives();

  // ---------- 삼촌, 이모 ----------
  function say(who, text, time = 4600) {
    clearTimeout(speechTimer);
    speech.textContent = '';
    speech.append(element('b', '', who + ' '), document.createTextNode(text));
    speech.hidden = false;
    speechTimer = setTimeout(() => { speech.hidden = true; }, still() ? Math.max(time, 5000) : time);
  }
  const sayUncle = text => say(t('삼촌'), text);
  const sayAunt = text => say(t('이모'), text);

  function hint() {
    for (const flower of plants.flowers || []) {
      const { stage: grown, read } = flowerStage(flower);
      if (grown > 0 && grown < 3) {
        const next = flower.views.find((v, i) => !read[i]);
        return t('{who} 마음으로 읽으면 {name:가} 더 자란대.', { title: flower.title, who: next.who, name: flower.name });
      }
    }
    const empty = (plants.flowers || []).find(f => flowerStage(f).stage === 0);
    if (empty) return t('빈 밭은 천천히 채우면 돼.', { title: empty.title });
    return t('꽃이 다 폈네. 고맙다.');
  }

  $('garden-aunt').addEventListener('click', event => {
    event.stopPropagation();
    if (state.auntDay !== today()) {
      state.auntDay = today();
      state.auntGifts += plants.cans?.dailyFromAunt ?? 1;
      save();
      showCans();
      sayAunt(t('물뿌리개 하나 줄게.'));
      sparkle('🪣', 'garden-can');
    } else sayAunt(hint());
  });
  $('garden-uncle').addEventListener('click', event => {
    event.stopPropagation();
    sayUncle(hint());
  });

  // 비 오는 날(거실 라디오 날씨)에는 채소에 물이 저절로 줘져요.
  function rainCheck() {
    let weather = '';
    try { weather = localStorage.getItem(weatherKey) || ''; } catch {}
    stage.dataset.weather = weather;
    if (weather !== 'rainy' || state.rainDay === today()) return false;
    state.rainDay = today();
    let grew = false;
    for (const veg of plants.vegetables?.items || []) {
      const grown = state.veg[veg.id] || 0;
      if (grown > 0 && grown < 3) { state.veg[veg.id] = grown + 1; grew = true; }
    }
    save();
    if (grew) setTimeout(() => sayUncle(t('비 덕분에 채소가 물 마셨네.')), 900);
    return grew;
  }

  function sparkle(symbol, kind) {
    const spark = element('span', 'garden-spark ' + kind, symbol);
    spark.style.left = pos.x + '%';
    spark.style.top = (pos.y - 18) + '%';
    effect.append(spark);
    setTimeout(() => spark.remove(), still() ? 900 : 1600);
  }

  // ---------- 아바타 (부엌과 같은 방식, 원근감 크기 조정 없음) ----------
  function standingHeight() {
    return stage.clientHeight * (visitor?.height ?? .42) * .95;
  }
  function draw() {
    if (!visitor) return;
    avatarBox.style.left = pos.x + '%';
    avatarBox.style.top = pos.y + '%';
    avatarBox.style.zIndex = String(Math.round(pos.y * 10));
    const standing = visitor.frames[0];
    const scale = standingHeight() / (standing.baseline ?? standing.height);
    const index = pose === 'walk' ? [0, 1, 0, 2][stepFrame % 4] : 0;
    const frame = visitor.frames[index] || standing;
    const baseline = frame.baseline ?? frame.height;
    const image = 'images/' + visitor.atlas + '.webp';
    if (sprite.getAttribute('src') !== image) sprite.src = image;
    sprite.style.width = 1024 * scale + 'px';
    sprite.style.height = 1536 * scale + 'px';
    sprite.style.left = -frame.x * scale + 'px';
    sprite.style.top = -frame.y * scale + 'px';
    frameBox.style.width = frame.width * scale + 'px';
    frameBox.style.height = frame.height * scale + 'px';
    frameBox.style.left = -frame.width / 2 * scale + 'px';
    frameBox.style.top = -baseline * scale + 'px';
    figure.style.transform = 'scaleX(' + facing + ')';
    avatarBox.style.setProperty('--shadow-width', standingHeight() * .43 + 'px');
    avatarBox.style.setProperty('--shadow-height', standingHeight() * .08 + 'px');
  }
  function walkTo(target, after) {
    cancelAnimationFrame(walking?.frame || 0);
    const goal = {
      x: Math.max(floor.left, Math.min(floor.right, target.x)),
      y: Math.max(floor.back, Math.min(floor.front, target.y)),
    };
    const width = stage.clientWidth || 1;
    const height = stage.clientHeight || 1;
    const dx = (goal.x - pos.x) / 100 * width;
    const dy = (goal.y - pos.y) / 100 * height;
    const length = Math.hypot(dx, dy);
    if (Math.abs(dx) > 1) facing = dx < 0 ? -1 : 1;
    if (still() || length < 3) {
      pos = goal; pose = 'stand'; draw(); after?.(); return;
    }
    const start = { ...pos };
    const duration = length / (width * .22) * 1000;
    const began = performance.now();
    pose = 'walk';
    walking = { frame: 0 };
    const step = now => {
      const t = Math.min(1, (now - began) / duration);
      const ease = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      pos = { x: start.x + (goal.x - start.x) * ease, y: start.y + (goal.y - start.y) * ease };
      stepFrame = Math.floor((now - began) / 140);
      if (t >= 1) { walking = null; pose = 'stand'; draw(); after?.(); return; }
      draw();
      walking.frame = requestAnimationFrame(step);
    };
    walking.frame = requestAnimationFrame(step);
  }

  // ---------- 들어가고 나가기 ----------
  function transition(swap) {
    if (still()) { swap(); return; }
    fade.hidden = false;
    requestAnimationFrame(() => fade.classList.add('is-dark'));
    setTimeout(() => {
      swap();
      fade.classList.remove('is-dark');
      setTimeout(() => { fade.hidden = true; }, 420);
    }, 420);
  }

  function enter(currentVisitor, button, stillMotion) {
    if (active) return;
    visitor = currentVisitor;
    entryButton = button;
    if (typeof stillMotion === 'function') still = stillMotion;
    state = loadState();
    transition(() => {
      active = true;
      experience.hidden = true;
      garden.hidden = false;
      pos = { ...door };
      facing = 1;
      pose = 'stand';
      renderPlots();
      draw();
      const rained = rainCheck();
      if (rained) renderPlots();
      const blooming = (plants.flowers || []).some(f => flowerStage(f).stage > (state.seen[f.id] || 0));
      sayAunt(t(blooming ? '왔니. 밭에 뭐가 났나 같이 볼까?' : '왔니. 천천히 둘러보렴.'));
    });
  }

  function leave() {
    if (!active) return;
    if (dialog.open) dialog.close();
    walkTo(door, () => transition(() => {
      active = false;
      speech.hidden = true;
      garden.hidden = true;
      experience.hidden = false;
      window.dispatchEvent(new Event('resize'));
      entryButton?.focus({ preventScroll: true });
    }));
  }

  $('garden-return').addEventListener('click', event => {
    event.stopPropagation();
    leave();
  });
  stage.addEventListener('click', event => {
    if (!active || dialog.open || event.target.closest('button')) return;
    const box = stage.getBoundingClientRect();
    walkTo({ x: (event.clientX - box.left) / box.width * 100, y: (event.clientY - box.top) / box.height * 100 });
  });
  document.addEventListener('hometextchange', () => {
    localize(plants);
    if (active) renderPlots();
    renderVase();
    showCans();
  });
  addEventListener('resize', () => { if (active) draw(); });
  addEventListener('pageshow', () => { state = loadState(); if (active) renderPlots(); });

  // 가장 최근에 끝까지 읽은 책(밥상머리 대화에 써요).
  function lastRead() {
    const book = ledger();
    let best = null;
    for (const [key, record] of Object.entries(book)) {
      const day = record?.rewarded || record?.first || '';
      if (!best || day > best.day) best = { key, day };
    }
    if (!best) return null;
    const [bookId, view] = best.key.split(':');
    const flower = (plants.flowers || []).find(f => f.book === bookId);
    if (!flower) return null;
    const read = flower.views.find(v => v.view === view);
    const other = flower.views.find(v => v.view !== view && !book[bookId + ':' + v.view]) || flower.views.find(v => v.view !== view);
    return { book: bookId, title: flower.title, who: read?.who, other: other?.who, flower: flower.name };
  }

  // 공개판에서 텃밭을 꺼 두면 거실의 '텃밭 가기' 버튼을 숨겨요(home-features.js).
  if (window.homeFeatures?.garden === false) {
    const entry = $('garden-entry');
    if (entry) entry.hidden = true;
  }

  window.roomGarden = {
    lastRead,
    active: () => active,
    enter,
    leave,
    harvest: () => ({ ...loadState().harvest }),
    vegetables: () => plants.vegetables?.items || [],
  };
})();
