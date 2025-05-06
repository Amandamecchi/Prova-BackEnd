const pool = require("../config/database.js");  

const getDonos = async () => {
    try {
        const result = await pool.query("SELECT * FROM dono");
        return result.rows; // Retorna todos os donos
    } catch (error) {
        console.error('Erro ao buscar donos:', error);
        throw new Error('Erro ao buscar donos');
    }
};

const getDonosById = async (id) => {
    const result = await pool.query("SELECT * FROM dono WHERE id = $1", [id]);
    return result.rows[0];
};

const createDono = async (name, photo, animal_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO dono (name, photo) VALUES ($1, $2) RETURNING *',
            [name, photo]
        );
        return result.rows[0]; // Retorna o dono criado
    } catch (error) {
        console.error('Erro ao criar dono no banco de dados:', error);
        throw new Error('Erro ao criar dono no banco de dados');
    }
};


const updateDono = async (id, name, photo) => {
    try {
        console.log('ID recebido no modelo:', id);
        const result = await pool.query(
            'UPDATE dono SET name = $1, photo = $2 WHERE id = $3 RETURNING *',
            [name, photo, id]
        );
        console.log('Resultado da atualização:', result.rows);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar dono no banco de dados:', error);
        throw new Error('Erro ao atualizar dono no banco de dados');
    }
};

const deleteDono = async (id) => {
    try {
        const result = await pool.query('DELETE FROM dono WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return null; 
        }
        return result.rows[0]; 
    } catch (error) {
        console.error('Erro ao deletar dono no banco de dados:', error);
        throw new Error('Erro ao deletar dono no banco de dados');
    }
};

module.exports = {
    getDonos,
    getDonosById,
    createDono,
    deleteDono,
    updateDono,
};