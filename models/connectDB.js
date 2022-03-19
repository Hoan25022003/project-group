const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://hoan2003:hoan2522003@cluster0.mratp.mongodb.net/Legend?retryWrites=true&w=majority"
);

module.exports = mongoose;
