let media = './storage/logos/Menu2.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let str = `*「 ⚠️REGLAS PARA EL BOT EN EL GRUPO⚠️ 」*
╍╍┅╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
 │> Evite el Spam de comandos.
 │> *Si el Bot es eliminado tendra que hablar con el dueño para que lo vuelva agregar*
 │> Si se ve saturacion de comandos en el grupo el Bot saldra del grupo.
 │> Evite el privado y las llamadas al Bot de lo contrario sera bloqueado.
╍┅┅┅┅┅┅┅╍╍╍╍╍┅╍┅╍╍
👑 _*Cualquier duda contacte al dueño del Bot con .sc*_
╍╍┅┅┅┅┅┅┅╍╍╍╍╍╍╍╍╍
 GRACIAS POR PREFERIR A KANBOT DISFRUTELO CON MODERACION.🥀
 ╍╍┅┅┅┅┅┅┅╍╍╍╍╍╍╍╍╍`
await conn.sendFile(m.chat, media, 'Curiosity.jpg', str, fkontak)}
handler.tags = ['main']
handler.command = /^reglas|donazazqsi$/i
handler.exp = 35
handler.register = true
export default handler
