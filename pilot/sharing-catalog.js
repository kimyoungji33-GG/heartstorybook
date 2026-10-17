import {metadata} from './sharing-meta.js';
import {drafts} from './sharing-drafts.js';
const t=(ko,en,es)=>({ko,en,es});
const pause=t('“지금은 마음을 정리할 시간이 필요해요. 조금 뒤에 이야기해도 될까요?”','“I need a little time to gather my thoughts. Could we talk a little later?”','«Necesito un poco de tiempo para ordenar lo que pienso. ¿Podemos hablar un poco más tarde?»');
const later=t('“이야기는 들었어요. 내 마음은 조금 더 살펴보고, 다음에 다시 말하고 싶어요.”','“I have heard your side. I would like a little more time with my own feelings, and to talk again later.”','«He escuchado tu historia. Quiero observar un poco más lo que siento y volver a hablar después». ');
const reactions=[t('내가 어떻게 느꼈는지 말했어요. 상대의 이야기도 들어볼 시간을 두었어요.','I shared how it had felt to me and left time to hear the other person too.','Conté cómo lo había vivido y dejé tiempo para escuchar también a la otra persona.'),t('궁금했던 것을 묻고 대답을 기다렸어요.','I asked what I had been wondering and waited for a response.','Pregunté lo que me causaba curiosidad y esperé una respuesta.'),t('바로 대답하지 않고 잠시 말을 멈췄어요. 이야기를 이어갈 시간은 남겨두었어요.','I paused rather than answering immediately, leaving time to continue the conversation.','Hice una pausa en vez de responder enseguida, dejando tiempo para continuar la conversación.')];
const paused=t('잠시 생각할 시간을 두었어요. 지금 마음을 하나로 정하지 않고, 다음에 다시 꺼낼 수 있는 이야기로 남겨두었어요.','I took a little time to think, without settling my feelings right now. We left the conversation open to return to another time.','Me di un tiempo para pensar sin tener que resolver ahora lo que siento. Dejamos abierta la conversación para retomarla en otro momento.');
const combine=(a,b)=>Object.fromEntries(['ko','en','es'].map(l=>[l,a[l]&&b[l]?a[l]+'\n'+b[l]:null]));
export const sharingBooks=Object.values(metadata).map(meta=>{
 const manuscript=drafts[meta.id];if(!manuscript||manuscript.length!==meta.roles.length)throw new Error('Missing viewpoint manuscript: '+meta.id);
 const roles=meta.roles.map((person,index)=>{
  const d=manuscript[index],first=[d.honest,d.ask,pause],second=[d.reply,d.offer,later],results=[d.result,d.continuation,paused],nodes={};
  nodes.start={id:'start',type:'decision',text:d.opening,clue:{id:person.id+'-look',text:person.clue},choices:['a','b','c'].map((id,i)=>({id,label:first[i],reaction:reactions[i],next:'follow-'+id}))};
  for(const [i,a] of ['a','b','c'].entries()){
   nodes['follow-'+a]={id:'follow-'+a,type:'decision',text:d.heart,choices:['a','b','c'].map((id,j)=>({id,label:second[j],reaction:results[j],next:'end-'+a+id}))};
   for(const [j,b] of ['a','b','c'].entries())nodes['end-'+a+b]={id:'end-'+a+b,type:'ending',route:[a,b],text:combine(reactions[i],results[j])};
  }
  const heartIndex=index===0?1:index===2&&['cups','stars'].includes(meta.id)?1:0;
  return {...person,start:'start',nodes,heart:{name:meta.roles[heartIndex].name,text:d.heart}};
 });
 return {...meta,roles,original:'../book-reader.html?book='+meta.id+'&mode=read'};
});
export const getShareBook=id=>sharingBooks.find(b=>b.id===id)||sharingBooks[0];
