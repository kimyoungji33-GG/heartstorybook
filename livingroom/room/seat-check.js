(() => {
  const storageKey = 'heartstorybook-seat-check-v1';

  window.makeSeatCheck = ({ artSize, draw, getValues }) => {
    const byId = id => document.getElementById(id);
    const experience = byId('experience');
    const diagnostic = experience.dataset.testMode === 'on';
    const guides = byId('seat-guides');
    const seatLine = byId('seat-line');
    const seatDot = byId('seat-point');
    const hipDot = byId('hip-point');
    const report = byId('seat-report');
    const values = byId('seat-values');
    const keys = byId('seat-keys');
    const copyBox = byId('seat-copy');
    const copyStatus = byId('seat-copy-status');

    function readAdjustments() {
      try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
      catch { return {}; }
    }

    const saved = readAdjustments();
    const avatarPoints = { ...saved.avatarPoints };
    const chairPoints = { ...saved.chairPoints };
    const childInsets = { ...saved.childInsets };
    let showPoints = false;
    let editing = false;
    let editTarget = 'hip';

    const validPoint = (value, fallback) => Number.isInteger(value?.x) && Number.isInteger(value?.y) ? value : fallback;
    const hipKey = (visitor, seat) => seat.id === 'window' ? visitor.id : seat.id + ':' + visitor.id;
    const avatarHip = (visitor, seat) => validPoint(avatarPoints[hipKey(visitor, seat)], visitor.seatedHip);
    const chairBase = seat => validPoint(chairPoints[seat.id], seat.contact);
    const childInset = seat => validPoint(childInsets[seat.id], seat.childInset);
    const chairPoint = (seat, child) => {
      const base = chairBase(seat);
      const inset = child ? childInset(seat) : { x: 0, y: 0 };
      return { x: base.x + inset.x, y: base.y + inset.y };
    };

    function place(dot, point) {
      dot.style.left = point.x / artSize.width * 100 + '%';
      dot.style.top = point.y / artSize.height * 100 + '%';
    }

    function render(contact, hip) {
      if (report.hidden) return;
      const current = getValues();
      if (!current) return;
      place(seatDot, contact);
      seatLine.style.top = contact.y / artSize.height * 100 + '%';
      seatLine.style.left = current.seat.surface.left / artSize.width * 100 + '%';
      seatLine.style.width = (current.seat.surface.right - current.seat.surface.left) / artSize.width * 100 + '%';
      hipDot.hidden = !hip;
      if (hip) place(hipDot, hip);
      const avatar = avatarHip(current.visitor, current.seat);
      values.textContent = current.seat.label + ' · ' + current.visitor.label + ' · 엉덩이 ' + avatar.x + ', ' + avatar.y +
        ' · 방석 ' + contact.x + ', ' + contact.y + (hip ? '' : ' · 앉으면 빨간 점이 보여요.');
    }

    function paintControls() {
      experience.classList.toggle('seat-editing', editing);
      guides.hidden = report.hidden = !(showPoints || editing);
      keys.textContent = editing
        ? '조정 중 · ' + (editTarget === 'hip' ? '① 엉덩이' : '② 방석') + ' · 1/2 대상 바꾸기 · 방향키 1 · Shift 10 · C 복사'
        : 'D 점 숨기기 · P 위치 조정';
      if (!editing) {
        copyBox.hidden = true;
        copyStatus.textContent = '';
      }
      draw();
    }

    function move(current, delta) {
      const { visitor, seat, child } = current;
      const point = editTarget === 'hip' ? avatarHip(visitor, seat) : chairPoint(seat, child);
      const frame = visitor.frames[3];
      const limit = editTarget === 'hip' ? { x: frame.width - 1, y: frame.height - 1 } : artSize;
      const next = {
        x: Math.max(0, Math.min(limit.x ?? limit.width, point.x + delta.x)),
        y: Math.max(0, Math.min(limit.y ?? limit.height, point.y + delta.y)),
      };
      if (editTarget === 'hip') avatarPoints[hipKey(visitor, seat)] = next;
      else if (child) {
        const base = chairBase(seat);
        childInsets[seat.id] = { x: next.x - base.x, y: next.y - base.y };
      } else chairPoints[seat.id] = next;
      try { localStorage.setItem(storageKey, JSON.stringify({ avatarPoints, chairPoints, childInsets })); }
      catch { /* Keep live adjustments available even if storage is blocked. */ }
      copyBox.hidden = true;
      copyStatus.textContent = '';
      draw();
    }

    async function copyValues({ visitor, seat }) {
      const content = JSON.stringify({
        avatar: visitor.id,
        seatedHip: avatarHip(visitor, seat),
        seat: seat.id,
        contact: chairBase(seat),
        childInset: childInset(seat),
      }, null, 2);
      copyBox.hidden = false;
      copyBox.value = content;
      try {
        await navigator.clipboard.writeText(content);
        copyStatus.textContent = '값을 복사했어요.';
      } catch {
        copyBox.select();
        copyStatus.textContent = '선택된 값을 Ctrl+C로 복사해 주세요.';
      }
    }

    if (diagnostic) window.addEventListener('keydown', event => {
      if (event.ctrlKey || event.altKey || event.metaKey || event.target.closest?.('input, textarea, [contenteditable]')) return;
      if (event.code === 'KeyK' && editing) {
        editing = false;
        paintControls();
        return;
      }
      if (event.code === 'KeyD' || event.code === 'KeyP') {
        event.preventDefault();
        if (event.repeat) return;
        if (event.code === 'KeyD') showPoints = !showPoints;
        else editing = !editing;
        paintControls();
        return;
      }
      if (!editing) return;
      const current = getValues();
      if (!current) return;
      const amount = event.shiftKey ? 10 : 1;
      const deltas = {
        ArrowLeft: { x: -amount, y: 0 }, ArrowRight: { x: amount, y: 0 },
        ArrowUp: { x: 0, y: -amount }, ArrowDown: { x: 0, y: amount },
      };
      if (event.code === 'Digit1' || event.code === 'Digit2') {
        event.preventDefault();
        editTarget = event.code === 'Digit1' ? 'hip' : 'seat';
        paintControls();
      } else if (event.code === 'KeyC') {
        event.preventDefault();
        if (!event.repeat) copyValues(current);
      } else if (deltas[event.code]) {
        event.preventDefault();
        move(current, deltas[event.code]);
      }
    }, { capture: true });

    return { avatarHip, chairPoint, render };
  };
})();


