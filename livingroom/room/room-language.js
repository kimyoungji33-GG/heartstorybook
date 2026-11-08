(() => {
  'use strict';

  const translations = new Map([
    ['언어', 'Language', 'Idioma'],
    ['첫 화면', 'Home', 'Inicio'],
    ['홈페이지 첫 화면으로', 'Go to the home page', 'Ir a la página de inicio'],
    ['마음동화책방', 'The Heart Storybook Library', 'La biblioteca de los corazones'],
    ['마음동화책방 · 새 책방', 'The Heart Storybook Library · Living room', 'La biblioteca de los corazones · Sala'],
    ['마음동화책방 새 책방', 'The Heart Storybook Library living room', 'Sala de la biblioteca de los corazones'],
    ['햇살이 드는 책방', 'A sunlit reading room', 'Una sala de lectura soleada'],
    ['벽난로, 정면 의자, 소파가 있는 책방', 'A reading room with a fireplace, an armchair, and a sofa', 'Una sala de lectura con chimenea, sillón y sofá'],
    ['새 책방 책장', 'Living room bookshelf', 'Estantería de la sala'],
    ['책장 가까이 보기', 'Take a closer look at the bookshelf', 'Mirar la estantería de cerca'],
    ['서가에서 읽을 수 있어요', 'You can read this book in the library.', 'Puedes leer este libro en la biblioteca.'],
    ['새 책방으로 돌아가기', 'Return to the living room', 'Volver a la sala'],
    ['다른 표지 보기', 'See other covers', 'Ver otras portadas'],
    ['정면 의자', 'Armchair', 'Sillón'],
    ['소파 가까운 자리', 'Nearest sofa seat', 'Asiento más cercano del sofá'],
    ['소파에서 가까운 자리에 앉기', 'Sit in the nearest sofa seat', 'Sentarse en el asiento más cercano del sofá'],
    ['왼쪽 자리', 'Left seat', 'Asiento izquierdo'],
    ['오른쪽 자리', 'Right seat', 'Asiento derecho'],
    ['소파 왼쪽', 'left sofa seat', 'el asiento izquierdo del sofá'],
    ['소파 오른쪽', 'right sofa seat', 'el asiento derecho del sofá'],
    ['작은 탁자', 'Small table', 'Mesa pequeña'],
    ['{name}에 앉기', 'Sit in {name}', 'Sentarse en {name}'],
    ['앉아 있는 {name}', 'Seated in {name}', 'Sentado en {name}'],
    ['{name}에 앉았어요.', 'You sat in {name}.', 'Te sentaste en {name}.'],
    ['{name}에서 일어났어요.', 'You stood up from {name}.', 'Te levantaste de {name}.'],
    ['바닥을 누르면 걸어요. 창가 의자나 소파에 앉아 보세요.', 'Tap the floor to walk. Try sitting in the armchair or on the sofa.', 'Toca el suelo para caminar. Prueba a sentarte en el sillón o en el sofá.'],
    ['원하는 만큼 쉬어 가세요.', 'Rest here as long as you like.', 'Descansa aquí el tiempo que quieras.'],
    ['일어나기', 'Stand up', 'Levantarse'],
    ['아바타 고르기', 'Choose a character', 'Elegir un personaje'],
    ['움직임 줄이기가 켜져 있어요', 'Reduced motion is on', 'El movimiento reducido está activado'],
    ['성인 남자', 'Adult man', 'Hombre adulto'],
    ['성인 여자', 'Adult woman', 'Mujer adulta'],
    ['어린 소녀', 'Girl', 'Niña'],
    ['어린 소년', 'Boy', 'Niño'],
    ['아바타 그림을 불러오지 못했어요. 페이지를 새로고침해 보세요.', 'The characters could not load. Try reloading the page.', 'No se pudieron cargar los personajes. Prueba a recargar la página.'],
    ['할아버지', 'Grandpa', 'Abuelo'],
    ['할머니', 'Grandma', 'Abuela'],
    ['모모', 'Momo', 'Momo'],
    ['세미', 'Semi', 'Semi'],
    ['마음의 소리, 같이 들어 볼까?', 'Shall we listen to some sounds together?', '¿Escuchamos unos sonidos juntos?'],
    ['왔니. 이야기 하나 같이 볼까?', 'You’re here! Shall we read a story together?', '¡Ya llegaste! ¿Leemos un cuento juntos?'],
    ['곧 열려요.', 'It will open soon.', 'Abrirá pronto.'],
    ['이야기 속 마음을 찾는 열쇠가 있다냥. 같이 알아볼까냥?', 'There are keys to finding feelings in stories. Shall we look together? Meow!', 'Hay llaves para descubrir lo que sienten los personajes. ¿Las buscamos juntos? ¡Miau!'],
    ['소리로 떠올리는 풍경', 'Scenes imagined through sound', 'Paisajes que imaginamos con sonidos'],
    ['이야기 속 소리 탐험', 'Explore sounds in a story', 'Explora los sonidos de un cuento'],
    ['같은 하루, 다른 마음', 'One Day, Different Hearts', 'Un día, distintos sentimientos'],
    ['만약 이랬다면 어땠을까', 'What If the Story Changed?', '¿Y si el cuento cambiara?'],
    ['마음열쇠 알아보기', 'Discover the heart keys', 'Descubre las llaves del corazón'],
    ['어른 동화', 'Stories for adults', 'Cuentos para adultos'],
    ['아이 동화', 'Stories for children', 'Cuentos para niños'],
    ['아직 남겨 둔 의자', 'Room on the Bench', 'Un sitio en el banco'],
    ['접어 둔 소매 한 뼘', 'A Fold in the Sleeve', 'Un pliegue en la manga'],
    ['엄마가 고른 오늘의 꽃', 'The Flowers Mum Chose Today', 'Las flores que mamá eligió hoy'],
    ['빨간 표시 옆의 한마디', 'A Word Beside the Red Marks', 'Una frase junto a las marcas rojas'],
    ['생일날, 두 개의 잔', 'Two Cups on a Birthday', 'Dos tazas en un cumpleaños'],
    ['마지막 한 조각은 누구에게?', 'Who Is the Last Piece For?', '¿Para quién es el último trocito?'],
    ['작은 손에 담긴 따뜻한 빵', 'Warm Bread in Little Hands', 'Pan tibio en manos pequeñas'],
    ['문 뒤에 숨겨 둔 별', 'The Star Behind the Door', 'La estrella detrás de la puerta'],
    ['노란 공이 기다려 준 날', 'The Day the Yellow Ball Waited', 'El día que la pelota amarilla esperó'],
    ['삐뚤빼뚤, 우리의 별', 'Our Wonderfully Wobbly Stars', 'Nuestras estrellas un poquito torcidas'],
    ['{title} 표지', 'Cover of {title}', 'Portada de {title}']
  ].map(([ko, en, es]) => [ko, {en, es}]));

  const picker = document.getElementById('room-language');
  const url = new URL(location.href);
  const supported = ['ko', 'en', 'es'];
  let stored;
  try { stored = localStorage.getItem('heart-language'); } catch {}
  const requested = url.searchParams.get('lang');
  let language = supported.includes(requested) ? requested : supported.includes(stored) ? stored : 'ko';

  function text(korean, values = {}) {
    const translated = translations.get(korean)?.[language] || korean;
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }

  function bind(element, korean, attribute) {
    element.dataset[attribute === 'aria-label' ? 'roomAria' : 'roomText'] = korean;
    if (attribute) element.setAttribute(attribute, text(korean));
    else element.textContent = text(korean);
  }

  function update() {
    document.documentElement.lang = language;
    document.title = text('마음동화책방 · 새 책방');
    picker.value = language;
    document.getElementById('room-home').href = '../../?lang=' + language;
    try { localStorage.setItem('heart-language', language); } catch {}
    document.querySelectorAll('[data-room-text]').forEach(el => { el.textContent = text(el.dataset.roomText); });
    document.querySelectorAll('[data-room-aria]').forEach(el => el.setAttribute('aria-label', text(el.dataset.roomAria)));
    document.querySelector('.room-picture').alt = text('벽난로, 정면 의자, 소파가 있는 책방');
  }

  window.roomLanguage = {
    text,
    bind,
    link(path) {
      const target = new URL(path, location.href);
      target.searchParams.set('lang', language);
      return target.href;
    }
  };

  picker.addEventListener('change', () => {
    language = picker.value;
    url.searchParams.set('lang', language);
    history.replaceState(history.state, '', url);
    update();
    document.dispatchEvent(new Event('roomlanguagechange'));
  });
  update();
})();
