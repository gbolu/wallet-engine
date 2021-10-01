const { Response } = require("http-status-codez");
const errorResponse = require("../responseHandlers/errorResponse");

function handleDuplicateDBFields(err, res) {
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;

    return errorResponse(message, Response.HTTP_BAD_REQUEST, res);
  }
}

module.exports = handleDuplicateDBFields;
