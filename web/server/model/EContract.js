const mongoose = require("mongoose");

const eContractSchema = new mongoose.Schema({
  Date: {
    type: Date,
    default: Date.now,
  },
  offerList: Array,
  agreedQuery: Array,
  cancelled: {
    type: Boolean,
    default: false,
  },
  buyerEmail: String,
  sellerEmail: String,
  propertyUUID: String,
});

module.exports = mongoose.model("EContract", eContractSchema);
