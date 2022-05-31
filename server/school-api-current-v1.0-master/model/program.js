const mongoose = require("mongoose");

const Program = new mongoose.Schema({
  prog_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Program", Program);
