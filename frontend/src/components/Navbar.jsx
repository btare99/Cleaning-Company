// Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, X, Phone } from 'lucide-react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => { setIsOpen(false) }, [location])

  const close = () => setIsOpen(false)

  const links = [
    { to: '/',        label: 'Ballina' },
    { to: '/about',   label: 'Rreth Nesh' },
    { to: '/services',label: 'Shërbimet' },
    { to: '/contact', label: 'Kontakti' },
  ]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={close}>
            <div className="navbar-logo-mark">
              <img src="src\images\lalas-logo.jpg" alt="Lalas Cleaning" />
            </div>
            <span>Lala's Cleaning</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-menu">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="nav-actions">
            <Link to="/contact" className="nav-ghost">Na kontaktoni</Link>
            <Link to="/services" className="nav-cta">
              Rezervo <ArrowRight size={13} />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* Overlay */}
      <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={close} />

      {/* Drawer */}
      <aside className={`drawer ${isOpen ? 'active' : ''}`}>

        <div className="drawer-top">
          <div className="drawer-logo">
            <div className="navbar-logo-mark">
              <Sparkles size={12} />
            </div>
            <span>Lalas</span>
          </div>
          <button className="drawer-close" onClick={close}>
            <X size={16} />
          </button>
        </div>

        <nav className="drawer-nav">
          <p className="drawer-section-label">Faqet</p>
          <ul className="drawer-links">
            {links.map((l, i) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`drawer-link ${location.pathname === l.to ? 'active' : ''}`}
                  onClick={close}
                >
                  <span className="drawer-link-num">0{i + 1}</span>
                  <span>{l.label}</span>
                  <ArrowRight size={13} className="drawer-link-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <Link to="/services" className="drawer-cta" onClick={close}>
            Rezervo Tani <ArrowRight size={14} />
          </Link>
          <a href="tel:+35569123456" className="drawer-phone">
            <Phone size={13} />
            +355 69 123 4567
          </a>
        </div>

      </aside>
    </>
  )
}