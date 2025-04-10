// routes/hamburguesas.routes.js

const express = require('express');
const router = express.Router();

// Importa tu controlador de hamburguesas
const hamburguesaController = require('../controllers/hamburguesa.controller');

// Importa tu middleware para subir imágenes
const uploadImages = require('../middlewares/upload-images');

/*
 * RUTAS:
 * 1. Listar hamburguesas
 * 2. Ver detalle de una hamburguesa
 * 3. Crear hamburguesa con su foto
 */

// 1) Listar todas las hamburguesas
router.get('/hamburguesas', hamburguesaController.listarHamburguesas);

// 2) Detalle de una hamburguesa por ID
router.get('/hamburguesas/:id', hamburguesaController.detalleHamburguesa);

// 3) Crear una hamburguesa (con foto)
router.post('/hamburguesas/crear',
  uploadImages.single('foto'),           // Subir una sola imagen llamada 'foto'
  hamburguesaController.crearHamburguesa
);

module.exports = router;