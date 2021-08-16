const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userName: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

const users = mongoose.model("users", usersSchema);
module.exports = users;
