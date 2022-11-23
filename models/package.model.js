const mongoose = require("mongoose");
const validator = require("validator");

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter package name."],
        unique:[true, 'Pakage already exist'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Please enter package name."],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please add location."],
    },
    locationgps:{
        type: String
    },
    activities: {
        type: [String]
    },
    numberOfPople: {
        type: Number,
    },
    startDate: {
        type: Date
    },
    endData: {
        type: Date
    },
    registrationFee:{
        type: Number,
        default:0
    },
    minPrice:{
        type: Number,
        default:0
    },
    maxPrice:{
        type: Number,
        default:0
    },
    currency:{
        type: String,
        default:"USD"
    },
    coverImage: {
        type: String,
        required: [true, "Please add cover image."],
    },
    gallery: {
        type: [String],
        required: [true, "Please add gallery images."],
      
    },
    // packageOwners: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "users"
    // }
   
});



module.exports = mongoose.model("package", packageSchema);