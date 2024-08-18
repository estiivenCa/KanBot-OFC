import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  const prohibited = ['se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o', 'ntr', 'rule34', 'rule', 'caca', 'polla', 'femjoy', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito', 'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'nalga', 'nalgas']
let foundProhibitedWord = prohibited.find(word => m.text.toLowerCase().includes(word));
if (foundProhibitedWord) return conn.reply(m.chat, `🚩 *No daré resultado a tu solicitud* - Palabra prohibida: ${foundProhibitedWord}`, m);
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊*\n\n💡 𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} Kan wapo*`
m.react(done)
const res = await googleImage(text)
let image = res.getRandom()
let link = image
conn.sendFile(m.chat, link, 'error.jpg', `📍 *Resultado de:* ${text}
🔎 *𝘽𝙪𝙨𝙘𝙖𝙙𝙤 𝙚𝙣:* 𝙂𝙤𝙤𝙜𝙡𝙚`, fliveLoc, m, fake) 
}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['dl']
handler.command = /^(gimage|image|imagen)$/i
handler.exp = 20
handler.register = true
export default handler
