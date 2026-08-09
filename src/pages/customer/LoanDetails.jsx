import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyLoans } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const LoanDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { myLoans, loading } = useSelector(state => state.customers);

  useEffect(() => {
    if (user?.uid) dispatch(getMyLoans(user.uid));
  }, [dispatch, user]);

  const statusStyle = (status) => {
    const map = {
      Approved: { bg: 'rgba(129,199,132,0.12)', border: 'rgba(129,199,132,0.4)', color: '#81c784' },
      Rejected: { bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.4)', color: '#ff6b6b' },
      Pending: { bg: 'rgba(240,192,64,0.12)', border: 'rgba(240,192,64,0.4)', color: '#f0c040' },
      'Forwarded to Manager': { bg: 'rgba(206,147,216,0.12)', border: 'rgba(206,147,216,0.4)', color: '#ce93d8' },
    };
    const m = map[status] || map.Pending;
    return { padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', background: m.bg, border: `1px solid ${m.border}`, color: m.color };
  };

  const summary = [
    { label: 'Total Loans', value: myLoans.length, color: '#f0c040' },
    { label: 'Approved', value: myLoans.filter(l => l.status === 'Approved').length, color: '#81c784' },
    { label: 'Pending', value: myLoans.filter(l => l.status === 'Pending').length, color: '#f0c040' },
    { label: 'Rejected', value: myLoans.filter(l => l.status === 'Rejected').length, color: '#ff6b6b' },
  ];

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate('/customer/dashboard')}>← Dashboard</button>
          <div>
            <h1 style={s.title}>Loan Details</h1>
            <p style={s.subtitle}>Your complete loan history — approved, pending & rejected</p>
          </div>
          <button style={s.requestBtn} onClick={() => navigate('/customer/request-loan')}>+ Request Loan</button>
        </div>

        <div style={s.summaryRow}>
          {summary.map(c => (
            <div key={c.label} style={s.summaryCard}>
              <p style={{ ...s.summaryValue, color: c.color }}>{c.value}</p>
              <p style={s.summaryLabel}>{c.label}</p>
            </div>
          ))}
        </div>

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>{['Amount (PKR)', 'Purpose', 'Duration', 'Notes', 'Date', 'Status'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={s.emptyCell}>Loading loans...</td></tr>
              ) : myLoans.length === 0 ? (
                <tr>
                  <td colSpan={6} style={s.emptyCell}>
                    No loans found. <span style={{ color: '#f0c040', cursor: 'pointer' }} onClick={() => navigate('/customer/request-loan')}>Request one →</span>
                  </td>
                </tr>
              ) : myLoans.map(loan => (
                <tr key={loan.id} style={s.tr}>
                  <td style={{ ...s.td, color: '#f0c040', fontWeight: '700' }}>{Number(loan.amount).toLocaleString()}</td>
                  <td style={s.td}>{loan.purpose}</td>
                  <td style={{ ...s.td, color: '#4fc3f7' }}>{loan.duration} months</td>
                  <td style={{ ...s.td, color: '#4a6070' }}>{loan.notes || '—'}</td>
                  <td style={{ ...s.td, color: '#4a6070' }}>{loan.createdAt?.slice(0, 10)}</td>
                  <td style={s.td}><span style={statusStyle(loan.status)}>{loan.status}</span></td>
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  requestBtn: { background: 'linear-gradient(135deg, #f0c040, #c8860a)', color: '#0a1428', padding: '10px 22px', borderRadius: '25px', border: 'none', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', flexShrink: 0 },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' },
  summaryCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' },
  summaryValue: { fontSize: '2rem', fontWeight: '900', margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  summaryLabel: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: 0 },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  emptyCell: { padding: '2rem', textAlign: 'center', color: '#4a6070', fontSize: '0.9rem' },
};

export default LoanDetails;
