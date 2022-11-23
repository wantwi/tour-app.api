const mongoose = require("mongoose")
const bookingSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required."],
    },
    package:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "package",
        required: [true, "Package is required."],
    },
    status:{
        type:Boolean,
       default:false
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
})






module.exports = mongoose.model("bookings", bookingSchema)