let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Stiiven⁩;;\nFN:Stiiven⁩\nORG:Stiiven⁩\nTITLE:\nitem1.TEL;waid=573204545069:573204545069\nitem1.X-ABLabel:Stiiven\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:KanBot-OFC⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'Kan.By.Stiiven', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
