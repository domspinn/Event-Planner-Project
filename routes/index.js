const router = require('express').Router();
const eventRoutes = require('./api/eventRoutes');
const rsvpRoutes = require('./api/rsvpRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/event', eventRoutes);
router.use('/rsvp', rsvpRoutes);
router.use('/user', userRoutes);

module.exports = router;
