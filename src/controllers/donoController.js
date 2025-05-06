const DonoModel = require('../models/DonoModel');

const getAllDonos = async (req, res) => {
    try {
        const donos = await DonoModel.getDonos(); // Chama o modelo para buscar todos os donos
        if (!donos || donos.length === 0) {
            return res.status(404).json({ message: 'Nenhum dono encontrado' });
        }
        res.status(200).json(donos); // Retorna os donos encontrados
    } catch (error) {
        console.error('Erro ao buscar donos:', error);
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
        const { name, animal_id } = req.body; // Obtém os dados do corpo da requisição
        const photo = req.file ? req.file.filename : null; // Verifica se há uma foto enviada
        const newDono = await DonoModel.createDono(name, photo, animal_id); // Chama o modelo para criar o dono
        res.status(201).json(newDono); // Retorna o dono criado
    } catch (error) {
        console.error('Erro ao criar dono:', error);
        res.status(500).json({ message: 'Erro ao criar dono' });
    }
};

const updateDono = async (req, res) => {
    try {
        console.log('ID recebido para atualização:', req.params.id);
        const { name, photo } = req.body;
        const donoAtualizado = await DonoModel.updateDono(req.params.id, name, photo);

        if (!donoAtualizado) {
            return res.status(404).json({ message: 'Dono não encontrado' });
        }

        res.status(200).json(donoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar dono:', error);
        res.status(500).json({ message: 'Erro ao atualizar dono' });
    }
};

const deleteDono = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do dono da URL
        const result = await DonoModel.deleteDono(id); // Chama o modelo para deletar o dono

        if (!result) {
            return res.status(404).json({ message: 'Dono não encontrado' });
        }

        res.status(200).json({ message: 'Dono deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar dono:', error);
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