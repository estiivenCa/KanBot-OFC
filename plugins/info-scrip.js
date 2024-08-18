let handler = async (m, { conn, usedPrefix }) => {
let git = 'Hola, para cualquier duda del Bot puedes escribirme:\n\nꨄ *DUEÑO* * ⁨𝑺̳̽𝒕̳̽𝒊̳𝒊̳𝒗̳̽𝒙̳̽𝒏̳̽×፝֟͜×*\n\nꨄ *CONTACTO* *wa.me/67078859922*\n\nꨄ *SIGUEME* https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
await conn.sendUrl(m.chat, git, m, { externalAdReply: { mediaType: 1, renderLargerThumbnail: true, thumbnail: imagen2, title: '\t\t\t\t\t\t✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰', }})
 
}
handler.tags =['info'] 
handler.help = ['script'] 
handler.command = ['sc', 'script', 'codigo', 'git', 'github'] 
handler.register = true 
export default handler
