import fetch from "node-fetch" 
  
var handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
 
let query = '*[❗𝐈𝐍𝐅𝐎❗] 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝙂𝙀𝙉𝙀𝙍𝘼𝙇 𝙄𝙈𝘼́𝙂𝙀𝙉𝙀𝙎 𝘼 𝙋𝘼𝙍𝙏𝙄𝙍 𝘿𝙀 𝙏𝙀𝙓𝙏𝙊𝙎*.\n\n❕ EJEMPLO\n*.fotoai* Universo azul con estrellas verdes'
let text
if (args.length >= 1) {
text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text
} else throw query
try {
conn.reply(m.chat, '*🚀 C A R G A N D O*', fkontak, m)
await Draw(text).then((img) => {
conn.sendFile(m.chat, img, text, '*🍧 Resultado de* ' + text, m)
})
} catch (e) {
throw eror
} 

}
handler.help = ['dalle']
handler.tags = ['ai']
handler.command = /^(dalle|openiamage|aiimage|aiimg|aimage|iaimagen|openaimage|openaiimage)/i
  
export default handler 
  
async function Draw(propmt) {
const Blobs = await fetch(
"https://api-inference.huggingface.co/models/prompthero/openjourney-v2",
{
method: "POST",
headers: {
"content-type": "application/json",
Authorization: "Bearer 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",
},
body: JSON.stringify({ inputs: propmt }),
})
.then((res) => res.blob())
const arrayBuffer = await Blobs.arrayBuffer()
const buffer = Buffer.from(arrayBuffer)
return buffer
}