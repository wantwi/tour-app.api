const multer = require("multer")
const fs = require('fs');

/**
 * setting up cookie for after login or registration
 */

const ErrorReponse = require("./errorResponse")

 const setTokenResponse = (user,statusCode, res)=>{
    const token =  user.getToken()
    const option ={
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000),
        httpOnly:true,
        secure: process.env.NODE_ENV ==="production" ? true : false
    }

    res
    .status(statusCode)
    .cookie('api-token', token, option)
    .json({
        success:true,
        token
    })
}

const authorize = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req?.user?.role)){
            return next(new ErrorReponse(`Access denied`, 403))
        }
    }

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,process.env.UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, 'tour-app' + '-' + uniqueSuffix+"."+file.mimetype.split('/')[1] )
     
    }
  })
const upload  = (file="",files=[])=> multer({storage}).fields([{ name: file, maxCount: 1 },{ name: files }])

const unlinkFiles = (files) => {
    console.log(files);
   
    try {
        files.forEach(element => {
            fs.unlink(`${process.env.UPLOAD_PATH}/${element}`, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Delete File successfully.".green);
            });
            
         });
    
    } catch (error) {
        console.log(error);
    }
    
}


module.exports = {setTokenResponse, authorize, upload, unlinkFiles}
