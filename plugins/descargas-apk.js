import { search, download } from 'aptoide-scraper'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) throw `*Error*\n[ 💡 ] Ejemplo ${usedPrefix + command} WhatsApp Plus`
try {
  await m.react('🔄')
  await conn.sendMessage(m.chat, 
    { 
        text: '*🧿 Descargando el APK, por favor espera...*\n> Mientras esperas, sígueme en mi canal, crack 😎',
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
const searchResult = await search(text)
const data = await download(searchResult[0].id)
if (data.size.includes('GB') || parseFloat(data.size.replace(' MB', '')) > 300) {
return await conn.sendMessage(m.chat, { text: '*El archivo es demasiado pesado por lo que no se enviará.*' }, { quoted: m })
  await m.react('❌')
}
await conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null }, { quoted: m })
await m.react('✅')
} catch {
}}
 handler.help = ['apk'] 
 handler.tags = ['descargas'] 
handler.command = /^(apk)$/i
handler.limit = 5
export default handler
