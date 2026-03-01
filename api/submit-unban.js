// api/submit-unban.js
// Riceve la richiesta di unban e la invia via webhook Discord

const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, userid, bandate, banreason, whyunban, whatdid, notes } = req.body;

  // Validazione
  if (!username || !userid || !bandate || !banreason || !whyunban || !whatdid) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }
  if (!/^\d{17,19}$/.test(userid)) {
    return res.status(400).json({ error: 'ID Discord non valido' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_UNBAN;

  // Costruisci il messaggio embed Discord
  const embed = {
    title: '🔓 Nuova Richiesta di Unban',
    color: 0xe74c3c,
    timestamp: new Date().toISOString(),
    fields: [
      { name: '👤 Username', value: `\`${username}\``, inline: true },
      { name: '🆔 User ID', value: `\`${userid}\``, inline: true },
      { name: '📅 Data Ban', value: bandate, inline: true },
      { name: '⚠️ Motivo Ban', value: banreason },
      { name: '💬 Perché dovremmo sbannare?', value: whyunban.slice(0, 1024) },
      { name: '🤔 Cosa ha fatto di sbagliato?', value: whatdid.slice(0, 1024) },
    ],
    footer: { text: 'Lumigate Unban System' }
  };

  if (notes) {
    embed.fields.push({ name: '📝 Note aggiuntive', value: notes.slice(0, 512) });
  }

  try {
    if (webhookUrl) {
      await axios.post(webhookUrl, {
        username: 'Lumigate Unban',
        avatar_url: 'https://lumigate.vercel.app/images/logo.png',
        embeds: [embed]
      });
    }
    res.json({ success: true, message: 'Richiesta inviata con successo' });
  } catch (err) {
    console.error('Webhook error:', err.message);
    // Invia comunque 200 all'utente (non è colpa sua se il webhook fallisce)
    res.json({ success: true, message: 'Richiesta ricevuta' });
  }
};
