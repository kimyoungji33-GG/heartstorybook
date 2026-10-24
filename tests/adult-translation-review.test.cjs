const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'book-reader.html'),'utf8');
const scripts=[...html.matchAll(/<script src="\.\/([^"?]+)(?:\?[^"]*)?"><\/script>/g)].map(m=>m[1]);
const dataFiles=new Set(['six-books-data.js','book-locales.js','reader-language.js','adult-preview-data.js','adult-book-locales.js','adult-character-refresh.js','new-adult-stories.js','adult-reader-data.js','open-clue-locations.js','story-refinement.js','adult-ko-review.js','adult-translation-review.js']);
function load(lang,review=true){
 const c={window:{heartLanguage:()=>lang},document:{body:{dataset:{}}},location:{search:''},URLSearchParams};vm.createContext(c);
 for(const file of scripts.filter(f=>dataFiles.has(f)&&(review||f!=='adult-translation-review.js')))vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
 return {c,books:JSON.parse(vm.runInContext('JSON.stringify(visualBooks)',c))};
}
test('translated review runs after approved Korean review and before rendering',()=>{
 assert.ok(scripts.indexOf('adult-translation-review.js')>scripts.indexOf('adult-ko-review.js'));
 assert.ok(scripts.indexOf('adult-translation-review.js')<scripts.indexOf('six-book-reader.js'));
});
test('approved Korean edition is unchanged by the translation pass',()=>{
 assert.deepEqual(load('ko').books,load('ko',false).books);
});
for(const lang of ['en','es']){
 test(`${lang}: all 48 adult passages updated without altering children, scene structure, artwork or clue questions`,()=>{
  const before=load(lang,false).books,{c,books:after}=load(lang);let count=0;
  assert.equal(c.window.heartAdultTranslationReview.language,lang);
  assert.equal(c.window.heartAdultTranslationReview.scenes.length,24);
  for(const [i,b] of after.entries()){
   if(b.audience!=='adult'){assert.deepEqual(b,before[i]);continue;}
   assert.equal(b.activities.length,1);
   for(const [v,list]of [b.scenes,...b.activities.map(a=>a.scenes)].entries()){
    assert.equal(list.length,6);
    list.forEach((s,p)=>{
     count++;const old=(v?before[i].activities[v-1].scenes:before[i].scenes)[p];
     assert.notEqual(s.text,old.text);assert.ok(s.text.length>200);
     assert.doesNotMatch(s.text+s.title+s.clues.map(c=>c.message).join(''),/[가-힣]|Hyejin|Eunhee|Jeongwon|Thiago|undefined/);
     const {text,title,clues,...rest}=s,{text:ot,title:oh,clues:oc,...oldRest}=old;assert.deepEqual(rest,oldRest);
     clues.forEach((clue,j)=>{const {message,...meta}=clue,{message:om,...oldMeta}=oc[j];assert.deepEqual(meta,oldMeta);});
     let opens=(s.text.match(lang==='en'?/“/g:/«/g)||[]).length,closes=(s.text.match(lang==='en'?/”/g:/»/g)||[]).length;
     assert.equal(opens,closes,`${b.id} view ${v} page ${p+1}: unbalanced dialogue`);
    });
   }
  }
  assert.equal(count,48);
 });
 test(`${lang}: shared dialogue and the corrected departure, flower and feedback details agree`,()=>{
  const books=load(lang).books;
  const lines=lang==='en'?[
   ['sleeve',4,"Of course. If I change where the lining folds, I can shorten the sleeve and keep this part."],
   ['sleeve',5,"I was looking for a way to alter it without losing those stitches. I should have told you."],
   ['station',3,"But I'd like to help choose our walk back, too."],
   ['station',4,"Thank you for thinking of me. Shall we take the route you found on the way there, and the one I found on the way back?"],
   ['flowers',3,"I still do. I'm happy you remembered. Today, I wanted to choose some pale purple flowers as well."],
   ['flowers',5,"Next time, I'll ask first which flowers you like that day"],
   ['notes',3,"Yes. I can picture someone new to the area using the booklet to find the walking route."],
   ['notes',5,"Would you read my next draft too? I'd like to hear what needs changing, and which parts are easy to understand."]
  ]:[
   ['sleeve',4,'Claro. Si cambio el lugar del doblez del forro, puedo acortar la manga sin quitar esta parte'],
   ['sleeve',5,'Yo buscaba una forma de arreglarla sin quitar esas puntadas. Debí habérselo explicado'],
   ['station',3,'Pero yo también quiero ayudar a elegir el camino de vuelta'],
   ['station',4,'Gracias por pensar en mí. ¿Y si a la ida seguimos el camino que has buscado tú y a la vuelta el que he encontrado yo?'],
   ['flowers',3,'Sí, todavía me gustan. Me alegra que lo hayas recordado. Hoy quería elegir también unas flores lilas'],
   ['flowers',5,'La próxima vez te preguntaré primero qué flores te gustan ese día'],
   ['notes',3,'Sí. Me imagino a alguien que no conoce el barrio usando el folleto para encontrar la ruta de paseo'],
   ['notes',5,'¿Leerías también mi próximo borrador? Me gustaría que me dijeras qué hay que cambiar y qué partes se entienden bien']
  ];
  for(const [id,page,line]of lines){const b=books.find(b=>b.id===id);for(const s of [b.scenes[page],b.activities[0].scenes[page]])assert.ok(s.text.includes(line.replace(/\.$/,'')),`${id} ${page+1}: shared dialogue missing`);}
  const station=books.find(b=>b.id==='station');
  assert.doesNotMatch(station.scenes[3].text,lang==='en'?/I like (this place|it here)/:/Me gusta (este lugar|aquí)/);
  assert.match(station.scenes[0].text,lang==='en'?/since she left her job/:/desde que dejó de trabajar/);
 });
}
