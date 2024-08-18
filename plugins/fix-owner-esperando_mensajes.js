/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */ 
  
 import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'; 
 import path from 'path'; 
  
 const handler = async (m, { conn, usedPrefix }) => { 
   if (global.conn.user.jid !== conn.user.jid) { 
     return conn.sendMessage(m.chat, {text: '*[❗] Utiliza este comando directamente en el número principal del Bot.*'}, {quoted: m}); 
   } 
   await conn.sendMessage(m.chat, {text: '*[❗] Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*'}, {quoted: m}); 
   const sessionPath = './sessions/'; 
   try { 
     if (!existsSync(sessionPath)) { 
       return await conn.sendMessage(m.chat, {text: '*[❗] La carpeta sessions no existe o está vacía.*'}, {quoted: m}); 
     } 
     const files = await fs.readdir(sessionPath); 
     let filesDeleted = 0; 
     for (const file of files) { 
       if (file !== 'creds.json') { 
         await fs.unlink(path.join(sessionPath, file)); 
         filesDeleted++; 
       } 
     } 
     if (filesDeleted === 0) { 
       await conn.sendMessage(m.chat, {text: '*[❗] No se encontró ningún archivo para eliminar en la carpeta sessions.*'}, {quoted: m}); 
     } else { 
       await conn.sendMessage(m.chat, {text: `*[❗] Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json.*`}, {quoted: m}); 
     } 
   } catch (err) { 
     console.error('Error al leer la carpeta o los archivos de sesión:', err); 
     await conn.sendMessage(m.chat, {text: '*[❗] Ocurrió un error al eliminar los archivos de sesión.*'}, {quoted: m}); 
   } 
   await conn.sendMessage(m.chat, {text: ` 🪁𝗘𝘀𝘁𝗼𝘆 𝗹𝗶𝘀𝘁𝗼,¿𝗮𝗵𝗼𝗿𝗮 𝗺𝗲 𝗹𝗲𝗲𝘀?\n\n*[❗] Si el Bot no le responde a sus comandos por favor haga un pequeño spam*\n\n*—◉ Ejemplo:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`}, {quoted: m}); 
 }; 
 handler.help = ['del_reg_in_session_owner']; 
 handler.tags = ['owner']; 
 handler.command = /^(del_reg_in_session_owner|baileydel|delbailey|clearallsession)$/i; 
 handler.rowner = true 
 export default handler;
