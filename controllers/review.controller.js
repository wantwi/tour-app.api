const Review = require("../models/review.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

exports.create = asyncHandler(async (req, res, next) => {
  const review = await Review.create({ ...req.body });
  res.status(201).json({
    success: true,
    data: review,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
  });
});

exports.reviewByForID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reviews = await Review.find({ reviewFor: id });
  res.status(200).json({
    success: true,
    data: reviews,
  });
});
