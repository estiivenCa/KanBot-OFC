import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
let stiker = false
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''

if (!/webp|image|video/g.test(mime) && !text) return m.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙑𝙄𝘿𝙀𝙊 𝘾𝙊𝙉 ${usedPrefix + command}*`)
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙀𝙇 𝙑𝙄́𝘿𝙀𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝘿𝙐𝙍𝘼𝙍 𝙈𝘼𝙎 𝘿𝙀 7 𝙎𝙀𝙂𝙐𝙉𝘿𝙊𝙎*')

if (/webp|image|video/g.test(mime)) {
let img = await q.download?.()
let out
stiker = await sticker(img, false, global.packname, global.author)
await conn.reply(m.chat, `_Calma crack estoy haciendo tu sticker 👏_\n\n_*Recuerda los stickersgif son de 6 segundos*_\n\n_*by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*_`, m, fake,)
  
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packname, global.author)
  
if (!stiker) errorMessage = 'ERROR'
}} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
else return m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙀𝙇 𝙀𝙉𝙇𝘼𝘾𝙀 / 𝙐𝙍𝙇 / 𝙇𝙄𝙉𝙆 𝙉𝙊 𝙀𝙎 𝙑𝘼́𝙇𝙄𝘿𝙊*')}

if (stiker) {
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
} else {
console.log(stiker)
}}

handler.command = /^(s(tickers?)?(image|video|gif|img)?)$/i
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
  
