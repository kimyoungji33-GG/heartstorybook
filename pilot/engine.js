export const languages=['ko','en','es'];
export function localized(value,lang){const s=value?.[lang];return typeof s==='string'&&s.trim()?s:null;}
export function walk(book,roleId,choices=[]){
  const role=book.roles.find(r=>r.id===roleId);
  if(!role)throw new Error('Unknown role');
  let node=role.nodes[role.start]; const trail=[];
  for(const id of choices){
    if(node.type!=='decision')throw new Error('Choice after ending');
    const edge=node.choices.find(c=>c.id===id);
    if(!edge||!role.nodes[edge.next])throw new Error('Invalid choice or destination');
    trail.push({node,edge}); node=role.nodes[edge.next];
  }
  return {role,node,trail};
}
export function restore(book,search){
  const p=new URLSearchParams(search); const issues=[];
  if(p.has('book')&&p.get('book')!==book.id)issues.push('book');
  const role=book.roles.some(r=>r.id===p.get('role'))?p.get('role'):book.roles[0].id;
  if(p.has('role')&&p.get('role')!==role)issues.push('role');
  const lang=languages.includes(p.get('lang'))?p.get('lang'):'ko';
  if(p.has('lang')&&p.get('lang')!==lang)issues.push('lang');
  let choices=p.getAll('choice');
  try{walk(book,role,choices);}catch{choices=[];issues.push('choices');}
  const scene=walk(book,role,choices).node.id;
  if(p.has('scene')&&p.get('scene')!==scene)issues.push('scene');
  return {book:book.id,role,lang,choices,scene,issues};
}
export function serialize(book,state){
  const scene=walk(book,state.role,state.choices).node.id;
  if(!languages.includes(state.lang)||state.book!==book.id)throw new Error('Invalid state');
  const p=new URLSearchParams({book:book.id,role:state.role,scene,lang:state.lang});
  state.choices.forEach(c=>p.append('choice',c));return `?${p}`;
}
export function choose(book,state,id){
  const choices=[...state.choices,id];const {node}=walk(book,state.role,choices);
  return {...state,choices,scene:node.id,issues:[]};
}
export function enumerate(book){
  const paths=[];
  for(const role of book.roles){
    const visit=(id,choices,ancestors)=>{
      if(ancestors.has(id))throw new Error(`Cycle: ${role.id}/${id}`);
      const node=role.nodes[id];if(!node)throw new Error(`Missing node: ${id}`);
      if(node.type==='ending'){paths.push({role:role.id,choices,ending:id});return;}
      if(node.type!=='decision'||node.choices.length!==2)throw new Error(`Not binary: ${id}`);
      for(const edge of node.choices)visit(edge.next,[...choices,edge.id],new Set([...ancestors,id]));
    };visit(role.start,[],new Set());
  }return paths;
}
