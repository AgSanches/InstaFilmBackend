const jwt = require('jwt-simple');
const moment = require('moment');

//TODO: Hacer uso de env variables
const token_secret = "soniagithub";

const createToken = function(user) {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix(),
        role: user.role
    };

    return jwt.encode(payload, token_secret);
}

module.exports = createToken;



