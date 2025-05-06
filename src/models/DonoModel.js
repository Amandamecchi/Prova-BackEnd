const pool = require("../config/database.js");  

const getDonos = async () => {
    try {
      if (!name) {
        const result = await pool.query("SELECT * FROM dono");
        return result.rows;
      }else {
        const result = await pool.query("SELECT * FROM dono WHERE name ILIKE $1", [`%${name}%`]);
        return result.rows;
      }  
    } catch (error) {
        console.error('Erro ao buscar donos:', error);
        throw new Error('Erro ao buscar donos');
    }

};

const getDonosById = async (id) => {
    const result = await pool.query("SELECT * FROM dono WHERE id = $1", [id]);
    return result.rows[0];
};

const createDono = async (name, photo) => {
    const result = await pool.query(
        "UPDATE dono SET name = $1, photo = $2 WHERE id = $3 RETURNING *",
        [name, photo, id]
    );
    return result.rows[0];
};

const deleteDono = async (id) => {
    const result = await pool.query("DELETE FROM dono WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Dono não encontrado" };
    }
    return { message: "Dono deletado com sucesso" };
};

module.exports = {
    getDonos,
    getDonosById,
    createDono,
    deleteDono,
};