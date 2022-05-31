const mongoose = require("mongoose");

const Batch = new mongoose.Schema({
  batch_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Batch", Batch);
