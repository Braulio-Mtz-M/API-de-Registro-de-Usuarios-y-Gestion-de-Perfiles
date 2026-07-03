const Usuario = require('../models/usuarios');

// POST /api/usuarios/registro
const registrarUsuario = async (req, res) => {
    try {
        
        const nuevoUsuario = new Usuario(req.body); 
        await nuevoUsuario.save();
        
        res.json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el usuario' });
    }
};

// GET /api/usuarios/perfil/:id
const obtenerPerfilUsuario = async (req, res) => {
    try {
        
        const usuario = await Usuario.findById(req.params.id).select('-password');
        
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener el perfil' });
    }
};

module.exports = {
    registrarUsuario,
    obtenerPerfilUsuario
};