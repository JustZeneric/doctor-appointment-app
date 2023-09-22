const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const availableSlotsRoutes = require('./routes/availableSlots');
const { generateTimeSlots } = require('./Utils/timeSlots'); // Import the generateTimeSlots function

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware code
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:1234@tasknest.orfrlpg.mongodb.net/MangApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Generate time slots and log them to the console
const timeSlots = generateTimeSlots();
console.log('Generated Time Slots:', timeSlots);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', adminAuthRoutes);
app.use('/availableSlots', availableSlotsRoutes);
app.use('/api/doctors', require('./routes/doctorRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
