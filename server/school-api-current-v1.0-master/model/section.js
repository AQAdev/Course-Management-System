const mongoose = require("mongoose");

const Section = new mongoose.Schema({
  sec_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Section", Section);
