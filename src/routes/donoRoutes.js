const express = require('express');
const router = express.Router();
const DonoController = require('../controllers/donoController');

router.get('/dono', DonoController.getAllDonos);
router.put('/dono/:id', DonoController.updateDono);
router.post('/dono', DonoController.createDono);
router.put('/dono/:id', DonoController.updateDono); // Corrigido de '/donos/:id' para '/dono/:id'
router.delete('/dono/:id', DonoController.deleteDono);

module.exports = router;