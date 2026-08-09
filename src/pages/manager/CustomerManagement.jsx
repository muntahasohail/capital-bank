import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const customers = [
  { id: 1, name: 'Ahmed Raza', email: 'ahmed@gmail.com', balance: 1250000, loans: 2, transactions: 14, status: 'Active' },
  { id: 2, name: 'Fatima Malik', email: 'fatima@gmail.com', balance: 870000, loans: 1, transactions: 9, status: 'Active' },
  { id: 3, name: 'Bilal Siddiqui', email: 'bilal@gmail.com', balance: 3200000, loans: 3, transactions: 22, status: 'Active' },
  { id: 4, name: 'Nadia Hussain', email: 'nadia@gmail.com', balance: 450000, loans: 0, transactions: 5, status: 'Inactive' },
  { id: 5, name: 'Kamran Ali', email: 'kamran@gmail.com', balance: 980000, loans: 1, transactions: 11, status: 'Active' },
];

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate('/manager/dashboard')}>← Dashboard</button>
        <div>
          <h1 style={s.title}>Customer Management</h1>
          <p style={s.subtitle}>View and monitor all customer accounts</p>
        </div>
        <input style={s.search} placeholder="🔍  Search customers..." value={search}
          onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={s.layout}>
        {/* List */}
        <div style={s.list}>
          {filtered.map(c => (
            <div key={c.id} style={{ ...s.customerCard, ...(selected?.id === c.id ? s.customerCardActive : {}) }}
              onClick={() => setSelected(c)}>
              <div style={s.customerAvatar}>👤</div>
              <div style={s.customerInfo}>
                <p style={s.customerName}>{c.name}</p>
                <p style={s.customerEmail}>{c.email}</p>
              </div>
              <span style={{ ...s.statusDot, background: c.status === 'Active' ? '#81c784' : '#ff6b6b' }} />
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div style={s.detail}>
          {selected ? (
            <>
              <div style={s.detailHeader}>
                <span style={s.detailAvatar}>👤</span>
                <div>
                  <h2 style={s.detailName}>{selected.name}</h2>
                  <p style={s.detailEmail}>{selected.email}</p>
                  <span style={{ ...s.statusBadge, background: selected.status === 'Active' ? 'rgba(129,199,132,0.12)' : 'rgba(255,107,107,0.12)', color: selected.status === 'Active' ? '#81c784' : '#ff6b6b', border: `1px solid ${selected.status === 'Active' ? 'rgba(129,199,132,0.4)' : 'rgba(255,107,107,0.4)'}` }}>
                    {selected.status}
                  </span>
                </div>
              </div>
              <div style={s.detailGrid}>
                {[
                  { label: 'Account Balance', value: `PKR ${selected.balance.toLocaleString()}`, color: '#f0c040' },
                  { label: 'Active Loans', value: selected.loans, color: '#4fc3f7' },
                  { label: 'Transactions', value: selected.transactions, color: '#81c784' },
                ].map(item => (
                  <div key={item.label} style={s.detailCard}>
                    <p style={{ ...s.detailValue, color: item.color }}>{item.value}</p>
                    <p style={s.detailLabel}>{item.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={s.emptyState}>
              <span style={s.emptyIcon}>👈</span>
              <p style={s.emptyText}>Select a customer to view details</p>
            </div>
          )}
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  search: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '25px', padding: '10px 18px', color: '#fff', fontSize: '0.88rem', outline: 'none', width: '240px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  customerCard: { display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.08)', borderRadius: '12px', padding: '1rem 1.2rem', cursor: 'pointer', transition: 'border-color 0.2s' },
  customerCardActive: { border: '1px solid rgba(240,192,64,0.4)', background: 'rgba(240,192,64,0.06)' },
  customerAvatar: { fontSize: '1.5rem' },
  customerInfo: { flex: 1 },
  customerName: { color: '#fff', fontWeight: '700', fontSize: '0.95rem', margin: 0 },
  customerEmail: { color: '#4a6070', fontSize: '0.8rem', margin: '2px 0 0' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  detail: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', padding: '2rem' },
  detailHeader: { display: 'flex', gap: '1.2rem', alignItems: 'flex-start', marginBottom: '2rem' },
  detailAvatar: { fontSize: '3rem' },
  detailName: { fontSize: '1.4rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: '0 0 4px' },
  detailEmail: { color: '#4a6070', fontSize: '0.85rem', margin: '0 0 8px' },
  statusBadge: { padding: '3px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700' },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' },
  detailCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '12px', padding: '1.2rem', textAlign: 'center' },
  detailValue: { fontSize: '1.4rem', fontWeight: '900', margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  detailLabel: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070', margin: 0 },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' },
  emptyIcon: { fontSize: '3rem' },
  emptyText: { color: '#4a6070', fontSize: '0.9rem' },
};

export default CustomerManagement;
