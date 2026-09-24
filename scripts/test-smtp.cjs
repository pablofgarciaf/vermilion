require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const nodemailer = require('nodemailer');

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const SMTP_HOST = process.env.SMTP_HOST || 'mail.vermilionroutes.com';

console.log('=== SMTP DEBUG TEST ===');
console.log('Host:', SMTP_HOST);
console.log('User:', SMTP_EMAIL);
console.log('Pass set:', !!SMTP_PASSWORD, '(length:', SMTP_PASSWORD.length, ')');

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 465,
  secure: true,
  auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
  debug: true,
  logger: true,
});

(async () => {
  try {
    console.log('\n--- Verifying connection ---');
    await transporter.verify();
    console.log('SMTP connection verified OK\n');

    console.log('--- Sending test email ---');
    const info = await transporter.sendMail({
      from: `"Vermilion Test" <${SMTP_EMAIL}>`,
      to: 'pablofgarciaf@gmail.com',
      subject: 'SMTP Test ' + new Date().toISOString(),
      text: 'This is a test email to verify SMTP delivery.',
      html: '<p>This is a <b>test email</b> to verify SMTP delivery.</p>',
    });

    console.log('\n=== RESULT ===');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('Accepted:', info.accepted);
    console.log('Rejected:', info.rejected);
    console.log('Envelope:', info.envelope);
  } catch (err) {
    console.error('\n=== ERROR ===');
    console.error('Code:', err.code);
    console.error('Command:', err.command);
    console.error('Response:', err.response);
    console.error('Message:', err.message);
  }
})();
