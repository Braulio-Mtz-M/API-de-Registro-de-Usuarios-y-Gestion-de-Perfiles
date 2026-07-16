require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const usuariosRoutes = require('./src/routes/usuarios');
const validarAppToken = require('./src/middlewares/authMiddleware');

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(validarAppToken);

// DB connection
connectDB();

app.use("/api/usuarios", usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Hello World http://localhost:${PORT}`);
});