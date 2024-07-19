const { google } = require('googleapis');
const { Event, User } = require('../models');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

google.options({ auth: oauth2Client });

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ include: User });
    res.render('events', { title: 'Events', events });
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

    const calendar = google.calendar({ version: 'v3' });
    const calendarEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        description: event.description,
        start: { dateTime: event.date },
        end: { dateTime: new Date(new Date(event.date).getTime() + 60 * 60 * 1000).toISOString() },
        location: event.location,
      },
    });

    await event.update({ googleCalendarId: calendarEvent.data.id });

    res.redirect('/events');
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event && event.userId === req.session.userId) {
      await event.update(req.body);

      const calendar = google.calendar({ version: 'v3' });
      await calendar.events.update({
        calendarId: 'primary',
        eventId: event.googleCalendarId,
        requestBody: {
          summary: event.title,
          description: event.description,
          start: { dateTime: event.date },
          end: { dateTime: new Date(new Date(event.date).getTime() + 60 * 60 * 1000).toISOString() },
          location: event.location,
        },
      });

      res.redirect('/events');
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
      const calendar = google.calendar({ version: 'v3' });
      await calendar.events.delete({
        calendarId: 'primary',
        eventId: event.googleCalendarId,
      });

      await event.destroy();

      res.redirect('/events');
    } else {
      res.status(404).json({ message: 'Event not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

exports.renderEditEventPage = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event && event.userId === req.session.userId) {
      res.render('editEvent', { title: 'Edit Event', ...event.dataValues });
    } else {
      res.status(404).json({ message: 'Event not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error rendering edit event page', error });
  }
};


exports.authGoogle = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  res.redirect(authUrl);
};

exports.oauth2callback = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    req.session.token = tokens;
    res.redirect('/events');
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating with Google', error });
  }
};
