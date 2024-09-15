const { verifyToken } = require("../../helpers/jwtHelpers")
const { JWT_SECRET } = require("../../config/dotEnv");


const authenticateJWT = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(403).json({ error: "Access token missing" })
        }
        const payload = verifyToken(accessToken, JWT_SECRET);

        if (!payload) {
            return res.status(403).json({ error: "Invalid token" })
        }
        req.patient = payload;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "failed to authenticate jwt" })
    }
}

module.exports = authenticateJWT;