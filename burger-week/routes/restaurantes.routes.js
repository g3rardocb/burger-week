const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restaurante.controller');

// Ruta principal
router.get('/', restauranteController.listarRestaurantes);

module.exports = router;