(() => {
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  const toStep2Btn = document.getElementById('to-step-2');
  const toStep3Btn = document.getElementById('to-step-3');
  const backTo1Btn = document.getElementById('back-to-1');
  const backTo2Btn = document.getElementById('back-to-2');
  const submitBtn = document.getElementById('submit');

  const summaryBox = document.getElementById('summary');

  const gdprModal = document.getElementById('gdpr-modal');
  const consentCheckbox = document.getElementById('consent-checkbox');
  const consentCancel = document.getElementById('consent-cancel');
  const consentConfirm = document.getElementById('consent-confirm');

  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function getTopics() {
    return Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(i => i.value);
  }

  function getPersonalData() {
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    return { firstName, lastName, phone, email };
  }

  function renderSummary() {
    const topics = getTopics();
    const { firstName, lastName, phone, email } = getPersonalData();
    const topicsText = topics.length ? topics.join(', ') : '—';
    const phoneText = phone || '—';

    summaryBox.innerHTML = `
      <p><strong>Come possiamo aiutarti:</strong> ${topicsText}</p>
      <p><strong>Nome:</strong> ${firstName}</p>
      <p><strong>Cognome:</strong> ${lastName}</p>
      <p><strong>Cellulare:</strong> ${phoneText}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
  }

  function goTo(step) {
    [step1, step2, step3].forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toStep2Btn.addEventListener('click', () => {
    if (getTopics().length === 0) {
      showToast('Seleziona almeno un’opzione');
      return;
    }
    goTo(step2);
  });

  backTo1Btn.addEventListener('click', () => goTo(step1));

  toStep3Btn.addEventListener('click', () => {
    const { firstName, lastName, email } = getPersonalData();
    if (!firstName || !lastName || !email) {
      showToast('Compila nome, cognome ed email');
      return;
    }
    renderSummary();
    goTo(step3);
  });

  backTo2Btn.addEventListener('click', () => goTo(step2));

  submitBtn.addEventListener('click', () => {
    consentCheckbox.checked = false;
    consentConfirm.disabled = true;
    gdprModal.classList.remove('hidden');
    gdprModal.setAttribute('aria-hidden', 'false');
  });

  consentCheckbox.addEventListener('change', (e) => {
    consentConfirm.disabled = !e.target.checked;
  });

  consentCancel.addEventListener('click', () => {
    gdprModal.classList.add('hidden');
    gdprModal.setAttribute('aria-hidden', 'true');
  });

  consentConfirm.addEventListener('click', async () => {
    const topics = getTopics();
    const { firstName, lastName, phone, email } = getPersonalData();
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics, firstName, lastName, phone, email, consent: true }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Invio fallito');
      }
      gdprModal.classList.add('hidden');
      gdprModal.setAttribute('aria-hidden', 'true');
      showToast('Richiesta inviata con successo');

      // Optionally clear forms
      document.getElementById('form-step-1').reset();
      document.getElementById('form-step-2').reset();
      summaryBox.innerHTML = '';
      goTo(step1);

      if (data.previewUrl) {
        console.log('Anteprima email:', data.previewUrl);
      }
    } catch (err) {
      console.error(err);
      showToast('Errore durante l’invio, riprova');
    }
  });
})();
