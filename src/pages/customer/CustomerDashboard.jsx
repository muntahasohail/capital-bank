import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { getCustomerProfile, getMyTransactions, getMyLoans } from '../../features/customers/customerSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const actions = [
  { emoji: '📜', label: 'Transaction History', desc: 'View all your past transactions', path: '/customer/transactions', color: '#4fc3f7' },
  { emoji: '🏦', label: 'Loan Details', desc: 'View approved, pending & rejected loans', path: '/customer/loans', color: '#81c784' },
  { emoji: '📋', label: 'Request Loan', desc: 'Submit a new loan request', path: '/customer/request-loan', color: '#f0c040' },
  { emoji: '💸', label: 'Deposit / Withdraw', desc: 'Submit a deposit or withdrawal request', path: '/customer/transaction-request/Deposit', color: '#ce93d8' },
  { emoji: '🤲', label: 'Donation / Zakat', desc: 'Submit a donation or zakat request', path: '/customer/transaction-request/Donation', color: '#ffb74d' },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { profile, myTransactions, myLoans } = useSelector(state => state.customers);

  useEffect(() => {
    if (user?.uid) {
      dispatch(getCustomerProfile(user.uid));
      dispatch(getMyTransactions(user.uid));
      dispatch(getMyLoans(user.uid));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    signOut(auth).then(() => { dispatch(logout()); navigate('/login'); });
  };

  const [showBalance, setShowBalance] = useState(false);
  const pendingTx = myTransactions.filter(t => t.status === 'Pending').length;
  const pendingLoans = myLoans.filter(l => l.status === 'Pending').length;

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.topSpacer}>
        <span style={s.spacerLine} />
        <span style={s.spacerDot} /><span style={s.spacerDot} /><span style={s.spacerDot} />
        <span style={s.spacerLine} />
      </div>
      <div style={s.page}>

        {/* Hero Banner */}
        <div style={s.hero}>
          <div style={s.heroLeft}>
            <p style={s.heroLabel}>Welcome back</p>
            <h1 style={s.heroName}>{profile?.name || user?.email?.split('@')[0] || 'Customer'}</h1>
            <div style={s.heroBadgeRow}>
              <span style={{ ...s.heroBadge, ...(profile?.status === 'Active' ? s.badgeActive : s.badgeInactive) }}>
                ● {profile?.status || 'Active'}
              </span>
              {profile?.account && (
                <span style={s.accountBadge}>
                  🔑 {'*'.repeat(Math.max(0, String(profile.account).length - 4)) + String(profile.account).slice(-4)}
                </span>
              )}
            </div>
          </div>
          <div style={s.balanceCard}>
            <p style={s.balanceLabel}>Current Balance</p>
            <p style={s.balanceValue}>
              {showBalance ? `PKR ${Number(profile?.balance || 0).toLocaleString()}` : 'PKR ••••••'}
              <span
                onClick={() => setShowBalance(v => !v)}
                style={s.eyeBtn}
                title={showBalance ? 'Hide balance' : 'Show balance'}
              >
                {showBalance ? '💸' : '👁️'}
              </span>
            </p>
            <p style={s.balanceNote}>Read-only · Updated after approvals</p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={s.statsRow}>
          {[
            { emoji: '💸', label: 'Total Transactions', value: myTransactions.length, color: '#4fc3f7' },
            { emoji: '⏳', label: 'Pending Requests', value: pendingTx, color: '#f0c040' },
            { emoji: '📋', label: 'Total Loans', value: myLoans.length, color: '#81c784' },
            { emoji: '🔄', label: 'Pending Loans', value: pendingLoans, color: '#ce93d8' },
          ].map(c => (
            <div key={c.label} style={s.statCard}>
              <span style={s.statEmoji}>{c.emoji}</span>
              <p style={{ ...s.statValue, color: c.color }}>{c.value}</p>
              <p style={s.statLabel}>{c.label}</p>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <h2 style={s.sectionTitle}>⚡ Quick Actions</h2>
        <div style={s.actionsGrid}>
          {actions.map(a => (
            <div key={a.label} style={s.actionCard} onClick={() => navigate(a.path)}>
              <span style={s.actionEmoji}>{a.emoji}</span>
              <h3 style={{ ...s.actionLabel, color: a.color }}>{a.label}</h3>
              <p style={s.actionDesc}>{a.desc}</p>
              <span style={s.actionArrow}>→</span>
            </div>
          ))}
        </div>

        {/* Restriction Notice */}
        <div style={s.notice}>
          <span>🔒</span>
          <p style={s.noticeText}>
            Your account balance is <strong style={{ color: '#f0c040' }}>read-only</strong>. All deposit, withdrawal, and loan requests are processed by bank staff. You cannot approve your own requests.
          </p>
        </div>

        <button style={s.logoutBtn} onClick={handleLogout}>⏻ Logout</button>
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
  page: { flex: 1, padding: '2.5rem 3rem', paddingTop: 'calc(80px + 2.5rem)', paddingBottom: '4rem', fontFamily: 'sans-serif' },
  hero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(240,192,64,0.08), rgba(79,195,247,0.05))', border: '1px solid rgba(240,192,64,0.15)', borderRadius: '24px', padding: '2.5rem 3rem', marginBottom: '2rem' },
  heroLeft: {},
  heroLabel: { fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4a6070', margin: '0 0 6px' },
  heroName: { fontSize: '2.8rem', fontWeight: '900', color: '#fff', fontFamily: '"Palatino Linotype", Georgia, serif', margin: '0 0 1rem', textTransform: 'capitalize' },
  heroBadgeRow: { display: 'flex', gap: '0.8rem', alignItems: 'center' },
  heroBadge: { padding: '5px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' },
  badgeActive: { background: 'rgba(129,199,132,0.12)', border: '1px solid rgba(129,199,132,0.4)', color: '#81c784' },
  badgeInactive: { background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b' },
  accountBadge: { background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.25)', color: '#4fc3f7', padding: '5px 14px', borderRadius: '20px', fontSize: '0.82rem', fontFamily: 'monospace' },
  balanceCard: { background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '20px', padding: '2rem 2.5rem', textAlign: 'center' },
  balanceLabel: { fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4a6070', margin: '0 0 8px' },
  balanceValue: { fontSize: '2.2rem', fontWeight: '900', color: '#f0c040', fontFamily: 'Georgia, serif', margin: '0 0 6px' },
  balanceNote: { fontSize: '0.72rem', color: '#4a6070', margin: 0 },
  eyeBtn: { marginLeft: '10px', cursor: 'pointer', fontSize: '1.2rem', verticalAlign: 'middle', userSelect: 'none' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2.5rem' },
  statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '14px', padding: '1.4rem', textAlign: 'center' },
  statEmoji: { fontSize: '1.6rem', display: 'block', marginBottom: '0.5rem' },
  statValue: { fontSize: '1.8rem', fontWeight: '900', margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  statLabel: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: 0 },
  sectionTitle: { fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '700', marginBottom: '1.2rem' },
  actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginBottom: '2rem' },
  actionCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', padding: '1.8rem', cursor: 'pointer', position: 'relative', transition: 'border-color 0.2s' },
  actionEmoji: { fontSize: '2rem', display: 'block', marginBottom: '0.8rem' },
  actionLabel: { fontSize: '1rem', fontWeight: '700', margin: '0 0 0.4rem', fontFamily: 'Georgia, serif' },
  actionDesc: { fontSize: '0.83rem', color: '#4a6070', margin: 0, lineHeight: '1.6' },
  actionArrow: { position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#f0c040', fontSize: '1.1rem' },
  notice: { display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.15)', borderRadius: '12px', padding: '1.2rem 1.5rem', marginBottom: '2rem' },
  noticeText: { color: '#7a95b0', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 },
  logoutBtn: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: '10px', color: '#ff6b6b', padding: '0.75rem 2rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' },
};

export default CustomerDashboard;
