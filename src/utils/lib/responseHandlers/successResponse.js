module.exports = function successResponse(data, message, statusCode, res) {
  return res.status(statusCode).json({
    status: true,
    code: res.statusCode,
    message,
    data,
  });
};
