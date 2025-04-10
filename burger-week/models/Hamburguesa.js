const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Restaurante = require('./Restaurante');

const Hamburguesa = sequelize.define('Hamburguesa', {
  nombre:       { type: DataTypes.STRING,  allowNull: false },
  descripcion:  { type: DataTypes.TEXT,   allowNull: false },
  precio:       { type: DataTypes.FLOAT,  allowNull: false },
  foto:         { type: DataTypes.STRING, allowNull: false }
});

// Relación 1:N (Un Restaurante puede tener muchas Hamburguesas)
Restaurante.hasMany(Hamburguesa);
Hamburguesa.belongsTo(Restaurante);

module.exports = Hamburguesa;