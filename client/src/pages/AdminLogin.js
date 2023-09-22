import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/adminLogin', formData);
      localStorage.setItem('adminToken', response.data.token);
      // Redirect to admin dashboard
      window.location = '/admin/dashboard';
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            className="admin-login-input"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="admin-login-input"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="admin-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
