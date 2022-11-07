const mongoose = require("mongoose");

const connection = () => {
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connection;
