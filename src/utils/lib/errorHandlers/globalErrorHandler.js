const { Response } = require("http-status-codez");
const sendProductionErrors = require("./sendProductionErrors");
const debugResponse = require("../responseHandlers/debugResponse");
const { NODE_ENV } = require("../../../config");

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || Response.HTTP_INTERNAL_SERVER_ERROR;
  err.status = err.status || false;

  if (NODE_ENV !== "development") {
    return sendProductionErrors(err, res);
  }

  return debugResponse(err, res);
}

module.exports = globalErrorHandler;
