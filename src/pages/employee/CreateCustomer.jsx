import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', balance: '', account: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required.'); return;
    }
    setLoading(true); setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, 'customers', userCred.user.uid), {
        name: form.name,
        email: form.email,
        account: form.account || `BA-${Date.now()}`,
        balance: Number(form.balance) || 0,
        role: 'customer',
        status: 'Active',
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setForm({ name: '', email: '', password: '', balance: '', account: '' });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <button style={s.backBtn} onClick={() => navigate('/employee/dashboard')}>← Dashboard</button>

        <div style={s.formContainer}>
          <div style={s.formHeader}>
            <span style={s.formIcon}>➕</span>
            <div>
              <h1 style={s.title}>Create Customer Account</h1>
              <p style={s.subtitle}>Generate Firebase credentials and set up initial account details</p>
            </div>
          </div>

          {success && (
            <div style={s.successBanner}>
              ✅ Customer account created successfully!
              <button style={s.successClose} onClick={() => setSuccess(false)}>✕</button>
            </div>
          )}
          {error && <div style={s.errorBanner}>⚠️ {error}</div>}

          <div style={s.formGrid}>
            {[
              { name: 'name', label: 'Full Name', placeholder: 'e.g. Ahmed Raza', type: 'text' },
              { name: 'email', label: 'Email Address', placeholder: 'e.g. ahmed@gmail.com', type: 'email' },
              { name: 'password', label: 'Password', placeholder: 'Min. 6 characters', type: 'password' },
              { name: 'account', label: 'Account Number (optional)', placeholder: 'e.g. BA-001-2024', type: 'text' },
              { name: 'balance', label: 'Initial Balance (PKR)', placeholder: 'e.g. 50000', type: 'number' },
            ].map(field => (
              <div key={field.name} style={s.fieldWrap}>
                <label style={s.label}>{field.label}</label>
                <input
                  style={s.input}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div style={s.notice}>
            <span>🔒</span>
            <p style={s.noticeText}>Customer will be able to log in using the provided email and password. They will have restricted access — login only.</p>
          </div>

          <div style={s.actions}>
            <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating...' : '✓ Create Account'}
            </button>
            <button style={s.cancelBtn} onClick={() => navigate('/employee/dashboard')}>Cancel</button>
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
  successBanner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(129,199,132,0.1)', border: '1px solid rgba(129,199,132,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#81c784', fontSize: '0.88rem', fontWeight: '600', marginBottom: '1.5rem' },
  successClose: { background: 'none', border: 'none', color: '#81c784', cursor: 'pointer', fontSize: '1rem' },
  errorBanner: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '0.9rem 1.2rem', color: '#ff6b6b', fontSize: '0.88rem', marginBottom: '1.5rem' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '600' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none' },
  notice: { display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.15)', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' },
  noticeText: { color: '#7a95b0', fontSize: '0.83rem', lineHeight: '1.6', margin: 0 },
  actions: { display: 'flex', gap: '1rem' },
  submitBtn: { background: 'linear-gradient(135deg, #f0c040, #c8860a)', color: '#0a1428', padding: '12px 32px', borderRadius: '25px', border: 'none', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', letterSpacing: '0.5px' },
  cancelBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8fa8c0', padding: '12px 32px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.95rem' },
};

export default CreateCustomer;
