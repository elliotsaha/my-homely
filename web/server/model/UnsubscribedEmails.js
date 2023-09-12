const mongoose = require("mongoose");

const unsubscribedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Is Required"],
  },
});

module.exports = mongoose.model("UnsubscribeFromEmails", unsubscribedSchema);
