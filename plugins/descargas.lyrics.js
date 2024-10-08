// Importaciones en ES Module
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `*Ingrese el nombre de una cancion y el artista 🎶*\n\n> *Ejemplo :*\n> _${usedPrefix + command} Falling - Daniel trevor_`, m, rcanal);
    }

    try {
        // Enviar una reacción de "await" para indicar que el bot está procesando
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

       // await conn.reply(m.chat, global.cargando, m);

        // Llamada a la API para obtener la letra de la canción
        let response = await fetch(`https://deliriusapi-official.vercel.app/search/letra?query=${encodeURIComponent(text)}`);
        let ApiData = await response.json();

        // Desestructurando los datos de la respuesta
        let { title, fullTitle, artist, artistUrl, image, lyrics } = ApiData.data;

        // Formateo del mensaje
        let txt = ' *\`【 Lʏʀɪᴄꜱ Sᴇᴀʀᴄʜ 】\`*\n\n';
        txt += `> *❀ Título:* _${title || 'x'}_\n`;
        txt += `> *✽ Título Completo:* _${fullTitle || 'x'}_\n`;
        txt += `> *❀ Artista:* _${artist || 'x'}_\n`;
        txt += `> *✽ URL del Artista:* _${artistUrl || 'x'}_\n`;
        txt += `> *ꕤ Letra:* _${lyrics || 'x'}_\n`.trim();

        // Si hay una imagen, envíala con el texto, de lo contrario solo envía el texto
        if (image) {
            await conn.sendFile(m.chat, image, 'image.jpg', txt, m);
        } else {
            await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
        }

        // Enviar una reacción de "done" para indicar que el bot terminó de procesar
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

       // await conn.reply(m.chat, global.listo, m);
    } catch (error) {
        console.error(error);

        // Enviar una reacción de "error" si algo falla
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

        await conn.reply(m.chat, global.error, m);
    }
};

// Define el comando que activará el handler
handler.command = /^letra$/i;
handler.tags = ['buscador']
handler.help = ['letra']
handler.group = true;
// Exporta el handler
export default handler;
