import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo ${usedPrefix + command} WhatsApp Plus`
    try {
        await m.react('🔄')
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

        // Buscar el APK utilizando la API de DeliriusAPI
        const response = await fetch(`https://deliriusapi-official.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
        if (!response.ok) throw `*Error*\nNo se encontró el APK para la consulta: ${text}`;
        const result = await response.json();

        if (result.length === 0) throw `*Error*\nNo se encontraron resultados para la consulta: ${text}`;

        const apkData = result[0];  // Tomar el primer resultado de la búsqueda

        if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 300) {
            await conn.sendMessage(m.chat, { text: '*El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m });
            await m.react('❌');
            return;
        }

        // Enviar el archivo APK
        await conn.sendMessage(m.chat, { 
            document: { url: apkData.url }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: apkData.name + '.apk', 
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
