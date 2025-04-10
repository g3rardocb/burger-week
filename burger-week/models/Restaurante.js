const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Restaurante = sequelize.define('Restaurante', {
  nombre: DataTypes.STRING,
  logo: DataTypes.STRING,
});

module.exports = Restaurante;