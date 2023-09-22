const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctors');
const AvailableSlot = require('../models/AvailableSlot'); // Assuming you have a model for AvailableSlot

// Route to get a list of doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const doctorsWithSlots = [];

    for (const doctor of doctors) {
      const slots = await AvailableSlot.find({ doctor: doctor._id });
      doctorsWithSlots.push({ ...doctor.toJSON(), slots });
    }

    res.json(doctorsWithSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
