/* Keep arrow-labelled navigation in the same handwriting across dynamic screens. */
(() => {
  const update = () => document.querySelectorAll('a,button,.tale-open,.entrance-card small').forEach(element => {
    const text = element.textContent.trim();
    const arrow = /[←→↗↔]/.test(text);
    const entrance = /^(책방 입구로|책방 입구|Back to the entrance|Bookshop entrance|Volver a la entrada)$/.test(text);
    element.classList.toggle('navigation-lettering', arrow || entrance);
  });
  update();
  new MutationObserver(update).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
