const User = require('./user');
const Event = require('./event');

User.hasMany(Event, {
  foreignKey: 'user_id',
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Event };
