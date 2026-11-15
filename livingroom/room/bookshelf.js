(() => {
  // Each spine uses the room artwork coordinates, in pixels from the upper left.
  const books = [
    { id: 'cups', title: '생일날, 두 개의 잔', x: 1665, y: 433, width: 16, height: 42, angle: -2 },
    { id: 'plate', title: '마지막 한 조각은 누구에게?', x: 1683, y: 437, width: 13, height: 39, angle: -1 },
    { id: 'errand', title: '작은 손에 담긴 따뜻한 빵', x: 1698, y: 431, width: 17, height: 46, angle: -1.2 },
    { id: 'door', title: '문 뒤에 숨겨 둔 별', x: 1665, y: 501, width: 13, height: 32, angle: .8 },
    { id: 'ball', title: '노란 공이 기다려 준 날', x: 1681, y: 500, width: 14, height: 35, angle: -1.2 },
    { id: 'stars', title: '삐뚤빼뚤, 우리의 별', x: 1698, y: 503, width: 15, height: 33, angle: 1.6 },
  ];
  const approach = { x: 85.3, y: 61 };

  window.makeRoomBookshelf = ({ room, artSize, canBrowse, visit, stillMotion, refresh }) => {
    const { bind } = window.roomLanguage;
    const stage = document.getElementById('bookshelf');
    const entry = document.getElementById('shelf-entry');
    const dialog = document.getElementById('shelf-dialog');
    const closeButton = document.getElementById('shelf-close');
    const collection = document.getElementById('shelf-collection');
    const layoutKey = 'heartstorybook-sunroom-shelf-layout';
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
    let heldBook = null;
    let pageTimer;
    let flipTimer;
    let closeTimer;
    let pendingBook;
    let reading = false;
    let turning = false;

    function stopTurning() {
      clearTimeout(pageTimer);
      clearTimeout(flipTimer);
      pageTimer = flipTimer = undefined;
      turning = false;
      refresh();
    }

    function schedulePage() {
      if (!reading || stillMotion() || pageTimer !== undefined || flipTimer !== undefined) return;
      pageTimer = setTimeout(() => {
        pageTimer = undefined;
        if (!reading || stillMotion()) return;
        turning = true;
        flipTimer = setTimeout(() => {
          flipTimer = undefined;
          turning = false;
          refresh();
        }, 400);
        refresh();
      }, 15000 + Math.random() * 10000);
    }

    function renderBook(isSeated, art) {
      reading = Boolean(heldBook && isSeated && art?.reading && art?.turning);
      if (reading) schedulePage();
      else if (pageTimer !== undefined || flipTimer !== undefined) stopTurning();
    }

    function hold(book) {
      heldBook = book;
      for (const card of collection.querySelectorAll('.shelf-card')) {
        card.disabled = card.dataset.book === book?.id;
        card.classList.toggle('is-borrowed', card.disabled);
      }
      for (const spine of stage.children) spine.hidden = spine.dataset.book === book?.id;
      refresh();
    }

    function updateMotion() {
      if (stillMotion()) {
        stopTurning();
        if (dialog.classList.contains('is-closing')) finishClose();
      } else schedulePage();
      dialog.classList.toggle('skip-motion', stillMotion());
    }
    motionPreference.addEventListener('change', updateMotion);
    new MutationObserver(updateMotion).observe(room.closest('.experience'), {
      attributes: true, attributeFilter: ['class'],
    });

    try {
      const savedLayout = roomSettings.testing ? localStorage.getItem(layoutKey) : null;
      if (savedLayout === 'a' || savedLayout === 'b') dialog.dataset.shelfLayout = savedLayout;
    } catch {
      // Keep the default when browser storage is unavailable.
    }

    const coverPath = book => 'images/covers/' + book.id + '.jpg';

    function coverImage(book) {
      const cover = document.createElement('img');
      cover.src = coverPath(book);
      cover.alt = '';
      cover.width = 512;
      cover.height = 512;
      cover.decoding = 'async';
      return cover;
    }

    function makeShelfBook(book) {
      const shell = document.createElement('img');
      shell.src = 'images/reading-samples/spine-' + book.id + '.png';
      shell.alt = '';
      shell.dataset.book = book.id;
      shell.className = 'shelf-book';
      shell.style.left = book.x / artSize.width * 100 + '%';
      shell.style.top = book.y / artSize.height * 100 + '%';
      shell.style.width = book.width / artSize.width * 100 + '%';
      shell.style.height = book.height / artSize.height * 100 + '%';
      return shell;
    }

    function makeCard(book) {
      const card = document.createElement('button');
      card.type = 'button';
      card.dataset.book = book.id;
      card.className = 'shelf-card';
      bind(card, book.title, 'aria-label');
      card.style.setProperty('--cover-angle', book.angle + 'deg');
      const art = document.createElement('span');
      art.className = 'shelf-book-art';
      art.append(coverImage(book));
      card.append(art);
      card.addEventListener('click', () => {
        if (dialog.classList.contains('is-closing')) return;
        closePreview(book);
      });
      return card;
    }

    for (const book of books) stage.append(makeShelfBook(book));
    for (const rowBooks of [books.slice(0, 3), books.slice(3)]) {
      const section = document.createElement('section');
      const row = document.createElement('div');
      row.className = 'shelf-cards';
      for (const book of rowBooks) row.append(makeCard(book));
      section.append(row);
      collection.append(section);
    }

    function finishClose() {
      clearTimeout(closeTimer);
      dialog.close();
      dialog.classList.remove('is-closing');
      if (pendingBook) hold(pendingBook);
      pendingBook = null;
      entry.focus({ preventScroll: true });
    }

    function closePreview(book = null) {
      if (!dialog.open || dialog.classList.contains('is-closing')) return;
      pendingBook = book;
      if (stillMotion()) finishClose();
      else {
        dialog.classList.add('is-closing');
        closeTimer = setTimeout(finishClose, 950);
      }
    }

    function useShelf() {
      if (!canBrowse() || dialog.open) return;
      visit(approach, () => {
        if (heldBook) {
          hold(null);
          entry.focus({ preventScroll: true });
          return;
        }
        const bounds = room.getBoundingClientRect();
        const viewport = document.documentElement;
        dialog.style.setProperty('--shelf-travel-x', (bounds.left + bounds.width * .85 - viewport.clientWidth / 2) * .55 + 'px');
        dialog.style.setProperty('--shelf-travel-y', (bounds.top + bounds.height * .30 - viewport.clientHeight / 2) * .55 + 'px');
        dialog.classList.toggle('skip-motion', stillMotion());
        dialog.showModal();
      });
    }
    entry.addEventListener('click', useShelf);
    closeButton.addEventListener('click', () => closePreview());
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      closePreview();
    });
    dialog.addEventListener('keydown', event => {
      if (!roomSettings.testing || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      const layout = event.key.toLowerCase();
      if (layout !== 'a' && layout !== 'b') return;
      dialog.dataset.shelfLayout = layout;
      try { localStorage.setItem(layoutKey, layout); }
      catch { /* The selected layout still works for this visit. */ }
    });
    function draw(position, mode, available) {
      entry.hidden = stage.hidden = !available;
      const near = (mode === 'idle' || mode === 'walking' || mode === 'bowing') &&
        position.x >= 76 && position.x <= 91 && position.y >= 58 && position.y <= 73;
      entry.classList.toggle('is-near', near);
    }

    return {
      draw, renderBook, isTurning: () => turning, hasBook: () => Boolean(heldBook),
      returnBook: () => { if (heldBook) hold(null); },
    };
  };
})();
