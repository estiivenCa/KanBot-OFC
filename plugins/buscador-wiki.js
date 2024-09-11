import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa lo que deseas buscar en Wikipedia.', m);

    conn.reply(m.chat, `🚩 Buscando en Wikipedia...`, m);

    try {
        // Llamada a la API de Delirius para buscar en Wikipedia (un único resultado)
        const url = `https://deliriusapi-official.vercel.app/search/wiki?q=${encodeURIComponent(text)}&language=en`;
        const res = await axios.get(url);
        const result = res.data; // Se espera un único objeto de resultado

        if (result && result.title) {
            let teks = `🍟 *Resultado de* : ${text}\n\n`;
            teks += `🐢 *Título ∙* ${result.title}\n🚩 *Descripción ∙* ${result.snippet || 'No hay descripción disponible'}\n🔗 *Url ∙* ${result.link}\n\n`;

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
