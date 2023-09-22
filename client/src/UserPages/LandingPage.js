import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
<div className="landing-container">
  <h2 className="landing-title">Welcome to the Appointment App</h2>
  <p className="landing-description">Manage your appointments easily!</p>
  <div className="landing-links">
    
    <Link to="/register" className="landing-link">
      Register
    </Link>
    <Link to="/login" className="landing-link">
      Login
    </Link>
    <Link to="/admin/login" className="landing-link">
      Login as Admin
    </Link>
  </div>
</div>
  );
};

export default LandingPage;
