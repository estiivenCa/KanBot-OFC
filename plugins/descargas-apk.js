import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} org.mozilla.firefox`;

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

        // Formar la URL de la aplicación en F-Droid
        const fDroidUrl = `https://f-droid.org/en/packages/${text}/`;
        const appPageResponse = await fetch(fDroidUrl);
        
        if (appPageResponse.status !== 200) throw `*Error*\nNo se encontró ninguna aplicación con el ID: ${text}`;

        const appPageHtml = await appPageResponse.text();
        const $ = cheerio.load(appPageHtml);

        // Obtener el enlace de descarga del APK (usualmente la última versión)
        const downloadLink = $('a.package-version-download').first().attr('href');
        if (!downloadLink) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // URL final de descarga
        const finalDownloadLink = `https://f-droid.org${downloadLink}`;

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
