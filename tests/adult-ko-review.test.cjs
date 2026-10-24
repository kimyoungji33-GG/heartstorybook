const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'book-reader.html'),'utf8');
const scripts=[...html.matchAll(/<script src="\.\/([^"?]+)(?:\?[^"]*)?"><\/script>/g)].map(m=>m[1]);
const dataScripts=new Set(['six-books-data.js','book-locales.js','reader-language.js','adult-preview-data.js','adult-book-locales.js','adult-character-refresh.js','new-adult-stories.js','adult-reader-data.js','open-clue-locations.js','story-refinement.js','adult-ko-review.js']);
function load(lang,review){
 const c={window:{heartLanguage:()=>lang},document:{body:{dataset:{}}},location:{search:''},URLSearchParams};vm.createContext(c);
 for(const file of scripts.filter(f=>dataScripts.has(f)&&(review||f!=='adult-ko-review.js')))vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
 return {c,books:JSON.parse(vm.runInContext('JSON.stringify(visualBooks)',c))};
}
test('reader applies Korean review after earlier edits and before rendering',()=>{
 assert.ok(scripts.indexOf('adult-ko-review.js')>scripts.indexOf('story-refinement.js'));
 assert.ok(scripts.indexOf('adult-ko-review.js')<scripts.indexOf('six-book-reader.js'));
});
test('all 48 adult Korean passages change while scene identity, art and clue locations stay intact',()=>{
 const before=load('ko',false).books,{c,books:after}=load('ko',true);
 assert.equal(c.window.heartAdultKoreanReview.scenes.length,24);
 let count=0;
 for(const [i,b]of after.entries()){
  if(b.audience!=='adult'){assert.deepEqual(b,before[i]);continue;}
  for(const [v,list]of [b.scenes,...b.activities.map(a=>a.scenes)].entries()){
   assert.equal(list.length,6);
   for(const [p,s]of list.entries()){
    const old=(v?before[i].activities[v-1].scenes:before[i].scenes)[p];
    assert.notEqual(s.text,old.text);assert.ok(s.text.length>100);count++;
    const {text,title,clues,...rest}=s,{text:oldText,title:oldTitle,clues:oldClues,...oldRest}=old;
    assert.deepEqual(rest,oldRest);
    clues.forEach((clue,j)=>{const {message,...meta}=clue,{message:oldMessage,...oldMeta}=oldClues[j];assert.deepEqual(meta,oldMeta);});
    assert.doesNotMatch(s.text,/혜진|은희|정원|마테오[은이과]/);
   }
  }
 }
 assert.equal(count,48);
});
for(const lang of ['en','es'])test(`${lang}: Korean editorial pass leaves translated books unchanged`,()=>{
 assert.deepEqual(load(lang,true).books,load(lang,false).books);
});
test('shared turning-point dialogue agrees across viewpoints',()=>{
 const books=load('ko',true).books;
 const lines=[
  ['sleeve',4,'네. 안쪽을 접는 위치를 바꾸면 이 부분을 남기고도 소매를 줄일 수 있어요.'],
  ['sleeve',5,'저는 이 바느질을 남기면서 고칠 방법을 찾고 있었어요. 먼저 말씀드릴 걸 그랬네요.'],
  ['station',3,'그런데 돌아올 때 걸을 길은 나도 같이 찾아보고 싶어.'],
  ['station',4,'그 마음은 고마워. 갈 때는 네가 찾은 길로 가고, 돌아올 때는 내가 찾은 길로 와볼까?'],
  ['flowers',3,'지금도 좋아. 네가 기억해줘서 기뻐. 오늘은 연보라 꽃도 함께 고르고 싶었어.'],
  ['flowers',5,'다음에는 먼저 물어볼게. 오늘은 어떤 꽃이 좋은지.'],
  ['notes',3,'응. 처음 온 사람이 이 책자를 보며 산책길을 찾는 모습이 잘 그려져.'],
  ['notes',5,'다음 자료도 읽어봐 줄래? 고칠 점도 말해주고, 이해하기 쉬운 부분도 알려주면 좋겠어.']
 ];
 for(const [id,page,line]of lines){const b=books.find(b=>b.id===id);for(const s of [b.scenes[page],b.activities[0].scenes[page]])assert.ok(s.text.includes(line),`${id} ${page+1}: shared dialogue missing`);}
});
test('all eight narrators speak as I outside dialogue throughout their six pages',()=>{
 const books=load('ko',true).books.filter(b=>b.audience==='adult');let count=0;
 for(const b of books)for(const [narrator,list]of [[b.narrator,b.scenes],...b.activities.map(a=>[a.role,a.scenes])]){
  for(const [page,s]of list.entries()){
   const narration=s.text.replace(/“[^”]*”|‘[^’]*’/g,'');
   assert.match(narration,/(?:^|\s)(?:나는|내가|내게|내|나를|나도|나와|나에게)(?:\s|[,.?!]|$)/,`${b.id} ${narrator} ${page+1}: first person only appears in dialogue`);
   assert.ok(!narration.includes(narrator),`${b.id} ${page+1}: narrator referred to by name`);
   assert.doesNotMatch(narration,/두 사람은/,`${b.id} ${page+1}: external narrator describes both characters`);
   count++;
  }
 }
 assert.equal(count,48);
});
test('Mateo describes his own focus rather than narrating a gesture he did not see',()=>{
 const b=load('ko',true).books.find(b=>b.id==='station'),s=b.activities[0].scenes[1];
 assert.doesNotMatch(s.text,/보지 못했|손을 내밀|손을.*거두/);
 assert.match(s.text,/내가 미리 알아둔 길/);
});
test('the tailor learns Mira’s worry from her words, and Davi’s fear remains his own interpretation',()=>{
 const books=load('ko',true).books,tailor=books.find(b=>b.id==='sleeve').activities[0].scenes[5].text;
 assert.match(tailor,/그 말을 듣고서야 나는/);
 assert.match(books.find(b=>b.id==='notes').scenes[2].text,/렌이 빼라고 한 것은 아니었지만/);
});
