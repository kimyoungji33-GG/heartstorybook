'use strict';

// 부엌·아랫목·텃밭의 영어·스페인어 글자.
// 한국어 문장을 열쇠로 써요. {name} 같은 자리는 그때그때 채워요.
// 메뉴와 텃밭 파일(json)은 각 항목의 en, es 묶음에서 이름과 대사를 가져와요.
(() => {
  const rows = [
    // 화면 이름과 버튼
    ['할머니 댁 부엌', "Grandma's Kitchen", 'La cocina de la abuela'],
    ['아랫목', 'Warm Floor Room', 'El cuarto del suelo tibio'],
    ['마음 텃밭', 'Heart Garden', 'El huerto del corazón'],
    ['← 부엌 가기', '← To the kitchen', '← A la cocina'],
    ['텃밭 가기 →', 'To the garden →', 'Al huerto →'],
    ['← 거실', '← Living room', '← Sala'],
    ['아랫목 →', 'Warm room →', 'Cuarto tibio →'],
    ['← 부엌', '← Kitchen', '← Cocina'],
    ['다른 상 차려 주세요', 'A different table, please', 'Otra mesa, por favor'],
    ['간식 선반', 'Snack shelf', 'Estante de meriendas'],
    ['냉장고', 'Fridge', 'Nevera'],
    ['차와 주스', 'Tea and juice', 'Té y jugos'],
    ['간식', 'Snacks', 'Meriendas'],
    ['닫기', 'Close', 'Cerrar'],
    ['이모', 'Aunt', 'Tía'],
    ['삼촌', 'Uncle', 'Tío'],
    ['할머니에게 밥상 부탁하기', 'Ask Grandma for a meal', 'Pedirle comida a la abuela'],
    ['마음 별 {n}개', '{n} heart stars', '{n} estrellas del corazón'],
    ['물뿌리개 {n}개', 'Watering cans: {n}', 'Regaderas: {n}'],
    // 부엌
    ['맛있게 먹으렴.', 'Enjoy it, sweetie.', 'Que aproveche, cariño.'],
    ['텃밭에서 딴 {name} · {intro}', '{name} from the garden · {intro}', '{name} del huerto · {intro}'],
    ['{name} · {intro}', '{name} · {intro}', '{name} · {intro}'],
    ['모두 무료예요. 몇 잔이든 마셔도 돼요.', "It's all free. Have as many cups as you like.", 'Todo es gratis. Toma todas las tazas que quieras.'],
    ['모두 무료예요. 먹고 싶은 걸 꺼내 먹어요.', "It's all free. Take whatever you'd like to eat.", 'Todo es gratis. Toma lo que te apetezca.'],
    ['오늘은 무슨 밥상을 차려 줄까?', 'What kind of table shall I set today?', '¿Qué mesa te preparo hoy?'],
    ['할머니가 아랫목에 상을 차려 줘요. 모두 무료예요.', 'Grandma sets the table in the warm room. It’s all free.', 'La abuela pone la mesa en el cuarto tibio. Todo es gratis.'],
    ['그래, 아랫목에 {name} 차려 놓을게. 어서 들어가렴.', "All right, I'll set out {name} in the warm room. Go on in.", 'Muy bien, te pongo {name} en el cuarto tibio. Entra.'],
    ['{name} 먹기', 'Eat {name}', 'Comer {name}'],
    ['{line} 그릇을 눌러 보렴.', '{line} Tap a dish to try it.', '{line} Toca un plato para probarlo.'],
    ['밥상을 차리는 중이란다.', "I'm still setting the table.", 'Todavía estoy poniendo la mesa.'],
    ['왔구나! 배고프면 할머니를 부르고, 출출하면 간식 선반이나 냉장고를 열어 보렴.', "You're here! Call Grandma if you're hungry, or open the snack shelf or fridge for a nibble.", '¡Ya llegaste! Si tienes hambre, llama a la abuela; si te apetece picar algo, abre el estante o la nevera.'],
    ['그럼 {name:으로} 다시 차려 줄게.', "Then I'll set {name} for you instead.", 'Entonces te preparo {name}.'],
    // 텃밭
    ['『{title}』', '“{title}”', '«{title}»'],
    ['한 송이 꺾어 거실 화병에 꽂기', 'Pick one for the living room vase', 'Cortar una para el florero de la sala'],
    ['거실 화병에서 빼기', 'Take it out of the vase', 'Sacarla del florero'],
    ['{name} 한 송이, 거실 화병에 꽂아 둘게.', 'One {name} — I’ll put it in the living room vase.', 'Un {name}: lo pondré en el florero de la sala.'],
    ['텃밭에 상추 심어 놨어. 같이 가 볼래?', 'I planted lettuce in the garden. Want to come see?', 'Planté lechuga en el huerto. ¿Vienes a verla?'],
    ['여기 앉아 있으면 잠이 솔솔 와.', 'Sitting here makes me sleepy.', 'Sentado aquí me entra sueño.'],
    ['천천히 읽어. 서두를 거 없어.', 'Read slowly. No need to hurry.', 'Lee despacio. No hay prisa.'],
    ['이모는 여기서 책 읽는 게 제일 좋더라.', 'Reading right here is my favorite thing.', 'Leer aquí es lo que más me gusta.'],
    ['꽃이 피면 거실 화병에 꽂아 두자.', 'When the flowers bloom, let’s put them in the living room vase.', 'Cuando florezcan, pongámoslas en el florero de la sala.'],
    ['창밖 햇살 좀 봐. 참 좋다.', 'Look at the sunlight outside. So nice.', 'Mira el sol por la ventana. Qué bonito.'],
    ['이불 펴고 눕기', 'Lay out the quilt and lie down', 'Extender el edredón y acostarse'],
    ['일어나기', 'Get up', 'Levantarse'],
    ['🐾 동물 친구: 켬', '🐾 Animal friends: on', '🐾 Amigos animales: sí'],
    ['동물 친구들은 마당으로 놀러 갔어요.', 'The animal friends went out to play in the yard.', 'Los amigos animales salieron a jugar al patio.'],
    ['🐾 동물 친구: 끔', '🐾 Animal friends: off', '🐾 Amigos animales: no'],
    ['뒹굴뒹굴', 'Roll around', 'Rodar'],
    ['전단지', 'Flyer', 'Folleto'],
    ['보리', 'Bori', 'Bori'],
    ['고양이 침대', 'Cat bed', 'Cama de gatos'],
    ['캣타워', 'Cat tower', 'Torre para gatos'],
    ['벽난로', 'Fireplace', 'Chimenea'],
    ['장난감 바구니', 'Toy basket', 'Cesta de juguetes'],
    ['낚싯대로 고양이랑 놀기', 'Play with the cats (feather wand)', 'Jugar con los gatos (caña de plumas)'],
    ['보리에게 공 던지기', 'Throw a ball for Bori', 'Lanzarle una pelota a Bori'],
    ['보리에게 인형 던지기', 'Throw a toy for Bori', 'Lanzarle un peluche a Bori'],
    ['군고구마 먹기', 'Eat a roasted sweet potato', 'Comer un camote asado'],
    ['호호 불어서 먹어야지. 뜨겁다.', 'Blow on it first — it’s hot!', 'Sopla primero, ¡está caliente!'],
    ['우리 식구 사진', 'Our family photo', 'Nuestra foto de familia'],
    ['다 같이 찍은 사진이란다. 너도 우리 식구야.', 'We all took this picture together. You’re family too.', 'Nos sacamos esta foto todos juntos. Tú también eres de la familia.'],
    ['밥 먹자~ 아랫목에 상 차려 놨다. 다들 기다린다, 어서 들어가렴.', 'Time to eat~ The table’s set in the warm room. Everyone’s waiting, go on in.', '¡A comer~! La mesa está puesta en el cuarto tibio. Todos te esperan, entra.'],
    ['{line} 반찬이나 식구들을 눌러 보렴.', '{line} Tap a dish or a family member.', '{line} Toca un plato o a alguien de la familia.'],
    ['할머니가 밥 먹고 가래요', 'Grandma says stay for a meal', 'La abuela dice que te quedes a comer'],
    ['간식 냉장고', 'Snack fridge', 'Nevera de meriendas'],
    ['어디서 봤더라? (눌러 보기)', 'Where have I seen it? (tap)', '¿Dónde lo he visto? (toca)'],
    ['이불 깔아 줄게. 푹 쉬렴.', 'I’ll lay out the quilt for you. Have a good rest.', 'Te extiendo el edredón. Descansa bien.'],
    ['뒹굴뒹굴~ 아랫목이 따끈따끈하지?', 'Roll, roll~ The floor is nice and toasty, isn’t it?', 'Rueda, rueda~ ¿Verdad que el suelo está calentito?'],
    ['잘 잤니? 개운하지?', 'Did you sleep well? Feel refreshed?', '¿Dormiste bien? ¿Te sientes descansado?'],
    ['빈 밭', 'Empty bed', 'Bancal vacío'],
    ['씨앗', 'Seed', 'Semilla'],
    ['새싹', 'Sprout', 'Brote'],
    ['꽃', 'Flower', 'Flor'],
    ['갓 심음', 'Just planted', 'Recién plantado'],
    ['자라는 중', 'Growing', 'Creciendo'],
    ['수확할 때', 'Ready to pick', 'Listo para cosechar'],
    ['{title} 꽃밭, {stage}', '{title} flower bed, {stage}', 'Bancal de flores de {title}, {stage}'],
    ['{name} 밭, {stage}', '{name} bed, {stage}', 'Bancal de {name}, {stage}'],
    ['{name} · 「{meaning}」', '{name} · “{meaning}”', '{name} · «{meaning}»'],
    ['{name} 밭 · {stage}', '{name} bed · {stage}', 'Bancal de {name} · {stage}'],
    ['{who}의 마음으로', 'Through {who}’s heart', 'Desde el corazón de {who}'],
    ['아직 읽지 않았어요', 'Not read yet', 'Todavía no lo has leído'],
    ['이 책을 끝까지 읽으면 씨앗을 심을 수 있어요.', 'Read this book to the end to plant a seed.', 'Lee este libro hasta el final para plantar una semilla.'],
    ['{who}의 마음으로도 읽어 보면 꽃이 필 거예요.', 'Read it through {who}’s heart too, and it will bloom.', 'Léelo también desde el corazón de {who} y florecerá.'],
    ['{who}의 마음으로도 읽어 보면 한 뼘 더 자랄 거예요.', 'Read it through {who}’s heart too, and it will grow a little more.', 'Léelo también desde el corazón de {who} y crecerá un poco más.'],
    ['이 책 읽으러 가기', 'Go read this book', 'Ir a leer este libro'],
    ['물 주기', 'Water it', 'Regar'],
    ['{name:가} 활짝 폈구나.', 'The {name} is in full bloom.', 'El {name} ya floreció.'],
    ['씨앗 하나 심었네.', 'A seed is planted.', 'Ya plantamos una semilla.'],
    ['새싹 났네.', 'A sprout came up.', 'Salió un brote.'],
    ['물뿌리개는 이모한테 있어.', 'Aunt has the watering can.', 'La regadera la tiene la tía.'],
    ['시원하겠다.', 'That must feel cool.', 'Qué fresquito.'],
    ['삼촌이랑 같이 심어 볼까요? 물을 줄 때마다 자라요.', 'Shall we plant it with Uncle? It grows each time you water it.', '¿Lo plantamos con el tío? Crece cada vez que lo riegas.'],
    ['심기', 'Plant', 'Plantar'],
    ['{name} 심었다. 물 주면 잘 클 거야.', 'The {name} is planted. Water it and it’ll grow.', 'Ya plantamos el {name}. Si lo riegas, crecerá.'],
    ['물을 {n}번 더 주면 수확할 수 있어요.', 'Water it {n} more time(s) and it’s ready to pick.', 'Riégalo {n} vez/veces más y estará listo para cosechar.'],
    ['{name} 다 컸네. 따 볼까?', 'The {name} is all grown. Shall we pick it?', 'El {name} ya creció. ¿Lo cosechamos?'],
    ['잘 크고 있네.', 'It’s growing nicely.', 'Está creciendo bien.'],
    ['수확하면 할머니 시골밥상에 「{dish}」이 올라가요.', 'Pick it and “{dish}” will appear on Grandma’s country table.', 'Cosécalo y «{dish}» aparecerá en la mesa de la abuela.'],
    ['수확해서 할머니께 갖다 드려요.', 'Pick it and take it to Grandma.', 'Cosécalo y llévaselo a la abuela.'],
    ['수확하기', 'Pick', 'Cosechar'],
    ['{name} 땄구나. 할머니 갖다 드리자.', 'You picked the {name}. Let’s take it to Grandma.', 'Cosechaste el {name}. Llevémoselo a la abuela.'],
    ['{who} 마음으로 읽으면 {name:가} 더 자란대.', 'They say the {name} grows when you read through {who}’s heart.', 'Dicen que el {name} crece si lees desde el corazón de {who}.'],
    ['빈 밭은 천천히 채우면 돼.', 'Empty beds can fill up slowly.', 'Los bancales vacíos se llenan poco a poco.'],
    ['꽃이 다 폈네. 고맙다.', 'Every flower bloomed. Thank you.', 'Todas las flores florecieron. Gracias.'],
    ['물뿌리개 하나 줄게.', 'Here’s a watering can for you.', 'Toma, una regadera.'],
    ['비 덕분에 채소가 물 마셨네.', 'The rain gave the vegetables a drink.', 'La lluvia les dio de beber a las verduras.'],
    ['왔니. 밭에 뭐가 났나 같이 볼까?', 'You’re here. Shall we see what came up?', 'Ya llegaste. ¿Vemos qué salió?'],
    ['왔니. 천천히 둘러보렴.', 'You’re here. Take your time looking around.', 'Ya llegaste. Mira con calma.'],
  ];
  const table = new Map(rows.map(([ko, en, es]) => [ko, { en, es }]));

  function particle(word, josa) {
    const last = word.trim().slice(-1);
    const code = last.charCodeAt(0) - 0xac00;
    const isHangul = code >= 0 && code <= 11171;
    const final = isHangul ? code % 28 : 0;
    if (josa === '가' || josa === '이') return isHangul && final ? '이' : '가';
    if (josa === '으로' || josa === '로') return isHangul && final && final !== 8 ? '으로' : '로';
    if (josa === '을' || josa === '를') return isHangul && final ? '을' : '를';
    return josa;
  }

  function lang() {
    const value = document.documentElement.lang || 'ko';
    return ['ko', 'en', 'es'].includes(value) ? value : 'ko';
  }

  function t(korean, values = {}) {
    const current = lang();
    const text = current === 'ko' ? korean : (table.get(korean)?.[current] || korean);
    // {name:가} 는 받침에 따라 이/가, {name:으로} 는 으로/로 를 붙여요(한국어일 때만).
    return text.replace(/\{(\w+)(?::([가-힣]+))?\}/g, (match, key, josa) => {
      const value = values[key];
      if (value === undefined) return match;
      return josa && current === 'ko' ? value + particle(String(value), josa) : String(value);
    });
  }

  // 메뉴·텃밭 자료의 이름과 대사를 지금 언어로 바꿔 끼워요. 한국어 원문은 _ko 에 보관해요.
  const fields = ['name', 'line', 'intro', 'title', 'meaning', 'who'];
  function localize(node, current = lang()) {
    if (Array.isArray(node)) { node.forEach(item => localize(item, current)); return node; }
    if (!node || typeof node !== 'object') return node;
    if (!node._ko) {
      node._ko = {};
      for (const field of fields) if (typeof node[field] === 'string') node._ko[field] = node[field];
    }
    for (const field of Object.keys(node._ko)) {
      node[field] = (current !== 'ko' && node[current]?.[field]) || node._ko[field];
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === '_ko' || key === 'en' || key === 'es') continue;
      if (value && typeof value === 'object') localize(value, current);
    }
    return node;
  }

  // 화면에 박힌 글자(data-home-text, data-home-aria)를 바꿔요.
  function apply(root = document) {
    root.querySelectorAll('[data-home-text]').forEach(el => { el.textContent = t(el.dataset.homeText); });
    root.querySelectorAll('[data-home-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.homeAria)));
  }

  document.addEventListener('roomlanguagechange', () => {
    apply();
    document.dispatchEvent(new Event('hometextchange'));
  });

  window.homeText = { t, lang, localize, apply };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => apply());
  else apply();
})();
