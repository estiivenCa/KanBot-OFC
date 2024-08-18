import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `✳️ _Envie el texto_\n\n📌Ejemplo *${usedPrefix + command}* Kanixxx`

    try {
        // Obtiene el sticker usando la función `sticker`
        let stiker = await sticker(null, global.API('xteam', '/attp', { file: '', text }), global.packname, global.author)
        
        // Verifica si `stiker` es un buffer o archivo válido
        if (stiker) {
            // Envía el sticker al chat
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
        
        throw new Error('No se pudo generar el sticker.')
    } catch (err) {
        // Maneja el error y envía un mensaje de error
        throw new Error(err.message)
    }
}

handler.help = ['attp <text>']
handler.tags = ['sticker']
handler.command = ['attp']

export default handler
