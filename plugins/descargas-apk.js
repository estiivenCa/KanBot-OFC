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
                        title: 'APK Downloader',  // Título personalizado
                        body: 'Descargando APK...', // Texto de cuerpo personalizado
                        previewType: 0,
                        sourceUrl: 'https://t.me/mi_canal' // URL del canal (personaliza con tu enlace)
                    }
                }
            }, 
            { quoted: m }
        );

        // Hacer la búsqueda en APKPure
        const searchUrl = `https://apkpure.com/es/search?q=${encodeURIComponent(text)}`;
        const searchResponse = await fetch(searchUrl);
        const searchHtml = await searchResponse.text();
        const $ = cheerio.load(searchHtml);

        // Obtener el enlace de la primera aplicación encontrada
        const firstResultLink = $('.search-title a').first().attr('href');
        if (!firstResultLink) throw `*Error*\nNo se encontró ninguna aplicación con el nombre: ${text}`;

        // Navegar a la página de detalles de la aplicación
        const appPageUrl = `https://apkpure.com${firstResultLink}`;
        const appPageResponse = await fetch(appPageUrl);
        const appPageHtml = await appPageResponse.text();
        const $$ = cheerio.load(appPageHtml);

        // Obtener el enlace de descarga del APK
        const downloadLink = $$('a.da').attr('href');
        if (!downloadLink) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // Navegar a la página final de descarga
        const downloadPageUrl = `https://apkpure.com${downloadLink}`;
        const downloadPageResponse = await fetch(downloadPageUrl);
        const downloadPageHtml = await downloadPageResponse.text();
        const $$$ = cheerio.load(downloadPageHtml);

        const finalDownloadLink = $$$('.fast-download a').attr('href');
        if (!finalDownloadLink) throw `*Error*\nNo se encontró el enlace final de descarga.`;

        // Enviar el archivo APK
        await conn.sendMessage(m.chat, { 
            document: { url: finalDownloadLink }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${text}.apk`, 
            caption: `Aquí está el APK solicitado: ${text}` 
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
