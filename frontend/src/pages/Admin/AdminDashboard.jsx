import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

/* ── tiny sparkline bar ── */
const MiniBar = ({ value, max, color }) => (
  <div className="ad-minibar">
    <div className="ad-minibar__fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
  </div>
);

/* ── stat card ── */
const StatCard = ({ label, value, sub, accent }) => (
  <div className="ad-stat" style={{ '--ac': accent }}>
    <span className="ad-stat__val">{value}</span>
    <span className="ad-stat__label">{label}</span>
    {sub && <span className="ad-stat__sub">{sub}</span>}
    <div className="ad-stat__glow" />
  </div>
);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('cleaning_admin_auth');
    if (auth === 'true') { setIsAuthenticated(true); fetchData(); }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('cleaning_admin_auth', 'true');
      fetchData();
    } else {
      alert('Fjalëkalim i gabuar!');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, cRes] = await Promise.all([
        axios.get(`${API_URL}/bookings`),
        axios.get(`${API_URL}/contacts`),
      ]);
      setBookings(bRes.data.bookings);
      setContacts(cRes.data.contacts);
    } catch (err) {
      console.error('Gabim:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cleaning_admin_auth');
  };

  /* ── derived ── */
  const statusCount = (s) => bookings.filter(b => b.status === s).length;
  const filteredBookings = bookings
    .filter(b =>
      b.name?.toLowerCase().includes(searchQ.toLowerCase()) ||
      b.service?.toLowerCase().includes(searchQ.toLowerCase())
    )
    .sort((a, b) => sortAsc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
    );

  const filteredContacts = contacts.filter(c =>
    c.name?.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchQ.toLowerCase())
  );

  /* ── STATUS helpers ── */
  const STATUS_META = {
    pending: { label: 'Në pritje', color: '#f59e0b' },
    confirmed: { label: 'Konfirmuar', color: '#10b981' },
    cancelled: { label: 'Anuluar', color: '#ef4444' },
    completed: { label: 'Kompletuar', color: '#6366f1' },
  };

  /* ══════════════ LOGIN ══════════════ */
  if (!isAuthenticated) {
    return (
      <div className="ad-login-bg">
        <div className="ad-login-grid" aria-hidden="true">
          {Array.from({ length: 64 }).map((_, i) => <span key={i} className="ad-login-cell" />)}
        </div>
        <div className={`ad-login-card${pwFocus ? ' ad-login-card--focus' : ''}`}>
          <div className="ad-login-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="14" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 14V10a6 6 0 1112 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="16" cy="21" r="2" fill="currentColor" />
            </svg>
          </div>
          <h1 className="ad-login-title">Admin Panel</h1>
          <p className="ad-login-sub">Cleaning Dashboard · Aksesi i kufizuar</p>
          <form className="ad-login-form" onSubmit={handleLogin}>
            <div className={`ad-field${pwFocus ? ' ad-field--active' : ''}`}>
              <label className="ad-field__label">Fjalëkalimi</label>
              <input
                type="password"
                className="ad-field__input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPwFocus(true)}
                onBlur={() => setPwFocus(false)}
                autoComplete="current-password"
              />
              <span className="ad-field__line" />
            </div>
            <button type="submit" className="ad-login-btn">
              <span>Hyr në sistem</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ══════════════ DASHBOARD ══════════════ */
  return (
    <div className="ad-root">

      {/* ── Sidebar ── */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar__brand">
          <div className="ad-brand-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="ad-brand-name">CleanAdmin</div>
            <div className="ad-brand-ver">v2.0</div>
          </div>
        </div>

        <nav className="ad-sidebar__nav">
          <button
            className={`ad-nav-item${activeTab === 'bookings' ? ' ad-nav-item--act' : ''}`}
            onClick={() => { setActiveTab('bookings'); setSearchQ(''); }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5 1v2M11 1v2M1 6h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>Rezervimet</span>
            <span className="ad-nav-badge">{bookings.length}</span>
          </button>

          <button
            className={`ad-nav-item${activeTab === 'contacts' ? ' ad-nav-item--act' : ''}`}
            onClick={() => { setActiveTab('contacts'); setSearchQ(''); }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1 4l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>Mesazhet</span>
            <span className="ad-nav-badge">{contacts.length}</span>
          </button>
        </nav>

        <div className="ad-sidebar__footer">
          <button className="ad-logout" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dilni
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="ad-main">

        {/* topbar */}
        <header className="ad-topbar">
          <div>
            <h1 className="ad-topbar__title">
              {activeTab === 'bookings' ? 'Rezervimet' : 'Mesazhet'}
            </h1>
            <p className="ad-topbar__sub">
              {activeTab === 'bookings'
                ? `${bookings.length} rezervime gjithsej`
                : `${contacts.length} mesazhe gjithsej`}
            </p>
          </div>
          <div className="ad-topbar__actions">
            <div className="ad-search">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                className="ad-search__input"
                placeholder="Kërko..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
              />
            </div>
            <button className="ad-refresh" onClick={fetchData} title="Rifresko">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 2.5A6.5 6.5 0 102.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M2 5.5V9H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* stats row (bookings only) */}
        {activeTab === 'bookings' && !loading && (
          <div className="ad-stats">
            <StatCard label="Gjithsej" value={bookings.length} sub="rezervime" accent="#6366f1" />
            <StatCard label="Në pritje" value={statusCount('pending')} accent="#f59e0b" />
            <StatCard label="Konfirmuar" value={statusCount('confirmed')} accent="#10b981" />
            <StatCard label="Kompletuar" value={statusCount('completed')} accent="#06b6d4" />
          </div>
        )}

        {/* content */}
        <div className="ad-content">
          {loading ? (
            <div className="ad-loading">
              <span className="ad-spinner" />
              <span>Duke ngarkuar të dhënat…</span>
            </div>
          ) : activeTab === 'bookings' ? (

            <div className="ad-table-wrap">
              <div className="ad-table-toolbar">
                <span className="ad-table-count">{filteredBookings.length} rezultate</span>
                <button className="ad-sort-btn" onClick={() => setSortAsc(a => !a)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4-3 4 3M2 8l4 3 4-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Data {sortAsc ? '↑' : '↓'}
                </button>
              </div>

              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Klienti</th>
                    <th>Shërbimi</th>
                    <th>Data / Ora</th>
                    <th>Sipërfaqja</th>
                    <th>Statusi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b, i) => {
                    const sm = STATUS_META[b.status] || { label: b.status, color: '#94a3b8' };
                    return (
                      <tr key={b._id} style={{ animationDelay: `${i * 0.04}s` }} className="ad-row">
                        <td>
                          <div className="ad-client">
                            <div className="ad-avatar">{b.name?.[0]?.toUpperCase() ?? '?'}</div>
                            <div>
                              <div className="ad-client__name">{b.name}</div>
                              <div className="ad-client__meta">{b.email} · {b.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="ad-service-tag">{b.service}</span></td>
                        <td>
                          <div className="ad-date">{b.date}</div>
                          <div className="ad-time">{b.time}</div>
                        </td>
                        <td>
                          <div className="ad-area">{b.area} m²</div>
                          <MiniBar value={b.area || 0} max={300} color="#6366f1" />
                        </td>
                        <td>
                          <span className="ad-badge" style={{ '--bc': sm.color }}>
                            <span className="ad-badge__dot" />
                            {sm.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredBookings.length === 0 && (
                    <tr><td colSpan={5} className="ad-empty">Nuk ka rezultate</td></tr>
                  )}
                </tbody>
              </table>
            </div>

          ) : (

            <div className="ad-cards-grid">
              {filteredContacts.map((c, i) => (
                <div key={c._id} className="ad-msg-card" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="ad-msg-card__head">
                    <div className="ad-avatar ad-avatar--sm">{c.name?.[0]?.toUpperCase() ?? '?'}</div>
                    <div>
                      <div className="ad-msg-name">{c.name}</div>
                      <div className="ad-msg-email">{c.email}</div>
                    </div>
                    <div className="ad-msg-date">
                      {new Date(c.createdAt).toLocaleDateString('sq-AL', { day: '2-digit', month: 'short' })}
                    </div>
                  </div>
                  <div className="ad-msg-subject">{c.subject}</div>
                  <p className="ad-msg-body">{c.message}</p>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <div className="ad-empty ad-empty--full">Nuk ka mesazhe</div>
              )}
            </div>

          )}
        </div>
      </main>
    </div>
  );
}