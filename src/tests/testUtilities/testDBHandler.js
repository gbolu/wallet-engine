const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri);

  return mongod;
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async (mongod) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach((key) => {
    if (key) {
      collections[String(key)].deleteMany();
    }
  });
};
