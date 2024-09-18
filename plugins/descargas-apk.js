import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} com.whatsapp`;

    // Limite de tamaño en MB
    const maxSizeMB = 200;

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

        let response, data, sizeMB;

        // 1. Intentar obtener datos de la API de Delirius
        try {
            const apiUrlDelirius = `https://deliriusapi-official.vercel.app/download/apk?query=${text}`;
            response = await fetch(apiUrlDelirius);
            if (!response.ok) throw new Error('Delirius no encontró el APK.');

            data = await response.json();

            // Verificar si la estructura de Delirius tiene el enlace de descarga
            if (!data || !data.data || !data.data.download) throw new Error('Delirius no proporcionó el enlace de descarga.');

            // Convertir el tamaño de bytes a megabytes (si está disponible)
            sizeMB = data.data.size ? parseFloat(data.data.size) / (1024 * 1024) : 0;

            // Verificar si el tamaño del archivo excede el límite
            if (sizeMB > maxSizeMB) {
                throw new Error(`El APK es demasiado grande: ${sizeMB.toFixed(2)}MB (límite: ${maxSizeMB}MB).`);
            }

            // Si Delirius responde correctamente, enviar el APK
            await conn.sendMessage(m.chat, { 
                document: { url: data.data.download }, 
                mimetype: 'application/vnd.android.package-archive', 
                fileName: `${data.data.name || text}.apk`, 
                caption: `*Nombre*: ${data.data.name || text}\n*Paquete*: ${data.data.id || 'Desconocido'}\n*Tamaño*: ${sizeMB.toFixed(2)}MB\n*Fecha de publicación*: ${data.data.publish || 'Desconocida'}\n\nDescarga el APK y disfrútalo by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 😎`
            }, { quoted: m });

            await m.react('✅');
            return;  // Si se maneja Delirius correctamente, no seguir con Lolhuman
        } catch (error) {
            console.warn(`API de Delirius falló: ${error.message}`);
        }

        // 2. Si Delirius falla, intentar con la API de Lolhuman
        try {
            const apiUrlLolhuman = `https://api.lolhuman.xyz/api/apkdownloader?apikey=8fdb6bf3e9d527f7a6476f4b&package=${text}`;
            response = await fetch(apiUrlLolhuman);
            if (!response.ok) throw new Error('Lolhuman no encontró el APK.');

            data = await response.json();

            // Verificar la respuesta de Lolhuman
            if (data.status !== 200 || !data.result || !data.result.apk_link) throw new Error('Lolhuman no proporcionó el enlace de descarga.');

            const { apk_name, apk_version, apk_author, apk_link } = data.result;

            // Convertir el tamaño de bytes a megabytes (si está disponible)
            sizeMB = data.result.apk_size ? parseFloat(data.result.apk_size) / (1024 * 1024) : 0;

            // Verificar si el tamaño del archivo excede el límite
            if (sizeMB > maxSizeMB) {
                throw new Error(`El APK es demasiado grande: ${sizeMB.toFixed(2)}MB (límite: ${maxSizeMB}MB).`);
            }

            // Si Lolhuman responde correctamente, enviar el APK
            await conn.sendMessage(m.chat, { 
                document: { url: apk_link }, 
                mimetype: 'application/vnd.android.package-archive', 
                fileName: `${apk_name || text}.apk`, 
                caption: `*Nombre*: ${apk_name || text}\n*Versión*: ${apk_version || 'Desconocida'}\n*Autor*: ${apk_author || 'Desconocido'}\n*Tamaño*: ${sizeMB.toFixed(2)}MB\n\nDescarga el APK y disfrútalo by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 😎`
            }, { quoted: m });

            await m.react('✅');
        } catch (error) {
            throw new Error(`Ambas APIs fallaron: ${error.message}`);
        }

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
handler.group = true;

export default handler;
