const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of the user not provided"],
  },
  email: {
    type: String,
    required: [true, "name of the user not provided"],
    unique: [true,"user with same email already exists"]
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);