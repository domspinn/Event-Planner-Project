const express = require('express');
const router = express.Router();
const rsvpController = require('../../controllers/rsvpController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/:eventId/rsvp', authMiddleware, rsvpController.createRSVP);

router.delete('/:eventId/rsvp', authMiddleware, rsvpController.deleteRSVP);

module.exports = router;
