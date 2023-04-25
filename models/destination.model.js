const mongoose = require("mongoose");
const validator = require("validator");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter destination name."],
    unique: [true, "Destination already exist"],
    trim: true,
  },
  about: {
    type: String,
    required: [true, "Please enter something about destination."],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please add location."],
  },
  capital: {
    type: String,
    required: [true, "Please add location capital"],
  },
  locationgps: {
    type: String,
  },
  rating: {
    type: Number,
  },
  coverImage: {
    type: String,
    required: [true, "Please add cover image."],
  },
  gallery: {
    type: [String],
    required: [true, "Please add gallery images."],
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("destination", destinationSchema);
