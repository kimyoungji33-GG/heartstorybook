import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sharingBooks} from './sharing-catalog.js';
import {walk} from './engine.js';
import {restoreShare,serializeShare,nextShare,chooseShare,backShare} from './share-model.js';
test('ten active books, 26 viewpoints; translations and artwork are present',()=>{
 assert.equal(sharingBooks.length,10);assert.equal(sharingBooks.reduce((n,b)=>n+b.roles.length,0),26);assert.ok(!sharingBooks.some(b=>b.id==='plant'));
 const check=v=>{if(!v||typeof v!=='object')return;if(Object.hasOwn(v,'ko'))for(const l of ['ko','en','es']){assert.ok(typeof v[l]==='string'&&v[l].trim(),`missing ${l}`);if(l!=='ko')assert.ok(!/[가-힣]/.test(v[l]),`Korean fallback in ${l}: ${v[l]}`);}else for(const child of Object.values(v))check(child);};
 for(const b of sharingBooks){check(b);for(const role of b.roles){assert.equal(role.art.length,6);for(const a of role.art){assert.ok(fs.existsSync(new URL(a.atlas,import.meta.url)),a.atlas);assert.ok(a.crop.w>0&&a.crop.h>0&&a.crop.x+a.crop.w<100.01&&a.crop.y+a.crop.h<100.01);}}}
});
for(const book of sharingBooks)test(`${book.id}: all viewpoint × nine paths × three languages remain open and reachable`,()=>{
 for(const role of book.roles)for(const a of ['a','b','c'])for(const b of ['a','b','c'])for(const lang of ['ko','en','es']){
  let s=restoreShare('?'+new URLSearchParams({book:book.id,role:role.id,lang}));assert.equal(s.stage,'feel');
  s={...s,feelings:[4,5]};s=nextShare(s);s=chooseShare(s,a);assert.equal(s.stage,'listen');assert.equal(nextShare(s).stage,'listen');s=nextShare({...s,revealed:true});s=chooseShare(s,b);assert.equal(s.stage,'end');
  const end=walk(book,role.id,s.choices).node;assert.equal(end.id,'end-'+a+b);assert.ok(end.text[lang].trim());
  for(const nextLang of ['ko','en','es']){const copy=restoreShare(serializeShare({...s,lang:nextLang}));assert.equal(copy.book,book.id);assert.equal(copy.role,role.id);assert.equal(copy.stage,'end');assert.deepEqual(copy.choices,[a,b]);assert.deepEqual(copy.feelings,[4,5]);assert.ok(copy.revealed);}
  const back=backShare(s);assert.equal(back.stage,'reply');assert.deepEqual(back.choices,[a]);
  if(b==='c')assert.match(end.text.ko,/다음에 다시/);
 }
});
