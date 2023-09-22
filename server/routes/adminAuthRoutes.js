// adminAuthRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  console.log('Email:', email); // Add this line
  console.log('Password:', password); // Add this line
  
  try {
    const adminUser = await User.findOne({ email, isAdmin: true }); // Find admin user

    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: adminUser._id }, '466f5a19cfd0eb1e39c375af2faf27ab7a30d5e4b1c2ad2307f5e9071772f8af540566fbc68fb4abac70ee31b52c379d0454402550381c9ad1346f361e600964');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
