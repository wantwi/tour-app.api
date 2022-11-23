const Package = require("../models/package.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

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
  const package = await Package.find({});
  res.status(201).json({
    success: true,
    data: package,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const package = await Package.findById(id);
  res.status(201).json({
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
  res.status(201).json({
    success: true,
    data: package,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const package = await Package.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
  });
});
