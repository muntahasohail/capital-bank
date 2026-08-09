import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, addEmployee, editEmployee, removeEmployee } from '../../features/employees/employeeSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const empty = { name: '', email: '', password: '', role: 'Employee', salary: '' };

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(state => state.employees);

  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => { dispatch(getEmployees()); }, [dispatch]);

  const handleSave = async () => {
    if (!form.name || !form.email || !form.salary) { setFormError('Name, email and salary are required.'); return; }
    if (!editId && !form.password) { setFormError('Password is required for new employees.'); return; }
    setFormError(''); setSaving(true);
    try {
      if (editId) {
        await dispatch(editEmployee({ id: editId, updates: { name: form.name, role: form.role, salary: Number(form.salary) } })).unwrap();
      } else {
        await dispatch(addEmployee(form)).unwrap();
      }
      setForm(empty); setEditId(null); setShowForm(false);
    } catch (err) {
      setFormError(err.message || 'Something went wrong.');
    }
    setSaving(false);
  };

  const handleEdit = (emp) => {
    setForm({ name: emp.name, email: emp.email, password: '', role: emp.role, salary: emp.salary });
    setEditId(emp.id);
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this employee?')) dispatch(removeEmployee(id));
  };

  return (
    <div style={s.wrapper}>
      <Navbar />
      <div style={s.page}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => navigate('/manager/dashboard')}>← Dashboard</button>
          <div>
            <h1 style={s.title}>Employee Management</h1>
            <p style={s.subtitle}>Manage employee accounts, roles & salaries — synced with Firestore</p>
          </div>
          <button style={s.addBtn} onClick={() => { setForm(empty); setEditId(null); setShowForm(true); setFormError(''); }}>
            + Add Employee
          </button>
        </div>

        {showForm && (
          <div style={s.formCard}>
            <h3 style={s.formTitle}>{editId ? '✏️ Edit Employee' : '➕ New Employee'}</h3>
            {formError && <div style={s.errorBanner}>⚠️ {formError}</div>}
            <div style={s.formGrid}>
              <div style={s.fieldWrap}>
                <label style={s.label}>Full Name</label>
                <input style={s.input} placeholder="e.g. Ali Hassan" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={s.fieldWrap}>
                <label style={s.label}>Email Address</label>
                <input style={{ ...s.input, ...(editId ? s.inputDisabled : {}) }} placeholder="e.g. ali@bank.com"
                  value={form.email} disabled={!!editId}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              {!editId && (
                <div style={s.fieldWrap}>
                  <label style={s.label}>Password</label>
                  <input style={s.input} type="password" placeholder="Min. 6 characters" value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
              )}
              <div style={s.fieldWrap}>
                <label style={s.label}>Salary (PKR)</label>
                <input style={s.input} type="number" placeholder="e.g. 85000" value={form.salary}
                  onChange={e => setForm({ ...form, salary: e.target.value })} />
              </div>
              <div style={s.fieldWrap}>
                <label style={s.label}>Role</label>
                <select style={s.input} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option>Employee</option>
                  <option>Senior Employee</option>
                  <option>Branch Manager</option>
                </select>
              </div>
            </div>
            <div style={s.formActions}>
              <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : '✓ Save'}
              </button>
              <button style={s.cancelBtn} onClick={() => { setShowForm(false); setFormError(''); }}>Cancel</button>
            </div>
          </div>
        )}

        {error && <div style={s.errorBanner}>⚠️ {error}</div>}

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>{['Name', 'Email', 'Role', 'Salary (PKR)', 'Status', 'Actions'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={s.loadingCell}>Loading employees from Firestore...</td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan={6} style={s.loadingCell}>No employees found. Add one above.</td></tr>
              ) : employees.map(emp => (
                <tr key={emp.id} style={s.tr}>
                  <td style={s.td}><span style={s.avatar}>👤</span>{emp.name}</td>
                  <td style={s.td}>{emp.email}</td>
                  <td style={s.td}><span style={s.roleBadge}>{emp.role}</span></td>
                  <td style={{ ...s.td, color: '#f0c040', fontWeight: '700' }}>{Number(emp.salary).toLocaleString()}</td>
                  <td style={s.td}>
                    <span style={{ ...s.statusBadge, ...(emp.status === 'Active' ? s.active : s.inactive) }}>
                      {emp.status || 'Active'}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button style={s.editBtn} onClick={() => handleEdit(emp)}>Edit</button>
                    <button style={s.deleteBtn} onClick={() => handleDelete(emp.id)}>Delete</button>
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
  addBtn: { background: 'linear-gradient(135deg, #f0c040, #c8860a)', color: '#0a1428', padding: '10px 22px', borderRadius: '25px', border: 'none', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', flexShrink: 0 },
  formCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' },
  formTitle: { color: '#f0c040', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.2rem' },
  errorBanner: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '10px', padding: '0.8rem 1.2rem', color: '#ff6b6b', fontSize: '0.88rem', marginBottom: '1rem' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', fontWeight: '600' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem', outline: 'none' },
  inputDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  formActions: { display: 'flex', gap: '1rem' },
  saveBtn: { background: 'linear-gradient(135deg, #f0c040, #c8860a)', color: '#0a1428', padding: '10px 28px', borderRadius: '25px', border: 'none', fontWeight: '800', cursor: 'pointer' },
  cancelBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8fa8c0', padding: '10px 28px', borderRadius: '25px', cursor: 'pointer' },
  tableWrap: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,192,64,0.1)', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#f0c040', borderBottom: '1px solid rgba(240,192,64,0.1)', background: 'rgba(240,192,64,0.04)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem 1.2rem', color: '#cdd9e5', fontSize: '0.9rem', verticalAlign: 'middle' },
  loadingCell: { padding: '2rem', textAlign: 'center', color: '#4a6070', fontSize: '0.9rem' },
  avatar: { marginRight: '8px' },
  roleBadge: { background: 'rgba(240,192,64,0.1)', border: '1px solid rgba(240,192,64,0.25)', color: '#f0c040', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' },
  statusBadge: { padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' },
  active: { background: 'rgba(129,199,132,0.12)', border: '1px solid rgba(129,199,132,0.4)', color: '#81c784' },
  inactive: { background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b' },
  editBtn: { background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.3)', color: '#4fc3f7', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', marginRight: '8px' },
  deleteBtn: { background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem' },
};

export default EmployeeManagement;
