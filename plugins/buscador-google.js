import { googleIt } from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
    const text = args.join` `;
    if (!text) {
        return conn.reply(m.chat, '🍟 Ingresa lo que deseas buscar en Google.', m);
    }

    conn.reply(m.chat, `🚩 Buscando su información...`, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰',
                body: 'by Stiiiven',
                previewType: 0,
                sourceUrl: channel
            }
        }
    });

    try {
        // Primero intentamos realizar la búsqueda usando la API de Dorratz
        const dorratzResponse = await axios.get(`https://api.dorratz.com/v2/google-search?q=${encodeURIComponent(text)}`);
        const dorratzData = dorratzResponse.data;

        if (dorratzData.status && dorratzData.results) {
            let responseText = `🍟 *Resultado de* : ${text}\n\n`;
            dorratzData.results.forEach((item) => {
                responseText += `🐢 *Titulo ∙* ${item.title}\n🔗 *Url ∙* ${item.link}\n🕰️ *Fecha ∙* ${item.timestamp}\n🔎 *Dominio ∙* ${item.domain}\n\n`;
            });
            conn.reply(m.chat, responseText, m);
            return; // Si hay resultados, termina aquí
        }
    } catch (dorratzError) {
        console.error('Error al buscar en la API de Dorratz:', dorratzError);
    }

    try {
        // Si la API de Dorratz falla, intentamos con la API de Lolhuman
        const lolhumanApiKey = '8fdb6bf3e9d527f7a6476f4b';
        const lolhumanResponse = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=${lolhumanApiKey}&query=${encodeURIComponent(text)}`);
        const lolhumanData = lolhumanResponse.data;

        if (lolhumanData.status === 200 && lolhumanData.result) {
            let responseText = `🍟 *Resultado de* : ${text}\n\n`;
            lolhumanData.result.forEach((item) => {
                responseText += `🐢 *Titulo ∙* ${item.title}\n🚩 *Info ∙* ${item.desc}\n🔗 *Url ∙* ${item.link}\n\n`;
            });
            conn.reply(m.chat, responseText, m);
            return; // Si hay resultados, termina aquí
        }
    } catch (lolhumanError) {
        console.error('Error al buscar en la API de Lolhuman:', lolhumanError);
    }

    try {
        // Si las dos APIs anteriores fallan, intentamos con google-it
        const results = await google({ query: text });
        let responseText = `🍟 *Resultado de* : ${text}\n\n`;
        for (let g of results) {
            responseText += `🐢 *Titulo ∙* ${g.title}\n🚩 *Info ∙* ${g.snippet}\n🔗 *Url ∙* ${g.link}\n\n`;
        }
        conn.reply(m.chat, responseText, m);
    } catch (googleItError) {
        conn.reply(m.chat, '🚩 Error al buscar en Google. Intenta de nuevo más tarde.', m);
        console.error('Error al buscar con google-it:', googleItError);
    }
};

handler.help = ['google <búsqueda>'];
handler.tags = ['buscador'];
handler.command = ['google'];
handler.group = true;
handler.register = true;

export default handler;
