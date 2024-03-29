const express =  require("express")
const router =  express.Router()

const {create, getAll,getById,remove,update,getByDestinationId} = require("../controllers/package.controller")
const {auth,authorize} = require("../middlewares/auth.middleware")
const { upload } = require("../utils/utils")
router.route("/")
.post(upload('coverImage', 'gallery'),create)
.get(getAll)

router.route("/:id")
.get(getById)
.delete(remove)
.put(update)

router.route("/destination/:id")
.get(getByDestinationId)
module.exports = router
