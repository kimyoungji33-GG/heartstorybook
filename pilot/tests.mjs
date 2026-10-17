import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {book} from './data.js';
import {walk,choose,restore,serialize,enumerate,localized,languages} from './engine.js';

const paths=enumerate(book);
test('three roles, four distinct endings each; every decision is binary and every node reachable',()=>{
 assert.equal(book.roles.length,3);assert.equal(new Set(book.roles.map(r=>r.id)).size,3);assert.equal(paths.length,12);
 for(const role of book.roles){
   const endings=paths.filter(p=>p.role===role.id);assert.equal(endings.length,4);assert.equal(new Set(endings.map(p=>p.ending)).size,4);
   const reached=new Set([role.start]);
   for(const p of endings){assert.equal(p.choices.length,2);const result=walk(book,role.id,p.choices);assert.equal(result.node.type,'ending');assert.deepEqual(result.node.route,p.choices);for(const {node,edge}of result.trail){reached.add(node.id);reached.add(edge.next);assert.equal(node.choices.length,2);assert.equal(new Set(node.choices.map(e=>e.id)).size,2);assert.equal(edge.clueId,node.clue.id);assert.ok(localized(edge.reaction,'ko'));assert.ok(localized(node.clue.text,'ko'));}}
   assert.deepEqual([...reached].sort(),Object.keys(role.nodes).sort());
 }
});
for(const path of paths)test(`${path.role}: ${path.choices.join(' → ')} reaches ${path.ending} in every language`,()=>{
 for(const lang of languages){
   let state=restore(book,`?book=errand&role=${path.role}&lang=${lang}`);
   for(const choice of path.choices){state=choose(book,state,choice);const loaded=restore(book,serialize(book,state));assert.deepEqual(loaded,state);
     for(const target of languages){const changed={...state,lang:target};const roundTrip=restore(book,serialize(book,changed));assert.equal(roundTrip.book,state.book);assert.equal(roundTrip.role,state.role);assert.equal(roundTrip.scene,state.scene);assert.deepEqual(roundTrip.choices,state.choices);assert.equal(roundTrip.lang,target);assert.deepEqual(roundTrip.issues,[]);}
   }
   assert.equal(state.scene,path.ending);assert.throws(()=>choose(book,state,'a'));
 }
});
test('all displayed narrative fields have three nonempty translations',()=>{
 const check=value=>{for(const lang of languages)assert.ok(localized(value,lang),`Missing ${lang}: ${JSON.stringify(value)}`);};
 check(book.title);for(const role of book.roles){check(role.name);for(const node of Object.values(role.nodes)){check(node.text);if(node.prompt)check(node.prompt);if(node.clue)check(node.clue.text);for(const edge of node.choices??[]){check(edge.label);check(edge.reaction);}}}
});
test('missing translation never silently returns Korean; selected path survives',()=>{
 const fixture=structuredClone(book);delete fixture.roles[0].nodes['follow-a'].text.es;
 const state=choose(fixture,restore(fixture,'?role=jiwoo&lang=ko'),'a');
 const loaded=restore(fixture,serialize(fixture,{...state,lang:'es'}));
 assert.equal(localized(walk(fixture,loaded.role,loaded.choices).node.text,'es'),null);
 assert.equal(localized({ko:'한국어',es:'  '},'es'),null);assert.equal(localized({ko:'한국어'},'en'),null);
 assert.deepEqual(loaded.choices,['a']);assert.equal(loaded.scene,'follow-a');
 assert.equal(restore(fixture,serialize(fixture,{...loaded,lang:'ko'})).scene,'follow-a');
});
test('invalid links are repaired with a notice; URL text cannot create arbitrary roles or paths',()=>{
 const bad=restore(book,'?book=unknown&role=<script>&lang=xx&scene=missing&choice=z');
 assert.equal(bad.role,'jiwoo');assert.equal(bad.scene,'start');assert.deepEqual(bad.choices,[]);assert.ok(bad.issues.length);
 const mismatch=restore(book,'?role=junho&scene=end-aa&choice=b');assert.equal(mismatch.scene,'follow-b');assert.ok(mismatch.issues.includes('scene'));
 const extra=restore(book,'?role=baker&choice=a&choice=b&choice=a');assert.deepEqual(extra.choices,[]);assert.ok(extra.issues.includes('choices'));
});
test('graph checker rejects dangling links and cycles',()=>{
 const dangling=structuredClone(book);dangling.roles[0].nodes.start.choices[0].next='missing';assert.throws(()=>enumerate(dangling),/Missing node/);
 const cyclic=structuredClone(book);cyclic.roles[0].nodes.start.choices[0].next='start';assert.throws(()=>enumerate(cyclic),/Cycle/);
});
test('existing files are preserved except explicitly approved adult-book revisions',()=>{
 const manifest=JSON.parse(readFileSync(new URL('./original-files.json',import.meta.url),'utf8'));
 const approved=JSON.parse(readFileSync(new URL('./approved-changes.json',import.meta.url),'utf8'));
 assert.ok(Object.keys(manifest).length>20);
 for(const [file,hash]of Object.entries(manifest)){const bytes=readFileSync(new URL(`../${file}`,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),approved[file]?.sha256??hash,`Original changed: ${file}`);}
});
