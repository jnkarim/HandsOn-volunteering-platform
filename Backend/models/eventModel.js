const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }, // Use Date type for better handling
  time: { type: String, required: true }, // You can also use Date type here if you prefer
  location: { type: String, default: '' },
  category: { type: [String], default: [] },
});

module.exports = mongoose.model('Event', eventSchema); // Corrected to export eventSchema