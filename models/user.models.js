const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: { type: Number },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
