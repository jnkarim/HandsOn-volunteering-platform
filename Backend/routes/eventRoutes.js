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

// Apply authentication middleware to all routes except GET /events
router.post('/', requireAuth, createEvent); // Only authenticated users can create events
router.get('/', getEvents); // Allow unauthenticated users to fetch events
router.get('/:id', getEventById); // Allow unauthenticated users to fetch a single event
router.put('/:id', requireAuth, updateEvent); // Only authenticated users can update events
router.delete('/:id', requireAuth, deleteEvent); // Only authenticated users can delete events

module.exports = router;