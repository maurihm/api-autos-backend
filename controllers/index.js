const models = require("../models");

const createAuto = async (req, res) => {
  try {
    const auto = await models.Auto.create(req.body);
    return res.status(201).json({ auto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllAutos = async (req, res) => {
  console.log('getting autos');
  try {
    const autos = await models.Auto.findAll();
    return res.status(200).json({ autos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// NUEVA FUNCIÓN PARA BORRAR
const deleteAuto = async (req, res) => {
  try {
    const { id } = req.params; // Sacamos el ID de la URL
    const borrado = await models.Auto.destroy({
      where: { id: id }
    });
    if (borrado) {
      return res.status(200).send("Registro eliminado con éxito");
    }
    throw new Error("No se encontró ese ID");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createAuto,
  getAllAutos,
  deleteAuto // <-- No olvides agregarlo aquí
};