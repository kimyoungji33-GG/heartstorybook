(() => {
  'use strict';

  const images = [1, 2, 3, 4, 7, 8, 9, 13, 14, 15, 17, 18, 20, 24, 25, 26, 27, 28];
  const music = {1: 1, 3: 2, 4: 2, 5: 2, 6: 3, 7: 3, 8: 3, 9: 4, 10: 4, 11: 4,
    12: 5, 13: 5, 14: 5, 15: 6, 16: 6};
  const arrivals = {4: 0, 7: 1, 10: 2, 13: 3};
  const image = number => `./images/story-sounds/heroes/${number}.webp`;
  const track = (type, number) => `./audio/story-sounds/heroes/${type}-${number}.mp3`;
  const route = number => `#heroes-${number}`;
  const text = lang => window.heroesAtHomeText[lang] || window.heroesAtHomeText.ko;
  const local = (lang, ko, en, es) => ({ko, en, es})[lang] || ko;

  function card(lang) {
    const copy = text(lang);
    return `<a class="sound-collection story-sound-book" href="${route(1)}">
      <img src="${image(1)}" alt="${copy.scenes[0][3]}" width="1440" height="810">
      <span class="season-label">${copy.category}</span>
      <strong>${copy.title}</strong>
      <p>${copy.summary}</p>
      <span class="collection-open">${window.storySoundTranslate('소리 탐험 시작하기', lang)} →</span>
    </a>`;
  }

  function render(root, hash, lang, { listening, setMusic, addVoice }) {
    const match = /^heroes-([1-9]\d*)$/.exec(hash);
    const number = match ? Number(match[1]) : 0;
    const copy = text(lang);
    if (number < 1 || number > copy.scenes.length) return false;

    const w = (ko, en, es) => local(lang, ko, en, es);
    const [title, story, question, alt] = copy.scenes[number - 1];
    const shelf = w('이야기 책장으로', 'Back to the story shelf', 'Volver a la estantería');
    const last = number === copy.scenes.length;
    const musicNumber = music[number];
    const visitor = arrivals[number];
    const lines = visitor === undefined ? null : copy.quotes[visitor];
    const voiceLabel = w('영어 대사 듣기', 'Listen to the line', 'Escuchar la frase en inglés');
    const voiceStop = w('대사 멈추기', 'Stop the line', 'Detener la frase');
    const next = lines
      ? w('어떻게 정리했을까요? →', 'See how they did it →', 'Ver cómo lo hizo →')
      : [3, 6, 9, 12].includes(number)
        ? w('손님 만나기 →', 'Meet the visitor →', 'Conocer al visitante →')
        : w('다음 그림으로 →', 'Next picture →', 'Siguiente imagen →');
    document.title = `${copy.title} · ${w('마음동화책방', 'Heart Storybook Library', 'Biblioteca de cuentos del corazón')}`;
    root.dataset.step = 'heroes';
    root.dataset.round = String(number);
    root.innerHTML = `<section class="story-sound-reader heroes-reader">
      <a class="back-link" href="#shelf">← ${shelf}</a>
      <p class="progress">${w('장면', 'Scene', 'Escena')} ${number} / ${copy.scenes.length}</p>
      <h1 tabindex="-1">${title}</h1>
      <figure class="story-scene">
        <img src="${image(images[number - 1])}" alt="${alt}" width="1440" height="810">
        <figcaption>${story}</figcaption>
      </figure>
      ${musicNumber ? listening() : ''}
      ${lines ? `<div class="listening heroes-quote">
        <p>“${lines[0]}”</p>
        <button id="heroes-greeting" type="button">▶ ${voiceLabel}</button>
      </div>` : ''}
      <p class="sound-prompt">${question}</p>
      ${lines ? `<details class="heroes-plan">
        <summary>${w('영웅의 계획 들어보기', 'Hear the hero’s plan', 'Escuchar el plan del héroe')}</summary>
        <div class="listening heroes-quote">
          <p>“${lines[1]}”</p>
          <button id="heroes-plan" type="button">▶ ${voiceLabel}</button>
        </div>
      </details>` : ''}
      <p class="optional-note">${last
        ? w('말하고 싶으면 나누고, 마음속에만 간직해도 좋아요.', 'Share if you like, or keep your thoughts quietly to yourself.', 'Compártelo si quieres o guárdalo para ti.')
        : w('함께 이야기하거나 마음속으로만 생각해도 좋아요.', 'Talk about it together or imagine it quietly.', 'Pueden conversar o imaginar en silencio.')}</p>
      <nav class="sound-actions" aria-label="${w('이야기 이동', 'Story navigation', 'Navegación del cuento')}">
        <a href="${number === 1 ? '#shelf' : route(number - 1)}">${w('← 이전으로', '← Back', '← Atrás')}</a>
        <a class="primary" href="${last ? route(1) : route(number + 1)}">${last ? w('다시 탐험하기', 'Explore again', 'Explorar de nuevo') : next}</a>
        ${last ? `<a href="#shelf">${shelf}</a>` : ''}
      </nav>
    </section>`;
    if (musicNumber) setMusic(track('music', musicNumber));
    if (lines) {
      addVoice('heroes-greeting', track('voice', visitor * 2 + 1), voiceLabel, voiceStop);
      addVoice('heroes-plan', track('voice', visitor * 2 + 2), voiceLabel, voiceStop);
    }
    return true;
  }

  window.heroesAtHome = { card, render };
})();
