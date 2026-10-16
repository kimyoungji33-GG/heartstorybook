/* Add adult books after the child-language dataset has been selected. */
(()=>{'use strict';
const lang=window.heartLanguage?.()||'ko';
window.adultVisualBooks=window.adultPreviewBooks.map(original=>{
 const b=JSON.parse(JSON.stringify(original)),translation=window.adultBookLocales?.[lang]?.[b.id];
 if(lang!=='ko'&&translation){b.title=translation.title;b.place=translation.place;b.people=translation.people;b.description=translation.description;for(let i=0;i<6;i++){const t=translation.scenes[i],s=b.scenes[i];s.title=t.title;s.text=t.text;s.other=t.other;s.clues.forEach((c,j)=>c.text=t.clues[j]);s.otherClues.forEach((c,j)=>c.text=t.otherClues[j]);}}
 if(lang!=='ko'&&!translation)window.heartReaderLocaleReady=false;
 const scene=(s,i,other)=>{const image=other?s.otherImage:s.image;const crop=(other?b.otherCrops:b.crops)?.[i]||{x:i%2*50,y:Math.floor(i/2)*100/3,w:50,h:100/3};return {title:s.title,text:other?s.other:s.text,viewpoint:b.people[other?1:0],panel:i,atlas:other?b.otherAtlas:b.atlas,...(image?{image}:{crop}),aspect:image?1.5:crop.w/crop.h,clues:(other?s.otherClues:s.clues).map(c=>({x:c.x,y:c.y,kind:({ko:'마음 열쇠',en:'Heart key',es:'Llave del corazón'})[lang],message:c.text}))};};
 const otherScenes=b.scenes.map((s,i)=>scene(s,i,true));
 return {id:b.id,audience:'adult',shelfHref:'./index.html#adults',title:b.title,place:b.place,narrator:b.people[0],atlas:b.atlas,atlasCols:2,atlasRows:3,characters:b.people.map(name=>({name})),scenes:b.scenes.map((s,i)=>scene(s,i,false)),activities:[{role:b.people[1],atlas:otherScenes[0].atlas,crop:otherScenes[0].crop,panel:0,aspect:otherScenes[0].aspect,scenes:otherScenes}]};
});visualBooks.push(...window.adultVisualBooks);
})();
