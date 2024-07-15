const { RSVP, Event } = require('../models');

exports.createRSVP = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (event) {
      const rsvp = await RSVP.create({ userId: req.session.userId, eventId: req.params.eventId });
      res.status(201).json(rsvp);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating RSVP', error });
  }
};

exports.deleteRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.findOne({ where: { userId: req.session.userId, eventId: req.params.eventId } });
    if (rsvp) {
      await rsvp.destroy();
      res.status(200).json({ message: 'RSVP cancelled' });
    } else {
      res.status(404).json({ message: 'RSVP not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling RSVP', error });
  }
};
