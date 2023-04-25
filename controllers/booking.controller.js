const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const ErrorReponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

exports.create = asyncHandler(async (req, res, next) => {


    req.body.user = req.user?.id
    const initFirstName = req.user.firstName.split("")[0]
    const initLastName = req.user.lastName.split("")[0]
    const number = new Date().valueOf().toString().split("").slice(6,10).join("")

    req.body.bookID = `${initFirstName}${initLastName}${number}`

  const booking = await Booking.create({ ...req.body });
  res.status(204).json({
    success: true,
    data: booking,
  });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({})
    .populate("user", { firstName: 1, lastName: 1, username: 1, _id: 1 })
    .populate("package", { name: 1, _id: 1 });
  res.status(200).json({
    success: true,
    data: bookings,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findById(id)
    .populate("user", { firstName: 1, lastName: 1, username: 1, _id: 1 })
    .populate("package", { name: 1, _id: 1 });
  res.status(200).json({
    success: true,
    data: booking,
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

  const booking = await Booking.findByIdAndUpdate(id, newvalues);
  res.status(200).json({
    success: true,
    data: booking,
  });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
  });
});

/**
 * Get login user booking
 */

exports.bookingByUser = asyncHandler(async (req, res, next) => {

  const userId = req.user?.id;
  const books = await Booking.find({ user: userId })
  .populate("package", { name: 1, _id: 1 }).select("package");
  res.status(200).json({
    success: true,
    data: books,
  });
});

exports.bookingByUserId = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const user = await Booking.find({ user: id })
      .populate("package", { name: 1, _id: 1 }).select("package");
    res.status(200).json({
      success: true,
      data: user,
    });
  });