import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export const getLoans = createAsyncThunk('loans/getAll', async () => {
  const snap = await getDocs(collection(db, 'loans'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
});

export const updateLoanStatus = createAsyncThunk('loans/updateStatus', async ({ id, status }) => {
  await updateDoc(doc(db, 'loans', id), { status });
  return { id, status };
});

const loanSlice = createSlice({
  name: 'loans',
  initialState: { loans: [], loading: false, error: null },
  reducers: {
    setLoans: (state, action) => { state.loans = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoans.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getLoans.fulfilled, (state, action) => { state.loading = false; state.loans = action.payload; })
      .addCase(getLoans.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(updateLoanStatus.fulfilled, (state, action) => {
        const idx = state.loans.findIndex(l => l.id === action.payload.id);
        if (idx !== -1) state.loans[idx].status = action.payload.status;
      });
  },
});

export const { setLoans } = loanSlice.actions;
export default loanSlice.reducer;
