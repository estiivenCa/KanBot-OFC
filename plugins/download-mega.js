import fetch from 'node-fetch';
import { File } from 'megajs'; // Importar la biblioteca de Mega
import path from 'path';

var handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
    var limit;
    if (isOwner || isPrems) {
        limit = 1000; // 1 GB
    } else {
        limit = 600; // 600 MB
    }

    if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙈𝙀𝙂𝘼*\n\n❕ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix}mega* https://mega.nz/file/yourfileid#yourfilekey`;

    if (!args[0].match(/mega/gi)) throw `[❗𝐈𝐍𝐅𝐎❗] 𝙇𝙄𝙉𝙆 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝙊*`;

    try {
        m.react('⏳'); // Reacción inicial mientras se procesa

        const fileUrl = args[0];
        const file = File.fromURL(fileUrl);
        await file.loadAttributes();

        // Limitar el tamaño del archivo si es necesario
        const fileSize = file.size;
        const isLimit = limit * 1024 * 1024 < fileSize;

        // Si el archivo excede el límite, se cancela la operación
        if (isLimit) {
            return m.reply(`*[❗𝐈𝐍𝐅𝐎❗] El archivo es demasiado grande para descargar. El límite es de ${limit}MB.*`);
        }

        // Descargar el archivo
        const buffer = await file.downloadBuffer();

        // Obtener el nombre del archivo y su extensión
        const fileName = file.name;
        const fileExtension = path.extname(fileName).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".apk": "application/vnd.android.package-archive", // Agregado para APK
        };
        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        // Enviar el archivo al chat
        await conn.reply(m.chat, 
            `💌 *Nombre:* ${fileName}\n📊 *Peso:* ${formatBytes(fileSize)}\n*🧿 Enviando, por favor espera...*\n> Mientras esperas, sígueme en mi canal, crack 😎`,
            m,
            {
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
            }
        );

        // Enviar el archivo si no excede el límite
        await conn.sendFile(m.chat, buffer, fileName, '', m, null, { mimetype, asDocument: true });

        m.react('✅'); // Reacción de éxito

    } catch (e) {
        m.react('❌'); // Reacción de error
        m.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊. 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙎𝙀𝙍 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙈𝙀𝙂𝘼*`);
        console.log(e);
    }
}

handler.help = ['mega'];
handler.tags = ['descargas'];
handler.command = ['mega'];
handler.diamond = true;
handler.register = true;
handler.group = true;

export default handler;

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
