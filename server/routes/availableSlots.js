const express = require('express');
const router = express.Router();
const AvailableSlot = require('../models/AvailableSlot');
const Doctor = require('../models/Doctors');

// Route to create an available slot
router.post('/create', async (req, res) => {
    try {
        const { doctorName, date, time } = req.body;

        const doctor = await Doctor.findOne({ name: doctorName });

        if (!doctor) {
            return res.status(400).json({ error: 'Doctor not found' });
        }

        const existingSlot = await AvailableSlot.findOne({ doctor, date, time });

        if (existingSlot) {
            return res.status(400).json({ error: 'Slot already exists' });
        }

        const availableSlot = new AvailableSlot({ doctor, date, time });
        await availableSlot.save();

        res.json({ message: 'Available slot created successfully', availableSlot });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get available slots for a specific doctor and date
router.get('/get', async (req, res) => {
    try {
        const { doctorName, date } = req.query;

        const doctor = await Doctor.findOne({ name: doctorName });

        if (!doctor) {
            return res.status(400).json({ error: 'Doctor not found' });
        }

        // Query the database to get available slots based on doctor and date
        const availableSlots = await AvailableSlot.find({ doctor, date });

        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
