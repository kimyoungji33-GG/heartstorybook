// 마음동화책방 거실 · 같이 놀기 1단계 (Claude, 2026-11-24)
// - "같이 놀기" 버튼을 눌러야만 들어가요. 안 누르면 지금처럼 혼자 놀기예요.
// - 내 아바타는 room.js의 window.roomAvatar.snapshot()으로 읽기만 해요. 움직이거나 그림을 바꾸지 않아요.
// - 다른 사람 아바타는 서 있기와 걷기만 보여 줘요(앉기·감 먹기는 다음 단계).
// - 이메일·비밀번호는 이 파일에 없어요. 관리자 표시는 Firebase 화면의 admins 칸에만 있어요.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInAnonymously,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {
  get,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  remove,
  runTransaction,
  serverTimestamp,
  set,
  update,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js';

const config = window.togetherConfig;
const stage = document.getElementById('stage');
const controls = document.getElementById('controls');
const experience = document.getElementById('experience');
const adminMode = new URLSearchParams(location.search).get('admin') === '1';
const restKey = 'heartstorybook-together-rest';
const nameKey = 'heartstorybook-together-name';
const restMs = 30 * 60 * 1000;
const defaultFloor = { back: 51.2, front: 95.5 };
const aspect = 1080 / 1920; // navigation.js와 같은 거실 그림 비율
const maxPathPoints = 8;
const entrance = { x: 92, y: 83 };

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const mix = (a, b, t) => a + (b - a) * t;
const round2 = value => Math.round(value * 100) / 100;

// 글은 글자 그대로만 보여 줘요. 줄바꿈·보이지 않는 글자는 지우고 길이를 잘라요.
function cleanText(value, limit) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limit);
}

let firebase = null;
let visitors = new Map();
let floor = defaultFloor;
let joined = false;
let joining = false;
let uid = null;
let mySeat = null;
let myName = '';
let serverOffset = 0;
let lastSent = null;
let lastSentAt = 0;
let lastSayAt = 0;
let mySay = null;
let sendTimer = null;
let frameId = null;
let wasConnected = true;
let reclaiming = false;
let pathAllowed = true; // Firebase 보호 규칙을 새로 붙여 넣기 전이면 길(path) 보내기가 막혀요. 그땐 길 없이 보내요.
const listeners = [];
const others = new Map();

if (config?.enabled && config.firebase?.databaseURL && stage && controls && window.roomAvatar?.snapshot) {
  start();
}

function start() {
  // ─── 버튼 줄 ───
  const joinButton = button('같이 놀기', 'mp-join');
  joinButton.setAttribute('aria-pressed', 'false');
  const sayForm = document.createElement('form');
  sayForm.className = 'mp-say';
  sayForm.hidden = true;
  const sayInput = document.createElement('input');
  sayInput.type = 'text';
  sayInput.maxLength = config.sayLimit;
  sayInput.placeholder = '한 마디 (' + config.sayLimit + '자까지)';
  sayInput.setAttribute('aria-label', '말풍선에 쓸 말');
  sayInput.autocomplete = 'off';
  const sayButton = button('말하기', 'mp-say-send');
  sayButton.type = 'submit';
  sayForm.append(sayInput, sayButton);
  const leaveButton = button('혼자 놀기로', 'mp-leave');
  leaveButton.hidden = true;
  controls.append(joinButton, sayForm, leaveButton);

  // ─── 이름 묻는 창 ───
  const dialog = document.createElement('dialog');
  dialog.className = 'mp-dialog';
  dialog.setAttribute('aria-labelledby', 'mp-dialog-title');
  dialog.innerHTML = `
    <form method="dialog" class="mp-dialog-form">
      <h2 id="mp-dialog-title">같이 놀기</h2>
      <p>거실에서 불릴 짧은 이름을 적어 주세요.<br>비워 두면 "손님1"처럼 붙여 드려요.</p>
      <input id="mp-name" type="text" autocomplete="off" aria-label="이름 (8자까지)">
      <p class="mp-dialog-small">이름과 한 마디는 같이 있는 사람에게 보여요. 실제 이름이나 연락처는 적지 말아 주세요.</p>
      <div class="mp-dialog-actions">
        <button type="submit" value="join" class="mp-primary">들어가기</button>
        <button type="submit" value="cancel">그만두기</button>
      </div>
    </form>`;
  document.body.append(dialog);
  const nameInput = dialog.querySelector('#mp-name');
  nameInput.maxLength = config.nameLimit;
  nameInput.placeholder = config.nameLimit + '자까지';

  // ─── 화면 위 이름표·말풍선 층, 안내 ───
  const labels = document.createElement('div');
  labels.className = 'mp-labels';
  labels.setAttribute('aria-hidden', 'true');
  const note = document.createElement('p');
  note.className = 'mp-note';
  note.setAttribute('role', 'status');
  note.hidden = true;
  stage.append(labels, note);
  const myTag = makeTag();

  let noteTimer;
  function showNote(text, ms = 4000) {
    note.textContent = text;
    note.hidden = false;
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => { note.hidden = true; }, ms);
  }

  // 글을 쓰는 동안 거실 키보드 동작이 끼어들지 않게 해요.
  for (const input of [sayInput, nameInput]) {
    input.addEventListener('keydown', event => event.stopPropagation());
  }

  joinButton.addEventListener('click', () => {
    if (joined || joining) return;
    if (!adminMode && restingNow()) {
      showNote('조금 쉬었다가 다시 와 주세요. 혼자 놀기는 계속할 수 있어요.');
      return;
    }
    try { nameInput.value = localStorage.getItem(nameKey) || ''; } catch { nameInput.value = ''; }
    dialog.showModal();
    nameInput.focus();
  });

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'join') join(cleanText(nameInput.value, config.nameLimit));
    dialog.returnValue = '';
  });

  sayForm.addEventListener('submit', event => {
    event.preventDefault();
    say(cleanText(sayInput.value, config.sayLimit));
  });

  leaveButton.addEventListener('click', () => leave('self'));
  addEventListener('pagehide', () => { if (joined) leave('page'); });

  if (adminMode) {
    ensureFirebase()
      .then(fb => import('./together-admin.js?v=together-1').then(module => module.startAdmin({ ...fb, config, showNote })))
      .catch(() => showNote('관리자 화면을 열 수 없어요.'));
  }

  // ─── 들어가기 ───
  async function join(typedName) {
    joining = true;
    joinButton.disabled = true;
    joinButton.textContent = '자리 찾는 중…';
    try {
      const fb = await ensureFirebase();
      await loadVisitors();
      let user = fb.auth.currentUser;
      if (adminMode && !user) {
        showNote('관리자 확인을 먼저 해 주세요.');
        return;
      }
      if (!user) user = (await signInAnonymously(fb.auth)).user;
      uid = user.uid;
      const base = config.roomPath;
      const kicked = await get(ref(fb.db, base + '/kicked/' + uid)).catch(() => null);
      if (kicked?.val() === true) {
        markRest();
        showNote('조금 쉬었다가 다시 와 주세요. 혼자 놀기는 계속할 수 있어요.');
        return;
      }
      const open = await get(ref(fb.db, base + '/open'));
      if (open.val() === false) {
        showNote('지금은 거실 문이 닫혀 있어요. 혼자 놀기는 계속할 수 있어요.');
        return;
      }
      const seat = await claimSeat();
      if (seat === null) {
        showNote('지금은 자리가 없어요. 조금 뒤에 다시 와 주세요.');
        return;
      }
      mySeat = seat;
      myName = typedName || '손님' + (seat + 1);
      try { if (typedName) localStorage.setItem(nameKey, typedName); } catch {}
      await writeMe();
      joined = true;
      listen();
      sendTimer = setInterval(sendIfMoved, 100);
      frameId = requestAnimationFrame(render);
      joinButton.hidden = true;
      sayForm.hidden = false;
      leaveButton.hidden = false;
      myTag.name.textContent = myName;
      showNote(myName + ' 님, 같이 놀기에 들어왔어요.', 3000);
    } catch (error) {
      console.warn('[같이 놀기]', error);
      if (mySeat !== null && !joined) {
        await releaseSeat();
        mySeat = null;
      }
      showNote('지금은 같이 놀기에 들어갈 수 없어요. 혼자 놀기는 그대로 할 수 있어요.');
    } finally {
      joining = false;
      joinButton.disabled = false;
      joinButton.textContent = '같이 놀기';
    }
  }

  // 0번부터 차례로, 비어 있는 자리만 내 것으로 잡아요(보호 규칙도 0~4번만 허락해요).
  async function claimSeat(preferred = null) {
    const order = [...Array(config.maxPeople).keys()];
    if (preferred !== null) order.unshift(...order.splice(order.indexOf(preferred), 1));
    for (const seat of order) {
      const seatRef = ref(firebase.db, config.roomPath + '/seats/' + seat);
      try {
        const result = await runTransaction(seatRef, current => {
          if (current === null || current === uid) return uid;
          return undefined;
        }, { applyLocally: false });
        if (result.committed && result.snapshot.val() === uid) {
          await onDisconnect(seatRef).remove();
          return seat;
        }
      } catch {
        // 문이 닫혔거나 막힌 자리예요. 다음 자리를 봐요.
      }
    }
    return null;
  }

  async function writeMe() {
    const me = snapshotState();
    const playerRef = ref(firebase.db, config.roomPath + '/players/' + uid);
    await onDisconnect(playerRef).remove();
    const { path, ...rest } = me;
    const base = { seat: String(mySeat), name: myName, ...rest, at: serverTimestamp() };
    if (path && pathAllowed) {
      try {
        await set(playerRef, { ...base, path });
      } catch {
        pathAllowed = false;
        await set(playerRef, base);
      }
    } else {
      await set(playerRef, base);
    }
    lastSent = me;
    lastSentAt = performance.now();
  }

  function snapshotState() {
    const now = window.roomAvatar.snapshot();
    if (now?.floor) floor = now.floor;
    return {
      avatar: visitors.has(now?.avatar) ? now.avatar : 'woman',
      x: round2(clamp(now?.x ?? entrance.x, 0, 100)),
      y: round2(clamp(now?.y ?? entrance.y, 0, 100)),
      facing: now?.facing === 1 ? 1 : -1,
      walking: Boolean(now?.walking),
      // 걷는 중이면 남은 길(목적지까지의 꺾이는 점들)도 함께 보내요.
      // 이 창이 가려져 걷기가 잠시 멈춰도, 다른 창은 이 길을 따라 스스로 걸어가요.
      path: now?.walking && Array.isArray(now.path) && now.path.length
        ? now.path.slice(-maxPathPoints).map(point => ({
          x: round2(clamp(point.x, 0, 100)),
          y: round2(clamp(point.y, 0, 100)),
        }))
        : null,
    };
  }

  const pathKey = path => path ? path.map(point => point.x + ',' + point.y).join(' ') : '';

  // 움직일 때만, 1초에 4번까지 보내요. 가만히 있으면 보내지 않아요.
  function sendIfMoved() {
    if (!joined) return;
    const now = performance.now();
    if (now - lastSentAt < config.sendEveryMs) return;
    const me = snapshotState();
    const same = lastSent && Math.abs(me.x - lastSent.x) < .05 && Math.abs(me.y - lastSent.y) < .05 &&
      me.facing === lastSent.facing && me.walking === lastSent.walking && me.avatar === lastSent.avatar &&
      pathKey(me.path) === pathKey(lastSent.path);
    if (same) return;
    lastSent = me;
    lastSentAt = now;
    const playerRef = ref(firebase.db, config.roomPath + '/players/' + uid);
    const { path, ...rest } = me;
    const payload = { ...rest, at: serverTimestamp() };
    if (!pathAllowed) {
      update(playerRef, payload).catch(() => {});
      return;
    }
    update(playerRef, { ...payload, path }).catch(() => {
      // 예전 보호 규칙이면 path가 막혀요. 길 없이 다시 보내고, 다음부터는 길을 빼요.
      pathAllowed = false;
      update(playerRef, payload).catch(() => {});
    });
  }

  // 말은 마지막 한 마디만 저장돼요(덮어쓰기). 3초에 한 번까지.
  function say(text) {
    if (!joined || !text) return;
    if (Date.now() - lastSayAt < 3000) {
      showNote('조금 있다가 다시 말해 주세요.', 2200);
      return;
    }
    lastSayAt = Date.now();
    sayInput.value = '';
    mySay = { text, until: performance.now() + config.bubbleMs };
    set(ref(firebase.db, config.roomPath + '/players/' + uid + '/say'), { text, at: serverTimestamp() })
      .catch(() => showNote('말이 전해지지 않았어요. 잠시 뒤 다시 해 주세요.', 2500));
  }

  function listen() {
    const db = firebase.db;
    const base = config.roomPath;
    listeners.push(onValue(ref(db, '.info/serverTimeOffset'), snap => { serverOffset = snap.val() || 0; }));
    listeners.push(onValue(ref(db, base + '/players'), snap => syncOthers(snap.val() || {})));
    listeners.push(onValue(ref(db, base + '/kicked/' + uid), snap => {
      if (snap.val() === true && joined) leave('kicked');
    }));
    listeners.push(onValue(ref(db, base + '/seats/' + mySeat), snap => {
      if (joined && snap.val() !== uid && wasConnected) reclaim();
    }));
    listeners.push(onValue(ref(db, '.info/connected'), snap => {
      const connected = snap.val() === true;
      if (connected && !wasConnected && joined) {
        wasConnected = true;
        reclaim();
      }
      wasConnected = connected;
    }));
  }

  // 인터넷이 잠깐 끊겼다 돌아오면 자리를 다시 잡아요. 자리가 없으면 혼자 놀기로 돌아가요.
  async function reclaim() {
    if (reclaiming || !joined) return;
    reclaiming = true;
    try {
      const kicked = await get(ref(firebase.db, config.roomPath + '/kicked/' + uid)).catch(() => null);
      if (kicked?.val() === true) return leave('kicked');
      const seat = await claimSeat(mySeat);
      if (seat === null) return leave('full');
      if (seat !== mySeat) {
        mySeat = seat;
        stopListening();
        listen();
      }
      await writeMe();
    } catch {
      leave('lost');
    } finally {
      reclaiming = false;
    }
  }

  async function releaseSeat() {
    if (!firebase || mySeat === null) return;
    const seatRef = ref(firebase.db, config.roomPath + '/seats/' + mySeat);
    const playerRef = ref(firebase.db, config.roomPath + '/players/' + uid);
    await Promise.allSettled([remove(playerRef), remove(seatRef)]);
    await Promise.allSettled([onDisconnect(playerRef).cancel(), onDisconnect(seatRef).cancel()]);
  }

  function stopListening() {
    while (listeners.length) listeners.pop()();
  }

  async function leave(reason) {
    if (!joined) return;
    joined = false;
    clearInterval(sendTimer);
    cancelAnimationFrame(frameId);
    stopListening();
    for (const [id] of others) dropOther(id);
    myTag.root.hidden = true;
    mySay = null;
    if (reason !== 'kicked') releaseSeat();
    mySeat = null;
    joinButton.hidden = false;
    sayForm.hidden = true;
    leaveButton.hidden = true;
    if (reason === 'kicked') {
      markRest();
      showNote('거실에서 잠시 나왔어요. 혼자 놀기는 계속할 수 있어요.', 6000);
    } else if (reason === 'full') {
      showNote('지금은 자리가 없어요. 혼자 놀기로 돌아왔어요.');
    } else if (reason === 'lost') {
      showNote('연결이 끊겨서 혼자 놀기로 돌아왔어요.');
    } else if (reason === 'self') {
      showNote('혼자 놀기로 돌아왔어요.', 2500);
    }
  }

  // ─── 다른 사람 ───
  function syncOthers(players) {
    const now = performance.now();
    for (const [id, data] of Object.entries(players)) {
      if (id === uid || !data || !visitors.has(data.avatar)) continue;
      let other = others.get(id);
      const target = { x: clamp(Number(data.x) || 0, 0, 100), y: clamp(Number(data.y) || 0, 0, 100) };
      const walking = data.walking === true;
      const path = walking ? readPath(data.path) : [];
      const fresh = !other;
      if (fresh) {
        other = makeOther();
        other.shown = target;
        others.set(id, other);
      }
      // 갈 길: 걷는 중이면 보내온 남은 길, 멈췄으면 마지막 자리. 받은 쪽에서 이 길을 매끄럽게 걸어가요.
      other.route = path.length ? path : [target];
      if (!fresh && travel(other.shown, target) > 60) other.shown = target; // 아주 먼 곳(다른 방 등)은 바로 옮겨요.
      other.avatar = data.avatar;
      other.facing = data.facing === 1 ? 1 : -1;
      other.walking = walking;
      other.tag.name.textContent = cleanText(data.name, config.nameLimit) || '손님';
      const said = data.say;
      if (said && typeof said.text === 'string' && said.at !== other.sayAt) {
        other.sayAt = said.at;
        // 컴퓨터 시계와 Firebase 시계가 조금 달라서 나이가 0보다 작게 나올 수 있어요. 그럴 땐 방금 한 말로 봐요.
        const age = Math.max(0, Date.now() + serverOffset - Number(said.at) || 0);
        if (age < config.bubbleMs) {
          other.say = { text: cleanText(said.text, config.sayLimit), until: now + config.bubbleMs - age };
        }
      }
    }
    for (const [id] of others) if (!players[id] || !visitors.has(players[id].avatar)) dropOther(id);
  }

  function readPath(path) {
    const points = Array.isArray(path) ? path : Object.values(path || {});
    return points.slice(0, maxPathPoints)
      .filter(point => point && Number.isFinite(Number(point.x)) && Number.isFinite(Number(point.y)))
      .map(point => ({ x: clamp(Number(point.x), 0, 100), y: clamp(Number(point.y), 0, 100) }));
  }

  // 거실 바닥 위 거리(room.js의 길 계산과 같은 방식: 세로는 그림 비율만큼 줄여요)
  function travel(a, b) {
    return Math.hypot(a.x - b.x, (a.y - b.y) * aspect);
  }

  // 받은 길을 따라 걸음 속도로 조금씩 나아가요. 뒤처지면 조금 빨리 걸어 따라잡아요.
  function follow(other, visitor, dt) {
    const base = (visitor.walking?.walkSpeedPxPerSec || 245) / 1920 * 100;
    let remaining = 0;
    let from = other.shown;
    for (const point of other.route) { remaining += travel(from, point); from = point; }
    const speed = base * (1 + clamp((remaining - 12) / 20, 0, 1));
    let budget = speed * dt;
    const start = other.shown;
    let length = 0;
    while (budget > 0 && other.route.length) {
      const next = other.route[0];
      const gap = travel(other.shown, next);
      if (gap <= budget) {
        other.shown = next;
        other.route.shift();
        budget -= gap;
        length += gap;
      } else {
        const t = budget / gap;
        other.shown = { x: mix(other.shown.x, next.x, t), y: mix(other.shown.y, next.y, t) };
        length += budget;
        budget = 0;
      }
    }
    return { x: other.shown.x - start.x, length };
  }

  function makeOther() {
    const root = document.createElement('div');
    root.className = 'avatar mp-avatar is-idle';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<div class="avatar-shadow"></div><div class="avatar-breath"><div class="avatar-pose">' +
      '<div class="avatar-frame"><img alt="" draggable="false"></div></div></div>';
    stage.append(root);
    return {
      root,
      pose: root.querySelector('.avatar-pose'),
      frame: root.querySelector('.avatar-frame'),
      img: root.querySelector('img'),
      tag: makeTag(),
      route: [],
      last: 0,
      step: 0,
      say: null,
      sayAt: null,
    };
  }

  function dropOther(id) {
    const other = others.get(id);
    if (!other) return;
    other.root.remove();
    other.tag.root.remove();
    others.delete(id);
  }

  function makeTag() {
    const root = document.createElement('div');
    root.className = 'mp-tag';
    root.hidden = true;
    const bubble = document.createElement('p');
    bubble.className = 'mp-bubble';
    bubble.hidden = true;
    const name = document.createElement('span');
    name.className = 'mp-name';
    root.append(bubble, name);
    labels.append(root);
    return { root, bubble, name };
  }

  // ─── 그리기 ───
  function standingHeight(visitor, y) {
    const depth = mix(.79, 1.06, clamp((y - floor.back) / (floor.front - floor.back), 0, 1));
    return stage.clientHeight * visitor.height * .89 * depth;
  }

  function placeTag(tag, x, y, height, said, now) {
    tag.root.hidden = false;
    tag.root.style.left = x + '%';
    tag.root.style.top = 'calc(' + y + '% - ' + Math.round(height + 4) + 'px)';
    const showing = Boolean(said && said.until > now);
    if (showing && tag.bubble.textContent !== said.text) tag.bubble.textContent = said.text;
    tag.bubble.hidden = !showing;
  }

  function render(now) {
    if (!joined) return;
    for (const other of others.values()) {
      const visitor = visitors.get(other.avatar);
      const dt = other.last ? clamp((now - other.last) / 1000, 0, 1) : 0;
      other.last = now;
      const moved = follow(other, visitor, dt);
      if (Math.abs(moved.x) > .002) other.facing = Math.sign(moved.x);
      const walking = moved.length > 0 || (other.walking && other.route.length > 0);
      const height = paint(other, visitor, other.shown, other.facing, walking, now);
      placeTag(other.tag, other.shown.x, other.shown.y, height, other.say, now);
    }
    const me = window.roomAvatar.snapshot();
    const myVisitor = visitors.get(me?.avatar);
    if (me && myVisitor && !experience.hidden) {
      placeTag(myTag, me.x, me.y, standingHeight(myVisitor, me.y), mySay, now);
    } else {
      myTag.root.hidden = true;
    }
    frameId = requestAnimationFrame(render);
  }

  // room.js와 같은 그림판(avatar-frames.json)과 같은 크기 계산으로 서 있기·걷기만 그려요.
  function paint(other, visitor, at, facing, walking, now) {
    const height = standingHeight(visitor, at.y);
    const step = walking ? 1 + Math.floor(now / ((visitor.walking?.gaitCycleSec || .55) * 500)) % 2 : 0;
    const frame = visitor.frames[step] || visitor.frames[0];
    const baseline = frame.baseline ?? frame.height;
    const scale = height / baseline;
    const image = 'images/' + visitor.atlas + '.webp';
    if (other.img.getAttribute('src') !== image) other.img.src = image;
    Object.assign(other.img.style, {
      width: 1024 * scale + 'px',
      height: 1536 * scale + 'px',
      left: -frame.x * scale + 'px',
      top: -frame.y * scale + 'px',
    });
    Object.assign(other.frame.style, {
      width: frame.width * scale + 'px',
      height: frame.height * scale + 'px',
      left: -frame.width / 2 * scale + 'px',
      top: -baseline * scale + 'px',
    });
    other.pose.style.transform = 'scale(' + facing + ',1)';
    const root = other.root;
    root.classList.toggle('is-idle', !walking);
    root.style.left = at.x + '%';
    root.style.top = at.y + '%';
    root.style.zIndex = String(Math.round(at.y * 10) + 1);
    root.style.setProperty('--shadow-width', height * .43 + 'px');
    root.style.setProperty('--shadow-height', height * .08 + 'px');
    root.style.setProperty('--breath-unit', .62 / Math.max(1, height));
    warm(root, at);
    return height;
  }

  // 벽난로·창가 빛을 내 아바타와 같은 방식으로 살짝 받게 해요.
  function warm(root, at) {
    const warmth = clamp(Number(experience.dataset.avatarWarmth) || 0, 0, 2);
    if (!warmth) return;
    const hearth = Math.max(0, 1 - Math.hypot(at.x - 12, at.y - 65) / 27);
    const windowLight = Math.max(0, 1 - Math.hypot(at.x - 40, at.y - 63) / 29);
    root.style.setProperty('--avatar-brightness', 1 + warmth * (.018 + .061 * hearth + .05 * windowLight));
    root.style.setProperty('--avatar-sepia', warmth * (.035 + .115 * hearth + .06 * windowLight));
    root.style.setProperty('--avatar-saturation', 1 + warmth * (.025 + .08 * hearth));
  }
}

function button(text, className) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = className;
  element.textContent = text;
  return element;
}

function restingNow() {
  try { return Date.now() - Number(localStorage.getItem(restKey) || 0) < restMs; } catch { return false; }
}

function markRest() {
  try { localStorage.setItem(restKey, String(Date.now())); } catch {}
}

async function loadVisitors() {
  if (visitors.size) return;
  const response = await fetch('images/avatar-frames.json?v=walk-1');
  if (!response.ok) throw new Error('아바타 그림 정보를 열 수 없어요.');
  const data = await response.json();
  visitors = new Map(data.visitors.map(visitor => [visitor.id, visitor]));
}

async function ensureFirebase() {
  if (firebase) return firebase;
  const app = initializeApp(config.firebase, 'together');
  const auth = getAuth(app);
  auth.languageCode = 'ko';
  // 창(탭)마다 따로 사람표를 받아요. 창을 닫으면 사람표도 사라져요.
  await setPersistence(auth, browserSessionPersistence);
  await auth.authStateReady();
  firebase = { app, auth, db: getDatabase(app) };
  return firebase;
}
