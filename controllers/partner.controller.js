const Partner = require("../models/partner.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const { unlinkFiles } = require("../utils/utils");

exports.create = asyncHandler(async (req, res, next) => {
 
req.body.logo = req.files.logo.map((x) => x.filename)[0];
 

 const partner = await Partner.create({ ...req.body });
  res.status(201).json({
    success: true,
    data: partner,
    user: req.body.user
  });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const partner = await Partner.find({});
  res.status(200).json({
    success: true,
    data: partner,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const partner = await Partner.findById(id);
  res.status(200).json({
    success: true,
    data: partner,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const response = await Partner.findById(id);

  if (!response) {
    next(new ErrorReponse("Partner not found", 404));
    return;
  }
  
  let body =null
  if(req.files.logo){
    req.body.logo = req.files.logo.map((x) => x.filename)[0];
  }

   body = Object.keys(req.body);

  let $set = {},
    obj = {};
  body.forEach((x) => {
    obj[x] = req.body[x];
  });

  var newvalues = { $set: obj };

  const partner = await Partner.findByIdAndUpdate(id, newvalues);
  res.status(204).json({
    success: true,
    // data: partner,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let arr = []
  const response = await Partner.findById(id)
  if(!response){
    next(new ErrorReponse("Partner not found", 404))
    return
  }
  const package = await Partner.findByIdAndDelete(id);
  const {logo} = response
   arr = [logo]
   if(arr.length > 0){
    unlinkFiles(arr)
   }
  res.status(200).json({
    success: true,
    
  });
});
