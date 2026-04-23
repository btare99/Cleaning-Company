import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter , Instagram } from 'lucide-react'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Lalas Cleaning</h3>
          <p>Professional cleaning services for your home and office</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="/services">Pastrim Gjeneral</a></li>
            <li><a href="/services">Larje xhamash</a></li>
            <li><a href="/services">Pastrim zyrash & ambjentesh</a></li>
            <li><a href="/services">Sherbime pastrimi</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={18} />
              <span>+355 69 441 4819</span>
            </div>
                          <div className="contact-item">
                <Instagram size={18} />
                <span>lalas.pastrim.shtepie</span>
              </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@lalascleaning.com</span>
            </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Tirana , Albania</span>
              </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Lalas Cleaning. All rights reserved.</p>
      </div>
    </footer>
  )
}
