
const Hamburguesa = require('../models/Hamburguesa');
const Restaurante  = require('../models/Restaurante');

/* ---------- LISTA PÚBLICA (opcional) ---------- */
exports.listarHamburguesas = async (req, res) => {
  const hamburguesas = await Hamburguesa.findAll({ include: Restaurante });
  res.render('pages/hamburguesas/list', { hamburguesas });
};

/* ---------- LISTA ADMIN ---------- */
exports.listarHamburguesasAdmin = async (req, res) => {
  try {
    const hamburguesas = await Hamburguesa.findAll({ include: Restaurante });
    res.render('pages/admin/hamburguesas', { hamburguesas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al listar hamburguesas');
  }
};

/* ---------- FORM CREAR ---------- */
exports.formCrearHamburguesa = async (_, res) => {
  const restaurantes = await Restaurante.findAll();
  res.render('pages/admin/createHamburguesa', { restaurantes });
};

/* ---------- CREAR ---------- */
exports.crearHamburguesaAdmin = async (req, res) => {
  try {
    const { nombre, descripcion, precio, restauranteId } = req.body;
    const foto = '/images/' + req.file.filename;

    await Hamburguesa.create({
      nombre, descripcion, precio, foto, RestauranteId: restauranteId
    });
    res.redirect('/admin/hamburguesas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear hamburguesa');
  }
};

/* ---------- FORM EDITAR ---------- */
exports.formEditarHamburguesa = async (req, res) => {
  const { id } = req.params;
  const hamburguesa  = await Hamburguesa.findByPk(id);
  if (!hamburguesa) return res.status(404).send('No existe');

  const restaurantes = await Restaurante.findAll();
  res.render('pages/admin/editHamburguesa', { hamburguesa, restaurantes });
};

/* ---------- EDITAR ---------- */
exports.editarHamburguesa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, restauranteId } = req.body;

    const hamburguesa = await Hamburguesa.findByPk(id);
    if (!hamburguesa) return res.status(404).send('No existe');

    Object.assign(hamburguesa, { nombre, descripcion, precio, RestauranteId: restauranteId });
    if (req.file) hamburguesa.foto = '/images/' + req.file.filename;

    await hamburguesa.save();
    res.redirect('/admin/hamburguesas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al editar hamburguesa');
  }
};

/* ---------- ELIMINAR ---------- */
exports.eliminarHamburguesa = async (req, res) => {
  try {
    await Hamburguesa.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/hamburguesas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar hamburguesa');
  }
};

