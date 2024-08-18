import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
let handler  = async (m, { conn }) => {
let texto = `
╭─────────────┈⊷
│ *Hola 👋 para agregar el Bot a tu grupo se debe tener en cuenta:*
╰┬────────────┈⊷
┌┤ ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰
┌┤➳ _Usa .pg y el link de tu grupo_
┌┤➳ _Ejemplo: *.pg https://chat.whatsapp.com*_
┌┤➳ _El dueño del Bot evaluara el link lo mas pronto posible para ver si cumple con los requisitos minimos_
┌┤➳ _Si se cumple el Bot se unira al grupo_
╰┬────────────┈⊷
  │ *⚠️REGLAS PARA EL BOT EN EL GRUPO⚠️*
  │> Evite el Spam de comandos
  │> *Si el Bot es eliminado tendra que hablar con el dueño para que lo vuelva agregar*
  │> Si se ve saturacion de comandos en el grupo el Bot saldra del grupo
  │> Evite el privado y las llamadas al Bot
  │> _*Cualquier duda contacte al dueño del Bot con .sc*_
  │> GRACIAS POR PREFERIR A KANBOT🥀
  ╰────────────┈⊷` 
let aa = { quoted: m, userJid: conn.user.jid }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: `${texto}`.trim(), contextInfo: { externalAdReply: { title: 'Jxtxn17 ©', body: null, thumbnail: imagen2, sourceUrl: 'https://github.com/Jxtxn17/TurboBot-MD' }, mentionedJid: [m.sender] }}}, aa)
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })  
}
handler.tags = ['main']
handler.command = /^(instalarbot)/i
export default handler
