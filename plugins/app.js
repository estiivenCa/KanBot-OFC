const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, '[ 🌟 ] Ingresa el nombre de la aplicación que quieres descargar. Ejemplo:\nClash Royale', m);
    }

    let appName = args.join(' ');
    let searchUrl = `https://ws75.aptoide.com/api/7/search?q=${encodeURIComponent(appName)}&limit=1`;

    try {
        // Paso 1: Realiza la búsqueda en Aptoide
        let response = await fetch(searchUrl);
        if (!response.ok) throw new Error('Error al buscar la aplicación.');

        let data = await response.json();
        if (data.datalist && data.datalist.list.length > 0) {
            let app = data.datalist.list[0];
            let apkUrl = app.file.path; // URL de descarga del APK
            let appTitle = app.name; // Nombre de la aplicación

            // Paso 2: Descargar el APK
            let filePath = path.resolve(__dirname, 'temp', `${appTitle}.apk`);
            let fileStream = fs.createWriteStream(filePath);

            conn.reply(m.chat, `🔍 Aplicación encontrada: *${appTitle}*\n\n📥 Descargando el APK, por favor espera...`, m);

            // Descargar el archivo APK
            let downloadResponse = await fetch(apkUrl);
            if (!downloadResponse.ok) throw new Error('Error al descargar el APK.');
            downloadResponse.body.pipe(fileStream);

            // Esperar a que termine de escribir el archivo antes de enviar
            fileStream.on('finish', async () => {
                // Paso 3: Enviar el archivo APK al chat
                await conn.sendFile(m.chat, filePath, `${appTitle}.apk`, null, m);

                // Paso 4: Limpiar el archivo temporal
                fs.unlinkSync(filePath);
                conn.reply(m.chat, '[ ✔️ ] APK enviado con éxito!', m);
            });

            // Manejo de errores en el proceso de descarga
            fileStream.on('error', (err) => {
                console.error('Error al escribir el archivo:', err);
                fs.unlinkSync(filePath); // Eliminar el archivo en caso de error
                conn.reply(m.chat, '[ ❌ ] Ocurrió un error al descargar el APK.', m);
            });
        } else {
            conn.reply(m.chat, '[ ❌ ] No se encontró ninguna aplicación con ese nombre. Intenta con otro nombre.', m);
        }
    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, '[ ⚠️ ] Ocurrió un error al procesar tu solicitud.', m);
    }
};

handler.command = /^(app)$/i;
module.exports = handler;
