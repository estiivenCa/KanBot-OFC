import fetch from 'node-fetch';

// Función para buscar la letra usando diferentes APIs
async function fetchLyrics(songName) {
  const apis = [
    `https://deliriusapi-official.vercel.app/search/letra?query=${encodeURIComponent(songName)}`,
    `https://api.lyrics.ovh/v1/${encodeURIComponent(songName)}`,
    `https://some-random-api.ml/lyrics?title=${encodeURIComponent(songName)}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api);
      
      // Verifica si el contenido de la respuesta es JSON antes de intentar parsearlo
      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        console.error(`La API ${api} no devolvió un JSON válido. Se recibió: ${contentType}`);
        continue; // Pasa a la siguiente API si la respuesta no es JSON
      }

      const result = await response.json();
      
      // Comprueba si la API devuelve un formato conocido de letras
      if (result && result.letra) {
        return result.letra;
      } else if (result && result.lyrics) {
        return result.lyrics;
      }
    } catch (error) {
      console.error(`Error al consultar la API ${api}:`, error);
      continue; // Si una API falla, intenta con la siguiente
    }
  }

  // Si todas las APIs fallan
  return null;
}

const handler = async (m, { text, command, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre de una canción.' });
  }

  const songName = text.trim();
  
  try {
    // Buscar la letra usando las múltiples APIs
    const lyrics = await fetchLyrics(songName);
    
    if (lyrics) {
      await conn.sendMessage(m.chat, { text: `Letra de *${songName}*:\n\n${lyrics}` });
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
