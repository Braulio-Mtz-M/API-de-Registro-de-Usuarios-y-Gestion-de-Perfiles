const jwt = require('jsonwebtoken');

const verificarJWT = (req, res, next) => {
    // 1. Cambiamos el nombre del header a 'app-token'
    const token = req.header('app-token'); 

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token.' });
    }

    try {
        // 2. Quitamos el .split(' ')[1] porque el token ya viene limpio, sin la palabra "Bearer"
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o corrupto.' });
    }
};

module.exports = verificarJWT;