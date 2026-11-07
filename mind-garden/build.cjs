const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
let html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
let js=fs.readFileSync(path.join(__dirname,'game.js'),'utf8');
let css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');
for(const name of ['bookshop-garden','hallway-continuity','plant','seed-blooms','ruben-welcome','ruben-look','ruben-speak','mira','elevator-inside']){
  const png=fs.readFileSync(path.join(__dirname,'assets',name+'.png'));
  js=js.replace('assets/'+name+'.png','data:image/png;base64,'+png.toString('base64'));
}
for(const name of ['footsteps','handcart','door-open','door-close']){
  const recording=fs.readFileSync(path.join(__dirname,'assets',name+'.mp3'));
  assert.ok(recording.length>1000,'Missing audio for '+name);
  js=js.replace('assets/'+name+'.mp3','data:audio/mpeg;base64,'+recording.toString('base64'));
}
const fontLicenses=[];
for(const name of ['HiMelody','NotoSansKR']){
  const font=fs.readFileSync(path.join(__dirname,'assets',name+'.woff2'));
  css=css.replace('assets/'+name+'.woff2','data:font/woff2;base64,'+font.toString('base64'));
  fontLicenses.push(fs.readFileSync(path.join(__dirname,'assets',name+'-OFL.txt'),'utf8'));
}
html=html.replace('<head>',()=>'<head>\n<!-- Embedded font licenses\n'+fontLicenses.join('\n\n')+'\n-->');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>');
html=html.replace('<script src="game.js"></script>',()=>'<script>'+js.replaceAll('</script','<\\/script')+'</script>');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
assert.equal((html.match(/data:image\/png;base64,/g)||[]).length,9);
assert.equal((html.match(/data:audio\/mpeg;base64,/g)||[]).length,4);
assert.equal((html.match(/data:font\/woff2;base64,/g)||[]).length,2);
assert.ok(!html.includes('assets/')&&!/<script[^>]+src=|<link[^>]+stylesheet/.test(html));
assert.ok(!html.includes('들판'));
const output=path.join(__dirname,'마음정원.html');
fs.writeFileSync(output,html);
console.log('Complete standalone HTML: '+fs.statSync(output).size+' bytes. Images and fonts embedded.');
