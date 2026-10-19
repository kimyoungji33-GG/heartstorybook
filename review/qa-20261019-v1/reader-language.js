/* Select actual story content before the common reader renders. */
(()=>{const lang=window.heartLanguage();window.heartReaderLocaleReady=true;window.heartReaderLocaleIssue=null;
 if(lang==='ko'){document.body.dataset.contentLanguage='ko';return;}
 const localized=window.heartBookLocales?.[lang];
 const unavailable=reason=>{window.heartReaderLocaleReady=false;window.heartReaderLocaleIssue=reason;document.body.dataset.contentLanguage='unavailable';};
 if(!Array.isArray(localized)||!localized.length){unavailable('locale-file');return;}
 const id=new URLSearchParams(location.search).get('book')||'errand',original=visualBooks.find(b=>b.id===id);
 // Validate the requested child book, without making another book stand in for it.
 if(original){
  const translated=localized.find(b=>b.id===id),text=t=>typeof t==='string'&&t.trim().length>0&&!/[가-힣]/u.test(t);
  if(!translated){unavailable('book');return;}
  if(!Array.isArray(translated.activities)){unavailable('incomplete-book');return;}
  const sourceLists=[original.scenes,...original.activities.map(a=>a.scenes)],lists=[translated.scenes,...(translated.activities||[]).map(a=>a.scenes)];
  const complete=text(translated.title)&&text(translated.place)&&text(translated.narrator)&&lists.length===sourceLists.length&&translated.activities.every(a=>text(a.role))&&lists.every((list,v)=>Array.isArray(list)&&list.length===sourceLists[v].length&&list.every((s,p)=>s&&text(s.title)&&text(s.text)&&text(s.viewpoint)&&Array.isArray(s.clues)&&s.clues.length===sourceLists[v][p].clues.length&&s.clues.every(c=>c&&text(c.message))));
  if(!complete){unavailable('incomplete-book');return;}
 }
 visualBooks.splice(0,visualBooks.length,...JSON.parse(JSON.stringify(localized)));document.body.dataset.contentLanguage=lang;
})();
