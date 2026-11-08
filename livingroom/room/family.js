(function () {
  'use strict';

  // ===== 설정: 여기만 고치면 돼요 =====
  const PUBLIC = document.getElementById('experience').dataset.testMode !== 'on'; // 시험 기능은 index.html의 설정으로만 켜요
  const URLS = {
    sameDay: '../../previous-home.html', // '같은 하루, 다른 마음' 페이지 주소로 바꾸세요
    whatIf: '../../previous-home.html',      // '만약 이랬다면 어땠을까' 페이지 주소(없으면 비워 두면 버튼이 안 보여요)
    heartVoice: 'https://kimyoungji33-gg.github.io/heartstorybook/perspective-games.html' // '마음의 소리' 페이지 주소로 바꾸세요
  };
  // x, y = 발 위치(그림 가로세로의 %), w = 가로 크기(%)
  // 할아버지가 왼쪽, 할머니가 오른쪽. 벽난로 앞 왼쪽 아래에 나란히 계세요.
  const FAMILY = [
    { id: 'grandpa', name: '할아버지', img: 'images/grandpa_chair.webp', x: 16.5, y: 93, w: 20,
      say: '마음의 소리, 같이 들어 볼까?',
      links: [{ label: '소리로 떠올리는 풍경', url: '../../perspective-games.html#landscapes' },
              { label: '이야기 속 소리탐험', url: '../../story-sounds.html' }] },
    { id: 'grandma', name: '할머니', img: 'images/grandma_chair.webp', x: 33, y: 93, w: 18.5,
      say: '왔니. 이야기 하나 같이 볼까?',
      links: [{ label: '같은 하루, 다른 마음', url: URLS.sameDay },
              { label: '만약 이랬다면 어땠을까', url: URLS.whatIf }] },
    { id: 'momo', name: '모모', img: 'images/momo-selected.png', x: 7.1, y: 93, w: 4.8, action: 'door',
      say: '곧 열려요.' },
    { id: 'semi', name: '세미', img: 'images/semi-selected.png', x: 44.5, y: 93, w: 6.1,
      say: '이야기 속 마음을 찾는 열쇠가 있다냥. 같이 알아볼까냥?',
      links: [{ label: '마음열쇠 알아보기', url: 'https://kimyoungji33-gg.github.io/heartstorybook/heart-keys.html' }] }
  ];
  const DOOR = { x: 95, y: 48 }; // 문 틈으로 빛이 새는 위치(%)
  // ===================================

  const stage = document.getElementById('stage') ||
    document.querySelector('.stage, #room, #scene, #game, main') || document.body;
  if (getComputedStyle(stage).position === 'static') stage.style.position = 'relative';

  const css = document.createElement('style');
  css.textContent = `
  .fam{position:absolute;transform:translate(-50%,-100%);cursor:pointer;z-index:30;-webkit-tap-highlight-color:transparent}
  .fam img{width:100%;display:block;transform-origin:50% 100%;animation:famBreath 5s ease-in-out infinite}
  .fam[aria-label="모모"] img{aspect-ratio:1024 / 1536;object-fit:contain;object-position:center bottom}
  .fam[aria-label="세미"] img{aspect-ratio:1148 / 1371;object-fit:contain;object-position:center bottom}
  .fam .sh{position:absolute;left:6%;right:6%;bottom:-2%;height:10%;z-index:-1;background:radial-gradient(ellipse at center,rgba(60,35,15,.4),transparent 70%)}
  .fam:hover img,.fam:focus-visible img{filter:brightness(1.07)}
  .fam:focus-visible{outline:2px solid rgba(255,230,180,.95);outline-offset:4px;border-radius:12px}
  .fam .miss{display:flex;align-items:center;justify-content:center;aspect-ratio:1;border-radius:50%;background:rgba(232,166,74,.85);color:#3b2614;font:700 14px sans-serif;text-align:center}
  .fam-bubble{position:absolute;z-index:9000;transform:translate(-50%,-100%);box-sizing:border-box;width:max-content;max-width:min(90%,240px);background:rgba(255,248,232,.98);color:#4a3322;border:1.5px solid rgba(200,150,80,.6);border-radius:16px;padding:8px 10px;font:16px/1.4 "Malgun Gothic","Apple SD Gothic Neo",sans-serif;box-shadow:0 6px 18px rgba(60,35,15,.25);animation:famPop .25s ease}
  .fam-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
  .fam-btn{min-height:44px;padding:10px 14px;border-radius:999px;border:1.5px solid rgba(200,150,80,.7);background:#f6d9a8;color:#3b2614;font:15px "Malgun Gothic",sans-serif;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center}
  .fam-bubble .fam-row{display:grid;justify-items:start;gap:5px;margin-top:6px}
  .fam-bubble .fam-btn{max-width:100%;min-height:40px;padding:7px 12px;text-align:center;justify-content:center}
  .fam-btn:hover,.fam-btn:focus-visible{background:#fbe6c3;outline:none}
  .fam-door{position:absolute;z-index:20;width:22%;height:46%;transform:translate(-50%,-50%);pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(255,215,140,.75),rgba(255,215,140,0) 68%);transition:opacity 1.2s ease}
  .fam-door.on{opacity:1}
  .fam-letter-wrap{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(43,29,20,.55);padding:16px}
  .fam-letter{width:min(92vw,420px);background:#fff6e2;color:#4a3322;border:1.5px solid #d9b47a;border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,.35);font:16px/1.6 "Malgun Gothic",sans-serif}
  .fam-letter h2{font-size:18px;margin-bottom:8px}
  .fam-letter textarea{width:100%;min-height:140px;border:1.5px solid #d9b47a;border-radius:12px;padding:10px;font:16px/1.6 "Malgun Gothic",sans-serif;background:#fffdf6;color:#4a3322;resize:vertical}
  .fam-note{font-size:13px;opacity:.8;margin-top:6px}
  .fam-old{margin-top:10px;max-height:150px;overflow:auto;font-size:14px;border-top:1px dashed #d9b47a;padding-top:8px}
  .fam-panel{position:fixed;left:8px;bottom:8px;z-index:20000;background:rgba(0,0,0,.75);color:#fff;font:12px/1.5 monospace;padding:8px 10px;border-radius:8px;max-width:90vw;white-space:pre-wrap}
  @keyframes famBreath{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.2px)}}
  @keyframes famPop{from{opacity:0;transform:translate(-50%,-96%)}to{opacity:1;transform:translate(-50%,-100%)}}
  @media (prefers-reduced-motion:reduce){.fam img,.fam-bubble{animation:none}.fam-door{transition:none}}
  `;
  document.head.appendChild(css);

  const door = document.createElement('div');
  door.className = 'fam-door';
  door.style.left = DOOR.x + '%';
  door.style.top = DOOR.y + '%';
  stage.appendChild(door);

  let bubble = null, bubbleTimer = null, layoutOn = false, dragging = null, selected = null, moved = false;

  function closeBubble() {
    if (bubble) { bubble.remove(); bubble = null; }
    clearTimeout(bubbleTimer);
  }
  function showBubble(el, build) {
    closeBubble();
    const b = document.createElement('div');
    b.className = 'fam-bubble';
    build(b);
    stage.appendChild(b);
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    const half = b.offsetWidth / 2;
    let cx = r.left + r.width / 2 - s.left;
    cx = Math.max(half + 8, Math.min(s.width - half - 8, cx));
    b.style.left = cx + 'px';
    b.style.top = Math.max(b.offsetHeight + 8, r.top - s.top - 8) + 'px';
    bubble = b;
    bubbleTimer = setTimeout(closeBubble, 12000);
  }
  function link(label, url) {
    const a = document.createElement('a');
    a.className = 'fam-btn'; a.textContent = label; a.href = url;
    a.target = '_blank'; a.rel = 'noopener';
    return a;
  }

  // 마음우체통: 나에게 쓰는 편지. 이 기기(브라우저) 안에만 저장돼요.
  const KEY = 'maeum_letters_v1';
  function loadLetters() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function saveLetters(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); return true; } catch (e) { return false; } }
  function openLetter() {
    closeBubble();
    const wrap = document.createElement('div');
    wrap.className = 'fam-letter-wrap';
    const old = loadLetters();
    wrap.innerHTML = '<div class="fam-letter" role="dialog" aria-label="마음우체통">' +
      '<h2>✉ 나에게 쓰는 편지</h2>' +
      '<textarea maxlength="300" placeholder="오늘의 마음을 적어 보세요."></textarea>' +
      '<div class="fam-note">적은 글은 이 기기에만 저장돼요. 이름과 개인 정보는 적지 않아도 돼요.</div>' +
      '<div class="fam-row"><button class="fam-btn" data-a="send">나에게 보내기</button>' +
      (old.length ? '<button class="fam-btn" data-a="old">지난 편지 ' + old.length + '통</button>' : '') +
      '<button class="fam-btn" data-a="close">닫기</button></div>' +
      '<div class="fam-old" hidden></div></div>';
    document.body.appendChild(wrap);
    const ta = wrap.querySelector('textarea'), oldBox = wrap.querySelector('.fam-old');
    ta.focus();
    function close() { wrap.remove(); }
    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) return close();
      const a = e.target.getAttribute && e.target.getAttribute('data-a');
      if (a === 'close') close();
      if (a === 'send') {
        const text = ta.value.trim();
        if (!text) return;
        const list = loadLetters();
        list.push({ t: new Date().toISOString(), text: text });
        saveLetters(list);
        ta.value = '';
        oldBox.hidden = false;
        oldBox.textContent = '편지를 우체통에 넣었어요.';
      }
      if (a === 'old') {
        oldBox.hidden = false;
        oldBox.innerHTML = '';
        loadLetters().slice().reverse().forEach(function (l) {
          const p = document.createElement('p');
          p.textContent = l.t.slice(0, 10) + '  ' + l.text;
          oldBox.appendChild(p);
        });
      }
    });
  }

  function act(c, el) {
    if (c.action === 'letter') { openLetter(); return; }
    if (c.action === 'door') {
      door.classList.add('on');
      setTimeout(function () { door.classList.remove('on'); }, 4500);
    }
    showBubble(el, function (b) {
      const p = document.createElement('div');
      p.textContent = c.say;
      b.appendChild(p);
      const links = (c.links || []).filter(function (l) { return l.url; });
      if (links.length) {
        const row = document.createElement('div');
        row.className = 'fam-row';
        links.forEach(function (l) { row.appendChild(link(l.label, l.url)); });
        b.appendChild(row);
      }
    });
  }

  const els = {};
  FAMILY.forEach(function (c) {
    const el = document.createElement('div');
    el.className = 'fam';
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', c.name);
    el.style.left = c.x + '%';
    el.style.top = c.y + '%';
    el.style.width = c.w + '%';
    el.style.zIndex = String(1004 + Math.round(c.y));
    el.innerHTML = '<div class="sh"></div>';
    const img = new Image();
    img.alt = c.name; img.draggable = false;
    img.onerror = function () {
      img.remove();
      if (PUBLIC) { el.remove(); return; }
      const m = document.createElement('div');
      m.className = 'miss'; m.textContent = c.name + '\n(그림 없음)';
      el.appendChild(m);
      console.warn('[family.js] 그림 파일이 없어요:', c.img);
    };
    img.src = c.img;
    el.appendChild(img);
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      if (moved) { moved = false; return; }
      if (layoutOn) { select(el); return; }
      act(c, el);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(c, el); }
    });
    stage.appendChild(el);
    els[c.id] = { c: c, el: el };
  });

  document.addEventListener('click', function (e) {
    if (bubble && !bubble.contains(e.target)) closeBubble();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeBubble();
      const w = document.querySelector('.fam-letter-wrap');
      if (w) w.remove();
    }
  });

  // ----- 위치 조정 모드 (L): 끌어서 옮기고, +/-로 크기, C로 값 복사 -----
  let panel = null;
  function select(el) {
    selected = el;
    Object.values(els).forEach(function (o) { o.el.style.outline = o.el === el ? '2px dashed #fff' : 'none'; });
    updatePanel();
  }
  function snapshot() {
    return Object.values(els).map(function (o) {
      return "{ id: '" + o.c.id + "', x: " + o.c.x.toFixed(1) + ', y: ' + o.c.y.toFixed(1) + ', w: ' + o.c.w.toFixed(1) + ' }';
    }).join('\n');
  }
  function updatePanel() {
    if (!panel) return;
    panel.textContent = '위치 조정 모드 (L 끄기)\n끌어서 옮기기 · 인물 선택 후 + / - 크기 · C 값 복사\n' + snapshot();
  }
  function setLayout(on) {
    layoutOn = on;
    if (on) {
      panel = document.createElement('div');
      panel.className = 'fam-panel';
      document.body.appendChild(panel);
      updatePanel();
    } else if (panel) {
      panel.remove(); panel = null;
      Object.values(els).forEach(function (o) { o.el.style.outline = 'none'; });
    }
  }
  if (!PUBLIC) {
    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'l') setLayout(!layoutOn);
      if (!layoutOn) return;
      if (k === 'c') {
        try { navigator.clipboard.writeText(snapshot()); } catch (err) { console.log(snapshot()); }
      }
      if (selected && (e.key === '+' || e.key === '=' || e.key === '-')) {
        const o = Object.values(els).find(function (x) { return x.el === selected; });
        o.c.w = Math.max(3, o.c.w + (e.key === '-' ? -0.5 : 0.5));
        o.el.style.width = o.c.w + '%';
        updatePanel();
      }
    });
    stage.addEventListener('pointerdown', function (e) {
      if (!layoutOn) return;
      const t = e.target.closest && e.target.closest('.fam');
      if (!t) return;
      dragging = t; moved = false; select(t);
      t.setPointerCapture && t.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function (e) {
      if (!layoutOn || !dragging) return;
      const s = stage.getBoundingClientRect();
      const o = Object.values(els).find(function (x) { return x.el === dragging; });
      o.c.x = Math.max(0, Math.min(100, (e.clientX - s.left) / s.width * 100));
      o.c.y = Math.max(0, Math.min(100, (e.clientY - s.top) / s.height * 100));
      dragging.style.left = o.c.x + '%';
      dragging.style.top = o.c.y + '%';
      dragging.style.zIndex = String(1004 + Math.round(o.c.y));
      moved = true;
      updatePanel();
    });
    stage.addEventListener('pointerup', function () { dragging = null; });
  }
})();