import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} WhatsApp Plus`;
    try {
        await m.react('🔄');
        await conn.sendMessage(m.chat, 
            { 
                text: '*🧿 Buscando y descargando el APK, por favor espera...*\n> Mientras esperas, sígueme en mi canal, crack 😎',
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        showAdAttribution: true,
                        title: packname,  // Título personalizado
                        body: wm,         // Texto de cuerpo personalizado
                        previewType: 0,
                        sourceUrl: channel // URL del canal
                    }
                }
            }, 
            { quoted: m }
        );

        // Hacer la búsqueda en Aptoide
        const searchUrl = `https://en.aptoide.com/search?query=${encodeURIComponent(text)}`;
        const searchResponse = await fetch(searchUrl);
        const searchHtml = await searchResponse.text();
        const $ = cheerio.load(searchHtml);

        // Obtener el enlace de la primera aplicación encontrada
        const firstResultLink = $('.search-item a').first().attr('href');
        if (!firstResultLink) throw `*Error*\nNo se encontró ninguna aplicación con el nombre: ${text}`;

        // Navegar a la página de detalles de la aplicación
        const appPageUrl = `https://en.aptoide.com${firstResultLink}`;
        const appPageResponse = await fetch(appPageUrl);
        const appPageHtml = await appPageResponse.text();
        const $$ = cheerio.load(appPageHtml);

        // Obtener el enlace de descarga del APK
        const downloadLink = $$('a.download-apk').first().attr('href');
        if (!downloadLink) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // Obtener el enlace final de descarga
        const finalDownloadPageResponse = await fetch(downloadLink);
        const finalDownloadPageHtml = await finalDownloadPageResponse.text();
        const $$$ = cheerio.load(finalDownloadPageHtml);

        const finalDownloadLink = $$$('.download-button').attr('href');
        if (!finalDownloadLink) throw `*Error*\nNo se encontró el enlace final de descarga.`;

        // Enviar el archivo APK
        await conn.sendMessage(m.chat, { 
            document: { url: finalDownloadLink }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${text}.apk`, 
            caption: null 
        }, { quoted: m });
        
        await m.react('✅');
    } catch (error) {
        await conn.sendMessage(m.chat, { text: `*Error*\n${error.message || error}` }, { quoted: m });
        await m.react('❌');
    }
}

handler.help = ['apk']; 
handler.tags = ['descargas']; 
handler.command = /^(apk)$/i;
handler.limit = 5;

export default handler;
