import { db } from '../../firebase/firebaseConfig';
import {
  doc, getDoc, collection, addDoc, query, where, getDocs,
} from 'firebase/firestore';

export const fetchCustomerProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'customers', uid));
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
};

export const fetchCustomerTransactions = async (customerId) => {
  const q = query(collection(db, 'transactions'), where('customerId', '==', customerId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const fetchCustomerLoans = async (customerId) => {
  const q = query(collection(db, 'loans'), where('customerId', '==', customerId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const submitLoanRequest = async ({ customerId, customerName, amount, purpose, duration, notes }) => {
  const data = {
    customerId, customerName, amount: Number(amount),
    purpose, duration: Number(duration), notes: notes || '',
    status: 'Pending', createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, 'loans'), data);
  return { id: ref.id, ...data };
};

export const submitTransactionRequest = async ({ customerId, customerName, type, amount }) => {
  const data = {
    customerId, customerName, type,
    amount: Number(amount), status: 'Pending',
    createdAt: new Date().toISOString(),
    date: new Date().toISOString().slice(0, 10),
  };
  const ref = await addDoc(collection(db, 'transactions'), data);
  return { id: ref.id, ...data };
};
