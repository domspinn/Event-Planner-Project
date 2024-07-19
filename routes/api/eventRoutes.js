const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', authMiddleware, eventController.createEvent);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

router.get('/create', (req, res) => {
  res.render('createEvent', { title: 'Create Event' });
});

router.get('/edit/:id', eventController.renderEditEventPage);

router.post('/create', authMiddleware, eventController.createEvent);
router.post('/edit/:id', authMiddleware, eventController.updateEvent);
router.post('/delete/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
