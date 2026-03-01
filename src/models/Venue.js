const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  location: String,
  capacity: Number,
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Venue", venueSchema);

