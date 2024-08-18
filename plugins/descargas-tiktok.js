import fg from 'api-dylux';
 import axios from 'axios';
 import cheerio from 'cheerio';
 import { tiktok } from "@xct007/frieren-scraper"; 
 import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
 import { tiktokdl } from '@bochilteam/scraper';
 let handler = async (m, { conn, text, args, usedPrefix, command}) => { 
 if (!text) throw `*「👑」*Use el comandó correctamente\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/kandndbwldnig/🍁_` 
 if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `「👑」 *Uso correcto\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/nandlwmso/🍁` 
/*  let texto = `_🍁 @${m.sender.split`@`[0]} Enviando Video, espere un momento...._` */
     await m.react('⏳');
 await conn.sendMessage(m.chat, 
    { 
        text: `_🍁 @${m.sender.split`@`[0]} Enviando Video, espere un momento....\n> Mientras esperas, sígueme en mi canal, crack 😎_`,
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,  // Título personalizado
                body: wm,         // Texto de cuerpo personalizado
                previewType: 0,
                sourceUrl: channel // URL del canal
            }
        }
    },
                          { quoted: m }
);
 try { 
  conn.sendMessage(m.chat, { text: texto, mentions: [m.sender]}, {quoted: m})
 await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })     
 const dataF = await tiktok.v1(args[0]) 
 //let desc1 =  `*USUARIO:* ${dataF.nickname || 'Indefinido'}` 
 let desc1 =  `🍁 *Su Video de Tiktok by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*` 
 await conn.sendMessage(m.chat, { video: { url: dataF.play }, caption: desc1 }, { quoted: m })   
   await m.react('✅');
 } catch (e1) { 
 try { 
 const tTiktok = await tiktokdlF(args[0]) 
 //let desc2 = `🔗 *Url:* ${tTiktok.video}`     
 let desc2 =   `🍁 *Su Video de Tiktok by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*` 
 await conn.sendMessage(m.chat, { video: { url: tTiktok.video }, caption: desc2 }, { quoted: m })    
   await m.react('✅');
 } catch (e2) { 
 try { 
 let p = await fg.tiktok(args[0])  
 //let te = `*USUARIO:* ${p.author || 'Indefinido'}` 
 let te =  `🍁 *Su Video de Tiktok by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*` 
 await conn.sendMessage(m.chat, { video: { url: p.nowm}, caption: te }, { quoted: m })   
   await m.react('✅');
 } catch (e3) { 
 try {  
 const { author: { nickname }, video, description } = await tiktokdl(args[0]) 
 const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd 
 //let cap = `*USUARIO:* ${nickname || 'Indefinido'}` 
 let cap =   `🍁 *Su Video de Tiktok by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰*`
 await conn.sendMessage(m.chat, { video: { url: url}, caption: cap }, { quoted: m })   
   await m.react('✅');
 } catch { 
   await m.react('❌');
 throw `「👑」 _Vuelve a intentarlo_` 
 }}}}} 
 handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|ttnowm|tiktokaudio)$/i 
 export default handler 
  
 async function tiktokdlF(url) { 
 if (!/tiktok/.test(url)) return 'Enlace incorrecto'; 
 const gettoken = await axios.get("https://tikdown.org/id"); 
 const $ = cheerio.load(gettoken.data); 
 const token = $("#download-form > input[type=hidden]:nth-child(2)").attr( "value" ); 
 const param = { url: url, _token: token }; 
 const { data } = await axios.request("https://tikdown.org/getAjax?", { method: "post", data: new URLSearchParams(Object.entries(param)), headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36" }, }); 
 var getdata = cheerio.load(data.html); 
 if (data.status) { 
 return { status: true, thumbnail: getdata("img").attr("src"), video: getdata("div.download-links > div:nth-child(1) > a").attr("href"), audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"), }} else 
 return { status: false }}
      
