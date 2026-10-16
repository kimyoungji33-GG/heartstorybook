/* Select actual story content before the common reader renders. */
(()=>{const lang=window.heartLanguage();window.heartReaderLocaleReady=true;
 if(lang==='ko'){document.body.dataset.contentLanguage='ko';return;}
 const localized=window.heartBookLocales?.[lang];
 if(!Array.isArray(localized)||!localized.length){window.heartReaderLocaleReady=false;document.body.dataset.contentLanguage='unavailable';return;}
 visualBooks.splice(0,visualBooks.length,...JSON.parse(JSON.stringify(localized)));document.body.dataset.contentLanguage=lang;
})();
