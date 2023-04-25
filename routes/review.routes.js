const express = require("express");
const router = express.Router();

const {
 create,
 remove,
 reviewByForID
} = require("../controllers/review.controller");

router.route("/").post(create)

router.route("/:id").get(reviewByForID).delete(remove)

//




module.exports = router;
