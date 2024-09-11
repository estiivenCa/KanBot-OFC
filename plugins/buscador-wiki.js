import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa lo que deseas buscar en Wikipedia.', m);

    conn.reply(m.chat, `🚩 Buscando en Wikipedia...`, m);

    try {
        // Llama a la API de Delirius para buscar en Wikipedia
        const url = `https://deliriusapi-official.vercel.app/search/wiki?q=${encodeURIComponent(text)}`;
        const res = await axios.get(url);

        // Registro de la respuesta de la API para comprobar la estructura
        console.log(res.data);

        const results = res.data;  // La respuesta de la API es una lista de resultados

        // Verificamos si la lista de resultados no está vacía
        if (results && results.length > 0) {
            let teks = `🍟 *Resultados de la búsqueda para* : ${text}\n\n`;
            for (const result of results) {
                teks += `🐢 *Titulo ∙* ${result.name}\n🚩 *Descripción ∙* ${result.description || 'No hay descripción disponible'}\n🔗 *Url ∙* ${result.link}\n\n`;
               // teks += `🖼️ *Imagen ∙* ${result.image}\n\n`;  // Incluye la URL de la imagen si deseas mostrarla
            }

            conn.reply(m.chat, teks, m);
        } else {
            conn.reply(m.chat, '❌ No se encontraron resultados.', m);
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al buscar en Wikipedia.', m);
    }
};

handler.help = ['wiki <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['wiki'];
handler.group = true;
handler.register = true;

export default handler;
