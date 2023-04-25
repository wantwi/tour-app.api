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
    duration:{
        type: String,
    },
    addOns:{
        type: [Object]
    },
    registrationFee:{
        type: Number,
        default:0
    },
    price:{
        type: Number,
        default:0
    },
    rating:{
        type: Number,
        default:5
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
     destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add destination"],
        ref: "destination"
    }
    // packageOwners: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "users"
    // }
   
});



module.exports = mongoose.model("package", packageSchema);