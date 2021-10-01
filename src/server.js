const mongoose = require("mongoose");
const http = require("http");
const { MONGO_DB_PATH, PORT } = require("./config");

const app = require("./app");

const server = http.createServer(app);

const logger = require("./utils/lib/logger");

mongoose.connect(MONGO_DB_PATH);

const db = mongoose.connection;
db.on("error", logger.error.bind(console, "connection error:"));
db.once("open", () => {
  server.listen(PORT, () => {
    logger.info(`App is listening on port ${PORT}`);
  });
});

// HANDLING UNCAUGHT EXCEPTION ERRORS
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 🙄 Shutting down...');
  logger.error(err);
  process.exit(1);
});

//  HANDLING UNHANDLED_REJECTION ERRORS
process.on("unhandledRejection", (err) => {
  logger.error(err);
  logger.error("UNHANDLED REJECTION! 😞 Shutting down Server...");
  server.close(() => {
    process.exit(1);
  });
});