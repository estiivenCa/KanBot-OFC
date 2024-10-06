import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

var handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝙈𝘼𝙎 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀*';
  
  let youtubeLink = '';
  
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find(item => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙋𝘼𝙍𝘼 𝙀𝙎𝙀 𝙉𝙐𝙈𝙀𝙍𝙊 𝙄𝙉𝙂𝙍𝙀𝙎𝘼 𝙐𝙉 𝙉𝙐𝙈𝙀𝙍𝙊 𝘿𝙀𝙇 1 𝘼𝙇 ${matchingItem.urls.length}*`;
          }
        } else {
          throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙇𝘼 𝙈𝘼𝙉𝙀𝙍𝘼 (${usedPrefix + command} <numero>), 𝙍𝙀𝘼𝙇𝙄𝙕𝘼 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 ${usedPrefix}playlist <texto>*`;
        }
      } else {
        throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙇𝘼 𝙈𝘼𝙉𝙀𝙍𝘼 (${usedPrefix + command} <numero>), 𝙍𝙀𝘼𝙇𝙄𝙕𝘼 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 ${usedPrefix}playlist <texto>*`;
      }
    }
  }
  await conn.reply(m.chat, `*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝘼𝙐𝘿𝙄𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*`, m, rcanal)
 // await conn.sendMessage(m.chat, { text: `*🚀 D E S C A R G A N D O*` }, { quoted: m });
  
  try {
    let q = '128kbps';
    let v = youtubeLink;
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size = await yt.audio[q].fileSizeH;
    await conn.sendFile(m.chat, dl_url, `${ttl}.mp3`, null, m, false, { mimetype: 'audio/mp4' });
  } catch (e) {
    try {
      let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${youtubeLink}`);
      let lolh = await lolhuman.json();
      let n = lolh.result.title || 'error';
      await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (e) {
      try {
        let searchh = await yts(youtubeLink);
        let __res = searchh.all.map(v => v).filter(v => v.type == "video");
        let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
        let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
        await conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: `${__res[0].title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
      } catch (e) {
        await conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙀𝙍𝙍𝙊𝙍, 𝙉𝙊 𝙎𝙀 𝙋𝙐𝘿𝙊 𝙀𝙉𝙑𝙄𝘼𝙍 𝙀𝙇 𝘼𝙐𝘿𝙄𝙊. 𝙄𝙉𝙏𝙀𝙉𝙏𝙀 𝘾𝙊𝙉 𝙊𝙏𝙍𝘼 𝙊𝙋𝘾𝙄𝙊́𝙉 𝘿𝙀 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼 (#play7)*', m);
      }
    }
  }
};

handler.help = ['yta'];
handler.tags = ['descargas'];
handler.command = /^audio|fgmp3|dlmp3|mp3|getaud|yt(a|mp3|mp3)$/i;
handler.group = true;
export default handler;
