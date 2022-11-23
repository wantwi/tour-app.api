const express = require("express")
const dotenv = require("dotenv")
const morgan =  require("morgan")
const colors =  require("colors")
const connect = require("./config/db")
const errorHandler = require("./middlewares/error")
const cookieParser = require("cookie-parser")
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const auth = require("./routes/auth.routes")
const package = require("./routes/package.routes")
const booking = require("./routes/booking.routes")
const user = require("./routes/user.routes")
/**
 * Load env variables
 */
dotenv.config({path:"./config/config.env"})

/**
 * connecting to db
 */
 connect()

const PORT = process.env.PORT || 5000



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
// sanitize every query
app.use(mongoSanitize());

//adding extra security headers
app.use(helmet())

//prevent XSS attacks
app.use(xss())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//prevent hpp param pollution
app.use(hpp())

/**
 * Development logger mid-ware
 */
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

app.use(express.static('public'));

/**
 * mount router
 */

// app.use("/api", facility) 
app.use("/api/auth", auth)
app.use("/api/user", user)
app.use("/api/package",package)
app.use("/api/book",booking)

// app.use("/api/", facility_v2) 
app.use(errorHandler)

app.get("/api/", (req,res)=>{
        res.send("Hello Api..")
})

const server = app.listen(PORT, () =>{
    console.log(`Server running ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold);
})


/**\
 * Handle unhandle rejection
 */
process.on("unhandledRejection", (err, promise) => {
        console.log({err});

        server.close(() =>process.exit(1))
    
})
