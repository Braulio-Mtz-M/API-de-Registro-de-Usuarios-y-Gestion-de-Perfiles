const jwt = require('jsonwebtoken');

const verificarJWT = (req, res, next) => {
    // Por convención, el token se envía en el header 'Authorization' con el formato 'Bearer <token>'
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token.' });
    }

    // Separamos la palabra "Bearer" del token real
    const token = authHeader.split(' ')[1];

    try {
        // Verificamos el token (como no tiene caducidad, solo fallará si fue alterado)
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado; // Guardamos el ID del usuario en la request por si se ocupa
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o corrupto.' });
    }
};

module.exports = verificarJWT;