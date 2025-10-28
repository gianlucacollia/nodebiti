import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

function buildHtmlEmail(payload) {
  const { topics = [], firstName = '', lastName = '', phone = '', email = '' } = payload || {};
  const topicsList = Array.isArray(topics) ? topics.join(', ') : String(topics || '');
  return `
    <h2>Nuova richiesta NoDebiti.it</h2>
    <p><strong>Interessi:</strong> ${topicsList}</p>
    <p><strong>Nome:</strong> ${firstName}</p>
    <p><strong>Cognome:</strong> ${lastName}</p>
    <p><strong>Telefono:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;
}

async function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

app.post('/api/submit', async (req, res) => {
  try {
    const { topics, firstName, lastName, phone, email, consent } = req.body || {};
    if (!consent) {
      return res.status(400).json({ ok: false, error: 'GDPR consent required' });
    }
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const transporter = await getTransporter();

    const html = buildHtmlEmail({ topics, firstName, lastName, phone, email });
    const text = `Nuova richiesta NoDebiti.it\nInteressi: ${Array.isArray(topics) ? topics.join(', ') : String(topics || '')}\nNome: ${firstName}\nCognome: ${lastName}\nTelefono: ${phone}\nEmail: ${email}`;

    const to = process.env.TO_EMAIL || 'gianluca.collia@gmail.com';
    const from = process.env.FROM_EMAIL || to;

    const info = await transporter.sendMail({
      from,
      to,
      subject: 'Nuova richiesta NoDebiti.it',
      text,
      html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    return res.json({ ok: true, previewUrl });
  } catch (err) {
    console.error('Submit error', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NoDebiti.it server running on http://localhost:${PORT}`);
});
