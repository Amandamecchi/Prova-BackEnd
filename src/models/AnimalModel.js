const pool = require("../config/database.js");

const getAnimal = async (name) => {
    let query = 'SELECT * FROM animais';
    const params = [];

    if (name) {
        query += ' WHERE name LIKE ?';
        params.push(`%${name}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows;
};


const getAnimalById = async (id) => {
    const result = await pool.query
    ("SELECT animal.*, dono.name AS dono_name FROM animal LEFT JOIN dono ON animal.dono_id WHERE animal.id = $1", [id]);
    return result.rows[0];
};

const createAnimal = async (name, tipo, raça, dono_id) => {
    const result = await pool.query(
        "INSERT INTO animal (name, tipo, raça, dono_id) VALUES ($1, $2, $3) RETURNING *",
        [name, tipo, raça, dono_id]);
    return result.rows[0];
};

const updateAnimal = async (id, name, tipo, raça, dono_id) => {
    const result = await pool.query(
        'UPDATE animal SET name = $1, tipo = $2, raça = $3, dono_id = $4 WHERE id = $5 RETURNING *',
        [name, tipo, raça, dono_id, id]
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
    getAnimal,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
};
