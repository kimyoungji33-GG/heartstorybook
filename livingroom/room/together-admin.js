// 마음동화책방 거실 · 같이 놀기 관리자 화면 (Claude, 2026-11-24)
// 주소 끝에 ?admin=1 을 붙였을 때만 multiplayer.js가 이 파일을 불러와요.
// 관리자인지는 Firebase 화면의 admins/{내 uid} = true 로만 확인해요. 이메일·비밀번호는 코드에 없어요.
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { get, onValue, ref, remove, set, update } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js';

const avatarNames = { man: '성인 남자', woman: '성인 여자', girl: '소녀', boy: '소년' };

export function startAdmin({ auth, db, config, showNote }) {
  const base = config.roomPath;
  const panel = document.createElement('aside');
  panel.className = 'mp-admin';
  panel.setAttribute('aria-label', '같이 놀기 관리자');
  panel.innerHTML = `
    <div class="mp-admin-head">
      <strong>같이 놀기 관리</strong>
      <button type="button" class="mp-admin-fold" aria-expanded="true">접기</button>
    </div>
    <div class="mp-admin-body">
      <p class="mp-admin-where"></p>
      <p class="mp-admin-status" role="status"></p>
      <button type="button" class="mp-admin-login">Google로 관리자 확인</button>
      <div class="mp-admin-tools" hidden>
        <button type="button" class="mp-admin-door"></button>
        <ul class="mp-admin-list"></ul>
        <p class="mp-admin-kicked"></p>
        <button type="button" class="mp-admin-clear" hidden>내보낸 사람 목록 비우기</button>
        <button type="button" class="mp-admin-logout">로그아웃</button>
      </div>
    </div>`;
  document.body.append(panel);
  const $ = selector => panel.querySelector(selector);
  const status = $('.mp-admin-status');
  const login = $('.mp-admin-login');
  const tools = $('.mp-admin-tools');
  const door = $('.mp-admin-door');
  const list = $('.mp-admin-list');
  const kickedText = $('.mp-admin-kicked');
  const clear = $('.mp-admin-clear');
  $('.mp-admin-where').textContent = base === 'livingroom' ? '공개 거실' : '연습용 거실 (내 컴퓨터)';

  const fold = $('.mp-admin-fold');
  fold.addEventListener('click', () => {
    const open = fold.getAttribute('aria-expanded') !== 'true';
    fold.setAttribute('aria-expanded', String(open));
    fold.textContent = open ? '접기' : '펼치기';
    $('.mp-admin-body').hidden = !open;
  });

  let unsubs = [];
  let isOpen = true;
  let players = {};
  let seats = {};
  let armed = null; // 내보내기는 두 번 눌러야 해요(실수 막기).

  login.addEventListener('click', async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error?.code === 'auth/popup-closed-by-user') return;
      status.textContent = error?.code === 'auth/unauthorized-domain'
        ? 'Firebase에서 이 화면 주소를 허용해야 해요.'
        : '구글 확인에 실패했어요. 잠시 뒤 다시 해 주세요.';
    }
  });

  $('.mp-admin-logout').addEventListener('click', () => signOut(auth));

  onAuthStateChanged(auth, async user => {
    stop();
    tools.hidden = true;
    login.hidden = false;
    if (!user || user.isAnonymous) {
      status.textContent = '관리자 확인이 필요해요.';
      return;
    }
    const mark = await get(ref(db, 'admins/' + user.uid)).catch(() => null);
    if (mark?.val() !== true) {
      status.textContent = '관리자 계정이 아니에요. (Firebase admins 칸에 이 계정 uid를 넣어야 해요)';
      console.info('[같이 놀기 관리] 이 계정 uid:', user.uid);
      await signOut(auth);
      return;
    }
    status.textContent = '관리자로 확인됐어요.';
    login.hidden = true;
    tools.hidden = false;
    watch();
  });

  function stop() {
    while (unsubs.length) unsubs.pop()();
  }

  function watch() {
    unsubs.push(onValue(ref(db, base + '/open'), snap => {
      isOpen = snap.val() !== false;
      door.textContent = isOpen ? '거실 문 닫기' : '거실 문 열기';
      door.setAttribute('aria-pressed', String(!isOpen));
    }));
    unsubs.push(onValue(ref(db, base + '/players'), snap => { players = snap.val() || {}; draw(); }));
    unsubs.push(onValue(ref(db, base + '/seats'), snap => { seats = snap.val() || {}; draw(); }));
    unsubs.push(onValue(ref(db, base + '/kicked'), snap => {
      const count = Object.keys(snap.val() || {}).length;
      kickedText.textContent = count ? '내보낸 사람: ' + count + '명' : '';
      clear.hidden = !count;
    }));
  }

  door.addEventListener('click', () => {
    set(ref(db, base + '/open'), !isOpen)
      .then(() => showNote(isOpen ? '거실 문을 열었어요.' : '거실 문을 닫았어요. 새로 들어올 수 없어요.', 3000))
      .catch(() => { status.textContent = '문을 바꾸지 못했어요.'; });
  });

  clear.addEventListener('click', () => {
    remove(ref(db, base + '/kicked')).catch(() => { status.textContent = '목록을 비우지 못했어요.'; });
  });

  function draw() {
    list.replaceChildren();
    const rows = [];
    for (let seat = 0; seat < config.maxPeople; seat++) {
      const holder = seats[seat];
      const player = holder ? players[holder] : null;
      rows.push({ seat, holder, player });
    }
    for (const { seat, holder, player } of rows) {
      const item = document.createElement('li');
      const text = document.createElement('span');
      if (!holder) {
        text.textContent = (seat + 1) + '번 자리 · 비어 있어요';
        item.append(text);
      } else {
        const name = player?.name || '(아직 들어오는 중)';
        const look = avatarNames[player?.avatar] || '';
        const said = player?.say?.text ? ' · "' + player.say.text + '"' : '';
        text.textContent = (seat + 1) + '번 자리 · ' + name + (look ? ' (' + look + ')' : '') + said;
        item.append(text);
        if (holder !== auth.currentUser?.uid) {
          const kick = document.createElement('button');
          kick.type = 'button';
          kick.textContent = armed === holder ? '한 번 더 누르면 내보내요' : '내보내기';
          kick.addEventListener('click', () => kickOut(holder, seat));
          item.append(kick);
        }
      }
      list.append(item);
    }
  }

  function kickOut(holder, seat) {
    if (armed !== holder) {
      armed = holder;
      draw();
      setTimeout(() => { if (armed === holder) { armed = null; draw(); } }, 4000);
      return;
    }
    armed = null;
    update(ref(db, base), {
      ['kicked/' + holder]: true,
      ['seats/' + seat]: null,
      ['players/' + holder]: null,
    }).then(() => showNote('한 분을 거실에서 내보냈어요.', 3000))
      .catch(() => { status.textContent = '내보내지 못했어요.'; draw(); });
  }
}
