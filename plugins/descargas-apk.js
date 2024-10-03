let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    if (!args[0]) throw `\`\`\`[ 🌟 ] Ingresa el nombre de la aplicación que quieres descargar. Ejemplo:\n${usedPrefix + command} Clash Royale\`\`\``;

    let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${args[0]}`);
    let result = await res.json();
    let { name, size, lastUpdate, icon } = result;
    let URL = result.dllink;
    let packe = result.package;

    // Convertir el tamaño a MB
    let sizeInMB;
    if (size.includes('GB')) {
        sizeInMB = parseFloat(size) * 1024; // Convertir de GB a MB
    } else if (size.includes('MB')) {
        sizeInMB = parseFloat(size); // Ya está en MB
    } else {
        throw `El tamaño del archivo no está en un formato reconocido: ${size}`;
    }

    // Verificar si el tamaño supera los 200 MB
    if (sizeInMB > 200) {
        await conn.sendMessage(m.chat, `⚠️ El archivo supera el límite de 200 MB. Tamaño: ${size}. No se puede enviar.`, { quoted: m });
        return;
    }

    let texto = `❯───「 APK DOWNLOAD 」───❮
    𝌡 Nombre : ⇢ ${name} 📛
    𝌡 Tamaño : ⇢ ${size} ⚖️
    𝌡 Package : ⇢ ${packe} 📦
    𝌡 Actualizado : ⇢ ${lastUpdate} 🗓️
    
## Su aplicación se enviará en un momento POR FAVOR ESPERE . . .
`;

    await conn.sendFile(m.chat, icon, name + '.jpg', texto, m);

    await conn.sendMessage(m.chat, { document: { url: URL }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: '' }, { quoted: m });
}

handler.command = ['apk', 'apkdl', 'modapk'];
handler.help = ['apk'];
handler.tags = ['descargas'];
handler.group = true;
handler.estrellas = 5;

export default handler;
