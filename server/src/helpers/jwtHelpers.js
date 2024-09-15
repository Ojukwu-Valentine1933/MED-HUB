const jwt = require("jsonwebtoken");


const generateWebToken = (payload, expiresIn, secret) => {
    const token = jwt.sign(payload, secret, {expiresIn});
    return token;
}

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}

module.exports = {generateWebToken, verifyToken};