const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');

const Events = sequelize.define('Events', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING
    }
  },
{});

module.exports = Events;