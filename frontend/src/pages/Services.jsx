import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import BookingForm from "../components/BookingForm";
import "../styles/Services.css";

const serviceIcons = [
  /* Home Cleaning */
  <svg key="home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  /* Office Cleaning */
  <svg key="office" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
  </svg>,
  /* Deep Cleaning */
  <svg key="deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/>
  </svg>,
  /* Carpet Cleaning */
  <svg key="carpet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6V4"/><path d="M10 6V4"/><path d="M14 6V4"/><path d="M18 6V4"/><path d="M6 18v2"/><path d="M10 18v2"/><path d="M14 18v2"/><path d="M18 18v2"/>
  </svg>,
];

export default function Services() {
  const services = [
    {
      id: 1,
      name: "Pastrimi i Shtëpisë",
      price: "5€ / m²",
      description:
        "Pastrimi i plotë i shtëpisë tuaj duke përfshirë të gjitha dhomat dhe banjot",
      features: [
        "Pluhurosje & fshesë me korent",
        "Pastrimi i banjos",
        "Dezinfektimi i kuzhinës",
        "Pastrimi i dyshemeve",
      ],
    },
    {
      id: 2,
      name: "Pastrimi i Zyrës",
      price: "Nga €80",
      description: "Pastrim profesional për ambientet e punës dhe zyrat",
      features: [
        "Pastrimi i tavolinave",
        "Mirëmbajtja e dyshemeve",
        "Dezinfektimi i tualeteve",
        "Menaxhimi i mbeturinave",
      ],
    },
    {
      id: 3,
      name: "Pastrim i Thellë",
      price: "Nga €120",
      description:
        "Shërbim intensiv për një pastrim të detajuar dhe dezinfektim të plotë",
      features: [
        "Pastrim i thellë",
        "Dezinfektim",
        "Pastrimi i dritareve",
        "Larja e tapeteve",
      ],
    },
    {
      id: 4,
      name: "Pastrimi i Tapeteve",
      price: "Nga €40",
      description:
        "Shërbim profesional për pastrimin e tapeteve dhe mobiljeve të veshura",
      features: [
        "Heqja e njollave",
        "Pastrim i thellë",
        "Eliminimi i aromave",
        "Tharje e shpejtë",
      ],
    },
  ];

  const whyCards = [
    {
      bg: "#EEEDFE", color: "#534AB7",
      title: "Ekip Profesional",
      desc: "Staf i certifikuar me eksperiencë shumëvjeçare",
      badge: "I certifikuar",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      bg: "#EAF3DE", color: "#3B6D11",
      title: "Produkte Ekologjike",
      desc: "Të sigurta për familjen tuaj dhe mjedisin",
      badge: "Bio & i sigurt",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
    },
    {
      bg: "#FAEEDA", color: "#854F0B",
      title: "Orar Fleksibël",
      desc: "Rezervoni kur t'ju përshtetet — 7 ditë në javë",
      badge: "7/7 i disponueshëm",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      bg: "#E1F5EE", color: "#0F6E56",
      title: "Garanci 100%",
      desc: "Kthim i plotë parash nëse nuk jeni të kënaqur",
      badge: "Pa rrezik",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="services-page">

      {/* ── Hero ── */}
      <section className="srv-hero">
        <div className="srv-hero-bg" aria-hidden="true">
          <div className="srv-orb srv-orb-1" />
          <div className="srv-orb srv-orb-2" />
          <div className="srv-orb srv-orb-3" />
          <div className="srv-bg-grid" />
        </div>
        <div className="srv-hero-content">
          <span className="srv-badge">
            <Sparkles size={12} />
            Shërbimet tona
          </span>
          <h1 className="srv-hero-title">
            Pastrim Profesional<br />
            <span className="srv-hero-accent">për çdo hapësirë</span>
          </h1>
          <p className="srv-hero-sub">
            Zgjidhje cilësore pastrimi të përshtatura për shtëpinë, zyrën dhe çdo ambient tjetër — me produkte ekologjike dhe ekip të certifikuar.
          </p>
          <div className="srv-hero-stats">
            <div className="srv-stat">
              <span className="srv-stat-num">500+</span>
              <span className="srv-stat-label">Klientë të kënaqur</span>
            </div>
            <div className="srv-stat-div" />
            <div className="srv-stat">
              <span className="srv-stat-num">4</span>
              <span className="srv-stat-label">Lloje shërbimesh</span>
            </div>
            <div className="srv-stat-div" />
            <div className="srv-stat">
              <span className="srv-stat-num">100%</span>
              <span className="srv-stat-label">Garanci kënaqësie</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="srv-cards-section">
        <div className="srv-cards-inner">
          <div className="srv-section-label">
            <span className="srv-label-line" />
            <span>Çmimet tona</span>
            <span className="srv-label-line" />
          </div>
          <h2 className="srv-section-title">Zgjidhni shërbimin tuaj</h2>
          <p className="srv-section-sub">Çdo shërbim përfshin materialin dhe produktet e pastrimit</p>

          <div className="srv-grid">
            {services.map((service, i) => (
              <div key={service.id} className="srv-card">
                {/* Number badge */}
                <span className="srv-card-num">0{service.id}</span>

                {/* Icon */}
                <div className="srv-card-icon">
                  {serviceIcons[i]}
                </div>

                {/* Header */}
                <div className="srv-card-top">
                  <h2>{service.name}</h2>
                  <span className="srv-price">{service.price}</span>
                </div>

                <p className="srv-card-desc">{service.description}</p>

                <div className="srv-card-divider" />

                {/* Features */}
                <ul className="srv-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <div className="srv-card-cta">
                  <span>Rezervo tani</span>
                  <ArrowRight size={14} />
                </div>

                {/* Hover accent bar */}
                <div className="srv-card-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="srv-why">
        <div className="srv-why-inner">
          <div className="srv-why-header">
            <p className="why-label">Avantazhet tona</p>
            <h2>Pse të na zgjidhni ne?</h2>
            <p className="why-subtitle">Shërbim i besuar nga qindra familje në Tiranë</p>
          </div>

          <div className="why-grid">
            {whyCards.map((card, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon" style={{ background: card.bg }}>
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="why-badge" style={{ background: card.bg, color: card.color }}>
                  {card.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="booking-cta">
        <BookingForm />
      </section>

    </div>
  );
}
