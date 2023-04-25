const ErrorReponse = require("../utils/errorResponse");
const {unlinkFiles} = require("../utils/utils")

const errorHandler = (err, req,res, next) => {
    // console.log(req.url);
    // console.log(req._parsedUrl);

    let error = {...err}
  
   
    if(req.method ==="POST" && req.url.includes('/api/package')){
       console.log('====================================');
       unlinkFiles(req?.body?.gallery)
       unlinkFiles([req?.body?.coverImage])
       console.log("remove saved image files");
       console.log('====================================');
    }
    if(req.method ==="POST" && req.url.includes('/api/destination')){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        console.log('====================================');
            if(req.body?.gallery && req.body?.coverImage){
                unlinkFiles(req?.body?.gallery)
                unlinkFiles([req?.body?.coverImage])
                console.log("remove saved image files");

            }
       
        console.log('====================================');
     }
 
  
   

    error.message =  err.message
   
    if(err.name ==="CastError"){
        const message = `Invalide Id ${err.value}`
        error = new ErrorReponse(message,400)
    }

     // Handling Mongoose Validation Error
     if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorReponse(message, 400);
    }

     // Handle mongoose  duplicatekey error ///E11000 duplicate
     if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
        error = new ErrorReponse(message, 400);
    }

     // Handling Wrong JWT token error
     if(err.name === 'JsonWebTokenError') {
        const message = 'JSON Web token is invalid. Try Again!';
        error = new ErrorReponse(message, 500);
    }

    // Handling Expired JWT token error
    if(err.name === 'TokenExpiredError') {
        const message = 'JSON Web token is expired. Try Again!';
        error = new ErrorReponse(message, 500);
    }
    

    res.status(error?.statusCode || 500).json({
        success:false,
        error:error?.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null 
    })
}

module.exports = errorHandler;

//CastError
/** code - 11000 => duplicate field entered */