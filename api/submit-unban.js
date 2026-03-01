// api/submit-unban.js

const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, userid, bandate, banreason, whyunban, whatdid, notes } = req.body;

  if (!username || !userid || !bandate || !banreason || !whyunban || !whatdid)
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });

  if (!/^\d{17,19}$/.test(userid))
    return res.status(400).json({ error: 'ID Discord non valido' });

  const webhookUrl = process.env.DISCORD_WEBHOOK_UNBAN;
  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_UNBAN non configurato');
    return res.json({ success: true });
  }

  const now = new Date();
  const timestamp = now.toISOString();

  const payload = {
    username: 'Lumigate • Unban System',
    avatar_url: 'https://lumigate.vercel.app/images/logo.png',
    content: '📬 **Nuova richiesta di unban ricevuta!** Esamina e decidi.',
    embeds: [
      {
        title: '🔓 Richiesta di Unban',
        color: 0xe74c3c,
        timestamp,
        thumbnail: {
          url: `https://cdn.discordapp.com/embed/avatars/0.png`
        },
        fields: [
          {
            name: '👤 Utente',
            value: `**${username}**\n\`ID: ${userid}\``,
            inline: true
          },
          {
            name: '📅 Data Ban',
            value: bandate,
            inline: true
          },
          {
            name: '⚠️ Motivo del ban',
            value: `\`\`\`${banreason.slice(0, 512)}\`\`\``
          },
          {
            name: '💬 Perché vuole essere sbannato?',
            value: whyunban.length > 1024 ? whyunban.slice(0, 1021) + '...' : whyunban
          },
          {
            name: '🤔 Cosa ha fatto di sbagliato?',
            value: whatdid.length > 1024 ? whatdid.slice(0, 1021) + '...' : whatdid
          },
          ...(notes ? [{
            name: '📝 Note aggiuntive',
            value: notes.slice(0, 512)
          }] : []),
          {
            name: '🔗 Profilo Discord',
            value: `[Visualizza profilo](https://discord.com/users/${userid})`,
            inline: true
          },
          {
            name: '📋 Azione richiesta',
            value: '✅ Reagi con 👍 per accettare\n❌ Reagi con 👎 per rifiutare\n📝 Apri un ticket per discutere',
            inline: true
          }
        ],
        footer: {
          text: `Lumigate Unban System • Richiesta inviata il`
        }
      }
    ]
  };

  try {
    await axios.post(webhookUrl, payload);
    res.json({ success: true });
  } catch (err) {
    console.error('Webhook unban error:', err.response?.data || err.message);
    res.json({ success: true }); // non punire l'utente per errori webhook
  }
};
