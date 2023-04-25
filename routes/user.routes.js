const express =  require("express")
const { bookingByUser, bookingByUserId } = require("../controllers/booking.controller")
const router =  express.Router()

const {getAll, profile, updateUser} = require("../controllers/user.controller")
const {auth,authorize} = require("../middlewares/auth.middleware")

router.route("/")
.get(getAll)
.put(auth,updateUser)
router.route("/profile")
.get(auth,profile)

router.route("/book")
.get(auth,bookingByUser);

router.route("/book/:id")
.get(bookingByUserId);


module.exports = router
