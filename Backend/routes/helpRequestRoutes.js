const express = require('express');
const router = express.Router();
const helpRequestController = require('../controllers/helpRequestController');

// Create
router.post('/', helpRequestController.createHelpRequest);

// Read all
router.get('/', helpRequestController.getAllHelpRequests);

// Read one
router.get('/:id', helpRequestController.getHelpRequestById);

// Update
router.put('/:id', helpRequestController.updateHelpRequest);

// Delete
router.delete('/:id', helpRequestController.deleteHelpRequest);

// Add comment
router.post('/:id/comments', helpRequestController.addComment);

module.exports = router;
