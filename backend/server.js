import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Booking from "./api/Bookings.js";
import Contact from "./api/Contacts.js";
import {
  transporter,
  getBookingConfirmationEmail,
  getContactReplyEmail,
  getAdminBookingNotification,
  getAdminContactNotification,
  testEmailConnection
} from "./utils/Email.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB connected successfully"))
  .catch(err => console.log("✗ MongoDB error:", err));

const app = express()

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// API Routes

// GET health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// POST contact form (Accepts both singular and plural for safety)
app.post(['/api/contact', '/api/contacts'], async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validim i fushave
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Të gjitha fushat janë të detyrueshme'
      });
    }

    // Validim i formatit të emailit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Formati i emailit nuk është i vlefshëm'
      });
    }

    // Krijo kontaktin në database
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date()
    });

    console.log('✓ Kontakt i ri ruajtur:', contact._id);

    // Dërgo email konfirmimi te klienti
    try {
      await transporter.sendMail(getContactReplyEmail(contact));
      console.log('✓ Email konfirmimi u dërgua te:', email);
    } catch (emailError) {
      console.error('✗ Gabim në dërgimin e emailit te klienti:', emailError.message);
    }

    // Dërgo notifikim te administratori
    try {
      await transporter.sendMail(getAdminContactNotification(contact));
      console.log('✓ Email notifikimi u dërgua te administratorit');
    } catch (emailError) {
      console.error('✗ Gabim në dërgimin e emailit te administratorit:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Kontakti u ruajt me sukses. Do tjua përgjigjemi brenda 24 orësh!',
      contactId: contact._id
    });

  } catch (error) {
    console.error('✗ Gabim në përpunimin e kontaktit:', error);
    res.status(500).json({
      success: false,
      error: 'Dështo përpunimi i formës. Ju lutem, përpiquni përsëri më vonë.'
    });
  }
});

// POST booking form
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, service, date, time, area, notes } = req.body;

    if (!name || !email || !phone || !service || !date || !time || !area) {
      return res.status(400).json({ success: false, error: 'Plotësoni të gjitha fushat' });
    }

    // 1. RUAJTJA NË DATABASE (Kjo duhet të ndodhë e para)
    const newBooking = new Booking({
      name,
      email,
      phone,
      service,
      date,
      time,
      area,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date()
    });

    const savedBooking = await newBooking.save();
    console.log("✓ Rezervimi u ruajt në MongoDB:", savedBooking._id);

    // 2. DËRGIMI I EMAILEVE (Vetëm pasi u ruajt në DB)
    try {
      await transporter.sendMail(getBookingConfirmationEmail(savedBooking));
      await transporter.sendMail(getAdminBookingNotification(savedBooking));
    } catch (emailErr) {
      console.error("⚠️ Rezervimi u ruajt, por emaili dështoi:", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Rezervimi u krye me sukses!",
      booking: savedBooking
    });

  } catch (error) {
    console.error("✗ Gabim kritik:", error);
    res.status(500).json({ success: false, error: 'Serveri dështoi në ruajtjen e të dhënave' });
  }
});

// GET all bookings (admin endpoint)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      total: bookings.length,
      bookings: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Dështo marrja e rezervimeve'
    });
  }
})

// GET all contacts (admin endpoint)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      total: contacts.length,
      contacts: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Dështo marrja e kontakteve'
    });
  }
})
// GET specific booking
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Rezervimi nuk u gjet'
      });
    }
    res.json({
      success: true,
      booking: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Dështo marrja e rezervimit'
    });
  }
})

// GET services
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      name: 'Home Cleaning',
      price: 'Nga €60',
      description: 'Pastrimi i plotë i shtëpisë suaj duke përfshirë të gjithë dhomat dhe banjat'
    },
    {
      id: 2,
      name: 'Office Cleaning',
      price: 'Nga €80',
      description: 'Pastrimi profesional i hapësirës së punës dhe zyrës tuaj'
    },
    {
      id: 3,
      name: 'Deep Cleaning',
      price: 'Nga €120',
      description: 'Shërbim pastrimi intensiv për dezinfektim të plotë'
    },
    {
      id: 4,
      name: 'Carpet Cleaning',
      price: 'Nga €40',
      description: 'Pastrimi profesional i tapeteve dhe mobilieve'
    }
  ]
  res.json({
    success: true,
    services: services
  })
})

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Rruga e API-së ${req.originalUrl} nuk u gjet`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('✗ Error:', err)
  res.status(500).json({
    success: false,
    error: 'Gabim i brendshëm i serverit'
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
  console.log(`\n${'='.repeat(50)}`)
  console.log(`🧹 Lalas Cleaning API Server`)
  console.log(`${'='.repeat(50)}`)
  console.log(`✓ Serveri po xhiron në portin ${PORT}`)
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`)
  console.log(`${'='.repeat(50)}\n`)

  // Testo lidhjen e emailit
  console.log('Testim i lidhjes me email...');
  const emailOk = await testEmailConnection();
  if (emailOk) {
    console.log('✓ Email i gatshëm për dërgim\n');
  } else {
    console.log('⚠️ Paralajmërim: Email-i nuk është i konfiguruar siç duhet\n');
  }
})
