const mongoose = require("./connectDB.js");

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
    intro: String,
  },
  { collection: "user" }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
