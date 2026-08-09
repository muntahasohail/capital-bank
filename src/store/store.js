import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import loanReducer from '../features/loans/loanSlice';
import employeeReducer from '../features/employees/employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    transactions: transactionReducer,
    loans: loanReducer,
    employees: employeeReducer,
  },
});

export default store;
