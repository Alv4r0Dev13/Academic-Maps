const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');

const Events = sequelize.define('Events', {
    // Model attributes are defined here
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
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });

module.exports = Events;