const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://new-user_01:edCrlSiVD9I8u840@cluster0.pxs0hlx.mongodb.net/paytm"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
    verified:Boolean
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const userOTPVerificationSchema= new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date
})

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
const UserOTPVerification = mongoose.model("UserOTPVerification",userOTPVerificationSchema)

module.exports = {
  User,
  Account,
  UserOTPVerification
};
