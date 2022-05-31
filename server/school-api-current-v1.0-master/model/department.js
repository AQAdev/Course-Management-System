const mongoose = require("mongoose");

const Department = new mongoose.Schema({
  dep_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Department", Department);
