import fetch from 'node-fetch';
import yts from 'yt-search';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import pipeline from 'stream').promises;
import fs from 'fs';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Daniel Trevor - Falling*`;

  try {
    await m.react('⏳');
    const yt_play = await search(args.join(' '));

    let downloadUrl, title, quality, size;
    if (command === 'play') {
      // Lógica para audio
      const response = await fetch(`https://api.fgmods.xyz/api/downloader/yta?url=${yt_play[0].url}&apikey=fJ6pYN8U`);
      const data = await response.json();
      if (data.status) {
        downloadUrl = data.result.dl_url;
        title = data.result.title;
        quality = data.result.quality;
        size = data.result.size;
      }
    } else if (command === 'play2') {
      // Lógica para video
      const response = await fetch(`https://api.fgmods.xyz/api/downloader/ytv?url=${yt_play[0].url}&quality=360p&apikey=fJ6pYN8U`);
      const data = await response.json();
      if (data.status) {
        downloadUrl = data.result.dl_url;
        title = data.result.title;
        quality = data.result.quality;
        size = data.result.size;
      }
    } else {
      throw new Error('Comando no reconocido.');
    }

    if (!downloadUrl) {
      await conn.reply(m.chat, `*[ ! ] No se pudo obtener el enlace. Intenta más tarde.*`, m);
      return;
    }

    // Descargar el archivo
    const filePath = `./downloads/${title}.${command === 'play' ? 'mp3' : 'mp4'}`;
    const fileStream = createWriteStream(filePath);
    const response = await fetch(downloadUrl);

    await pipeline(response.body, fileStream);

    // Enviar el archivo con información adicional
    const messageText = `*🎶 Aquí está tu ${command === 'play' ? 'audio' : 'video'}:*\n\n` +
                        `*Título:* ${title}\n` +
                        `*Calidad:* ${quality}\n` +
                        `*Tamaño:* ${size}`;
    
    await conn.sendFile(m.chat, filePath, title, messageText, m);
    
    // Eliminar el archivo después de enviarlo
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error al eliminar el archivo: ${err}`);
    });

    await m.react('✅');  // Emoji de check
  } catch (e) {
    await conn.reply(m.chat, `*[ ! ] Hubo un error en el comando. Intenta más tarde.*`, m);
    console.log(`❗❗ Error en ${usedPrefix + command} ❗❗`);
    console.log(e);
  }
};

handler.command = ['play', 'play2'];
handler.register = true;
handler.group = true;

export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}
