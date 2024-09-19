/* import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} com.whatsapp`;

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
        let apiUrl = `https://deliriusapi-official.vercel.app/download/apk?query=${text}`;
        let response = await fetch(apiUrl);
        
        if (!response.ok) {
            // Si la API de Delirius falla, usamos la API de Lolhuman usando el nombre del paquete
            apiUrl = `https://api.lolhuman.xyz/api/apkdownloader?apikey=8fdb6bf3e9d527f7a6476f4b&package=${text}`;
            response = await fetch(apiUrl);

            if (!response.ok) throw `*Error*\nNo se pudo obtener la aplicación con el ID: ${text} en ninguna API.`;
        }

        const data = await response.json();

        // Verificar la respuesta de la API de Lolhuman
        if (data.status !== 200 || !data.result || !data.result.apk_link) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        const { apk_name, apk_version, apk_author, apk_link } = data.result;

        // Enviar el archivo APK con los datos obtenidos
        await conn.sendMessage(m.chat, { 
            document: { url: apk_link }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${apk_name || text}.apk`, 
            caption: `*Nombre*: ${apk_name || text}\n*Versión*: ${apk_version || 'Desconocida'}\n*Autor*: ${apk_author || 'Desconocido'}\n\nDescarga el APK y disfrútalo by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 😎`
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
handler.group = true;

export default handler;
 */

// envia el primer resultado obtenido 
/* import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} com.whatsapp`;

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

        // Llamada a la nueva API de Neoxr para buscar el APK
        let apiUrl = `https://api.neoxr.eu/api/apk?q=${text}&apikey=GoKVcs`;
        let response = await fetch(apiUrl);

        if (!response.ok) throw `*Error*\nNo se pudo obtener la aplicación con el ID: ${text}.`;

        const data = await response.json();

        // Verificar si los datos son válidos y si el primer resultado existe
        if (!data.status || !data.data || !data.data[0]) throw `*Error*\nNo se encontró el enlace de descarga del APK.`;

        // Traer solo el primer resultado
        const { name, version, developer, size, url } = data.data[0];

        // Enviar el archivo APK con los datos obtenidos del primer resultado
        await conn.sendMessage(m.chat, { 
            document: { url }, 
            mimetype: 'application/vnd.android.package-archive', 
            fileName: `${name || text}.apk`, 
            caption: `*Nombre*: ${name || text}\n*Versión*: ${version || 'Desconocida'}\n*Desarrollador*: ${developer || 'Desconocido'}\n*Tamaño*: ${size || 'Desconocido'}\n\nDescarga el APK y disfrútalo by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 😎`
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
handler.group = true;

export default handler;
 */

// envia botones 
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `*Error*\n[ 💡 ] Ejemplo: ${usedPrefix + command} whatsapp`;

    try {
        await m.react('🔄');
        await conn.sendMessage(m.chat, 
            { 
                text: '*🧿 Buscando APKs, por favor espera...*\n> Mientras esperas, sígueme en mi canal, crack 😎',
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

        // Llamada a la nueva API de Neoxr para buscar el APK
        let apiUrl = `https://api.neoxr.eu/api/apk?q=${text}&apikey=GoKVcs`;
        let response = await fetch(apiUrl);

        if (!response.ok) throw `*Error*\nNo se pudo obtener los resultados para: ${text}.`;

        const data = await response.json();

        // Verificar si los datos son válidos y si hay resultados
        if (!data.status || !data.data || data.data.length === 0) throw `*Error*\nNo se encontraron resultados para: ${text}.`;

        // Crear una lista desplegable con todos los resultados
        let results = data.data;
        let buttons = results.map((result, index) => ({
            buttonId: `${index}`,
            buttonText: { displayText: result.name },
            type: 1
        }));

        // Crear el mensaje de la lista desplegable
        let buttonMessage = {
            text: `*Selecciona un APK para descargar:*`,
            footer: `Resultados para: ${text}`,
            buttons,
            headerType: 1
        };

        // Preparar el mensaje con botones
        const buttonMessageMedia = await prepareWAMessageMedia(buttonMessage, { upload: conn.waUploadToServer });

        // Enviar el mensaje con la lista desplegable
        const message = generateWAMessageFromContent(m.chat, buttonMessageMedia, { quoted: m });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

        // Manejar la respuesta del usuario
        conn.on('message', async (msg) => {
            if (msg.key.fromMe) return;
            
            let selectedIndex = parseInt(msg.message.buttonsResponseMessage.selectedButtonId);
            if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= results.length) {
                await conn.sendMessage(m.chat, { text: `*Error*\nSelección inválida.` }, { quoted: msg });
                return;
            }

            const selectedResult = results[selectedIndex];
            const { name, version, developer, size, url } = selectedResult;

            // Enviar el APK del resultado seleccionado
            await conn.sendMessage(m.chat, { 
                document: { url }, 
                mimetype: 'application/vnd.android.package-archive', 
                fileName: `${name || text}.apk`, 
                caption: `*Nombre*: ${name || text}\n*Versión*: ${version || 'Desconocida'}\n*Desarrollador*: ${developer || 'Desconocido'}\n*Tamaño*: ${size || 'Desconocido'}\n\nDescarga el APK y disfrútalo by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 😎`
            }, { quoted: msg });

            await m.react('✅');
        });

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

