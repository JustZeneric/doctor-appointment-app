import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="register-container">
      <Link to="/" className="home-button">HealthHub</Link>
      <div className="register-content">
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="register-link">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
};

export default Register;
