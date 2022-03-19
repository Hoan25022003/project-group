const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Legend");

const userSchema = mongoose.Schema(
  {
    username: String,
    date: String,
    sex: String,
    password: String,
    address: String,
    role: String,
    token: String,
    avatar: String,
  },
  { collection: "user" }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
