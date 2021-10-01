const { v4: uuid } = require("uuid");

const generateUuid = () => uuid();

module.exports = generateUuid;
