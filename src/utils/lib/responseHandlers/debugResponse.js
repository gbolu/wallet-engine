function debugResponse(error, res) {
  return res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
}

module.exports = debugResponse;
