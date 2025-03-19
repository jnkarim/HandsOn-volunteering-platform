const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser } = require('../controllers/userController');

// Login
router.post('/login', loginUser);

// Signup
router.post('/signup', signupUser);

// Logout
router.post('/logout', logoutUser); // Add logout route

module.exports = router;