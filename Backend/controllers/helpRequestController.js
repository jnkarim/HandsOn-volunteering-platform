const HelpRequest = require('../models/HelpRequest');

// Create a new help request
const createHelpRequest = async (req, res) => {
  try {
    const { title, description, urgency, createdBy } = req.body;

    const newHelpRequest = new HelpRequest({
      title,
      description,
      urgency,
      createdBy,
    });

    const savedHelpRequest = await newHelpRequest.save();

    res.status(201).json(savedHelpRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating help request', error });
  }
};

// Get all help requests
const getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find().sort({ createdAt: -1 });
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching help requests', error });
  }
};

// Get a single help request by ID
const getHelpRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const helpRequest = await HelpRequest.findById(id);

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json(helpRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching help request', error });
  }
};

// Update a help request by ID
const updateHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedHelpRequest = await HelpRequest.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedHelpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json(updatedHelpRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating help request', error });
  }
};

// Delete a help request by ID
const deleteHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHelpRequest = await HelpRequest.findByIdAndDelete(id);

    if (!deletedHelpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json({ message: 'Help request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting help request', error });
  }
};

// Add a comment to a help request
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user } = req.body;

    const helpRequest = await HelpRequest.findById(id);

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    const newComment = {
      text,
      user,
    };

    helpRequest.comments.push(newComment);
    await helpRequest.save();

    res.status(201).json(helpRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

module.exports = {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
  addComment,
};
