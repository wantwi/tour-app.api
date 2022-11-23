const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  getById,
  remove,
  update,
} = require("../controllers/booking.controller");
const { auth, authorize } = require("../middlewares/auth.middleware");
const { upload } = require("../utils/utils");
router.route("/").post(auth,create).get(getAll);

router.route("/:id").get(getById).delete(remove).put(update);

//




module.exports = router;
