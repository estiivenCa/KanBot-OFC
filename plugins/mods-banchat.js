let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `✅ *KanBot Ha Sido Desactivado En Este Chat*`, m, rcanal)

}
handler.help = ['banchat']
handler.tags = ['mods']
handler.command = ['banchat']
handler.mods = true;
handler.group = true;
export default handler
