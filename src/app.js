const { Response } = require("http-status-codez");
const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./utils/lib/errorHandlers/globalErrorHandler");
const AppError = require("./utils/lib/appError");
const walletRouter = require("./routes/walletRoutes");

const app = express();

/**
 * Development logging using morgan
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * Mount body parser (json) middleware
 */
app.use(express.json());

/**
 * Mount routes unto express router
 */
app.use("/wallets", walletRouter);

// HANDLING UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this Server!`,
      Response.HTTP_NOT_FOUND
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
