const mongoose = require("mongoose");

const outdoorSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number, 
  image: String, 
  location: String, 
  capacity: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Outdoor", outdoorSchema);
