import fetch from 'node-fetch';

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

        // Usar la API de Delirius para buscar el APK
        const apiUrl = `https://deliriusapi-official.vercel.app/download/apk?query=${text}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw `*Error*\nNo se encontró ninguna aplicación con el ID: ${text}`;

        const data = await response.json();
        if (!data || !data.apkUrl) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // Enviar el archivo APK
        await conn.sendMessage(m.chat, { 
            document: { url: data.apkUrl }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${data.name || text}.apk`, 
            caption: `*Nombre*: ${data.name || text}\n*Tamaño*: ${data.size || 'Desconocido'}`
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
