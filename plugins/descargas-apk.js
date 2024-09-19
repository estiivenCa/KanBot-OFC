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

export default handler; */

import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
  if (!text) throw `⚠️ *_Por favor, ingresa el nombre o ID de la aplicación que deseas buscar_*`;

  try {
    // Llamada a la API de Neoxr para buscar el APK
    let apiUrl = `https://api.neoxr.eu/api/apk?q=${text}&apikey=GoKVcs`;
    let response = await fetch(apiUrl);

    if (!response.ok) throw `*Error*\nNo se pudo obtener la aplicación con el nombre o ID: ${text}.`;

    const data = await response.json();

    // Verificar si los datos son válidos
    if (!data.status || !data.data || data.data.length === 0) throw `*Error*\nNo se encontraron resultados.`;

    const apps = data.data;

    // Crear la lista interactiva de opciones con los resultados obtenidos
    let sections = apps.map((app, index) => ({
      title: `${app.name}`,
      rows: [{
        title: `${app.name}`,
        description: `Versión: ${app.version}\nTamaño: ${app.size}\nDesarrollador: ${app.developer}`,
        rowId: `${prefijo}apkdownload ${app.url}`
      }]
    }));

    let listMessage = {
      text: `Resultados obtenidos: ${apps.length}\nSelecciona una aplicación para descargar`,
      footer: 'Bot APK Downloader',
      title: 'Resultados de la búsqueda',
      buttonText: 'Ver aplicaciones',
      sections
    };

    // Enviar el mensaje interactivo
    const msg = generateWAMessageFromContent(m.chat, { listMessage }, { userJid: conn.user.jid, quoted: m });
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch (error) {
    console.error('Error durante la búsqueda:', error);
    await conn.sendMessage(m.chat, { text: `*Error*\n${error.message || error}` }, { quoted: m });
  }
};

// Nuevo handler para descargar el APK seleccionado
const apkDownloadHandler = async (m, { conn, text }) => {
  if (!text) throw `⚠️ *_No se proporcionó una URL válida para descargar el APK_*`;

  try {
    await conn.sendMessage(m.chat, { 
      document: { url: text }, 
      mimetype: 'application/vnd.android.package-archive', 
      fileName: `app.apk`, 
      caption: `Aquí tienes tu APK solicitado:\n${text}`
    }, { quoted: m });

  } catch (error) {
    console.error('Error durante la descarga del APK:', error);
    await conn.sendMessage(m.chat, { text: `*Error*\nNo se pudo descargar el APK.` }, { quoted: m });
  }
};

handler.help = ['apk'];
handler.tags = ['descargas'];
handler.command = /^(apk)$/i;
handler.limit = 5;
handler.group = true;

apkDownloadHandler.command = /^(apkdownload)$/i;

export default handler;
export { apkDownloadHandler };

 


