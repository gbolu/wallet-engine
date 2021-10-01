const { Response } = require("http-status-codez");
const errorResponse = require("../responseHandlers/errorResponse");

function handleExpiredJWT(err, res) {
  if (err.name === "TokenExpiredError") {
    return errorResponse(
      "Your token has expired! Please log in again.",
      Response.HTTP_UNAUTHORIZED,
      res
    );
  }
}

module.exports = handleExpiredJWT;
