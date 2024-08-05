const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

Event.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Event;
