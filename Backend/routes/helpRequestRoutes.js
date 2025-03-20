const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');

// Get all help requests
router.get('/', async (req, res) => {
  try {
    const requests = await HelpRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a help request
router.post('/', async (req, res) => {
  const { title, description, urgency, createdBy } = req.body;
  try {
    const newRequest = new HelpRequest({ title, description, urgency, createdBy });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a comment to a help request
router.post('/:id/comment', async (req, res) => {
  const { text, user } = req.body;
  try {
    const request = await HelpRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Help request not found' });

    request.comments.push({ text, user });
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
