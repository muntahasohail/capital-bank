import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const CustomerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, loading } = useSelector(state => state.customers);
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(getCustomers()); }, [dispatch]);

  const filtered = customers.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.account?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate('/employee/dashboard')}>← Dashboard</button>
          <div>
            <h1 style={s.title}>Customer List</h1>
            <p style={s.subtitle}>All registered customer accounts — live from Firestore</p>
          </div>
          <input style={s.search} placeholder="🔍  Search by name or account..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>{['#', 'Customer Name', 'Account Number', 'Balance (PKR)', 'Status', 'Action'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={s.loadingCell}>Loading customers from Firestore...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} style={s.loadingCell}>No customers found.</td></tr>
              ) : filtered.map((c, i) => (
                <tr key={c.id} style={s.tr}>
                  <td style={{ ...s.td, color: '#4a6070' }}>{i + 1}</td>
                  <td style={s.td}>
                    <div style={s.nameCell}>
                      <span style={s.avatar}>👤</span>
                      <span style={s.name}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ ...s.td, fontFamily: 'monospace', color: '#4fc3f7' }}>{c.account || '—'}</td>
                  <td style={{ ...s.td, color: '#f0c040', fontWeight: '700' }}>
                    {Number(c.balance || 0).toLocaleString()}
                  </td>
                  <td style={s.td}>
                    <span style={{ ...s.statusBadge, ...(c.status === 'Active' ? s.active : s.inactive) }}>
                      {c.status || 'Active'}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button style={s.viewBtn}
                      onClick={() => navigate(`/employee/customers/${c.id}`, { state: c })}>
                      View Details →
                    </button>
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  search: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '25px', padding: '10px 18px', color: '#fff', fontSize: '0.88rem', outline: 'none', width: '280px' },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  loadingCell: { padding: '2rem', textAlign: 'center', color: '#4a6070', fontSize: '0.9rem' },
  nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { fontSize: '1.2rem' },
  name: { fontWeight: '600', color: '#fff' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700' },
  active: { background: 'rgba(129,199,132,0.12)', border: '1px solid rgba(129,199,132,0.4)', color: '#81c784' },
  inactive: { background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b' },
  viewBtn: { background: 'rgba(240,192,64,0.1)', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700' },
};

export default CustomerList;
