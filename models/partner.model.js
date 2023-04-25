const mongoose = require("mongoose");
const validator = require("validator");

const partnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please add company name."],
    unique: [true, "Destination already exist"],
    trim: true,
  },
  managerName: {
    type: String,
    required: [true, "Please add manager name."],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please add location."],
  },
  email: {
    type: String,
    required: [true, "Please add company email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please add company phone number"],
  },
 
  logo: {
    type: String,
    required: [true, "Please add company logo."],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("partner", partnerSchema);
