// Add the new folktale to the existing shelf without changing Little Frog.
(() => {
  'use strict';
  const href = './hansel-gretel.html';
  function addBook() {
    const shelf = document.querySelector('.tale-books');
    if (!shelf || shelf.querySelector('[data-hansel-book]')) return;
    const card = document.createElement('a');
    card.href = href;
    card.className = 'cover-book tale-cover';
    card.dataset.hanselBook = '';
    card.style.cssText = 'text-decoration:none;color:inherit';
    card.innerHTML = '<span class="book-cover"><img class="tale-cover-picture" src="./images/hansel-gretel/v7/cover.png" alt="과자집 앞에서 이야기를 나누는 헨젤과 그레텔, 마녀"></span><span class="book-base"><span class="tale-book-title">헨젤과 그레텔의 두근거리는 마음</span><span class="tale-source">원작: 독일 전래동화 · 그림 형제</span><span class="tale-open">책 펼치기 ↗</span></span>';
    shelf.append(card);
  }
  function addMenu() {
    const menu = document.getElementById('book-menu');
    if (!menu || menu.querySelector('[data-hansel-menu]')) return;
    const link = document.createElement('a');
    link.href = href;
    link.dataset.hanselMenu = '';
    link.id = 'menu-hansel';
    link.className = 'standalone-book-link';
    link.innerHTML = '<span>헨젤과 그레텔의 두근거리는 마음</span><small>원작: 독일 전래동화 · 그림 형제</small>';
    const frog = document.getElementById('menu-frog');
    if (frog) frog.after(link); else menu.append(link);
  }
  if (typeof taleLibrary === 'function') {
    const previous = taleLibrary;
    taleLibrary = function() { previous(); addBook(); };
  }
  if (typeof menuList === 'function') {
    const previous = menuList;
    menuList = function() { previous(); addMenu(); };
  }
  addBook(); addMenu();
})();
