const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'game.js'),'utf8');
function boot(memory=new Map(),blocked=false){
const elements=new Map(),events={},timers=[];
function el(id){if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',textContent:'',open:false,style:{setProperty(){}},classList:{add(){},remove(){}},events:{},addEventListener(n,f){this.events[n]=f;},setAttribute(){},focus(){},showModal(){this.open=true;},close(){this.open=false;}});return elements.get(id);}
const doc={getElementById:el,documentElement:{style:{setProperty(){}}},addEventListener(n,f){events[n]=f;},querySelectorAll(){return[];}};
const ctx={document:doc,window:{matchMedia:()=>({matches:true}),scrollTo(){}},localStorage:{getItem:k=>{if(blocked)throw Error('storage unavailable');return memory.get(k)||null;},setItem:(k,v)=>{if(blocked)throw Error('storage unavailable');memory.set(k,v);}},Date,console,setTimeout:f=>{timers.push(f);return timers.length;},clearTimeout(){}};
vm.runInNewContext(source,ctx);
const click=(action,extra={})=>events.click({target:{closest:()=>({dataset:{action,...extra},disabled:false})}});
const state=()=>JSON.parse(memory.get('heart-meadow-simple-v2'));
return{el,click,state,memory,flush(){while(timers.length)timers.shift()();},sow(i,seed='고마움',to='',why=''){click('plot',{slot:i});click('seed',{seed});el('recipient').value=to;el('reason').value=why;el('seed-form').events.submit({preventDefault(){}});},html:()=>el('app').innerHTML};
}
function finish(g,choice){
  g.click('episodes');
  g.click('episode',{episode:'elevator'});
  assert.match(g.html(),/나 · 같은 층 이웃/);
  assert.match(g.html(),/lift-opening shut/);
  g.click('next');
  g.click('clue',{clue:'foot'});
  assert.match(g.html(),/실내 슬리퍼/);
  g.click('dismiss');
  g.click('next');
  g.click('choose',{choice});
  assert.equal(g.state().episodes.elevator.step,3);
  assert.match(g.html(),/오른쪽 복도에서 상자를 실은 손수레/);
  if(choice==='close'){
    assert.match(g.html(),/lift-opening narrow/);
    assert.match(g.html(),/다시 열기/);
    g.click('next');
    assert.equal(g.state().episodes.elevator.step,3);
    g.click('reopen');
  }else{
    assert.match(g.html(),/lift-opening open/);
    g.click('next');
  }
  assert.equal(g.state().episodes.elevator.step,4);
  g.click('next');
  assert.match(g.html(),/엘리베이터 안의 미라와 손수레/);
  g.click('next');
}
test('three separate seed spots accept seed choices and optional recipient/reason',()=>{const g=boot();g.sow(0,'고마움','친구','함께 있어 줘서');g.sow(1,'미안함');g.sow(2,'알아봐 줌');const s=g.state();assert.equal(s.slots.filter(Boolean).length,3);assert.equal(s.slots[0].to,'친구');assert.equal(s.slots[0].why,'함께 있어 줘서');assert.deepEqual(s.slots.map(p=>p.seed),['고마움','미안함','알아봐 줌']);});
test('either button reveals Mira and awards exactly three completion hearts',()=>{for(const choice of ['open','close']){const g=boot();finish(g,choice);assert.equal(g.state().hearts,3);assert.match(g.html(),/마음에 남는 문장/);g.click('next');assert.equal(g.state().hearts,3);}});
test('selecting a sentence is saved and rewards are not duplicated on replay',()=>{let g=boot();finish(g,'close');g.click('phrase',{index:0});g.click('finish');assert.equal(g.state().notes.length,1);g=boot(g.memory);assert.match(g.state().episodes.elevator.phrase,/기다림/);g.click('episodes');assert.match(g.html(),/다시 만나기/);finish(g,'open');assert.equal(g.state().hearts,3);});
test('previous garden saves retain plants, hearts and the exact resume point in episode one',()=>{
  const memory=new Map([['heart-meadow-simple-v2',JSON.stringify({
    version:2,hearts:7,slots:[{seed:'고마움',name:'햇살',hearts:2},null,null],notes:[],
    episode:{step:3,choice:'close',done:false,rewarded:false},phrase:'기다리는 마음',sound:false
  })]]);
  const g=boot(memory);
  assert.equal(g.state().hearts,7);
  assert.equal(g.state().slots[0].name,'햇살');
  assert.equal(g.state().episodes.elevator.phrase,'기다리는 마음');
  g.click('episodes');
  assert.match(g.html(),/이어서 하기/);
  g.click('episode',{episode:'elevator'});
  assert.match(g.html(),/다시 열기/);
  g.click('episodes');
  assert.match(g.html(),/이어서 하기/);
  assert.match(g.html(),/처음부터 다시 시작하기/);
  g.click('episode',{episode:'elevator',restart:'true'});
  assert.match(g.html(),/나 · 같은 층 이웃/);
  assert.equal(g.state().episodes.elevator.step,0);
  assert.equal(g.state().episodes.elevator.choice,null);
  assert.equal(g.state().episodes.elevator.reopened,false);
  assert.equal(g.state().hearts,7);
  assert.equal(g.state().slots[0].name,'햇살');
});
test('a plant grows only with available hearts; same written note is rewarded once',()=>{const g=boot();g.sow(0,'고마움','나','천천히 해도 괜찮아');assert.equal(g.state().hearts,2);g.click('plot',{slot:0});g.click('water');g.click('water');g.click('water');assert.equal(g.state().slots[0].hearts,2);assert.equal(g.state().hearts,0);g.el('care-note').value='오늘도 잘 버텼어요.';g.click('care-note');g.el('care-note').value='오늘도 잘 버텼어요.';g.click('care-note');assert.equal(g.state().hearts,2);});
test('written text is escaped and blocked or corrupt storage does not prevent opening',()=>{const g=boot();g.sow(0,'고마움','<script>','<img src=x>');g.click('plot',{slot:0});assert.match(g.el('plant-content').innerHTML,/&lt;script&gt;/);assert.ok(!g.el('plant-content').innerHTML.includes('<img src=x>'));assert.doesNotThrow(()=>boot(new Map(),true));assert.doesNotThrow(()=>boot(new Map([['heart-meadow-simple-v2','broken']])));});
