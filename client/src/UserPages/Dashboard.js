import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateAppointmentModal from './CreateAppointmentModal';
import EditAppointmentModal from './EditAppointmentModal';
import ConfirmationModal from './ConfirmationModal';
import '../css/DashboardStyles.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: '',
    patientName: '',
    date: '',
    time: '',
    description: '',
  });

  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentlyEditedAppointment, setCurrentlyEditedAppointment] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [cancelAppointmentId, setCancelAppointmentId] = useState(null);

  const appointmentTimes = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login'); // Navigate to the login page after logout
  };

  const handleOpenModal = (slots) => {
    console.log('Available Slots:', slots);
    setAvailableSlots(slots);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    handleOpenModal(doctor.slots);
  };

  const handleEditAppointment = (appointment) => {
    setCurrentlyEditedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleOpenConfirmationModal = (appointment) => {
    setCancelAppointmentId(appointment);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setCancelAppointmentId(null);
  };

  const handleSaveAppointment = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/appointments/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setAppointments([...appointments, response.data.appointment]);
      handleCloseModal();

      setFormData({
        doctorName: '',
        patientName: '',
        date: '',
        time: '',
        description: '',
      });
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleSaveEditedAppointment = async (editedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/appointments/update/${currentlyEditedAppointment._id}`,
        { description: editedData.description }, // Only send the updated description
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAppointment = response.data;

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment
            : appointment
        )
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const handleConfirmCancelAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/appointments/delete/${cancelAppointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(appointments.filter(appointment => appointment._id !== cancelAppointmentId));
      handleCloseConfirmationModal();
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const fetchAvailableDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/doctors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const doctors = response.data;

      setAvailableDoctors(doctors);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/appointments/get',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    fetchAppointments();
    fetchAvailableDoctors();
  }, []);

  return (
<div className="container">
<div className="header">
  <h2 className="title">Welcome {localStorage.getItem('name')}</h2>
  <button className="logout-button" onClick={handleLogout}>Logout</button>
</div>
  <h2 className="title">Dashboard</h2>

  <h2 className="title">Available Doctors:</h2>
  <ul className="list">
    {availableDoctors.map((doctor) => (
      <li className="list-item" key={doctor._id}>
          <div class="listname">
        <strong>Name:</strong> {doctor.name}
        </div>
        <div class="doctorbtns">
        <button className="button" onClick={() => handleSelectDoctor(doctor)}>
          Select Doctor
        </button>
        </div>
      </li>
    ))}
  </ul>

  <h2 className="title">Appointments:</h2>
  <ul className="list">
    {appointments.map((appointment) => (
      <li className="list-item" key={appointment._id}>
        <div class="date-lab">
        <strong className="label">Date:</strong>{' '}
        {new Date(appointment.date).toLocaleDateString()}{' '}
        </div>
        <div class="time-lab">
         <strong className="label">Time:</strong> {appointment.time || 'N/A'}{' '}
         </div>
        <div class="patient-name">
        <strong className="label">Patient Name:</strong> {appointment.patientName || 'N/A'}{' '}
        </div>
        <div class="description-container">
  <strong className="label">Description:</strong>
  <div className="description">
    {appointment.description || 'N/A'}
  </div>
</div>
<div class="action-btns">
        <button className="button" onClick={() => handleEditAppointment(appointment)}>
          Edit
        </button>
        <button className="button" onClick={() => handleOpenConfirmationModal(appointment._id)}>
          Cancel
        </button>
        </div>
      </li>
      
    ))}
  </ul>

  {isModalOpen && (
    <CreateAppointmentModal
      onClose={handleCloseModal}
      onSave={handleSaveAppointment}
      appointmentTimes={appointmentTimes}
      availableSlots={selectedDoctor ? selectedDoctor.slots : []}
      selectedDoctor={selectedDoctor}
    />
  )}

  {isEditModalOpen && (
    <EditAppointmentModal
      appointment={currentlyEditedAppointment}
      onSave={handleSaveEditedAppointment}
      onClose={() => setIsEditModalOpen(false)}
    />
  )}

  {isConfirmationModalOpen && (
    <ConfirmationModal
      onCancel={handleCloseConfirmationModal}
      onConfirm={handleConfirmCancelAppointment}
    />
  )}
</div>
  );
};

export default Dashboard;
