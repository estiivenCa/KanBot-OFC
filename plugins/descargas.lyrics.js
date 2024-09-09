import fetch from 'node-fetch';

// Token de acceso a la API de Genius
const accessToken = 'IlsBu-BDYAl4AXpYmFLd7euL1pATYjQjH5-aSS4IupmDB6ssypSksmb6HZN54Xu';

// Función para buscar la canción en Genius
async function searchSongOnGenius(artist, songName) {
  const query = `${artist} ${songName}`;
  const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}` // Autenticación con el token
      }
    });

    const data = await response.json();

    if (data.response.hits.length > 0) {
      const song = data.response.hits[0].result;
      console.log(`Encontré la canción: ${song.full_title}`);
      console.log(`URL de Genius: ${song.url}`);
      
      return song.url; // Devuelve el enlace de la canción
    } else {
      console.log('No se encontró la canción');
      return null;
    }
  } catch (error) {
    console.error('Error al buscar la canción en Genius:', error);
  }
}

// Handler del bot para buscar y enviar la letra de la canción
const handler = async (m, { text, command, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre de una canción.' });
  }

  const [artist, ...songArray] = text.split(' ');
  const songName = songArray.join(' ');

  try {
    const url = await searchSongOnGenius(artist, songName);
    if (url) {
      await conn.sendMessage(m.chat, { text: `Aquí está la canción que encontré: ${url}` });
    } else {
      await conn.sendMessage(m.chat, { text: 'Lo siento, no pude encontrar la canción.' });
    }
  } catch (error) {
    console.error('Error al buscar la canción en Genius:', error);
    await conn.sendMessage(m.chat, { text: 'Hubo un error al buscar la canción.' });
  }
};

// Define el comando que activará el handler
handler.command = /^letra$/i;

export default handler;
