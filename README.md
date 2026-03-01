# 🌐 LUMIGATE – Community Discord Italiana

Sito ufficiale di LUMIGATE, deployato su **https://lumigate.vercel.app**

---

## 📁 Struttura del progetto

```
lumigate/
├── api/                        ← Serverless Functions Vercel
│   ├── auth-login.js           ← Reindirizza al login Discord
│   ├── auth-callback.js        ← Gestisce il callback OAuth2
│   ├── auth-me.js              ← Ritorna i dati utente loggato
│   ├── auth-logout.js          ← Elimina la sessione
│   ├── submit-unban.js         ← Riceve richieste unban → webhook Discord
│   └── submit-candidatura.js   ← Riceve candidature → webhook Discord
├── public/                     ← File statici
│   ├── css/
│   │   └── style.css           ← Design system completo
│   ├── js/
│   │   ├── main.js             ← Funzioni JS globali
│   │   └── components.js       ← Navbar, Modal, Footer dinamici
│   ├── images/                 ← Logo e immagini
│   ├── index.html              ← Homepage
│   ├── wiki.html               ← Wiki bot con comandi
│   ├── community.html          ← Community, ruoli, regole, FAQ
│   ├── unban.html              ← Modulo richiesta unban
│   ├── candidature.html        ← Modulo candidatura staff
│   ├── dashboard.html          ← Profilo utente loggato
│   ├── sponsor.html            ← Pagina sponsor/partner
│   └── supporto.html           ← Supporto e contatti
├── vercel.json                 ← Configurazione routing Vercel
├── package.json
├── .env.example                ← Template variabili d'ambiente
└── README.md
```

---

## 🚀 Come deployare su Vercel

### 1. Crea l'app Discord
1. Vai su https://discord.com/developers/applications
2. Crea una nuova applicazione → **OAuth2**
3. Aggiungi redirect URI: `https://lumigate.vercel.app/auth/callback`
4. Copia **Client ID** e **Client Secret**

### 2. Crea i Webhook Discord
1. Nel tuo server Discord → Modifica canale → Integrazioni → Webhook
2. Crea un webhook per le richieste **unban** (es. #staff-unban)
3. Crea un webhook per le **candidature** (es. #staff-candidature)
4. Copia i link dei webhook

### 3. Deploy su Vercel
1. Vai su https://vercel.com e collega il tuo repository GitHub
2. Importa il progetto
3. Vai in **Project Settings → Environment Variables** e aggiungi:

| Nome | Valore |
|------|--------|
| `DISCORD_CLIENT_ID` | Il tuo Client ID |
| `DISCORD_CLIENT_SECRET` | Il tuo Client Secret |
| `DISCORD_REDIRECT_URI` | `https://lumigate.vercel.app/auth/callback` |
| `DISCORD_GUILD_ID` | ID del tuo server Discord |
| `DISCORD_WEBHOOK_UNBAN` | URL webhook canale unban |
| `DISCORD_WEBHOOK_CANDIDATURE` | URL webhook canale candidature |

4. Clicca **Deploy** 🎉

### 4. Aggiungi il tuo logo
Inserisci il file `logo.png` nella cartella `public/images/`

---

## 🛣️ Route del sito

| URL | Descrizione |
|-----|-------------|
| `/` | Homepage |
| `/wiki` | Wiki comandi bot |
| `/community` | Community, ruoli, regole, FAQ |
| `/sponsor` | Pagina sponsor |
| `/supporto` | Supporto |
| `/richieste/unban` | Modulo richiesta unban |
| `/richieste/candidature` | Modulo candidatura staff |
| `/dashboard` | Profilo utente (richiede login) |
| `/auth/login` | Avvia login Discord |
| `/auth/callback` | Callback OAuth2 Discord |
| `/auth/logout` | Disconnetti |
| `/auth/me` | API: dati utente loggato |

---

## 🎨 Tecnologie usate

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Vercel Serverless Functions (Node.js)
- **Auth**: Discord OAuth2
- **Notifiche**: Discord Webhooks
- **Deploy**: Vercel

---

## ✅ Funzionalità

- [x] Login Discord OAuth2 funzionante al 100%
- [x] Navbar con dropdown menu (Community, Richieste)
- [x] Modal "Accesso Richiesto" identico alle screenshot
- [x] Wiki bot con categorie collassabili e ricerca
- [x] Modulo unban con validazione + webhook Discord
- [x] Modulo candidature con validazione + webhook Discord
- [x] Dashboard utente post-login
- [x] Design dark blue ispirato a Sollary
- [x] Fully responsive mobile

---

© 2025 LUMIGATE
