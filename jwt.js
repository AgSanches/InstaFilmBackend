const jwt = require('jwt-simple');
const moment = require('moment');

//TODO: Hacer uso de env variables
const token_secret = "soniagithub";

const createToken = function(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix(),
        role: user.role
    };

    return jwt.encode(payload, token_secret);
}

const checkAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "No se ha enviado el token."
        });
    }

    const token = req.headers.authorization.split(" ")[1];
    let payload;

    try {
        payload = jwt.decode(token, token_secret);
    } catch (e) {
        return res.status(401).json({
            message: "Token no válido."
        })
     }

    if (payload.exp <= moment().unix()){
        return res.status(401).json({
            message: "El token ha expirado."
        })
    }

    req.user = payload.sub;
    next();
}

module.exports = {
    createToken: createToken,
    checkAuthenticated: checkAuthenticated,
}
