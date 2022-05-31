const mongoose = require("mongoose");

const Courses = new mongoose.Schema({
  course_title: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  credit_hour: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  batch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Batch",
  },
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
  active: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Courses", Courses);
