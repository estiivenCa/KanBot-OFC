import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  try {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
  const {money, joincount} = global.db.data.users[m.sender];
  const {exp, limit, level, role} = global.db.data.users[m.sender];
  const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
  const fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': imagen1, thumbnail: imagen1 ,sendEphemeral: true}}};
    await conn.reply(m.chat, '𝙀𝙣 𝙗𝙧𝙚𝙫𝙚 𝙨𝙚 𝙚𝙣𝙫𝙞𝙖𝙧𝙖 𝙚𝙡 𝙢𝙚𝙣𝙪 𝙥𝙖𝙧𝙖 𝙖𝙙𝙪𝙡𝙩𝙤𝙨. . .', m, { contextInfo:{ forwardingScore: 2024, isForwarded: true, externalAdReply: {title: '👋 ᕼOᒪᗩ!!', body: 'sɪɢᴜᴇᴍᴇ ᴇɴ ɪɴsᴛᴀɢʀᴀᴍ', sourceUrl: global.channel, thumbnail: await (await fetch(pp)).buffer() }}})
//m.react('🐶');
    await conn.sendMessage(m.chat, { react: { text: '🥵', key: m.key } })
  let txt =`┏━━━━━━━━━━━━━━━━┓
┣⟣☯︎ 𝙾𝚆𝙽𝙴𝚁: 𝙹𝚇𝚃𝚇𝙽𝟷𝟽
┣⟣☯︎ 𝙸𝙳𝙸𝙾𝙼𝙰: 𝙴𝚂𝙿𝙰𝙽̃𝙾𝙻 
┣⟣☯︎ 𝙵𝙴𝙲𝙷𝙰: ${date}
┗━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━┓
*┃❍ 𝙼𝙴𝙽𝚄 𝙷𝙾𝚃 ❍*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡┃
┣⟣❥  _${usedPrefix}pack_
┣⟣❥  _${usedPrefix}pack2_
┣⟣❥  _${usedPrefix}pack3_
┣⟣❥  _${usedPrefix}videoxxx_
┣⟣❥  _${usedPrefix}videolesbixxx_
┣⟣❥  _${usedPrefix}tetas_
┣⟣❥  _${usedPrefix}booty_
┣⟣❥  _${usedPrefix}ecchi_
┣⟣❥  _${usedPrefix}furro_
┣⟣❥  _${usedPrefix}imagenlesbians_
┣⟣❥  _${usedPrefix}panties_
┣⟣❥  _${usedPrefix}pene_
┣⟣❥  _${usedPrefix}porno_
┣⟣❥  _${usedPrefix}randomxxx_
┣⟣❥  _${usedPrefix}pechos_
┣⟣❥  _${usedPrefix}yaoi_
┣⟣❥  _${usedPrefix}yaoi2_
┣⟣❥  _${usedPrefix}yuri_
┣⟣❥  _${usedPrefix}yuri2_
┣⟣❥  _${usedPrefix}trapito_
┣⟣❥  _${usedPrefix}hentai_
┣⟣❥  _${usedPrefix}nsfwloli_
┣⟣❥  _${usedPrefix}nsfworgy_
┣⟣❥  _${usedPrefix}nsfwfoot_
┣⟣❥  _${usedPrefix}nsfwass_
┣⟣❥  _${usedPrefix}nsfwbdsm_
┣⟣❥  _${usedPrefix}nsfwcum_
┣⟣❥  _${usedPrefix}nsfwero_
┣⟣❥  _${usedPrefix}nsfwfemdom_
┣⟣❥  _${usedPrefix}nsfwglass_
┣⟣❥  _${usedPrefix}hentaipdf *<texto>*_
┣⟣❥  _${usedPrefix}hentaisearch *<texto>*_
┗━━━━━━━━━━━━━━━━┛`;
   await conn.sendMessage(m.chat, {text: txt.trim(), mentions: [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [...txt.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": '乂 𝙱 𝙰 𝙸 𝙻 𝙴 𝚈 - 𝙱 𝙾 𝚃 - 𝙼 𝙳 乂', "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen2, "mediaUrl": global.channel, "sourceUrl": global.gp1}}}, {quoted: fkon});
 // m.react('🎮');
  } catch {
    conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝙼𝙴𝙽𝚄 𝚃𝙸𝙴𝙽𝙴 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙿𝙾𝚁𝙵𝙰𝚅𝙾𝚁 𝚄𝚂𝙴 𝙴𝙻 .allmenu*', m);
  }
};
handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(labiblia|menuxxx|menuhorny)$/i;
export default handler;
                                                                                                                                                                                                                                                                
