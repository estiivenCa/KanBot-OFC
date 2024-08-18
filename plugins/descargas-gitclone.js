import fetch from 'node-fetch'

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
var handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw `*⚠️ ESCRIBA EL ENLACE DE UN REPOSITORIO DE GITHUB*\n\n❕ EJEMPLO\n*${usedPrefix + command}* https://github.com/Jxtxn17/BaileyBot-MD`
if (!regex.test(args[0])) throw `*⚠️ ENLECE NO VALIDO*`
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
m.reply(`*🚀 D E S C A R G A N D O*`)
conn.sendFile(m.chat, url, filename, null, fliveLoc, m)

}
handler.help = ['gitclone']
handler.tags = ['descargas']
handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i
handler.limit = true
handler.register = true

export default handler
