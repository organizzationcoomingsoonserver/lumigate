// api/auth-login.js
// Reindirizza l'utente alla pagina di autorizzazione Discord

module.exports = (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI || 'https://lumigate.vercel.app/auth/callback');
  const scopes = encodeURIComponent('identify guilds');

  if (!clientId) {
    return res.status(500).send('DISCORD_CLIENT_ID non configurato. Aggiungi le env variables su Vercel.');
  }

  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
  res.redirect(302, discordAuthUrl);
};
