import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const getEmployees = async () => {
  const snapshot = await getDocs(collection(db, 'employees'));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};