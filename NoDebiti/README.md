# 🐇 NoDebiti.it

Piattaforma web interattiva per assistenza nella gestione dei debiti. Wizard intuitivo che guida gli utenti attraverso un percorso personalizzato e li mette in contatto con professionisti qualificati.

## 🌟 Caratteristiche Principali

- **Wizard Interattivo a 3 Step**: processo guidato semplice e intuitivo
- **Calcolo Automatico Debiti**: inserisci importi per tipologia e visualizza il totale
- **Database 50+ Professionisti**: avvocati, commercialisti, OCC certificati
- **Ricerca e Filtri Avanzati**: trova il professionista giusto per le tue esigenze
- **Invio Email Automatico**: integrazione con EmailJS (200 email/mese gratis)
- **Design Rilassante**: palette colori calmi, UI pulita e professionale
- **Responsive**: ottimizzato per desktop, tablet e smartphone
- **Accessibile**: conforme agli standard WCAG 2.1

## 🎨 Screenshot

![NoDebiti.it](https://via.placeholder.com/800x400/5dade2/ffffff?text=NoDebiti.it)

## 💻 Tecnologie Utilizzate

- **HTML5**: struttura semantica e accessibile
- **CSS3**: variabili CSS, Flexbox, Grid Layout
- **JavaScript ES6+**: modulare e ben organizzato
- **EmailJS**: servizio email senza backend

## 🚀 Demo Live

[Vedi il sito in azione](https://tuo-username.github.io/nodebiti-it)

## 📦 Installazione Locale

```bash
# Clona il repository
git clone https://github.com/tuo-username/nodebiti-it.git

# Apri il file
cd nodebiti-it
# Doppio click su index.html oppure
start index.html
```

Nessuna dipendenza da installare! Apri semplicemente `index.html` nel browser.

## ⚙️ Configurazione Email (Opzionale)

1. Crea account gratuito su [EmailJS](https://www.emailjs.com)
2. Configura un servizio email (Gmail consigliato)
3. Crea un template email
4. Inserisci le credenziali in `app.js`:

```javascript
const EMAIL_CONFIG = {
  serviceId: 'TUO_SERVICE_ID',
  templateId: 'TUO_TEMPLATE_ID',
  publicKey: 'TUA_PUBLIC_KEY',
  recipientEmail: 'tuaemail@example.com'
};
```

Vedi `CONFIG-EMAIL.txt` per istruzioni dettagliate.

## 🎨 Personalizzazione

### Colori

Modifica le variabili CSS in `styles.css`:

```css
:root {
  --bg-primary: #f0f4f8;      /* Sfondo principale */
  --accent: #5dade2;           /* Colore accento */
  --text-primary: #2d3748;     /* Testo principale */
  /* ... */
}
```

### Professionisti

Modifica l'array `PROFESSIONALS_DATA` in `app.js`:

```javascript
const PROFESSIONALS_DATA = [
  { 
    name: "Avv. Nome Cognome",
    specialty: "Specializzazione",
    services: "Servizi offerti",
    price: 500,
    desc: "Descrizione dettagliata",
    tags: ["bancari", "privati"]
  },
  // ... aggiungi altri professionisti
];
```

## 📂 Struttura del Progetto

```
nodebiti-it/
│
├── index.html              # Pagina principale
├── styles.css              # Stili CSS
├── app.js                  # Logica JavaScript
├── README.md               # Questo file
├── CONFIG-EMAIL.txt        # Guida configurazione EmailJS
└── GUIDA-PUBBLICAZIONE.txt # Guida hosting
```

## 🔧 Come Funziona

### Step 1: Selezione Tipo Debito
- L'utente seleziona uno o più tipi di debito
- Inserisce l'importo per ogni tipologia
- Visualizza il totale calcolato automaticamente

### Step 2: Dati Personali
- Nome, cognome, email, telefono
- Nome creditore principale
- Validazione real-time dei campi

### Step 3: Riepilogo
- Visualizzazione completa dei dati inseriti
- Dettaglio importi per tipologia
- Totale complessivo evidenziato

### Invio e Redirect
- Modal GDPR per consenso
- Invio email automatico (se configurato)
- Redirect automatico ai professionisti filtrati

### Pagina Professionisti
- 50+ professionisti con nomi reali
- Ricerca per testo libero
- Filtri per categoria (Bancari, Fiscali, Aziende, Privati)
- Ricerca e filtri combinabili

## 🎯 Funzionalità Tecniche

### State Management
```javascript
const state = {
  currentStep: 1,
  selections: [],
  debtAmounts: {},
  formData: {}
};
```

### Validazione Form
- Validazione real-time su blur
- Messaggi errore contestuali
- Controlli specifici per ogni campo

### Filtri Professionisti
- Ricerca full-text su nome, specialità, servizi
- Filtri per tag multipli
- Aggiornamento dinamico risultati

## 📱 Responsive Design

- **Mobile First**: ottimizzato per smartphone
- **Breakpoint**: 700px per tablet/desktop
- **Layout Fluido**: si adatta a qualsiasi dimensione schermo

## ♿ Accessibilità

- Attributi ARIA corretti
- Navigazione da tastiera completa
- Focus states visibili
- Contrasto colori conforme WCAG
- Label descrittivi

## 🚀 Deploy

### GitHub Pages (Gratis)
1. Push su repository GitHub
2. Settings > Pages > Source: main branch
3. Il sito sarà su `https://tuo-username.github.io/nodebiti-it`

### Netlify (Consigliato)
1. Drag & drop su [Netlify Drop](https://app.netlify.com/drop)
2. Sito live in 10 secondi!

### Vercel
```bash
npm install -g vercel
vercel
```

## 📊 Performance

- ⚡ Caricamento < 1 secondo
- 📦 Dimensione totale < 100KB
- 🎯 Lighthouse Score: 95+

## 🐛 Troubleshooting

**Email non vengono inviate**
- Verifica configurazione EmailJS in `app.js`
- Controlla console browser (F12) per errori
- Vedi `CONFIG-EMAIL.txt` per guida completa

**Professionisti non si filtrano**
- Controlla console per errori JavaScript
- Verifica tag nei dati professionisti
- Assicurati che `app.js` sia caricato

## 📄 Licenza

MIT License - Sentiti libero di usare questo progetto per i tuoi scopi!

## 👤 Autore

Creato con ❤️ per aiutare le persone a gestire i propri debiti in modo consapevole.

## 🤝 Contribuire

I contributi sono benvenuti! Sentiti libero di:
- Aprire issue per bug o suggerimenti
- Proporre nuove funzionalità
- Migliorare la documentazione
- Aggiungere nuovi professionisti

## 📞 Supporto

Hai domande o hai bisogno di aiuto? Apri una issue!

---

**Nota**: Questo è un progetto dimostrativo. Per uso in produzione, assicurati di:
- Configurare correttamente EmailJS
- Aggiungere policy privacy e cookie
- Verificare dati professionisti reali
- Implementare misure di sicurezza appropriate
