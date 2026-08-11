const hex = h => { const n = parseInt(h.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255] }
const lin = c => { c/=255; return c<=0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4 }
const L = h => { const [r,g,b]=hex(h); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b) }
const ratio = (a,b) => { const l1=L(a),l2=L(b); const [hi,lo]=l1>l2?[l1,l2]:[l2,l1]; return (hi+0.05)/(lo+0.05) }
const bone='#f7f4ee', linen='#efe9df', mist='#dfe6e0', parch='#e6ded1', forest='#1b2a24'
const onLight = ['#46604f','#54695b','#4f6357','#5a6f61','#425a4a','#3d5446']
console.log('— candidates for muted text on light —')
for (const c of onLight) console.log(c, 'bone', ratio(c,bone).toFixed(2), 'linen', ratio(c,linen).toFixed(2), 'mist', ratio(c,mist).toFixed(2), 'parchment', ratio(c,parch).toFixed(2))
console.log('\n— clay candidates on light —')
for (const c of ['#b0704f','#96593c','#8a5134','#8f5637','#7f4b30']) console.log(c, 'bone', ratio(c,bone).toFixed(2), 'linen', ratio(c,linen).toFixed(2), 'parchment', ratio(c,parch).toFixed(2), 'mist', ratio(c,mist).toFixed(2))
console.log('\n— on forest —')
for (const c of ['#7d9686','#a7bcae','#c8d6cc','#9db3a5','#93aa9c']) console.log(c, 'forest', ratio(c,forest).toFixed(2))
console.log('\n— existing body —')
console.log('moss on bone', ratio('#46604f',bone).toFixed(2), '| forest on bone', ratio('#1b2a24',bone).toFixed(2))
