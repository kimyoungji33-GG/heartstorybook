// A separate preview keeps the existing reading library intact.
const libraryMenuWithTales=menuList;
menuList=function(){libraryMenuWithTales();const words={ko:['내 마음이 걷는 이야기','게임 체험판 · 한국어'],en:['A Walk Through My Heart','Game preview · Korean'],es:['Un paseo por mi corazón','Juego de prueba · en coreano']}[lang]||['내 마음이 걷는 이야기','게임 체험판 · 한국어'];document.getElementById('book-menu').insertAdjacentHTML('beforeend',`<a class="menu-section menu-group-button" href="heart-walk/" style="display:block;padding:18px 12px;color:inherit;text-decoration:none">${words[0]} →<small style="display:block;font-weight:normal">${words[1]}</small></a>`);};
menuList();
