import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  const prohibited = ['se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o', 'ntr', 'rule34', 'rule', 'caca', 'polla', 'femjoy', 'porno', 'porn', 'gore', 'onlyfans', 'sofiaramirez01', 'kareli', 'karely','cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito', 'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'nalga', 'nalgas']
let foundProhibitedWord = prohibited.find(word => m.text.toLowerCase().includes(word));
if (foundProhibitedWord) return conn.reply(m.chat, `🚩 *No daré resultado a tu solicitud por pajin* - Palabra prohibida: ${foundProhibitedWord}`, m);
  
  if (!text) return conn.reply(m.chat, `*🚩 Uso Correcto: ${usedPrefix + command} Bart Simpson*`, m, rcanal);
  conn.reply(m.chat, '🚩 *Descargando su imagen...*', m, {
  contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
  title: packname,
  body: wm,
  previewType: 0, 
  sourceUrl: channel }}})
  m.react(done)
  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;
  conn.sendFile(m.chat, link, 'error.jpg', `*🔎 Resultado De: ${text}*\n> ${textbot}`, m, null, rcanal);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image','imagen'];
handler.group = true;
handler.register = true
export default handler;
 

/* import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text }) => {
  const prohibited = ['se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o', 'ntr', 'rule34', 'rule', 'caca', 'polla', 'femjoy', 'porno', 'porn', 'gore', 'onlyfans', 'sofiaramirez01', 'kareli', 'karely', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito', 'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'nalga', 'nalgas'];

  // Verificación de palabras prohibidas
  let foundProhibitedWord = prohibited.find(word => text.toLowerCase().includes(word));
  if (foundProhibitedWord) {
    return conn.reply(m.chat, `🚩 *No daré resultado a tu solicitud por pajin* - Palabra prohibida: ${foundProhibitedWord}`, m);
  }
  if (!text) {
    return conn.reply(message.chat, "🍟 *¿Qué quieres buscar en Google Imágenes?*", message, rcanal);
  }

  await message.react('⏳');
  conn.reply(message.chat, '🚩 *Descargando imágenes...*', message, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰',
        body: 'by Stiicen',
        previewType: 0,
        sourceUrl: channel
      }
    }
  });

  try {
    let response = await axios.get(`https://deliriusapi-official.vercel.app/search/gimage?query=${text}`);
    let images = response.data.data;
    
    // Si no se encuentran imágenes, mostrar un mensaje
    if (!images || images.length === 0) {
      return conn.reply(message.chat, "No se encontraron imágenes para tu búsqueda.", message);
    }

    let messageItems = [];
    let counter = 1;

    for (let image of images.slice(0, 5)) {  // Limitar a las primeras 5 imágenes
      let imageContent = await generateWAMessageContent({
        image: { url: image.url }
      }, { upload: conn.waUploadToServer });

      messageItems.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `Imagen - ${counter++}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰ by Stiiven'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: imageContent.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: `{"display_text":"Ver imagen 📫","Url":"${image.url}","merchant_url":"${image.origin.url}"}`
          }]
        })
      });
    }

    const interactiveMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🚩 Resultado de: ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "🔎 ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: messageItems
            })
          })
        }
      }
    }, { quoted: message });

    await message.react('✔️');
    await conn.relayMessage(message.chat, interactiveMessage.message, {
      messageId: interactiveMessage.key.id
    });

  } catch (error) {
    console.error("Error al buscar imágenes:", error);
    conn.reply(message.chat, "Hubo un error al buscar imágenes. Por favor, inténtalo de nuevo.", message);
  }
};

handler.help = ["imagen <txt>"];
handler.tags = ["buscador"];
handler.command = ['imagen', 'img', 'gimage'];
handler.group = true

export default handler; */
