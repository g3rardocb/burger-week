const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Calificacion = sequelize.define('Calificacion', {
  puntaje: DataTypes.INTEGER,
  probado: DataTypes.BOOLEAN,
});

Calificacion.belongsTo(require('./Hamburguesa')); // Relación con Hamburguesa

module.exports = Calificacion;