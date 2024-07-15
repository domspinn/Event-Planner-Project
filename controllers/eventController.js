const { Event, User } = require('../models');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ include: User });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: User });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, userId: req.session.userId });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event && event.userId === req.session.userId) {
      await event.update(req.body);
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event && event.userId === req.session.userId) {
      await event.destroy();
      res.status(200).json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'Event not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
