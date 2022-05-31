const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  stdName: {
    type: String,
    required: true,
  },
  stdID: {
    type: String,
    required: true,
  },
  stdFather: {
    type: String,
    required: true,
  },

  stdPhoneNumber: {
    type: String,
    required: true,
  },

  stdBatch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Batch",
  },
  stdProgram: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Program",
  },
  stdSection: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Section",
  },

  stdDesignation: {
    type: String,
    required: true,
  },
  stdSemester: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  stdAddress: {
    type: String,
    required: true,
  },
  memberID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Member",
  },
});
module.exports = mongoose.model("Student", Student);
