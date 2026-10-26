(() => {
  'use strict';
  const koreanBook = window.HanselBook;
  let book = koreanBook;
  const validLanguages = ['ko', 'en', 'es'];
  let language = new URLSearchParams(location.search).get('lang');
  if (!language) { try { language = localStorage.getItem('heart-language'); } catch {} }
  if (!validLanguages.includes(language)) language = 'ko';
  const t = value => window.hanselTranslate(value, language);
  const libraryURL = hash => './index.html?lang=' + language + (hash || '');
  function setLanguage(next) {
    language = validLanguages.includes(next) ? next : 'ko';
    document.documentElement.lang = language;
    const locale = window.HanselLocales[language];
    book = locale ? {...koreanBook, ...locale, pages: locale.pages.map((p,i)=>({...koreanBook.pages[i],title:p[0],text:p[1],alt:p[2]}))} : koreanBook;
    const url = new URL(location.href); url.searchParams.set('lang', language);
    history.replaceState(null, '', url.href);
    try { localStorage.setItem('heart-language', language); } catch {}
    document.getElementById('language').value = language;
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'A warm retelling of Hansel and Gretel. Read the illustrated story and explore sharing feelings.' : language === 'es' ? 'Una versión cálida de Hansel y Gretel. Lee el cuento ilustrado y explora cómo compartir lo que sientes.' : '독일 전래동화 헨젤과 그레텔을 따뜻한 결말로 새롭게 읽어요. 동화 읽기와 마음 건네보기.';
    // Keep original labels so switching back also restores Korean accurately.
    for (const el of document.querySelectorAll('header,footer,#drawer')) {
      if (!el.dataset.originalMarkup) el.dataset.originalMarkup = el.innerHTML;
      if (el.tagName !== 'HEADER') el.innerHTML = el.dataset.originalMarkup;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest('select')) continue;
        if (node._korean === undefined) node._korean = node.nodeValue;
        node.nodeValue = t(node._korean);
      }
      for (const item of el.querySelectorAll('[aria-label]')) {
        item.dataset.koreanLabel ||= item.getAttribute('aria-label');
        item.setAttribute('aria-label', t(item.dataset.koreanLabel));
      }
    }
    document.getElementById('close-menu').onclick = () => menu.close();
    document.querySelectorAll('#drawer a').forEach(a=>{const url=new URL(a.getAttribute('href'),location.href);url.searchParams.set('lang',language);a.href=url.href;});
    render();
  }
  const root = document.getElementById('hansel-app');
  const menu = document.getElementById('drawer');
  document.getElementById('brand').onclick=()=>{location.href=libraryURL();};
  document.getElementById('menu').onclick=()=>{menu.showModal();document.getElementById('menu').setAttribute('aria-expanded','true');};
  document.getElementById('close-menu').onclick=()=>menu.close();
  menu.addEventListener('close',()=>document.getElementById('menu').setAttribute('aria-expanded','false'));
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paragraphs = value => value.split('\n\n').map(p => '<p>' + escape(p) + '</p>').join('');
  let view = 'intro', page = 0, feelings = new Set(), expression = null, reply = null, revealed = false;
  const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; };
  const button = (id, label, primary = false) => `<button id="${id}" class="${primary ? 'primary' : 'choice'}">${label}</button>`;
  const artwork = p => `<div class="illustration-page"><img class="frog-scene" src="${p.image}" alt="${escape(p.alt)}"></div>`;
  const tabs = () => `<div class="experience-tabs"><button id="tab-read" aria-pressed="${view === 'read'}">동화 읽기</button><button id="tab-activity" aria-pressed="${view !== 'read'}">마음 건네보기 활동</button></div>`;
  const spread = (p, body) => `<div class="open-book">${artwork(p)}<article class="story-page">${body}</article></div>`;
  function go(next, nextPage = page, replace = false) {
    view = next; page = Math.min(book.pages.length - 1, Math.max(0, nextPage));
    const hash = view === 'read' ? '#read-' + (page + 1) : '#' + view;
    if (location.hash !== hash) history[replace ? 'replaceState' : 'pushState'](null, '', hash);
    render();
    root.focus({preventScroll:true}); window.scrollTo({top:0, behavior:'instant'});
  }
  function readLocation() {
    const match = location.hash.match(/^#read-(\d+)$/);
    if (match) { page = Math.min(book.pages.length - 1, Math.max(0, Number(match[1]) - 1)); view = 'read'; }
    else if (['#intro','#feel','#say','#listen','#reply','#end'].includes(location.hash)) view = location.hash.slice(1);
    else view = 'intro';
    if (['listen','reply','end'].includes(view) && expression === null) view = 'feel';
    if (view === 'end' && reply === null) view = 'reply';
    render();
  }
  function startActivity() { feelings = new Set(); expression = null; reply = null; revealed = false; go('feel'); }
  function intro() {
    const p={image:book.cover,alt:'과자집 앞에서 이야기를 나누는 헨젤과 그레텔, 마녀'};
    return spread(p,`<h1>${book.title}</h1><p class="story-text">독일 전래동화 「헨젤과 그레텔」을 따뜻한 결말로 새롭게 읽어요. 아이가 무섭고 화난 마음을 꺼냈을 때, 마녀가 잠깐 멈추고 들어주었다면 어땠을까요?</p><p class="hansel-source">원작: 독일 전래동화 · 그림 형제의 「헨젤과 그레텔」</p>`)+`<h2 class="book-path-heading">오늘은 어떻게 책을 만나볼까요?</h2><p class="book-path-note">같은 이야기도 다른 마음으로 읽으면 달라집니다.</p><div class="book-paths"><button id="start-read"><strong>동화 읽기</strong><span>그림과 함께 헨젤과 그레텔의 이야기를 읽어요.</span></button><button id="start-activity"><strong>마음 건네보기 활동</strong><span>내가 그레텔이 되어 마녀의 마음을 듣고, 내 마음도 말해봐요.</span></button></div>`;
  }
  function read() {
    const p=book.pages[page];
    return spread(p,`<p class="kicker">${page+1} / 8</p><h2>${book.title}</h2><div class="story-text">${paragraphs(p.text)}</div>`)+`${window.bookSwipeHint()}<nav class="reading-nav" aria-label="동화 페이지"><button id="first-page" class="choice" ${page===0?'disabled':''}>맨 앞장으로</button><button id="prev" class="choice" ${page===0?'disabled':''}>← 이전 장</button>${button('next',page<7?'다음 장 →':'마음 건네보기 활동 →',true)}</nav>`;
  }
  function activity() {
    const a=book.activity;let p=book.pages[2],body='',below='';
    if(view==='feel') {
      body=`<p class="kicker">마음 건네보기 활동 · 1 / 4</p><h2>${book.title}</h2><p class="story-text">“누가 내 집을 먹었니!”\n마녀의 목소리에 그레텔의 어깨가 움츠러들었어요.\n과자와 앞치마를 쥔 손에는 힘이 들어갔어요.</p>`;
      below=`<section class="activity-panel"><h2>내가 그레텔이라면, 어떤 마음일까요?</h2><p>여러 마음을 골라도 괜찮아요. 고르지 않고 천천히 이야기를 이어가도 좋아요.</p><div class="feeling-choices">${a.feelings.map((v,i)=>`<button class="choice" data-feeling="${i}" aria-pressed="${feelings.has(i)}">${v}</button>`).join('')}</div>${button('feel-next','대화 이어가기 →',true)}<p class="muted">어른과 함께 읽거나, 그림을 보고 말해도 좋아요. 점수 없이 여러 표현을 살펴보는 활동입니다.</p></section>`;
    }
    if(view==='say') {
      body=`<p class="kicker">마음 건네보기 활동 · 2 / 4</p><h2>내 마음을 어떻게 전해볼까요?</h2><p class="story-text">솔직한 마음을 말하거나, 도움을 부탁하거나, 잠시 생각할 시간을 요청해도 좋아요.</p>`;
      below=`<section class="activity-panel"><h2>마녀에게 어떤 말을 건넬까요?</h2><div class="choices">${a.expressions.map((v,i)=>`<button class="choice" data-expression="${i}">${escape(v.text)} <b>→</b></button>`).join('')}</div>${button('say-back','← 마음 다시 살펴보기')}</section>`;
    }
    if(view==='listen') {
      p=book.pages[3];const chosen=a.expressions[expression];
      body=`<p class="kicker">마음 건네보기 활동 · 3 / 4</p><h2>마녀의 마음도 들어봐요</h2><p class="muted">내가 고른 말</p><p class="story-text">${escape(chosen.text)}</p>`;
      below=`<section class="activity-panel"><h2>마녀의 마음도 들어봐요</h2>${revealed?`<div class="frog-voice" role="status"><p>“${escape(chosen.response)}”</p><p>${chosen.action}</p><p>“이 집은 내가 오래 만든 거라 부서져서 속상했어. 다음에는 먼저 물어봐 줬으면 좋겠어.”</p></div>${button('listen-next','대화 이어가기 →',true)}`:button('reveal','마녀의 마음 열어보기',true)}<div class="frog-end-buttons">${button('listen-back','← 다른 말 살펴보기')}</div></section>`;
    }
    if(view==='reply') {
      p=book.pages[5];
      body=`<p class="kicker">마음 건네보기 활동 · 4 / 4</p><h2>이야기를 듣고 나니, 어떤 말을 건네고 싶나요?</h2><p class="story-text">“이 집은 내가 오래 만든 거라 부서져서 속상했어.”\n상대의 마음을 알아도 내 마음이 바로 달라지지 않을 수 있어요.</p>`;
      below=`<section class="activity-panel"><h2>어떤 말을 더 하고 싶나요?</h2><div class="choices">${a.replies.map((v,i)=>`<button class="choice" data-reply="${i}">${escape(v.text)} <b>→</b></button>`).join('')}</div>${button('reply-back','← 마녀의 이야기 다시 듣기')}</section>`;
    }
    if(view==='end') {
      p={...book.pages[6], image:book.activityEndImage, alt:'과자집 앞 벤치에서 빵을 먹는 남매와 곁에서 기다려주는 마녀'};
      body=`<h2>우리의 말로 이어진 이야기</h2><p class="story-text">${escape(a.replies[reply].ending)}\n\n마녀는 남매 곁에 머물렀고, 이웃은 가족을 찾으러 갔어요. 아직 해가 남은 숲길에서 남매는 자신들을 찾던 부모와 다시 만났어요.</p>`;
      below=`<section class="activity-panel frog-summary"><h2>내가 살펴본 마음</h2><p>${feelings.size?[...feelings].map(i=>a.feelings[i]).join(' · '):'마음을 고르지 않고 이야기를 이어갔어요.'}</p><h2>내가 고른 말</h2><p>${escape(a.expressions[expression].text)}</p><p>${escape(a.replies[reply].text)}</p><h2>내게 남은 마음과 생각</h2><p>마녀의 이야기를 듣고 내게 남은 마음은 무엇인가요? 지금 답을 정하지 않고 다음에 다시 생각해도 좋아요.</p><div class="frog-end-buttons">${button('again','다른 말도 건네보기',true)}${button('read-ending','동화의 마지막 장 읽기')}${button('end-cover','책 표지로')}</div></section>`;
    }
    return spread(p,body)+below;
  }
  function render() {
    root.innerHTML = `<section class="reading frog-reading hansel-reading"><button class="text-button" id="back-shelf">← 책장으로</button>${view==='intro'?'':tabs()}${view==='intro'?intro():view==='read'?read():activity()}</section>`;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let node;
    while ((node = walker.nextNode())) node.nodeValue = t(node.nodeValue);
    for (const el of root.querySelectorAll('[alt],[aria-label]')) for (const attr of ['alt','aria-label']) if(el.hasAttribute(attr)) el.setAttribute(attr,t(el.getAttribute(attr)));
    document.title = (view === 'read' ? book.pages[page].title + ' · ' : '') + book.title + ' · ' + t('마음동화책방');
    on('back-shelf',()=>{location.href=libraryURL('#tales');});
    on('to-cover', () => go('intro')); on('start-read', () => go('read',0));
    on('tab-read', () => go('read')); on('tab-activity', startActivity);
    on('start-activity', startActivity); on('ending-activity', startActivity);
    on('first-page', () => go('read',0)); on('prev', () => go('read',page-1)); on('next', () => page < book.pages.length-1 ? go('read',page+1) : startActivity());
    on('feel-next', () => go('say')); on('say-back', () => go('feel'));
    on('reveal', () => { revealed = true; render(); });
    on('listen-next', () => go('reply')); on('listen-back', () => go('say')); on('reply-back', () => go('listen'));
    on('again', startActivity); on('read-ending', () => go('read',7)); on('end-cover', () => go('intro'));
    root.querySelectorAll('[data-feeling]').forEach(el => el.onclick = () => { const i = Number(el.dataset.feeling); feelings.has(i) ? feelings.delete(i) : feelings.add(i); el.setAttribute('aria-pressed',String(feelings.has(i))); });
    root.querySelectorAll('[data-expression]').forEach(el => el.onclick = () => { expression = Number(el.dataset.expression); revealed = false; go('listen'); });
    root.querySelectorAll('[data-reply]').forEach(el => el.onclick = () => { reply = Number(el.dataset.reply); go('end'); });
    if(view==='read')window.bindBookSwipe(root.querySelector('.open-book'),()=>{if(page>0)go('read',page-1);},()=>{if(page<7)go('read',page+1);});
    if(view === 'read' && page < 7){ const preload = new Image(); preload.src = book.pages[page+1].image; }
  }
  document.addEventListener('keydown', e => {
    if(menu.open || view !== 'read' || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.altKey || e.ctrlKey || e.metaKey)return;
    if(e.key === 'ArrowRight' && page < 7){e.preventDefault();go('read',page+1);}
    if(e.key === 'ArrowLeft' && page > 0){e.preventDefault();go('read',page-1);}
  });
  window.addEventListener('popstate', readLocation);
  document.getElementById('language').onchange = e => setLanguage(e.target.value);
  readLocation();
  setLanguage(language);
})();
