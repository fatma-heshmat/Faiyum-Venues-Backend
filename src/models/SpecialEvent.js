const mongoose = require("mongoose");

const specialEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, default: "Fayoum, Egypt" }, 
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("SpecialEvent", specialEventSchema);