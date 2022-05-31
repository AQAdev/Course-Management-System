const mongoose = require("mongoose");

const TimeTable = new mongoose.Schema({
  //   present or absent

  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Section",
  },
  batch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Batch",
  },
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Teacher",
    require: false,
  },
});
module.exports = mongoose.model("TimeTable", TimeTable);
