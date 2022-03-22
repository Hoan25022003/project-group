const mongoose = require("./connectDB.js");

const todoSchema = mongoose.Schema(
  {
    name: String,
    deadline: String,
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
