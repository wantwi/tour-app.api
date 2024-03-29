const Package = require("../models/package.model");
const Destination = require("../models/destination.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const { unlinkFiles } = require("../utils/utils");

exports.create = asyncHandler(async (req, res, next) => {
  req.body.gallery = req.files.gallery.map((x) => x.filename);
  req.body.coverImage = req.files.coverImage.map((x) => x.filename)[0];

  const package = await Package.create({ ...req.body });
  res.status(201).json({
    success: true,
    data: package,
  });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const package = await Package.find({}).populate("destination");
  res.status(200).json({
    success: true,
    data: package,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const package = await Package.findById(id);
  res.status(200).json({
    success: true,
    data: package,
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

  const package = await Package.findByIdAndUpdate(id, newvalues);
  res.status(200).json({
    success: true,
    data: package,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let arr = []
  const getPackage = await Package.findById(id)
  
  

  const package = await Package.findByIdAndDelete(id);
  const {coverImage,gallery } = getPackage
   arr = [...gallery,coverImage]
   if(arr.length > 0){
    unlinkFiles(arr)
   }
  res.status(200).json({
    success: true,
  });
});


exports.getByDestinationId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const findDestination = await Destination.find({id})
  if(!findDestination){
    return next(new ErrorReponse('Destination not found', 204))
  }

  const package = await Package.find({destination: id});
  res.status(200).json({
    success: true,
    data: package,
  });
});