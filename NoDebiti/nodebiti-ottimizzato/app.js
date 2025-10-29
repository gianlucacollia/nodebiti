// ==================== CONFIGURAZIONE EMAIL ====================
// 🔧 ISTRUZIONI: Segui la guida in CONFIG-EMAIL.txt per configurare EmailJS
const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // ← Inserisci qui il tuo Service ID
  templateId: 'YOUR_TEMPLATE_ID',    // ← Inserisci qui il tuo Template ID
  publicKey: 'YOUR_PUBLIC_KEY',      // ← Inserisci qui la tua Public Key
  recipientEmail: 'tuaemail@example.com'  // ← Email dove ricevere le richieste
};

// ==================== APP STATE ====================
const state = {
  currentStep: 1,
  selections: [],
  debtAmounts: {}, // { banche_finanziarie: 5000, tributari: 3000 }
  formData: {}
};

// ==================== DEBT TYPE LABELS ====================
const DEBT_LABELS = {
  banche_finanziarie: 'Debiti con banche e/o finanziaria',
  tributari: 'Debiti tributari',
  erario: 'Debiti con erario'
};

// ==================== PROFESSIONALS DATA ====================
const PROFESSIONALS_DATA = [
  { name: "Avv. Marco Rossi", specialty: "Diritto bancario", services: "Opposizioni • Decreti ingiuntivi", price: 450, desc: "Specializzato in contenziosi bancari e tutela del debitore.", tags: ["bancari", "privati"] },
  { name: "Dott. Giuseppe Bianchi", specialty: "Commercialista", services: "Piani rientro • Transazioni fiscali", price: 500, desc: "Gestione crisi d'impresa e accordi con Agenzia Entrate.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Laura Ferrari", specialty: "Diritto civile", services: "Saldo e stralcio • Negoziazioni", price: 400, desc: "Esperta in accordi bonari con istituti di credito.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Anna Romano", specialty: "OCC Certificato", services: "Legge 3/2012 • Piano consumatore", price: 600, desc: "Gestore crisi da sovraindebitamento certificato.", tags: ["fiscali", "privati"] },
  { name: "Avv. Francesco Costa", specialty: "Diritto fallimentare", services: "Procedure concorsuali", price: 750, desc: "Assistenza in procedure fallimentari e concordati.", tags: ["aziende", "fiscali"] },
  { name: "Dott. Matteo Greco", specialty: "Consulente finanziario", services: "Ristrutturazione debiti", price: 350, desc: "Analisi sostenibilità e piani di rientro personalizzati.", tags: ["bancari", "privati"] },
  { name: "Avv. Silvia Conti", specialty: "Diritto bancario", services: "Pignoramenti • Opposizioni", price: 480, desc: "Difesa da azioni esecutive e recupero crediti.", tags: ["bancari", "privati"] },
  { name: "Dott. Paolo Ricci", specialty: "Commercialista", services: "Accordi AE-R • INPS", price: 520, desc: "Specialista in rateizzazioni e transazioni fiscali.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Elena Marino", specialty: "Mediatore creditizio", services: "Consolidamento • Surroga", price: 300, desc: "Mediazione con istituti per rifinanziamenti vantaggiosi.", tags: ["bancari", "privati", "aziende"] },
  { name: "Dott.ssa Chiara Gallo", specialty: "Esperta sovraindebitamento", services: "Esdebitazione • Piani accordo", price: 580, desc: "Procedure Legge 3/2012 per famiglie e partite IVA.", tags: ["fiscali", "privati"] },
  { name: "Avv. Roberto Bruno", specialty: "Diritto tributario", services: "Contenzioso fiscale", price: 650, desc: "Ricorsi contro cartelle esattoriali e avvisi bonari.", tags: ["fiscali", "aziende"] },
  { name: "Dott. Andrea Fontana", specialty: "Consulente debiti", services: "Negoziazioni con servicer", price: 250, desc: "Trattative dirette con società recupero crediti.", tags: ["bancari", "privati"] },
  { name: "Avv. Valentina Colombo", specialty: "Diritto civile e bancario", services: "Tutela consumatori", price: 420, desc: "Difesa da pratiche scorrette e usura bancaria.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Francesca Esposito", specialty: "Commercialista", services: "182-bis • Ristrutturazioni", price: 550, desc: "Piani ristrutturazione debiti tributari per PMI.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Stefano Rizzo", specialty: "Diritto fallimentare", services: "Concordati preventivi", price: 800, desc: "Assistenza in concordati e accordi di ristrutturazione.", tags: ["aziende", "fiscali", "bancari"] },
  { name: "Dott. Luca Moretti", specialty: "Mediatore finanziario", services: "Consolidamento prestiti", price: 320, desc: "Unificazione debiti e riduzione rate mensili.", tags: ["bancari", "privati"] },
  { name: "Avv. Giulia Barbieri", specialty: "Diritto bancario", services: "Opposizioni esecutive", price: 460, desc: "Blocco pignoramenti su stipendi e conti correnti.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Maria Fabbri", specialty: "OCC Gestore crisi", services: "Composizione crisi", price: 620, desc: "Liquidazione controllata e accordo con creditori.", tags: ["fiscali", "privati", "aziende"] },
  { name: "Avv. Antonio De Luca", specialty: "Diritto civile", services: "Saldo e stralcio", price: 380, desc: "Definizioni agevolate con banche e finanziarie.", tags: ["bancari", "privati"] },
  { name: "Dott. Giorgio Santoro", specialty: "Commercialista", services: "Piani rateali AE", price: 490, desc: "Rateizzazioni fino a 72 mesi con Agenzia Entrate.", tags: ["fiscali", "privati", "aziende"] },
  { name: "Avv. Alessia Marini", specialty: "Diritto tributario", services: "Contenzioso • Ricorsi", price: 680, desc: "Impugnazioni cartelle e difesa in commissioni tributarie.", tags: ["fiscali", "aziende"] },
  { name: "Dott.ssa Serena Ferrara", specialty: "Consulente crisi", services: "Analisi debito • Soluzioni", price: 280, desc: "Valutazione completa situazione debitoria e strategie.", tags: ["bancari", "privati"] },
  { name: "Avv. Davide Lombardi", specialty: "Diritto fallimentare", services: "Accordi ristrutturazione", price: 720, desc: "Negoziazione con creditori per salvataggio impresa.", tags: ["aziende", "fiscali"] },
  { name: "Dott. Simone Caruso", specialty: "Mediatore creditizio", services: "Surroga • Cessione quinto", price: 340, desc: "Soluzioni alternative per dipendenti e pensionati.", tags: ["bancari", "privati"] },
  { name: "Avv. Monica Vitale", specialty: "Diritto bancario", services: "Anatocismo • Usura", price: 500, desc: "Verifiche su interessi illegittimi e rimborsi.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Paola Riva", specialty: "Commercialista", services: "Transazioni fiscali", price: 530, desc: "Accordi con fisco per riduzione debiti tributari.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Massimo Gatti", specialty: "Diritto civile", services: "Opposizioni decreti", price: 440, desc: "Difesa da decreti ingiuntivi e precetti.", tags: ["bancari", "privati", "aziende"] },
  { name: "Dott. Claudio Mancini", specialty: "Esperto sovraindebitamento", services: "Piano del consumatore", price: 590, desc: "Liquidazione patrimonio e esdebitazione finale.", tags: ["fiscali", "privati"] },
  { name: "Avv. Federica Pellegrini", specialty: "Diritto tributario", services: "Difesa contribuente", price: 620, desc: "Tutela da accertamenti e riscossioni aggressive.", tags: ["fiscali", "aziende"] },
  { name: "Dott.ssa Lucia Monti", specialty: "Consulente finanziario", services: "Budget familiare • Piani", price: 200, desc: "Riorganizzazione finanze personali e familiari.", tags: ["privati"] },
  { name: "Avv. Nicola Ferretti", specialty: "Diritto fallimentare", services: "Crisi d'impresa", price: 850, desc: "Gestione completa procedure concorsuali PMI.", tags: ["aziende", "fiscali", "bancari"] },
  { name: "Dott. Emanuele Sala", specialty: "Commercialista", services: "Piani risanamento", price: 560, desc: "Recupero equilibrio economico-finanziario aziende.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Sara Benedetti", specialty: "Diritto bancario", services: "Revocatorie • Surroghe", price: 470, desc: "Azioni di recupero e portabilità mutui/prestiti.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Veronica Martini", specialty: "OCC Certificato", services: "Accordo composizione", price: 640, desc: "Mediazione con creditori per accordo stragiudiziale.", tags: ["fiscali", "privati", "aziende"] },
  { name: "Avv. Alberto Rossini", specialty: "Diritto civile", services: "Estinzione debiti", price: 390, desc: "Trattative per chiusura posizioni debitorie.", tags: ["bancari", "privati"] },
  { name: "Dott. Pietro Serra", specialty: "Consulente debiti", services: "Negoziazioni servicer", price: 260, desc: "Accordi con Cerved, Italfondiario, Kruk e altri.", tags: ["bancari", "privati"] },
  { name: "Avv. Cristina Donati", specialty: "Diritto tributario", services: "Annullamenti cartelle", price: 600, desc: "Istanze autotutela e sgravi fiscali.", tags: ["fiscali", "aziende", "privati"] },
  { name: "Dott.ssa Elisa Marchi", specialty: "Commercialista", services: "Rateizzazioni INPS", price: 480, desc: "Piani pagamento contributi previdenziali arretrati.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Riccardo Tosi", specialty: "Diritto fallimentare", services: "Concordati semplificati", price: 700, desc: "Procedure veloci per piccole imprese.", tags: ["aziende", "fiscali"] },
  { name: "Dott. Lorenzo Parisi", specialty: "Mediatore creditizio", services: "Prestiti consolidamento", price: 310, desc: "Accesso a finanziamenti per unificare debiti.", tags: ["bancari", "privati"] },
  { name: "Avv. Beatrice Castelli", specialty: "Diritto bancario", services: "Difesa consumatori", price: 430, desc: "Class action e azioni collettive contro banche.", tags: ["bancari", "privati"] },
  { name: "Dott.ssa Martina Leone", specialty: "Esperta crisi familiare", services: "Sovraindebitamento privati", price: 570, desc: "Supporto specializzato per nuclei familiari.", tags: ["fiscali", "privati"] },
  { name: "Avv. Fabio Bassi", specialty: "Diritto civile e commerciale", services: "Recupero crediti • Difesa", price: 520, desc: "Assistenza sia a creditori che debitori.", tags: ["bancari", "aziende", "privati"] },
  { name: "Dott. Daniele Villa", specialty: "Commercialista", services: "Consulenza fiscale integrata", price: 540, desc: "Ottimizzazione fiscale e gestione debiti erariali.", tags: ["fiscali", "aziende"] },
  { name: "Avv. Silvia Benedetti", specialty: "Diritto tributario", services: "Contenzioso tributario", price: 660, desc: "Rappresentanza in tutte le commissioni tributarie.", tags: ["fiscali", "aziende"] },
  { name: "Dott.ssa Giorgia Orlando", specialty: "OCC Gestore crisi", services: "Liquidazione patrimonio", price: 610, desc: "Vendita beni e distribuzione ricavato ai creditori.", tags: ["fiscali", "privati"] },
  { name: "Avv. Tommaso Bellini", specialty: "Diritto bancario", services: "Mutui • Prestiti", price: 410, desc: "Contestazioni clausole vessatorie e tassi usurari.", tags: ["bancari", "privati"] },
  { name: "Dott. Gabriele Neri", specialty: "Consulente finanziario", services: "Educazione finanziaria", price: 180, desc: "Corsi e consulenze per gestione consapevole denaro.", tags: ["privati"] },
  { name: "Avv. Michela Caputo", specialty: "Diritto fallimentare", services: "Procedure minori", price: 650, desc: "Liquidazione semplificata per piccoli debitori.", tags: ["aziende", "privati", "fiscali"] },
  { name: "Dott.ssa Roberta Piras", specialty: "Commercialista", services: "Rottamazione cartelle", price: 450, desc: "Definizioni agevolate debiti con Agenzia Riscossione.", tags: ["fiscali", "privati", "aziende"] }
];

// ==================== DOM REFERENCES ====================
const DOM = {
  // Pages
  pageWizard: document.getElementById('page-wizard'),
  pagePro: document.getElementById('page-pro'),
  
  // Progress
  progressBar: document.getElementById('bar'),
  stepIndicators: document.querySelectorAll('.step'),
  
  // Steps
  step1: document.getElementById('step1'),
  step2: document.getElementById('step2'),
  step3: document.getElementById('step3'),
  
  // Step 1
  optionButtons: document.querySelectorAll('.opt'),
  toStep2Btn: document.getElementById('to2'),
  
  // Step 2
  form: document.getElementById('form'),
  chipsSpan: document.getElementById('chips'),
  back1Btn: document.getElementById('back1'),
  toStep3Btn: document.getElementById('to3'),
  
  // Step 3
  reviewDiv: document.getElementById('review'),
  back2Btn: document.getElementById('back2'),
  submitBtn: document.getElementById('submit'),
  successMsg: document.getElementById('ok'),
  sendingMsg: document.getElementById('sending'),
  emailErrorMsg: document.getElementById('email-error'),
  
  // Modal
  modal: document.getElementById('gdprModal'),
  consentChk: document.getElementById('consentChk'),
  closeModalBtn: document.getElementById('closeModal'),
  confirmSendBtn: document.getElementById('confirmSend'),
  
  // Professionals
  searchInput: document.getElementById('search'),
  filterChips: document.querySelectorAll('.chip'),
  proGrid: document.getElementById('pro-grid')
};

// ==================== UTILITIES ====================
const Utils = {
  /**
   * Extract only digits from a string
   */
  extractDigits: (str) => (str || '').replace(/\D/g, ''),
  
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  /**
   * Show/hide error message
   */
  toggleError: (fieldId, show) => {
    const errorEl = document.getElementById(`err-${fieldId}`);
    if (errorEl) {
      errorEl.style.display = show ? 'block' : 'none';
    }
  },
  
  /**
   * Scroll to top smoothly
   */
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ==================== NAVIGATION ====================
const Navigation = {
  /**
   * Show professionals page
   */
  showProfessionals: () => {
    DOM.pageWizard.classList.remove('active');
    DOM.pagePro.classList.add('active');
    Utils.scrollToTop();
  }
};

// ==================== WIZARD ====================
const Wizard = {
  /**
   * Update progress bar and step indicators
   */
  updateProgress: (step) => {
    const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;
    DOM.progressBar.style.width = `${progressValue}%`;
    DOM.progressBar.parentElement.setAttribute('aria-valuenow', progressValue);
    
    DOM.stepIndicators.forEach(indicator => {
      const indicatorStep = Number(indicator.dataset.step);
      indicator.classList.toggle('active', indicatorStep === step);
    });
  },
  
  /**
   * Show specific step
   */
  showStep: (step) => {
    state.currentStep = step;
    
    DOM.step1.hidden = step !== 1;
    DOM.step2.hidden = step !== 2;
    DOM.step3.hidden = step !== 3;
    
    Wizard.updateProgress(step);
    Utils.scrollToTop();
  },
  
  /**
   * Calculate and display total debt amount
   */
  updateTotalAmount: () => {
    const total = Object.values(state.debtAmounts).reduce((sum, amount) => sum + (Number(amount) || 0), 0);
    const totalDisplay = document.getElementById('total-display');
    const totalSection = document.getElementById('total-amount');
    
    if (total > 0) {
      totalDisplay.textContent = `€ ${total.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      totalSection.style.display = 'block';
    } else {
      totalSection.style.display = 'none';
    }
  },
  
  /**
   * Handle option selection in Step 1
   */
  handleOptionClick: (button) => {
    const value = button.dataset.value;
    const isSelected = button.classList.contains('selected');
    const amountInput = document.getElementById(`amount-${value}`);
    
    if (isSelected) {
      button.classList.remove('selected');
      button.setAttribute('aria-pressed', 'false');
      state.selections = state.selections.filter(s => s !== value);
      if (amountInput) {
        amountInput.style.display = 'none';
        const input = amountInput.querySelector('input');
        if (input) input.value = '';
        delete state.debtAmounts[value];
      }
    } else {
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      state.selections.push(value);
      if (amountInput) {
        amountInput.style.display = 'block';
        const input = amountInput.querySelector('input');
        if (input) {
          // Add input listener for amount
          input.addEventListener('input', () => {
            state.debtAmounts[value] = Number(input.value) || 0;
            Wizard.updateTotalAmount();
          });
        }
      }
    }
    
    DOM.toStep2Btn.disabled = state.selections.length === 0;
    Wizard.updateTotalAmount();
  },
  
  /**
   * Move to Step 2
   */
  goToStep2: () => {
    const chipsHTML = state.selections
      .map(sel => `<span class="pill">${DEBT_LABELS[sel] || sel}</span>`)
      .join(' ');
    DOM.chipsSpan.innerHTML = chipsHTML;
    Wizard.showStep(2);
  },
  
  /**
   * Validate individual field
   */
  validateField: (fieldId, value) => {
    let isValid = true;
    
    switch (fieldId) {
      case 'nome':
      case 'cognome':
      case 'creditore':
        isValid = value.trim().length > 0;
        break;
      
      case 'telefono':
        isValid = Utils.extractDigits(value).length >= 9;
        break;
      
      case 'email':
        isValid = Utils.isValidEmail(value);
        break;
    }
    
    Utils.toggleError(fieldId, !isValid);
    return isValid;
  },
  
  /**
   * Validate all form fields
   */
  validateAllFields: () => {
    const fields = ['nome', 'cognome', 'telefono', 'email', 'creditore'];
    let allValid = true;
    
    fields.forEach(fieldId => {
      const input = document.getElementById(fieldId);
      const isValid = Wizard.validateField(fieldId, input.value);
      if (!isValid) allValid = false;
    });
    
    return allValid;
  },
  
  /**
   * Move to Step 3 (Review)
   */
  goToStep3: () => {
    DOM.successMsg.style.display = 'none';
    
    if (!Wizard.validateAllFields()) {
      return;
    }
    
    // Calculate total
    const totalAmount = Object.values(state.debtAmounts).reduce((sum, amount) => sum + (Number(amount) || 0), 0);
    
    // Collect form data
    state.formData = {
      nome: document.getElementById('nome').value.trim(),
      cognome: document.getElementById('cognome').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      email: document.getElementById('email').value.trim(),
      creditore: document.getElementById('creditore').value.trim(),
      totalAmount: totalAmount
    };
    
    // Generate debts detail
    const debtsDetail = state.selections.map(sel => {
      const amount = state.debtAmounts[sel] || 0;
      return `<li><b>${DEBT_LABELS[sel] || sel}:</b> € ${amount.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`;
    }).join('');
    
    // Generate review HTML
    const reviewHTML = `
      <ul>
        <li><b>Nome:</b> ${state.formData.nome} ${state.formData.cognome}</li>
        <li><b>Cellulare:</b> ${state.formData.telefono}</li>
        <li><b>Email:</b> ${state.formData.email}</li>
        <li><b>Creditore principale:</b> ${state.formData.creditore}</li>
      </ul>
      <h3 style="margin-top:24px; margin-bottom:12px;">Dettaglio Debiti:</h3>
      <ul>
        ${debtsDetail}
      </ul>
      <div style="margin-top:20px; padding:16px; background:#e6f4ff; border-radius:12px;">
        <div style="font-size:0.875rem; color:var(--text-muted);">Totale complessivo:</div>
        <div style="font-size:1.75rem; font-weight:800; color:var(--accent);">€ ${totalAmount.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
      </div>
    `;
    DOM.reviewDiv.innerHTML = reviewHTML;
    
    Wizard.showStep(3);
  },
  
  /**
   * Initialize Step 1 event listeners
   */
  initStep1: () => {
    DOM.optionButtons.forEach(btn => {
      btn.addEventListener('click', () => Wizard.handleOptionClick(btn));
    });
    
    DOM.toStep2Btn.addEventListener('click', Wizard.goToStep2);
  },
  
  /**
   * Initialize Step 2 event listeners
   */
  initStep2: () => {
    // Field validation on blur
    ['nome', 'cognome', 'telefono', 'email', 'creditore'].forEach(fieldId => {
      const input = document.getElementById(fieldId);
      input.addEventListener('blur', () => {
        Wizard.validateField(fieldId, input.value);
      });
    });
    
    DOM.back1Btn.addEventListener('click', () => Wizard.showStep(1));
    DOM.toStep3Btn.addEventListener('click', Wizard.goToStep3);
  },
  
  /**
   * Initialize Step 3 event listeners
   */
  initStep3: () => {
    DOM.back2Btn.addEventListener('click', () => Wizard.showStep(2));
    DOM.submitBtn.addEventListener('click', Modal.open);
  },
  
  /**
   * Initialize wizard
   */
  init: () => {
    Wizard.initStep1();
    Wizard.initStep2();
    Wizard.initStep3();
    Wizard.showStep(1);
  }
};

// ==================== EMAIL SERVICE ====================
const EmailService = {
  /**
   * Initialize EmailJS
   */
  init: () => {
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAIL_CONFIG.publicKey);
      console.log('✅ EmailJS initialized');
    } else {
      console.warn('⚠️ EmailJS non configurato. Leggi CONFIG-EMAIL.txt');
    }
  },
  
  /**
   * Send email with form data
   */
  sendEmail: async () => {
    // Hide previous messages
    DOM.successMsg.style.display = 'none';
    DOM.emailErrorMsg.style.display = 'none';
    DOM.sendingMsg.style.display = 'block';
    
    // Check if EmailJS is configured
    if (EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY' || typeof emailjs === 'undefined') {
      console.warn('⚠️ EmailJS non configurato - simulazione invio');
      DOM.sendingMsg.style.display = 'none';
      DOM.successMsg.style.display = 'block';
      return true;
    }
    
    try {
      // Prepare debts detail
      const debtsDetail = state.selections.map(sel => {
        const amount = state.debtAmounts[sel] || 0;
        return `${DEBT_LABELS[sel] || sel}: € ${amount.toLocaleString('it-IT', {minimumFractionDigits: 2})}`;
      }).join('\n');
      
      // Prepare email data
      const emailData = {
        to_email: EMAIL_CONFIG.recipientEmail,
        from_name: `${state.formData.nome} ${state.formData.cognome}`,
        from_email: state.formData.email,
        phone: state.formData.telefono,
        debt_types: state.selections.map(s => DEBT_LABELS[s] || s).join(', '),
        debt_details: debtsDetail,
        debt_amount: `€ ${state.formData.totalAmount.toLocaleString('it-IT', {minimumFractionDigits: 2})}`,
        creditor: state.formData.creditore,
        submission_date: new Date().toLocaleString('it-IT')
      };
      
      // Send via EmailJS
      const response = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        emailData
      );
      
      console.log('✅ Email inviata con successo:', response);
      DOM.sendingMsg.style.display = 'none';
      DOM.successMsg.style.display = 'block';
      return true;
      
    } catch (error) {
      console.error('❌ Errore invio email:', error);
      DOM.sendingMsg.style.display = 'none';
      DOM.emailErrorMsg.style.display = 'block';
      
      // Still show success to user but log error
      setTimeout(() => {
        DOM.emailErrorMsg.style.display = 'none';
        DOM.successMsg.style.display = 'block';
      }, 3000);
      
      return false;
    }
  }
};

// ==================== MODAL ====================
const Modal = {
  /**
   * Open GDPR modal
   */
  open: () => {
    DOM.consentChk.checked = false;
    DOM.confirmSendBtn.disabled = true;
    DOM.modal.classList.add('show');
  },
  
  /**
   * Close modal
   */
  close: () => {
    DOM.modal.classList.remove('show');
  },
  
  /**
   * Handle form submission
   */
  handleSubmit: async () => {
    Modal.close();
    
    // Send email
    await EmailService.sendEmail();
    
    // Determine appropriate filter based on selections
    let targetFilter = 'all';
    if (state.selections.includes('banche_finanziarie')) {
      targetFilter = 'bancari';
    } else if (state.selections.includes('tributari') || state.selections.includes('erario')) {
      targetFilter = 'fiscali';
    }
    
    // Navigate to professionals page
    setTimeout(() => {
      Navigation.showProfessionals();
      Professionals.applyFilter(targetFilter);
    }, 2000);
  },
  
  /**
   * Initialize modal event listeners
   */
  init: () => {
    DOM.consentChk.addEventListener('change', () => {
      DOM.confirmSendBtn.disabled = !DOM.consentChk.checked;
    });
    
    DOM.closeModalBtn.addEventListener('click', Modal.close);
    DOM.confirmSendBtn.addEventListener('click', Modal.handleSubmit);
    
    // Close modal on backdrop click
    DOM.modal.addEventListener('click', (e) => {
      if (e.target === DOM.modal) {
        Modal.close();
      }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.modal.classList.contains('show')) {
        Modal.close();
      }
    });
  }
};

// ==================== PROFESSIONALS ====================
const Professionals = {
  currentFilter: 'all',
  currentSearch: '',
  
  /**
   * Generate HTML for a professional card
   */
  createCard: (pro) => {
    const tagsHTML = pro.tags.map(tag => {
      const tagLabels = { bancari: 'Bancari', fiscali: 'Fiscali', aziende: 'Aziende', privati: 'Privati' };
      return `<span class="tag">${tagLabels[tag] || tag}</span>`;
    }).join('');
    
    return `
      <article class="pro-card" data-tags="${pro.tags.join(' ')}" data-searchtext="${pro.name.toLowerCase()} ${pro.specialty.toLowerCase()} ${pro.services.toLowerCase()} ${pro.desc.toLowerCase()}">
        <h3 class="pro-title">${pro.name}</h3>
        <div class="pro-sub">${pro.specialty}</div>
        <div class="pro-sub" style="margin-top:4px; font-size:0.85rem;">${pro.services}</div>
        <div class="pro-price">da € ${pro.price}</div>
        <p class="pro-desc">${pro.desc}</p>
        <div class="tags">${tagsHTML}</div>
        <button type="button" class="pro-cta">Richiedi consulenza</button>
      </article>
    `;
  },
  
  /**
   * Render all professionals
   */
  render: () => {
    const html = PROFESSIONALS_DATA.map(pro => Professionals.createCard(pro)).join('');
    DOM.proGrid.innerHTML = html;
  },
  
  /**
   * Apply filters and search
   */
  applyFilters: () => {
    const cards = DOM.proGrid.querySelectorAll('.pro-card');
    const query = Professionals.currentSearch.toLowerCase();
    const filter = Professionals.currentFilter;
    
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      const searchText = card.dataset.searchtext || '';
      
      // Check filter
      const matchesFilter = filter === 'all' || tags.includes(filter);
      
      // Check search
      const matchesSearch = !query || searchText.includes(query);
      
      // Show only if both match
      card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
  },
  
  /**
   * Apply search filter
   */
  applySearch: () => {
    Professionals.currentSearch = DOM.searchInput.value || '';
    Professionals.applyFilters();
  },
  
  /**
   * Apply category filter
   */
  applyFilter: (filterTag) => {
    Professionals.currentFilter = filterTag;
    
    // Update active chip
    DOM.filterChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === filterTag);
    });
    
    Professionals.applyFilters();
  },
  
  /**
   * Initialize professionals section
   */
  init: () => {
    // Render professionals
    Professionals.render();
    
    // Search input
    DOM.searchInput.addEventListener('input', Professionals.applySearch);
    
    // Filter chips
    DOM.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        Professionals.applyFilter(chip.dataset.filter);
      });
    });
    
    // Initialize with 'all' filter
    Professionals.applyFilter('all');
  }
};

// ==================== APP INITIALIZATION ====================
const App = {
  init: () => {
    EmailService.init();
    Wizard.init();
    Modal.init();
    Professionals.init();
    
    console.log('✅ NoDebiti.it app initialized');
  }
};

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

