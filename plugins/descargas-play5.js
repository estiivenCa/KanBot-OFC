import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args.length) throw `*[ ℹ️ ] Hace falta el título o enlace del video de YouTube.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} Good Feeling - Flo Rida_`;

  const yt_play = await search(args.join(' '));

  if (!yt_play || yt_play.length === 0) {
    throw '*[ ℹ️ ] No se encontraron resultados para la búsqueda. Por favor, intente con otro término.*';
  }

  const title = yt_play[0].title;
  const videoUrl = yt_play[0].url;

  if (command === 'play5') { // Para audio
    try {
      const audioResponse = await fetch(`https://api.fgmods.xyz/api/downloader/yta?url=${videoUrl}&apikey=fJ6pYN8U`);
      const audioData = await audioResponse.json();

      if (!audioData.status) {
        throw '*[ ℹ️ ] Ocurrió un error al intentar obtener el audio.*';
      }

      const audioDownloadLink = audioData.result.dl_url;
      const audioBuffer = await getBuffer(audioDownloadLink);

      await conn.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
    } catch (error) {
      throw '*[ ℹ️ ] Ocurrió un error al intentar obtener el audio.*';
    }
  }

  if (command === 'play6') { // Para video
    try {
      const videoResponse = await fetch(`https://api.fgmods.xyz/api/downloader/ytv?url=${videoUrl}&apikey=fJ6pYN8U`);
      const videoData = await videoResponse.json();

      if (!videoData.status) {
        throw '*[ ℹ️ ] Ocurrió un error al intentar obtener el video.*';
      }

      const videoDownloadLink = videoData.result.dl_url;
      const videoBuffer = await getBuffer(videoDownloadLink);

      await conn.sendMessage(m.chat, { video: videoBuffer, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    } catch (error) {
      throw '*[ ℹ️ ] Ocurrió un error al intentar obtener el video.*';
    }
  }
};

const search = async (query) => {
  const data = await yts.search(query);
  return data.videos;
};

const getBuffer = async (url) => {
  const res = await fetch(url);
  return res.buffer();
};

handler.help = ['play5', 'play6'];
handler.tags = ['downloader'];
handler.command = /^play5|play6$/i;
handler.limit = 3;

export default handler;
