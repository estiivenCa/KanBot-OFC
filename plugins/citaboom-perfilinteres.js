/* //Codígo creado por David Chian wa.me/5351524614

const _0x1d26a0=_0xcd76;(function(_0x429646,_0x5d50fd){const _0x6f06db=_0xcd76,_0x44c16c=_0x429646();while(!![]){try{const _0x23e591=-parseInt(_0x6f06db(0x75))/0x1*(parseInt(_0x6f06db(0x7c))/0x2)+-parseInt(_0x6f06db(0x89))/0x3+parseInt(_0x6f06db(0x72))/0x4*(-parseInt(_0x6f06db(0x7d))/0x5)+parseInt(_0x6f06db(0x79))/0x6*(parseInt(_0x6f06db(0x87))/0x7)+-parseInt(_0x6f06db(0x6c))/0x8+-parseInt(_0x6f06db(0x8f))/0x9+parseInt(_0x6f06db(0x6f))/0xa*(parseInt(_0x6f06db(0x90))/0xb);if(_0x23e591===_0x5d50fd)break;else _0x44c16c['push'](_0x44c16c['shift']());}catch(_0x2c45cc){_0x44c16c['push'](_0x44c16c['shift']());}}}(_0x270f,0xbddcf));import _0x2f4f9d from'fs';const profilesPath=_0x1d26a0(0x70);import _0x37209d from'dotenv';_0x37209d[_0x1d26a0(0x7b)]();function _0xcd76(_0x28ef5c,_0x4450d2){const _0x270f0b=_0x270f();return _0xcd76=function(_0xcd7693,_0x4bd06a){_0xcd7693=_0xcd7693-0x6b;let _0x23d7ec=_0x270f0b[_0xcd7693];return _0x23d7ec;},_0xcd76(_0x28ef5c,_0x4450d2);}const SECRET_KEY=process['env']['SECRET_KEY'],loadProfiles=()=>{const _0x389b97=_0x1d26a0;try{let _0x3cac28=_0x2f4f9d['readFileSync'](profilesPath,_0x389b97(0x71));return JSON[_0x389b97(0x85)](_0x3cac28);}catch(_0x2da0df){return console['error'](_0x389b97(0x7f),_0x2da0df),[];}},saveProfiles=_0x2abe0a=>{const _0x1de532=_0x1d26a0;try{_0x2f4f9d['writeFileSync'](profilesPath,JSON[_0x1de532(0x84)](_0x2abe0a,null,0x2));}catch(_0x5368df){console[_0x1de532(0x8c)]('Error\x20al\x20guardar\x20perfiles:',_0x5368df);}},verifi=()=>{const _0x4dfa01=_0x1d26a0;try{const _0x139a88=JSON[_0x4dfa01(0x85)](_0x2f4f9d[_0x4dfa01(0x8d)](_0x4dfa01(0x74),_0x4dfa01(0x71)));if(_0x139a88['name']!==_0x4dfa01(0x7e))return![];if(_0x139a88[_0x4dfa01(0x6d)]['url']!=='git+https://github.com/David-Chian/Megumin-Bot-MD.git')return![];if(SECRET_KEY!==_0x4dfa01(0x83))return![];return!![];}catch(_0x465da4){return console['error'](_0x4dfa01(0x80),_0x465da4),![];}};let handler=async(_0x1fc72d,{conn:_0x2c04fd,args:_0x599baf})=>{const _0x4a800c=_0x1d26a0;if(!verifi()){await _0x2c04fd[_0x4a800c(0x86)](_0x1fc72d[_0x4a800c(0x82)],'Este\x20comando\x20solo\x20está\x20disponible\x20para\x20Megumin\x20Bot.\x0a\x20🔥\x20https://github.com/David-Chian/Megumin-Bot-MD',_0x1fc72d,rcanal);return;}let _0x129662=loadProfiles(),_0xce95ba=_0x129662[_0x4a800c(0x6b)](_0x4a7174=>_0x4a7174['id']===_0x1fc72d['sender']),_0x3bca5f=_0x129662['find'](_0x937038=>_0x937038['id']===_0x599baf[0x0]);if(!_0xce95ba||!_0x3bca5f){await _0x2c04fd['reply'](_0x1fc72d[_0x4a800c(0x82)],_0x4a800c(0x8e),_0x1fc72d);return;}_0xce95ba[_0x4a800c(0x77)]=_0xce95ba[_0x4a800c(0x77)]||[],_0x3bca5f[_0x4a800c(0x77)]=_0x3bca5f[_0x4a800c(0x77)]||[];if(!_0xce95ba['likes']['includes'](_0x3bca5f['id']))_0xce95ba[_0x4a800c(0x77)][_0x4a800c(0x76)](_0x3bca5f['id']);saveProfiles(_0x129662);try{await _0x2c04fd['sendButton'](_0x3bca5f['id'],_0xce95ba[_0x4a800c(0x8a)]+_0x4a800c(0x7a),'𝐼𝑛𝑡𝑒𝑟𝑒𝑠\x20𝑒𝑛\x20𝑡𝑢\x20𝑝𝑒𝑟𝑓𝑖𝑙',null,[[_0x4a800c(0x73),_0x4a800c(0x6e)+_0xce95ba['id']]],_0x1fc72d);}catch(_0x1c5755){console[_0x4a800c(0x8c)]('Error\x20al\x20enviar\x20el\x20mensaje:',_0x1c5755),await _0x2c04fd[_0x4a800c(0x86)](_0x1fc72d[_0x4a800c(0x82)],_0x4a800c(0x8b)+_0x1c5755[_0x4a800c(0x81)],_0x1fc72d);return;}};function _0x270f(){const _0x4135bd=['9014CFsvBs','push','likes','command','1670430tBCBYW','\x20𝒆𝒔𝒕𝒂\x20𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒂𝒅𝒐\x20𝒆𝒏\x20𝒕𝒊.\x20¿𝑻𝒆\x20𝒈𝒖𝒔𝒕𝒂𝒓𝒊𝒂\x20𝒗𝒆𝒓\x20𝒔𝒖\x20𝒑𝒆𝒓𝒇𝒊𝒍?\x0a𝑺𝒊\x20𝒏𝒐\x20𝒆𝒔𝒕𝒂𝒔\x20𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒂𝒅𝒐/𝒂\x20𝒔𝒐𝒍𝒐\x20𝒊𝒈𝒏𝒐𝒓𝒂\x20𝒆𝒔𝒕𝒆\x20𝒎𝒆𝒏𝒔𝒂𝒋𝒆.','config','186gEHSgh','5JBJxCy','Megumin-Bot-MD','Error\x20al\x20cargar\x20perfiles:','Error\x20al\x20leer\x20package.json:','message','chat','49rof384foerAlkkO4KF4Tdfoflw','stringify','parse','reply','21adiFGC','register','2697141SBPLcn','nombre','❌️\x20*OCURRIÓ\x20UN\x20ERROR:*\x20','error','readFileSync','Ha\x20ocurrido\x20un\x20error\x20al\x20procesar\x20tu\x20solicitud.','6217272fFlGQC','55WLeUFL','find','1354584dUtVHk','repository','/mostrarperfil\x20','7810730zkiNNW','./citaperfiles.json','utf-8','5461684PUyaxs','Mostrar\x20Perfil','./package.json'];_0x270f=function(){return _0x4135bd;};return _0x270f();}handler[_0x1d26a0(0x88)]=!![],handler['private']=!![],handler[_0x1d26a0(0x78)]=/^perfilinteres$/i;export default handler; */
