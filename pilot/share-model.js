import {getShareBook} from './sharing-catalog.js';
import {restore,serialize,choose,walk} from './engine.js';
export function restoreShare(search){
 const p=new URLSearchParams(search),book=getShareBook(p.get('book')),s=restore(book,search),count=s.choices.length;
 const allowed=count===0?['feel','talk']:count===1?['listen','reply']:['end'];
 const stage=allowed.includes(p.get('stage'))?p.get('stage'):allowed[0];
 const feelings=[...new Set(p.getAll('feel').filter(n=>/^[0-6]$/.test(n)))].map(Number);
 return {...s,stage,feelings,revealed:count>0&&(p.get('revealed')==='1'||stage==='reply'||stage==='end'),clue:p.get('clue')==='1'};
}
export function serializeShare(s){const p=new URLSearchParams(serialize(getShareBook(s.book),s));p.set('stage',s.stage);p.set('v','published130');s.feelings.forEach(n=>p.append('feel',n));if(s.revealed)p.set('revealed','1');if(s.clue)p.set('clue','1');return '?'+p;}
export function nextShare(s){
 if(s.stage==='feel')return {...s,stage:'talk'};
 if(s.stage==='listen'&&s.revealed)return {...s,stage:'reply'};
 return s;
}
export function chooseShare(s,id){
 if(!['talk','reply'].includes(s.stage))throw new Error('A phrase can only be chosen while sharing.');
 return {...choose(getShareBook(s.book),s,id),stage:s.stage==='talk'?'listen':'end',revealed:s.stage==='reply',clue:false};
}
export function backShare(s){
 if(s.stage==='feel')return s;
 if(s.stage==='talk')return {...s,stage:'feel'};
 if(s.stage==='reply')return {...s,stage:'listen'};
 const choices=s.choices.slice(0,-1),scene=walk(getShareBook(s.book),s.role,choices).node.id;
 return {...s,choices,scene,stage:s.stage==='end'?'reply':'talk',revealed:s.stage==='end',clue:false};
}
