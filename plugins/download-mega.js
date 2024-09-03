import { File } from "megajs";
import path from "path";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        // Verificación inicial del texto (enlace MEGA)
        if (!text) return m.reply(`${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`, m);

        // Obtener el archivo desde el enlace MEGA
        const file = File.fromURL(text);
        await file.loadAttributes();

        // Verificación del tamaño del archivo
        if (file.size >= 300000000) return m.reply('Error: El archivo es grande (Máximo tamaño: 300MB)');

        // Mensaje de descarga en progreso
        const downloadingMessage = `🌩️ Descargando Archivo... Por favor, espera.`;
        m.reply(downloadingMessage);

        // Mensaje de éxito al descargar el archivo
        const caption = `*_Descarga exitosa..._*\nFile: ${file.name}\nSize: ${formatBytes(file.size)}`;

        // Descargar el archivo a un buffer
        const data = await file.downloadBuffer();

        // Determinar la extensión y el tipo MIME del archivo
        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        // Convertir m.chat a string para evitar errores
        const chatId = String(m.chat);

        // Enviar el archivo
        await conn.sendFile(chatId, data, file.name, caption, m, null, { mimetype, asDocument: true });

    } catch (error) {
        // Manejo de errores
        return m.reply(`Error: ${error.message}`);
    }
}

// Definición del comando en el handler
handler.help = ["mega"];
handler.tags = ["downloader"];
handler.command = /^(mega)$/i;

export default handler;

// Función para formatear bytes a unidades legibles
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
