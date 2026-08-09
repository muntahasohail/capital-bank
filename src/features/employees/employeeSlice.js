import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './employeeService';

export const getEmployees = createAsyncThunk('employees/getAll', fetchEmployees);
export const addEmployee = createAsyncThunk('employees/add', createEmployee);
export const editEmployee = createAsyncThunk('employees/edit', ({ id, updates }) => updateEmployee(id, updates));
export const removeEmployee = createAsyncThunk('employees/remove', deleteEmployee);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
      .addCase(getEmployees.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(addEmployee.fulfilled, (state, action) => { state.employees.push(action.payload); })
      .addCase(addEmployee.rejected, (state, action) => { state.error = action.error.message; })

      .addCase(editEmployee.fulfilled, (state, action) => {
        const idx = state.employees.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.employees[idx] = { ...state.employees[idx], ...action.payload };
      })

      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(e => e.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
