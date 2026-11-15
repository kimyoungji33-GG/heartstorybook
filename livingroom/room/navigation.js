(() => {
  'use strict';

  // Percentages of the room artwork. Footprints and clearances are estimates.
  const floor = { left: 2.7, right: 97.6, back: 51.2, front: 95.5 };
  const furniture = [
    { id: 'hearth', bounds: [0, 51.2, 15.2, 63.6], sortKey: 63.6, top: 22 },
    { id: 'table', selector: '.table-new', bounds: [29, 58.5, 54, 67.3], sortKey: 65.6, top: 45 },
    { selector: '.chair-layer', bounds: [62.8, 51.8, 73.4, 58.8], sortKey: 58.7, top: 48.6 },
    { selector: '#bookshelf', bounds: [78.4, 48, 92, 53.9], sortKey: 50.5, top: 10 },
  ].map(({ bounds: [left, back, right, front], ...object }) => ({
    ...object, footprint: [[left, back], [right, back], [right, front], [left, front]],
  }));

  const aspect = 1080 / 1920;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const distance = (a, b) => Math.hypot(a.x - b.x, (a.y - b.y) * aspect);
  const inside = (point, polygon) => polygon.every((a, index) => {
    const b = polygon[(index + 1) % polygon.length];
    return (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x) > .0001;
  });

  function crosses(from, to, polygon) {
    let enter = 0;
    let exit = 1;
    for (const [index, a] of polygon.entries()) {
      const b = polygon[(index + 1) % polygon.length];
      const side = p => (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
      const start = side(from);
      const end = side(to);
      if (start <= .0001 && end <= .0001) return false;
      if (start > .0001 && end > .0001) continue;
      const t = (.0001 - start) / (end - start);
      if (start <= .0001) enter = Math.max(enter, t);
      else exit = Math.min(exit, t);
    }
    return exit - enter > .00001;
  }

  function create(stage, actors) {
    const scenery = furniture.map(object => ({ ...object, element: object.selector ? stage.querySelector(object.selector) : null }));
    for (const object of scenery) {
      if (object.element) object.element.style.zIndex = Math.round(object.sortKey * 10);
    }

    function blockers(radius) {
      const staticShapes = scenery.map(object => {
        const [[left, back], , [right, front]] = object.footprint;
        return { ...object, polygon: [
          { x: left - radius, y: back - radius }, { x: right + radius, y: back - radius },
          { x: right + radius, y: front + radius }, { x: left - radius, y: front + radius },
        ] };
      });
      return staticShapes.concat(actors().map(actor => ({
        ...actor,
        polygon: Array.from({ length: 8 }, (_, index) => {
          const angle = (index + .5) * Math.PI / 4;
          return {
            x: actor.x + Math.cos(angle) * (actor.rx + radius) / Math.cos(Math.PI / 8),
            y: actor.y + Math.sin(angle) * (actor.ry + radius / aspect) / Math.cos(Math.PI / 8),
          };
        }),
      })));
    }

    const within = p => p.x >= floor.left && p.x <= floor.right && p.y >= floor.back && p.y <= floor.front;
    const valid = (p, shapes) => within(p) && !shapes.some(shape => inside(p, shape.polygon));
    const clear = (a, b, shapes) => !shapes.some(shape => crosses(a, b, shape.polygon));
    function corners(shapes) {
      const boundary = [
        { x: floor.left, y: floor.back }, { x: floor.right, y: floor.back },
        { x: floor.right, y: floor.front }, { x: floor.left, y: floor.front },
      ];
      const polygons = [boundary, ...shapes.map(shape => shape.polygon)];
      const nodes = polygons.flat();
      const cross = (a, b) => a.x * b.y - a.y * b.x;
      const subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
      for (const [index, polygon] of polygons.entries()) {
        for (const other of polygons.slice(index + 1)) {
          polygon.forEach((a, i) => other.forEach((c, j) => {
            const r = subtract(polygon[(i + 1) % polygon.length], a);
            const q = subtract(other[(j + 1) % other.length], c);
            const d = cross(r, q);
            if (Math.abs(d) < .00001) return;
            const offset = subtract(c, a);
            const t = cross(offset, q) / d;
            const u = cross(offset, r) / d;
            if (t < 0 || t > 1 || u < 0 || u > 1) return;
            nodes.push({
              x: clamp(a.x + t * r.x, floor.left, floor.right),
              y: clamp(a.y + t * r.y, floor.back, floor.front),
            });
          }));
        }
      }
      return nodes.filter(p => valid(p, shapes));
    }

    function nearest(p, shapes) {
      if (valid(p, shapes)) return p;
      const candidates = corners(shapes);
      const bounded = { x: clamp(p.x, floor.left, floor.right), y: clamp(p.y, floor.back, floor.front) };
      if (valid(bounded, shapes)) candidates.push(bounded);
      for (const { polygon } of shapes) {
        polygon.forEach((a, i) => {
          const b = polygon[(i + 1) % polygon.length];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const t = clamp(((bounded.x - a.x) * dx + (bounded.y - a.y) * dy * aspect ** 2) /
            (dx ** 2 + dy ** 2 * aspect ** 2), 0, 1);
          const point = { x: a.x + dx * t, y: a.y + dy * t };
          if (valid(point, shapes)) candidates.push(point);
        });
      }
      return candidates.sort((a, b) => distance(p, a) - distance(p, b))[0];
    }

    function route(from, to, shapes) {
      if (clear(from, to, shapes)) return [from, to];
      // A* over mutually visible polygon corners, with a straight-line heuristic.
      const nodes = [from, to, ...corners(shapes)];
      const costs = nodes.map((_, i) => i === 0 ? 0 : Infinity);
      const previous = [];
      const open = new Set([0]);
      while (open.size) {
        const score = i => costs[i] + distance(nodes[i], to);
        const current = [...open].reduce((a, b) => score(a) <= score(b) ? a : b);
        if (current === 1) {
          const path = [to];
          for (let i = previous[current]; i !== undefined; i = previous[i]) path.unshift(nodes[i]);
          return path;
        }
        open.delete(current);
        nodes.forEach((point, next) => {
          const cost = costs[current] + distance(nodes[current], point);
          if (cost >= costs[next] || !clear(nodes[current], point, shapes)) return;
          costs[next] = cost;
          previous[next] = current;
          open.add(next);
        });
      }
      return null;
    }

    // A rounded corner is accepted only if each sampled chord stays outside every blocker.
    function roundCorners(path, shapes) {
      const result = [path[0]];
      for (let i = 1; i < path.length - 1; i++) {
        const a = path[i - 1], b = path[i], c = path[i + 1];
        const blend = (from, to, t) => ({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
        const before = blend(b, a, Math.min(.24, 2 / distance(b, a)));
        const after = blend(b, c, Math.min(.24, 2 / distance(b, c)));
        const curve = Array.from({ length: 7 }, (_, step) => {
          const t = step / 6;
          return blend(blend(before, b, t), blend(b, after, t), t);
        });
        if (curve.every((p, j) => valid(p, shapes) && (!j || clear(curve[j - 1], p, shapes)))) result.push(...curve);
        else result.push(b);
      }
      return [...result, path.at(-1)];
    }

    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    overlay.setAttribute('class', 'walk-debug');
    overlay.setAttribute('viewBox', '0 0 1000 562.5');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.display = 'none';
    stage.append(overlay);

    function drawDebug(point, radius, path, sortKey) {
      if (overlay.style.display === 'none') return;
      const coordinates = p => [p.x * 10, p.y * 10 * aspect];
      const points = path => path.map(p => coordinates(p).join(',')).join(' ');
      const label = (x, y, value) => '<text x="' + x + '" y="' + y + '">' + value + '</text>';
      const shapes = scenery.map(object => {
        const [[x, y]] = object.footprint;
        return '<polygon points="' + points(object.footprint.map(([x, y]) => ({ x, y }))) + '"/>' +
          label(x * 10, y * 10 * aspect - 4, object.sortKey);
      });
      for (const actor of actors()) {
        const [x, y] = coordinates(actor);
        shapes.push('<ellipse cx="' + x + '" cy="' + y + '" rx="' + actor.rx * 10 + '" ry="' + actor.ry * 10 * aspect + '"/>' +
          label(x, y - 6, actor.sortKey));
      }
      const [x, y] = coordinates(point);
      overlay.innerHTML = shapes.join('') + '<polyline points="' + points([point, ...path]) + '"/>' +
        '<circle cx="' + x + '" cy="' + y + '" r="' + radius * 10 + '"/>' + label(x, y - 12, sortKey.toFixed(1));
    }

    return {
      floor, blockers, nearest, valid, distance, drawDebug,
      toggleDebug() { overlay.style.display = overlay.style.display === 'none' ? '' : 'none'; },
      route(from, to, shapes, radius) {
        // Plan with extra clearance so the smoothed path can stay within the actual free area.
        const padded = blockers(radius + .55);
        const path = valid(from, padded) && valid(to, padded) && route(from, to, padded) || route(from, to, shapes);
        return path && roundCorners(path, shapes);
      },
    };
  }

  window.makeRoomNavigation = create;
})();
