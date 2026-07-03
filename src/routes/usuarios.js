const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registrarUsuario);
router.get('/perfil/:id', usuarioController.obtenerPerfilUsuario);

module.exports = router;