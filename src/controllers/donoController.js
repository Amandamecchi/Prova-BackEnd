const DonoModel = require('../models/DonoModel');

const getAllDonos = async (req, res) => {
    try {
        
    } catch (error) {
        console.error ('Erro ao buscar donos:', error);
        res.status(500).json({ message: 'Erro ao buscar donos' });
    }
};

const getDonoById = async (req, res) => {
    try {
        const dono = await DonoModel.getDonoById(req.params.id);
        if (!dono) {
            return res.status(404).json({ message: 'Dono não encontrado' });
        }
        res.json(dono);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dono' });
    }
};

const createDono = async (req, res) => {
    try {
        const { name, animal_id } = req.body;
        const photo = req.file ? req.file.filename : null; 
        const newDono = await DonoModel.createDono(name, photo, animal_id);
        res.status(201).json(newDono);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar dono' });
    }
};

const updateDono = async (req, res) => {
    try {
        const { name, photo } = req.body;
        const dono = await DonoModel.updateDono(req.params.id, name, photo);
        if (!dono) {
            return res.status(404).json({ message: 'Dono não encontrado' });
        }
        res.status(200).json(dono);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar dono' });
    }
};

const deleteDono = async (req, res) => {
    try {
        const result = await DonoModel.deleteDono(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar dono' });
    }
};

module.exports = {
    getAllDonos,
    getDonoById,
    createDono,
    updateDono,
    deleteDono
};