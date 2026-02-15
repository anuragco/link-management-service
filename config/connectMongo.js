const mongoose = require("mongoose");

async function HandleConnectMongo(url) {
  try {
    await mongoose.connect(url);
    console.log(`Mongo Db connected `, url);
  } catch (error) {
    console.log(`Mongoose Connection error`, error);
    process.exit(1);
  }
}

module.exports = {
  HandleConnectMongo,
};
