import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'

global.owner = [['573028488839', 'Kan', true],
['67078859922', 'KanV2', true]]

global.botNumberCode = ''
global.confirmCode = ''

global.suittag = ['573027866596']
global.mods = []
global.prems = []


global.packname = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'
global.author = ''
global.wm = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'
global.wm2 = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'
global.jxtxn = 'Kan'
global.cb = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'

//Las Versiones Y Entre Otros
global.vs = 'V2'
global.library = 'Baileys'
global.baileys = '@whiskeysockets/baileys'
global.lenguaje = 'Español'
global.menudi = ['⛶','❏','⫹⫺']
global.dev = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'
global.textbot = '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰'
global.devnum = ''

let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.yellow('Se actualizo el archivo config.js'))
import(`${file}?update=${Date.now()}`)
})
