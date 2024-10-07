/* import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  const prohibited = ['se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o', 'ntr', 'rule34', 'rule', 'caca', 'polla', 'femjoy', 'porno', 'porn', 'gore', 'onlyfans', 'sofiaramirez01', 'kareli', 'karely','cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito', 'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'nalga', 'nalgas']
let foundProhibitedWord = prohibited.find(word => m.text.toLowerCase().includes(word));
if (foundProhibitedWord) return conn.reply(m.chat, `🚩 *No daré resultado a tu solicitud por pajin* - Palabra prohibida: ${foundProhibitedWord}`, m);
  
  if (!text) return conn.reply(m.chat, `*🚩 Uso Correcto: ${usedPrefix + command} Bart Simpson*`, m, rcanal);
  conn.reply(m.chat, '🚩 *Descargando su imagen...*', m, {
  contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
  title: packname,
  body: wm,
  previewType: 0, 
  sourceUrl: channel }}})
  m.react(done)
  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;
  conn.sendFile(m.chat, link, 'error.jpg', `*🔎 Resultado De: ${text}*\n> ${textbot}`, m, null, rcanal);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image','imagen', 'img'];
handler.group = true;
handler.register = true
export default handler;
  */

import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*🚩 Uso Correcto: ${usedPrefix + command} Bart Simpson*`, m, rcanal);
conn.reply(m.chat, '🚩 *Descargando su imagen Espere...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, 
sourceUrl: channel }}})
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', dev, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `🚩 Resultado de ${text}`, '🔎 ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ by Stiiven', null, messages, m);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador'];
handler.command = ['image','imagen', 'img'];
handler.group = true;
handler.register = true
export default handler;
