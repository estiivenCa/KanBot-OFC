const free = 25
const prem = 15
let handler = async (m, {conn, isPrems }) => {
let exp = `${pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
  let d = Math.floor(Math.random() * 30)
  global.db.data.users[m.sender].diamond += d
  let time = global.db.data.users[m.sender].lastclaim + 7200000 //2 Horas
  if (new Date - global.db.data.users[m.sender].lastclaim < 7200000) throw `*🕚 Vuelve en ${msToTime(time - new Date())}* `
  global.db.data.users[m.sender].exp += exppremium ? prem : exp
  m.reply(`🎁 *RECOMPENSA DIARIA*

*✒ Has recibido:*
🆙 *XP* : +${isPrems ? exppremium : exp}
💎 *DIAMANTE* : +${d}`)
  global.db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['rg']
handler.command = ['daily', 'claim'] 
handler.register = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}

