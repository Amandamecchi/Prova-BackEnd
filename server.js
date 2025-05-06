require("dotenv").config();
const express = require("express");
const cors = require("cors");
const animalRoutes = require("./src/routes/animalRoutes");
const donoRoutes = require("./src/routes/donoRoutes");
const reportRoutes = require("./src/routes/reportRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', donoRoutes);
app.use("/api", animalRoutes);
app.use("/api", reportRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
