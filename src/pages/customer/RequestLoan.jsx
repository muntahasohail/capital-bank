import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestLoan, resetSubmit } from '../../features/customers/customerSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const RequestLoan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { profile, submitting, submitSuccess, error } = useSelector(state => state.customers);
  const [form, setForm] = useState({ amount: '', purpose: '', duration: '', notes: '' });

  useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => { dispatch(resetSubmit()); navigate('/customer/loans'); }, 2000);
    }
  }, [submitSuccess, dispatch, navigate]);

  const handleSubmit = () => {
    if (!form.amount || !form.purpose || !form.duration) return;
    dispatch(requestLoan({
      customerId: user.uid,
      customerName: profile?.name || user.email,
      ...form,
    }));
  };

  const fields = [
    { name: 'amount', label: 'Requested Amount (PKR)', placeholder: 'e.g. 500000', type: 'number' },
    { name: 'purpose', label: 'Purpose of Loan', placeholder: 'e.g. Home Renovation', type: 'text' },
    { name: 'duration', label: 'Duration (Months)', placeholder: 'e.g. 12', type: 'number' },
  ];

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => navigate('/customer/dashboard')}>← Dashboard</button>

        <div style={s.formContainer}>
          <div style={s.formHeader}>
            <span style={s.formIcon}>📋</span>
            <div>
              <h1 style={s.title}>Request a Loan</h1>
              <p style={s.subtitle}>Fill in the details below — your request will be reviewed by bank staff</p>
            </div>
          </div>

          {submitSuccess && (
            <div style={s.successBanner}>
              ✅ Loan request submitted successfully! Redirecting to loan details...
            </div>
          )}
          {error && <div style={s.errorBanner}>⚠️ {error}</div>}

          <div style={s.formGrid}>
            {fields.map(f => (
              <div key={f.name} style={s.fieldWrap}>
                <label style={s.label}>{f.label}</label>
                <input style={s.input} type={f.type} placeholder={f.placeholder}
                  value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
              </div>
            ))}
            <div style={{ ...s.fieldWrap, gridColumn: '1 / -1' }}>
              <label style={s.label}>Notes (Optional)</label>
              <textarea style={s.textarea} placeholder="Any additional information..."
                value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>

          <div style={s.notice}>
            <span>ℹ️</span>
            <p style={s.noticeText}>
              Loans up to <strong style={{ color: '#f0c040' }}>PKR 1,000,000</strong> are processed by employees. Higher amounts are reviewed by the Manager. Your balance will only be updated after approval.
            </p>
          </div>

          <div style={s.actions}>
            <button style={s.submitBtn} onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : '✓ Submit Request'}
            </button>
            <button style={s.cancelBtn} onClick={() => navigate('/customer/dashboard')}>Cancel</button>
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
  formContainer: { maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.15)', borderRadius: '20px', padding: '2.5rem' },
  formHeader: { display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' },
  formIcon: { fontSize: '2.5rem' },
  title: { fontSize: '1.6rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', margin: 0 },
  subtitle: { color: '#4a6070', fontSize: '0.85rem', marginTop: '4px' },
  successBanner: { background: 'rgba(129,199,132,0.1)', border: '1px solid rgba(129,199,132,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#81c784', fontSize: '0.88rem', fontWeight: '600', marginBottom: '1.5rem' },
  errorBanner: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#ff6b6b', fontSize: '0.88rem', marginBottom: '1.5rem' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '600' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none' },
  textarea: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'vertical', minHeight: '90px' },
  notice: { display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.15)', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' },
  noticeText: { color: '#7a95b0', fontSize: '0.83rem', lineHeight: '1.6', margin: 0 },
  actions: { display: 'flex', gap: '1rem' },
  submitBtn: { background: 'linear-gradient(135deg, #f0c040, #c8860a)', color: '#0a1428', padding: '12px 32px', borderRadius: '25px', border: 'none', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer' },
  cancelBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8fa8c0', padding: '12px 32px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.95rem' },
};

export default RequestLoan;
