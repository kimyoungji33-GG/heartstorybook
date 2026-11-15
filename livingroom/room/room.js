'use strict';

const element = id => document.getElementById(id);
const experience = element('experience');
const room = element('stage');
const avatar = element('avatar');
const poseBox = element('pose');
const spriteFrame = element('frame');
const sprite = element('sprite');
const bowSprite = element('bow-sprite');
const bowArt = {
  man: { x: 430, y: 1405, height: 1273 },
  woman: { x: 441, y: 1405, height: 1250 },
  girl: { x: 460, y: 1412, height: 1265 },
  boy: { x: 410, y: 1373, height: 1240 },
};
const seatedPose = element('seat-pose');
const seatedFrame = element('seat-frame');
const seatedSprite = element('seat-sprite');
const controls = element('controls');
const stand = element('stand');
const chair = element('chair');
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
// Lap anchors are in seated-sprite pixels, before scaling and mirroring.
const lapBookDefaults = {
  man: { x: 110, y: 234, width: 131 },
  woman: { x: 109, y: 231, width: 122 },
  girl: { x: 137, y: 255, width: 124 },
  boy: { x: 125, y: 251, width: 120 },
};
const seats = {
  window: {
    id: 'cushion',
    label: '바닥 방석',
    button: 'chair',
    surface: { left: 1225, right: 1390 },
    approach: { x: 68.1, y: 63.5 },
    contact: { x: 1308, y: 566 },
    childInset: { x: -3, y: -4 },
    facing: 1,
  },
};
const navigation = window.makeRoomNavigation(room, () => window.roomFamily.blockers());
const { floor, distance } = navigation;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const mix = (a, b, t) => a + (b - a) * t;
const interpolate = (a, b, t) => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t) });

function readVisit() {
  try { return JSON.parse(localStorage.getItem(storeKey)) || {}; }
  catch { return {}; }
}

const saved = readVisit();
let position = saved.position && navigation.valid(saved.position, navigation.blockers(0)) ? saved.position : entrance;
let listenerPosition = position;
let lastStanding = position;
let direction = saved.direction === 1 ? 1 : -1;
let mode = 'idle';
let visitor;
let frameNumber = 0;
let walkCycleFrame = 0;
let walkSway = 0;
let walkHeading = direction === 1 ? 0 : Math.PI;
let walkFacing = direction;
let walkBob = 0;
let walkingPath = [];
let walkRevision = 0;
// Add an avatar id with carry and reading paths. Turning and walking frames are optional.
// Fit larger source art inside the avatar's existing pose frame when needed.
const readingSprites = {
  girl: {
    poses: {
      carry: 'images/reading-samples/carry_stand_girl.png',
      reading: 'images/reading-samples/reading_sit_girl_a.png',
      turning: 'images/reading-samples/reading_sit_girl_b.png',
      stride: 'images/reading-samples/carry_walk_girl_1.png',
      passing: 'images/reading-samples/carry_walk_girl_2.png',
    },
    walkFrame: { width: 213, height: 373 },
    seatedZoom: 1.25,
  },
  boy: {
    poses: {
      carry: 'images/reading-samples/carry_stand_boy.png',
      reading: 'images/reading-samples/reading_sit_boy_a.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/walk_boy_' + step + '.png'),
    walkFrame: { width: 228, height: 373 },
    fit: {
      carry: { width: 820, height: 1918, scale: .198, x: -2, y: 1 },
      reading: { width: 890, height: 1767, scale: .211, x: 0, y: -1 },
    },
  },
  man: {
    poses: {
      carry: 'images/reading-samples/carry_stand_man.png',
      reading: 'images/reading-samples/reading_sit_man_a.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/walk_man_' + step + '.png'),
    walkFrame: { width: 1080, height: 2095, baseline: 2021 },
    fit: {
      carry: { width: 750, height: 2095, scale: .195, x: -5, y: 0 },
      reading: { width: 889, height: 1769, scale: .207, x: -7, y: -4 },
    },
  },
  woman: {
    poses: {
      carry: 'images/reading-samples/carry_stand_woman.png',
      reading: 'images/reading-samples/reading_sit_woman_a.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/walk_woman_' + step + '.png'),
    walkFrame: { width: 1080, height: 2095, baseline: 2021 },
    fit: {
      carry: { width: 750, height: 2095, scale: .185, x: 4, y: -2 },
      reading: { width: 889, height: 1769, scale: .201, x: -9, y: -7 },
    },
  },
};
const readingArt = new Map();

// 감 드리기(persimmon-giving) poses. Each avatar's carry/eating art shares the
// exact canvas size as its book-carry art, so the same fit works for both poses.
const persimmonSprites = {
  girl: {
    poses: {
      carry: 'images/reading-samples/carry_tray_girl.png',
      eating: 'images/reading-samples/eating_persimmon_girl.png',
      stride: 'images/reading-samples/carry_tray_walk_girl_1.png',
      passing: 'images/reading-samples/carry_tray_walk_girl_2.png',
    },
    walkFrame: { width: 213, height: 373 },
  },
  boy: {
    poses: {
      carry: 'images/reading-samples/carry_tray_boy.png',
      eating: 'images/reading-samples/eating_persimmon_boy.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/carry_tray_walk_boy_' + step + '.png'),
    walkFrame: { width: 228, height: 373 },
    fit: { width: 820, height: 1918, scale: .198, x: -2, y: 1 },
  },
  man: {
    poses: {
      carry: 'images/reading-samples/carry_tray_man.png',
      eating: 'images/reading-samples/eating_persimmon_man.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/carry_tray_walk_man_' + step + '.png'),
    walkFrame: { width: 1080, height: 2095, baseline: 2021 },
    fit: { width: 750, height: 2095, scale: .195, x: -5, y: 0 },
  },
  woman: {
    poses: {
      carry: 'images/reading-samples/carry_tray_woman.png',
      eating: 'images/reading-samples/eating_persimmon_woman.png',
    },
    walkCycle: [1, 2, 3, 4].map(step => 'images/reading-samples/carry_tray_walk_woman_' + step + '.png'),
    walkFrame: { width: 1080, height: 2095, baseline: 2021 },
    fit: { width: 750, height: 2095, scale: .185, x: 4, y: -2 },
  },
};
const persimmonArt = new Map();
let persimmonStage = null; // null | 'carry' | 'eating'
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
let familyApproach = false;

function saveVisit() {
  try {
    localStorage.setItem(storeKey, JSON.stringify({
      visitor: visitor?.id, position: lastStanding, direction,
    }));
  } catch {
    // The room also works with browser storage disabled.
  }
}

const bookshelf = roomSettings.reading ? window.makeRoomBookshelf?.({
  room,
  artSize: roomArtSize,
  canBrowse: () => canReadBooks() && !familyApproach && !element('weather-dialog').open && ['idle', 'walking', 'seated'].includes(mode),
  visit: (destination, after) => {
    interact();
    const approach = () => walkTo(destination, null, false, () => {
      direction = 1;
      draw();
      if (!element('weather-dialog').open) after();
    });
    if (mode === 'seated') changeSeat(activeSeat, false, false, approach);
    else approach();
  },
  stillMotion,
  refresh: () => draw(),
}) : null;

const seatCheck = window.makeSeatCheck?.({
  artSize: roomArtSize,
  lapBookDefaults,
  draw: () => draw(),
  getValues: () => visitor ? {
    visitor,
    seat: activeSeat || lastSeat,
    child: visitor.height < .4,
    hasBook: bookshelf?.hasBook(),
    hasReadingArt: Boolean(readingArt.get(visitor.id)?.reading),
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

function canReadBooks() {
  return readingArt.has(visitor?.id);
}

const readingArtLoads = new Set();
async function loadReadingArt(choice) {
  const config = readingSprites[choice.id];
  if (!bookshelf || !config?.poses.carry || !config.poses.reading || readingArtLoads.has(choice.id)) return;
  readingArtLoads.add(choice.id);
  const frames = {
    carry: choice.frames[0],
    reading: choice.frames[3],
    turning: choice.frames[3],
    stride: config.walkFrame,
    passing: config.walkFrame,
  };
  const entries = await Promise.all(Object.entries(config.poses).map(([pose, path]) => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const frame = config.fit?.[pose] ?? frames[pose];
      resolve(image.naturalWidth === frame?.width && image.naturalHeight === frame?.height ? [pose, path] : null);
    };
    image.onerror = () => resolve(null);
    image.src = path;
  })));
  if (entries.some(entry => !entry)) return;
  const art = { ...Object.fromEntries(entries), walkFrame: config.walkFrame, fit: config.fit, seatedZoom: config.seatedZoom ?? 1 };
  readingArt.set(choice.id, art);
  if (visitor === choice) draw();
  if (config.walkCycle) {
    const ready = await Promise.all(config.walkCycle.map(path => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth === config.walkFrame.width && image.naturalHeight === config.walkFrame.height);
      image.onerror = () => resolve(false);
      image.src = path;
    })));
    if (ready.every(Boolean)) {
      art.walkCycle = config.walkCycle;
      if (visitor === choice) draw();
    }
  }
}

const persimmonArtLoads = new Set();
async function loadPersimmonArt(choice) {
  const config = persimmonSprites[choice.id];
  if (!config || persimmonArtLoads.has(choice.id)) return;
  persimmonArtLoads.add(choice.id);
  const standing = config.fit ?? choice.frames[0];
  const frames = { carry: standing, eating: standing, stride: config.walkFrame, passing: config.walkFrame };
  const entries = await Promise.all(Object.entries(config.poses).map(([pose, path]) => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const frame = frames[pose];
      resolve(image.naturalWidth === frame?.width && image.naturalHeight === frame?.height ? [pose, path] : null);
    };
    image.onerror = () => resolve(null);
    image.src = path;
  })));
  if (entries.some(entry => !entry)) return;
  const art = { ...Object.fromEntries(entries), fit: config.fit, walkFrame: config.walkFrame };
  persimmonArt.set(choice.id, art);
  if (visitor === choice) draw();
  if (config.walkCycle) {
    const ready = await Promise.all(config.walkCycle.map(path => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth === config.walkFrame.width && image.naturalHeight === config.walkFrame.height);
      image.onerror = () => resolve(false);
      image.src = path;
    })));
    if (ready.every(Boolean)) {
      art.walkCycle = config.walkCycle;
      if (visitor === choice) draw();
    }
  }
}

function paintFrame(frameElement, imageElement, frame, scale, anchor, poseArt, fit) {
  const image = poseArt || 'images/' + visitor.atlas + '.webp';
  if (imageElement.getAttribute('src') !== image) imageElement.src = image;
  imageElement.style.width = (fit ? fit.width * fit.scale : poseArt ? frame.width : 1024) * scale + 'px';
  imageElement.style.height = (fit ? fit.height * fit.scale : poseArt ? frame.height : 1536) * scale + 'px';
  imageElement.style.left = (poseArt ? fit?.x ?? 0 : -frame.x) * scale + 'px';
  imageElement.style.top = (poseArt ? fit?.y ?? 0 : -frame.y) * scale + 'px';
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

function drawChairPose(standingHeight, geometry, art) {
  const standing = visitor.frames[0];
  const sitting = visitor.frames[3];
  const standScale = standingHeight / standing.height;
  const sitScale = standHeight({ y: activeSeat.approach.y - 3.5 }) * visitor.seatedScale *
    (visitor.height >= .4 ? .91 : .86) / sitting.height;
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
  paintFrame(spriteFrame, sprite, standing, standScale, standingHip, art?.carry, art?.fit?.carry);
  const readingPose = bookshelf?.isTurning() && art?.turning ? art.turning : art?.reading;
  const book = seatCheck?.bookPosition(visitor) || lapBookDefaults[visitor.id];
  const defaultBook = lapBookDefaults[visitor.id];
  const size = readingPose ? book.width / defaultBook.width : 1;
  const poseScale = sitScale * size;
  const zoom = readingPose ? art.seatedZoom : 1;
  const footOffset = (sitting.height - geometry.hip.y) * poseScale * (zoom - 1);
  paintFrame(seatedFrame, seatedSprite, sitting, poseScale * zoom, geometry.hip, readingPose, art?.fit?.reading);
  const offset = readingPose ? {
    x: (book.x - defaultBook.x) * sitScale * activeSeat.facing,
    y: (book.y - defaultBook.y) * sitScale - footOffset,
  } : { x: 0, y: 0 };
  seatedFrame.style.transformOrigin = (geometry.hip.x * sitScale * zoom) + 'px ' + (geometry.hip.y * sitScale * zoom) + 'px';
  seatedFrame.style.setProperty('--breath-unit', .62 / Math.max(1, geometry.hip.y * sitScale * zoom));
  positionPose(poseBox, hip, direction, 1 - blend, lean, 1 - .14 * shift);
  positionPose(seatedPose, { x: hip.x + offset.x, y: hip.y + offset.y }, activeSeat.facing, blend, lean * .4);
  const point = {
    x: (position.x / 100 + hip.x / (roomWidth || 1)) * roomArtSize.width,
    y: (position.y / 100 + hip.y / (roomHeight || 1)) * roomArtSize.height,
  };
  const bookPoint = mode === 'seated' && readingPose && roomWidth && roomHeight ? {
    x: point.x + (offset.x + (defaultBook.x - geometry.hip.x) * poseScale * zoom * activeSeat.facing) / roomWidth * roomArtSize.width,
    y: point.y + (offset.y + (defaultBook.y - geometry.hip.y) * poseScale * zoom) / roomHeight * roomArtSize.height,
  } : null;
  return { point, bookPoint };
}

function draw() {
  listenerPosition = position;
  avatar.style.left = position.x + '%';
  avatar.style.top = position.y + '%';
  const chairAction = Boolean(activeSeat);
  const depth = activeSeat ? 910 : Math.round(position.y * 10) + 1;
  avatar.style.zIndex = String(depth);
  navigation.drawDebug(position, (visitor?.walking.footRadiusPx ?? 0) / roomArtSize.width * 100, walkingPath, depth / 10);
  room.classList.toggle('is-seating', chairAction);
  room.dataset.seat = activeSeat?.id || '';
  room.classList.toggle('is-resting', mode === 'seated');
  avatar.classList.toggle('is-idle', mode === 'idle');
  avatar.classList.toggle('is-bowing', mode === 'bowing');
  if (visitor) {
    const standingHeight = standHeight(position);
    const persimmon = persimmonStage ? persimmonArt.get(visitor.id) : null;
    const activityArt = persimmon ? {
      carry: persimmon[persimmonStage],
      fit: { carry: persimmon.fit },
      ...(persimmonStage === 'carry' ? {
        walkCycle: persimmon.walkCycle,
        stride: persimmon.stride,
        passing: persimmon.passing,
        walkFrame: persimmon.walkFrame,
      } : {}),
    } : null;
    const art = activityArt || (bookshelf?.hasBook() ? readingArt.get(visitor.id) : null);
    const greetingArt = bowArt[visitor.id];
    bowSprite.hidden = mode !== 'bowing' || !avatar.classList.contains('is-greeting') || !greetingArt || !bowSprite.naturalWidth;
    if (!bowSprite.hidden) {
      const scale = standingHeight * .94 / greetingArt.height;
      bowSprite.style.width = 1024 * scale + 'px';
      bowSprite.style.left = -greetingArt.x * scale + 'px';
      bowSprite.style.top = -greetingArt.y * scale + 'px';
    }
    spriteFrame.hidden = !bowSprite.hidden;
    avatar.style.setProperty('--breath-unit', .62 / Math.max(1, standingHeight));
    const geometry = seatGeometry(activeSeat || lastSeat);
    let seated = null;
    if (chairAction) {
      seated = drawChairPose(standingHeight, geometry, art);
      listenerPosition = interpolate(position, {
        x: geometry.contact.x / roomArtSize.width * 100,
        y: geometry.contact.y / roomArtSize.height * 100,
      }, smooth(seatProgress));
    } else {
      const walkArt = art?.carry && mode === 'walking'
        ? (art.walkCycle?.[walkCycleFrame] ?? (frameNumber === 1 ? art.stride : frameNumber === 2 ? art.passing : null))
        : null;
      const frame = walkArt ? art.walkFrame : visitor.frames[art?.carry ? 0 : frameNumber];
      const baseline = frame.baseline ?? frame.height;
      paintFrame(spriteFrame, sprite, frame, standingHeight / baseline,
        { x: frame.width / 2, y: baseline }, walkArt || art?.carry, walkArt ? undefined : art?.fit?.carry);
      const sway = art?.carry && !walkArt && mode === 'walking' ? walkSway : 0;
      const facing = mode === 'walking' && !art?.walkCycle ? walkFacing : direction;
      positionPose(poseBox, { x: 0, y: -walkBob * roomWidth / roomArtSize.width },
        facing, 1, sway * 1.2, 1 - Math.abs(sway) * .007);
    }
    avatar.style.setProperty('--shadow-width', standingHeight * .43 + 'px');
    avatar.style.setProperty('--shadow-height', standingHeight * .08 + 'px');
    bookshelf?.renderBook(mode === 'seated', art);
    seatCheck?.render(geometry.contact, seated?.point, seated?.bookPoint);
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
  bookshelf?.draw(position, mode, canReadBooks());
  window.roomFamily.draw(position, Boolean(visitor) && mode === 'idle');
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
  hint.textContent = roomText(sitting ? '원하는 만큼 쉬어 가세요.' : '바닥을 누르면 걸어요. 바닥 방석에 앉아 보세요.');
}
document.addEventListener('roomlanguagechange', showState);

function finishWalking(destination, seat, keyboard, onArrival) {
  position = destination;
  lastStanding = position;
  mode = 'idle';
  frameNumber = 0;
  walkBob = walkSway = 0;
  walkingPath = [];
  draw();
  saveVisit();
  if (seat) changeSeat(seat, true, keyboard);
  else {
    showState();
    onArrival?.();
  }
}

function walkingProfile(length, speed, acceleration) {
  const peak = Math.min(speed, Math.sqrt(length * acceleration));
  const ramp = peak / acceleration;
  const cruise = Math.max(0, (length - peak * ramp) / peak);
  const duration = ramp * 2 + cruise;
  return {
    duration,
    travelled(time) {
      if (time < ramp) return acceleration * time ** 2 / 2;
      if (time >= ramp + cruise) return length - acceleration * (duration - time) ** 2 / 2;
      return peak * (time - ramp / 2);
    },
  };
}

function walkTo(destination, seat = null, keyboard = false, onArrival = null) {
  if (!visitor || (mode !== 'idle' && mode !== 'walking') || familyApproach) return false;
  const { footRadiusPx, walkSpeedPxPerSec, accelPxPerSec2, maxTurnDegPerSec, gaitCycleSec } = visitor.walking;
  const footRadius = footRadiusPx / roomArtSize.width * 100;
  const shapes = navigation.blockers(footRadius);
  const origin = navigation.nearest(position, shapes);
  const target = seat ? destination : navigation.nearest(destination, shapes);
  if (!origin || !target || !navigation.valid(target, shapes)) return false;
  const path = navigation.route(origin, target, shapes, footRadius);
  if (!path) return false;

  cancelAnimationFrame(animationId);
  const revision = ++walkRevision;
  position = origin;
  const lengths = path.slice(1).map((point, i) => distance(path[i], point) * roomArtSize.width / 100);
  const length = lengths.reduce((sum, value) => sum + value, 0);
  if (stillMotion() || length < 3) {
    const delta = target.x - position.x;
    if (Math.abs(delta) > .05) direction = Math.sign(delta);
    finishWalking(target, seat, keyboard, onArrival);
    return true;
  }

  if (mode !== 'walking') {
    walkHeading = direction === 1 ? 0 : Math.PI;
    walkFacing = direction;
  }
  mode = 'walking';
  walkingPath = path.slice(1);
  showState();
  const profile = walkingProfile(length, walkSpeedPxPerSec, accelPxPerSec2);
  const start = performance.now();
  const stride = walkSpeedPxPerSec * gaitCycleSec / 2;
  let lastTime = start;
  let stepNumber = 0;
  let segment = 0;
  let covered = 0;

  function walk(now) {
    if (revision !== walkRevision) return;
    const time = (now - start) / 1000;
    if (time >= profile.duration || stillMotion()) {
      finishWalking(target, seat, keyboard, onArrival);
      return;
    }

    const travelled = profile.travelled(time);
    while (segment < lengths.length - 1 && travelled >= covered + lengths[segment]) {
      covered += lengths[segment++];
    }
    const from = path[segment];
    const to = path[segment + 1];
    position = interpolate(from, to, lengths[segment] ? clamp((travelled - covered) / lengths[segment], 0, 1) : 0);
    lastStanding = position;
    walkingPath = path.slice(segment + 1);

    const heading = Math.atan2((to.y - from.y) * roomArtSize.height / roomArtSize.width, to.x - from.x);
    const turn = Math.atan2(Math.sin(heading - walkHeading), Math.cos(heading - walkHeading));
    const dt = Math.min((now - lastTime) / 1000, .05);
    const maxTurn = maxTurnDegPerSec * Math.PI / 180 * dt;
    walkHeading += clamp(turn, -maxTurn, maxTurn);
    const desiredFacing = Math.abs(Math.cos(heading)) < .19 ? direction : Math.sign(Math.cos(walkHeading));
    walkFacing += clamp(desiredFacing - walkFacing, -dt * 10, dt * 10);
    const walkingWithCycleArt = (bookshelf?.hasBook() && readingArt.get(visitor.id)?.walkCycle) ||
      (persimmonStage === 'carry' && persimmonArt.get(visitor.id)?.walkCycle);
    if (walkingWithCycleArt) {
      if (Math.abs(Math.cos(heading)) >= .19) direction = Math.sign(to.x - from.x);
    } else if (Math.abs(walkFacing) >= .15) direction = Math.sign(walkFacing);
    const phase = travelled / stride;
    walkCycleFrame = Math.floor(phase * 2) % 4;
    const nextStep = Math.floor(phase + .15);
    if (nextStep !== stepNumber) {
      stepNumber = nextStep;
      audio.step();
    }
    frameNumber = phase > .1 ? 1 + nextStep % 2 : 0;
    const ease = Math.min(1, time * 6, (profile.duration - time) * 6);
    walkSway = Math.sin(phase * Math.PI) * ease;
    walkBob = (visitor.height < .4 ? 3 : 2) * Math.abs(Math.sin(phase * Math.PI)) * ease;
    lastTime = now;
    draw();
    animationId = requestAnimationFrame(walk);
  }
  animationId = requestAnimationFrame(walk);
  return true;
}

function bow(facing, after, duration = 950) {
  mode = 'bowing';
  direction = facing;
  draw();
  showState();

  const finish = () => {
    mode = 'idle';
    draw();
    showState();
    after?.();
  };
  if (stillMotion() && !avatar.classList.contains('is-greeting')) finish();
  else setTimeout(finish, duration);
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
  if (event.code === 'KeyD' && !event.repeat && !event.ctrlKey && !event.metaKey &&
      !event.target.closest?.('input, textarea, select, [contenteditable], dialog') &&
      roomSettings.testing) {
    navigation.toggleDebug();
    draw();
  }
  if (event.defaultPrevented || shelfDialog?.open || event.target.closest?.('#weather-dialog, .room-header-actions')) return;
  const wasQuiet = quiet;
  interact();
  if (wasQuiet && (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    stand.focus({ preventScroll: true });
  }
});
function chooseSeat(event, seat) {
  if (swallowClick) return;
  if (mode !== 'idle' && mode !== 'walking') return;
  interact();
  lastSeat = seat;
  walkTo(seat.approach, seat, event.detail === 0);
}

chair.addEventListener('click', event => chooseSeat(event, seats.window));
stand.addEventListener('click', event => changeSeat(activeSeat, false, event.detail === 0));
element('fruit-tray')?.addEventListener('click', () => {
  if (swallowClick) return;
  interact();
  window.roomFamily.givePersimmon?.();
});

room.addEventListener('click', event => {
  if (event.target.closest('button, .fam-bubble')) return;
  if (mode === 'seated') return;
  interact();
  const bounds = room.getBoundingClientRect();
  const point = {
    x: (event.clientX - bounds.left) / bounds.width * 100,
    y: (event.clientY - bounds.top) / bounds.height * 100,
  };
  if (!canReadBooks() && point.x >= 78.5 && point.x <= 91.5 && point.y >= 10 && point.y <= 53) return;
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
  const response = await fetch('images/avatar-frames.json?v=walk-1');
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
      if (choice !== visitor) bookshelf?.returnBook();
      visitor = choice;
      loadReadingArt(visitor);
      loadPersimmonArt(visitor);
      loadBowArt();
      for (const control of visitors.children) control.setAttribute('aria-pressed', String(control === button));
      draw();
      saveVisit();
    });
    visitors.append(button);
  }
  loadBowArt();
  loadReadingArt(visitor);
  loadPersimmonArt(visitor);
  draw();
  showState();
}

function loadBowArt() {
  if (bowArt[visitor.id]) bowSprite.src = 'images/bow-' + visitor.id + '.png';
  else bowSprite.removeAttribute('src');
}

bowSprite.addEventListener('load', draw);
bowSprite.addEventListener('error', draw);

const audio = { update() {}, step() {}, chair() {}, pageTurn() {} };
const windowBird = { update() {} };
window.roomAvatar = {
  stillMotion,
  approach(target, after, failed) {
    if (!visitor || familyApproach || !['idle', 'walking', 'seated'].includes(mode)) return false;
    const destination = {
      x: clamp(target.x + (target.offsetX ?? 7.8), floor.left, floor.right),
      y: clamp(target.y + (target.offsetY ?? 6), floor.back, floor.front),
    };
    const start = () => {
      let arrived = false;
      const started = walkTo(destination, null, false, () => {
        arrived = true;
        familyApproach = false;
        after();
      });
      if (!arrived) familyApproach = started;
      if (!started) failed();
      return started;
    };
    if (mode !== 'seated') return start();
    changeSeat(activeSeat, false, false, start);
    return true;
  },
  bowToward(x, after) {
    if (!visitor || mode !== 'idle') return;
    const facing = x < position.x ? -1 : 1;
    bow(facing, after, stillMotion() ? 300 : 900);
  },
  hasPersimmonArt() {
    return persimmonArt.has(visitor?.id);
  },
  faceToward(x) {
    if (!visitor || mode !== 'idle') return;
    direction = x < position.x ? -1 : 1;
    draw();
  },
  setCarrying(stage) {
    persimmonStage = stage;
    draw();
  },
  eatPersimmon(after) {
    persimmonStage = 'eating';
    draw();
    setTimeout(() => {
      persimmonStage = null;
      draw();
      after?.();
    }, stillMotion() ? 200 : 1300);
  },
};

const weatherKey = 'maeum_weather_v1';
const weatherWindow = element('weather-window');
const weatherRadio = element('weather-radio');
const weatherDialog = element('weather-dialog');
const weatherOptions = [...weatherDialog.querySelectorAll('[data-weather]')];
const weatherNames = new Set(weatherOptions.map(option => option.dataset.weather));
let selectedWeather;

function showWeather(weather) {
  selectedWeather = weather;
  weatherWindow.dataset.weather = weather;
  for (const option of weatherOptions) {
    option.setAttribute('aria-pressed', String(option.dataset.weather === weather));
  }

}

try { selectedWeather = localStorage.getItem(weatherKey); } catch {}
if (weatherNames.has(selectedWeather)) showWeather(selectedWeather);
else showWeather('sunny');
weatherRadio.addEventListener('click', () => {
  if (!weatherDialog.open) weatherDialog.showModal();
});
for (const option of weatherOptions) {
  option.addEventListener('click', () => {
    showWeather(option.dataset.weather);
    window.roomFamily.playWeather(selectedWeather);
    try { localStorage.setItem(weatherKey, selectedWeather); } catch {}
    weatherDialog.close();
  });
}
weatherDialog.addEventListener('close', () => weatherRadio.focus({ preventScroll: true }));
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














