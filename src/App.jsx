import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Footer from './components/footer'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import EmployeeManagement from './pages/manager/EmployeeManagement'
import LoanRequests from './pages/manager/LoanRequests'
import TransactionOversight from './pages/manager/TransactionOversight'
import CustomerManagement from './pages/manager/CustomerManagement'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import CustomerList from './pages/employee/CustomerList'
import CustomerDetails from './pages/employee/CustomerDetails'
import CreateCustomer from './pages/employee/CreateCustomer'
import EmployeeLoanRequests from './pages/employee/LoanRequests'
import TransactionRequests from './pages/employee/TransactionRequests'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import TransactionHistory from './pages/customer/TransactionHistory'
import LoanDetails from './pages/customer/LoanDetails'
import RequestLoan from './pages/customer/RequestLoan'
import TransactionRequest from './pages/customer/TransactionRequest'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/employees" element={<EmployeeManagement />} />
        <Route path="/manager/loans" element={<LoanRequests />} />
        <Route path="/manager/transactions" element={<TransactionOversight />} />
        <Route path="/manager/customers" element={<CustomerManagement />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/customers" element={<CustomerList />} />
        <Route path="/employee/customers/:id" element={<CustomerDetails />} />
        <Route path="/employee/create-customer" element={<CreateCustomer />} />
        <Route path="/employee/loans" element={<EmployeeLoanRequests />} />
        <Route path="/employee/transactions" element={<TransactionRequests />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/transactions" element={<TransactionHistory />} />
        <Route path="/customer/loans" element={<LoanDetails />} />
        <Route path="/customer/request-loan" element={<RequestLoan />} />
        <Route path="/customer/transaction-request/:type" element={<TransactionRequest />} />
      </Routes>
    </>
  )
}

export default App
