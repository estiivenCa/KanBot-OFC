import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs' 
 import cheerio from 'cheerio'
/* import * as cheerio from 'cheerio';  */
import fetch from 'node-fetch'
import axios from 'axios'
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import moment from 'moment-timezone' 
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
const __dirname = global.__dirname(import.meta.url)

//Imagenes
global.imagen1 = fs.readFileSync('./storage/logos/Menu1.jpg')
global.imagen2 = fs.readFileSync('./storage/logos/Menu2.jpg')
global.imagen3 = fs.readFileSync('./storage/logos/Menu3.jpg')
global.imagen4 = fs.readFileSync('./storage/logos/Menu4.jpg')

global.nuevobot = fs.readFileSync('./src/nuevobot.jpg')
global.prebot = fs.readFileSync('./src/Pre Bot Publi.png')
global.stickerAMX = fs.readFileSync('./src/Curiosity.webp')

global.config = fs.readFileSync('./storage/imagenes/configuraciones.jpg')
global.suerte = fs.readFileSync('./storage/imagenes/suerte.jpg')
global.oracion = fs.readFileSync('./storage/imagenes/oracion.jpg')
global.rosas = fs.readFileSync('./storage/imagenes/rosas.jpg')
global.refran = fs.readFileSync('./storage/imagenes/refran.jpg')
global.linksjpg = fs.readFileSync('./storage/imagenes/Links.jpg')

global.img = 'https://telegra.ph/file/814e64f578d98e4244a3d.jpg'
global.img1 = 'https://telegra.ph/file/74b7c003d04dec5875ba0.jpg'
global.img2 = 'https://telegra.ph/file/9223caecc3e7b731073e2.jpg'
global.img3 = 'https://telegra.ph/file/7deef65f6a53ecdd51cdd.jpg'
global.img4 = 'https://telegra.ph/file/4f023f918af2bde72c839.jpg'
global.img5 = 'https://telegra.ph/file/a34ebad4c9b5963c82f1a.jpg'
global.img6 = 'https://telegra.ph/file/4e69f6c48d99f6c1174a9.jpg'
global.img7 = 'https://telegra.ph/file/951275803faa754aff010.jpg'

global.sityImg = [img, img1, img2, img3, img4, img5, img6, img7]

//Enlaces
global.yt = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
global.ig = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
global.md = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
global.paypal = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
global.git = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N'
global.nn = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //Grupo ofc
global.Curiosity = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //Curiosity OFC
global.hachiko = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //Hachiko OFC
global.Lobo = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //Lobo OFC
global.nnn = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //Bailey global
global.channel = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //BaileyBot-MD
global.nnnn = 'https://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N' //colaboración multi bots
global.linkSity = [yt, ig, md, paypal, git, nn]

//Raíz
global.raiz = './'
global.aniD = 'sessions/'
global.dirP = raiz//+aniD
global.authFile = join(__dirname, `sessions/`)
global.authFileRespald = join(__dirname, `sesionRespaldo/`)
global.temp = join(__dirname, 'tmp')
global.media = raiz+'media/'
global.jadibts = join(__dirname, 'jadibts/')
global.raiz = './storage/logos/Menu1.jpg'

//Reacciones
global.rwait = '⌛'
global.done = '✅'
global.error = '❌'

//Cargando
global.wait = '*■□□□□ 20%*'
global.waitt = '*■■■□□ 60%*'
global.waittt = '*■■■■□ 90%*'
global.waitttt = '*■■■■■ 100%*'

//fake
global.fsizedoc = '999999'
global.fpagedoc = '999'

//Apis
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']
global.itsrose = ['4b146102c4d500809da9d1ff']

global.APIs = {
amel: 'https://melcanz.com',
bx: 'https://bx-hunter.herokuapp.com',
nrtm: 'https://nurutomo.herokuapp.com',
xteam: 'https://api.xteam.xyz',
nzcha: 'http://nzcha-apii.herokuapp.com',
bg: 'http://bochil.ddns.net',
fdci: 'https://api.fdci.se',
dzx: 'https://api.dhamzxploit.my.id',
bsbt: 'https://bsbt-api-rest.herokuapp.com',
zahir: 'https://zahirr-web.herokuapp.com',
zeks: 'https://api.zeks.me',
hardianto: 'https://hardianto-chan.herokuapp.com',
pencarikode: 'https://pencarikode.xyz',
LeysCoder: 'https://leyscoders-api.herokuapp.com',
adiisus: 'https://adiixyzapi.herokuapp.com',
lol: 'https://api.lolhuman.xyz',
fgmods: 'https://api-fgmods.ddns.net',
pencarikode: 'https://pencarikode.xyz',
Velgrynd: 'https://velgrynd.herokuapp.com',
rey: 'https://server-api-rey.herokuapp.com',
hardianto: 'http://hardianto-chan.herokuapp.com',
shadow: 'https://api.reysekha.xyz',
apialc: 'https://api-alc.herokuapp.com',
botstyle: 'https://botstyle-api.herokuapp.com',
neoxr: 'https://neoxr-api.herokuapp.com',
ana: 'https://anabotofc.herokuapp.com/',
kanx: 'https://kannxapi.herokuapp.com/',
dhnjing: 'https://dhnjing.xyz'
},

global.APIKeys = {
'https://api-alc.herokuapp.com': 'ConfuMods',
'https://api.reysekha.xyz': 'apirey',
'https://melcanz.com': 'F3bOrWzY',
'https://bx-hunter.herokuapp.com': 'Ikyy69',
'https://api.xteam.xyz': '5bd33b276d41d6b4',
'https://zahirr-web.herokuapp.com': 'zahirgans',
'https://bsbt-api-rest.herokuapp.com': 'benniismael',
'https://api.zeks.me': 'apivinz',
'https://hardianto-chan.herokuapp.com': 'hardianto',
'https://pencarikode.xyz': 'pais',
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://leyscoders-api.herokuapp.com': 'MIMINGANZ',
'https://server-api-rey.herokuapp.com': 'apirey',
'https://api.lolhuman.xyz': 'GataDios',
'https://botstyle-api.herokuapp.com': 'Eyar749L',
'https://neoxr-api.herokuapp.com': 'yntkts',
'https://anabotofc.herokuapp.com/': 'AnaBot'
}

//Rpg
global.multiplier = 100 // Cuanto más alto, más difícil subir de nivel

global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
level: '🏆',
limit: '💎',
exp: '🕹️'
}
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}}

//Tiempo
global.d = new Date(new Date + 3600000) 
global.locale = 'es' 
global.dia = d.toLocaleDateString(locale, { weekday: 'long' }) 
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' }) 
global.mes = d.toLocaleDateString('es', { month: 'long' }) 
global.año = d.toLocaleDateString('es', { year: 'numeric' }) 
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })


//No muevas nada de aqui
let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.yellowBright('Se actualizo el archivo store.js'))
import(`${file}?update=${Date.now()}`)
})
