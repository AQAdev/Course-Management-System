const mongoose = require("mongoose");

const Teacher = new mongoose.Schema({
  tch_name: {
    type: String,
    required: true,
  },
  tch_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Member",
  },
  tch_phone: {
    type: String,
    required: true,
  },
  tch_desgination: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Teacher", Teacher);
