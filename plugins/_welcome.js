import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let welc = welcome;
  let adi = adios;
   let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/ylgu47w3')
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let userName;

  try {
    userName = global.db.data.users[who]?.name || await conn.getName(who);
  } catch (error) {
    console.error('Error al obtener el nombre del usuario:', error);
    userName = 'Usuario'; // Nombre por defecto en caso de error
  }

  if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, {
      text: `╭══•🔥ೋ•๑♡๑•ೋ🔥•══╮\n¡Bienvenido/a, @${m.messageStubParameters[0].split`@`[0]}!\n╰══•🔥 ೋ•๑♡๑•ೋ 🔥•══╯\nEsperamos que disfrutes tu estancia en el grupo.\n🥀*ੈ✩‧₊˚༺☆༻*ੈ✩˚🍁`,
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
          "thumbnail": welc,
          "title": "  ͟͞ Ｗ Ｅ Ｌ Ｃ Ｏ Ｍ Ｅ ͟͞  ",
          "body": `${userName}!`,
          "previewType": "PHOTO",
          "thumbnailUrl": null,
          "showAdAttribution": true,
          sourceUrl: [yt, md, channel].sort(() => 0.5 - Math.random())[0]
        }
      }
    }, { quoted: fkontak });
  }

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, {
      text: `╭══•🔥ೋ•๑♡๑•ೋ🔥•══╮\n¡Adiós, @${m.messageStubParameters[0].split`@`[0]}!\n╰══•🔥 ೋ•๑♡๑•ೋ 🔥•══╯\nGracias por haber estado con nosotros.\n🥀*ੈ✩‧₊˚༺☆༻*ੈ✩˚🍁`,
      contextInfo: {
        mentionedJid: getMentionedJid(),
        "externalAdReply": {
          "thumbnail": adi,
          "title": '  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  ',
          "body": `${userName}, se despide.`,
          "previewType": "PHOTO",
          "showAdAttribution": true,
          "containsAutoReply": true,
          "thumbnailUrl": null,
          "showAdAttribution": true,
          "sourceUrl": redes
        }
      }
    }, { quoted: fkontak });
  }
}
