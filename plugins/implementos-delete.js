var handler = async (m, {conn}) => {

if (!m.quoted) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍*`

try {
let key = {}

try {
key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant
} catch (e) {
console.error(e)
}
return conn.sendMessage(m.chat, {delete: key})
} catch {
return conn.sendMessage(m.chat, {delete: m.quoted.vM.key})
}
}

handler.help = ['delete']
handler.tags = ['implementos']
handler.command = /^del(ete)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
