const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  causes: { type: [String], default: [] },
});

// Static method to signup a user
userSchema.statics.signup = async function (name, email, contactNumber, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, contactNumber, password: hash });

  return user;
};

// Static method to login a user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);