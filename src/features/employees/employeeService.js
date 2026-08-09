import { db, auth } from '../../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const COLLECTION = 'employees';

export const fetchEmployees = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const createEmployee = async ({ name, email, password, role, salary }) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const employeeData = {
    uid: userCred.user.uid,
    name,
    email,
    role: role || 'Employee',
    salary: Number(salary) || 0,
    status: 'Active',
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, COLLECTION), employeeData);
  return { id: docRef.id, ...employeeData };
};

export const updateEmployee = async (id, updates) => {
  await updateDoc(doc(db, COLLECTION, id), updates);
  return { id, ...updates };
};

export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id));
  return id;
};
