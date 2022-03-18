const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Legend");

const todoSchema = mongoose.Schema(
  {
    name: String,
    deadline: Date,
    status: String,
    userID: {
      type: String,
      ref: "user",
    },
    listID: {
      type: String,
      ref: "list",
    },
  },
  { collection: "todo" }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;