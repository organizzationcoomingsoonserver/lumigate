// api/submit-candidatura.js
// Riceve la candidatura staff e la invia via webhook Discord

const axios = require('axios');

const roleLabels = {
  helper: '🌟 Helper',
  moderatore: '⚔️ Moderatore',
  grafico: '🎨 Grafico/Designer',
  developer: '💻 Developer'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, userid, age, role, servertime, experience, motivation, hours, conflict, skills } = req.body;

  if (!username || !userid || !age || !role || !servertime || !experience || !motivation || !hours || !conflict) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }
  if (!/^\d{17,19}$/.test(userid)) {
    return res.status(400).json({ error: 'ID Discord non valido' });
  }
  if (parseInt(age) < 16) {
    return res.status(400).json({ error: 'Devi avere almeno 16 anni' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_CANDIDATURE;

  const embed = {
    title: '📋 Nuova Candidatura Staff',
    color: 0x3b9eff,
    timestamp: new Date().toISOString(),
    fields: [
      { name: '👤 Username', value: `\`${username}\``, inline: true },
      { name: '🆔 User ID', value: `\`${userid}\``, inline: true },
      { name: '🎂 Età', value: `${age} anni`, inline: true },
      { name: '🎯 Ruolo richiesto', value: roleLabels[role] || role, inline: true },
      { name: '📅 Nel server da', value: servertime, inline: true },
      { name: '⏰ Ore disponibili', value: `${hours} ore/giorno`, inline: true },
      { name: '💼 Esperienza', value: experience.slice(0, 1024) },
      { name: '❤️ Motivazione', value: motivation.slice(0, 1024) },
      { name: '⚡ Gestione conflitti', value: conflict.slice(0, 1024) },
    ],
    footer: { text: 'Lumigate Staff Application' }
  };

  if (skills) {
    embed.fields.push({ name: '🛠️ Skill extra', value: skills.slice(0, 512) });
  }

  try {
    if (webhookUrl) {
      await axios.post(webhookUrl, {
        username: 'Lumigate Candidature',
        avatar_url: 'https://lumigate.vercel.app/images/logo.png',
        embeds: [embed]
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.json({ success: true });
  }
};
