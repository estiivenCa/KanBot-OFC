/* import yts from "yt-search";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return conn.reply(m.chat,"*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚝𝚎𝚡𝚝𝚘 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚢𝚘𝚞𝚝𝚞𝚋𝚎 :𝟹*", m, );
  await m.react("💙");
  let results = await yts(text);
  let res = results.all.map((v) => v).filter((v) => v.type == "video");
  if (!res.length) return conn.reply(m.chat,"𝚂𝚒𝚗 𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜, 𝙸𝚗𝚝𝚎𝚗𝚝𝚊 𝙱𝚞𝚜𝚌𝚊𝚗𝚍𝚘 𝙾𝚝𝚛𝚊 𝚌𝚘𝚜𝚊",m,)
  let txt = `*ＹｏｕＴｕｂｅ-Ｓｅａｒｃｈ ⇄ Ⅰ<    ⅠⅠ    >Ⅰ   ↻*`;
  for (let i = 0; i < (30 <= res.length ? 30 : res.length); i++) {
    txt += `\n\n`;
    txt += `	❧  *𝚃𝚒𝚝𝚞𝚕𝚘* : ${res[i].title}\n`;
    txt += `	❧  *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : ${res[i].timestamp || "×"}\n`;
    txt += `	❧  *𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘* : ${res[i].ago}\n`;
    txt += `	❧  *𝙰𝚞𝚝𝚘𝚛* : ${res[i].author.name || "×"}\n`;
    txt += `	❧  *𝚄𝚛𝚕* : ${"https://youtu.be/" + res[i].videoId}\n`;
  }
  await conn.sendFile(m.chat, res[0].image, "", txt, m, null, rcanal);
  await m.react("✅");
};
handler.help = ["ytsearch"];
handler.tags = ["search"];
handler.command = ["ytsearch", "yts"];
handler.register = true;
export default handler;
 */
/*

- Agradecimiento a la comunidad de "WSApp • Developers"
 * https://chat.whatsapp.com/FaQunmlp9BmDRk6lEEc9FJ
- Agradecimiento especial a Carlos (PT) por los codigos de interactiveMessage (botones)
- Agradecimiento a Darlyn1234 por la estructura de uso en este codigo y quoted
 * https://github.com/darlyn1234
- Adaptacion de imagen en tipo lista, codigo y funcionamiento por BrunoSobrino
 * https://github.com/BrunoSobrino

*/
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'
import yts from 'yt-search';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const datas = global;
    const device = await getDevice(m.key.id);
    
  if (!text) {return conn.reply(m.chat,"⚠️ *_Que quieres que busque en YouTube?_*", m, rcanal)};
    
  if (device !== 'desktop' || device !== 'web') {      
    
  const results = await yts(text);
  const videos = results.videos.slice(0, 20);
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  var messa = await prepareWAMessageMedia({ image: {url: randomVideo.thumbnail}}, { upload: conn.waUploadToServer })
  const interactiveMessage = {
    body: { text: `*╭┈─────⸌̗⸃》̗̀💥̖́《⸍̖⸂─────┈╮*\n*│≣ 🔥 ʀᴇsᴜʟᴛᴀᴅᴏs ᴏʙᴛᴇɴɪᴅᴏs:* ${results.videos.length}\n*│≡ 🎲 Video aleatorio:*\n*│≠ 🌹-› Title:* ${randomVideo.title}\n*│≜ 👤-› Author:* ${randomVideo.author.name}\n*│≚ 💫-› Views:* ${randomVideo.views}\n*│≋ 🌱-› Link :* ${randomVideo.url}\n*│≍ 🏞-› Imagen:* ${randomVideo.thumbnail}\n*╰┈─────⸌̗⸃》̗̀🔥̖́《⸍̖⸂─────┈╯*`.trim() },
    footer: { text: `${global.wm}`.trim() },  
      header: {
          title: `*❤️‍🔥 Yts Sᴇᴀʀᴄʜ ❤️‍🔥*\n`,
          hasMediaAttachment: true,
          imageMessage: messa.imageMessage,
      },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'OPCIONES DISPONIBLES',
            sections: videos.map((video) => ({
              title: video.title,
              rows: [
                {
                  header: video.title,
                  title: video.author.name,
                  description: 'Descargar MP3',
                  id: `${prefijo}ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: 'Descargar MP4',
                  id: `${prefijo}ytmp4 ${video.url}`
                }
              ]
            }))
          })
        }
      ],
      messageParamsJson: ''
    }
  };        
            
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: fgif2 })
      conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

  } else {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const traductor = _translate.plugins.buscador_yts;      
  const results = await yts(text);
  const tes = results.all;
  const teks = results.all.map((v) => {
    switch (v.type) {
      case 'video': return `
° *_${v.title}_*
↳ 🫐 *_Link :_* ${v.url}
↳ 🕒 *_DuraciÃ³n :_* ${v.timestamp}
↳ 📥 *_Subido :_* ${v.ago}
↳ 👁 *_Vistas :_* ${v.views}`;
    }
  }).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
  conn.sendFile(m.chat, tes[0].thumbnail, 'error.jpg', teks.trim(), m);      
  }    
};
handler.help = ['ytsearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['ytsearch','yts','searchyt','buscaryt','videosearch','audiosearch'];
handler.register = true;
handler.group = true;
export default handler;
