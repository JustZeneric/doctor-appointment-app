import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './UserPages/Register';
import Login from './UserPages/Login';
import Dashboard from './UserPages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './UserPages/LandingPage';


function App() {
  const isAdmin = true; // Set this based on your authentication logic

  
    return (
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {isAdmin ? (
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            ) : (
              <Navigate to="/login" />
            )}
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;
