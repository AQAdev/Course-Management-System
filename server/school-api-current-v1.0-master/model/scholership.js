const mongoose = require("mongoose");

const scholership = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("scholership", scholership);
