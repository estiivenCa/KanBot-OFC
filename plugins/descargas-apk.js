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

        // Llamada a la API de Delirius para buscar el APK
        const apiUrl = `https://deliriusapi-official.vercel.app/download/apk?query=${text}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw `*Error*\nNo se pudo obtener la aplicación con el ID: ${text}.`;

        const data = await response.json();

        // Asegurarnos de que el campo de descarga existe dentro de "data.data"
        if (!data || !data.data || !data.data.download) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // Enviar el archivo APK con los datos obtenidos
        await conn.sendMessage(m.chat, { 
            document: { url: data.data.download }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${data.data.name || text}.apk`, 
            caption: `*Nombre*: ${data.data.name || text}\n*ID*: ${data.data.id || 'Desconocido'}\n*Tamaño*: ${data.data.size || 'Desconocido'}\n*Fecha de publicación*: ${data.data.publish || 'Desconocida'}\n\nDescarga el APK y disfrútalo 😎`
        }, { quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error('Error durante la descarga:', error);
        await conn.sendMessage(m.chat, { text: `*Error*\n${error.message || error}` }, { quoted: m });
        await m.react('❌');
    }
}

handler.help = ['apk']; 
handler.tags = ['descargas']; 
handler.command = /^(apk)$/i;
handler.limit = 5;

export default handler;
