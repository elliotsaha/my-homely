const mongoose = require("mongoose");

const chatRoom = new mongoose.Schema({
roomId:{
    type: String,
    required: [true, "ID is Required"],
},  
participant: {
    type: Array,
    required: [true, "Email is Required"],
    default: [],
  },
propertyId:{
  type: String,
  required: [true, "Property ID is Required"],
}
});

module.exports = mongoose.model("chatRoom", chatRoom);
