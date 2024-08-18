import fs from "fs" 
 let handler = m => m 
 handler.all = async function (m) { 
 let bot = `*🚀 Hola soy ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ El Mejor Bot de Whatsapp😎🥀*\nEn que te puedo ayudar?` 
 let vn = [imagen1, imagen2].getRandom() 
 let chat = global.db.data.chats[m.chat] 
 if (/^bot$/i.test(m.text) && !chat.isBanned) {  
 conn.sendPresenceUpdate('recording', m.chat)     
 conn.sendFile(m.chat, vn, 'bot.jpg', bot, m, true, { type: 'conversation', ptt: true, sendEphemeral: true, quoted: estilo })} 
 return !0 
 } 
 export default handler
