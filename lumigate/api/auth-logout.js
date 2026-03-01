// api/auth-logout.js
// Elimina il cookie di sessione

module.exports = (req, res) => {
  res.setHeader('Set-Cookie', [
    'lumigate_user=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure'
  ]);
  res.redirect('/');
};
