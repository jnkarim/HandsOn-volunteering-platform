const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, default: '' },
  category: { type: [String], default: [] },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Event creator
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of attendees
});

module.exports = mongoose.model('Event', eventSchema);