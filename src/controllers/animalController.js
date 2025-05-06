const AnimalModel = require('../models/AnimalModel');
const { getAnimaisPorRaca } = require('../models/AnimalModel');

const getAllAnimais = async (req, res) => {
try {
    const { name } = req.query;
    const animais = await AnimalModel.getAnimais(name); 
    res.json(animais);
} catch (error) {
    res.status(500).json({ error: 'Erro ao buscar animais' });
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
        const { name, tipo, raca, dono_id } = req.body;
        const animal = await AnimalModel.createAnimal(name, tipo, raca, dono_id);
        res.status(201).json(animal);
    } catch (error) {
        console.error('Erro ao criar animal:', error);
        res.status(500).json({ message: 'Erro ao criar animal' });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, tipo, raca, dono_id } = req.body; 

        const animalAtualizado = await AnimalModel.updateAnimal(id, name, tipo, raca, dono_id);

        if (!animalAtualizado) {
            return res.status(404).json({ message: 'Animal não encontrado' });
        }

        res.status(200).json(animalAtualizado); 
    } catch (error) {
        console.error('Erro ao atualizar animal:', error);
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

const getAnimaisPorRacaController = async (req, res) => {
    const { raca } = req.query; 

    if (!raca) {
        return res.status(400).json({ error: 'O parâmetro "raca" é obrigatório.' });
    }

    try {
        const animais = await getAnimaisPorRaca(raca);
        if (animais.length === 0) {
            return res.status(404).json({ message: 'Nenhum animal encontrado para a raça especificada.' });
        }
        res.status(200).json(animais);
    } catch (error) {
        console.error('Erro ao buscar animais por raça:', error);
        res.status(500).json({ error: 'Erro ao buscar animais por raça.' });
    }
};

module.exports = {
    getAllAnimais,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimaisPorRacaController,
};