import Scraper from '@SumiFX/Scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🍁 Ingresa un enlace de Instagram.')
try {
conn.reply(m.chat, '*🧿 Descargando su video de Instagram espera un momento\n\n> Mientras esperas sigueme en mi canal crack 😎*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0,
sourceUrl: channel }}})
let { dl_url } = await Scraper.igdl(args[0])
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: `✅️ *Su Video De Instagram by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*` }, { quoted: fkontak})
} catch (e) {
  console.log(e)
  m.reply('🍁  Ocurrió un error inesperado.')
}}

handler.help = ['ig <enlace>']
handler.tags = ['descargas']
handler.command = ['ig', 'instagram']
handler.register = true
handler.limit = 1

export default handler
