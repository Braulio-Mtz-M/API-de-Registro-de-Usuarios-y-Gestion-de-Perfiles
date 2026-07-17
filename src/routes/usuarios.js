const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarJWT = require('../middlewares/authMiddleware');

// RUTAS PÚBLICAS (No requieren token)
router.post('/login', usuarioController.loginUsuario);
router.post('/', usuarioController.crearUsuario); // Dejamos crear usuario público para que puedas hacer pruebas

// RUTAS PROTEGIDAS (Requieren token, le pasamos 'verificarJWT' en medio)
router.get('/', verificarJWT, usuarioController.obtenerUsuarios);
router.put('/:id', verificarJWT, usuarioController.actualizarUsuario);
router.delete('/:id', verificarJWT, usuarioController.eliminarUsuario);

module.exports = router;