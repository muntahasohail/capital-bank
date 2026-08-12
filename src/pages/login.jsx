import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import bankImage from '../assets/images/image 3.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoading(true); setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const managerSnap = await getDocs(query(collection(db, 'managers'), where('uid', '==', uid)));
      if (!managerSnap.empty) { dispatch(login({ uid, email, role: 'manager' })); navigate('/manager/dashboard'); return; }

      const employeeSnap = await getDocs(query(collection(db, 'employees'), where('uid', '==', uid)));
      if (!employeeSnap.empty) { dispatch(login({ uid, email, role: 'employee' })); navigate('/employee/dashboard'); return; }

      const customerDoc = await getDoc(doc(db, 'customers', uid));
      if (customerDoc.exists()) { dispatch(login({ uid, email, role: 'customer' })); navigate('/customer/dashboard'); return; }

      dispatch(login({ uid, email, role: 'manager' }));
      navigate('/manager/dashboard');
    } catch (err) {
      setError(err.code + ': ' + err.message);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <div style={s.page}>
      {/* Left — Image Panel */}
      <div style={s.imagePanel}>
        <img src={bankImage} alt="Bank" style={s.image} />
        <div style={s.imageOverlay}>
          <div style={s.overlayContent}>
            <p style={s.overlayTag}>Welcome to</p>
            <h1 style={s.overlayTitle}>CAPITAL <span style={s.overlayHead}>BANK</span></h1>
            <div style={s.overlayDivider} />
            <p style={s.overlayDesc}>
              Trusted by over <span style={s.gold}>1,100 branches</span> across{' '}
              <span style={s.gold}>240 cities</span> — your financial future starts here.
            </p>
            <div style={s.badgeRow}>
              <span style={s.badge}>🔒 Secure</span>
              <span style={s.badge}>⚡ Fast</span>
              <span style={s.badge}>🌍 Global</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div style={s.formPanel}>
        <div style={s.formCard}>
          <div style={s.brandRow}>
            <span style={s.brandName}>Capital <span style={s.brandAccent}>Bank</span></span>
            <div style={s.brandDivider} />
          </div>

          <h2 style={s.title}>Welcome Back</h2>
          <p style={s.subtitle}>Sign in to your account to continue</p>

          <div style={s.divider} />

          {error && (
            <div style={s.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}

          <div style={s.fieldGroup}>
            <label style={s.label}>Email Address</label>
            <div style={s.inputWrap}>
              <span style={s.inputIcon}>✉️</span>
              <input
                style={s.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <span style={s.inputIcon}>🔑</span>
              <input
                style={s.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span style={s.eyeToggle} onClick={() => setShowPassword(v => !v)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <button style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }} onClick={handleLogin} disabled={loading}>
            {loading ? <span style={s.spinner}>⏳ Signing in...</span> : '→ Sign In'}
          </button>

          <p style={s.footNote}>
            Protected by 256-bit SSL encryption &nbsp;🔐
          </p>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { display: 'flex', minHeight: '100vh', background: '#060f1e', fontFamily: 'sans-serif' },

  // Left panel
  imagePanel: { flex: '0 0 55%', position: 'relative', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' },
  imageOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(6,15,30,0.85) 0%, rgba(10,20,40,0.6) 60%, rgba(6,15,30,0.4) 100%)',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5rem 4rem 3rem',
  },
  overlayContent: { maxWidth: '480px', marginTop: '1rem' },
  overlayTag: { fontSize: '0.998rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '600', marginBottom: '1.5rem' },
  overlayTitle: { fontSize: '3.3rem', fontWeight: '900', color: '#fff', fontFamily: '"Palatino Linotype", Georgia, serif', margin: '0 0  1.9rem', lineHeight: 1.1 },
  overlayHead: { color: '#f0c040', fontStyle: 'italic' },
  overlayDivider: { width: '70px', height: '4px', background: 'linear-gradient(90deg, #f0c040, transparent)', borderRadius: '2px', marginBottom: '1.9rem' },
  overlayDesc: { fontSize: '1.3rem', color: '#b0c4d8',fontStyle: 'italic' , lineHeight: '1.8', marginBottom: '2rem' },
  gold: { color: '#f0c040', fontWeight: '700' },
  badgeRow: { display: 'flex', gap: '0.8rem', flexWrap: 'wrap' },
  badge: { background: 'rgba(240,192,64,0.1)', border: '1px solid rgba(240,192,64,0.3)', color: '#f0c040', padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' },

  // Right panel
  formPanel: { flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4rem 2rem 2rem', background: 'linear-gradient(160deg, #0a1628 0%, #060f1e 100%)' },
  formCard: { width: '100%', maxWidth: '420px', marginTop: '1rem' },
  brandRow: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginBottom: '2.5rem' },
  brandIcon: { fontSize: '1.8rem' },
  brandName: { fontSize: '1.999rem', fontWeight: '800', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '1px', textTransform: 'uppercase' },
  brandAccent: { color: '#f0c040', fontStyle: 'italic' },
  brandDivider: { width: '70px', height: '4px', background: 'linear-gradient(90deg, #f0c040, transparent)', borderRadius: '2px' },
  title: { fontSize: '1.5rem', fontWeight: '600', color: '#fff', fontFamily: 'Georgia, serif', margin: '0 0 0.4rem' },
  subtitle: { fontSize: '0.88rem', color: '#4a6070', margin: '0 0 1.5rem' },
  divider: { width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(240,192,64,0.4), transparent)', marginBottom: '1.8rem' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '0.8rem 1rem', color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '1.2rem' },
  fieldGroup: { marginBottom: '1.2rem' },
  label: { display: 'block', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#8fa8c0', fontWeight: '600', marginBottom: '0.5rem' },
  inputWrap: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '12px', padding: '0 1rem', gap: '10px' },
  inputIcon: { fontSize: '1rem', flexShrink: 0 },
  input: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.95rem', padding: '0.9rem 0', fontFamily: 'sans-serif' },
  eyeToggle: { cursor: 'pointer', fontSize: '1rem', flexShrink: 0, userSelect: 'none' },
  btn: { width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #f0c040, #c8860a)', border: 'none', borderRadius: '12px', color: '#0a1428', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px', marginTop: '0.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(240,192,64,0.3)' },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  spinner: { fontSize: '0.95rem' },
  footNote: { textAlign: 'center', fontSize: '0.78rem', color: '#4a6070', margin: 0 },
};

export default Login;
