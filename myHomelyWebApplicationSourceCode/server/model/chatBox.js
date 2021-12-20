const mongoose = require("mongoose");

const chatBoxSchema = new mongoose.Schema({
  roomId:{
    type: String,
    required: [true, "ID is Required"],
    default: null,
},
  participant: {
    type: Array,
    required: [true, "Email is Required"],
    default: [],
  },
  message: {
    type: String,
    required: [true, "Message is Required"],
    max: [255, "Max Character Limit"],
  },
  file: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("chatBox", chatBoxSchema);
