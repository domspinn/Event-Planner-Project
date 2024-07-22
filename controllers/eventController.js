const { Event } = require('../models');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ where: { userId: req.session.userId } });
        res.render('events/dashboard', { events });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createEvent = async (req, res) => {
    const { title, date, location, description } = req.body;
    try {
        await Event.create({ title, date, location, description, userId: req.session.userId });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.destroy({ where: { id, userId: req.session.userId } });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json(error);
    }
};
