const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');

router.get('/animal', AnimalController.getAllAnimais);
router.get('/animal/:id', AnimalController.getAnimalById);
router.post('/animal', AnimalController.createAnimal);
router.put('/animal/:id', AnimalController.updateAnimal);
router.delete('/animal/:id', AnimalController.deleteAnimal);

module.exports = router;