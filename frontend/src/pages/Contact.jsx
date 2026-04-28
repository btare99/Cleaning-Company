import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import "../styles/contact.css";

export default function Contact() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      setSuccessMessage(
        "Message sent successfully! We will get back to you soon.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.message || "Failed to send message. Please try again.",
      );
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <Phone size={20} />,
      label: "Telefoni",
      value: "+355 69 441 4819",
      sub: "Në shërbim 24/7, çdo ditë të javës",
      color: "green",
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      value: "lalas.pastrim.shtepie",
      sub: "Na shkruani në çdo kohë",
      color: "purple",
    },
    {
      icon: <MapPin size={20} />,
      label: "Adresa",
      value: "Tirana, Albania",
      sub: "Shërbim në të gjithë Shqipërinë",
      color: "blue",
    },
    {
      icon: <Clock size={20} />,
      label: "Orari i punës",
      value: "Çdo ditë e javës",
      sub: "08:00 – 18:00",
      color: "amber",
    },
  ];

  return (
    <div className="contact-page">
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" aria-hidden="true">
          <div className="contact-hero-orb orb-1" />
          <div className="contact-hero-orb orb-2" />
          <div className="contact-hero-grid" />
        </div>
        <div className="contact-hero-content">
          <span className="contact-badge">
            <span className="contact-badge-dot" />
            Na kontaktoni
          </span>
          <h1 className="contact-hero-title">
            Çdo projekt fillon me një mesazh <br />
            <span className="contact-hero-highlight">Na kontaktoni</span>
          </h1>
          <p className="contact-hero-sub">
            Keni pyetje apo dëshironi të rezervoni? Na kontaktoni — do t’ju
            përgjigjemi brenda 24 orëve.
          </p>
          <div className="contact-hero-scroll" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="contact-cards-section">
        <div className="contact-cards-inner">
          {contactCards.map((card, i) => (
            <div className={`contact-card contact-card--${card.color}`} key={i}>
              <div className="contact-card-icon">{card.icon}</div>
              <div className="contact-card-body">
                <p className="contact-card-label">{card.label}</p>
                <p className="contact-card-value">{card.value}</p>
                <p className="contact-card-sub">{card.sub}</p>
              </div>
              <ArrowRight className="contact-card-arrow" size={16} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="contact-main">
        <div className="contact-main-inner">
          {/* Left sidebar */}
          <div className="contact-sidebar">
            <div className="contact-sidebar-card">
              <div className="contact-sidebar-icon-wrap">
                <Mail size={22} />
              </div>
              <h2 className="contact-sidebar-title">
                Na dërgoni një <br /> mesazh
              </h2>
              <p className="contact-sidebar-desc">
                Plotësoni formularin dhe ekipi ynë do t’ju përgjigjet brenda 24
                orëve, çdo ditë të javës.
              </p>

              <div className="contact-sidebar-divider" />

              <ul className="contact-sidebar-bullets">
                <li>
                  <span className="bullet-dot" />
                  Përgjigje e shpejtë brenda 24 orësh
                </li>
                <li>
                  <span className="bullet-dot" />
                  Pastrim i detajuar për çdo hapësirë
                </li>
                <li>
                  <span className="bullet-dot" />
                  Orar fleksibël
                </li>
                <li>
                  <span className="bullet-dot" />
                  Staf profesional dhe i trajnuar
                </li>
              </ul>
            </div>

            <div className="contact-sidebar-note">
              <div className="contact-sidebar-note-top" />
              <p>
                <strong>Keni nevojë urgjente?</strong> Na telefononi direkt në{" "}
                <a href="tel:+355694414819" className="contact-phone-link">
                  +355 69 441 4819
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div
                  className={`contact-field ${focusedField === "name" ? "is-focused" : ""} ${formData.name ? "has-value" : ""}`}
                >
                  <label htmlFor="name">Emri i plotë</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Emrin tuaj të plotë"
                    required
                  />
                </div>

                <div
                  className={`contact-field ${focusedField === "email" ? "is-focused" : ""} ${formData.email ? "has-value" : ""}`}
                >
                  <label htmlFor="email">Adresa e Email-it</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div
                  className={`contact-field ${focusedField === "phone" ? "is-focused" : ""} ${formData.phone ? "has-value" : ""}`}
                >
                  <label htmlFor="phone">Numri i telefonit</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+355 6X XXX XXXX"
                    required
                  />
                </div>

                <div
                  className={`contact-field ${focusedField === "subject" ? "is-focused" : ""} ${formData.subject ? "has-value" : ""}`}
                >
                  <label htmlFor="subject">Arsyeja e kontaktit</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Si mund t’ju ndihmojmë?"
                    required
                  />
                </div>
              </div>

              <div
                className={`contact-field contact-field--full ${focusedField === "message" ? "is-focused" : ""} ${formData.message ? "has-value" : ""}`}
              >
                <label htmlFor="message">Mesazhi juaj</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Na tregoni më shumë për atë që ju nevojitet…"
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="contact-spinner" />
                    Duke dërguar...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Dërgo
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Toast Notifications ── */}
      {successMessage && (
        <div className="contact-toast contact-toast--success" role="alert">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="contact-toast contact-toast--error" role="alert">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
