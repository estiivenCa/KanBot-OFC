import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args }) => {
    // Comando para el bot
    handler.command = ['app'];

    if (!args[0]) {
        return conn.reply(m.chat, '[ 🌟 ] Ingresa el nombre de la aplicación que quieres descargar. Ejemplo:\nClash Royale', m);
    }

    let appName = args.join(' ');

    try {
        const packageName = await buscarPackage(appName);
        if (!packageName) {
            return conn.reply(m.chat, '[ ❌ ] No se encontró la aplicación en Aptoide.', m);
        }

        const apkUrl = `https://es.aptoide.com/download?package_name=${packageName}&store_name=aptoide-web&entry_point=appstore_appview_header_desktop_v10&utm_medium=appview&utm_content=desktop&utm_source=web&utm_campaign=apkfy`;
        const apkBuffer = await descargarAPK(apkUrl);

        await conn.sendFile(m.chat, apkBuffer, `${appName}.apk`, 'Aquí tienes tu APK!', m);
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '[ ❌ ] Hubo un error al intentar descargar la APK.', m);
    }
};

// Función para buscar el nombre del paquete en Aptoide
async function buscarPackage(appName) {
    const searchUrl = `https://es.aptoide.com/search/${encodeURIComponent(appName)}`;
    const response = await axios.get(searchUrl);
    
    const $ = cheerio.load(response.data);
    
    // Extraer el nombre del paquete
    const packageName = $('a[data-testid="app-link"]').first().attr('href').split('/')[2];
    
    return packageName ? packageName : null;
}

// Función para descargar el APK
async function descargarAPK(apkUrl) {
    const response = await axios.get(apkUrl, { responseType: 'arraybuffer' });
    return response.data; // Devuelve el buffer del APK
}

// Exportar el handler
export default handler;
