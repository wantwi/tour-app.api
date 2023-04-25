const User = require("../models/user.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");


exports.getAll = asyncHandler(async (req, res, next) => {
  const { search } = req.query
  let users = null
  if(search){
    users = await User.find({ $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }] })

  }else{
    users = await User.find({});
  }
   
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.profile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const body = Object.keys(req.body);

  let $set = {},
    obj = {};
  body.forEach((x) => {
    obj[x] = req.body[x];
  });

  var newvalues = { $set: obj };

  const user = await User.findByIdAndUpdate(userId,newvalues);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.search = asyncHandler(async (req, res, next) => {
 
  const { search } = req.query
  const user = await User.find({ $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }] })

  res.status(200).json({
    success: true,
    data: user,
  });
});





