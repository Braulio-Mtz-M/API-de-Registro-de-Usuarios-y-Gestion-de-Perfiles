const Usuario = require('../models/usuarios');

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener usuarios' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };