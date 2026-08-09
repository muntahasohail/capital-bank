import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { signOut } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import { auth } from '../../firebase/firebaseConfig';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const cards = [
  { emoji: '🏦', label: 'Total Bank Balance', value: 'PKR 48,320,000', color: '#f0c040' },
  { emoji: '📋', label: 'Total Loans Issued', value: '142 Loans', color: '#4fc3f7' },
  { emoji: '👥', label: 'Active Customers', value: '1,284', color: '#81c784' },
  { emoji: '🧑‍💼', label: 'Employee Activity', value: '36 Active', color: '#ce93d8' },
];

const navItems = [
  { emoji: '👥', label: 'Customer Management', desc: 'View & monitor all customer accounts', path: '/manager/customers' },
  { emoji: '🧑‍💼', label: 'Employee Management', desc: 'CRUD operations on employee accounts', path: '/manager/employees' },
  { emoji: '📋', label: 'Loan Requests', desc: 'Approve high-value loans (> 1,000,000)', path: '/manager/loans' },
  { emoji: '💸', label: 'Transaction Oversight', desc: 'Monitor all deposit & withdrawal requests', path: '/manager/transactions' },
];

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      navigate('/login');
    });
  };

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.topSpacer}>
        <span style={s.spacerLine} />
        <span style={s.spacerDot} /><span style={s.spacerDot} /><span style={s.spacerDot} />
        <span style={s.spacerLine} />
      </div>
    <div style={s.page}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarBrand}>
          <span style={s.brandIcon}>🏦</span>
          <span style={s.brandName}>Bank <span style={s.brandAccent}>Alfalah</span></span>
        </div>
        <p style={s.roleTag}>Manager Portal</p>
        <nav style={s.sideNav}>
          {navItems.map(n => (
            <button key={n.label} style={s.sideBtn} onClick={() => navigate(n.path)}>
              <span style={s.sideBtnIcon}>{n.emoji}</span> {n.label}
            </button>
          ))}
        </nav>
        <button style={s.logoutBtn} onClick={handleLogout}>⏻ Logout</button>
      </aside>

      {/* Main */}
      <main style={s.main}>
        <div style={s.topBar}>
          <div>
            <h1 style={s.pageTitle}>Manager Dashboard</h1>
            <p style={s.pageSubtitle}>Welcome back — full system overview</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={s.cardGrid}>
          {cards.map(c => (
            <div key={c.label} style={s.card}>
              <span style={s.cardEmoji}>{c.emoji}</span>
              <p style={s.cardLabel}>{c.label}</p>
              <p style={{ ...s.cardValue, color: c.color }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Nav Panels */}
        <h2 style={s.sectionTitle}>Quick Navigation</h2>
        <div style={s.navGrid}>
          {navItems.map(n => (
            <div key={n.label} style={s.navCard} onClick={() => navigate(n.path)}>
              <span style={s.navEmoji}>{n.emoji}</span>
              <h3 style={s.navLabel}>{n.label}</h3>
              <p style={s.navDesc}>{n.desc}</p>
              <span style={s.navArrow}>→</span>
            </div>
          ))}
        </div>
      </main>
    </div>
      <div style={s.bottomSpacer}>
        <span style={s.spacerLine} />
        <span style={s.spacerText}>◆ CAPITAL BANK ◆</span>
        <span style={s.spacerLine} />
      </div>
      <Footer />
    </div>
  );
};

const s = {
  wrapper: { display: 'flex', flexDirection: 'column', background: '#060f1e', minHeight: '100vh' },
  topSpacer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '1.8rem 0', background: 'linear-gradient(180deg, #0d1f3c 0%, #0a1628 100%)', borderBottom: '1px solid rgba(240,192,64,0.12)' },
  bottomSpacer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '2.5rem 0', background: 'linear-gradient(180deg, #0a1628 0%, #060f1e 100%)', borderTop: '1px solid rgba(240,192,64,0.12)' },
  spacerLine: { display: 'block', width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.45))' },
  spacerDot: { display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(240,192,64,0.3)' },
  spacerText: { fontSize: '0.62rem', letterSpacing: '6px', color: 'rgba(240,192,64,0.55)', fontWeight: '700', fontFamily: 'Georgia, serif' },
  page: { display: 'flex', flex: 1, fontFamily: 'sans-serif', paddingTop: '80px', paddingBottom: '4rem' },
  sidebar: { width: '260px', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(240,192,64,0.12)', display: 'flex', flexDirection: 'column', padding: '2rem 1.2rem', gap: '0.4rem', flexShrink: 0 },
  sidebarBrand: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem' },
  brandIcon: { fontSize: '1.6rem' },
  brandName: { fontSize: '1.2rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase' },
  brandAccent: { color: '#f0c040', fontStyle: 'italic' },
  roleTag: { fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#f0c040', marginBottom: '1.5rem', paddingLeft: '2px' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 },
  sideBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '10px', color: '#8fa8c0', padding: '0.75rem 1rem', textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' },
  sideBtnIcon: { fontSize: '1rem' },
  logoutBtn: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: '10px', color: '#ff6b6b', padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '700', marginTop: '1rem', textAlign: 'left' },
  main: { flex: 1, padding: '2.5rem 3rem', paddingBottom: '4rem', overflowY: 'auto' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' },
  pageTitle: { fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  pageSubtitle: { color: '#4a6070', fontSize: '0.88rem', marginTop: '4px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', marginBottom: '3rem' },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.12)', borderRadius: '16px', padding: '1.5rem', backdropFilter: 'blur(8px)' },
  cardEmoji: { fontSize: '1.8rem', display: 'block', marginBottom: '0.8rem' },
  cardLabel: { fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: '0 0 0.4rem' },
  cardValue: { fontSize: '1.4rem', fontWeight: '800', margin: 0, fontFamily: 'Georgia, serif' },
  sectionTitle: { fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '700', marginBottom: '1.2rem' },
  navGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem' },
  navCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.12)', borderRadius: '16px', padding: '1.8rem', cursor: 'pointer', position: 'relative', transition: 'border-color 0.2s' },
  navEmoji: { fontSize: '2rem', display: 'block', marginBottom: '0.8rem' },
  navLabel: { fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: '0 0 0.5rem', fontFamily: 'Georgia, serif' },
  navDesc: { fontSize: '0.85rem', color: '#4a6070', margin: 0, lineHeight: '1.6' },
  navArrow: { position: 'absolute', top: '1.8rem', right: '1.8rem', color: '#f0c040', fontSize: '1.2rem' },
};

export default ManagerDashboard;
