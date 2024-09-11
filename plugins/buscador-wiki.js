import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa lo que deseas buscar en Wikipedia.', m);

    conn.reply(m.chat, `🚩 Buscando en Wikipedia...`, m);

    try {
        // Llama a la API de Delirius para buscar en Wikipedia
        const url = `https://deliriusapi-official.vercel.app/search/wiki?q=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const results = res.data.data;  // La respuesta de la API está en `data.data`

        if (results && results.length > 0) {
            let teks = `🍟 *Resultado de* : ${text}\n\n`;
            for (let r of results) {
                teks += `🐢 *Titulo ∙* ${r.name}\n🚩 *Descripción ∙* ${r.description || 'No hay descripción'}\n🔗 *Url ∙* ${r.link}\n✍ *Autor ∙* ${r.author || 'No disponible'}\n\n`;
            }
            conn.reply(m.chat, teks, m);
        } else {
            conn.reply(m.chat, '❌ No se encontraron resultados.', m);
        }
    } catch (error) {
        console.error(error);
        console.log(error);
        conn.reply(m.chat, '❌ Error al buscar en Wikipedia.', m);
    }
};

handler.help = ['wiki <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['wiki'];
handler.group = true;
handler.register = true;

export default handler;
