const User = require("../models/user.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");


exports.getAll = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(201).json({
    success: true,
    data: users,
  });
});






