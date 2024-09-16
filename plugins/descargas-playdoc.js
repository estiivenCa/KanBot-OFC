import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import {youtubedl, youtubedlv2} from '@bochilteam/scraper'

const lolkeysapi = '8fdb6bf3e9d527f7a6476f4b'; // Aquí defines tu clave API

const handler = async (m, {conn, command, args, text, usedPrefix}) => {

if (!text) return conn.reply(m.chat, `🧿 *Ingrese un nombre de una cancion de YouTube*\n\nEjemplo, !${command} falling - Daniel Trevor`, m, fake)
m.react(rwait)

try {

conn.reply(m.chat, wait, m, {
  contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
  title: packname,
  body: wm,
  previewType: 0, 
  sourceUrl: channel }}}
)

const yt_play = await search(args.join(' '))
let additionalText = ''
if (command === 'play7' || command == 'playdoc') {
  additionalText = 'audio'
} else if (command === 'play8' || command == 'playdoc2') {
  additionalText = 'video'
}

let texto1 = `
┏◚◚◚◚🅓🅞🅒🅢◚◚◚◚┓
🍁 𝚃𝚒𝚝𝚞𝚕𝚘:
${yt_play[0].title}

🎀 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘:
${yt_play[0].ago}

🧿 𝚄𝚁𝙻:
${yt_play[0].url}

🖋️ 𝙰𝚞𝚝𝚘𝚛:
${yt_play[0].author.name}

📌 𝙲𝚊𝚗𝚊𝚕:
${yt_play[0].author.url}

⏰ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗:
${secondString(yt_play[0].duration.seconds)}

┗◛◛◛🅚🅐🅝🅑🅞🅣◛◛◛┛

𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚜𝚞 ${additionalText}, 𝙿𝚘𝚛 𝙵𝚊𝚟𝚘𝚛 𝙴𝚜𝚙𝚎𝚛𝚎 
`.trim()

await conn.sendMessage(m.chat, { text: texto1, contextInfo: { externalAdReply: { title: yt_play[0].title, body: dev, thumbnailUrl: yt_play[0].thumbnail, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, { quoted: fkontak })

if (command == 'play7' || command == 'playdoc') {
  try {
    let q = '128kbps'
    let v = yt_play[0].url
    let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
    let dl_url = await yt.audio[q].download()
    let ttl = await yt.title
    let size = await yt.audio[q].fileSizeH
    await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: fkontak })
  } catch {
    try {
      let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`)
      let lolh = await lolhuman.json()
      let n = lolh.result.title || 'error'
      await conn.sendMessage(m.chat, { document: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mpeg' }, { quoted: fkontak })
    } catch {
      try {
        // Intento con la API alternativa delirius para play7
        let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp3?url=${yt_play[0].url}`)
        let delirius = await deliriusResponse.json()
        let title = delirius.title || 'error'
        let link = delirius.link
        await conn.sendMessage(m.chat, { document: { url: link }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: fkontak })
      } catch {
        await conn.reply(m.chat, '*❌ Ocurrió un error, intente de nuevo*', m, fake)
      }
    }
  }
}

if (command == 'play8' || command == 'playdoc2') {
  try {
    const qu = '360'
    const q = qu + 'p'
    const v = yt_play[0].url
    const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
    const dl_url = await yt.video[q].download()
    const ttl = await yt.title
    const size = await yt.video[q].fileSizeH
    await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', thumbnail: await fetch(yt.thumbnail) }, { quoted: fkontak })
  } catch {
    try {
      let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${yt_play[0].url}`)
      let lolh = await lolhuman.json()
      let n = lolh.result.title || 'error'
      let n2 = lolh.result.link
      let n4 = lolh.result.thumbnail
      await conn.sendMessage(m.chat, { document: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', thumbnail: await fetch(n4) }, { quoted: fkontak })
    } catch {
      try {
        // Intento con la API alternativa delirius para play8
        let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4v2?url=${yt_play[0].url}`)
        let delirius = await deliriusResponse.json()
        let title = delirius.title || 'error'
        let link = delirius.link
        await conn.sendMessage(m.chat, { document: { url: link }, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: fkontak })
      } catch {
        await conn.reply(m.chat, '*❌ Ocurrió un error, intente de nuevo*', m, fake)
      }
    }
  }
}

} catch {
  return conn.reply(m.chat, '*❌ Ocurrió un error, intente de nuevo*', m, fake)
}
}

handler.help = ['play3', 'play4']
handler.tags = ['descargas']
handler.command = ['playdoc', 'playdoc2', 'play7', 'play8']
handler.group = true;
//handler.estrellas = 1
handler.register = true

export default handler

// Funciones auxiliares como search(), secondString(), bytesToSize(), ytMp3(), ytMp4(), ytPlay(), ytPlayVid()


async function search(query, options = {}) {
var search = await yts.search({query, hl: 'es', gl: 'ES', ...options})
return search.videos
}

function MilesNumber(number) {
var exp = /(\d)(?=(\d{3})+(?!\d))/g
var rep = '$1.'
var arr = number.toString().split('.')
arr[0] = arr[0].replace(exp, rep)
return arr[1] ? arr.join('.') : arr[0]
}

function secondString(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24))
var h = Math.floor((seconds % (3600 * 24)) / 3600)
var m = Math.floor((seconds % 3600) / 60)
var s = Math.floor(seconds % 60)
var dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : ''
var hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : ''
var mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : ''
var sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : ''
return dDisplay + hDisplay + mDisplay + sDisplay
}

function bytesToSize(bytes) {
return new Promise((resolve, reject) => {
var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
if (bytes === 0) return 'n/a'
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
if (i === 0) resolve(`${bytes} ${sizes[i]}`)
resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)
})
}

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl.getInfo(url).then(async (getUrl) => {
var result = []
for (let i = 0; i < getUrl.formats.length; i++) {
var item = getUrl.formats[i]
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
var {contentLength} = item
var bytes = await bytesToSize(contentLength)
result[i] = {audio: item.url, size: bytes}
}
}
var resultFix = result.filter((x) => x.audio != undefined && x.size != undefined)
var tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`)
var tinyUrl = tiny.data;
var title = getUrl.videoDetails.title;
var thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
resolve({title, result: tinyUrl, result2: resultFix, thumb})
}).catch(reject)
})
}

async function ytMp4(url) {
return new Promise(async (resolve, reject) => {
ytdl.getInfo(url).then(async (getUrl) => {
var result = []
for (let i = 0; i < getUrl.formats.length; i++) {
var item = getUrl.formats[i]
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
var {qualityLabel, contentLength} = item
var bytes = await bytesToSize(contentLength)
result[i] = {video: item.url, quality: qualityLabel, size: bytes}
}}
var resultFix = result.filter((x) => x.video != undefined && x.size != undefined && x.quality != undefined)
var tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`)
var tinyUrl = tiny.data
var title = getUrl.videoDetails.title
var thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
resolve({title, result: tinyUrl, rersult2: resultFix[0].video, thumb})
}).catch(reject)
})
}

async function ytPlay(query) {
return new Promise((resolve, reject) => {
yts(query).then(async (getData) => {
var result = getData.videos.slice( 0, 5 )
var url = []
for (let i = 0; i < result.length; i++) {
url.push(result[i].url)
}
var random = url[0]
var getAudio = await ytMp3(random)
resolve(getAudio)
}).catch(reject)
})
}

async function ytPlayVid(query) {
return new Promise((resolve, reject) => {
yts(query).then(async (getData) => {
var result = getData.videos.slice( 0, 5 )
var url = []
for (let i = 0; i < result.length; i++) {
url.push(result[i].url)
}
var random = url[0]
var getVideo = await ytMp4(random)
resolve(getVideo)
}).catch(reject)
})}
