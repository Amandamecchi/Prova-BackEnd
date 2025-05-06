const pool = require("../config/database.js");

//filtros
const getAnimais = async (name) => {
try {
  if (!name){
    const resultado = await pool.query("SELECT * FROM animal");
    return resultado.rows;
  } else {
    const resultado = await pool.query("SELECT * FROM animal WHERE name ILIKE $1", [`%${name}%`]);
    return resultado.rows;
  }
} catch (error) {
    console.error('Erro ao buscar animais:', error);
    throw new Error('Erro ao buscar animais');
}
};

const getAnimaisPorRaca = async (raca) => {
    try {
        const query = 'SELECT * FROM animal WHERE raca = $1';
        values = [raca];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Erro ao executar a consulta no banco de dados:', error);
        throw new Error;
    }
};


const getAnimalById = async (id) => {
    const result = await pool.query(
        "SELECT animal.*, dono.name AS dono_name FROM animal LEFT JOIN dono ON animal.dono_id = dono.id WHERE animal.id = $1", [id]
    );
    return result.rows[0];
};

const createAnimal = async (name, tipo, raca, dono_id, photo) => {
    try {
        const result = await pool.query(
            "INSERT INTO animal (name, tipo, raca, dono_id, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, tipo, raca, dono_id, photo]
        );
        return result.rows[0]; 
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
    deleteAnimal,
    getAnimaisPorRaca,
};