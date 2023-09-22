import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://doctor-appointment-manager-e8b27b2bd3ef.herokuapp.com/api/auth/login', formData);
      console.log(response.data);
  
      // Save token and user name to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
  
      // Redirect to dashboard
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  

  return (
    <div className="login-container">
      <Link to="/" className="home-button">HealthHub</Link>
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="register-link">Don't have an account? <a href="/register">Register now</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;