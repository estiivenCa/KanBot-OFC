import fetch from 'node-fetch';

// Token de acceso a la API de Genius
const accessToken = 'y8zKszFh7WflT33NaOeGnGlOrfViwrymiwsYD-6T4D54Fk3n7hUIjYoBjZUhPJo1';

// Función para buscar el ID del artista
async function getArtistId(artistName) {
  const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(artistName)}`;
  try {
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}` // Autenticación con el token
      }
    });
    const data = await response.json();
    if (data.response.hits.length > 0) {
      const artist = data.response.hits.find(hit => hit.result.primary_artist.name.toLowerCase() === artistName.toLowerCase());
      return artist ? artist.result.primary_artist.id : null;
    } else {
      console.log('Artista no encontrado');
      return null;
    }
  } catch (error) {
    console.error('Error al buscar el ID del artista:', error);
    return null;
  }
}

// Función para obtener las canciones de un artista usando su ID
async function getSongsByArtistId(artistId) {
  const url = `https://api.genius.com/artists/${artistId}/songs`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}` // Autenticación con el token
      }
    });
    const data = await response.json();
    if (data.response.songs.length > 0) {
      return data.response.songs;
    } else {
      console.log('No se encontraron canciones para este artista');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las canciones del artista:', error);
    return [];
  }
}

// Handler del bot para buscar y enviar la letra de la canción
const handler = async (m, { text, command, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: 'Por favor, proporciona el nombre del artista y la canción.' });
  }

  // Divide el texto en el primer espacio para separar artista y nombre de la canción
  const [artist, ...songArray] = text.split(' ');
  const songName = songArray.join(' ');

  try {
    const artistId = await getArtistId(artist);
    if (artistId) {
      const songs = await getSongsByArtistId(artistId);
      const song = songs.find(song => song.title.toLowerCase() === songName.toLowerCase());
      if (song) {
        await conn.sendMessage(m.chat, { text: `Aquí está la canción que encontré: ${song.url}` });
      } else {
        await conn.sendMessage(m.chat, { text: 'Lo siento, no pude encontrar la canción.' });
      }
    } else {
      await conn.sendMessage(m.chat, { text: 'No se pudo encontrar el ID del artista.' });
    }
  } catch (error) {
    console.error('Error al buscar la canción en Genius:', error);
    await conn.sendMessage(m.chat, { text: 'Hubo un error al buscar la canción.' });
  }
};

// Define el comando que activará el handler
handler.command = /^letra$/i;

export default handler;
