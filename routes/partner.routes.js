const express =  require("express")
const router =  express.Router()

const {create, getAll,getById,remove,update,} = require("../controllers/partner.controller")
const {auth,authorize} = require("../middlewares/auth.middleware")
const { upload } = require("../utils/utils")
router.route("/")
.post(upload('logo'),create)
.get(getAll)

router.route("/:id")
.get(getById)
.delete(remove)
.put(upload('logo'),update)


module.exports = router
