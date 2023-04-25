const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  reviewFor: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, ""],
  },
  message: {
    type: String,

    required: [true, "Add message"],
  },
  name: {
    type: String,
    default: "Guest",
  },
  rating: {
    type: Number,
    default: 5,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("review", reviewSchema);
