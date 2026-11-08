(() => {
  const shelves = [
    {
      label: '어른 동화',
      books: [
        { id: 'station', title: '아직 남겨 둔 의자', x: 1163, y: 190, width: 28, height: 65, angle: -2.5, spine: '#45615d' },
        { id: 'sleeve', title: '접어 둔 소매 한 뼘', x: 1206, y: 186, width: 68, height: 69, angle: -2 },
        { id: 'flowers', title: '엄마가 고른 오늘의 꽃', x: 1291, y: 182, width: 72, height: 73, angle: 1.2 },
        { id: 'notes', title: '빨간 표시 옆의 한마디', x: 1383, y: 189, width: 31, height: 66, angle: 2, spine: '#8f4835' },
      ],
    },
    {
      label: '아이 동화',
      books: [
        { id: 'cups', title: '생일날, 두 개의 잔', x: 1162, y: 288, width: 23, height: 64, angle: -2, spine: '#82594a' },
        { id: 'plate', title: '마지막 한 조각은 누구에게?', x: 1188, y: 286, width: 24, height: 66, angle: -1, spine: '#795832' },
        { id: 'errand', title: '작은 손에 담긴 따뜻한 빵', x: 1218, y: 293, width: 58, height: 59, angle: -1.2 },
        { id: 'door', title: '문 뒤에 숨겨 둔 별', x: 1280, y: 289, width: 61, height: 63, angle: .8 },
        { id: 'ball', title: '노란 공이 기다려 준 날', x: 1346, y: 292, width: 58, height: 60, angle: -1.2 },
        { id: 'stars', title: '삐뚤빼뚤, 우리의 별', x: 1408, y: 291, width: 19, height: 61, angle: 1.6, spine: '#416172' },
      ],
    },
  ];

  window.makeRoomBookshelf = ({ room, artSize, canBrowse, visit, playPageTurn, stillMotion }) => {
    const stage = document.getElementById('bookshelf');
    const entry = document.getElementById('shelf-entry');
    const dialog = document.getElementById('shelf-dialog');
    const closeButton = document.getElementById('shelf-close');
    const collection = document.getElementById('shelf-collection');
    const detail = document.getElementById('shelf-cover-view');
    const largeCover = document.getElementById('shelf-large-cover');
    const title = document.getElementById('shelf-cover-title');
    const coverReturn = document.getElementById('shelf-cover-return');
    const message = document.getElementById('shelf-message');
    const avatarFrame = document.getElementById('frame');
    const layoutKey = 'heartstorybook-sunroom-shelf-layout';
    let selectedCard = null;
    let messageTimer;
    try {
      const savedLayout = localStorage.getItem(layoutKey);
      if (savedLayout === 'a' || savedLayout === 'b') dialog.dataset.shelfLayout = savedLayout;
    } catch {
      // Keep the default when browser storage is unavailable.
    }

    function coverImage(book) {
      const cover = document.createElement('img');
      cover.src = 'images/covers/' + book.id + '.jpg';
      cover.alt = '';
      cover.width = 512;
      cover.height = 512;
      cover.decoding = 'async';
      return cover;
    }

    function makeShelfBook(book) {
      const shell = document.createElement('div');
      shell.dataset.book = book.id;
      shell.className = 'shelf-book';
      shell.setAttribute('aria-hidden', 'true');
      shell.style.left = book.x / artSize.width * 100 + '%';
      shell.style.top = book.y / artSize.height * 100 + '%';
      shell.style.width = book.width / artSize.width * 100 + '%';
      shell.style.height = book.height / artSize.height * 100 + '%';
      shell.style.setProperty('--book-angle', book.angle + 'deg');
      const art = document.createElement('span');
      art.className = 'shelf-book-art';
      if (book.spine) {
        shell.classList.add('shelf-spine');
        shell.style.setProperty('--spine-color', book.spine);
        const label = document.createElement('span');
        label.textContent = book.title;
        art.append(label);
      } else art.append(coverImage(book));
      shell.append(art);
      return shell;
    }

    function makeCard(book) {
      const card = document.createElement('button');
      card.type = 'button';
      card.dataset.book = book.id;
      card.className = 'shelf-card';
      card.setAttribute('aria-label', book.title);
      card.style.setProperty('--cover-angle', book.angle + 'deg');
      const art = document.createElement('span');
      art.className = 'shelf-book-art';
      art.append(coverImage(book));
      card.append(art);
      card.addEventListener('click', () => {
        if (dialog.classList.contains('is-closing')) return;
        selectedCard = card;
        largeCover.src = 'images/covers/' + book.id + '.jpg';
        largeCover.alt = book.title + ' 표지';
        title.textContent = book.title;
        collection.hidden = true;
        detail.hidden = false;
        coverReturn.focus({ preventScroll: true });
        playPageTurn();
      });
      return card;
    }

    for (const shelf of shelves) {
      const section = document.createElement('section');
      const heading = document.createElement('h3');
      heading.className = 'sr-only';
      heading.textContent = shelf.label;
      const row = document.createElement('div');
      row.className = 'shelf-cards';
      for (const book of shelf.books) {
        stage.append(makeShelfBook(book));
        row.append(makeCard(book));
      }
      section.append(heading, row);
      collection.append(section);
    }

    function showCollection() {
      detail.hidden = true;
      collection.hidden = false;
    }

    function placeMessage() {
      const bounds = room.getBoundingClientRect();
      const body = avatarFrame.getBoundingClientRect();
      const margin = 7;
      const half = message.offsetWidth / 2;
      const center = body.left + body.width / 2 - bounds.left;
      const x = Math.min(bounds.width - half - margin, Math.max(half + margin, center));
      const y = Math.max(message.offsetHeight + margin, body.top - bounds.top - 8);
      message.style.left = x + 'px';
      message.style.top = y + 'px';
    }

    function showMessage() {
      clearTimeout(messageTimer);
      message.hidden = false;
      placeMessage();
      messageTimer = setTimeout(() => { message.hidden = true; }, 2900);
    }

    function finishClose() {
      dialog.close();
      dialog.classList.remove('is-closing');
      if (selectedCard) showMessage();
      selectedCard = null;
      showCollection();
      entry.focus({ preventScroll: true });
    }

    function closePreview() {
      if (!dialog.open || dialog.classList.contains('is-closing')) return;
      if (stillMotion()) finishClose();
      else {
        dialog.classList.add('is-closing');
        setTimeout(finishClose, 950);
      }
    }

    entry.addEventListener('click', () => {
      if (!canBrowse() || dialog.open) return;
      clearTimeout(messageTimer);
      message.hidden = true;
      visit({ x: 76.6, y: 71.1 }, () => {
        selectedCard = null;
        showCollection();
        const bounds = room.getBoundingClientRect();
        const viewport = document.documentElement;
        dialog.style.setProperty('--shelf-travel-x', (bounds.left + bounds.width * .77 - viewport.clientWidth / 2) * .55 + 'px');
        dialog.style.setProperty('--shelf-travel-y', (bounds.top + bounds.height * .29 - viewport.clientHeight / 2) * .55 + 'px');
        dialog.classList.toggle('skip-motion', stillMotion());
        dialog.showModal();
        playPageTurn();
      });
    });
    closeButton.addEventListener('click', closePreview);
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      closePreview();
    });
    dialog.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const layout = event.key.toLowerCase();
      if (layout !== 'a' && layout !== 'b') return;
      dialog.dataset.shelfLayout = layout;
      try { localStorage.setItem(layoutKey, layout); }
      catch { /* The selected layout still works for this visit. */ }
    });
    coverReturn.addEventListener('click', () => {
      showCollection();
      selectedCard?.focus({ preventScroll: true });
    });

    function draw(position, mode) {
      const near = (mode === 'idle' || mode === 'walking' || mode === 'bowing') &&
        position.x >= 68 && position.x <= 88 && position.y >= 69 && position.y <= 79.5;
      entry.classList.toggle('is-near', near);
      if (!message.hidden && mode === 'idle') placeMessage();
      else if (mode !== 'idle') message.hidden = true;
    }

    return { draw };
  };
})();
