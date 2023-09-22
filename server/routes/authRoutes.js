const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, isAdmin } = req.body; // Make sure to include isAdmin
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, isAdmin }); // Include isAdmin when creating the user
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Login as a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964'); // Replace with your secret key

    // Add the user's name to the response
    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Admin login route
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await User.findOne({ email, isAdmin: true }); // Find admin user

    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: adminUser._id }, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964'); // Replace with your secret key

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
