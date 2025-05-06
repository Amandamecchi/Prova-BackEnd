const express = require('express');
const router = express.Router();
const DonoController = require('../controllers/donoController');

router.get('/donos', DonoController.getAllDonos); // Alterado de '/dono' para '/donos'
router.get('/donos/:id', DonoController.getDonoById); // Alterado de '/dono/:id' para '/donos/:id'
router.post('/donos', DonoController.createDono); // Alterado de '/dono' para '/donos'
router.put('/donos/:id', DonoController.updateDono); // Alterado de '/dono/:id' para '/donos/:id'
router.delete('/donos/:id', DonoController.deleteDono); // Alterado de '/dono/:id' para '/donos/:id'

module.exports = router;