require('dotenv').config();
const { Sequelize } = require('sequelize');
let ev = process.env;

const sequelize = new Sequelize(
        ev.PG_database,
        ev.PG_user,
        ev.PG_password, {
    host: ev.PG_host,
    dialect: 'postgres'
});

module.exports = sequelize;