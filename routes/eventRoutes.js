const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/dashboard', eventController.getEvents);
router.get('/events/new', (req, res) => res.render('events/createEvent'));
router.post('/events/new', eventController.createEvent);
router.post('/events/:id/delete', eventController.deleteEvent);

module.exports = router;
