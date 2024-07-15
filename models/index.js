const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('/User');
const Event = require('/Event');
const RSVP = require('/RSVP');

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
