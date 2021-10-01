const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { JWT_HASH } = require("../../../config");

const decodeJWTExpiryTimestamp = async (token) => {
  const decoded = await promisify(jwt.verify)(token, JWT_HASH);
  return decoded.exp;
};

module.exports = async function successResponseWithToken(
  data,
  token,
  message,
  statusCode,
  res
) {
  return res.status(statusCode).json({
    status: true,
    code: res.statusCode,
    message,
    data,
    token,
    expiredAt: await decodeJWTExpiryTimestamp(token),
  });
};
