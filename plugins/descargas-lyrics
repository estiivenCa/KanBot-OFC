import fetch from 'node-fetch';

const handler = async (m, { text, command, conn }) => {
  // Verifica si el comando es ".letra" y si el usuario proporcionó un nombre de canción
  if (!text) {
    return conn.sendMessage(m.chat, 'Por favor, proporciona el nombre de una canción.', 'conversation');
  }

  const songName = text.trim();
  
  // URL de la API con el nombre de la canción proporcionado por el usuario
  const apiUrl = `https://deliriusapi-official.vercel.app/search/letra?query=${encodeURIComponent(songName)}`;
  
  try {
    // Realiza la petición a la API para obtener la letra
    const response = await fetch(apiUrl);
    const result = await response.json();
    
    if (result && result.letra) {
      const lyrics = result.letra;
      await conn.sendMessage(m.chat, `Letra de *${songName}*:\n\n${lyrics}`, 'conversation');
    } else {
      await conn.sendMessage(m.chat, 'Lo siento, no pude encontrar la letra de esa canción.', 'conversation');
    }
  } catch (error) {
    console.error('Error al buscar la letra:', error);
    await conn.sendMessage(m.chat, 'Hubo un error al buscar la letra de la canción.', 'conversation');
  }
};

// Define el comando que activa este handler
handler.command = /^letra$/i;

export default handler;
