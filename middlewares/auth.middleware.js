const jwt = require("jsonwebtoken")
const ErrorReponse = require("../utils/errorResponse")
const asyncHandler =  require("./async")
const User = require("../models/user.model")

exports.auth = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }
    else if(req.cookies.token){
        token = req.cookies.token
    }

    if(!token){
        return next(new ErrorReponse("Unauthorized!", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded?.id)
        next()
    } catch (error) {
         return next(new ErrorReponse("Unauthorized!", 401))
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req?.user?.role)){
            return next(new ErrorReponse(`Access denied`, 403))
        }
    }

}
