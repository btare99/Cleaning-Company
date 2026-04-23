import "../styles/About.css";

const stats = [
  { num: "500+",   label: "Klientë të kënaqur" },
  { num: "5,000+", label: "Projekte të përfunduara" },
  { num: "5+",     label: "Vite eksperiencë" },
  { num: "100%",   label: "Shkallë kënaqësie" },
];

const values = [
  {
    colorClass: "purple",
    title: "Cilësia e parë",
    desc: "Standardet më të larta në çdo projekt, pa kompromis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 21l3-3 3 3" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    colorClass: "teal",
    title: "Kujdesi ndaj klientit",
    desc: "Kënaqësia juaj është prioriteti ynë absolut",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    colorClass: "green",
    title: "Qëndrueshmëri",
    desc: "Praktika ekologjike për të ardhmen e planetit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    colorClass: "amber",
    title: "Besueshmëri",
    desc: "Gjithmonë në kohë, gjithmonë profesional",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const badges = [
  { label: "I certifikuar", color: "purple" },
  { label: "I siguruar",    color: "green"  },
  { label: "I trajnuar",    color: "teal"   },
  { label: "Ekologjik",     color: "amber"  },
];

export default function About() {
  return (
    <div className="about-page">

      {/* ── HERO ── */}
      <section className="abt-hero">
        <div className="abt-hero-bg" aria-hidden="true">
          <div className="abt-orb abt-orb-1" />
          <div className="abt-orb abt-orb-2" />
          <div className="abt-grid-pattern" />
        </div>
        <div className="abt-hero-content">
          <span className="abt-badge">Rreth nesh</span>
          <h1 className="abt-hero-title">
            Lalas <span className="abt-hero-accent">Cleaning</span>
          </h1>
          <p className="abt-hero-sub">
            Partneri juaj i besuar për hapësira të pastërta që nga 2020
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="abt-stats-strip">
        {stats.map((s, i) => (
          <div className="abt-stat" key={i}>
            <span className="abt-stat-num">{s.num}</span>
            <span className="abt-stat-label">{s.label}</span>
            {i < stats.length - 1 && <div className="abt-stat-div" />}
          </div>
        ))}
      </section>

      {/* ── INTRO ── */}
      <section className="abt-intro">
        <div className="abt-container">
          <div className="abt-intro-grid">
            {/* Text */}
            <div className="abt-intro-text">
              <p className="abt-section-eyebrow">Historia jonë</p>
              <h2>Të përkushtuar<br /> ndaj cilësisë</h2>
              <p>
                Tek Lalas Cleaning besojmë se një hapësirë e pastër është një
                hapësirë e lumtur. Me mbi 5 vjet eksperiencë në industrinë e
                pastrimit, ekipi ynë ka përfeksionuar artin e krijimit të
                mjediseve të pastra dhe mikpritëse.
              </p>
              <p>
                Jemi të angazhuar të përdorim produkte ekologjike dhe praktika të
                qëndrueshme për të mbrojtur shëndetin tuaj dhe mjedisin. Ekipi ynë
                i trajnuar ofron shërbim të qëndrueshëm dhe cilësor çdo herë.
              </p>
            </div>

            {/* Visual card */}
            <div className="abt-intro-visual">
              <div className="abt-visual-card">
                <div className="abt-visual-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3>Bazuar në Tiranë</h3>
                <p>Shërbojmë gjithë qytetin dhe rrethinat</p>
                <div className="abt-visual-dots">
                  <span /><span /><span /><span /><span />
                </div>
              </div>
              <div className="abt-visual-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span>100% Ekologjik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="abt-values">
        <div className="abt-container">
          <div className="abt-section-header">
            <p className="abt-section-eyebrow">Vlerat tona</p>
            <h2>Çfarë na dallon</h2>
            <p className="abt-section-desc">Parimet që udhëheqin çdo gjë që bëjmë</p>
          </div>

          <div className="abt-values-grid">
            {values.map((v, i) => (
              <div className={`abt-value-card abt-value-card--${v.colorClass}`} key={i}>
                <div className="abt-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="abt-team">
        <div className="abt-container">
          <div className="abt-section-header">
            <p className="abt-section-eyebrow">Ekipi ynë</p>
            <h2>Njerëzit pas shërbimit</h2>
          </div>

          <div className="abt-team-card">
            <div className="abt-team-top-bar" />

            <div className="abt-team-inner">
              <div className="abt-team-left">
                <div className="abt-team-avatar">LC</div>
                <div>
                  <h3>Ekipi Lalas Cleaning</h3>
                  <p>Specialistë të certifikuar dhe të trajnuar</p>
                </div>
              </div>

              <p className="abt-team-desc">
                Ekipi ynë përbëhet nga specialistë të trajnuar dhe të certifikuar
                me vite eksperiencë në industrinë e pastrimit. Çdo anëtar veton,
                është i siguruar dhe i angazhuar të ofrojë shërbimin më të mirë të
                mundshëm. Investojmë vazhdimisht në trajnime për të qenë përditë
                me teknikat më të fundit.
              </p>

              <div className="abt-team-badges">
                {badges.map((b, i) => (
                  <span className={`abt-badge abt-badge--${b.color}`} key={i}>
                    ✓ {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
