const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken'); // Import jwt

router.post('/create', async (req, res) => {
  try {
    const { date, time, description, doctorName, patientName } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964');
    const user = decoded.userId;

    if (!time) {
      return res.status(400).json({ error: 'Time is required' });
    }

    const appointment = new Appointment({ user, date, time, description, doctorName, patientName });
    await appointment.save();
    res.json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add this route to your existing code
router.put('/update/:id', async (req, res) => {
  try {
    const { description } = req.body; // Assuming you want to update the description

    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964');
    const user = decoded.userId;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user }, // Find appointment by ID and user
      { description }, // Update the description
      { new: true } // Return the updated appointment
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add this route to your existing code
router.delete('/delete/:id', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964');
    const user = decoded.userId;

    const deletedAppointment = await Appointment.findOneAndDelete(
      { _id: req.params.id, user } // Find appointment by ID and user
    );

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get Appointments
router.get('/get', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964');
    const user = decoded.userId;

    const appointments = await Appointment.find({ user });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
