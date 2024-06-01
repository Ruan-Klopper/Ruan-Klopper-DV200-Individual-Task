const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  id: { type: String, required: false },
  houseName: { type: String, required: false },
  houseDescription: { type: String, required: false },
  rooms: { type: String, required: false },
  location: { type: String, required: false },
  price: { type: String, required: false },
  image: { type: String, required: false },
  rating: { type: Array, required: false },
  onShow: { type: Boolean, required: false },
  entryDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", propertySchema);
