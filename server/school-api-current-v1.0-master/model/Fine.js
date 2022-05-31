const mongoose = require("mongoose");

const Fine = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  RegNo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
  },

  date: {
    type: String,
    required: true,
  },

  dueDate: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Fine", Fine);
