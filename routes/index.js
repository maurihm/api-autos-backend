const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome Autos API'));
router.post('/autos', controllers.createAuto);
router.get('/autos', controllers.getAllAutos);
// NUEVA RUTA PARA BORRAR
router.delete('/autos/:id', controllers.deleteAuto);

module.exports = router;