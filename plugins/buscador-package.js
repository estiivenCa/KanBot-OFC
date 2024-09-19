import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa el nombre de la aplicación que deseas buscar.', m);

    conn.reply(m.chat, `🚩 Buscando en la Play Store...`, m);

    try {
        // Llama a la API de Delirius para buscar en la Play Store
        const url = `https://deliriusapi-official.vercel.app/search/playstore?q=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const results = res.data.data;  // La respuesta de la API está en `data.data`

        if (results && results.length > 0) {
            let teks = `🍟 *Resultado de la búsqueda* : ${text}\n\n`;
            for (let r of results) {
                // Extraer solo el ID del link
                const idApp = r.link.match(/id=([^&]*)/)[1];
                teks += `🐢 *Nombre* ∙ ${r.name}\n🔗 *ID de la App* ∙ ${idApp}\n\n`;
            }
            conn.reply(m.chat, teks, m);
        } else {
            conn.reply(m.chat, '❌ No se encontraron aplicaciones.', m);
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al buscar en la Play Store.', m);
    }
};

handler.help = ['package <App>'];
handler.tags = ['buscador'];
handler.command = ['pck'];
handler.group = true;
handler.register = true;

export default handler;
