import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export const getTransactions = createAsyncThunk('transactions/getAll', async () => {
  const snap = await getDocs(collection(db, 'transactions'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
});

export const updateTransactionStatus = createAsyncThunk('transactions/updateStatus', async ({ id, status }) => {
  await updateDoc(doc(db, 'transactions', id), { status });
  return { id, status };
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: { transactions: [], loading: false, error: null },
  reducers: {
    setTransactions: (state, action) => { state.transactions = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getTransactions.fulfilled, (state, action) => { state.loading = false; state.transactions = action.payload; })
      .addCase(getTransactions.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const idx = state.transactions.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.transactions[idx].status = action.payload.status;
      });
  },
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
