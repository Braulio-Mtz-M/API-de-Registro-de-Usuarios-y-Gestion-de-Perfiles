const validarAppToken = (req, res, next) => {
    // Buscamos el token en los headers (puedes llamarlo como prefieras, ej: x-app-token o authorization)
    const token = req.header('x-app-token');

    // Si no enviaron el token
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token de aplicación.' });
    }

    // Si el token enviado no coincide con el de las variables de entorno
    if (token !== process.env.APP_TOKEN) {
        return res.status(403).json({ error: 'Acceso denegado. Token de aplicación inválido.' });
    }

    // Si el token es correcto, permitimos que la petición continúe
    next();
};

module.exports = validarAppToken;