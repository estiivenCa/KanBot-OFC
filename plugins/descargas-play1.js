import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';


// ... otras importaciones y configuraciones previas

// Manejador de comandos
const handleCommand = async (command, m) => {
  try {
    let result;

    // Suponiendo que tienes una función que obtiene la URL de descarga
    if (command === 'play') {
      // Aquí llamas a la API para obtener la información del audio
      const audioResponse = await fetch(`https://api.ejemplo.com/audio/${m.query}`);
      result = await audioResponse.json();

      if (!result.status) {
        return await conn.sendMessage(m.chat, 'No se encontró el audio.');
      }

      // Crear un mensaje que incluya el título, tamaño y calidad
      const downloadUrl = result.result.dl_url;
      const fileResponse = await fetch(downloadUrl);

      if (!fileResponse.ok) throw new Error('No se pudo descargar el archivo.');

      const buffer = await fileResponse.buffer(); // Obtener el archivo como buffer

      // Crear un mensaje que incluya la información
      const messageContent = `
*Audio enviado:*
📝 *Título:* ${result.result.title}
📏 *Tamaño:* ${result.result.size}
🔊 *Calidad:* ${result.result.quality}
`;

      await conn.sendMessage(m.chat, {
        content: messageContent,
        audio: buffer,
        mimetype: 'audio/mpeg',
        filename: `${result.result.title}.mp3`,
      });
    } else if (command === 'play2') {
      // Aquí llamas a la API para obtener la información del video
      const videoResponse = await fetch(`https://api.ejemplo.com/video/${m.query}`);
      result = await videoResponse.json();

      if (!result.status) {
        return await conn.sendMessage(m.chat, 'No se encontró el video.');
      }

      // Crear un mensaje que incluya el título, tamaño y calidad
      const downloadUrl = result.result.dl_url;
      const fileResponse = await fetch(downloadUrl);

      if (!fileResponse.ok) throw new Error('No se pudo descargar el archivo.');

      const buffer = await fileResponse.buffer(); // Obtener el archivo como buffer

      // Crear un mensaje que incluya la información
      const messageContent = `
*Video enviado:*
📝 *Título:* ${result.result.title}
📏 *Tamaño:* ${result.result.size}
🔊 *Calidad:* ${result.result.quality}
`;

      await conn.sendMessage(m.chat, {
        content: messageContent,
        video: buffer,
        mimetype: 'video/mp4',
        filename: `${result.result.title}.mp4`,
      });
    } else {
      await conn.sendMessage(m.chat, 'Comando no reconocido.');
    }
  } catch (error) {
    console.error('Error al procesar el comando:', error);
    await conn.sendMessage(m.chat, 'Ocurrió un error al procesar tu solicitud.');
  }
};

// ... otras partes del código, como la inicialización del bot y la escucha de comandos


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
