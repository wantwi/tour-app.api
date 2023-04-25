const mongoose = require("mongoose")
const bookingSchema = mongoose.Schema({
    bookID:{
        type:String,
        required: [true, "Book ID is required."],
    },
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
    contactDetails:{
        type: Object,
        required: [true,"Please provide a contact details"]
    },
    message:{
        type: String,
        
    },

    status:{
        type:String,
       default:"Pending"
    },
    createAt:{
        type:Date,
        default: Date.now()
    }
})






module.exports = mongoose.model("bookings", bookingSchema)