const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Obtém a chave de API do cabeçalho
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Chave de API ausente ou inválida" });
    }
    next(); 
};

module.exports = apiKeyMiddleware;