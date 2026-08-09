import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const mockTransactions = [
  { id: 1, type: 'Deposit', amount: 200000, date: '2024-11-10', status: 'Approved' },
  { id: 2, type: 'Withdrawal', amount: 50000, date: '2024-11-18', status: 'Approved' },
  { id: 3, type: 'Deposit', amount: 150000, date: '2024-12-01', status: 'Pending' },
];

const mockLoans = [
  { id: 1, amount: 500000, purpose: 'Home Renovation', date: '2024-10-05', status: 'Approved' },
  { id: 2, amount: 300000, purpose: 'Vehicle Purchase', date: '2024-11-20', status: 'Pending' },
];

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { state: customer } = useLocation();

  if (!customer) {
    navigate('/employee/customers');
    return null;
  }

  const statusStyle = (status) => ({
    padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
    background: status === 'Approved' ? 'rgba(129,199,132,0.12)' : status === 'Rejected' ? 'rgba(255,107,107,0.12)' : 'rgba(240,192,64,0.12)',
    border: `1px solid ${status === 'Approved' ? 'rgba(129,199,132,0.4)' : status === 'Rejected' ? 'rgba(255,107,107,0.4)' : 'rgba(240,192,64,0.4)'}`,
    color: status === 'Approved' ? '#81c784' : status === 'Rejected' ? '#ff6b6b' : '#f0c040',
  });

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => navigate('/employee/customers')}>← Back to Customer List</button>

        {/* Profile Card */}
        <div style={s.profileCard}>
          <span style={s.profileAvatar}>👤</span>
          <div style={s.profileInfo}>
            <h1 style={s.profileName}>{customer.name}</h1>
            <p style={s.profileAccount}>{customer.account}</p>
            <span style={{ ...s.statusBadge, ...(customer.status === 'Active' ? s.active : s.inactive) }}>
              {customer.status}
            </span>
          </div>
          <div style={s.balanceBox}>
            <p style={s.balanceLabel}>Account Balance</p>
            <p style={s.balanceValue}>PKR {customer.balance.toLocaleString()}</p>
          </div>
        </div>

        <div style={s.grid}>
          {/* Transaction History */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>💸 Transaction History</h2>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>{['Type', 'Amount (PKR)', 'Date', 'Status'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {mockTransactions.map(tx => (
                    <tr key={tx.id} style={s.tr}>
                      <td style={{ ...s.td, color: tx.type === 'Deposit' ? '#81c784' : '#4fc3f7', fontWeight: '700' }}>
                        {tx.type === 'Deposit' ? '↑' : '↓'} {tx.type}
                      </td>
                      <td style={s.td}>{tx.amount.toLocaleString()}</td>
                      <td style={{ ...s.td, color: '#4a6070' }}>{tx.date}</td>
                      <td style={s.td}><span style={statusStyle(tx.status)}>{tx.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loan History */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>📋 Loan History</h2>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>{['Amount (PKR)', 'Purpose', 'Date', 'Status'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {mockLoans.map(loan => (
                    <tr key={loan.id} style={s.tr}>
                      <td style={{ ...s.td, color: '#f0c040', fontWeight: '700' }}>{loan.amount.toLocaleString()}</td>
                      <td style={s.td}>{loan.purpose}</td>
                      <td style={{ ...s.td, color: '#4a6070' }}>{loan.date}</td>
                      <td style={s.td}><span style={statusStyle(loan.status)}>{loan.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const s = {
  wrapper: { display: 'flex', flexDirection: 'column', background: '#060f1e', minHeight: '100vh' },
  page: { flex: 1, padding: '2.5rem 3rem', paddingTop: 'calc(80px + 2.5rem)', fontFamily: 'sans-serif' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '2rem' },
  profileCard: { display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.15)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' },
  profileAvatar: { fontSize: '4rem' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: '1.8rem', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', margin: '0 0 4px' },
  profileAccount: { fontFamily: 'monospace', color: '#4fc3f7', fontSize: '0.95rem', margin: '0 0 10px' },
  statusBadge: { padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' },
  active: { background: 'rgba(129,199,132,0.12)', border: '1px solid rgba(129,199,132,0.4)', color: '#81c784' },
  inactive: { background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b' },
  balanceBox: { background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '14px', padding: '1.2rem 2rem', textAlign: 'center' },
  balanceLabel: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: '0 0 6px' },
  balanceValue: { fontSize: '1.5rem', fontWeight: '900', color: '#f0c040', margin: 0, fontFamily: 'Georgia, serif' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  section: {},
  sectionTitle: { fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '700', marginBottom: '1rem' },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '14px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '0.9rem 1rem', color: '#cdd9e5', fontSize: '0.88rem', verticalAlign: 'middle' },
};

export default CustomerDetails;
