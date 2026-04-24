import { CheckCircle, Clock, Shield, Zap, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import "../styles/Home.css";

const features = [
  {
    icon: <CheckCircle size={22} />,
    title: "100% Garanci",
    desc: "Kthim i plotë parash nëse nuk jeni të kënaqur me rezultatin",
    color: "green",
  },
  {
    icon: <Clock size={22} />,
    title: "Orar Fleksibël",
    desc: "Rezervoni kur t'ju përshtetet — 7 ditë në javë, pa pritje",
    color: "blue",
  },
  {
    icon: <Shield size={22} />,
    title: "Produkte Ekologjike",
    desc: "Bio dhe të sigurta për familjen tuaj dhe mjedisin",
    color: "teal",
  },
  {
    icon: <Zap size={22} />,
    title: "Ekip Profesional",
    desc: "Specialistë të certifikuar me vite eksperiencë",
    color: "amber",
  },
];

const services = [
  { num: "01", title: "Home Cleaning",   desc: "Pastrim i plotë i shtëpisë — nga dhomat te banjo" },
  { num: "02", title: "Office Cleaning", desc: "Pastrim profesional i ambienteve të punës" },
  { num: "03", title: "Deep Cleaning",   desc: "Pastrim intensiv dhe dezinfektim i plotë" },
  { num: "04", title: "Carpet Cleaning", desc: "Pastrim i specializuar i tapeteve dhe mobiljeve" },
];


export default function Home() {
  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="home-hero">
        {/* Photo background + dark overlay */}
        <div className="home-hero-bg" aria-hidden="true">
          <div className="home-hero-overlay" />
          <div className="home-hero-noise" />
        </div>

        <div className="home-hero-content">
          {/* Badge */}
          <span className="home-badge">
            <span className="home-badge-dot" />
            Tiranë, Shqipëri
          </span>

          {/* Heading */}
          <h1 className="home-hero-title">
            Shërbime Profesionale<br />
            <span className="home-hero-accent">Pastrimi</span>
          </h1>

          <p className="home-hero-sub">
            Transformoni hapësirën tuaj në një ambient të pastër dhe të rehatshëm
            me ekipin tonë të certifikuar dhe produktet ekologjike.
          </p>

          {/* CTA buttons */}
          <div className="home-hero-actions">
            <Link to="/services" className="home-btn-primary">
              Shiko Shërbimet
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="home-btn-ghost">
              Na kontaktoni
            </Link>
          </div>

          {/* Stars */}
          <div className="home-hero-trust">
            <div className="home-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FFD166" stroke="none" />)}
            </div>
            <span>500+ klientë të kënaqur</span>
          </div>
        </div>

        {/* Scroll line */}
        <div className="home-hero-scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="home-features">
        <div className="home-container">
          <div className="home-section-head">
            <div className="home-label-row">
              <span className="home-label-line" />
              <span>Pse ne?</span>
              <span className="home-label-line" />
            </div>
            <h2 className="home-section-title">Pse të zgjidhni Lalas Cleaning?</h2>
            <p className="home-section-sub">Kualitet, besueshmëri dhe kujdes ndaj çdo detaji</p>
          </div>

          <div className="home-features-grid">
            {features.map((f, i) => (
              <div className={`home-feature-card home-feature-card--${f.color}`} key={i}>
                <div className="home-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="home-services">
        <div className="home-container">
          <div className="home-services-head">
            <div>
              <p className="home-services-label">Çfarë ofrojmë</p>
              <h2 className="home-services-title">Shërbimet tona</h2>
            </div>
            <Link to="/services" className="home-services-link">
              Shiko të gjitha
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-services-list">
            {services.map((s, i) => (
              <div className="home-service-item" key={i}>
                <span className="home-service-num">{s.num}</span>
                <div className="home-service-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <ArrowRight className="home-service-arrow" size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section className="home-booking">
        <div className="home-container">
          <BookingForm />
        </div>
      </section>

    </div>
  );
}
