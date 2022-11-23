const express =  require("express")
const router =  express.Router()

const {register,login, renewToken, forgotPassword} = require("../controllers/auth.controller")
const {auth,authorize} = require("../middlewares/auth.middleware")

router.post("/register",register)
router.post("/login",login)
router.get("/refresh",renewToken)
router.post("/forgot",forgotPassword)


module.exports = router
