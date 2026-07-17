const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscamos al usuario por su email
        const usuario = await Usuario.findOne({ email });

        // Validamos que exista y que la contraseña coincida
        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Creamos el JWT SIN caducidad (no incluimos la propiedad expiresIn)
        const token = jwt.sign(
            { id: usuario._id }, 
            process.env.JWT_SECRET
        );

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

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

module.exports = { loginUsuario, crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario};