const { Response } = require("http-status-codez");
const errorResponse = require("../responseHandlers/errorResponse");

function handleInvalidJWT(err, res) {
  if (err.name === "JsonWebTokenError") {
    return errorResponse(
      "Invalid token. Please login again!",
      Response.HTTP_UNAUTHORIZED,
      res
    );
  }
}

module.exports = handleInvalidJWT;
