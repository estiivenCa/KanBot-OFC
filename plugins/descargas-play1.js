import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';

const buttonsState = {};  // Variable para almacenar el estado de los botones por chat ID

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw _𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Daniel Trevor - Falling*;

  try {
    await m.react('⏳');
    const yt_play = await search(args.join(' '));
    
    const chatId = m.chat;  // Identificar el chat para gestionar el estado de los botones
    buttonsState[chatId] = buttonsState[chatId] || { audio: false, video: false };  // Estado inicial de los botones si no existe

    const texto1 = 
┏─۟─۪─۫─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪
│
├ ⚘݄𖠵⃕⁖𖥔. _*🅃𝕚𝕥𝕦𝕝𝕠*_
├» ${yt_play[0].title}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*🄿𝕦𝕓𝕝𝕚𝕔𝕒𝕕𝕠*_
├» ${yt_play[0].ago}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*🄳𝕦𝕣𝕒𝕔𝕚𝕠𝕟*_
├» ${secondString(yt_play[0].duration.seconds)}
├╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*🅅𝕚𝕤𝕥𝕒𝕤*_
├» ${MilesNumber(yt_play[0].views)}
├╌╌╌╌╌╌╌╌┄
├ ⚘݄𖠵⃕⁖𖥔. _*🄰𝕦𝕥𝕠𝕣(𝕒)*_
├» ${yt_play[0].author.name}
├╌╌╌╌╌╌╌╌┈
├ ⚘݄𖠵⃕⁖𖥔. _*🄴𝕟𝕝𝕒𝕔𝕖*_
├» ${yt_play[0].url}
╰ׁ̻۫─۪۬─۟─۪─۫─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪.trim();

    // Definir el estado de los botones basados en el estado guardado
    const audioButton = buttonsState[chatId].audio ? 'disable' : ${usedPrefix}play5 ${yt_play[0].url};
    const videoButton = buttonsState[chatId].video ? 'disable' : ${usedPrefix}play6 ${yt_play[0].url};

    await conn.sendButton(
      m.chat,
      wm,
      texto1,
      yt_play[0].thumbnail,
      [
        ['𝐌 𝐄 𝐍 𝐔 📌', ${usedPrefix}menu, 'disable'],
        ['🎧 𝗔 𝗨 𝗗 𝗜 𝗢', audioButton, 'disable'],
        ['📽 𝗩 𝗜 𝗗 𝗘 𝗢', videoButton, 'disable']
      ],
      null,
      null,
      fgif2
    );

    await m.react('✅');  // Emoji de check
  } catch (e) {
    await conn.reply(m.chat, *[ ! ] Hubo un error en el comando. Intenta más tarde.*, fkontak, m, rcanal);
    console.log(❗❗ Error en ${usedPrefix + command} ❗❗);
    console.log(e);
    handler.limit = 0;
  }
};

// Agregar lógica para desactivar botones cuando son presionados
handler.before = async (m) => {
  const chatId = m.chat;
  if (buttonsState[chatId]) {
    if (m.text.includes('🎧 𝗔 𝗨 𝗗 𝗜 𝗢')) {
      buttonsState[chatId].audio = true;
    }
    if (m.text.includes('📽 𝗩 𝗜 𝗗 𝗘 𝗢')) {
      buttonsState[chatId].video = true;
    }
  }
};

handler.command = ['play', 'play2', 'play3', 'play4'];
handler.register = true;
handler.group = true;

export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
    }
