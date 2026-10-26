/* Labels shared by the sound shelves and the local story-sound prototype. */
window.StorySoundRows = [
 ['할아버지와 아이들이 따뜻한 방에서 라디오 음악을 함께 듣고 있어요.','A grandfather and children listen to radio music together in a warm room.','Un abuelo y unos niños escuchan música de la radio juntos en una habitación acogedora.'],
 ['소리로 떠올리는 풍경','Scenes imagined through sound','Paisajes que imaginamos con sonidos'],
 ['이야기 속 소리 탐험','Explore sounds in a story','Explora los sonidos de un cuento'],
 ['오늘은 어떤 소리를 만나볼까요?','Which sounds would you like to explore today?','¿Qué sonidos te gustaría explorar hoy?'],
 ['소리만 듣고 풍경을 떠올리거나, 이야기 속 장면을 살펴보세요.','Imagine a scene from a sound, or explore sounds within a story.','Imagina un paisaje al escuchar un sonido o explora los sonidos de un cuento.'],
 ['소리를 듣고 각자의 기억과 풍경을 상상해요.','Listen and imagine your own memories and scenes.','Escucha e imagina tus propios recuerdos y paisajes.'],
 ['장면을 보고 소리를 들으며, 다음 그림에서 새로운 단서를 발견해요.','Look, listen, and discover new clues in the next picture.','Mira, escucha y descubre nuevas pistas en la siguiente imagen.'],
 ['소리 풍경 만나기','Explore soundscapes','Descubrir paisajes sonoros'],
 ['이야기 책장 열기','Open the story shelf','Abrir la estantería de cuentos'],
 ['마음의 소리로','Back to sounds','Volver a los sonidos'],
 ['헨젤과 그레텔, 마녀의 집에서 들리는 소리','Hansel and Gretel: Sounds in the Witch’s House','Hansel y Gretel: los sonidos de la casa de la bruja'],
 ['커튼 뒤에서 무슨 소리가 들릴까요? 그림을 펼치며 함께 살펴봐요.','What can you hear behind the curtain? Open the pictures and explore.','¿Qué se oye detrás de la cortina? Despliega las imágenes y explora.'],
 ['소리 탐험 시작하기','Start exploring','Comenzar la exploración'],
 ['잠깐 듣고, 상상하고, 그림을 펼쳐요. 정답이나 점수는 없어요.','Listen, imagine, and open the next picture. There are no scores or right-or-wrong judgments.','Escucha, imagina y despliega la siguiente imagen. No hay puntos ni respuestas que se juzguen correctas o incorrectas.']
];
window.storySoundTranslate = (value, language) => {
 const i=language==='en'?1:language==='es'?2:0;let text=String(value);
 for(const row of [...window.StorySoundRows].sort((a,b)=>b[0].length-a[0].length)){
  for(const label of row)if(text.includes(label)){text=text.split(label).join(row[i]);break;}
 }
 return text;
};
if(window.heartTranslate){const old=window.heartTranslate;window.heartTranslate=value=>old(window.storySoundTranslate(value,window.heartLanguage()));window.applyHeartLanguage?.();}
