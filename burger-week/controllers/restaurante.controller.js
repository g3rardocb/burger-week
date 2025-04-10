const Restaurante = require('../models/Restaurante');

/* ---------- LISTAS ---------- */
exports.listarRestaurantes        = async (req, res) => { 
  const restaurantes = await Restaurante.findAll();
  res.render('pages/restaurantes', { restaurantes });
}
exports.listarRestaurantesAdmin   = async (req, res) => { 
  const restaurantes = await Restaurante.findAll();
  res.render('pages/admin/restaurantes', { restaurantes });
};

/* ---------- FORM CREAR ---------- */
exports.formCrearRestaurante = (req, res) => {
  res.render('pages/admin/createRestaurante');
};

/* ---------- CREAR ---------- */
exports.crearRestaurante = async (req, res) => {
  const { nombre } = req.body;
  try {
    const restaurante = await Restaurante.create({
      nombre,
      logo: '/images/' + req.file.filename,
    });
    res.redirect('/admin/restaurantes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear restaurante');
  } 
}
/* ---------- FORM EDITAR (GET) ---------- */
exports.formEditarRestaurante = async (req, res) => {
  const { id } = req.params;
  const restaurante = await Restaurante.findByPk(id);
  if (!restaurante) return res.status(404).send('No existe');
  res.render('pages/admin/editRestaurante', { restaurante });
};

/* ---------- EDITAR (POST) ---------- */
exports.editarRestaurante = async (req, res) => {
  const { id }     = req.params;
  const { nombre } = req.body;

  try {
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) return res.status(404).send('No existe');

    if (req.file) restaurante.logo = '/images/' + req.file.filename;
    restaurante.nombre = nombre;

    await restaurante.save();
    res.redirect('/admin/restaurantes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar restaurante');
  }
};

/* ---------- ELIMINAR ---------- */
exports.eliminarRestaurante = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurante = await Restaurante.findByPk(id);
    if (!restaurante) return res.status(404).send('No existe');
    await restaurante.destroy();
    res.redirect('/admin/restaurantes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar restaurante');
  }
};