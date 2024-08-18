import moment from 'moment-timezone'
  
export async function before(m) {

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return
  
let user = global.db.data.users[m.sender]

if (new Date() - user.pc < 21600000) return
await m.reply(`👋 Hola ${nombre}!!
 *${saludo}*

📅 Fecha: ${fecha}
⏰ Hora: ${tiempo}

*◉ 𝙽𝙾 𝙴𝙽𝚅𝙸𝙴́ 𝚂𝙿𝙰𝙼 𝙰𝙻 𝙱𝙾𝚃*
*◉ 𝙴𝚂𝙲𝚁𝙸𝙱𝙰 .𝙼𝙴𝙽𝚄́ 𝙿𝙰𝚁𝙰 𝚅𝙴𝚁 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂*
*◉ 𝙿𝙰𝚁𝙰 𝙰𝙶𝚁𝙴𝙶𝙰𝚁 𝙴𝙻 𝙱𝙾𝚃 𝙰 𝚄𝙽 𝙶𝚁𝚄𝙿𝙾 𝚄𝚂𝙰 .𝙸𝙽𝚂𝚃𝙰𝙻𝙰𝚁𝙱𝙾𝚃*
*◉ SIGUEME:* https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N`) 
user.pc = new Date * 1
}
