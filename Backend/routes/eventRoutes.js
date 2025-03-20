const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const requireAuth = require('../middleware/requireAuth');

// Apply authentication middleware to all event routes
router.use(requireAuth);

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getEvents);

// Get a single event by ID
router.get('/:id', getEventById);

// Update an event by ID
router.put('/:id', updateEvent);

// Delete an event by ID
router.delete('/:id', deleteEvent);

module.exports = router;