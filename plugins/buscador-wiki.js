import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa lo que deseas buscar en Wikipedia.', m);

    conn.reply(m.chat, `🚩 Buscando en Wikipedia...`, m);

    try {
        // Llama a la API de Delirius para buscar en Wikipedia
        const url = `https://deliriusapi-official.vercel.app/search/wiki?q=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const results = res.data;  // La respuesta es un array de resultados

        if (results && results.length > 0) {
            let teks = `🍟 *Resultados de* : ${text}\n\n`;
            for (let result of results) {
                teks += `🐢 *Nombre:* ${result.name}\n`;
                teks += `🚩 *Descripción:* ${result.description || 'No hay descripción'}\n`;
                teks += `🔗 *Enlace:* ${result.link}\n`;
                teks += `🖼️ *Imagen:* ${result.image || 'No hay imagen'}\n`;
                teks += `📝 *Autor:* ${result.author || 'Desconocido'}\n`;
                teks += `🔗 *URL del Autor:* ${result.author_url || 'No disponible'}\n\n`;
            }
            conn.reply(m.chat, teks, m);
        } else {
            conn.reply(m.chat, '❌ No se encontraron resultados.', m);
        }
    } catch (error) {
        console.error('Error al buscar en Wikipedia:', error);
        conn.reply(m.chat, '❌ Error al buscar en Wikipedia.', m);
    }
};

handler.help = ['wiki <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['wiki'];
handler.group = true;
handler.register = true;

export default handler;
