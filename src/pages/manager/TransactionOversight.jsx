import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const initialTx = [
  { id: 1, customer: 'Ahmed Raza', type: 'Deposit', amount: 500000, date: '2024-12-01', status: 'Approved' },
  { id: 2, customer: 'Fatima Malik', type: 'Withdrawal', amount: 250000, date: '2024-12-02', status: 'Pending' },
  { id: 3, customer: 'Bilal Siddiqui', type: 'Deposit', amount: 1200000, date: '2024-12-03', status: 'Pending' },
  { id: 4, customer: 'Nadia Hussain', type: 'Withdrawal', amount: 80000, date: '2024-12-04', status: 'Approved' },
  { id: 5, customer: 'Kamran Ali', type: 'Deposit', amount: 350000, date: '2024-12-05', status: 'Rejected' },
];

const TransactionOversight = () => {
  const navigate = useNavigate();
  const [txs, setTxs] = useState(initialTx);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? txs : txs.filter(t => t.status === filter);

  const statusStyle = (status) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700',
    background: status === 'Approved' ? 'rgba(129,199,132,0.12)' : status === 'Rejected' ? 'rgba(255,107,107,0.12)' : 'rgba(240,192,64,0.12)',
    border: `1px solid ${status === 'Approved' ? 'rgba(129,199,132,0.4)' : status === 'Rejected' ? 'rgba(255,107,107,0.4)' : 'rgba(240,192,64,0.4)'}`,
    color: status === 'Approved' ? '#81c784' : status === 'Rejected' ? '#ff6b6b' : '#f0c040',
  });

  const typeStyle = (type) => ({
    color: type === 'Deposit' ? '#81c784' : '#4fc3f7', fontWeight: '700',
  });

  const summaryCards = [
    { label: 'Total Transactions', value: txs.length, color: '#f0c040' },
    { label: 'Pending', value: txs.filter(t => t.status === 'Pending').length, color: '#f0c040' },
    { label: 'Approved', value: txs.filter(t => t.status === 'Approved').length, color: '#81c784' },
    { label: 'Rejected', value: txs.filter(t => t.status === 'Rejected').length, color: '#ff6b6b' },
  ];

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate('/manager/dashboard')}>← Dashboard</button>
        <div>
          <h1 style={s.title}>Transaction Oversight</h1>
          <p style={s.subtitle}>Monitor all deposit & withdrawal requests</p>
        </div>
      </div>

      <div style={s.summaryRow}>
        {summaryCards.map(c => (
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
            <tr>{['Customer', 'Type', 'Amount (PKR)', 'Date', 'Status'].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} style={s.tr}>
                <td style={s.td}><span style={s.avatar}>👤</span>{tx.customer}</td>
                <td style={{ ...s.td, ...typeStyle(tx.type) }}>{tx.type === 'Deposit' ? '↑' : '↓'} {tx.type}</td>
                <td style={{ ...s.td, fontWeight: '700', color: '#cdd9e5' }}>{tx.amount.toLocaleString()}</td>
                <td style={{ ...s.td, color: '#4a6070' }}>{tx.date}</td>
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
  avatar: { marginRight: '8px' },
};

export default TransactionOversight;
