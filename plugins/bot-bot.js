import fs from 'fs';
const handler = (m) => m;

handler.all = async function(m) {
    const chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    // Respuesta a "quien es el mejor bot"
    if (/^Quien es el mejor bot$/i.test(m.text)) {
        conn.reply(m.chat, `KanBot mi rey😎 `, m, rcanal);
    }
    
    // Respuesta a "quien es tu creador"
    if (/^Quien es tu creador$/i.test(m.text)) {
        conn.reply(m.chat, `Stiiven😌`, m, rcanal);
    }

    return !0;
};

export default handler;
