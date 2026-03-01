// api/auth-callback.js
// Gestisce il callback di Discord OAuth2, ottiene il token e i dati utente

const axios = require('axios');

module.exports = async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.redirect('/?error=discord_denied');
  }

  if (!code) {
    return res.redirect('/?error=no_code');
  }

  try {
    // 1. Scambia il code con un access token
    const tokenRes = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI || 'https://lumigate.vercel.app/auth/callback',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, token_type } = tokenRes.data;

    // 2. Ottieni i dati dell'utente
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `${token_type} ${access_token}` }
    });

    const user = userRes.data;

    // 3. Salva i dati utente in un cookie JWT semplice (base64)
    //    In produzione usa jsonwebtoken per firmare il cookie
    const userData = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      loggedAt: Date.now()
    };

    const encoded = Buffer.from(JSON.stringify(userData)).toString('base64');

    // Imposta cookie sicuro (httpOnly, sameSite)
    res.setHeader('Set-Cookie', [
      `lumigate_user=${encoded}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure`
    ]);

    res.redirect('/dashboard');
  } catch (err) {
    console.error('Auth callback error:', err.response?.data || err.message);
    res.redirect('/?error=auth_failed');
  }
};
