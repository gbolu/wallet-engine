const errorResponse = require("../responseHandlers/errorResponse");

function sendProductionErrors(err, res) {
  if (err.isOperational) {
    return errorResponse(err.message, err.statusCode, res);
  }
}

module.exports = sendProductionErrors;
