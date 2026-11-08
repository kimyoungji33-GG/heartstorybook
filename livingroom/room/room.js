'use strict';

const element = id => document.getElementById(id);
const experience = element('experience');
const room = element('stage');
const avatar = element('avatar');
const poseBox = element('pose');
const spriteFrame = element('frame');
const sprite = element('sprite');
const seatedPose = element('seat-pose');
const seatedFrame = element('seat-frame');
const seatedSprite = element('seat-sprite');
const controls = element('controls');
const stand = element('stand');
const chair = element('chair');
const sofa = element('sofa');
const shelfDialog = element('shelf-dialog');
const visitors = element('visitors');
const hint = element('hint');
const status = element('status');
const roomText = window.roomLanguage.text;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const stillMotion = () => reducedMotion.matches || experience.classList.contains('motion-still');
const avatarWarmth = Math.max(0, Math.min(2, Number(experience.dataset.avatarWarmth) || 0));

const storeKey = 'heartstorybook-newroom-copy-v1';
const entrance = { x: 92, y: 83 };
const roomArtSize = { width: 1920, height: 1080 };
const seats = {
  window: {
    id: 'window',
    label: '정면 의자',
    button: 'chair',
    surface: { left: 1205, right: 1405 },
    approach: { x: 68.1, y: 61.4 },
    contact: { x: 1301, y: 514 },
    childInset: { x: -3, y: -8 },
    facing: 1,
  },
  'sofa-left': {
    id: 'sofa-left',
    label: '소파 왼쪽',
    button: 'sofa-left',
    surface: { left: 512, right: 767 },
    approach: { x: 32.4, y: 57 },
    contact: { x: 638, y: 474 },
    childInset: { x: -3, y: -9 },
    facing: 1,
  },
  'sofa-right': {
    id: 'sofa-right',
    label: '소파 오른쪽',
    button: 'sofa-right',
    surface: { left: 772, right: 1039 },
    approach: { x: 48.9, y: 57 },
    contact: { x: 947, y: 472 },
    childInset: { x: 3, y: -9 },
    facing: -1,
  },
};
const sofaSeats = [seats['sofa-left'], seats['sofa-right']];
const isSofaSeat = seat => Boolean(seat && seat !== seats.window);
const floor = { left: 2.7, right: 97.6, back: 51.2, front: 95.5 };
const obstacles = [
 { left: 0, right: 15.2, back: 51.2, front: 63.6 },
 { left: 16.4, right: 59.0, back: 51.2, front: 55.9 },
 { left: 29.0, right: 54.0, back: 57.8, front: 67.3 },
 { left: 59.3, right: 76.9, back: 51.2, front: 60.2 },
 { left: 78.4, right: 92.0, back: 51.2, front: 53.9 },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const mix = (a, b, t) => a + (b - a) * t;
const interpolate = (a, b, t) => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t) });
const distance = (a, b) => Math.hypot(a.x - b.x, (a.y - b.y) * 1080 / 1920);
const withinFloor = p => p.x >= floor.left && p.x <= floor.right && p.y >= floor.back && p.y <= floor.front;
const inFurniture = p => obstacles.some(o => p.x > o.left && p.x < o.right && p.y > o.back && p.y < o.front);
const walkable = p => withinFloor(p) && !inFurniture(p);
const detours = obstacles.flatMap(o => [
  { x: o.left, y: o.back }, { x: o.right, y: o.back },
  { x: o.left, y: o.front }, { x: o.right, y: o.front },
]).filter(walkable);

function clearSegment(from, to) {
  return obstacles.every(o => {
    let entry = 0;
    let exit = 1;
    for (const [axis, low, high] of [['x', o.left, o.right], ['y', o.back, o.front]]) {
      const delta = to[axis] - from[axis];
      if (Math.abs(delta) < 0.00001) {
        if (from[axis] <= low || from[axis] >= high) return true;
        continue;
      }
      const a = (low - from[axis]) / delta;
      const b = (high - from[axis]) / delta;
      entry = Math.max(entry, Math.min(a, b));
      exit = Math.min(exit, Math.max(a, b));
    }
    return exit - entry < 0.00001;
  });
}

function routeTo(from, to) {
  if (clearSegment(from, to)) return [from, to];
  const points = [from, to, ...detours];
  const remaining = new Set(points.keys());
  const costs = points.map((_, i) => i === 0 ? 0 : Infinity);
  const previous = [];
  while (remaining.size) {
    const best = [...remaining].reduce((a, b) => costs[a] <= costs[b] ? a : b);
    if (!Number.isFinite(costs[best])) return null;
    if (best === 1) {
      const path = [to];
      for (let i = previous[best]; i !== undefined; i = previous[i]) path.unshift(points[i]);
      return path;
    }
    remaining.delete(best);
    for (const next of remaining) {
      if (!clearSegment(points[best], points[next])) continue;
      const cost = costs[best] + distance(points[best], points[next]);
      if (cost < costs[next]) {
        costs[next] = cost;
        previous[next] = best;
      }
    }
  }
  return null;
}

function readVisit() {
  try { return JSON.parse(localStorage.getItem(storeKey)) || {}; }
  catch { return {}; }
}

const saved = readVisit();
let position = saved.position && walkable(saved.position) ? saved.position : entrance;
let listenerPosition = position;
let lastStanding = position;
let direction = saved.direction === 1 ? 1 : -1;
let mode = 'idle';
let visitor;
let frameNumber = 0;
let activeSeat = null;
let lastSeat = seats.window;
let seatProgress = 0;
let seatApproachFacing = 1;
let roomWidth = room.clientWidth;
let roomHeight = room.clientHeight;
let animationId;
let quietTimer;
let cueTimer;
let warmTimer;
let longPress;
let heldTarget;
let pressedAt;
let swallowClick = false;
let engaged = false;
let quiet = false;

function saveVisit() {
  try {
    localStorage.setItem(storeKey, JSON.stringify({
      visitor: visitor?.id, position: lastStanding, direction,
    }));
  } catch {
    // The room also works with browser storage disabled.
  }
}

const bookshelf = window.makeRoomBookshelf?.({
  room,
  artSize: roomArtSize,
  canBrowse: () => Boolean(visitor) && ['idle', 'walking', 'seated'].includes(mode),
  visit: (destination, after) => {
    interact();
    const approach = () => walkTo(destination, null, false, () => bowAtShelf(after));
    if (mode === 'seated') changeSeat(activeSeat, false, false, approach);
    else approach();
  },
  playPageTurn: () => audio.pageTurn(),
  stillMotion,
});

const seatCheck = window.makeSeatCheck?.({
  artSize: roomArtSize,
  draw: () => draw(),
  getValues: () => visitor ? {
    visitor,
    seat: activeSeat || lastSeat,
    child: visitor.height < .4,
  } : null,
});

function seatGeometry(seat) {
  const child = visitor.height < .4;
  const contact = seatCheck?.chairPoint(seat, child) || {
    x: seat.contact.x + (child ? seat.childInset.x : 0),
    y: seat.contact.y + (child ? seat.childInset.y : 0),
  };
  const hip = seatCheck?.avatarHip(visitor, seat) || visitor.seatedHip;
  return { contact, hip };
}

function standHeight(at) {
  const depth = mix(.79, 1.06, clamp((at.y - floor.back) / (floor.front - floor.back), 0, 1));
  return roomHeight * visitor.height * .89 * depth;
}

function paintFrame(frameElement, imageElement, frame, scale, anchor) {
  const image = 'images/' + visitor.atlas + '.webp';
  if (imageElement.getAttribute('src') !== image) imageElement.src = image;
  imageElement.style.width = 1024 * scale + 'px';
  imageElement.style.height = 1536 * scale + 'px';
  imageElement.style.left = -frame.x * scale + 'px';
  imageElement.style.top = -frame.y * scale + 'px';
  frameElement.style.width = frame.width * scale + 'px';
  frameElement.style.height = frame.height * scale + 'px';
  frameElement.style.left = -anchor.x * scale + 'px';
  frameElement.style.top = -anchor.y * scale + 'px';
}

function positionPose(box, point, facing, opacity, lean = 0, height = 1) {
  box.style.left = point.x + 'px';
  box.style.top = point.y + 'px';
  box.style.transform = 'rotate(' + lean + 'deg) scale(' + facing + ',' + height + ')';
  box.style.opacity = opacity;
}

function smooth(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function drawChairPose(standingHeight, geometry) {
  const standing = visitor.frames[0];
  const sitting = visitor.frames[3];
  const standScale = standingHeight / standing.height;
  const sitScale = standHeight({ y: activeSeat.approach.y - 3.5 }) * visitor.seatedScale *
    (visitor.height >= .4 ? 1.09 : 1) / sitting.height;
  const standingHip = visitor.standingHip;
  const facingOffset = mix(seatApproachFacing, activeSeat.facing, smooth(seatProgress / .28));
  const start = {
    x: (standingHip.x - standing.width / 2) * standScale * facingOffset,
    y: (standingHip.y - standing.height) * standScale,
  };
  const target = {
    x: (geometry.contact.x / roomArtSize.width - position.x / 100) * roomWidth,
    y: (geometry.contact.y / roomArtSize.height - position.y / 100) * roomHeight,
  };
  const shift = smooth((seatProgress - .16) / .84);
  const blend = smooth((seatProgress - .42) / .29);
  const hip = interpolate(start, target, shift);
  const lean = Math.sin(Math.PI * shift) * -7;
  paintFrame(spriteFrame, sprite, standing, standScale, standingHip);
  paintFrame(seatedFrame, seatedSprite, sitting, sitScale, geometry.hip);
  seatedFrame.style.transformOrigin = (geometry.hip.x * sitScale) + 'px ' + (geometry.hip.y * sitScale) + 'px';
  seatedFrame.style.setProperty('--breath-unit', .62 / Math.max(1, geometry.hip.y * sitScale));
  positionPose(poseBox, hip, direction, 1 - blend, lean, 1 - .14 * shift);
  positionPose(seatedPose, hip, activeSeat.facing, blend, lean * .4);
  return {
    x: (position.x / 100 + hip.x / (roomWidth || 1)) * roomArtSize.width,
    y: (position.y / 100 + hip.y / (roomHeight || 1)) * roomArtSize.height,
  };
}

function draw() {
  listenerPosition = position;
  avatar.style.left = position.x + '%';
  avatar.style.top = position.y + '%';
  const chairAction = Boolean(activeSeat);
  avatar.style.zIndex = chairAction ? '910' : String(Math.round(position.y * 10));
  room.classList.toggle('is-seating', chairAction);
  room.dataset.seat = activeSeat?.id || '';
  if (isSofaSeat(activeSeat)) room.style.setProperty('--sofa-press', smooth((seatProgress - .66) / .34));
  room.classList.toggle('is-resting', mode === 'seated');
  avatar.classList.toggle('is-idle', mode === 'idle');
  avatar.classList.toggle('is-bowing', mode === 'bowing');
  if (visitor) {
    const standingHeight = standHeight(position);
    avatar.style.setProperty('--breath-unit', .62 / Math.max(1, standingHeight));
    const geometry = seatGeometry(activeSeat || lastSeat);
    let renderedHip = null;
    if (chairAction) {
      renderedHip = drawChairPose(standingHeight, geometry);
      listenerPosition = interpolate(position, {
        x: geometry.contact.x / roomArtSize.width * 100,
        y: geometry.contact.y / roomArtSize.height * 100,
      }, smooth(seatProgress));
    } else {
      const frame = visitor.frames[frameNumber];
      paintFrame(spriteFrame, sprite, frame, standingHeight / frame.height,
        { x: frame.width / 2, y: frame.height });
      positionPose(poseBox, { x: 0, y: 0 }, direction, 1);
    }
    avatar.style.setProperty('--shadow-width', standingHeight * .43 + 'px');
    avatar.style.setProperty('--shadow-height', standingHeight * .08 + 'px');
    seatCheck?.render(geometry.contact, renderedHip);
  }
  audio.update(listenerPosition);
  if (avatarWarmth) {
    const hearth = Math.max(0, 1 - distance(listenerPosition, { x: 12, y: 65 }) / 27);
    const windowLight = Math.max(0, 1 - distance(listenerPosition, { x: 40, y: 63 }) / 29);
    avatar.style.setProperty('--avatar-brightness', 1 + avatarWarmth * (.018 + .061 * hearth + .05 * windowLight));
    avatar.style.setProperty('--avatar-sepia', avatarWarmth * (.035 + .115 * hearth + .06 * windowLight));
    avatar.style.setProperty('--avatar-saturation', 1 + avatarWarmth * (.025 + .08 * hearth));
    avatar.style.setProperty('--shadow-opacity', Math.min(1, avatarWarmth * (chairAction ? .72 : 1)));
    avatar.style.setProperty('--shadow-x', (listenerPosition.x - position.x) / 100 * roomWidth + 'px');
    avatar.style.setProperty('--shadow-y', (listenerPosition.y - position.y) / 100 * roomHeight + 'px');
  }
  bookshelf?.draw(position, mode);
}
function setQuiet(value) {
  quiet = value;
  experience.classList.toggle('is-quiet', value);
  controls.inert = value || !engaged;
}

function timeToRest() {
  clearTimeout(quietTimer);
  if (mode === 'seated') {
    quietTimer = setTimeout(() => {
      if (controls.contains(document.activeElement)) document.activeElement.blur();
      setQuiet(true);
    }, 3000);
  }
}

function interact() {
  if (!engaged) {
    engaged = true;
    clearTimeout(cueTimer);
    clearTimeout(warmTimer);
    room.classList.remove('is-cueing');
    experience.classList.add('is-engaged');
  }
  setQuiet(false);
  timeToRest();
}

function showState() {
  const sitting = mode === 'seated';
  windowBird.update(sitting);
  stand.hidden = !sitting;
  visitors.hidden = mode !== 'idle';
  for (const seat of Object.values(seats)) {
    const button = element(seat.button);
    const selected = sitting && activeSeat === seat;
    button.setAttribute('aria-pressed', String(selected));
    const name = roomText(seat.label);
    button.setAttribute('aria-label', roomText(selected ? '앉아 있는 {name}' : '{name}에 앉기', { name }));
  }
  hint.textContent = roomText(sitting ? '원하는 만큼 쉬어 가세요.' : '바닥을 누르면 걸어요. 창가 의자나 소파에 앉아 보세요.');
}
document.addEventListener('roomlanguagechange', showState);

function finishWalking(destination, seat, keyboard, onArrival) {
  position = destination;
  lastStanding = position;
  mode = 'idle';
  frameNumber = 0;
  draw();
  saveVisit();
  if (seat) changeSeat(seat, true, keyboard);
  else {
    showState();
    onArrival?.();
  }
}

function walkingProgress(t) {
  const ramp = .19;
  const ease = part => part * part / (2 * ramp * (1 - ramp));
  if (t < ramp) return ease(t);
  if (t > 1 - ramp) return 1 - ease(1 - t);
  return (t - ramp / 2) / (1 - ramp);
}

function walkTo(destination, seat = null, keyboard = false, onArrival = null) {
  if (mode !== 'idle' && mode !== 'walking') return;
  if (!walkable(destination) || !visitor) return;
  const path = routeTo(position, destination);
  if (!path) return;
  cancelAnimationFrame(animationId);
  const lengths = path.slice(1).map((point, i) => distance(path[i], point));
  const length = lengths.reduce((sum, value) => sum + value, 0);
  const firstHorizontal = path[1].x - path[0].x;
  if (Math.abs(firstHorizontal) > .05) direction = Math.sign(firstHorizontal);
  if (stillMotion() || length < .35) {
    finishWalking(destination, seat, keyboard, onArrival);
    return;
  }

  mode = 'walking';
  showState();
  const duration = clamp(length * 74, 400, 8200);
  const start = performance.now();
  let stepNumber = 0;
  let segment = 0;
  let covered = 0;

  function walk(time) {
    const t = clamp((time - start) / duration, 0, 1);
    if (t === 1 || stillMotion()) {
      finishWalking(destination, seat, keyboard, onArrival);
      return;
    }
    // A gentle start and stop around a mostly steady walking pace.
    const travelled = walkingProgress(t) * length;
    while (segment < lengths.length - 1 && travelled > covered + lengths[segment]) {
      covered += lengths[segment++];
    }
    const from = path[segment];
    const to = path[segment + 1];
    position = interpolate(from, to, lengths[segment] ? clamp((travelled - covered) / lengths[segment], 0, 1) : 0);
    lastStanding = position;
    if (Math.abs(to.x - from.x) > .05) direction = Math.sign(to.x - from.x);
    const stride = visitor.height >= .4 ? 3.8 : 3.1;
    const nextStep = Math.floor(travelled / stride + .68);
    if (nextStep !== stepNumber) {
      stepNumber = nextStep;
      audio.step();
    }
    frameNumber = nextStep ? 1 + nextStep % 2 : 0;
    draw();
    animationId = requestAnimationFrame(walk);
  }
  animationId = requestAnimationFrame(walk);
}

function bowAtShelf(after) {
  mode = 'bowing';
  direction = 1;
  draw();
  showState();

  const finish = () => {
    mode = 'idle';
    draw();
    showState();
    after();
  };
  if (stillMotion()) finish();
  else setTimeout(finish, 950);
}

function changeSeat(seat, sit, keyboard = false, after = null) {
  if (sit ? mode !== 'idle' : mode !== 'seated') return;
  clearTimeout(quietTimer);
  setQuiet(false);
  activeSeat = seat;
  mode = sit ? 'sitting' : 'rising';
  showState();
  seatApproachFacing = direction;
  const start = performance.now();
  let creaked = false;

  function settle(time) {
    const timePart = stillMotion() ? 1 : clamp((time - start) / 780, 0, 1);
    seatProgress = sit ? timePart : 1 - timePart;
    direction = sit && seatProgress < .14 ? seatApproachFacing : seat.facing;
    draw();
    if (!creaked && timePart >= (sit ? .73 : .23)) {
      audio.chair();
      creaked = true;
    }
    if (timePart < 1) {
      animationId = requestAnimationFrame(settle);
      return;
    }
    mode = sit ? 'seated' : 'idle';
    if (!sit) activeSeat = null;
    lastStanding = seat.approach;
    draw();
    saveVisit();
    showState();
    status.textContent = roomText(sit ? '{name}에 앉았어요.' : '{name}에서 일어났어요.', { name: roomText(seat.label) });
    if (keyboard) (sit ? stand : element(seat.button)).focus({ preventScroll: true });
    timeToRest();
    after?.();
  }
  if (stillMotion()) settle(start);
  else animationId = requestAnimationFrame(settle);
}
function playCue() {
  if (engaged) return;
  room.classList.add('is-cueing');
  warmTimer = setTimeout(() => room.classList.remove('is-cueing'), 2000);
}

experience.addEventListener('pointerdown', interact);
window.addEventListener('keydown', event => {
  if (event.defaultPrevented || shelfDialog.open || event.target.closest?.('.room-header-actions')) return;
  if (mode === 'seated' && isSofaSeat(activeSeat) &&
      (event.key === 'Enter' || event.key === ' ') &&
      !event.target.closest?.('button:not([data-sofa-seat]):not(#sofa):not(#stand), input, textarea, [contenteditable]')) {
    event.preventDefault();
    changeSeat(activeSeat, false, true);
    return;
  }
  const wasQuiet = quiet;
  interact();
  if (wasQuiet && (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    stand.focus({ preventScroll: true });
  }
});
function chooseSeat(event, seat) {
  if (swallowClick) return;
  if (mode === 'seated') {
    if (isSofaSeat(activeSeat) && isSofaSeat(seat)) changeSeat(activeSeat, false, event.detail === 0);
    return;
  }
  if (mode !== 'idle' && mode !== 'walking') return;
  interact();
  lastSeat = seat;
  walkTo(seat.approach, seat, event.detail === 0);
}

chair.addEventListener('click', event => chooseSeat(event, seats.window));
for (const seat of sofaSeats) {
  const button = element(seat.button);
  button.dataset.sofaSeat = '';
  button.addEventListener('click', event => chooseSeat(event, seat));
}
sofa.addEventListener('click', event => {
  const [left, right] = sofaSeats;
  const closer = distance(position, left.approach) <= distance(position, right.approach) ? left : right;
  chooseSeat(event, closer);
});
stand.addEventListener('click', event => changeSeat(activeSeat, false, event.detail === 0));

room.addEventListener('click', event => {
  if (event.target.closest('button')) return;
  if (mode === 'seated') {
    if (isSofaSeat(activeSeat)) {
      const body = seatedFrame.getBoundingClientRect();
      if (event.clientX >= body.left && event.clientX <= body.right &&
          event.clientY >= body.top && event.clientY <= body.bottom) changeSeat(activeSeat, false);
    }
    return;
  }
  interact();
  const bounds = room.getBoundingClientRect();
  const point = {
    x: (event.clientX - bounds.left) / bounds.width * 100,
    y: (event.clientY - bounds.top) / bounds.height * 100,
  };
  walkTo(point);
});

for (const target of room.querySelectorAll('.furniture-target')) {
  target.addEventListener('pointerdown', event => {
    swallowClick = false;
    if (event.pointerType === 'mouse' || mode === 'seated') return;
    pressedAt = { x: event.clientX, y: event.clientY };
    clearTimeout(longPress);
    heldTarget?.classList.remove('is-held');
    longPress = setTimeout(() => {
      heldTarget = target;
      target.classList.add('is-held');
      swallowClick = true;
    }, 500);
  });
  target.addEventListener('pointermove', event => {
    if (pressedAt && Math.hypot(event.clientX - pressedAt.x, event.clientY - pressedAt.y) > 10) clearTimeout(longPress);
  });
  const endHold = () => {
    clearTimeout(longPress);
    pressedAt = null;
    const held = heldTarget;
    setTimeout(() => {
      held?.classList.remove('is-held');
      if (heldTarget === held) heldTarget = null;
      swallowClick = false;
    }, 650);
  };
  target.addEventListener('pointerup', endHold);
  target.addEventListener('pointercancel', endHold);
  target.addEventListener('contextmenu', event => event.preventDefault());
}

async function loadVisitors() {
  const response = await fetch('images/avatar-frames.json');
  if (!response.ok) throw new Error('아바타 그림 정보를 열 수 없어요.');
  const { visitors: choices } = await response.json();
  visitor = choices.find(choice => choice.id === saved.visitor) || choices[1];
  for (const choice of choices) {
    const button = document.createElement('button');
    button.type = 'button';
    window.roomLanguage.bind(button, choice.label);
    button.setAttribute('aria-pressed', String(choice === visitor));
    button.addEventListener('click', () => {
      if (mode !== 'idle') return;
      visitor = choice;
      for (const control of visitors.children) control.setAttribute('aria-pressed', String(control === button));
      draw();
      saveVisit();
    });
    visitors.append(button);
  }
  draw();
  showState();
}

const audio = { update() {}, step() {}, chair() {}, pageTurn() {} };
const windowBird = { update() {} };
window.addEventListener('pagehide', saveVisit);
new ResizeObserver(([entry]) => {
  roomWidth = entry.contentRect.width;
  roomHeight = entry.contentRect.height;
  draw();
}).observe(room);
cueTimer = setTimeout(playCue, 6000);
loadVisitors().catch(() => {
  hint.textContent = roomText('아바타 그림을 불러오지 못했어요. 페이지를 새로고침해 보세요.');
  status.textContent = hint.textContent;
});














