const sequelize = require('../config/connection');

const User = require('./user');
const Event = require('./event');
const RSVP = require('./rsvp');

User.hasMany(Event, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'userId'
});

User.belongsToMany(Event, {
  through: RSVP,
  as: 'rsvpedEvents',
  foreignKey: 'userId'
});

Event.belongsToMany(User, {
  through: RSVP,
  as: 'attendees',
  foreignKey: 'eventId'
});

module.exports = { User, Event, RSVP, sequelize };
