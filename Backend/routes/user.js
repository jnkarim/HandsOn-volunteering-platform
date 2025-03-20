const express = require('express');
const router = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

// Login
router.post('/login', loginUser);

// Signup
router.post('/signup', signupUser);

// Logout
router.post('/logout', logoutUser);

// Get user profile (protected route)
router.get('/profile', requireAuth, getProfile);

// Update user profile (protected route)
router.put('/profile', requireAuth, updateProfile);
module.exports = router;