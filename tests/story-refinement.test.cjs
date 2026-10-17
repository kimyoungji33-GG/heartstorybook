const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const lang of ['ko','en','es'])test(`${lang}: refined manuscripts keep every scene, viewpoint, image and open clue`,()=>{
 const c={window:{heartLanguage:()=>lang},document:{body:{dataset:{}}},URLSearchParams,location:{search:''}};vm.createContext(c);
 for(const f of ['six-books-data.js','book-locales.js','reader-language.js','adult-preview-data.js','adult-book-locales.js','adult-character-refresh.js','new-adult-stories.js','adult-reader-data.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
 const before=JSON.parse(vm.runInContext('JSON.stringify(visualBooks)',c));
 for(const f of ['open-clue-locations.js','story-refinement.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
 const after=JSON.parse(vm.runInContext('JSON.stringify(visualBooks)',c));let scenes=0;
 assert.equal(after.length,10);assert.equal(c.window.heartStoryReview.revisedScenes.length,14);assert.equal(c.window.heartStoryReview.clueChanges,156);
 for(const [i,b] of after.entries())for(const [v,list] of [b.scenes,...b.activities.map(a=>a.scenes)].entries()){
  assert.equal(list.length,6);for(const [p,s]of list.entries()){scenes++;assert.ok(s.text.trim());const old=(v?before[i].activities[v-1].scenes:before[i].scenes)[p];assert.equal(s.atlas,old.atlas);assert.deepEqual(s.crop,old.crop);assert.deepEqual(s.clues.map(c=>[c.x,c.y]),old.clues.map(c=>[c.x,c.y]));if(lang!=='ko')assert.ok(!/[가-힣]/.test(s.text));}
 }
 assert.equal(scenes,156);
 for(const [id,v,p,i]of c.window.heartOpenClueLocations){const b=after.find(b=>b.id===id),s=(v?b.activities[v-1].scenes:b.scenes)[p];assert.match(s.clues[i].reflection,lang==='ko'?/나는/:lang==='en'?/did I/:/interpreté/);}
 if(lang==='ko'){const b=after.find(b=>b.id==='station');for(const list of [b.scenes,...b.activities.map(a=>a.scenes)])for(const s of list)assert.doesNotMatch(s.text,/마테오[은이과]/);}
});
