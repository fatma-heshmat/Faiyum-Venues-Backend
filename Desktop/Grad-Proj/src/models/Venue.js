const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model("Venue", venueSchema);
