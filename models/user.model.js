const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "Please provide first name"],
    trim: true,
  },
  lastName: {
    type: String,
    require: [true, "Please provide last name"],
    trim: true,
  },
  username: {
    type: String,
    require: [true, "Please provide user name"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
   
  },
  mobile: {
    type: String,
    
  },
  bio: {
    type: String,
   
  },
  companyName: {
    type: String,
    
  },
  companyWebsite: {
    type: String,
   
  },
  socialMediaLinks: {
    type: [Object],
  },
  password: {
    type: String,
    require: [true, "Please provide user password"],
    trim: true,
    select: false,
  },
  image: {
    type: String
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  refreshToken: {
    type: String,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * encrypt password
 */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);

  //  const salt = await bcrypt.genSalt(10)
  // if (!this.isModified("password")) {
  //     next();
  //   }
  // const salt = await bcrypt.genSalt(10)
  // this.password =  bcrypt.hash(this.password,salt)
});

/**
 *
 * @returns compare user password
 */
userSchema.methods.comparePassword = async function (enteredpassword) {
  //console.log({enteredpassword});
  return await bcrypt.compare(enteredpassword, this.password);
};

/**
 * create a token
 */
userSchema.methods.getToken = function () {
  return jwt.sign(
    { id: this._id, name: `${this.firstName} ${this.lastName}`, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Generate Refresh Token
userSchema.methods.getRefreshToken = function () {
  const user = this;
  const refreshToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to refreshToken
  this.refreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = refreshToken;

  //console.log(user);
  user.save();

  return refreshToken;
};

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
