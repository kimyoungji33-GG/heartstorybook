(() => {
  const DEFAULT_EFFECT_LEVELS = {
    dust: 2,
    sun: 2,
    shadow: 1,
    curtain: 2,
    garden: 2,
    lamp: 2,
    fire: 2,
    breath: 2,
  };
  const levels = [0, .7, 1, 1.4];
  const root = document.getElementById('experience');
  const room = document.getElementById('stage');
  for (const [effect, level] of Object.entries(DEFAULT_EFFECT_LEVELS)) {
    room.style.setProperty('--' + effect + '-tune', levels[level]);
  }

  if (root.dataset.testMode !== 'on') return;
  const report = document.getElementById('motion-report');
  const heading = document.getElementById('motion-heading');
  const list = report.querySelector('ul');
  const keys = document.getElementById('motion-keys');
  const copyBox = document.getElementById('motion-copy');
  const copyStatus = document.getElementById('motion-copy-status');
  const picture = room.querySelector('.room-picture');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const effects = [
    ['dust', '먼지', '.dust circle', true],
    ['sun', '햇살', '.sun-patch'],
    ['shadow', '나뭇잎 그림자', '.leaf-shadow'],
    ['curtain', '커튼', '.curtain', false, true],
    ['garden', '창밖', '.garden-leaves', false, true],
    ['lamp', '등불', '.ceiling-lamp, .lamp-glow', false, true],
    ['fire', '불빛', '.hearth-flame, .hearth-light, .hearth-spill', true],
    ['breath', '아바타 숨 쉬기', '.avatar-breath, #seat-frame'],
  ].map(([id, label, selector, gentle, usesPicture]) => {
    const row = document.createElement('li');
    list.append(row);
    return { id, label, selector, gentle, usesPicture, row, percent: Math.round(levels[DEFAULT_EFFECT_LEVELS[id]] * 100) };
  });

  let level = 2;
  let paused = false;
  let large = false;
  let tuning = false;
  let used = false;
  let compared = false;
  let selected = 0;

  function refresh() {
    if (report.hidden || list.hidden) return;
    for (const [index, effect] of effects.entries()) {
      const { id, label, selector, gentle, usesPicture, row, percent } = effect;
      const layers = [...room.querySelectorAll(selector)];
      const active = layers.some(layer => layer.getAnimations?.().some(animation =>
        animation.playState === 'running' && animation.playbackRate !== 0));
      const detail = !layers.length ? '× 그림 막이 없어요'
        : usesPicture && picture?.complete && !picture.naturalWidth ? '× 방 그림을 열 수 없어요'
        : paused ? '— 정지'
        : reduced.matches && !gentle ? '— 움직임 줄이기'
        : document.hidden ? '— 화면이 뒤에 있어요'
        : active ? (reduced.matches ? '○ 아주 천천히' : '○')
        : id === 'breath' ? '— 서거나 앉으면 시작'
        : '× 움직임을 불러오지 못했어요';
      const marker = tuning && index === selected ? '▶ ' : '';
      const stage = levels.findIndex(level => Math.round(level * 100) === percent);
      const value = stage > 0 ? ' ' + stage + '단계 · ' + percent + '%' : ' ' + percent + '%';
      row.textContent = marker + label + (tuning ? value : '') + ' ' + detail;
    }
  }

  function render() {
    root.classList.toggle('motion-large', large);
    root.classList.toggle('motion-still', paused);
    root.style.setProperty('--motion-level', levels[level]);
    report.hidden = !used;
    list.hidden = !(large || tuning);
    keys.hidden = !tuning;
    keys.textContent = '↑↓ 효과 고르기 · ←→ 10% 조정 · C 복사';
    const strength = Math.round(levels[level] * 100) + '%';
    heading.textContent = paused ? '움직임 정지 · 0으로 재생'
      : large ? '움직임 확대 보기 켜짐'
      : compared ? '전체 움직임 ' + level + '단계 · ' + strength : '움직임 · 효과별 기본값';
    if (!tuning) {
      copyBox.hidden = true;
      copyStatus.textContent = '';
    }
    refresh();
  }

  async function copyValues() {
    const text = JSON.stringify({
      level,
      enlarged: large,
      defaultLevels: DEFAULT_EFFECT_LEVELS,
      effectsPercent: Object.fromEntries(effects.map(effect => [effect.id, effect.percent])),
    }, null, 2);
    copyBox.hidden = false;
    copyBox.value = text;
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = '값을 복사했어요.';
    } catch {
      copyBox.select();
      copyStatus.textContent = '선택된 값을 Ctrl+C로 복사해 주세요.';
    }
  }

  root.classList.add('motion-check-enabled');
  window.addEventListener('keydown', event => {
    if (event.code === 'KeyP' && tuning && root.classList.contains('seat-editing')) {
      tuning = false;
      render();
    }
    if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey ||
        event.target.closest?.('input, textarea, [contenteditable]')) return;
    if (event.code === 'KeyU') {
      event.preventDefault();
      if (!event.repeat) root.classList.toggle('show-dust-guide');
      return;
    }

    const digit = /^(?:Digit|Numpad)([0-3])$/.exec(event.code)?.[1];
    const compareKey = digit !== undefined || event.code === 'KeyM' || event.code === 'KeyK';
    if (compareKey) {
      if (digit && root.classList.contains('seat-editing')) return;
      event.preventDefault();
      if (event.repeat) return;
      used = true;
      if (digit === '0') paused = !paused;
      else if (digit !== undefined) {
        level = Number(digit);
        compared = true;
        paused = false;
        large = false;
      } else if (event.code === 'KeyM') large = !large;
      else tuning = !tuning;
      render();
      return;
    }

    if (!tuning) return;
    const { code } = event;
    if (code === 'ArrowUp' || code === 'ArrowDown') {
      event.preventDefault();
      selected = (selected + effects.length + (code === 'ArrowUp' ? -1 : 1)) % effects.length;
      refresh();
    } else if (code === 'ArrowLeft' || code === 'ArrowRight') {
      event.preventDefault();
      const effect = effects[selected];
      effect.percent = Math.max(30, Math.min(160, effect.percent + (code === 'ArrowRight' ? 10 : -10)));
      room.style.setProperty('--' + effect.id + '-tune', effect.percent / 100);
      copyBox.hidden = true;
      copyStatus.textContent = '';
      refresh();
    } else if (code === 'KeyC') {
      event.preventDefault();
      if (!event.repeat) copyValues();
    }
  });
  room.addEventListener('animationstart', event => {
    if (event.animationName === 'breathe') refresh();
  });
  room.addEventListener('animationcancel', event => {
    if (event.animationName === 'breathe') refresh();
  });
  reduced.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);
  picture?.addEventListener('error', refresh);
})();

