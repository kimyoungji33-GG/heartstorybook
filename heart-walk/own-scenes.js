const ownScenes={
 bakery:{name:'빵집',x:0,y:0,words:/빵집|제빵|빵을|베이커리/},
 cafe:{name:'카페',x:1,y:0,words:/카페|커피|찻잔|음료|주스/},
 dining:{name:'식당 · 식탁',x:2,y:0,words:/식당|식탁|밥|점심|저녁|음식/},
 home:{name:'집',x:0,y:1,words:/집|방에서|거실|엄마|아빠|가족/},
 park:{name:'공원 · 산책길',x:1,y:1,words:/공원|강아지|산책|운동장|공놀이/},
 school:{name:'학교 · 함께 만드는 자리',x:2,y:1,words:/학교|교실|수업|선생|그림|공책|친구|별/}
};
function suggestOwnScene(text){return Object.keys(ownScenes).find(k=>ownScenes[k].words.test(text))||'park';}
function resolveOwnScene(){const key=ownScenes[story.scene]?story.scene:suggestOwnScene(story.fact||'');const s=ownScenes[key];return {...s,key,image:'own-story-scenes.png',sprite:true,alt:s.name+'을 그린 어린이 동화풍 상상 배경. 실제 장소나 인물을 재현한 그림은 아니에요.'};}
function scenePicture(art){return art.sprite?`<div class="own-scene-picture" role="img" aria-label="${esc(art.alt)}" style="--scene-x:${art.x};--scene-y:${art.y};background-image:url('${art.image}')"></div>`:`<img src="${art.image}" alt="${esc(art.alt)}">`;}
const formBeforeScenes=form;
form=function(){formBeforeScenes();const fields=app.querySelector('.formgrid');fields.insertAdjacentHTML('beforeend',`<div class="wide"><label>이야기가 펼쳐질 곳<select name="scene"><option value="auto">내용에 맞춰 추천하기</option>${Object.entries(ownScenes).map(([k,s])=>`<option value="${k}">${s.name}</option>`).join('')}</select></label><div id="own-scene-preview" class="own-scene-preview"></div><p class="muted">준비된 동화 그림 중에서 장소에 맞춰 골라요. 입력한 이야기로 새 그림을 생성하거나 실제 사람을 재현하는 방식은 아직 아니에요.</p></div>`);const fact=app.querySelector('[name="fact"]'),select=app.querySelector('[name="scene"]');function update(){const key=ownScenes[select.value]?select.value:suggestOwnScene(fact.value),s=ownScenes[key];app.querySelector('#own-scene-preview').innerHTML=scenePicture({...s,image:'own-story-scenes.png',sprite:true,alt:s.name+' 상상 배경'})+`<span class="badge">${select.value==='auto'?'추천 배경':'선택한 배경'} · ${s.name}</span>`;}fact.addEventListener('input',update);select.addEventListener('change',update);update();};
