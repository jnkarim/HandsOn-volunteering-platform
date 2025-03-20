const Event = require('../models/eventModel');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields: title, description, date, and time.' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location: location || '',
      category: category || [],
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: savedEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error while creating the event.' });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(400).json({ message: 'Server error while fetching events.' });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(400).json({ message: 'Server error while fetching the event.' });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, time, location, category },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json({ message: 'Event updated successfully!', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: 'Server error while updating the event.' });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json({ message: 'Event deleted successfully!' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(400).json({ message: 'Server error while deleting the event.' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};