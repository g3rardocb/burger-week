const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('burger_week_db', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;