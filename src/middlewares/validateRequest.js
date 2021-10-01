const yup = require("yup");
const { Response } = require("http-status-codez");
const catchAsync = require("../utils/lib/catchAsync");
const errorResponse = require("../utils/lib/responseHandlers/errorResponse");

const validateRequest = (schema = yup.object({})) =>
  catchAsync(async (req, res, next) => {
    try {
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        { abortEarly: false, recursive: true }
      );
      return next();
    } catch (validationError) {
      const { errors } = validationError;
      return errorResponse(
        "Validation error occurred.",
        Response.HTTP_BAD_REQUEST,
        res,
        errors
      );
    }
  });

module.exports = validateRequest;
