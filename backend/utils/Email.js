import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Template për konfirmimin e rezervimit
export const getBookingConfirmationEmail = (booking) => {
  return {
    from: `"🧹 Lalas Cleaning" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: '✓ Konfirmim Rezervimi - Lalas Cleaning',
    html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="sq">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2563eb 100%); color: white; padding: 40px 20px; text-align: center; }
          .content { background: white; padding: 30px; }
          .booking-details { background: #f5f5f5; padding: 20px; border-left: 4px solid #2563eb; margin: 25px 0; border-radius: 4px; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: bold; color: #1a1a1a; min-width: 150px; }
          .detail-value { color: #666; text-align: right; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; margin-top: 25px; font-weight: 600; }
          .button:hover { background: #1d4ed8; }
          .footer { text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; background: #f5f5f5; }
          h1 { margin: 0; font-size: 32px; }
          h2 { color: #1a1a1a; margin-top: 0; font-size: 24px; }
          h3 { color: #1a1a1a; font-size: 16px; margin: 15px 0 10px 0; }
          p { margin: 12px 0; }
          ul { margin: 15px 0; padding-left: 20px; }
          li { margin: 8px 0; }
          .status-box { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧹 Lalas Cleaning</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Rezervimi juaj u konfirmua me sukses!</p>
          </div>
          
          <div class="content">
            <h2>Përshëndetje ${booking.name},</h2>
            
            <p>Faleminderit për zgjedhjen e Lalas Cleaning! Rezervimi juaj ka u konfirmuar dhe është gati për procesim.</p>
            
            <div class="status-box">
              ✓ <strong>ID Rezervimi:</strong> #${booking._id?.toString().slice(-8) || 'N/A'}
            </div>
            
            <div class="booking-details">
              <h3 style="margin-top: 0;">📋 Detalet e Rezervimit</h3>
              
              <div class="detail-row">
                <span class="detail-label">Emri:</span>
                <span class="detail-value">${booking.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${booking.email}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Telefon:</span>
                <span class="detail-value">${booking.phone}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Shërbimi:</span>
                <span class="detail-value">${booking.service}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Data:</span>
                <span class="detail-value">${new Date(booking.date).toLocaleDateString('sq-AL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Ora:</span>
                <span class="detail-value">${booking.time}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Zona:</span>
                <span class="detail-value">${booking.area}</span>
              </div>
              
              ${booking.notes ? `
              <div class="detail-row">
                <span class="detail-label">Shënime:</span>
                <span class="detail-value">${booking.notes}</span>
              </div>
              ` : ''}
            </div>
            
            <h3>Çfarë ndodh tani?</h3>
            <ul>
              <li>✓ Ekipi ynë do t'ju kontaktojë brenda 24 orësh për të konfirmuar përfundimet finale</li>
              <li>✓ Do të zbatojmë të lartën standard të pastrimit me produkte miqësore ndaj mjedisit</li>
              <li>✓ Shtëpia ose zyrja juaj do të jetë e pastër dhe e mirëmirësitur</li>
            </ul>
            
            <p><strong>Nëse keni pyetje:</strong><br>
            Telefononi: <strong>+355 69 441 4819</strong><br>
            Email: <strong>info@lalas-cleaning.com</strong></p>
            
            <p style="color: #10b981; font-weight: bold;">✓ Garancia 100% - Nëse nuk jeni të kënaqur, do të kthejmë paratë tuaja.</p>
            
            <div style="text-align: center;">
              <a href="https://lalas-cleaning.com" class="button">Vizitoni Faqen Tonë</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2024 Lalas Cleaning. Të drejtat e autorit janë të rezervuara.</p>
            <p>Ky email u dërgua për shkak të rezervimit tuaj. Mos u përgjiguni këtij email - përdorni numrin e telefonit ose adresën email më lart.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Template për përgjigje në kontakt
export const getContactReplyEmail = (contact) => {
  return {
    from: `"🧹 Lalas Cleaning" <${process.env.EMAIL_USER}>`,
    to: contact.email,
    subject: `Re: ${contact.subject} - Lalas Cleaning`,
    html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="sq">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2563eb 100%); color: white; padding: 40px 20px; text-align: center; }
          .content { background: white; padding: 30px; }
          .message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; margin-top: 25px; font-weight: 600; }
          .button:hover { background: #1d4ed8; }
          .footer { text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; background: #f5f5f5; }
          h1 { margin: 0; font-size: 32px; }
          h2 { color: #1a1a1a; margin-top: 0; font-size: 24px; }
          h3 { color: #1a1a1a; font-size: 16px; }
          p { margin: 12px 0; }
          ul { margin: 15px 0; padding-left: 20px; }
          li { margin: 8px 0; }
          .info-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .info-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
          .info-label { font-weight: bold; width: 40%; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧹 Lalas Cleaning</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Ne kemi marrë vërejtjen tuaj!</p>
          </div>
          
          <div class="content">
            <h2>Përshëndetje ${contact.name},</h2>
            
            <p>Faleminderit për kontaktimin tonë! Ne kemi marrë mesazhin tuaj dhe do t'jua përgjigjemi sa më shpejt që mundemi.</p>
            
            <div class="message-box">
              <h3 style="margin-top: 0;">📬 Detalet e Kontaktit</h3>
              <table class="info-table">
                <tr>
                  <td class="info-label">Subjekti:</td>
                  <td>${contact.subject}</td>
                </tr>
                <tr>
                  <td class="info-label">Emri:</td>
                  <td>${contact.name}</td>
                </tr>
                <tr>
                  <td class="info-label">Email:</td>
                  <td>${contact.email}</td>
                </tr>
                <tr>
                  <td class="info-label">Telefon:</td>
                  <td>${contact.phone}</td>
                </tr>
              </table>
            </div>
            
            <h3>Ç'kuptim të prisni:</h3>
            <ul>
              <li>✓ Ekipi ynë do t'jua shqyrtojë mesazhin në detaje</li>
              <li>✓ Do t'jua përgjigjemi brenda 24 orësh me punë ditore</li>
              <li>✓ Për pyetje urgjente, na telefononi: <strong>+355 69 441 4819</strong></li>
            </ul>
            
            <p>Nëse keni kërkesa të veçanta ose duhet të ndryshoni diçka, mund ta përdorni numrin e telefonit më sipër ose të na shkruani përsëri.</p>
            
            <p style="margin-top: 30px;">
              <strong>Me respekt,</strong><br>
              <strong>Ekipi i Lalas Cleaning</strong>
            </p>
            
            <div style="text-align: center;">
              <a href="https://lalas-cleaning.com" class="button">Vizitoni Faqen Tonë</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2024 Lalas Cleaning. Të drejtat e autorit janë të rezervuara.</p>
            <p>Ky email u dërgua si përgjigje e pyetjes tuaj. Ju lutem, mos e fshini këtë email pasi mund ta nevojitni për referenca.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Template për emailin e administratorit kur ka një reservim të ri
export const getAdminBookingNotification = (booking) => {
  return {
    from: `"🧹 Lalas Cleaning - ADMIN" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🔔 REZERVIM I RI - ${booking.name} - ${booking.service}`,
    html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="sq">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .alert { background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; background: white; }
          th { background: #2563eb; color: white; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          tr:last-child td { border-bottom: none; }
          .label { font-weight: bold; width: 30%; }
          .action-btn { display: inline-block; background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold; }
          h2 { color: #1a1a1a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <strong>🔔 REZERVIM I RI!</strong> Një klient i ri ka bërë një rezervim.
          </div>
          
          <h2>Detalet e Rezervimit</h2>
          <table>
            <tr>
              <th colspan="2" style="font-size: 16px;">Informacioni i Klientit</th>
            </tr>
            <tr>
              <td class="label">Emri:</td>
              <td><strong>${booking.name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td><a href="mailto:${booking.email}">${booking.email}</a></td>
            </tr>
            <tr>
              <td class="label">Telefon:</td>
              <td><a href="tel:${booking.phone}">${booking.phone}</a></td>
            </tr>
            <tr>
              <th colspan="2" style="font-size: 16px;">Detalet e Shërbimit</th>
            </tr>
            <tr>
              <td class="label">Shërbimi:</td>
              <td><strong>${booking.service}</strong></td>
            </tr>
            <tr>
              <td class="label">Data:</td>
              <td><strong>${new Date(booking.date).toLocaleDateString('sq-AL', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
            </tr>
            <tr>
              <td class="label">Ora:</td>
              <td><strong>${booking.time}</strong></td>
            </tr>
            <tr>
              <td class="label">Zona:</td>
              <td><strong>${booking.area}</strong></td>
            </tr>
            ${booking.notes ? `
            <tr>
              <td class="label">Shënime:</td>
              <td>${booking.notes}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="label">ID MongoDB:</td>
              <td style="font-family: monospace; font-size: 12px;">${booking._id}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px;">
            <strong>Hapat e mëposhtëm:</strong><br>
            1. Kontaktojeni klientin brenda 24 orësh<br>
            2. Konfirmojeni disponueshmërinë<br>
            3. Sigurohuni detajet e pagesës<br>
          </p>
          
          <a href="https://lalas-cleaning.com/admin/bookings" class="action-btn">Shiko të Gjitha Rezervimet</a>
        </div>
      </body>
      </html>
    `
  };
};

// Template për emailin e administratorit kur ka një kontakt të ri
export const getAdminContactNotification = (contact) => {
  return {
    from: `"🧹 Lalas Cleaning - ADMIN" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🔔 MESAZH I RI - ${contact.subject} - ${contact.name}`,
    html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="sq">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .alert { background: #e3f2fd; border: 2px solid #2196f3; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; background: white; margin-bottom: 20px; }
          th { background: #2563eb; color: white; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          tr:last-child td { border-bottom: none; }
          .label { font-weight: bold; width: 30%; }
          .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px; }
          .action-btn { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold; }
          h2 { color: #1a1a1a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <strong>🔔 MESAZH I RI!</strong> Një klient i ri ka kontaktuar përmes formës.
          </div>
          
          <h2>Informacioni i Klientit</h2>
          <table>
            <tr>
              <td class="label">Emri:</td>
              <td><strong>${contact.name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td><a href="mailto:${contact.email}">${contact.email}</a></td>
            </tr>
            <tr>
              <td class="label">Telefon:</td>
              <td><a href="tel:${contact.phone}">${contact.phone}</a></td>
            </tr>
            <tr>
              <td class="label">Subjekti:</td>
              <td><strong>${contact.subject}</strong></td>
            </tr>
          </table>
          
          <h3>Mesazhi:</h3>
          <div class="message-box">
            ${contact.message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="margin-top: 20px; color: #d32f2f;">
            <strong>⚠️ Kujdes:</strong> Ju lutem, përgjigjuni këtij klienti sa më shpejt që mundeni (përpiquni brenda 24 orësh).
          </p>
          
          <a href="https://lalas-cleaning.com/admin/contacts" class="action-btn">Shiko të Gjitha Mesazhet</a>
        </div>
      </body>
      </html>
    `
  };
};

// Funksioni për të testuar lidhjen e emailit
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✓ Email transporter u konfigurua me sukses');
    return true;
  } catch (error) {
    console.error('✗ Gabim në konfigurimin e email:', error.message);
    return false;
  }
};
