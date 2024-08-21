import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'

var handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘾𝙊𝙉 ${usedPrefix + command} 𝘼𝙇 𝘼𝙐𝘿𝙄𝙊 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝙍 𝙀𝙉 𝙑𝙄𝘿𝙀𝙊*`
let mime = m.quoted.mimetype || ''
if (!/webp|audio/.test(mime)) throw `*[❗𝐈𝐍𝐅𝐎❗] RESPONDE CON ${usedPrefix + command} 𝘼𝙇 𝘼𝙐𝘿𝙄𝙊 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝙍 𝙀𝙉 𝙑𝙄𝘿𝙀𝙊*`
let media = await m.quoted.download()
let out = Buffer.alloc(0)
if (/webp/.test(mime)) {
out = await webp2mp4(media)
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, [
'-filter_complex', 'color',
'-pix_fmt', 'yuv420p',
'-crf', '51',
'-c:a', 'copy',
'-shortest'
], 'mp3', 'mp4')

}
await conn.sendFile(m.chat, out, 'error.mp4', '*🧃 𝘼𝙌𝙐𝙄 𝙀𝙎𝙏𝘼 𝙏𝙐 𝙑𝙄𝘿𝙀𝙊*', fkontak, m, 0, { thumbnail: out })

}
handler.help = ['tovideo']
handler.tags = ['transformador']
handler.command = ['tovideo']

handler.limit = true

export default handler
