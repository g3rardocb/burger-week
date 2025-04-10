// 1. Importar dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin.routes');
app.use('/', adminRoutes);

// 2. Importar Sequelize
const sequelize = require('./config/db.config');

// Configuración EJS y Static
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importar rutas (por ahora solo tienes restaurantes)
const restauranteRoutes = require('./routes/restaurantes.routes');
app.use('/', restauranteRoutes);

// 3. Sincronizar la base de datos
sequelize.sync({ force: false })  
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor activo en http://localhost:3000');
});