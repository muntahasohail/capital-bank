import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestTransaction, resetSubmit } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const typeConfig = {
  Deposit:    { emoji: '↑', color: '#81c784', label: 'Deposit Request',    desc: 'Submit a deposit request to add funds to your account.' },
  Withdrawal: { emoji: '↓', color: '#4fc3f7', label: 'Withdrawal Request', desc: 'Submit a withdrawal request to take funds from your account.' },
  Donation:   { emoji: '🤲', color: '#ffb74d', label: 'Donation Request',  desc: 'Submit a donation request — processed by bank staff.' },
  Zakat:      { emoji: '🌙', color: '#ce93d8', label: 'Zakat Request',     desc: 'Submit a zakat request — processed by bank staff.' },
};

const TransactionRequest = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { profile, submitting, submitSuccess, error } = useSelector(state => state.customers);
  const [amount, setAmount] = useState('');
  const [txType, setTxType] = useState(type || 'Deposit');

  const config = typeConfig[txType] || typeConfig.Deposit;

  useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => { dispatch(resetSubmit()); navigate('/customer/transactions'); }, 2000);
    }
  }, [submitSuccess, dispatch, navigate]);

  const handleSubmit = () => {
    if (!amount) return;
    dispatch(requestTransaction({
      customerId: user.uid,
      customerName: profile?.name || user.email,
      type: txType,
      amount,
    }));
  };

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => navigate('/customer/dashboard')}>← Dashboard</button>

        <div style={s.formContainer}>
          <div style={s.formHeader}>
            <span style={s.formIcon}>{config.emoji}</span>
            <div>
              <h1 style={{ ...s.title, color: config.color }}>{config.label}</h1>
              <p style={s.subtitle}>{config.desc}</p>
            </div>
          </div>

          {/* Type Selector */}
          <div style={s.typeRow}>
            {Object.keys(typeConfig).map(t => (
              <button key={t} style={{ ...s.typeBtn, ...(txType === t ? { ...s.typeBtnActive, borderColor: typeConfig[t].color, color: typeConfig[t].color } : {}) }}
                onClick={() => setTxType(t)}>
                {typeConfig[t].emoji} {t}
              </button>
            ))}
          </div>

          {submitSuccess && (
            <div style={s.successBanner}>
              ✅ {txType} request submitted! Redirecting to transaction history...
            </div>
          )}
          {error && <div style={s.errorBanner}>⚠️ {error}</div>}

          <div style={s.fieldWrap}>
            <label style={s.label}>Amount (PKR)</label>
            <input style={s.input} type="number" placeholder="e.g. 50000"
              value={amount} onChange={e => setAmount(e.target.value)} />
          </div>

          <div style={s.notice}>
            <span>ℹ️</span>
            <p style={s.noticeText}>
              This request will be reviewed and processed by a bank employee or manager. Your balance will be updated only after approval.
            </p>
          </div>

          <div style={s.actions}>
            <button style={{ ...s.submitBtn, background: `linear-gradient(135deg, ${config.color}, #0a1428)` }}
              onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : `✓ Submit ${txType}`}
            </button>
            <button style={s.cancelBtn} onClick={() => navigate('/customer/dashboard')}>Cancel</button>
          </div>
        </div>

        {/* Recent Requests Preview */}
        <div style={s.recentWrap}>
          <p style={s.recentTitle}>Recent Requests</p>
          <button style={s.viewAllBtn} onClick={() => navigate('/customer/transactions')}>
            View Full History →
          </button>
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
  formContainer: { maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.15)', borderRadius: '20px', padding: '2.5rem', marginBottom: '2rem' },
  formHeader: { display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' },
  formIcon: { fontSize: '2.5rem' },
  title: { fontSize: '1.6rem', fontWeight: '800', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  typeRow: { display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  typeBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#8fa8c0', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' },
  typeBtnActive: { background: 'rgba(240,192,64,0.08)' },
  successBanner: { background: 'rgba(129,199,132,0.1)', border: '1px solid rgba(129,199,132,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#81c784', fontSize: '0.88rem', fontWeight: '600', marginBottom: '1.5rem' },
  errorBanner: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#ff6b6b', fontSize: '0.88rem', marginBottom: '1.5rem' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.5rem' },
  label: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '600' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '1rem', outline: 'none' },
  notice: { display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.15)', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' },
  noticeText: { color: '#7a95b0', fontSize: '0.83rem', lineHeight: '1.6', margin: 0 },
  actions: { display: 'flex', gap: '1rem' },
  submitBtn: { color: '#fff', padding: '12px 32px', borderRadius: '25px', border: 'none', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer' },
  cancelBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8fa8c0', padding: '12px 32px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.95rem' },
  recentWrap: { maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  recentTitle: { color: '#4a6070', fontSize: '0.85rem', margin: 0 },
  viewAllBtn: { background: 'transparent', border: 'none', color: '#f0c040', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700' },
};

export default TransactionRequest;
