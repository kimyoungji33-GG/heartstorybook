'use strict';

// 벽난로 앞 방석의 바닥 위치, 원근, 앞뒤 순서와 돌아가는 길을 한곳에서 맞춰요.
(() => {
  const ROOM = { width: 1920, height: 1080 };
  const image = 'images/cushions/floor-cushion.webp';
  const aspect = 181 / 300;
  const spots = [
    { centerX: 134, floorY: 821, width: 226, flip: false, tilt: -1.1, look: 'right' },
    { centerX: 368, floorY: 785, width: 217, flip: true, tilt: 1.0, look: 'left' },
    { centerX: 316, floorY: 953, width: 262, flip: false, tilt: -.7, look: 'left' },
  ];
  let allowedIndex = null;

  const pct = (value, total) => (value / total * 100) + '%';
  const geometry = spot => ({
    left: spot.centerX - spot.width / 2,
    top: spot.floorY - spot.width * aspect,
    width: spot.width,
    floorY: spot.floorY,
    centerX: spot.centerX,
    zIndex: Math.round(spot.floorY / ROOM.height * 1000),
  });

  function place(button, spot, index) {
    const box = geometry(spot);
    button.style.left = pct(box.left, ROOM.width);
    button.style.top = pct(box.top, ROOM.height);
    button.style.width = pct(box.width, ROOM.width);
    button.style.zIndex = String(box.zIndex);
    button.style.setProperty('--tilt', spot.tilt + 'deg');
    button.dataset.cushionIndex = String(index);
    button.dataset.floorY = String(spot.floorY);
  }

  function blocker(spot, index) {
    if (index === allowedIndex) return null;
    const box = geometry(spot);
    const visualHeight = box.width * aspect;
    return {
      x: box.centerX / ROOM.width * 100,
      y: (box.floorY - visualHeight * .12) / ROOM.height * 100,
      rx: box.width / ROOM.width * 44,
      ry: Math.max(1.15, visualHeight / ROOM.height * 18),
      sortKey: box.floorY / ROOM.height * 100,
    };
  }

  function attachBlockers() {
    const family = window.roomFamily;
    if (!family || family.withFloorCushions) return;
    const base = family.blockers;
    family.blockers = () => base().concat(spots.map(blocker).filter(Boolean));
    family.withFloorCushions = true;
  }

  function installStyles() {
    if (document.getElementById('floor-cushion-grounding')) return;
    const style = document.createElement('style');
    style.id = 'floor-cushion-grounding';
    style.textContent = `
      .firewatch-cushion { isolation: isolate; }
      .firewatch-cushion::before {
        content: ""; position: absolute; border-radius: 50%; pointer-events: none; z-index: -1;
        left: 7%; right: 7%; bottom: -1%; height: 12%;
        background: rgba(92, 55, 27, .25); filter: blur(5px); opacity: 1;
        transform: scaleX(.94);
      }
      .firewatch-cushion img {
        transform: rotate(var(--tilt, 0deg)); transform-origin: 50% 100%;
        filter: drop-shadow(0 2px 2px rgba(74, 42, 20, .2));
      }
      .firewatch-cushion.is-flipped img { transform: rotate(var(--tilt, 0deg)) scaleX(-1); }
      .firewatch-cushion:hover img, .firewatch-cushion:focus-visible img {
        filter: brightness(1.04) drop-shadow(0 2px 2px rgba(74, 42, 20, .2));
      }
    `;
    document.head.append(style);
  }

  window.roomFloorCushions = {
    image, aspect, spots, geometry, place, installStyles, attachBlockers,
    allow(index = null) { allowedIndex = index; },
  };
  attachBlockers();
})();
