const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { name, email, contactNumber, password } = req.body;

  try {
    const user = await User.signup(name, email, contactNumber, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ name, email, contactNumber, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout a user
const logoutUser = async (req, res) => {
  try {
    //return a success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, logoutUser, getProfile }; 