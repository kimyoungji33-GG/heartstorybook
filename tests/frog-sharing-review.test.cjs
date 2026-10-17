const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
test('Little Frog retains its structure and offers anger, time and an open continuation in all languages',()=>{
 const c={frogPage(){}};vm.createContext(c);const original=fs.readFileSync(path.join(root,'frog.js'),'utf8').split('const ft=')[0];vm.runInContext(original,c);vm.runInContext(fs.readFileSync(path.join(root,'frog-sharing-review.js'),'utf8'),c);const w=vm.runInContext('frogWords',c);
 assert.equal(w.pages.length,6);assert.equal(w.first.length,4);assert.equal(w.momReplies.length,4);assert.equal(w.second.length,4);assert.equal(w.endings.length,4);assert.equal(w.feelings.length,5);
 for(const rows of [w.pages,w.first,w.momReplies,w.second,w.endings,w.feelings])for(const row of rows)for(const [i,s]of row.entries()){assert.ok(s.trim());if(i>0)assert.doesNotMatch(s,/[가-힣]/);}
 assert.match(w.first[3][0],/화가 나요/);assert.match(w.second[3][0],/나중에 다시/);assert.match(w.endings[3][0],/아직 정하지/);
});
