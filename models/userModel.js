const mongoose = require("./connectDB");

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

userModel
  .create({
    username: "Huy",
    password: "1234",
    address: "Thai Binh",
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
