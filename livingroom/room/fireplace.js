'use strict';

// 벽난로 소리 (Claude 추가)
// - 벽난로를 누르면 나무가 타닥타닥 타는 소리가 8초쯤 나요(소리 파일 없이 만들어요).
// - 음소거 중이면 소리가 나지 않아요. 말풍선은 없어요.
(() => {
  const stage = document.getElementById('stage');
  if (!stage) return;
  const t = text => window.homeText ? window.homeText.t(text) : text;
  const muted = () => document.getElementById('room-sound')?.getAttribute('aria-pressed') === 'true';


  // ---------- 타닥타닥 소리(파일 없이 만들어요) ----------
  let ctx = null, buffer = null, source = null, gain = null, stopTimer = 0;
  function makeCrackle() {
    const rate = ctx.sampleRate, length = rate * 4;
    const b = ctx.createBuffer(1, length, rate);
    const d = b.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < length; i++) {
      brown = (brown + .02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = brown * 1.6;                       // 낮게 웅웅 타는 소리
    }
    const pops = 4 * 14;
    for (let n = 0; n < pops; n++) {             // 타닥! 하는 작은 튐
      const at = Math.floor(Math.random() * (length - rate * .05));
      const size = Math.random() < .15 ? .9 : .25 + Math.random() * .35;
      const len = Math.floor(rate * (.004 + Math.random() * .02));
      for (let i = 0; i < len; i++) d[at + i] += (Math.random() * 2 - 1) * size * Math.pow(1 - i / len, 3);
    }
    for (let i = 0; i < rate * .05; i++) {       // 이음새가 튀지 않게
      const f = i / (rate * .05);
      d[i] *= f; d[length - 1 - i] *= f;
    }
    return b;
  }
  function crackle(seconds, volume = .5) {
    if (muted()) return;
    try {
      ctx ||= new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume?.();
      buffer ||= makeCrackle();
      clearTimeout(stopTimer);
      if (!source) {
        source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 120;
        gain = ctx.createGain();
        gain.gain.value = 0;
        source.connect(filter).connect(gain).connect(ctx.destination);
        source.start();
      }
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(volume, ctx.currentTime, .3);
      if (seconds) stopTimer = setTimeout(() => quiet(), seconds * 1000);
    } catch {}
  }
  function quiet() {
    clearTimeout(stopTimer);
    if (!source || !gain) return;
    const old = source;
    gain.gain.setTargetAtTime(0, ctx.currentTime, .5);
    source = null;
    setTimeout(() => { try { old.stop(); } catch {} }, 2500);
  }
  // 음소거를 누르면 바로 조용히.
  document.getElementById('room-sound')?.addEventListener('click', () => setTimeout(() => {
    if (muted()) quiet();
  }, 0));

  // ---------- 벽난로 누르기: 타닥타닥 소리만 ----------
  const fire = document.createElement('button');
  fire.type = 'button';
  fire.className = 'furniture-target fire-target';
  fire.dataset.homeAria = '벽난로';
  fire.setAttribute('aria-label', t('벽난로'));
  const fireLabel = document.createElement('span');
  fireLabel.dataset.homeText = '벽난로';
  fireLabel.textContent = t('벽난로');
  fire.append(fireLabel);
  stage.append(fire);
  fire.addEventListener('click', event => {
    event.stopPropagation();
    crackle(8, .55);
  });
  document.addEventListener('hometextchange', () => fire.setAttribute('aria-label', t('벽난로')));
  window.roomFire = { crackle, quiet };
})();
