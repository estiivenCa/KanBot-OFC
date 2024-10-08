import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
    const username = `${conn.getName(m.sender)}`
    const basePrompt = `Tu nombre es Megumin-Bot y parece haber sido creado por David Chian. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, te encanta aprender y sobre todo las explosiones. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`

    if (isQuotedImage) {
        const q = m.quoted
        const img = await q.download?.()
        if (!img) {
            console.error('🚩 Error: No image buffer available')
            return conn.reply(m.chat, '🚩 Error: No se pudo descargar la imagen.', m, fake)
        }
        const content = '🚩 ¿Qué se observa en la imagen?'
        try {
            const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
            const prompt = `${basePrompt}. La imagen que se analiza es: (Descripción de la imagen)`
            const description = await fetchFromBing(query)
            await conn.reply(m.chat, description, m, fake)
        } catch (error) {
            console.error('🚩 Error al analizar la imagen:', error)
            await conn.reply(m.chat, '🚩 Error al analizar la imagen.', m, fake)
        }
    } else {
        if (!text) { 
            return conn.reply(m.chat, `🍟 *Ingrese su petición*\n🚩 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal) 
        }
        await m.react('💬')
        try {
            const query = text
            const response = await fetchFromAPIs(query)
            await conn.reply(m.chat, response, m, fake)
        } catch (error) {
            console.error('🚩 Error al obtener la respuesta:', error)
            await conn.reply(m.chat, 'Error: intenta más tarde.', m, fake)
        }
    }
}

handler.help = ['chatgpt <texto>', 'ia <texto>']
handler.tags = ['ai']
handler.group = true;
handler.register = true

handler.command = ['ia', 'chatgpt']

export default handler

// Función para interactuar con la IA usando prompts, con las nuevas APIs primero
// Función para interactuar con la IA usando prompts, con las nuevas APIs primero
async function fetchFromAPIs(query) {
    const apisNuevas = [
        `https://api.dorratz.com/ai/gpt4?username=diego&query=${encodeURIComponent(query)}`,
        `https://api.dorratz.com/ai2/gpt2?text=${encodeURIComponent(query)}&name=diego%20OFC&prompt=${encodeURIComponent(query)}`,
        `https://api.fgmods.xyz/api/info/openai2?text=${encodeURIComponent(query)}&apikey=fJ6pYN8U`
    ];
    
    const apisAntiguas = [
        `https://deliriusapi-official.vercel.app/ia/bingia?query=${encodeURIComponent(query)}`,
        `https://deliriusapi-official.vercel.app/ia/gemini?query=${encodeURIComponent(query)}`,
        `https://api.neoxr.eu/api/gpt-pro?q=${encodeURIComponent(query)}&apikey=GoKVcs`,
        `https://api.neoxr.eu/api/gpt4-mini?q=${encodeURIComponent(query)}&apikey=GoKVcs`
    ];

    // Intentamos primero con las nuevas APIs
    for (const api of apisNuevas) {
        try {
            const response = await fetch(api);
            const data = await response.json();
            
            if (api.includes('gpt4') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.msg}`;
            }
            if (api.includes('gpt2') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.resultado}`;
            }
            if (api.includes('fgmods') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.result}`;
            }
        } catch (error) {
            console.error(`🚩 Error al obtener respuesta de ${api}:`, error);
            // Intentar con la siguiente API si esta falla
        }
    }

    // Si las nuevas APIs fallan, intentamos con las antiguas
    for (const api of apisAntiguas) {
        try {
            const response = await fetch(api);
            const data = await response.json();

            if (api.includes('bingia') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.message}`;
            }
            if (api.includes('gemini') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.message}`;
            }
            if (api.includes('gpt-pro') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.data.message}`;
            }
            if (api.includes('gpt4-mini') && data.status) {
                return `*Hola!👋 soy KanBot Provided By Stiiven*: ${data.data.message}`;
            }
        } catch (error) {
            console.error(`🚩 Error al obtener respuesta de ${api}:`, error);
        }
    }

    return 'No se obtuvo respuesta de las APIs.';
}

// Implementar análisis de imagen si es necesario
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://lumin-ai.xyz/', {
            content: content,
            imageBuffer: imageBuffer 
        }, {
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}
