import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorRegistrationForm from './DoctorRegistrationForm';
import '../css/AdminDashboard.css'; // Import the CSS file
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://doctor-appointment-manager-e8b27b2bd3ef.herokuapp.com/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = async (e) => {
    const userId = e.target.value;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://doctor-appointment-manager-e8b27b2bd3ef.herokuapp.com/api/admin/appointments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
      setSelectedUserId(userId);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://doctor-appointment-manager-e8b27b2bd3ef.herokuapp.com/api/admin/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check the response (optional)
      console.log(response.data);

      // Update the list of appointments after deletion
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  
  const handleAddDoctorClick = () => {
    setIsAddDoctorModalOpen(true);
  };

  const handleAddDoctorModalClose = () => {
    setIsAddDoctorModalOpen(false);
  };

  const handleLogout = () => {
    // Remove the user's authentication token from local storage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page (you can replace this with any desired page)
    window.location.href = '/admin/login';
  };


  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-header">Admin Dashboard</h2>
      <button className="add-doctor-button" onClick={handleAddDoctorClick}>
        Add Doctor
      </button>

      <div>
        <select className="user-select" onChange={handleUserSelect}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <div>
          <h3>Appointments for User {selectedUserId}:</h3>
          <ul className="appointments-list">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="appointment-item">
                <strong>Date:</strong> {appointment.date}, <strong>Description:</strong> {appointment.description}
                <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAddDoctorModalOpen && (
        <div className="modal-background">
          <div className="modal-content">
            <h2>Add Doctor</h2>
            <DoctorRegistrationForm onClose={handleAddDoctorModalClose} />
          </div>
        </div>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;