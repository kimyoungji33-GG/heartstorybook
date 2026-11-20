'use strict';

// 할머니 댁 부엌과 아랫목.
// 부엌: 간식 선반(시골 간식), 냉장고(도시 간식), 주전자(차와 주스). 모두 무료.
// 아랫목: 소반 위에 그릇을 하나씩 올려 차리는 밥상. 그릇을 누르면 소개와 소리, 숟가락·젓가락으로 먹기.
// 메뉴는 kitchen-menu.json, 그림은 images/kitchen/(id).png, 소리는 sfx/kitchen/(id).mp3 에서 불러와요.
(() => {
  const $ = id => document.getElementById(id);
  const t = (text, values) => window.homeText ? window.homeText.t(text, values) : text.replace(/\{(\w+)\}/g, (m, k) => values?.[k] ?? m);
  const localize = data => window.homeText ? window.homeText.localize(data) : data;
  const experience = $('experience');
  const kitchen = $('kitchen');
  const stage = $('kitchen-stage');
  const heading = $('kitchen-heading');
  const fade = $('home-fade');
  const avatarBox = $('kitchen-avatar');
  const figure = avatarBox.querySelector('.kitchen-figure');
  const frameBox = avatarBox.querySelector('.kitchen-frame');
  const sprite = frameBox.querySelector('img');
  const eatArt = avatarBox.querySelector('.kitchen-eat-art');
  const bite = avatarBox.querySelector('.kitchen-bite');
  const utensil = avatarBox.querySelector('.kitchen-utensil');
  const speech = $('kitchen-speech');
  const menu = $('kitchen-menu');
  const menuTitle = $('kitchen-menu-title');
  const menuNote = $('kitchen-menu-note');
  const foodsBox = $('kitchen-foods');
  const grandma = $('kitchen-grandma');
  const sobanDishes = $('soban-dishes');
  const sobanArt = $('soban-art');

  const art = 'images/kitchen/';
  const sfx = 'sfx/kitchen/';
  const starKey = 'heartstorybook-heart-stars-v1';
  const readingEventsKey = 'heartstorybook-reading-events-v1';
  const readingLedgerKey = 'heartstorybook-reading-ledger-v1';
  const publicReader = 'https://kimyoungji33-gg.github.io/heartstorybook/book-reader.html';

  // 화면마다 걸을 수 있는 바닥과 주요 자리(화면 기준 %).
  const scenes = {
    kitchen: {
      title: '할머니 댁 부엌',
      floor: { left: 6, right: 94, back: 76, front: 94 },
      spots: {
        door: { x: 7, y: 86 },
        shelf: { x: 13, y: 80 },
        fridge: { x: 27, y: 80 },
        grandma: { x: 58, y: 82 },
        drinks: { x: 80, y: 82 },
        araet: { x: 92, y: 82 },
      },
    },
    araet: {
      title: '아랫목',
      floor: { left: 6, right: 94, back: 82, front: 94 },
      spots: { door: { x: 8, y: 88 }, seat: { x: 24, y: 90 } },
    },
  };

  let menuData = { drinks: { items: [] }, shelf: { items: [] }, fridge: { items: [] }, meals: { items: [] }, stars: {} };
  const artFor = {};
  let starsOn = false;
  let rewards = { firstRead: 2, rereadDaily: 1 };

  let active = false;
  let scene = 'kitchen';
  let visitor = null;
  let still = () => false;
  let entryButton = null;
  let pos = { ...scenes.kitchen.spots.door };
  let facing = 1;
  let pose = 'stand';
  let stepFrame = 0;
  let walking = null;
  let busy = false;
  let speechTimer = 0;
  let mealIndex = 0;
  let eatTimer = 0;
  let lying = false;
  let lieArtPath = null;
  const restTimers = [];

  // ---------- 그림과 소리 ----------
  function tryImage(path, done) {
    // 부엌을 꺼 둔 공개판에서는 그림을 찾지 않아요(쓸데없는 요청을 줄여 거실이 빨리 떠요).
    if (window.homeFeatures?.kitchen === false) return;
    const image = new Image();
    image.onload = () => done(path);
    image.src = path;
  }
  function prepareArt(item) {
    if (!item?.id || artFor[item.id] !== undefined) return;
    artFor[item.id] = null;
    tryImage(art + item.id + '.png', path => {
      artFor[item.id] = path;
      if (menu.open) refreshMenu();
      if (scene === 'araet') renderSoban();
    });
  }
  function picture(item, className) {
    const box = document.createElement('span');
    box.className = className;
    box.setAttribute('aria-hidden', 'true');
    if (artFor[item.id]) {
      const image = document.createElement('img');
      image.src = artFor[item.id];
      image.alt = '';
      image.draggable = false;
      box.append(image);
    } else box.textContent = item.icon || '🍽️';
    return box;
  }

  // 소리 파일이 있으면 그 소리를, 없으면 간단한 소리를 만들어 내요.
  let audio = null;
  const soundFiles = {};
  function muted() {
    return false;
  }
  function playSound(item) {
    if (muted()) return;
    const file = sfx + item.id + '.mp3';
    if (soundFiles[file] === undefined) {
      const probe = new Audio();
      probe.preload = 'auto';
      probe.oncanplaythrough = () => { soundFiles[file] = true; };
      probe.onerror = () => { soundFiles[file] = false; };
      probe.src = file;
      soundFiles[file] = null;
    }
    if (soundFiles[file]) {
      const player = new Audio(file);
      player.volume = .7;
      player.play().catch(() => {});
      return;
    }
    synth(item.sound || 'chew');
  }
  function synth(kind) {
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      const now = audio.currentTime;
      const out = audio.createGain();
      out.gain.value = .18;
      out.connect(audio.destination);
      const tone = (freq, start, length, type = 'sine', volume = 1, slide = 0) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + start);
        if (slide) osc.frequency.exponentialRampToValueAtTime(freq * slide, now + start + length);
        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(volume, now + start + .01);
        gain.gain.exponentialRampToValueAtTime(.001, now + start + length);
        osc.connect(gain).connect(out);
        osc.start(now + start);
        osc.stop(now + start + length + .02);
      };
      const noise = (start, length, volume = 1, high = 1800) => {
        const buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * length), audio.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const source = audio.createBufferSource();
        const filter = audio.createBiquadFilter();
        const gain = audio.createGain();
        filter.type = 'bandpass';
        filter.frequency.value = high;
        gain.gain.value = volume;
        source.buffer = buffer;
        source.connect(filter).connect(gain).connect(out);
        source.start(now + start);
      };
      if (kind === 'bubble') for (let i = 0; i < 6; i++) tone(180 + Math.random() * 160, i * .09, .08, 'sine', .8, 1.8);
      else if (kind === 'crunch') for (let i = 0; i < 4; i++) noise(i * .07, .05, 1.4, 2600 + Math.random() * 1500);
      else if (kind === 'slurp') { noise(0, .35, .9, 900); tone(500, 0, .35, 'sine', .25, .6); }
      else if (kind === 'pour') { noise(0, .7, .7, 1400); tone(700, .05, .6, 'sine', .15, 1.6); }
      else if (kind === 'lick') { tone(600, 0, .12, 'triangle', .4, 1.4); tone(640, .18, .12, 'triangle', .4, 1.4); }
      else if (kind === 'snore') { tone(110, 0, .9, 'sine', .7, .7); tone(95, 1.1, 1, 'sine', .6, .75); }
      else if (kind === 'clink') { tone(1800, 0, .25, 'triangle', .5); tone(2400, .02, .2, 'triangle', .3); }
      else for (let i = 0; i < 3; i++) noise(i * .14, .08, .8, 700);
    } catch {}
  }

  // ---------- 마음 별 (지금은 꺼 둠, 기록은 계속 남겨요) ----------
  function readStars() {
    try {
      const raw = localStorage.getItem(starKey);
      const value = Number(raw);
      return raw !== null && Number.isFinite(value) ? Math.max(0, value) : 5;
    } catch { return 5; }
  }
  let stars = readStars();
  function setStars(value) {
    stars = Math.max(0, value);
    try { localStorage.setItem(starKey, String(stars)); } catch {}
    showStars();
  }
  function showStars() {
    for (const output of document.querySelectorAll('[data-home-stars]')) {
      output.textContent = t('마음 별 {n}개', { n: stars });
      output.hidden = !starsOn;
    }
  }

  // ---------- 메뉴 불러오기 ----------
  fetch('kitchen-menu.json?v=' + Date.now())
    .then(response => response.ok ? response.json() : Promise.reject(new Error('메뉴를 열 수 없어요.')))
    .then(data => {
      menuData = localize(data);
      starsOn = Boolean(data.stars?.enabled);
      rewards = {
        firstRead: Math.max(0, Number(data.stars?.firstRead) || 0),
        rereadDaily: Math.max(0, Number(data.stars?.rereadDaily) || 0),
      };
      for (const group of ['drinks', 'shelf', 'fridge']) for (const item of data[group]?.items || []) prepareArt(item);
      for (const meal of data.meals?.items || []) {
        prepareArt({ id: 'soban-' + meal.id });
        for (const line of meal.flyer?.lines || []) prepareArt({ id: 'flyer-' + line.dish });
        for (const dish of meal.dishes || []) prepareArt(dish);
      }
      for (const member of data.family?.members || []) prepareArt({ id: 'family-' + member.id });
      showStars();
      $('spot-shelf').hidden = !(data.shelf?.items || []).length;
      $('spot-fridge').hidden = !(data.fridge?.items || []).length;
      collectReading();
    })
    .catch(error => console.warn(error));

  tryImage(art + 'grandma.png', path => { grandma.querySelector('img').src = path; grandma.classList.add('has-art'); });
  tryImage(art + 'menu-board.png', path => {
    menu.style.setProperty('--menu-board', 'url("' + path + '")');
    menu.classList.add('has-board');
  });
  for (const [id, file] of [['kitchen-backdrop', 'kitchen.png'], ['araet-backdrop', 'araetmok.png']]) {
    tryImage(art + file, path => {
      const image = $(id);
      image.src = path;
      image.hidden = false;
      stage.classList.add('has-' + id);
    });
  }

  // ---------- 아바타 ----------
  function standingHeight() {
    return stage.clientHeight * (visitor?.height ?? .42) * (scene === 'araet' ? 1.05 : .95);
  }

  function draw() {
    if (!visitor) return;
    avatarBox.style.left = pos.x + '%';
    avatarBox.style.top = pos.y + '%';
    avatarBox.style.zIndex = String(Math.round(pos.y * 10));
    const standing = visitor.frames[0];
    const scale = standingHeight() / (standing.baseline ?? standing.height);
    const index = pose === 'sit' ? 3 : pose === 'walk' ? [0, 1, 0, 2][stepFrame % 4] : 0; // 누울 때(lie)는 선 그림을 눕혀요
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
    figure.style.transform = pose === 'lie' ? 'rotate(-90deg)' : 'scaleX(' + facing + ')';
    avatarBox.style.setProperty('--figure-height', frame.height * scale + 'px');
    avatarBox.style.setProperty('--shadow-width', standingHeight() * .43 + 'px');
    avatarBox.style.setProperty('--shadow-height', standingHeight() * .08 + 'px');
    avatarBox.classList.toggle('is-sitting', pose === 'sit');
    avatarBox.classList.toggle('is-lying', pose === 'lie');
    if (pose === 'lie' && lieArtPath) {
      // 누운 모습 그림(images/kitchen/lie-(아바타).png)이 있으면 눕힌 선 그림 대신 보여 줘요.
      figure.style.transform = '';
      const h = standingHeight() * .42;
      eatArt.src = lieArtPath;
      eatArt.hidden = false;
      frameBox.style.visibility = 'hidden';
      eatArt.style.height = h + 'px';
      eatArt.style.left = -standingHeight() * .98 + 'px';
      eatArt.style.top = -h * .92 + 'px';
      return;
    }
    // 먹는 모습 그림(images/kitchen/eat-(아바타)-(spoon|chopsticks).png)이 있으면 그걸 보여 줘요.
    if (!eatArt.hidden) {
      eatArt.style.height = frame.height * scale * 1.02 + 'px';
      eatArt.style.left = -frame.width / 2 * scale + 'px';
      eatArt.style.top = -baseline * scale + 'px';
    }
  }

  function clampToFloor(point) {
    const floor = scenes[scene].floor;
    return {
      x: Math.max(floor.left, Math.min(floor.right, point.x)),
      y: Math.max(floor.back, Math.min(floor.front, point.y)),
    };
  }

  function walkTo(target, after) {
    cancelAnimationFrame(walking?.frame || 0);
    clearEating();
    const goal = clampToFloor(target);
    const width = stage.clientWidth || 1;
    const height = stage.clientHeight || 1;
    const dx = (goal.x - pos.x) / 100 * width;
    const dy = (goal.y - pos.y) / 100 * height;
    const length = Math.hypot(dx, dy);
    if (Math.abs(dx) > 1) facing = dx < 0 ? -1 : 1;
    if (pose === 'sit') pose = 'stand';
    if (still() || length < 3) {
      pos = goal;
      pose = 'stand';
      draw();
      after?.();
      return;
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
      if (t >= 1) {
        walking = null;
        pose = 'stand';
        draw();
        after?.();
        return;
      }
      draw();
      walking.frame = requestAnimationFrame(step);
    };
    walking.frame = requestAnimationFrame(step);
  }

  function face(direction) {
    facing = direction;
    draw();
  }

  function say(text, time = 4200) {
    clearTimeout(speechTimer);
    speech.textContent = text;
    speech.hidden = false;
    speechTimer = setTimeout(() => { speech.hidden = true; }, still() ? Math.max(time, 5000) : time);
  }

  // ---------- 먹고 마시기 ----------
  function clearEating() {
    clearTimeout(eatTimer);
    avatarBox.classList.remove('is-eating', 'is-scooping');
    bite.hidden = true;
    utensil.hidden = true;
    eatArt.hidden = true;
    frameBox.style.visibility = '';
  }

  function showEatArt(kind) {
    if (!visitor) return false;
    const path = art + 'eat-' + visitor.id + '-' + kind + '.png';
    if (artFor[path] === undefined) {
      artFor[path] = null;
      tryImage(path, found => { artFor[path] = found; });
      return false;
    }
    if (!artFor[path]) return false;
    eatArt.src = artFor[path];
    eatArt.hidden = false;
    frameBox.style.visibility = 'hidden';
    draw();
    return true;
  }

  // 간식과 음료: 서서 먹어요.
  function snack(item, group) {
    clearEating();
    bite.replaceChildren(picture(item, 'kitchen-bite-art'));
    bite.hidden = false;
    avatarBox.classList.add('is-eating');
    playSound(item);
    const kind = group === 'drinks' ? 'cup' : 'hand';
    showEatArt(kind);
    say(item.line || t('맛있게 먹으렴.'), 5200);
    eatTimer = setTimeout(() => {
      clearEating();
      draw();
    }, still() ? 1500 : 3200);
  }

  // 밥상 그릇: 앉아서 숟가락이나 젓가락으로 떠먹어요.
  function eatDish(dish, button) {
    if (busy) return;
    if (lying) getUp(true);
    clearEating();
    if (dish.talk?.line) sayWho(dish.talk.who, dish.talk.line, 4200);
    else say(t(dish.fromGarden ? '텃밭에서 딴 {name} · {intro}' : '{name} · {intro}', { name: dish.name, intro: dish.intro || '' }), 3600);
    playSound(dish);
    const kind = dish.utensil === 'spoon' ? 'spoon' : 'chopsticks';
    utensil.textContent = kind === 'spoon' ? '🥄' : '🥢';
    utensil.hidden = false;
    bite.replaceChildren(picture(dish, 'kitchen-bite-art'));
    bite.hidden = false;
    avatarBox.classList.add('is-scooping');
    button?.classList.add('is-tasted');
    showEatArt(kind);
    eatTimer = setTimeout(() => {
      clearEating();
      draw();
    }, still() ? 1200 : 2400);
  }

  // ---------- 고르기 창 (간식 선반, 냉장고, 차와 주스) ----------
  let menuGroup = null;
  function refreshMenu() {
    if (!menuGroup) return;
    const group = menuData[menuGroup] || { items: [] };
    menuTitle.textContent = group.title || t(menuGroup === 'drinks' ? '차와 주스' : '간식');
    menuNote.textContent = menuGroup === 'drinks'
      ? t('모두 무료예요. 몇 잔이든 마셔도 돼요.')
      : t('모두 무료예요. 먹고 싶은 걸 꺼내 먹어요.');
    foodsBox.replaceChildren();
    for (const item of group.items || []) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'kitchen-food';
      button.dataset.food = item.id;
      button.append(picture(item, 'kitchen-food-icon'));
      const name = document.createElement('span');
      name.className = 'kitchen-food-name';
      name.textContent = item.name;
      button.append(name);
      button.addEventListener('click', () => {
        menu.close();
        snack(item, menuGroup);
      });
      foodsBox.append(button);
    }
  }

  function openStore(group, spot, faceDirection) {
    if (busy || !active || scene !== 'kitchen') return;
    walkTo(scenes.kitchen.spots[spot], () => {
      face(faceDirection);
      menuGroup = group;
      refreshMenu();
      playSound({ id: 'open-' + group, sound: group === 'drinks' ? 'clink' : 'chew' });
      if (!menu.open) menu.showModal();
    });
  }

  // ---------- 밥상 차리기 ----------
  function meals() {
    return menuData.meals?.items || [];
  }

  // 메뉴판 없이 할머니가 그냥 밥상을 차려 줘요. 고르는 것도, 주문하는 것도 없어요.
  function askMeal() {
    if (busy || !active || scene !== 'kitchen') return;
    walkTo(scenes.kitchen.spots.grandma, () => {
      face(1);
      mealIndex = 0;
      say(t('밥 먹자~ 아랫목에 상 차려 놨다. 다들 기다린다, 어서 들어가렴.'), 3000);
      setTimeout(() => goAraet(), still() ? 300 : 1300);
    });
  }

  function renderSoban() {
    const meal = meals()[mealIndex];
    sobanDishes.replaceChildren();
    const base = meal && artFor['soban-' + meal.id];
    sobanArt.hidden = !base;
    if (base) sobanArt.src = base;
    $('araet-flyer').hidden = !meal?.flyer;
    $('araet-change').hidden = meals().length < 2;
    renderFamily();
    if (!meal) return;
    for (const dish of [...(meal.dishes || []), ...gardenDishes(meal)]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'soban-dish';
      button.dataset.dish = dish.id;
      button.style.left = (dish.x ?? 50) + '%';
      button.style.top = (dish.y ?? 50) + '%';
      button.setAttribute('aria-label', t('{name} 먹기', { name: dish.name }));
      button.append(picture(dish, 'soban-dish-art'));
      const label = document.createElement('span');
      label.className = 'soban-dish-name';
      label.textContent = dish.name;
      button.append(label);
      if (dish.fromGarden) {
        button.classList.add('is-garden');
        label.textContent = '🌱 ' + dish.name;
        prepareArt(dish);
      }
      button.addEventListener('click', event => {
        event.stopPropagation();
        eatDish(dish, button);
      });
      sobanDishes.append(button);
    }
  }

  // 텃밭에서 수확한 채소는 할머니 시골밥상에 반찬으로 올라가요.
  const gardenSeats = [{ x: 4, y: 34 }, { x: 4, y: 64 }, { x: 96, y: 52 }];
  function gardenDishes(meal) {
    if (meal.id !== 'country' || !window.roomGarden) return [];
    const harvest = window.roomGarden.harvest();
    return window.roomGarden.vegetables()
      .filter(veg => harvest[veg.id] > 0 && veg.dish)
      .map((veg, i) => ({ ...veg.dish, ...gardenSeats[i % gardenSeats.length], fromGarden: true }));
  }

  // ---------- 밥상에 둘러앉은 식구들 ----------
  // 식구를 누르면 한마디씩 해요. 손님이 읽은 책이 있으면 그 이야기를 꺼내요(밥상머리 대화).
  let familyBox = null;
  const familyTurns = {};
  function renderFamily() {
    if (!familyBox) {
      familyBox = document.createElement('div');
      familyBox.className = 'araet-family scene-araet';
      stage.append(familyBox);
    }
    familyBox.replaceChildren();
    for (const member of menuData.family?.members || []) {
      const seat = document.createElement('button');
      seat.type = 'button';
      seat.className = 'araet-member';
      seat.dataset.member = member.id;
      seat.style.left = member.x + '%';
      seat.style.top = member.y + '%';
      seat.style.zIndex = String(Math.round(member.y * 10) - (member.y < 70 ? 40 : 0));
      seat.setAttribute('aria-label', member.who);
      const path = artFor['family-' + member.id];
      if (path) {
        const image = document.createElement('img');
        image.src = path;
        image.alt = '';
        image.draggable = false;
        seat.append(image);
        seat.classList.add('has-art');
      } else {
        const icon = document.createElement('span');
        icon.className = 'araet-member-icon';
        icon.textContent = member.icon || '🙂';
        seat.append(icon);
      }
      const name = document.createElement('span');
      name.className = 'araet-member-name';
      name.textContent = member.who;
      seat.append(name);
      seat.addEventListener('click', event => {
        event.stopPropagation();
        memberTalk(member);
      });
      familyBox.append(seat);
    }
  }
  function memberTalk(member) {
    const turn = familyTurns[member.id] || 0;
    familyTurns[member.id] = turn + 1;
    const read = window.roomGarden?.lastRead?.();
    if (read && member.reading?.line && turn % 2 === 0) {
      const line = member.reading.line.replace('{title}', read.title).replace('{who}', read.other || read.who);
      sayWho(member.who, line, 5200);
      return;
    }
    const lines = member.lines || [];
    if (lines.length) sayWho(member.who, lines[turn % lines.length].line, 4200);
  }
  function sayWho(who, text, time = 4200) {
    clearTimeout(speechTimer);
    speech.replaceChildren();
    const name = document.createElement('b');
    name.textContent = who + ' ';
    speech.append(name, document.createTextNode(text));
    speech.hidden = false;
    speechTimer = setTimeout(() => { speech.hidden = true; }, still() ? Math.max(time, 5000) : time);
  }

  // ---------- 아랫목에서 눕기, 뒹굴뒹굴, 고양이와 강아지 ----------
  const ibul = $('araet-ibul');
  const petsBox = $('araet-pets');
  const sleepButton = $('araet-sleep');
  const rollButton = $('araet-roll');
  const petsButton = $('araet-pets-toggle');
  // 동물을 싫어하는 손님도 있어서, 고양이·강아지는 손님이 켰을 때만 와요(기본은 꺼짐).
  const petsKey = 'heartstorybook-araet-pets-v1';
  let petsOn = false;
  try { petsOn = localStorage.getItem(petsKey) === 'on'; } catch {}
  function showPetsButton() {
    petsButton.textContent = t(petsOn ? '🐾 동물 친구: 켬' : '🐾 동물 친구: 끔');
    petsButton.setAttribute('aria-pressed', String(petsOn));
  }
  function schedulePets() {
    if (!petsOn) return;
    (menuData.araet?.pets || []).forEach(pet => {
      restTimers.push(setTimeout(() => showPet(pet), still() ? 0 : pet.delay || 1500));
    });
  }
  function togglePets() {
    petsOn = !petsOn;
    try { localStorage.setItem(petsKey, petsOn ? 'on' : 'off'); } catch {}
    showPetsButton();
    if (!lying) return;
    if (petsOn) schedulePets();
    else {
      petsBox.replaceChildren();
      say(t('동물 친구들은 마당으로 놀러 갔어요.'), 2600);
    }
  }
  showPetsButton();
  function clearRest() {
    while (restTimers.length) clearTimeout(restTimers.pop());
  }
  function lieDown() {
    if (busy || lying || scene !== 'araet') return;
    clearEating();
    lying = true;
    lieArtPath = null;
    if (visitor) {
      const path = art + 'lie-' + visitor.id + '.png';
      if (artFor[path]) lieArtPath = artFor[path];
      else if (artFor[path] === undefined) {
        artFor[path] = null;
        tryImage(path, found => { artFor[path] = found; if (lying) { lieArtPath = found; draw(); } });
      }
    }
    stage.classList.add('is-resting');
    ibul.hidden = false;
    pos = { x: 26, y: 85 };
    pose = 'lie';
    draw();
    sleepButton.textContent = t('일어나기');
    rollButton.hidden = false;
    playSound({ id: 'ibul', sound: 'pour' });
    say(t('이불 깔아 줄게. 푹 쉬렴.'), 3600);
    schedulePets();
    restTimers.push(setTimeout(() => stage.classList.add('is-asleep'), still() ? 2000 : 9000));
  }
  function getUp(quiet = false) {
    if (!lying) return;
    lying = false;
    clearRest();
    stage.classList.remove('is-resting', 'is-asleep', 'is-rolling');
    ibul.hidden = true;
    petsBox.replaceChildren();
    sleepButton.textContent = t('이불 펴고 눕기');
    rollButton.hidden = true;
    eatArt.hidden = true;
    frameBox.style.visibility = '';
    sitAtSoban();
    if (!quiet) say(t('잘 잤니? 개운하지?'), 3000);
  }
  function roll() {
    if (!lying) return;
    stage.classList.remove('is-asleep');
    stage.classList.remove('is-rolling');
    void stage.offsetWidth;
    stage.classList.add('is-rolling');
    playSound({ id: 'roll', sound: 'chew' });
    say(t('뒹굴뒹굴~ 아랫목이 따끈따끈하지?'), 3000);
    clearTimeout(roll.timer);
    roll.timer = setTimeout(() => stage.classList.remove('is-rolling'), still() ? 300 : 2600);
  }
  function showPet(pet) {
    if (!lying || !petsOn || $('araet-pet-' + pet.id)) return;
    const box = document.createElement('button');
    box.type = 'button';
    box.id = 'araet-pet-' + pet.id;
    box.className = 'araet-pet';
    box.style.left = pet.x + '%';
    box.style.top = pet.y + '%';
    box.style.width = pet.w + '%';
    box.style.zIndex = String(Math.max(830, Math.round(pet.y * 10) + 1));
    box.setAttribute('aria-label', pet.line || pet.id);
    const image = document.createElement('img');
    image.alt = '';
    image.draggable = false;
    image.onerror = () => {
      image.remove();
      const icon = document.createElement('span');
      icon.className = 'araet-pet-icon';
      icon.textContent = pet.icon || '🐾';
      box.prepend(icon);
    };
    image.src = pet.image;
    box.append(image);
    box.addEventListener('click', event => {
      event.stopPropagation();
      if (pet.sound === 'purr') {
        const purr = new Audio('sfx/purr.mp3');
        purr.volume = .6;
        purr.play().catch(() => synth('chew'));
      } else synth(pet.sound || 'snore');
      box.classList.remove('is-petted');
      void box.offsetWidth;
      box.classList.add('is-petted');
      say(pet.line, 3200);
    });
    petsBox.append(box);
    say(pet.line, 3200);
  }

  // ---------- 드라마 한상 전단지 ----------
  function openFlyer() {
    const meal = meals()[mealIndex];
    const flyer = meal?.flyer;
    if (!flyer) return;
    const lang = window.homeText?.lang() || 'ko';
    const local = (lang !== 'ko' && flyer[lang]) || {};
    menuGroup = null;
    menu.classList.add('is-flyer');
    menuTitle.textContent = local.title || flyer.title;
    menuNote.textContent = local.subtitle || flyer.subtitle;
    foodsBox.replaceChildren();
    flyer.lines.forEach((line, i) => {
      const dish = (meal.dishes || []).find(d => d.id === line.dish);
      if (!dish) return;
      const row = document.createElement('div');
      row.className = 'flyer-row';
      // 장면 그림(images/kitchen/flyer-(음식 id).png)이 있으면 음식 그림 대신 장면을 보여 줘요.
      const scenePath = artFor['flyer-' + dish.id];
      if (scenePath) {
        const sceneBox = document.createElement('span');
        sceneBox.className = 'flyer-scene';
        const sceneImage = document.createElement('img');
        sceneImage.src = scenePath;
        sceneImage.alt = '';
        sceneBox.append(sceneImage);
        row.append(sceneBox);
      } else row.append(picture(dish, 'kitchen-food-icon'));
      const text = document.createElement('span');
      const name = document.createElement('b');
      name.textContent = dish.name;
      const tag = document.createElement('small');
      tag.textContent = local.lines?.[i] || line.tag;
      text.append(name, tag);
      // 어디서 나온 음식인지는 누르면 보여 줘요(맞혀 보는 재미).
      const fromText = local.from?.[i] || line.from;
      if (fromText) {
        const reveal = document.createElement('button');
        reveal.type = 'button';
        reveal.className = 'flyer-from';
        reveal.textContent = t('어디서 봤더라? (눌러 보기)');
        reveal.addEventListener('click', () => {
          reveal.textContent = '🎬 ' + fromText;
          reveal.classList.add('is-open');
          reveal.disabled = true;
        });
        text.append(reveal);
      }
      row.append(text);
      foodsBox.append(row);
    });
    const note = document.createElement('p');
    note.className = 'flyer-note';
    note.textContent = local.note || flyer.note;
    foodsBox.append(note);
    if (!menu.open) menu.showModal();
  }
  menu.addEventListener('close', () => menu.classList.remove('is-flyer'));

  function sitAtSoban() {
    pos = { ...scenes.araet.spots.seat };
    pose = 'sit';
    facing = 1; // 소반 쪽(오른쪽)을 보고 앉아요.
    draw();
  }

  // ---------- 화면 바꾸기 ----------
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

  function setScene(name) {
    scene = name;
    stage.dataset.scene = name;
    heading.textContent = t(scenes[name].title);
  }

  function goAraet() {
    if (busy || !active) return;
    busy = true;
    walkTo(scenes.kitchen.spots.araet, () => transition(() => {
      setScene('araet');
      renderSoban();
      sitAtSoban();
      busy = false;
      const meal = meals()[mealIndex];
      if (meal) sayWho(t('할머니'), t('{line} 반찬이나 식구들을 눌러 보렴.', { line: meal.line }), 5200);
      else say(t('밥상을 차리는 중이란다.'), 5000);
    }));
  }

  function backToKitchen() {
    if (busy || !active) return;
    busy = true;
    getUp(true);
    clearEating();
    transition(() => {
      setScene('kitchen');
      pos = { ...scenes.kitchen.spots.araet };
      facing = -1;
      pose = 'stand';
      busy = false;
      draw();
    });
  }

  function enter(currentVisitor, button, stillMotion) {
    if (active) return;
    visitor = currentVisitor;
    entryButton = button;
    if (typeof stillMotion === 'function') still = stillMotion;
    transition(() => {
      active = true;
      experience.hidden = true;
      kitchen.hidden = false;
      setScene('kitchen');
      pos = { ...scenes.kitchen.spots.door };
      facing = 1;
      pose = 'stand';
      busy = false;
      clearEating();
      draw();
      say(t('왔구나! 배고프면 할머니를 부르고, 출출하면 간식 선반이나 냉장고를 열어 보렴.'), 5200);
      grandma.focus({ preventScroll: true });
    });
  }

  function leave() {
    if (!active || busy) return;
    if (menu.open) menu.close();
    const go = () => walkTo(scenes.kitchen.spots.door, () => transition(() => {
      active = false;
      speech.hidden = true;
      clearEating();
      kitchen.hidden = true;
      experience.hidden = false;
      window.dispatchEvent(new Event('resize'));
      entryButton?.focus({ preventScroll: true });
    }));
    if (scene === 'araet') {
      backToKitchen();
      setTimeout(go, still() ? 50 : 900);
    } else go();
  }

  // ---------- 동화 읽기 연결 ----------
  // 방석에서 '동화 펼치기' → 홈페이지 동화 읽기 화면. 시선별 끝까지 읽기 기록은 텃밭에서 쓸 거예요.
  function language() {
    const lang = document.documentElement.lang || 'ko';
    return ['ko', 'en', 'es'].includes(lang) ? lang : 'ko';
  }
  function readerAddress(book) {
    const local = !/github\.io$/.test(location.hostname);
    const url = new URL(local ? publicReader : new URL('../../book-reader.html', location.href).href);
    url.searchParams.set('book', book.id);
    url.searchParams.set('mode', 'read');
    url.searchParams.set('page', '0');
    url.searchParams.set('from', 'room');
    url.searchParams.set('lang', language());
    return url.href;
  }
  function read(book) {
    if (book) location.href = readerAddress(book);
  }
  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function today() {
    const now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  }
  // 읽기 기록을 장부(ledger)에 모아요. 별이 켜져 있을 때만 별을 줘요.
  function collectReading() {
    const events = readJson(readingEventsKey, []);
    if (!Array.isArray(events) || !events.length) return;
    const ledger = readJson(readingLedgerKey, {});
    const day = today();
    let earned = 0;
    for (const event of events) {
      if (!event?.book || !event?.view) continue;
      const key = event.book + ':' + event.view;
      const record = ledger[key];
      if (!record) {
        ledger[key] = { first: day, rewarded: day, times: 1 };
        earned += rewards.firstRead;
      } else {
        record.times = (record.times || 1) + 1;
        if (record.rewarded !== day) {
          record.rewarded = day;
          record.rereads = (record.rereads || 0) + 1; // 다른 날 다시 읽은 횟수(텃밭 물뿌리개)
          earned += rewards.rereadDaily;
        }
      }
    }
    try {
      localStorage.setItem(readingLedgerKey, JSON.stringify(ledger));
      localStorage.setItem(readingEventsKey, '[]');
    } catch {}
    // 동화를 다 읽고 거실로 돌아오면 할머니가 밥 먹고 가라고 불러요.
    const entry = $('kitchen-entry');
    if (entry && !active && window.homeFeatures?.kitchen !== false) {
      entry.dataset.invite = t('할머니가 밥 먹고 가래요');
      entry.classList.add('is-inviting');
      entry.addEventListener('click', () => entry.classList.remove('is-inviting'), { once: true });
    }
    if (starsOn && earned > 0) setStars(stars + earned);
  }
  addEventListener('pageshow', () => { stars = readStars(); showStars(); collectReading(); });
  addEventListener('storage', event => {
    if (event.key === readingEventsKey) collectReading();
  });

  // ---------- 누르기 ----------
  for (const [id, group, spot, dir] of [
    ['spot-shelf', 'shelf', 'shelf', -1],
    ['spot-fridge', 'fridge', 'fridge', -1],
    ['spot-tea', 'drinks', 'drinks', 1],
  ]) {
    $(id).addEventListener('click', event => {
      event.stopPropagation();
      openStore(group, spot, dir);
    });
  }
  grandma.addEventListener('click', event => {
    event.stopPropagation();
    askMeal();
  });
  $('kitchen-return').addEventListener('click', event => {
    event.stopPropagation();
    leave();
  });
  $('to-araet').addEventListener('click', event => {
    event.stopPropagation();
    goAraet();
  });
  $('araet-return').addEventListener('click', event => {
    event.stopPropagation();
    backToKitchen();
  });
  sleepButton.addEventListener('click', event => {
    event.stopPropagation();
    if (lying) getUp();
    else lieDown();
  });
  petsButton.addEventListener('click', event => {
    event.stopPropagation();
    togglePets();
  });
  rollButton.addEventListener('click', event => {
    event.stopPropagation();
    roll();
  });
  $('araet-flyer').addEventListener('click', event => {
    event.stopPropagation();
    openFlyer();
  });
  $('araet-change').addEventListener('click', event => {
    event.stopPropagation();
    if (!meals().length) return;
    if (lying) getUp(true);
    mealIndex = (mealIndex + 1) % meals().length;
    renderSoban();
    playSound({ id: 'soban-change', sound: 'clink' });
    say(t('그럼 {name:으로} 다시 차려 줄게.', { name: meals()[mealIndex].name }), 3200);
  });
  stage.addEventListener('click', event => {
    if (!active || busy || menu.open || scene !== 'kitchen') return;
    if (event.target.closest('button')) return;
    const box = stage.getBoundingClientRect();
    walkTo({
      x: (event.clientX - box.left) / box.width * 100,
      y: (event.clientY - box.top) / box.height * 100,
    });
  });
  // 언어를 바꾸면 메뉴 이름과 화면 글자를 다시 그려요.
  document.addEventListener('hometextchange', () => {
    localize(menuData);
    showStars();
    heading.textContent = t(scenes[scene].title);
    if (menu.open && menuGroup) refreshMenu();
    sleepButton.textContent = t(lying ? '일어나기' : '이불 펴고 눕기');
    rollButton.textContent = t('뒹굴뒹굴');
    showPetsButton();
    if (scene === 'araet') renderSoban();
  });
  // 공개판에서 부엌을 꺼 두면 거실의 '부엌 가기' 버튼을 숨겨요(home-features.js).
  if (window.homeFeatures?.kitchen === false) {
    const entry = $('kitchen-entry');
    if (entry) entry.hidden = true;
  }
  addEventListener('resize', () => { if (active) draw(); });
  bite.hidden = true;
  utensil.hidden = true;
  showStars();

  window.roomKitchen = {
    active: () => active,
    enter,
    leave,
    read,
    stars: () => stars,
    starsEnabled: () => starsOn,
    addStars: amount => setStars(stars + amount),
    readingLedger: () => readJson(readingLedgerKey, {}),
    collectReading,
  };
})();
