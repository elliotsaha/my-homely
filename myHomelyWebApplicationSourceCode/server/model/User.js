const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    max: [255, "Max Character Limit"],
  },
  phone: {
    type: String,
    required: false,
    max: [255, "Max Character Limit"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    max: [255, "Max Character Limit"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    max: [1024, "Max Character Limit"],
    min: [6, "Minimum of 6 characters needed"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  resetLink: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  icon: {
    type: String,
    default: "",
  },
  banned: {
    type: Boolean,
    default: false,
  },
  favourites: {
    type: Array,
    default: [],
  },
  showingTimeHistory: {
    type: Array,
    default: [],
  },
  requestEContracts: {
    type: Array,
    default: [],
  },
  sellerEContracts: {
    type: Array,
    default: [],
  },
  ID: {
    type: String,
    default: "",
  },
  IDVerified: {
    type: String,
    default: "Not Verified",
  },
  pipeDriveId: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
