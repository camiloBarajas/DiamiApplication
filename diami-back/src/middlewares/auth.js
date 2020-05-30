const jwt = require('jsonwebtoken');

// Crear Token
const tokenCreate = (response) => {

    return jwt.sign(response, process.env.ENV_SEED_JWT || '654s89dv4asfbasfdgasdvasd', {
        expiresIn: process.env.ENV_EXPIRES_JWT || '1d'
    });

};

// Verificar Token
const tokenVerify = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.ENV_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.user = decoded.user;
        next();

    });



};

// Verifica Rol de profesional
const roleVerify = (req, res, next) => {

    const user = req.user;

    if (user.role === 'PROFESSIONAL') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es un profesional de la salud'
            }
        });
    }
};

module.exports = {
    tokenCreate,
    tokenVerify,
    roleVerify
};
