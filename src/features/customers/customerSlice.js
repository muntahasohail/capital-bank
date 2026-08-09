import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import {
  fetchCustomerProfile,
  fetchCustomerTransactions,
  fetchCustomerLoans,
  submitLoanRequest,
  submitTransactionRequest,
} from './customerService';

// Manager/Employee thunks
export const getCustomers = createAsyncThunk('customers/getAll', async () => {
  const snap = await getDocs(collection(db, 'customers'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
});

export const updateCustomerBalance = createAsyncThunk('customers/updateBalance', async ({ id, balance }) => {
  await updateDoc(doc(db, 'customers', id), { balance });
  return { id, balance };
});

// Customer-specific thunks
export const getCustomerProfile = createAsyncThunk('customers/getProfile', fetchCustomerProfile);
export const getMyTransactions = createAsyncThunk('customers/getMyTransactions', fetchCustomerTransactions);
export const getMyLoans = createAsyncThunk('customers/getMyLoans', fetchCustomerLoans);
export const requestLoan = createAsyncThunk('customers/requestLoan', submitLoanRequest);
export const requestTransaction = createAsyncThunk('customers/requestTransaction', submitTransactionRequest);

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [], loading: false, error: null,
    profile: null,
    myTransactions: [], myLoans: [],
    submitting: false, submitSuccess: false,
  },
  reducers: {
    setCustomers: (state, action) => { state.customers = action.payload; },
    resetSubmit: (state) => { state.submitSuccess = false; state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // All customers
      .addCase(getCustomers.pending, (state) => { state.loading = true; })
      .addCase(getCustomers.fulfilled, (state, action) => { state.loading = false; state.customers = action.payload; })
      .addCase(getCustomers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(updateCustomerBalance.fulfilled, (state, action) => {
        const idx = state.customers.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.customers[idx].balance = action.payload.balance;
      })
      // Profile
      .addCase(getCustomerProfile.fulfilled, (state, action) => { state.profile = action.payload; })
      // My transactions
      .addCase(getMyTransactions.fulfilled, (state, action) => { state.myTransactions = action.payload; })
      // My loans
      .addCase(getMyLoans.fulfilled, (state, action) => { state.myLoans = action.payload; })
      // Submit loan
      .addCase(requestLoan.pending, (state) => { state.submitting = true; state.submitSuccess = false; })
      .addCase(requestLoan.fulfilled, (state, action) => {
        state.submitting = false; state.submitSuccess = true;
        state.myLoans.unshift(action.payload);
      })
      .addCase(requestLoan.rejected, (state, action) => { state.submitting = false; state.error = action.error.message; })
      // Submit transaction
      .addCase(requestTransaction.pending, (state) => { state.submitting = true; state.submitSuccess = false; })
      .addCase(requestTransaction.fulfilled, (state, action) => {
        state.submitting = false; state.submitSuccess = true;
        state.myTransactions.unshift(action.payload);
      })
      .addCase(requestTransaction.rejected, (state, action) => { state.submitting = false; state.error = action.error.message; });
  },
});

export const { setCustomers, resetSubmit } = customerSlice.actions;
export default customerSlice.reducer;
