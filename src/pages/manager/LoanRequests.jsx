import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const initialLoans = [
  { id: 1, customer: 'Ahmed Raza', amount: 2500000, purpose: 'Business Expansion', date: '2024-12-01', status: 'Pending' },
  { id: 2, customer: 'Fatima Malik', amount: 1800000, purpose: 'Home Construction', date: '2024-12-03', status: 'Pending' },
  { id: 3, customer: 'Bilal Siddiqui', amount: 3200000, purpose: 'Commercial Property', date: '2024-12-05', status: 'Pending' },
  { id: 4, customer: 'Nadia Hussain', amount: 1200000, purpose: 'Vehicle Purchase', date: '2024-12-06', status: 'Approved' },
];

const LoanRequests = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState(initialLoans);

  const updateStatus = (id, status) =>
    setLoans(loans.map(l => l.id === id ? { ...l, status } : l));

  const statusStyle = (status) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700',
    background: status === 'Approved' ? 'rgba(129,199,132,0.12)' : status === 'Rejected' ? 'rgba(255,107,107,0.12)' : 'rgba(240,192,64,0.12)',
    border: `1px solid ${status === 'Approved' ? 'rgba(129,199,132,0.4)' : status === 'Rejected' ? 'rgba(255,107,107,0.4)' : 'rgba(240,192,64,0.4)'}`,
    color: status === 'Approved' ? '#81c784' : status === 'Rejected' ? '#ff6b6b' : '#f0c040',
  });

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate('/manager/dashboard')}>← Dashboard</button>
        <div>
          <h1 style={s.title}>Loan Requests</h1>
          <p style={s.subtitle}>High-value loan approvals — amounts exceeding PKR 1,000,000</p>
        </div>
        <div style={s.badge}>
          <span style={s.badgeCount}>{loans.filter(l => l.status === 'Pending').length}</span>
          <span style={s.badgeLabel}>Pending</span>
        </div>
      </div>

      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>{['Customer', 'Amount (PKR)', 'Purpose', 'Date', 'Status', 'Actions'].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.id} style={s.tr}>
                <td style={s.td}><span style={s.avatar}>👤</span>{loan.customer}</td>
                <td style={{ ...s.td, color: '#f0c040', fontWeight: '700' }}>
                  {loan.amount.toLocaleString()}
                </td>
                <td style={s.td}>{loan.purpose}</td>
                <td style={{ ...s.td, color: '#4a6070' }}>{loan.date}</td>
                <td style={s.td}><span style={statusStyle(loan.status)}>{loan.status}</span></td>
                <td style={s.td}>
                  {loan.status === 'Pending' && (
                    <>
                      <button style={s.approveBtn} onClick={() => updateStatus(loan.id, 'Approved')}>✓ Approve</button>
                      <button style={s.rejectBtn} onClick={() => updateStatus(loan.id, 'Rejected')}>✕ Reject</button>
                    </>
                  )}
                  {loan.status !== 'Pending' && <span style={{ color: '#4a6070', fontSize: '0.82rem' }}>Resolved</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <Footer />
    </div>
  );
};

const s = {
  wrapper: { display: 'flex', flexDirection: 'column', background: '#060f1e', minHeight: '100vh' },
  page: { flex: 1, padding: '2.5rem 3rem', paddingTop: 'calc(80px + 2.5rem)', fontFamily: 'sans-serif' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  badge: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '12px', padding: '0.8rem 1.5rem' },
  badgeCount: { fontSize: '2rem', fontWeight: '900', color: '#f0c040', lineHeight: '1' },
  badgeLabel: { fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070' },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  avatar: { marginRight: '8px' },
  approveBtn: { background: 'rgba(129,199,132,0.1)', border: '1px solid rgba(129,199,132,0.3)', color: '#81c784', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', marginRight: '8px', fontWeight: '700' },
  rejectBtn: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700' },
};

export default LoanRequests;
