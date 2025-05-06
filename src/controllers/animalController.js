const AnimalModel = require('../models/AnimalModel');

const getAllAnimais = async (req, res) => {
    try {
        const { name} = req.query;
        const animais = await AnimalModel.getAnimais(name);
        res.json(animais);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar animais' });
    }
};

const getAnimalById = async (req, res) => {
    try {
        const animal = await AnimalModel.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal não encontrado' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json ({ error: 'Erro ao buscar animal' });
    }
};

const createAnimal = async (req, res) => {
    try {
        const {name, tipo, raça} = req.body;
        const animal = await AnimalModel.createAnimal(name, tipo, raça);
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar animal' });
    }
};

const updateAnimal = async (req, res) => {
    try {
     const { name, tipo, dono_id } = req.body;
     const animal = await AnimalModel.updateAnimal(req.params.id, name, tipo, dono_id);
        if (!animal) {
        return res.status(404).json({ message: 'Animal não encontrado' });
        }
        res.status(200).json(animal); 
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar animal' });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const result = await AnimalModel.deleteAnimal(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result)
    } catch (error) {
        console.error('Erro ao buscar animal:', error);
        res.status(500).json({ message: 'Erro ao deletar animal' });
    }
};

