const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctors');
const AvailableSlot = require('../models/AvailableSlot');
const { generateTimeSlots } = require('../utils/timeSlots');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointments for a specific user
router.get('/appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const appointments = await Appointment.find({ user: userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/appointments/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

router.post('/create-doctor', async (req, res) => {
  try {
      const { name, specialty, email } = req.body;

      // Create the doctor document
      const doctor = new Doctor({ name, specialty, email });
      await doctor.save();

      // Generate time slots and associate them with the doctor
      const timeSlots = generateTimeSlots(); 
      const availableSlots = timeSlots.map((time) => ({
          doctor: doctor._id,
          date: new Date(), 
          time,
      }));
      await AvailableSlot.insertMany(availableSlots);

      res.json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
module.exports = router;
