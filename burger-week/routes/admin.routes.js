// routes/admin.routes.js
const express = require('express');
const router  = express.Router();

const restauranteController = require('../controllers/restaurante.controller');
const hamburguesaController = require('../controllers/hamburguesa.controller');
const uploadImages          = require('../middlewares/upload-images');

/* ---------- PANEL ---------- */
router.get('/admin', (_, res) => res.render('pages/admin/dashboard'));

/* ---------- RESTAURANTES ---------- */
// LISTA
router.get('/admin/restaurantes',
  restauranteController.listarRestaurantesAdmin);

// FORM CREAR
router.get('/admin/restaurantes/crear',
  restauranteController.formCrearRestaurante);

// CREAR (procesa)
router.post('/admin/restaurantes/crear',
  uploadImages.single('logo'),
  restauranteController.crearRestaurante);

// FORM EDITAR
router.get('/admin/restaurantes/editar/:id',
  restauranteController.formEditarRestaurante);

// EDITAR (procesa)
router.post('/admin/restaurantes/editar/:id',
  uploadImages.single('logo'),
  restauranteController.editarRestaurante);

// ELIMINAR
router.post('/admin/restaurantes/eliminar/:id',
  restauranteController.eliminarRestaurante);

/* ---------- HAMBURGUESAS ---------- */
// LISTA
router.get('/admin/hamburguesas',
  hamburguesaController.listarHamburguesasAdmin);

// FORM CREAR
router.get('/admin/hamburguesas/crear',
  hamburguesaController.formCrearHamburguesa);

// CREAR (procesa)
router.post('/admin/hamburguesas/crear',
  uploadImages.single('foto'),
  hamburguesaController.crearHamburguesaAdmin);

// FORM EDITAR
router.get('/admin/hamburguesas/editar/:id',
  hamburguesaController.formEditarHamburguesa);

// EDITAR (procesa)
router.post('/admin/hamburguesas/editar/:id',
  uploadImages.single('foto'),
  hamburguesaController.editarHamburguesa);

// ELIMINAR
router.post('/admin/hamburguesas/eliminar/:id',
  hamburguesaController.eliminarHamburguesa);

module.exports = router;