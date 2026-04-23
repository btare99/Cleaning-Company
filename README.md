# Lalas Cleaning - Professional Cleaning Services Website

A modern, minimalist website for Lalas Cleaning company built with React and Node.js.

## Features

- **Modern Design**: Minimalist white/black/blue color scheme with no gradients
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Service Booking**: Interactive booking system for customers
- **Contact Form**: Easy-to-use contact form for inquiries
- **Admin Dashboard Ready**: Backend API for managing bookings and contacts

## Tech Stack

### Frontend
- **React 18.2.0**: UI framework
- **React Router 6.20.0**: Navigation and routing
- **Vite 5.0.0**: Build tool and dev server
- **Lucide React 0.294.0**: Icon library
- **CSS3**: Custom styling with CSS variables

### Backend
- **Node.js**: JavaScript runtime
- **Express.js 4.18.2**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Project Structure

```
lalas-cleaning/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── BookingForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   └── Contact.jsx
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.css
│   │   │   ├── Home.css
│   │   │   ├── About.css
│   │   │   ├── Services.css
│   │   │   ├── Contact.css
│   │   │   └── BookingForm.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── eslint.config.js
│
└── backend/
    ├── server.js
    ├── package.json
    └── .env
```

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already created):
```
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Contact Form
- **POST** `/api/contact`
  - Body: `{ name, email, phone, subject, message }`
  - Returns: `{ success: true, contactId: number }`

### Booking
- **POST** `/api/bookings`
  - Body: `{ name, email, phone, service, date, time, area, notes }`
  - Returns: `{ success: true, bookingId: number }`

- **GET** `/api/bookings` - Get all bookings (admin)
- **GET** `/api/bookings/:id` - Get specific booking

### Services
- **GET** `/api/services` - Get all available services

### Health Check
- **GET** `/api/health` - Check server status

## Usage

### Navigate the Website
- **Home**: Landing page with services overview and hero section
- **About**: Company information and values
- **Services**: Detailed service descriptions with pricing
- **Contact**: Contact form and information

### Book a Service
1. Click "Book Our Service" or go to any page
2. Fill in your details
3. Select a service, date, and time
4. Submit the booking
5. You'll receive a confirmation

### Contact Us
1. Fill in the contact form with your inquiry
2. Submit the message
3. Our team will respond within 24 hours

## Color Scheme

- **Primary**: #1a1a1a (Black)
- **Secondary**: #ffffff (White)
- **Accent**: #2563eb (Blue)
- **Light Background**: #f5f5f5
- **Border**: #e5e7eb
- **Text Light**: #666666

## Development

### Frontend Development
- Run `npm run dev` for hot module reloading
- Run `npm run build` to create production build
- Run `npm run preview` to preview production build

### Backend Development
- Run `npm run dev` to start with auto-reload (requires nodemon)
- Run `npm start` for production

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Customer dashboard
- [ ] Service ratings and reviews
- [ ] Multi-language support
- [ ] Blog section

## Contributing

Contributions are welcome! Please follow the coding standards and create pull requests for any improvements.

## License

MIT License - feel free to use this project for your needs.

## Support

For support, email info@lalascleaning.com or call +1 (555) 123-4567

---

Built with ❤️ for Lalas Cleaning Company
