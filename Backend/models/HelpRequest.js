const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  user: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  urgency: { type: String, enum: ['low', 'medium', 'urgent'], default: 'low' },
  createdBy: String,
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
