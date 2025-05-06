const pool = require("../config/database.js");

const getAnimais = async (name) => {
    try {
        let query = 'SELECT * FROM animal'; // Certifique-se de que a tabela "animal" existe
        const params = [];

        if (name) {
            query += ' WHERE name LIKE $1'; // Use $1 para parâmetros no PostgreSQL
            params.push(`%${name}%`);
        }

        const result = await pool.query(query, params); // Executa a consulta no banco de dados
        return result.rows; // Retorna os resultados da consulta
    } catch (error) {
        console.error('Erro ao executar a consulta no banco de dados:', error);
        throw new Error('Erro ao buscar animais no banco de dados');
    }
};

const getAnimalById = async (id) => {
    const result = await pool.query(
        "SELECT animal.*, dono.name AS dono_name FROM animal LEFT JOIN dono ON animal.dono_id = dono.id WHERE animal.id = $1", [id]
    );
    return result.rows[0];
};

const createAnimal = async (name, tipo, raca, dono_id) => {
    try {
        const result = await pool.query(
            "INSERT INTO animal (name, tipo, raca, dono_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, tipo, raca, dono_id]
        );
        return result.rows[0]; // Retorna o animal criado
    } catch (error) {
        console.error('Erro ao criar animal no banco de dados:', error);
        throw new Error('Erro ao criar animal no banco de dados');
    }
};

const updateAnimal = async (id, name, tipo, raca, dono_id) => { // Alterado "raça" para "raca"
    const result = await pool.query(
        'UPDATE animal SET name = $1, tipo = $2, raca = $3, dono_id = $4 WHERE id = $5 RETURNING *', // Alterado "raça" para "raca"
        [name, tipo, raca, dono_id, id]
    );
    return result.rows[0];
};

const deleteAnimal = async (id) => {
    const result = await pool.query("DELETE FROM animal WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Animal não encontrado" };
    }
    return { message: "Animal deletado com sucesso" };
};

module.exports = {
    getAnimais,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
};