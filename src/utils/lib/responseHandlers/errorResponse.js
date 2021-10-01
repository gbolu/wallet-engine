function errorResponse(message, statusCode, res, errors = []) {
  return res.status(statusCode).json({
    status: false,
    code: res.statusCode,
    message,
    errors,
  });
}

module.exports = errorResponse;
