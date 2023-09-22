const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const availableSlotsRoutes = require('./routes/availableSlots');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware code
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', adminAuthRoutes);
app.use('/availableSlots', availableSlotsRoutes);
app.use('/api/doctors', require('./routes/doctorRoutes'));

// Serve static files from the client's build folder
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
