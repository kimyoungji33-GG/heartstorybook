'use strict';

// 거실 소파 뒤 벽에 걸린 가족사진.
// 마음동화책방 집 앞에서 할아버지, 할머니, 삼촌, 이모, 모모, 세미, 보리, 손님들이 다 같이 찍은 단체사진이에요.
// 그림(images/family/family-photo.png)이 있을 때만 걸려요. 누르면 크게 보이고 할머니가 한마디 해요.
(() => {
  const room = document.getElementById('stage');
  if (!room) return;
  const path = 'images/family/family-photo.png';
  const t = (text, values) => window.homeText ? window.homeText.t(text, values) : text;
  // 벽 위치(거실 그림 기준 %): 램프와 라디오 위, 기둥 사이.
  const spot = { left: 36, top: 7.5, width: 10.5 };

  const probe = new Image();
  probe.onload = () => hang(probe.naturalWidth / probe.naturalHeight || 1.5);
  probe.src = path;

  function hang(ratio) {
    if (document.getElementById('family-photo')) return;
    const frame = document.createElement('button');
    frame.type = 'button';
    frame.id = 'family-photo';
    frame.className = 'family-photo';
    frame.style.left = spot.left + '%';
    frame.style.top = spot.top + '%';
    frame.style.width = spot.width + '%';
    frame.style.aspectRatio = String(ratio);
    frame.dataset.homeAria = '우리 식구 사진';
    frame.setAttribute('aria-label', t('우리 식구 사진'));
    const image = document.createElement('img');
    image.src = path;
    image.alt = '';
    image.draggable = false;
    frame.append(image);
    frame.addEventListener('click', event => {
      event.stopPropagation();
      open();
    });
    room.append(frame);
  }

  let dialog = null;
  function open() {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'family-photo-dialog';
      dialog.innerHTML = '<img alt=""><p></p><form method="dialog"><button type="submit"></button></form>';
      dialog.querySelector('img').src = path;
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
      document.body.append(dialog);
    }
    dialog.querySelector('img').alt = t('우리 식구 사진');
    dialog.querySelector('p').textContent = t('다 같이 찍은 사진이란다. 너도 우리 식구야.');
    dialog.querySelector('button').textContent = t('닫기');
    if (!dialog.open) dialog.showModal();
  }
})();
