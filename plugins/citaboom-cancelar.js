/* //Codígo creado por David Chian wa.me/5351524614

const _0x2948ac=_0x3495;(function(_0x338584,_0x31cebf){const _0x8aa901=_0x3495,_0x264ed2=_0x338584();while(!![]){try{const _0x93cfe3=-parseInt(_0x8aa901(0xf0))/0x1+-parseInt(_0x8aa901(0xf6))/0x2+parseInt(_0x8aa901(0xff))/0x3*(parseInt(_0x8aa901(0x103))/0x4)+parseInt(_0x8aa901(0xeb))/0x5+-parseInt(_0x8aa901(0xf1))/0x6+-parseInt(_0x8aa901(0xfb))/0x7+parseInt(_0x8aa901(0xfc))/0x8;if(_0x93cfe3===_0x31cebf)break;else _0x264ed2['push'](_0x264ed2['shift']());}catch(_0x4b6858){_0x264ed2['push'](_0x264ed2['shift']());}}}(_0x1a8f,0x7de06));import _0x1d33a0 from'fs';const profilesPath=_0x2948ac(0xf8);function _0x1a8f(){const _0x3c4400=['config','findIndex','name','command','splice','49rof384foerAlkkO4KF4Tdfoflw','tags','Este\x20comando\x20solo\x20está\x20disponible\x20para\x20Megumin\x20Bot.\x0a\x20🔥\x20https://github.com/David-Chian/Megumin-Bot-MD','writeFileSync','Error\x20al\x20leer\x20package.json:','Error\x20al\x20cargar\x20perfiles:','3913700wOWGEx','url','chat','SECRET_KEY','cancelarperfil','414339BUXqIi','1972806WjUGdZ','𝑻𝒖\x20𝒑𝒆𝒓𝒇𝒊𝒍\x20𝒉𝒂\x20𝒔𝒊𝒅𝒐\x20𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐.','readFileSync','private','utf-8','983694wKcvoA','𝑵𝒐\x20𝒕𝒊𝒆𝒏𝒆𝒔\x20𝒖𝒏\x20𝒑𝒆𝒓𝒇𝒊𝒍\x20𝒆𝒏\x20𝒄𝒐𝒏𝒇𝒊𝒈𝒖𝒓𝒂𝒄𝒊ó𝒏.','./citaperfiles.json','error','register','2534413uUGGlr','6871520PjDYYi','reply','help','353217PWAOlU','git+https://github.com/David-Chian/Megumin-Bot-MD.git','parse','stringify','16SyzbKW'];_0x1a8f=function(){return _0x3c4400;};return _0x1a8f();}function _0x3495(_0x37aa68,_0x47262c){const _0x1a8fdd=_0x1a8f();return _0x3495=function(_0x349513,_0x6fdc6){_0x349513=_0x349513-0xe3;let _0x10e1ac=_0x1a8fdd[_0x349513];return _0x10e1ac;},_0x3495(_0x37aa68,_0x47262c);}import _0xde944f from'dotenv';_0xde944f[_0x2948ac(0x104)]();const SECRET_KEY=process['env'][_0x2948ac(0xee)],loadProfiles=()=>{const _0x2d59c2=_0x2948ac;try{let _0x378284=_0x1d33a0[_0x2d59c2(0xf3)](profilesPath,_0x2d59c2(0xf5));return JSON[_0x2d59c2(0x101)](_0x378284);}catch(_0x43a02e){return console['error'](_0x2d59c2(0xea),_0x43a02e),[];}},saveProfiles=_0x5041c3=>{const _0x5ad63c=_0x2948ac;try{_0x1d33a0[_0x5ad63c(0xe8)](profilesPath,JSON[_0x5ad63c(0x102)](_0x5041c3,null,0x2));}catch(_0x508beb){console[_0x5ad63c(0xf9)]('Error\x20al\x20guardar\x20perfiles:',_0x508beb);}},verifi=()=>{const _0x4c786b=_0x2948ac;try{const _0x5dd11d=JSON[_0x4c786b(0x101)](_0x1d33a0[_0x4c786b(0xf3)]('./package.json',_0x4c786b(0xf5)));if(_0x5dd11d[_0x4c786b(0x106)]!=='Megumin-Bot-MD')return![];if(_0x5dd11d['repository'][_0x4c786b(0xec)]!==_0x4c786b(0x100))return![];if(SECRET_KEY!==_0x4c786b(0xe5))return![];return!![];}catch(_0xa13f68){return console['error'](_0x4c786b(0xe9),_0xa13f68),![];}};let handler=async(_0x14b78d,{conn:_0xdbf6cf})=>{const _0x40a08a=_0x2948ac;if(!verifi()){await _0xdbf6cf[_0x40a08a(0xfd)](_0x14b78d[_0x40a08a(0xed)],_0x40a08a(0xe7),_0x14b78d,rcanal);return;}let _0x1ea182=loadProfiles(),_0x31b5c2=_0x1ea182[_0x40a08a(0x105)](_0x4e5b5a=>_0x4e5b5a['id']===_0x14b78d['sender']);if(_0x31b5c2===-0x1){await _0xdbf6cf[_0x40a08a(0xfd)](_0x14b78d['chat'],_0x40a08a(0xf7),_0x14b78d,rcanal);return;}_0x1ea182[_0x40a08a(0xe4)](_0x31b5c2,0x1),saveProfiles(_0x1ea182),await _0xdbf6cf[_0x40a08a(0xfd)](_0x14b78d[_0x40a08a(0xed)],_0x40a08a(0xf2),_0x14b78d,rcanal);};handler[_0x2948ac(0xfa)]=!![],handler[_0x2948ac(0xf4)]=!![],handler[_0x2948ac(0xe6)]=['citaboom'],handler[_0x2948ac(0xfe)]=[_0x2948ac(0xef)],handler[_0x2948ac(0xe3)]=/^cancelarperfil$/i;export default handler; */
