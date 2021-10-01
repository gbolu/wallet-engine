const jwt = require("jsonwebtoken");
const { JWT_HASH } = require("../../../config");

const verifyToken = async (token) => jwt.verify(token, JWT_HASH);

module.exports = verifyToken;
