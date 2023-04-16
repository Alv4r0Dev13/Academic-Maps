const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');

const Events = sequelize.define('Events', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    LatLon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING
    },
    Description: {
      type: DataTypes.STRING
    }
  },
{});

module.exports = Events;