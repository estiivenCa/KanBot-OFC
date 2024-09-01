import fetch from 'node-fetch';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fs from "fs";
import yts from 'yt-search';
import ytmp33 from '../lib/ytmp33.js';
import ytmp44 from '../lib/ytmp44.js';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let limit1 = 100;
let limit2 = 400;
let limit_a1 = 50;
let limit_a2 = 400;

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `*[ ℹ️ ] Hace falta el título o enlace del video de YouTube.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} Good Feeling - Flo Rida_`;

  const yt_play = await search(args.join(' '));
  
  if (!yt_play || yt_play.length === 0) {
    await m.react('❌');
    throw '*[ ℹ️ ] No se encontraron resultados para la búsqueda. Por favor, intente con otro término.*';
  }

  let additionalText = '';
  if (command === 'play5') {
    additionalText = 'audio';
  } else if (command === 'play6') {
    additionalText = 'vídeo';
  }

  const texto1 = `╭───────┈♡┈──────\n│𐇵 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${yt_play[0].title}\n│𐇵 *𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛:* ${secondString(yt_play[0].duration.seconds)}\n│𐇵 *𝐴𝑢𝑡𝑜𝑟:* ${yt_play[0].author.name}\n╰───────┈♢┈──────\n> *[ ℹ️ ] _𝐒𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 ${additionalText}. 𝐞𝐬𝐩𝐞𝐫𝐞..._`.trim();

  const externalAdReply = {
    title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
    body: '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰',
    sourceUrl: global.cn,
    thumbnail: global.logo7
  };

  try {
    conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply } }, { quoted: m });
    await m.react('🔄');  // React emoji indicating that the file is being sent

    if (command === 'play5') {
      try {
        const { status, resultados, error } = await ytmp33(yt_play[0].url);
        if (!status) throw new Error(error);

        const ttl = resultados.titulo;
        const buff_aud = await getBuffer(resultados.descargar);
        const size = getFileSizeInMB(buff_aud);

        if (size >= limit_a2) {
          await conn.sendMessage(m.chat, { text: `[ ℹ️ ] Descargue su audio en:* _${resultados.descargar}_` }, { quoted: m });
        } else if (size >= limit_a1 && size <= limit_a2) {
          await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        }
        await m.react('✅');  // React emoji indicating success
      } catch (error) {
        await m.react('❌');  // React emoji indicating error
        console.log('Fallo el 1: ' + error);
        throw '*[ ℹ️ ] Ocurrió un error al procesar el audio. Inténtelo de nuevo más tarde.*';
      }
    }

    if (command === 'play6') {
      try {
        const { status, resultados, error } = await ytmp44(yt_play[0].url);
        if (!status) throw new Error(error);

        const ttl2 = resultados.titulo;
        const buff_vid = await getBuffer(resultados.descargar);
        const size2 = getFileSizeInMB(buff_vid);

        if (size2 >= limit2) {
          await conn.sendMessage(m.chat, { text: `*[ ℹ️ ] Descargue su vídeo en:* _${resultados.descargar}_` }, { quoted: m });
        } else if (size2 >= limit1 && size2 <= limit2) {
          await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        }
        await m.react('✅');  // React emoji indicating success
      } catch (error) {
        await m.react('❌');  // React emoji indicating error
        console.log('Fallo el 2: ' + error);
        throw '*[ ℹ️ ] Ocurrió un error al procesar el vídeo. Inténtelo de nuevo más tarde.*';
      }
    }
  } catch (error) {
    await m.react('❌');  // React emoji indicating error
    throw '*[ ℹ️ ] Ocurrió un error inesperado. Inténtelo de nuevo más tarde.*';
  }
};

async function getBuffer(url) {
  try {
    const res = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function search(query) {
  const results = await yts.search(query);
  return results.videos.slice(0, 3);
}

function secondString(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function getFileSizeInMB(buffer) {
  const fileSizeInBytes = buffer.byteLength;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;
  return fileSizeInMB.toFixed(2);
}

export default handler;
