const errorResponse = require("../responseHandlers/errorResponse");
const handleDBValidation = require("./handleDBValidation");
const handleDuplicateDBFields = require("./handleDuplicateDBFields");
const handleInvalidJWT = require("./handleInvalidJWT");
const handleExpiredJWT = require("./handleExpiredJWT");

function sendProductionErrors(err, res) {
  handleDBValidation(err, res);

  handleDuplicateDBFields(err, res);

  handleInvalidJWT(err, res);

  handleExpiredJWT(err, res);

  if (err.isOperational) {
    return errorResponse(err.message, err.statusCode, res);
  }
}

module.exports = sendProductionErrors;
