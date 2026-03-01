// api/auth-me.js
// Restituisce i dati dell'utente loggato leggendo il cookie

module.exports = (req, res) => {
  const cookieHeader = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );

  const encoded = cookies['lumigate_user'];
  if (!encoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userData = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    // Controlla se il cookie non è scaduto (7 giorni)
    if (Date.now() - userData.loggedAt > 7 * 24 * 60 * 60 * 1000) {
      return res.status(401).json({ error: 'Session expired' });
    }
    // Non mandare info sensibili
    res.json({
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar
    });
  } catch {
    res.status(401).json({ error: 'Invalid session' });
  }
};
