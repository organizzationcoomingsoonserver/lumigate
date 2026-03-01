// api/submit-candidatura.js

const axios = require('axios');

const roleLabels = {
  helper:      '🌟 Helper',
  moderatore:  '⚔️ Moderatore',
  grafico:     '🎨 Grafico/Designer',
  developer:   '💻 Developer'
};

const roleColors = {
  helper:     0x3b9eff,
  moderatore: 0xe74c3c,
  grafico:    0x9b59b6,
  developer:  0x0dc464
};

const hoursLabels = {
  '1-2': '1-2 ore/giorno',
  '2-4': '2-4 ore/giorno',
  '4-6': '4-6 ore/giorno',
  '6+':  '6+ ore/giorno'
};

const servertimeLabels = {
  '1-3mesi':  '1-3 mesi',
  '3-6mesi':  '3-6 mesi',
  '6-12mesi': '6-12 mesi',
  '1+anno':   'Più di 1 anno'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, userid, age, role, servertime, experience, motivation, hours, conflict, skills } = req.body;

  if (!username || !userid || !age || !role || !servertime || !experience || !motivation || !hours || !conflict)
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });

  if (!/^\d{17,19}$/.test(userid))
    return res.status(400).json({ error: 'ID Discord non valido' });

  if (parseInt(age) < 16)
    return res.status(400).json({ error: 'Devi avere almeno 16 anni' });

  const webhookUrl = process.env.DISCORD_WEBHOOK_CANDIDATURE;
  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_CANDIDATURE non configurato');
    return res.json({ success: true });
  }

  const timestamp = new Date().toISOString();
  const color = roleColors[role] || 0x3b9eff;

  const payload = {
    username: 'Lumigate • Staff System',
    avatar_url: 'https://lumigate.vercel.app/images/logo.png',
    content: `📬 **Nuova candidatura staff ricevuta!** Ruolo: **${roleLabels[role] || role}**`,
    embeds: [
      {
        title: `📋 Candidatura Staff – ${roleLabels[role] || role}`,
        color,
        timestamp,
        fields: [
          {
            name: '👤 Candidato',
            value: `**${username}**\n\`ID: ${userid}\``,
            inline: true
          },
          {
            name: '🎂 Età',
            value: `${age} anni`,
            inline: true
          },
          {
            name: '📅 Nel server da',
            value: servertimeLabels[servertime] || servertime,
            inline: true
          },
          {
            name: '🎯 Ruolo richiesto',
            value: roleLabels[role] || role,
            inline: true
          },
          {
            name: '⏰ Disponibilità',
            value: hoursLabels[hours] || hours,
            inline: true
          },
          {
            name: '🔗 Profilo Discord',
            value: `[Visualizza profilo](https://discord.com/users/${userid})`,
            inline: true
          },
          {
            name: '💼 Esperienza precedente',
            value: experience.length > 1024 ? experience.slice(0, 1021) + '...' : experience
          },
          {
            name: '❤️ Motivazione',
            value: motivation.length > 1024 ? motivation.slice(0, 1021) + '...' : motivation
          },
          {
            name: '⚡ Gestione conflitti',
            value: conflict.length > 1024 ? conflict.slice(0, 1021) + '...' : conflict
          },
          ...(skills ? [{
            name: '🛠️ Skill extra',
            value: skills.slice(0, 512)
          }] : []),
          {
            name: '📋 Come procedere',
            value: '✅ Reagi con 👍 se la candidatura è interessante\n❌ Reagi con 👎 per scartare\n🗣️ Discuti nel thread dedicato',
          }
        ],
        footer: {
          text: 'Lumigate Staff System • Candidatura ricevuta il'
        }
      }
    ]
  };

  try {
    await axios.post(webhookUrl, payload);
    res.json({ success: true });
  } catch (err) {
    console.error('Webhook candidatura error:', err.response?.data || err.message);
    res.json({ success: true });
  }
};
