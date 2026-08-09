import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTransactions } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { myTransactions, loading } = useSelector(state => state.customers);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (user?.uid) dispatch(getMyTransactions(user.uid));
  }, [dispatch, user]);

  const filtered = filter === 'All' ? myTransactions : myTransactions.filter(t => t.status === filter);

  const typeColor = (type) => ({ Deposit: '#81c784', Withdrawal: '#4fc3f7', Donation: '#ffb74d', Zakat: '#ce93d8' }[type] || '#cdd9e5');

  const statusStyle = (status) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700',
    background: status === 'Approved' ? 'rgba(129,199,132,0.12)' : status === 'Rejected' ? 'rgba(255,107,107,0.12)' : 'rgba(240,192,64,0.12)',
    border: `1px solid ${status === 'Approved' ? 'rgba(129,199,132,0.4)' : status === 'Rejected' ? 'rgba(255,107,107,0.4)' : 'rgba(240,192,64,0.4)'}`,
    color: status === 'Approved' ? '#81c784' : status === 'Rejected' ? '#ff6b6b' : '#f0c040',
  });

  const summary = [
    { label: 'Total', value: myTransactions.length, color: '#f0c040' },
    { label: 'Pending', value: myTransactions.filter(t => t.status === 'Pending').length, color: '#f0c040' },
    { label: 'Approved', value: myTransactions.filter(t => t.status === 'Approved').length, color: '#81c784' },
    { label: 'Rejected', value: myTransactions.filter(t => t.status === 'Rejected').length, color: '#ff6b6b' },
  ];

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate('/customer/dashboard')}>← Dashboard</button>
          <div>
            <h1 style={s.title}>Transaction History</h1>
            <p style={s.subtitle}>All your deposit, withdrawal, donation & zakat requests</p>
          </div>
        </div>

        <div style={s.summaryRow}>
          {summary.map(c => (
            <div key={c.label} style={s.summaryCard}>
              <p style={{ ...s.summaryValue, color: c.color }}>{c.value}</p>
              <p style={s.summaryLabel}>{c.label}</p>
            </div>
          ))}
        </div>

        <div style={s.filterRow}>
          {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
            <button key={f} style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>{['Type', 'Amount (PKR)', 'Date', 'Status'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={s.emptyCell}>Loading transactions...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} style={s.emptyCell}>No transactions found.</td></tr>
              ) : filtered.map(tx => (
                <tr key={tx.id} style={s.tr}>
                  <td style={{ ...s.td, color: typeColor(tx.type), fontWeight: '700' }}>
                    {tx.type === 'Deposit' ? '↑' : tx.type === 'Withdrawal' ? '↓' : '🤲'} {tx.type}
                  </td>
                  <td style={{ ...s.td, fontWeight: '700', color: '#fff' }}>{Number(tx.amount).toLocaleString()}</td>
                  <td style={{ ...s.td, color: '#4a6070' }}>{tx.date || tx.createdAt?.slice(0, 10)}</td>
                  <td style={s.td}><span style={statusStyle(tx.status)}>{tx.status}</span></td>
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
  header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' },
  summaryCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' },
  summaryValue: { fontSize: '2rem', fontWeight: '900', margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  summaryLabel: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: 0 },
  filterRow: { display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' },
  filterBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#8fa8c0', padding: '7px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' },
  filterActive: { background: 'rgba(240,192,64,0.12)', border: '1px solid rgba(240,192,64,0.4)', color: '#f0c040' },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  emptyCell: { padding: '2rem', textAlign: 'center', color: '#4a6070', fontSize: '0.9rem' },
};

export default TransactionHistory;
