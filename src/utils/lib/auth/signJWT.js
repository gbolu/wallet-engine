const jwt = require("jsonwebtoken");
const { JWT_HASH, JWT_EXPIRES_IN } = require("../../../config");

async function signToken(objectToSign, expiresIn = null) {
  return jwt.sign(objectToSign, JWT_HASH, {
    expiresIn: expiresIn || JWT_EXPIRES_IN,
  });
}

module.exports = signToken;
