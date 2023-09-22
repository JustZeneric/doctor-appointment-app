// DoctorRegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/DoctorRegister.css';

const DoctorRegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/admin/create-doctor',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="doctor-registration-container">
      <h2 className="doctor-registration-header">Doctor Registration</h2>
      <div className="close-button" onClick={onClose}>X</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="doctor-registration-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="doctor-registration-input"
            required
          />
        </div>
        <div>
          <label className="doctor-registration-label">Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="doctor-registration-input"
            required
          />
        </div>
        <div>
          <label className="doctor-registration-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="doctor-registration-input"
            required
          />
        </div>
        <button type="submit" className="doctor-registration-button">Register Doctor</button>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;