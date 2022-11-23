const User = require("../models/user.model")
const ErrorReponse = require("../utils/errorResponse")
const asyncHandler =  require("../middlewares/async")

exports.register = asyncHandler (async (req, res, next) =>{
    // const {name, username, password,role} = req.body
    const user =  await User.create(req.body)

    setTokenResponse(user,200,res)
})



exports.login = asyncHandler (async (req, res, next) =>{
   
    const {username, password} = req.body
    if(!username || !password){
        return next(new ErrorReponse('Please provide email and password', 400))
    }

    /**
     * find user
     */

    const user =  await User.findOne({username}).select("+password")
    if(!user){
        return next(new ErrorReponse('Invalid credentials', 401))
    }

    const isValid = await user.comparePassword(password)
    //console.log({isValid});

    if(!isValid){
        return next(new ErrorReponse('Invalid credentials', 401))
    }


    setTokenResponse(user,200,res)
})

exports.logout = asyncHandler (async (req, res, next) =>{
   res.cookie("api-token", "",{
    expires:new Date(Date.now()),
    httpOnly:true,
    secure: process.env.NODE_ENV ==="production" ? true : false
   })
})

exports.renewToken = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
   
    if (!cookies.refresh_token){
        return next(new ErrorReponse("Unauthorized", 401));
    } 
    const refreshToken = cookies.refresh_token;

    const user = await User.findOne({ refreshToken }).select("+refreshToken")
    //console.log({user})
    if (!user) {
        return next(new ErrorReponse("Unauthorized", 401));
    }
   
    setTokenResponse(user,200,res)
  })

  exports.forgotPassword = asyncHandler (async (req, res, next) =>{
   const {username} = req.body
    const user =  await User.findOne({username})
    if(!user){
        return next(new ErrorReponse('Invalid credentials', 401))
    }

    // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.json({
    success:true,
    resetToken
})


})

  

/**
 * setting up cookie for after login or registration
 */

const setTokenResponse = (user,statusCode, res)=>{
    const token =  user.getToken()
    const refresh_token =  user.getRefreshToken()
  
    const option ={
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000),
        httpOnly:true,
        secure: process.env.NODE_ENV ==="production" ? true : false
    }

    res
    .status(statusCode)
    .cookie('api-token', token, option)
    .cookie('refresh_token', refresh_token, option)
    .json({
        success:true,
        token
    })

}


