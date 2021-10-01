const { Response } = require("http-status-codez");

const errorResponse = require("../responseHandlers/errorResponse");

function handleDBValidation(err, res) {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data: ${errors.join(". ")}`;

    return errorResponse(message, Response.HTTP_BAD_REQUEST, res);
  }
}

module.exports = handleDBValidation;
