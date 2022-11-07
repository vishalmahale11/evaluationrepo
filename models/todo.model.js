const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  taskname: { type: String },
  status: { type: String, required: true },
  tag: {
    type: String,
    enum: ["personal", "family", "optional"],
    default: "personal",
  },
  user_id: { type: String },
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
