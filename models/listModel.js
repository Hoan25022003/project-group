const mongoose = require("./connectDB.js");

const listSchema = mongoose.Schema(
  {
    listName: String,
    userID: {
      type: String,
      ref: "user",
    },
  },
  { collection: "list" }
);

const listModel = mongoose.model("list", listSchema);

module.exports = listModel;
