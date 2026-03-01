// =============================================
//   LUMIGATE - Navbar Component
//   Includi questo file dopo main.js
// =============================================

function renderNavbar(activePage = '') {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = `
    <a class="nav-logo" href="/"><span>LUMI</span>GATE</a>
    <div class="nav-links">
      <a href="/wiki" class="${activePage==='wiki'?'active':''}">Wiki</a>
      <a href="/sponsor" class="${activePage==='sponsor'?'active':''}">Sponsor</a>
      <a href="/supporto" class="${activePage==='supporto'?'active':''}">Supporto</a>
      <div class="nav-dropdown">
        <div class="nav-link">Community <span class="dropdown-arrow">▾</span></div>
        <div class="dropdown-menu">
          <a href="/community#users"><span class="icon">👥</span>Users</a>
          <a href="/community#ruoli"><span class="icon">🏷️</span>Ruoli</a>
          <a href="/community#regole"><span class="icon">📜</span>Regole</a>
          <a href="/community#faq"><span class="icon">❓</span>FAQ</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <div class="nav-link">Richieste <span class="dropdown-arrow">▾</span></div>
        <div class="dropdown-menu">
          <a href="/richieste/unban"><span class="icon">🔓</span>Unban</a>
          <a href="/richieste/candidature"><span class="icon">📋</span>Candidature</a>
        </div>
      </div>
    </div>
    <div class="nav-auth" id="nav-auth">
      <button class="btn-nav-login" onclick="openModal('loginModal')">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
        Accedi con Discord
      </button>
    </div>
  `;
  updateNavAuth();
}

function renderModal() {
  if (document.getElementById('loginModal')) return;
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="modal-overlay" id="loginModal">
      <div class="modal">
        <button class="modal-close" onclick="closeModal('loginModal')">✕</button>
        <div class="modal-icon">⭐</div>
        <h2>Accesso<br>Richiesto</h2>
        <p class="modal-desc">Accedi con Discord per continuare</p>
        <div class="info-row">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          Devi effettuare il login con Discord
        </div>
        <a href="/auth/login" class="btn btn-red btn-block btn-lg" style="margin-bottom:10px;">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          Accedi con Discord
        </a>
        <button class="btn btn-outline btn-block" onclick="closeModal('loginModal')">← Torna alla Home</button>
        <div class="modal-dots"><span class="active"></span><span></span><span></span></div>
      </div>
    </div>`;
  document.body.appendChild(div.firstElementChild);
}

function renderFooter() {
  const f = document.getElementById('footer');
  if (!f) return;
  f.innerHTML = `
    <div class="footer-logo"><span>LUMI</span>GATE</div>
    <div class="footer-links">
      <a href="/termini">Termini di Servizio</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/cookie">Cookie Policy</a>
    </div>
    <div class="footer-copy">© 2025 LUMIGATE. Sito realizzato per la community. Powered by <a href="https://vercel.com">Vercel</a></div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar(document.body.dataset.page || '');
  renderModal();
  renderFooter();
});
