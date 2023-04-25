const Destination = require("../models/destination.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const { unlinkFiles } = require("../utils/utils");

exports.create = asyncHandler(async (req, res, next) => {
  req.body.gallery = req.files.gallery.map((x) => x.filename);
  req.body.coverImage = req.files.coverImage.map((x) => x.filename)[0];
  req.body.user = req.user?._id

  const destination = await Destination.create({ ...req.body });
  res.status(201).json({
    success: true,
    data: destination,
  });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const destinations = await Destination.find({});
  res.status(200).json({
    success: true,
    data: destinations,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const destination = await Destination.findById(id);
  res.status(200).json({
    success: true,
    data: destination,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const body = Object.keys(req.body);

  let $set = {},
    obj = {};
  body.forEach((x) => {
    obj[x] = req.body[x];
  });

  var newvalues = { $set: obj };

  const destination = await Destination.findByIdAndUpdate(id, newvalues);
  res.status(200).json({
    success: true,
    data: destination,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let arr = []
  const response = await Destination.findById(id)
  
  

  const package = await Destination.findByIdAndDelete(id);
  const {coverImage,gallery } = response
   arr = [...gallery,coverImage]
   if(arr.length > 0){
    unlinkFiles(arr)
   }
  res.status(200).json({
    success: true,
  });
});
