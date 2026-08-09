import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoans, updateLoanStatus } from '../../features/loans/loanSlice';
import { updateCustomerBalance } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const LoanRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loans, loading } = useSelector(state => state.loans);
  const { customers } = useSelector(state => state.customers);

  useEffect(() => { dispatch(getLoans()); }, [dispatch]);

  const handleApprove = async (loan) => {
    await dispatch(updateLoanStatus({ id: loan.id, status: 'Approved' }));
    // Add loan amount to customer balance
    const customer = customers.find(c => c.id === loan.customerId);
    if (customer) {
      await dispatch(updateCustomerBalance({ id: customer.id, balance: (customer.balance || 0) + loan.amount }));
    }
  };

  const handleReject = (id) => dispatch(updateLoanStatus({ id, status: 'Rejected' }));

  const statusStyle = (status) => {
    const map = {
      'Approved': { bg: 'rgba(129,199,132,0.12)', border: 'rgba(129,199,132,0.4)', color: '#81c784' },
      'Rejected': { bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.4)', color: '#ff6b6b' },
      'Forwarded to Manager': { bg: 'rgba(206,147,216,0.12)', border: 'rgba(206,147,216,0.4)', color: '#ce93d8' },
      'Pending': { bg: 'rgba(240,192,64,0.12)', border: 'rgba(240,192,64,0.4)', color: '#f0c040' },
    };
    const m = map[status] || map['Pending'];
    return { padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', background: m.bg, border: `1px solid ${m.border}`, color: m.color };
  };

  const actionable = loans.filter(l => l.status === 'Pending' && l.amount <= 1000000).length;

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate('/employee/dashboard')}>← Dashboard</button>
          <div>
            <h1 style={s.title}>Loan Requests</h1>
            <p style={s.subtitle}>Approve loans up to PKR 1,000,000 — high-value loans forwarded to Manager</p>
          </div>
          <div style={s.badge}>
            <span style={s.badgeCount}>{actionable}</span>
            <span style={s.badgeLabel}>Actionable</span>
          </div>
        </div>

        <div style={s.notice}>
          <span>⚠️</span>
          <p style={s.noticeText}>Loans exceeding <strong style={{ color: '#ce93d8' }}>PKR 1,000,000</strong> are marked <strong style={{ color: '#ce93d8' }}>Forwarded to Manager</strong> and cannot be approved here.</p>
        </div>

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>{['Customer', 'Amount (PKR)', 'Purpose', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={s.loadingCell}>Loading loans from Firestore...</td></tr>
              ) : loans.length === 0 ? (
                <tr><td colSpan={6} style={s.loadingCell}>No loan requests found.</td></tr>
              ) : loans.map(loan => (
                <tr key={loan.id} style={s.tr}>
                  <td style={s.td}><span style={s.avatar}>👤</span>{loan.customerName || loan.customer}</td>
                  <td style={{ ...s.td, color: loan.amount > 1000000 ? '#ce93d8' : '#f0c040', fontWeight: '700' }}>
                    {Number(loan.amount).toLocaleString()}
                    {loan.amount > 1000000 && <span style={s.highTag}> HIGH</span>}
                  </td>
                  <td style={s.td}>{loan.purpose}</td>
                  <td style={{ ...s.td, color: '#4a6070' }}>{loan.date || loan.createdAt?.slice(0, 10)}</td>
                  <td style={s.td}><span style={statusStyle(loan.status)}>{loan.status}</span></td>
                  <td style={s.td}>
                    {loan.status === 'Pending' && loan.amount <= 1000000 ? (
                      <>
                        <button style={s.approveBtn} onClick={() => handleApprove(loan)}>✓ Approve</button>
                        <button style={s.rejectBtn} onClick={() => handleReject(loan.id)}>✕ Reject</button>
                      </>
                    ) : (
                      <span style={{ color: '#4a6070', fontSize: '0.82rem' }}>—</span>
                    )}
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' },
  backBtn: { background: 'transparent', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 },
  title: { fontSize: '1.8rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  badge: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '12px', padding: '0.8rem 1.5rem', flexShrink: 0 },
  badgeCount: { fontSize: '2rem', fontWeight: '900', color: '#f0c040', lineHeight: '1' },
  badgeLabel: { fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a6070' },
  notice: { display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(206,147,216,0.06)', border: '1px solid rgba(206,147,216,0.15)', borderRadius: '10px', padding: '1rem 1.2rem', marginBottom: '1.5rem' },
  noticeText: { color: '#7a95b0', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  loadingCell: { padding: '2rem', textAlign: 'center', color: '#4a6070', fontSize: '0.9rem' },
  avatar: { marginRight: '8px' },
  highTag: { fontSize: '0.65rem', background: 'rgba(206,147,216,0.2)', color: '#ce93d8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', letterSpacing: '1px' },
  approveBtn: { background: 'rgba(129,199,132,0.1)', border: '1px solid rgba(129,199,132,0.3)', color: '#81c784', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', marginRight: '8px', fontWeight: '700' },
  rejectBtn: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700' },
};

export default LoanRequests;
