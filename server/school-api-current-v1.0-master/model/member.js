const mongoose = require("mongoose");

const Member = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Member", Member);
