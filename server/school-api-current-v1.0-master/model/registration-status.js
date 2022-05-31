const mongoose = require("mongoose");

const RegistrationStatus = new mongoose.Schema({
  registration: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("RegistrationStatus", RegistrationStatus);
