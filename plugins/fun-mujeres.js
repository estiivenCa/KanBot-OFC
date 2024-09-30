// Plugin para enviar una imagen específica
let handler = async (m, { conn, usedPrefix, command }) => {
  // URL de la imagen
  const imageUrl = 'https://m.media-amazon.com/images/I/61rXThZoicL.jpg';
  
  // Enviar la imagen al chat
  await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', '', m);
  
  // Reaccionar con un emoji (opcional)
  m.react('😓');
};

// Configuración del comando
handler.help = ['imagen'];
handler.tags = ['fun'];
handler.command = ['todasmienten']; // Puedes añadir más comandos si lo deseas
handler.group = true;  // Solo en grupos
handler.register = true; // Necesita registro

export default handler;
