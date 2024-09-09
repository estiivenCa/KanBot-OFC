import fetch from 'node-fetch';
import cheerio from 'cheerio';

// Función para obtener la letra desde letras.com
async function fetchLyricsFromLetras(artist, songTitle) {
  const baseUrl = `https://www.letras.com/${encodeURIComponent(artist)}/${encodeURIComponent(songTitle)}`;
  
  try {
    // Hacer la petición HTTP a la página de la canción
    const response = await fetch(baseUrl);
    const html = await response.text();
    
    // Cargar el HTML usando cheerio para analizarlo
    const $ = cheerio.load(html);

    // Buscar el contenido de la letra dentro del HTML
    const lyrics = $('.cnt-letra').text().trim();
    
    if (lyrics) {
      return lyrics;
    } else {
      console.error('No se pudo encontrar la letra en la página.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la letra:', error);
    return null;
  }
}

// Handler del comando para el bot
const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre del artista y la canción en formato "artista - canción".' });
  }

  // Separar el texto en artista y título de la canción
  const [artist, songTitle] = text.split('-').map(s => s.trim());

  if (!artist || !songTitle) {
    return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre del artista y la canción en formato "artista - canción".' });
  }

  try {
    // Buscar la letra en letras.com
    const lyrics = await fetchLyricsFromLetras(artist, songTitle);
    
    if (lyrics) {
      await conn.sendMessage(m.chat, { text: `Letra de *${songTitle}* por *${artist}*:\n\n${lyrics}` });
    } else {
      await conn.sendMessage(m.chat, { text: 'Lo siento, no pude encontrar la letra de esa canción.' });
    }
  } catch (error) {
    console.error('Error al buscar la letra:', error);
    await conn.sendMessage(m.chat, { text: 'Hubo un error al buscar la letra de la canción.' });
  }
};

// Define el comando que activa este handler
handler.command = /^letra$/i;

export default handler;
