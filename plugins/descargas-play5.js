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
  const datas = global;

  if (!text) throw `*[ ℹ️ ] Hace falta el título o enlace del video de YouTube.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} Good Feeling - Flo Rida_`;

  const yt_play = await search(args.join(' '));
  
  if (!yt_play || yt_play.length === 0) {
    throw '*[ ℹ️ ] No se encontraron resultados para la búsqueda. Por favor, intente con otro término.*';
  }

  let additionalText = '';
  if (command === 'play5') {
    additionalText = 'audio';
  } else if (command === 'play6') {
    additionalText = 'vídeo';
  }

  const texto1 = `╭─────┈✰𝙺𝚊𝚗𝙱𝚘𝚝✰┈──────\n│𐇵 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${yt_play[0].title}\n│𐇵 *𝐷𝑢𝑟𝑎𝑐𝑖𝑜𝑛:* ${secondString(yt_play[0].duration.seconds)}\n│𐇵 *𝐴𝑢𝑡𝑜𝑟:* ${yt_play[0].author.name}\n╰─────┈✰𝙺𝚊𝚗𝙱𝚘𝚝✰┈──────\n> *🚀 _𝐒𝐞 𝐞𝐬𝐭𝐚́ 𝐞𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 ${additionalText}. 𝐞𝐬𝐩𝐞𝐫𝐞..._`.trim();

  const externalAdReply = {
    title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ',
    body: '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰',
    sourceUrl: global.channel,
    thumbnail: global.logo7
  };

  conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply } }, { quoted: m });

  if (command === 'play5') {
    try {
      const { status, resultados, error } = await ytmp33(yt_play[0].url);
      if (!status) throw new Error(error);

      const ttl = resultados.titulo;
      const buff_aud = await getBuffer(resultados.descargar);
      const fileSizeInBytes = buff_aud.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const size = fileSizeInMB.toFixed(2);

      if (size >= limit_a2) {
        await conn.sendMessage(m.chat, { text: `[ ℹ️ ] Descargue su audio en:* _${resultados.descargar}_` }, { quoted: m });
        return;
      }
      if (size >= limit_a1 && size <= limit_a2) {
        await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
        return;
      }
    } catch (error) {
      console.log('Fallo el 1: ' + error)
      try {
        const audio = `${global.MyApiRestBaseUrl}/api/v1/ytmp3?url=${yt_play[0].url}&apikey=${global.MyApiRestApikey}`;
        const ttl = await yt_play[0].title;
        const buff_aud = await getBuffer(audio);
        const fileSizeInBytes = buff_aud.byteLength;
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
        const size = fileSizeInMB.toFixed(2);

        if (size >= limit_a2) {
          await conn.sendMessage(m.chat, { text: `[ ℹ️ ] Descargue su audio en:* _${audio}_` }, { quoted: m });
          return;
        }
        if (size >= limit_a1 && size <= limit_a2) {
          await conn.sendMessage(m.chat, { document: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
          return;
        } else {
          await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, { quoted: m });
          return;
        }
      } catch {
        // Añadiendo la nueva API en caso de fallo
        try {
          const audioFallback = `https://api.fgmods.xyz/api/downloader/yta?url=${yt_play[0].url}&apikey=fJ6pYN8U`;
          const buff_aud = await getBuffer(audioFallback);
          await conn.sendMessage(m.chat, { audio: buff_aud, mimetype: 'audio/mpeg', fileName: yt_play[0].title + `.mp3` }, { quoted: m });
        } catch (error) {
          throw '*[ ℹ️ ] Ocurrió un error. Por favor, inténtelo de nuevo más tarde.*';
        }
      }
    }
  }

  if (command === 'play6') {
    try {
      const { status, resultados, error } = await ytmp44(yt_play[0].url);
      if (!status) throw new Error(error);

      const ttl2 = resultados.titulo;
      const buff_vid = await getBuffer(resultados.descargar);
      const fileSizeInBytes2 = buff_vid.byteLength;
      const fileSizeInKB2 = fileSizeInBytes2 / 1024;
      const fileSizeInMB2 = fileSizeInKB2 / 1024;
      const size2 = fileSizeInMB2.toFixed(2);

      if (size2 >= limit2) {
        await conn.sendMessage(m.chat, { text: `*[ ℹ️ ] Descargue su vídeo en:* _${resultados.descargar}_` }, { quoted: m });
        return;
      }
      if (size2 >= limit1 && size2 <= limit2) {
        await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      } else {
        await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
        return;
      }
    } catch (error) {
      console.log('Fallo el 1: ' + error);
      try {
        const video = `${global.MyApiRestBaseUrl}/api/v1/ytmp4?url=${yt_play[0].url}&apikey=${global.MyApiRestApikey}`;
        const ttl2 = await yt_play[0].title;
        const buff_vid = await getBuffer(video);
        const fileSizeInBytes2 = buff_vid.byteLength;
        const fileSizeInKB2 = fileSizeInBytes2 / 1024;
        const fileSizeInMB2 = fileSizeInKB2 / 1024;
        const size2 = fileSizeInMB2.toFixed(2);

        if (size2 >= limit2) {
          await conn.sendMessage(m.chat, { text: `*[ ℹ️ ] Descargue su vídeo en:* _${video}_` }, { quoted: m });
          return;
        }
        if (size2 >= limit1 && size2 <= limit2) {
          await conn.sendMessage(m.chat, { document: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
          return;
        } else {
          await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: ttl2 + `.mp4` }, { quoted: m });
          return;
        }
      } catch {
        // Añadiendo la nueva API en caso de fallo
        try {
          const videoFallback = `https://api.fgmods.xyz/api/downloader/ytv?url=${yt_play[0].url}&apikey=fJ6pYN8U`;
          const buff_vid = await getBuffer(videoFallback);
          await conn.sendMessage(m.chat, { video: buff_vid, mimetype: 'video/mp4', fileName: yt_play[0].title + `.mp4` }, { quoted: m });
        } catch (error) {
          throw '*[ ℹ️ ] Ocurrió un error. Por favor, inténtelo de nuevo más tarde.*';
        }
      }
    }
  }
};

handler.help = ['play5', 'play6'];
handler.tags = ['downloader'];
handler.command = /^play5|play6$/i;
handler.limit = 3;

export default handler;

const search = async (query) => {
  const data = await yts.search(query);
  return data.videos;
};

const secondString = (seconds) => {
  const pad = (s) => {
    return (s < 10 ? '0' : '') + s;
  };
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);
  return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
};

const getBuffer = async (url) => {
  const res = await fetch(url);
  return res.buffer();
};
