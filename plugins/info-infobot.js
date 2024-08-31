import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import os from "os";
import util from "util";
import sizeFormatter from "human-readable";
import MessageType from "@whiskeysockets/baileys";
import fs from "fs";
import { performance } from "perf_hooks";
const handler = async (m, { conn, usedPrefix }) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const totalreg = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats,
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"));
  const groups = chats.filter(([id]) => id.endsWith("@g.us"));
  const used = process.memoryUsage();
  const { restrict, antiCall, antiprivado, modejadibot } =
    global.db.data.settings[conn.user.jid] || {};
  const { autoread, gconly, pconly, self } = global.opts || {};
  const old = performance.now();
  const neww = performance.now();
  const speed = neww - old;
    await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key } })
  const info = `

╭━━━━━━･❪ ❁ ❫ ･━━━━━━
│➸ *⏰️Actividad*
│➸ *${uptime}*
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ *🧸Chats*
│➸ 𝘊𝘩𝘢𝘵𝘴 𝘗𝘳𝘪𝘷𝘢𝘥𝘰𝘴: *${chats.length - groups.length}*
│➸ 𝘊𝘩𝘢𝘵𝘴 𝘋𝘦 𝘎𝘳𝘶𝘱𝘰𝘴: *${groups.length}* 
│➸ 𝘊𝘩𝘢𝘵𝘴 𝘛𝘰𝘵𝘢𝘭𝘦𝘴: *${chats.length}* 
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰
╰━━━━━━･❪ ❁ ❫ ･━━━━━━❖`.trim();
  const doc = [
    "pdf",
    "zip",
    "vnd.openxmlformats-officedocument.presentationml.presentation",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const document = doc[Math.floor(Math.random() * doc.length)];
  const Message = {
    document: { url: `https://chat.whatsapp.com/C5xsN9KcmIs8O1wNeOkcX9` },
    mimetype: `application/${document}`,
    fileName: `「 ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ 」`,
    fileLength: 99999999999999,
    pageCount: 200,
    contextInfo: {
      forwardingScore: 200,
      isForwarded: true,
      externalAdReply: {
showAdAttribution: !![],
            mediaType: 0x1,
            previewType: "PHOTO",
        title: "by Stiiven",
        thumbnail: imagen10,
        renderLargerThumbnail: !![],
        sourceUrl: "https://chat.whatsapp.com/C5xsN9KcmIs8O1wNeOkcX9",
      },
    },
    caption: info,
    footer: wm,
    headerType: 6,
  };
  conn.sendMessage(m.chat, Message, { quoted: fakegif2 });
};
handler.help = ["infobot", "speed"];
handler.tags = ["info", "tools"];
handler.command = ['infobot'];
handler.register = true
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
