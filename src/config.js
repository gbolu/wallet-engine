const path = require("path");

require("dotenv-safe").config({ path: path.resolve(__dirname, "../.env") });

module.exports = process.env;
